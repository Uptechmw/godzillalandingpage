import React from 'react';
import { PageHeader } from '@/components/admin/PageHeader';
import AdminSettingsClient from '@/components/admin/AdminSettingsClient';

export default async function AdminSettingsPage() {
    return (
        <div className="admin-settings-page">
            <PageHeader
                title="COMMAND CONFIG"
                subtitle="Manage encrypted node secrets and decentralized AI provider clusters."
            />

            <AdminSettingsClient />
        </div>
    );
}
