import React from 'react';
import { prisma } from '@/lib/db';
import AdminDashboardClient from '@/components/admin/AdminDashboardClient';

export default async function AdminDashboardPage() {
    // Fetch real metrics from DB
    const userCount = await prisma.user.count();
    const transactionSum = await (prisma as any).transaction.aggregate({
        _sum: { amount: true },
        where: { type: 'PURCHASE' }
    });
    const totalRevenue = transactionSum._sum.amount || 0;

    // Fetch User Growth Data (Last 3 months)
    const getMonthRange = (monthsAgo: number) => {
        const start = new Date();
        start.setMonth(start.getMonth() - monthsAgo, 1);
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setMonth(end.getMonth() + 1, 0);
        end.setHours(23, 59, 59, 999);
        return { start, end };
    };

    const growthData = await Promise.all([2, 1, 0].map(async (i) => {
        const { start, end } = getMonthRange(i);
        const count = await prisma.user.count({
            where: { createdAt: { gte: start, lte: end } }
        });
        return {
            name: start.toLocaleString('default', { month: 'short' }),
            sales: count,
            prevSales: Math.max(0, count - 5) // Mock prev for trend
        };
    }));

    // Resource Load (Last 7 days)
    const systemLoad = await Promise.all([...Array(7)].map(async (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        d.setHours(0, 0, 0, 0);
        const end = new Date(d);
        end.setHours(23, 59, 59, 999);

        const usage = await (prisma as any).transaction.aggregate({
            _sum: { amount: true },
            where: { type: 'AI_COMPLETION', createdAt: { gte: d, lte: end } }
        });
        const val = Math.abs(usage._sum.amount || 0);
        return {
            day: d.toLocaleString('default', { weekday: 'short' }),
            value: Math.min(100, (val / 5000) * 100) // Normalized to 100%
        };
    }));

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayUsage = await (prisma as any).transaction.aggregate({
        _sum: { amount: true },
        where: {
            type: 'AI_COMPLETION',
            createdAt: { gte: today }
        }
    });
    const tokensUsedToday = Math.abs(todayUsage._sum.amount || 0).toLocaleString();

    return (
        <div className="admin-page-container">
            <AdminDashboardClient
                userCount={userCount}
                tokensUsedToday={tokensUsedToday}
                totalRevenue={totalRevenue}
                growthData={growthData}
                systemLoad={systemLoad}
            />
        </div>
    );
}
