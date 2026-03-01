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
     * Scans for and handles expired PENDING/STARTED reservations.
     * Ensures crash-consistency by refunding tokens for orphaned processes.
     */
    static async cleanupZombies(): Promise<number> {
        const now = new Date();

        const zombies = await prisma.tokenReservation.findMany({
            where: {
                status: { in: ['PENDING', 'PROVIDER_STARTED'] },
                expiresAt: { lt: now }
            },
            take: 50
        });

        if (zombies.length === 0) return 0;

        let processed = 0;
        for (const zombie of zombies) {
            try {
                // Atomic reconciliation: Marks as TIMEOUT and refunds original balance
                await BillingBroker.release(zombie.id, 'TIMEOUT');
                processed++;
            } catch (err) {
                console.error(`[RecoveryService] Failed to clean up zombie ${zombie.id}:`, err);
            }
        }

        return processed;
    }
}
