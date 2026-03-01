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
        </div>
    );
}
