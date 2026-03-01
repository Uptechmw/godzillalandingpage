import React from 'react';
import { PageHeader } from '@/components/admin/PageHeader';
import { prisma } from '@/lib/db';
import {
    BarChart3,
    PieChart,
    Activity,
    TrendingUp,
    Zap
} from 'lucide-react';

export default async function AdminAnalyticsPage() {
    // Aggregation: Tokens by Model (Mock logic for demonstration in this pass)
    // In production, this would use a GroupBy on TokenReservation
    const modelUsage = [
        { name: 'Gemini 1.5 Pro', tokens: 125400, color: '#4285F4' },
        { name: 'Claude 3.5 Sonnet', tokens: 89000, color: '#D97757' },
        { name: 'GPT-4o', tokens: 45000, color: '#10A37F' },
        { name: 'Gemini 1.5 Flash', tokens: 12000, color: '#8AB4F8' },
    ];

    const maxTokens = Math.max(...modelUsage.map(m => m.tokens));

    return (
        <div className="admin-analytics-page">
            <PageHeader
                title="AI Usage Analytics"
                subtitle="Deep insights into token consumption, provider performance, and cost distribution."
            />

            <div className="analytics-grid">
                <section className="analytics-card chart-section">
                    <div className="card-header">
                        <BarChart3 size={20} className="text-blue-400" />
                        <h3 className="card-title">Token Consumption by Model</h3>
                    </div>
                    <div className="bar-chart">
                        {modelUsage.map((model) => (
                            <div key={model.name} className="bar-row">
                                <div className="bar-info">
                                    <span className="model-name">{model.name}</span>
                                    <span className="token-count">{model.tokens.toLocaleString()} tokens</span>
                                </div>
                                <div className="bar-wrapper">
                                    <div
                                        className="bar-fill"
                                        style={{
                                            width: `${(model.tokens / maxTokens) * 100}%`,
                                            backgroundColor: model.color
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="analytics-card stats-section">
                    <div className="card-header">
                        <TrendingUp size={20} className="text-emerald-400" />
                        <h3 className="card-title">Economic Efficiency</h3>
                    </div>
                    <div className="stats-list">
                        <div className="efficiency-item">
                            <span className="label">Avg. Tokens per User</span>
                            <span className="value">4,250</span>
                        </div>
                        <div className="efficiency-item">
                            <span className="label">Reservation Success Rate</span>
                            <span className="value text-emerald-400">99.8%</span>
                        </div>
                        <div className="efficiency-item">
                            <span className="label">Provider Latency (Avg)</span>
                            <span className="value">1.4s</span>
                        </div>
                    </div>
                </section>
            </div>

            <style jsx>{`
                .admin-analytics-page {
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                }

                .analytics-grid {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 24px;
                }

                .analytics-card {
                    background-color: #0f172a;
                    border: 1px solid #1e293b;
                    border-radius: 12px;
                    padding: 24px;
                }

                .card-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 32px;
                }

                .card-title {
                    font-size: 1.1rem;
                    font-weight: 700;
                }

                .bar-chart {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                .bar-row {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .bar-info {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.9rem;
                }

                .model-name {
                    font-weight: 600;
                    color: #fff;
                }

                .token-count {
                    color: #94a3b8;
                }

                .bar-wrapper {
                    height: 12px;
                    background-color: #1e293b;
                    border-radius: 6px;
                    overflow: hidden;
                }

                .bar-fill {
                    height: 100%;
                    border-radius: 6px;
                    transition: width 1s ease-out;
                }

                .stats-list {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                .efficiency-item {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .efficiency-item .label {
                    font-size: 0.85rem;
                    color: #94a3b8;
                }

                .efficiency-item .value {
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: #fff;
                }

                @media (max-width: 1024px) {
                    .analytics-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}
