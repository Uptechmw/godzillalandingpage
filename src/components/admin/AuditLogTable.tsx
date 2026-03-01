import React from 'react';
import {
    Clock,
    User,
    Activity,
    Database,
    Shield,
    ExternalLink
} from 'lucide-react';

interface AuditLog {
    id: string;
    action: string;
    module: string;
    targetId: string | null;
    ipAddress: string | null;
    createdAt: Date;
    admin: {
        email: string;
        name: string | null;
    };
    oldValue: any;
    newValue: any;
}

interface AdminAuditLogTableProps {
    logs: AuditLog[];
}

export function AdminAuditLogTable({ logs }: AdminAuditLogTableProps) {
    return (
        <div className="audit-log-table-container">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Admin</th>
                        <th>Action</th>
                        <th>Module</th>
                        <th>Target</th>
                        <th className="text-right">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="empty-row">No audit logs found.</td>
                        </tr>
                    ) : (
                        logs.map((log) => (
                            <tr key={log.id}>
                                <td>
                                    <div className="time-cell">
                                        <Clock size={14} className="text-slate-500" />
                                        <span>{new Date(log.createdAt).toLocaleString()}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="admin-cell">
                                        <User size={14} />
                                        <span>{log.admin.email}</span>
                                    </div>
                                </td>
                                <td>
                                    <span className="action-badge">{log.action}</span>
                                </td>
                                <td>
                                    <span className="module-name">{log.module}</span>
                                </td>
                                <td>
                                    <code className="target-id">{log.targetId || 'N/A'}</code>
                                </td>
                                <td className="text-right">
                                    <button className="view-details-btn">
                                        <Activity size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <style jsx>{`
                .audit-log-table-container {
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
                    padding: 14px 20px;
                    border-bottom: 1px solid #1e293b;
                    font-size: 0.85rem;
                }

                .text-right { text-align: right; }

                .time-cell, .admin-cell {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #94a3b8;
                }

                .admin-cell span {
                    color: #f8fafc;
                    font-weight: 500;
                }

                .action-badge {
                    background-color: #1e293b;
                    color: #f8fafc;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 0.7rem;
                    font-weight: 700;
                    letter-spacing: 0.3px;
                }

                .module-name {
                    color: #64748b;
                    font-weight: 600;
                    font-size: 0.8rem;
                }

                .target-id {
                    font-family: monospace;
                    background-color: #020617;
                    padding: 2px 6px;
                    border-radius: 4px;
                    color: #3b82f6;
                    font-size: 0.8rem;
                }

                .empty-row {
                    text-align: center;
                    padding: 48px;
                    color: #64748b;
                }

                .view-details-btn {
                    background: none;
                    border: none;
                    color: #64748b;
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 4px;
                }

                .view-details-btn:hover {
                    background-color: #1e293b;
                    color: #f8fafc;
                }
            `}</style>
        </div>
    );
}
