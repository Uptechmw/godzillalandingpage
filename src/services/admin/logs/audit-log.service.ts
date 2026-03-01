import { prisma } from '@/lib/db';

/**
 * Service for administrative audit logging and monitoring.
 */
export class AdminAuditLogService {
    /**
     * Lists audit logs with pagination and basic filtering.
     */
    static async listLogs(options: {
        adminId?: string;
        module?: string;
        limit?: number;
        offset?: number;
    }) {
        return await prisma.auditLog.findMany({
            where: {
                adminId: options.adminId,
                module: options.module
            },
            include: {
                admin: {
                    select: { email: true, name: true }
                }
            },
            take: options.limit || 100,
            skip: options.offset || 0,
            orderBy: { createdAt: 'desc' }
        });
    }

    /**
     * Returns usage statistics for the dashboard.
     */
    static async getUsageStats() {
        // This would perform more complex aggregations in a real production system.
        // For now, we'll return some baseline metrics.
        const totalTokens = await prisma.transaction.aggregate({
            _sum: { amount: true },
            where: { type: 'AI_COMPLETION' }
        });

        const errorCount = await prisma.tokenReservation.count({
            where: { status: 'FAILED' }
        });

        return {
            totalTokensConsumed: Math.abs(totalTokens._sum.amount || 0),
            errorCount,
            activeReservations: await prisma.tokenReservation.count({
                where: { status: { in: ['PENDING', 'PROVIDER_STARTED'] } }
            })
        };
    }
}
