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

    /**
     * Creates a new token product.
     */
    static async createProduct(data: {
        name: string;
        coins: number;
        priceAmount: number;
        description?: string;
        features?: string[];
        active?: boolean;
    }, adminId: string) {
        const product = await (prisma.tokenProduct as any).create({
            data: {
                ...data,
                features: data.features ? JSON.stringify(data.features) : undefined
            }
        });

        await prisma.auditLog.create({
            data: {
                adminId,
                action: 'CREATE_PRODUCT',
                module: 'BILLING',
                targetId: product.id,
                newValue: data as any
            }
        });

        return product;
    }

    /**
     * Updates an existing token product.
     */
    static async updateProduct(productId: string, data: Partial<{
        name: string;
        coins: number;
        priceAmount: number;
        description?: string;
        features?: string[];
        active?: boolean;
    }>, adminId: string) {
        const product = await (prisma.tokenProduct as any).update({
            where: { id: productId },
            data: {
                ...data,
                features: data.features ? JSON.stringify(data.features) : undefined
            }
        });

        await prisma.auditLog.create({
            data: {
                adminId,
                action: 'UPDATE_PRODUCT',
                module: 'BILLING',
                targetId: productId,
                newValue: data as any
            }
        });

        return product;
    }

    /**
     * Deletes a token product.
     */
    static async deleteProduct(productId: string, adminId: string) {
        await prisma.tokenProduct.delete({
            where: { id: productId }
        });

        await prisma.auditLog.create({
            data: {
                adminId,
                action: 'DELETE_PRODUCT',
                module: 'BILLING',
                targetId: productId
            }
        });
    }
}
