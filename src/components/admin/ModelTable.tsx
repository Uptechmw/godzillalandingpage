import React from 'react';
import {
    Zap,
    Shield,
    ShieldOff,
    Settings2,
    Database,
    Clock,
    Infinity
} from 'lucide-react';

interface ModelInfo {
    key: string;
    name: string;
    provider: string;
    enabled: boolean;
    hasOverride: boolean;
    effective: {
        maxOutputTokens: number;
        timeoutMs: number;
        rateLimits: {
            requestsPerMinute: number;
            concurrentRequests: number;
        }
    };
}

interface AdminModelTableProps {
    models: ModelInfo[];
}

export function AdminModelTable({ models }: AdminModelTableProps) {
    return (
        <div className="admin-model-table-container">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Model</th>
                        <th>Provider</th>
                        <th>Status</th>
                        <th>Limits (RPM/Conn)</th>
                        <th>Max Output</th>
                        <th>Timeout</th>
                        <th className="text-right">Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map((model) => (
                        <tr key={model.key}>
                            <td>
                                <div className="model-cell">
                                    <div className="model-icon">
                                        <Zap size={16} />
                                    </div>
                                    <div className="model-meta">
                                        <span className="model-name">{model.name}</span>
                                        <span className="model-key">{model.key}</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className="provider-badge">
                                    {model.provider.toUpperCase()}
                                </span>
                            </td>
                            <td>
                                <span className={`status-badge ${model.enabled ? 'active' : 'disabled'}`}>
                                    {model.enabled ? 'ENABLED' : 'DISABLED'}
                                </span>
                                {model.hasOverride && <span className="override-indicator">Custom</span>}
                            </td>
                            <td>
                                <div className="limit-cell">
                                    <span>{model.effective.rateLimits.requestsPerMinute} / {model.effective.rateLimits.concurrentRequests}</span>
                                </div>
                            </td>
                            <td>
                                <div className="limit-cell">
                                    <Database size={14} />
                                    <span>{model.effective.maxOutputTokens.toLocaleString()}</span>
                                </div>
                            </td>
                            <td>
                                <div className="limit-cell">
                                    <Clock size={14} />
                                    <span>{model.effective.timeoutMs / 1000}s</span>
                                </div>
                            </td>
                            <td className="text-right">
                                <button className="settings-button">
                                    <Settings2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <style jsx>{`
                .admin-model-table-container {
                    display: flex;
                    flex-direction: column;
                }

                .admin-table {
                    width: 100%;
                    border-collapse: collapse;
                    background-color: #0f172a;
                    border: 1px solid #1e293b;
                    border-radius: 12px;
                    overflow: hidden;
                }

                th {
                    text-align: left;
                    padding: 12px 20px;
                    background-color: #1e293b;
                    color: #94a3b8;
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                }

                td {
                    padding: 16px 20px;
                    border-bottom: 1px solid #1e293b;
                    font-size: 0.9rem;
                }

                .text-right { text-align: right; }

                .model-cell {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .model-icon {
                    width: 32px;
                    height: 32px;
                    background-color: #334155;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #60a5fa;
                }

                .model-meta {
                    display: flex;
                    flex-direction: column;
                }

                .model-name {
                    font-weight: 600;
                    color: #f8fafc;
                }

                .model-key {
                    font-size: 0.75rem;
                    color: #64748b;
                }

                .provider-badge {
                    font-size: 0.7rem;
                    font-weight: 700;
                    color: #94a3b8;
                    padding: 4px 8px;
                    border: 1px solid #334155;
                    border-radius: 4px;
                }

                .status-badge {
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 0.7rem;
                    font-weight: 700;
                }

                .status-badge.active {
                    background-color: #10b9811a;
                    color: #10b981;
                }

                .status-badge.disabled {
                    background-color: #ef44441a;
                    color: #ef4444;
                }

                .override-indicator {
                    margin-left: 8px;
                    font-size: 0.65rem;
                    color: #3b82f6;
                    font-weight: 700;
                    text-transform: uppercase;
                }

                .limit-cell {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #f8fafc;
                }

                .settings-button {
                    background: none;
                    border: none;
                    color: #64748b;
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 4px;
                }

                .settings-button:hover {
                    background-color: #1e293b;
                    color: #f8fafc;
                }
            `}</style>
        </div>
    );
}
