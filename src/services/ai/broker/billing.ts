import { prisma } from '@/lib/db';
import { MODEL_REGISTRY, ModelKey, PricingSnapshot } from '../registry';
import { AtomicBrokerError } from '../utils/normalizer';
import { AuditLogger } from '../utils/logger';

export class BillingBroker {
    /**
     * Reserves tokens based on proportional estimation. 
     * Uses Postgres row-level locking to prevent concurrent wallet drain.
     */
    static async reserve(
        userId: string,
        modelKey: ModelKey,
        estimatedInput: number,
        requestedMaxTokens?: number,
        idempotencyKey?: string
    ) {
        const config = MODEL_REGISTRY[modelKey];

        // Proportional Reservation
        // If client asks for 500 max tokens, we don't block 8000.
        const maxOutput = Math.min(requestedMaxTokens || config.maxOutputTokens, config.maxOutputTokens);

        const inputCost = estimatedInput * config.pricing.baseInputMultiplier;
        const outputCost = maxOutput * config.pricing.baseOutputMultiplier;
        const maxPotentialCost = Math.ceil(inputCost + outputCost);

        // Provide a default idempotency key if upstream doesn't enforce one
        const ikey = idempotencyKey || crypto.randomUUID();

        return await prisma.$transaction(async (tx) => {
            // 1. Idempotency Check
            const existing = await tx.tokenReservation.findUnique({ where: { idempotencyKey: ikey } });
            if (existing) {
                if (existing.status === 'PENDING') return existing; // Safe to attach to ongoing stream
                throw new AtomicBrokerError("IDEMPOTENCY_ERROR", "Request already processed.");
            }

            // 2 & 3. Atomic Balance Deduction (Prevent Overdraft Race)
            // This ensures we only deduct IF they have enough coins, in a single DB operation.
            const result = await tx.$executeRaw`
                UPDATE "TokenBalance" 
                SET coins = coins - ${maxPotentialCost} 
                WHERE "userId" = ${userId} AND coins >= ${maxPotentialCost}
            `;

            if (result === 0) {
                // Either user doesn't exist or insufficient funds
                throw new AtomicBrokerError("INSUFFICIENT_FUNDS", `Cannot reserve ${maxPotentialCost} tokens. Balance too low or user not found.`);
            }

            const reservation = await tx.tokenReservation.create({
                data: {
                    idempotencyKey: ikey,
                    userId,
                    modelKey,
                    status: 'PENDING',
                    reservedAmount: maxPotentialCost,
                    pricingSnapshot: config.pricing as object,
                    expiresAt: new Date(Date.now() + config.timeoutMs + 30000) // Buffer for commit
                }
            });

            AuditLogger.log({
                eventId: crypto.randomUUID(),
                userId,
                requestId: 'n/a',
                idempotencyKey: ikey,
                modelKey,
                reservationId: reservation.id,
                action: 'RESERVATION_CREATED',
                metrics: { inputTokens: estimatedInput, outputTokens: maxOutput, calculatedCost: maxPotentialCost, latencyMs: 0 }
            });

            return reservation;
        });
    }

    /**
     * Finalizes the transaction based on actual authoritative usage.
     * Refunds the reserved difference.
     */
    static async commit(reservationId: string, actualInput: number, actualOutput: number, reason: string = 'COMMITTED') {
        return await prisma.$transaction(async (tx) => {
            const reservation = await tx.tokenReservation.findUniqueOrThrow({ where: { id: reservationId } });

            if (reservation.status !== 'PENDING') {
                throw new AtomicBrokerError("INTERNAL_BROKER_ERROR", "Cannot commit a reservation that is not pending.");
            }

            // Use the snapshot pricing lock
            const pricing = reservation.pricingSnapshot as any as PricingSnapshot;
            const exactCost = Math.ceil((actualInput * pricing.baseInputMultiplier) + (actualOutput * pricing.baseOutputMultiplier));

            // Calculate refund
            // Ensure we don't refund if exactCost somehow exceeded reservedAmount (should mathematically never happen)
            const refundAmount = Math.max(0, reservation.reservedAmount - exactCost);

            if (refundAmount > 0) {
                await tx.tokenBalance.update({
                    where: { userId: reservation.userId },
                    data: { coins: { increment: refundAmount } }
                });
            }

            const updated = await tx.tokenReservation.update({
                where: { id: reservationId },
                data: {
                    status: reason === 'TIMEOUT' ? 'TIMEOUT' : reason === 'CLIENT_DISCONNECT' ? 'ABORTED' : 'COMMITTED',
                    actualCost: exactCost,
                    metadata: { inputTokens: actualInput, outputTokens: actualOutput }
                }
            });

            // Write Audit Log
            await tx.transaction.create({
                data: {
                    userId: reservation.userId,
                    type: 'AI_COMPLETION',
                    amount: -exactCost,
                    description: `Used ${reservation.modelKey} (${actualInput} in / ${actualOutput} out)`,
                    reservationId: reservation.id
                }
            });

            AuditLogger.log({
                eventId: crypto.randomUUID(),
                userId: reservation.userId,
                requestId: 'n/a',
                idempotencyKey: reservation.idempotencyKey,
                modelKey: reservation.modelKey as ModelKey,
                reservationId: reservation.id,
                action: 'COMMITTED',
                metrics: { inputTokens: actualInput, outputTokens: actualOutput, calculatedCost: exactCost, latencyMs: 0 }
            });

            return updated;
        });
    }

    /**
     * Releases the entire reservation (upstream failure)
     */
    static async releaseFull(reservationId: string) {
        return await prisma.$transaction(async (tx) => {
            const reservation = await tx.tokenReservation.findUniqueOrThrow({ where: { id: reservationId } });
            if (reservation.status !== 'PENDING') return;

            await tx.tokenBalance.update({
                where: { userId: reservation.userId },
                data: { coins: { increment: reservation.reservedAmount } }
            });

            await tx.tokenReservation.update({
                where: { id: reservationId },
                data: { status: 'REFUNDED' }
            });

            AuditLogger.log({
                eventId: crypto.randomUUID(),
                userId: reservation.userId,
                requestId: 'n/a',
                idempotencyKey: reservation.idempotencyKey,
                modelKey: reservation.modelKey as ModelKey,
                reservationId: reservation.id,
                action: 'REFUNDED'
            });
        });
    }
}
