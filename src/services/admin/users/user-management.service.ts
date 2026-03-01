import { prisma } from '@/lib/db';
import { AuditLogger } from '../../ai/utils/logger';

/**
 * Service for administrative user management actions.
 */
export class AdminUserManagementService {
    /**
     * Lists users with basic stats and filtering.
     */
    static async listUsers(options: {
        email?: string;
        limit?: number;
        offset?: number;
    }) {
        return await prisma.user.findMany({
            where: options.email ? { email: { contains: options.email } } : {},
            include: {
                tokenBalance: true,
                _count: {
                    select: { transactions: true, tokenReservations: true }
                }
            },
            take: options.limit || 50,
            skip: options.offset || 0,
            orderBy: { createdAt: 'desc' }
        });
    }

    /**
     * Toggles user account status (Currently disabled as 'status' field was removed from DB).
     */
    static async setUserStatus(userId: string, status: 'ACTIVE' | 'DISABLED' | 'BANNED', adminId: string): Promise<void> {
        // Note: Field removed to fix DB mismatch. Re-implement when schema is updated.
        /*
        await prisma.user.update({
            where: { id: userId },
            data: { status }
        });
        */

        await prisma.auditLog.create({
            data: {
                adminId,
                action: 'SET_USER_STATUS_ATTEMPT',
                module: 'USERS',
                targetId: userId,
                newValue: { status, note: "Field 'status' missing in DB - action log only" }
            }
        });
    }

    /**
     * Manually adjusts a user's token balance (Credit/Debit).
     */
    static async adjustBalance(userId: string, amount: number, reason: string, adminId: string): Promise<void> {
        await prisma.$transaction(async (tx) => {
            await tx.tokenBalance.update({
                where: { userId },
                data: { coins: { increment: amount } }
            });

            await tx.transaction.create({
                data: {
                    userId,
                    type: 'ADMIN_ADJUSTMENT',
                    amount,
                    description: `Admin adjustment: ${reason}`
                }
            });

            await tx.auditLog.create({
                data: {
                    adminId,
                    action: 'ADJUST_BALANCE',
                    module: 'USERS',
                    targetId: userId,
                    newValue: { amount, reason }
                }
            });
        });
    }
}
