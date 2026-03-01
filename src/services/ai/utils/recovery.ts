import { prisma } from '@/lib/db';
import { BillingBroker } from '../broker/billing';
import { AuditLogger } from '../utils/logger';

/**
 * RecoveryService handles crash-consistency gaps.
 * It identifies 'Zombies' (PENDING reservations that exceeded their TTL)
 * and refunds them to ensure financial correctness after system failures.
 */
export class RecoveryService {
    /**
     * Scans for and handles expired PENDING reservations.
     * Can be triggered by a Cron job or a manual admin endpoint.
     */
    static async cleanupZombies(): Promise<number> {
        const now = new Date();

        // 1. Find all PENDING reservations that have expired
        const zombies = await prisma.tokenReservation.findMany({
            where: {
                status: 'PENDING',
                expiresAt: { lt: now }
            },
            take: 50 // process in batches to avoid locking the DB
        });

        if (zombies.length === 0) return 0;

        let processed = 0;
        for (const zombie of zombies) {
            try {
                // Safety check: verify no successful transaction was linked during the window
                // (In our system, transaction creation is atomic with reservation commitment)

                // Conservative strategy: Refund the full amount to the user.
                // It is better for the business to 'leak' a small amount of compute than 
                // to permanently overcharge a user for a crashed process.
                await BillingBroker.releaseFull(zombie.id);

                AuditLogger.log({
                    eventId: crypto.randomUUID(),
                    userId: zombie.userId,
                    requestId: 'recovery',
                    idempotencyKey: zombie.idempotencyKey,
                    modelKey: zombie.modelKey as any,
                    reservationId: zombie.id,
                    action: 'REFUNDED',
                    error: "CRASH_RECOVERY_CLEANUP"
                });

                processed++;
            } catch (err) {
                console.error(`[RecoveryService] Failed to clean up zombie ${zombie.id}:`, err);
            }
        }

        return processed;
    }
}
