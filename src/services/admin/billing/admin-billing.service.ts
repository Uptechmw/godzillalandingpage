import { prisma } from '@/lib/db';

/**
 * Service for administrative billing and product management.
 */
export class AdminBillingService {
    /**
     * Lists all token products.
     */
    static async listProducts() {
        return await prisma.tokenProduct.findMany({
            orderBy: { priceAmount: 'asc' }
        });
    }

    /**
     * Lists recent transactions with filtering.
     */
    static async listTransactions(options: {
        userId?: string;
        type?: string;
        limit?: number;
        offset?: number;
    }) {
        return await prisma.transaction.findMany({
            where: {
                userId: options.userId,
                type: options.type
            },
            include: {
                user: {
                    select: { email: true }
                }
            },
            take: options.limit || 100,
            skip: options.offset || 0,
            orderBy: { createdAt: 'desc' }
        });
    }

    /**
     * Toggles product availability.
     */
    static async setProductStatus(productId: string, active: boolean, adminId: string) {
        await prisma.tokenProduct.update({
            where: { id: productId },
            data: { active }
        });

        await prisma.auditLog.create({
            data: {
                adminId,
                action: active ? 'ENABLE_PRODUCT' : 'DISABLE_PRODUCT',
                module: 'BILLING',
                targetId: productId
            }
        });
    }
}
