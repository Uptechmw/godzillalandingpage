import React from 'react';
import { PageHeader } from '@/components/admin/PageHeader';
import { AdminUserTable } from '@/components/admin/UserTable';
import { AdminUserManagementService } from '@/services/admin/users/user-management.service';
import { UserPlus, Download } from 'lucide-react';

export default async function AdminUsersPage() {
    const users = await AdminUserManagementService.listUsers({ limit: 100 });

    return (
        <div className="admin-users-page">
            <PageHeader
                title="User Management"
                subtitle="View and manage user accounts, balances, and system access."
            >
                <button className="btn btn-secondary">
                    <Download size={18} />
                    <span>Export CSV</span>
                </button>
                <button className="btn btn-primary">
                    <UserPlus size={18} />
                    <span>Create User</span>
                </button>
            </PageHeader>

            <AdminUserTable users={users as any} />

            <style jsx>{`
                .admin-users-page {
                    display: flex;
                    flex-direction: column;
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
                    transition: all 0.2s;
                }

                .btn-primary {
                    background-color: #3b82f6;
                    color: white;
                    border: none;
                }

                .btn-primary:hover {
                    background-color: #2563eb;
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
