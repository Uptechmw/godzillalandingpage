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
            />
        </div>
    );
}
