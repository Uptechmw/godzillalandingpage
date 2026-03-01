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
        </div>
    );
}
