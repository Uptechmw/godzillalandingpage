import React from 'react';
import { AdminLayoutStyles } from '@/components/admin/AdminLayoutStyles';
import './admin-pages.css';
import { AdminSidebar } from '@/components/admin/Sidebar';
import { AdminAuthService } from '@/services/admin/security/auth.service';
import { redirect } from 'next/navigation';

import { AdminStatusIndicator } from '@/components/admin/StatusIndicator';

import { AdminDashboardLayout } from '@/components/admin/AdminDashboardLayout';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await AdminAuthService.getSession();

    // Secure the entire /admin route at the layout level (Node.js layer)
    if (!session) {
        redirect('/admin/login?error=unauthorized_admin');
    }

    return (
        <AdminLayoutStyles>
            <AdminDashboardLayout session={session}>
                {children}
            </AdminDashboardLayout>
        </AdminLayoutStyles>
    );
}
