import { prisma } from '@/lib/db';
import { MODEL_REGISTRY, ModelKey, PricingSnapshot } from '../registry';
import { GodzillaBrokerError } from '../utils/normalizer';
import { AuditLogger } from '../utils/logger';

export class BillingBroker {
    /**
     * Reserves tokens based on proportional estimation using an atomic SQL update. 
     * This prevents overdraft race conditions and ensures financial correctness.
     */
    static async reserve(
        userId: string,
        modelKey: ModelKey,
        estimatedInput: number,
        requestedMaxTokens: number,
        idempotencyKey: string,
        requestHash: string
    ) {
        const config = MODEL_REGISTRY[modelKey];
        const maxOutput = Math.min(requestedMaxTokens || config.maxOutputTokens, config.maxOutputTokens);

        const inputCost = estimatedInput * config.pricing.baseInputMultiplier;
        const outputCost = maxOutput * config.pricing.baseOutputMultiplier;
        const maxPotentialCost = Math.ceil(inputCost + outputCost);

        return await prisma.$transaction(async (tx) => {
            // 1. Idempotency & Replay Protection
            const existing = await tx.tokenReservation.findUnique({ where: { idempotencyKey } });
            if (existing) {
                if (existing.requestHash !== requestHash) {
                    throw new GodzillaBrokerError("IDEMPOTENCY_MISMATCH", "Mismatch between idempotency key and request payload (Replay Attack detected).");
                }
                // If already committed or failed, return early. If PENDING, allow attaching.
                return existing;
            }

            // 2. Atomic Guarded Balance Deduction (Daughter of Godzilla! No Overdrafts!)
            const result = await tx.$executeRaw`
                UPDATE "TokenBalance" 
                SET coins = coins - ${maxPotentialCost} 
                WHERE "userId" = ${userId} AND coins >= ${maxPotentialCost}
            `;

            if (result === 0) {
                throw new GodzillaBrokerError("INSUFFICIENT_FUNDS", `Cannot reserve ${maxPotentialCost} coins. Balance too low or user not found.`);
            }

            // 3. Create Reservation (State: PENDING)
            const reservation = await tx.tokenReservation.create({
                data: {
                    idempotencyKey,
                    requestHash,
                    userId,
                    modelKey,
                    status: 'PENDING',
                    reservedAmount: maxPotentialCost,
                    pricingSnapshot: config.pricing as object,
                    expiresAt: new Date(Date.now() + config.timeoutMs + 60000) // Buffer for cleanup worker
                }
            });

            AuditLogger.log({
                eventId: crypto.randomUUID(),
                userId,
                requestId: 'n/a',
                idempotencyKey,
                modelKey,
                reservationId: reservation.id,
                action: 'RESERVATION_CREATED',
                metrics: { inputTokens: estimatedInput, outputTokens: maxOutput, calculatedCost: maxPotentialCost, latencyMs: 0 }
            });

            return reservation;
        });
    }

    /**
     * Transitions reservation state to PROVIDER_STARTED.
     */
    static async markStarted(reservationId: string) {
        return await prisma.tokenReservation.update({
            where: { id: reservationId, status: 'PENDING' },
            data: { status: 'PROVIDER_STARTED' }
        });
    }

    /**
     * Fast balance lookup for premium model gating.
     */
    static async getBalance(userId: string): Promise<number> {
        const record = await prisma.tokenBalance.findUnique({ where: { userId } });
        return record?.coins ?? 0;
    }

    /**
     * Finalizes the transaction based on actual authoritative usage.
     * Refunds the reserved difference.
     * Idempotent: second call on an already-finalized reservation is a safe no-op.
     */
    static async commit(reservationId: string, actualInput: number, actualOutput: number, reason: 'COMMITTED' | 'TIMEOUT' | 'CLIENT_DISCONNECT' | 'FAILED' = 'COMMITTED') {
        const status = reason === 'TIMEOUT' ? 'TIMEOUT' : reason === 'CLIENT_DISCONNECT' ? 'ABORTED' : reason === 'FAILED' ? 'FAILED' : 'COMMITTED';

        return await prisma.$transaction(async (tx) => {
            // Atomic guard: only transition from PENDING or PROVIDER_STARTED
            const affected = await tx.$executeRaw`
                UPDATE "TokenReservation"
                SET status = ${status}
                WHERE id = ${reservationId}
                  AND status IN ('PENDING', 'PROVIDER_STARTED')
            `;

            // If no rows affected, reservation was already finalized — idempotent no-op
            if (affected === 0) {
                const current = await tx.tokenReservation.findUnique({ where: { id: reservationId } });
                return current;
            }

            const reservation = await tx.tokenReservation.findUniqueOrThrow({ where: { id: reservationId } });
            const pricing = reservation.pricingSnapshot as any as PricingSnapshot;
            const exactCost = Math.ceil((actualInput * pricing.baseInputMultiplier) + (actualOutput * pricing.baseOutputMultiplier));

            const refundAmount = Math.max(0, reservation.reservedAmount - exactCost);

            if (refundAmount > 0) {
                await tx.tokenBalance.update({
                    where: { userId: reservation.userId },
                    data: { coins: { increment: refundAmount } }
                });
            }

            await tx.tokenReservation.update({
                where: { id: reservationId },
                data: {
                    actualCost: exactCost,
                    metadata: { inputTokens: actualInput, outputTokens: actualOutput }
                }
            });

            // Permanent financial audit log
            await tx.transaction.create({
                data: {
                    userId: reservation.userId,
                    type: 'AI_COMPLETION',
                    amount: -exactCost,
                    description: `${reservation.modelKey}: ${actualInput} in / ${actualOutput} out`,
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
                action: status,
                metrics: { inputTokens: actualInput, outputTokens: actualOutput, calculatedCost: exactCost, latencyMs: 0 }
            });

            return reservation;
        });
    }

    /**
     * Releases the entire reservation (Refund everything on early failure)
     */
    static async release(reservationId: string, reason: 'RELEASED' | 'FAILED' | 'TIMEOUT' = 'RELEASED') {
        return await prisma.$transaction(async (tx) => {
            const reservation = await tx.tokenReservation.findUniqueOrThrow({ where: { id: reservationId } });

            // If already processed, ignore
            if (reservation.status !== 'PENDING' && reservation.status !== 'PROVIDER_STARTED') return;

            await tx.tokenBalance.update({
                where: { userId: reservation.userId },
                data: { coins: { increment: reservation.reservedAmount } }
            });

            await tx.tokenReservation.update({
                where: { id: reservationId },
                data: { status: reason }
            });

            AuditLogger.log({
                eventId: crypto.randomUUID(),
                userId: reservation.userId,
                requestId: 'n/a',
                idempotencyKey: reservation.idempotencyKey,
                modelKey: reservation.modelKey as ModelKey,
                reservationId: reservation.id,
                action: reason
            });
        });
    }
}

