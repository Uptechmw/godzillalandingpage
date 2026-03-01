import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import {
    Users,
    Zap,
    CreditCard,
    AlertCircle,
    TrendingUp,
    FileText
} from 'lucide-react';

export default async function AdminDashboardPage() {
    // Fetch summary metrics
    const userCount = await prisma.user.count();
    const transactionSum = await prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { type: 'PURCHASE' }
    });
    const totalRevenue = transactionSum._sum.amount || 0;

    // Today's usage (rough estimate from transactions)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayUsage = await prisma.transaction.aggregate({
        _sum: { amount: true },
        where: {
            type: 'AI_COMPLETION',
            createdAt: { gte: today }
        }
    });
    const tokensUsedToday = Math.abs(todayUsage._sum.amount || 0);

    const stats = [
        { label: 'Total Users', value: userCount, icon: Users, color: '#3b82f6' },
        { label: 'Tokens Today', value: tokensUsedToday.toLocaleString(), icon: Zap, color: '#fbbf24' },
        { label: 'Total Revenue', value: `${totalRevenue} coins`, icon: CreditCard, color: '#10b981' },
        { label: 'Active Alerts', value: '0', icon: AlertCircle, color: '#ef4444' },
    ];

    return (
        <div className="admin-overview">
            <header className="page-header">
                <div>
                    <h2 className="header-title">System Overview</h2>
                    <p className="header-subtitle">Real-time stats for Godzilla AI Compute Brokerage.</p>
                </div>
            </header>

            <div className="stats-grid">
                {stats.map((stat) => (
                    <div key={stat.label} className="stat-card">
                        <div className="stat-icon" style={{ backgroundColor: `${stat.color}1a`, color: stat.color }}>
                            <stat.icon size={24} />
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">{stat.label}</span>
                            <span className="stat-value">{stat.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-grid">
                <div className="dashboard-section recent-activity">
                    <div className="section-header">
                        <h3 className="section-title">Recent Audit Logs</h3>
                        <Link href="/admin/logs" className="view-all">View All</Link>
                    </div>
                    <div className="activity-list">
                        <p className="empty-state">No recent admin activity found.</p>
                    </div>
                </div>

                <div className="dashboard-section system-health">
                    <div className="section-header">
                        <h3 className="section-title">System Health</h3>
                    </div>
                    <div className="health-metrics">
                        <div className="health-item">
                            <span>Redis Cluster</span>
                            <span className="badge success">ONLINE</span>
                        </div>
                        <div className="health-item">
                            <span>Database</span>
                            <span className="badge success">CONNECTED</span>
                        </div>
                        <div className="health-item">
                            <span>Gemini API</span>
                            <span className="badge success">STABLE</span>
                        </div>
                        <div className="health-item">
                            <span>Claude API</span>
                            <span className="badge success">STABLE</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
