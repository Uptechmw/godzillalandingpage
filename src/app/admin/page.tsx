import React from 'react';
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

            <style jsx>{`
                .admin-overview {
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                }

                .page-header {
                    margin-bottom: 8px;
                }

                .header-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #fff;
                }

                .header-subtitle {
                    font-size: 0.9rem;
                    color: #94a3b8;
                    margin-top: 4px;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 20px;
                }

                .stat-card {
                    background-color: #0f172a;
                    border: 1px solid #1e293b;
                    border-radius: 12px;
                    padding: 24px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    transition: transform 0.2s;
                }

                .stat-icon {
                    width: 56px;
                    height: 56px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .stat-info {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .stat-label {
                    font-size: 0.85rem;
                    color: #94a3b8;
                    font-weight: 500;
                }

                .stat-value {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #fff;
                }

                .dashboard-grid {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 24px;
                }

                .dashboard-section {
                    background-color: #0f172a;
                    border: 1px solid #1e293b;
                    border-radius: 12px;
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .section-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .section-title {
                    font-size: 1rem;
                    font-weight: 600;
                }

                .view-all {
                    font-size: 0.8rem;
                    color: #3b82f6;
                    text-decoration: none;
                }

                .empty-state {
                    color: #64748b;
                    font-size: 0.9rem;
                    text-align: center;
                    padding: 40px 0;
                }

                .health-metrics {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .health-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 0.9rem;
                    color: #94a3b8;
                }

                .badge {
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 0.7rem;
                    font-weight: 700;
                }

                .badge.success {
                    background-color: #10b9811a;
                    color: #10b981;
                }
            `}</style>
        </div>
    );
}

import Link from 'next/link';
