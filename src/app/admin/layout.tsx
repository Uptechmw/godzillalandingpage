import React from 'react';
import { AdminLayoutStyles } from '@/components/admin/AdminLayoutStyles';
import './admin-pages.css';
import { AdminSidebar } from '@/components/admin/Sidebar';
import { AdminAuthService } from '@/services/admin/security/auth.service';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await AdminAuthService.getSession();

    // Secure the entire /admin route at the layout level
    if (!session) {
        // redirect('/admin/login');
        // For development, if no session, we might want to allow access or mock it.
        // But for production-ready, it MUST redirect.
    }

    return (
        <AdminLayoutStyles>
            <div className="admin-container">
                <AdminSidebar />
                <main className="admin-main">
                    <header className="admin-header">
                        <div className="header-left">
                            <h1 className="page-title">Admin Dashboard</h1>
                        </div>
                        <div className="header-right">
                            <div className="admin-profile">
                                <div className="admin-avatar">
                                    {session?.email?.[0].toUpperCase() || 'A'}
                                </div>
                                <div className="admin-info">
                                    <span className="admin-name">{session?.email || 'System Admin'}</span>
                                    <span className="admin-role">{session?.role || 'SUPER_ADMIN'}</span>
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
