import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

/**
 * GET /api/user/stats
 * 
 * Fetches real usage statistics for the dashboard.
 */
export async function GET(request: NextRequest) {
    try {
        const authUser = await getAuthUser(request);

        // 1. Fetch current token balance
        const balance = await prisma.tokenBalance.findUnique({
            where: { userId: authUser.id }
        });

        // 2. Fetch recent transactions for sparkline (Last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentTransactions = await prisma.transaction.findMany({
            where: {
                userId: authUser.id,
                createdAt: { gte: sevenDaysAgo },
                amount: { lt: 0 } // Only usage (debits)
            },
            orderBy: { createdAt: 'asc' }
        });

        // Group by day for sparkline
        const dailyUsage = Array.from({ length: 7 }).map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - i));
            const dayStr = date.toISOString().split('T')[0];

            const total = recentTransactions
                .filter(t => t.createdAt.toISOString().split('T')[0] === dayStr)
                .reduce((sum, t) => sum + Math.abs(t.amount), 0);

            return { value: total };
        });

        // 3. Fetch monthly usage for overview (Last 3 months)
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 2);
        threeMonthsAgo.setDate(1);

        const monthlyTransactions = await prisma.transaction.findMany({
            where: {
                userId: authUser.id,
                createdAt: { gte: threeMonthsAgo },
                amount: { lt: 0 }
            }
        });

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const overviewData = Array.from({ length: 3 }).map((_, i) => {
            const date = new Date();
            date.setMonth(date.getMonth() - (2 - i));
            const monthIdx = date.getMonth();
            const monthName = months[monthIdx];

            const total = monthlyTransactions
                .filter(t => t.createdAt.getMonth() === monthIdx)
                .reduce((sum, t) => sum + Math.abs(t.amount), 0);

            // Mock LOC based on tokens (10 tokens per line)
            return { name: monthName, lines: total / 10, prevLines: (total / 10) * 0.7 };
        });

        // 4. Summaries
        const totalTokensUsed = await prisma.transaction.aggregate({
            where: { userId: authUser.id, amount: { lt: 0 } },
            _sum: { amount: true }
        });

        const projectCount = await prisma.tokenReservation.count({
            where: { userId: authUser.id }
        });

        return NextResponse.json({
            success: true,
            stats: {
                balance: balance?.coins || 0,
                totalUsage: Math.abs(totalTokensUsed._sum.amount || 0),
                projectCount: projectCount || 0,
                dailyUsage,
                overviewData,
                locCount: Math.abs(totalTokensUsed._sum.amount || 0) / 10
            }
        });

    } catch (error: any) {
        console.error('[User Stats Error]', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch user stats' }, { status: 500 });
    }
}
