import React from 'react';
import { PageHeader } from '@/components/admin/PageHeader';
import { AdminAuditLogTable } from '@/components/admin/AuditLogTable';
import { AdminAuditLogService } from '@/services/admin/logs/audit-log.service';
import { Filter, Search, Download } from 'lucide-react';

export default async function AdminLogsPage() {
    const logs = await AdminAuditLogService.listLogs({ limit: 100 });

    return (
        <div className="admin-logs-page">
            <PageHeader
                title="System Audit Logs"
                subtitle="Transparent history of all administrative actions and security events."
            >
                <button className="btn btn-secondary">
                    <Download size={18} />
                    <span>Export CSV</span>
                </button>
            </PageHeader>

            <div className="search-filter-bar">
                <div className="search-box">
                    <Search size={18} />
                    <input type="text" placeholder="Search by Admin ID or Action..." />
                </div>
                <div className="filter-group">
                    <select className="filter-select">
                        <option value="">All Modules</option>
                        <option value="USERS">Users</option>
                        <option value="SETTINGS">Settings</option>
                        <option value="AI_MODELS">AI Models</option>
                        <option value="BILLING">Billing</option>
                    </select>
                </div>
            </div>

            <AdminAuditLogTable logs={logs as any} />

            <style jsx>{`
                .admin-logs-page {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                .search-filter-bar {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 8px;
                }

                .search-box {
                    flex: 1;
                    max-width: 400px;
                    background-color: #0f172a;
                    border: 1px solid #1e293b;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    padding: 0 12px;
                    gap: 10px;
                    color: #64748b;
                }

                .search-box input {
                    background: none;
                    border: none;
                    height: 40px;
                    width: 100%;
                    color: #fff;
                    font-size: 0.9rem;
                    outline: none;
                }

                .filter-select {
                    background-color: #0f172a;
                    border: 1px solid #1e293b;
                    border-radius: 8px;
                    height: 40px;
                    padding: 0 12px;
                    color: #94a3b8;
                    font-size: 0.85rem;
                    outline: none;
                    cursor: pointer;
                }

                .btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    border-radius: 8px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    cursor: pointer;
                }

                .btn-secondary {
                    background-color: #0f172a;
                    border: 1px solid #1e293b;
                    color: #94a3b8;
                }

                .btn-secondary:hover {
                    background-color: #1e293b;
                    color: #f8fafc;
                }
            `}</style>
        </div>
    );
}
