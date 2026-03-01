"use client";

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/Sidebar';
import { AdminStatusIndicator } from '@/components/admin/StatusIndicator';
import { Menu, X } from 'lucide-react';

export function AdminDashboardLayout({
    children,
    session
}: {
    children: React.ReactNode;
    session: any;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="admin-container relative">
            <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="admin-main">
                <header className="admin-header">
                    <div className="header-left flex items-center gap-4">
                        <button
                            className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="page-title hidden sm:block">Management Console</h1>
                        <h1 className="page-title sm:hidden">Console</h1>
                    </div>

                    <div className="header-right">
                        <div className="hidden md:block">
                            <AdminStatusIndicator />
                        </div>
                        <div className="admin-profile">
                            <div className="admin-avatar">
                                {session?.email?.[0].toUpperCase() || 'A'}
                            </div>
                            <div className="admin-info hidden sm:flex">
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
    );
}
