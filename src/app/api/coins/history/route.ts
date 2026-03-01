import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

/**
 * GET /api/coins/history
 * 
 * Get transaction history for the authenticated user
 * (Protected route using custom JWT)
 */
export async function GET(request: NextRequest) {
    try {
        // 1. Verify user session
        const authUser = await getAuthUser(request);

        // 2. Fetch history from Database
        const transactions = await prisma.transaction.findMany({
            where: { userId: authUser.id },
            orderBy: { createdAt: 'desc' },
            take: 50, // Limit to recent 50
        });

        return NextResponse.json({
            success: true,
            transactions,
        });
    } catch (error: any) {
        console.error('[Coins History Error]', error);

        // Handle specific auth error
        if (error.message && (error.message.includes('token') || error.message.includes('No authentication'))) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized session' },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Internal system error fetching mission logs' },
            { status: 500 }
        );
    }
}
