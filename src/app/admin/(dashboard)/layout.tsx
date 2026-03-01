import React from 'react';
import { AdminLayoutStyles } from '@/components/admin/AdminLayoutStyles';
import './admin-pages.css';
import { AdminSidebar } from '@/components/admin/Sidebar';
import { AdminAuthService } from '@/services/admin/security/auth.service';
import { redirect } from 'next/navigation';

import { AdminStatusIndicator } from '@/components/admin/StatusIndicator';

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
            <div className="admin-container">
                <AdminSidebar />
                <main className="admin-main">
                    <header className="admin-header">
                        <div className="header-left">
                            <h1 className="page-title">Management Console</h1>
                        </div>
                        <div className="header-right">
                            <AdminStatusIndicator />
                            <div className="admin-profile">
                                <div className="admin-avatar">
                                    {session?.email?.[0].toUpperCase() || 'A'}
                                </div>
                                <div className="admin-info">
                                    <span className="admin-name">{session?.name || session?.email.split('@')[0]}</span>
                                    <span className="admin-role">{session?.role.replace('_', ' ')}</span>
                                </div>
                            </div>
                        </div>
                    </header>
                    <section className="admin-content">
                        {children}
                    </section>
                </main>
            </div>
        </AdminLayoutStyles>
    );
}
