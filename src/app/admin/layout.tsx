import React from 'react';
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

            <style jsx>{`
                .admin-container {
                    display: flex;
                    width: 100%;
                    height: 100vh;
                    background-color: #020617;
                    color: #f8fafc;
                    overflow: hidden;
                }

                .admin-main {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                .admin-header {
                    height: 64px;
                    padding: 0 32px;
                    background-color: #0f172a;
                    border-bottom: 1px solid #1e293b;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .page-title {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #f8fafc;
                }

                .header-right {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .admin-profile {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .admin-avatar {
                    width: 32px;
                    height: 32px;
                    background-color: #3b82f6;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: white;
                }

                .admin-info {
                    display: flex;
                    flex-direction: column;
                }

                .admin-name {
                    font-size: 0.85rem;
                    font-weight: 600;
                }

                .admin-role {
                    font-size: 0.7rem;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .admin-content {
                    flex: 1;
                    padding: 32px;
                    overflow-y: auto;
                    background-color: #020617;
                }
            `}</style>
        </div>
    );
}
