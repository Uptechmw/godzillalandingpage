"use client";

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/Sidebar';
import { AdminStatusIndicator } from '@/components/admin/StatusIndicator';
import { Menu, X, Shield } from 'lucide-react';

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

            <main className="admin-main bg-[#0B1220] min-h-screen">
                <header className="admin-header h-16 border-b border-[#1F2937] bg-[#111827] px-6 flex items-center justify-between sticky top-0 z-50">
                    <div className="header-left flex items-center gap-4">
                        <button
                            className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={20} />
                        </button>
                        <div className="flex items-center gap-2">
                            <Shield className="text-blue-500 w-5 h-5" />
                            <h1 className="text-sm font-bold text-[#F1F5F9] uppercase tracking-widest hidden sm:block">Management Cloud</h1>
                            <h1 className="text-sm font-bold text-[#F1F5F9] uppercase tracking-widest sm:hidden">Cloud</h1>
                        </div>
                    </div>

                    <div className="header-right flex items-center gap-6">
                        <div className="hidden md:block">
                            <AdminStatusIndicator />
                        </div>
                        <div className="flex items-center gap-3 pl-6 border-l border-[#1F2937]">
                            <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-[11px] font-bold text-blue-400">
                                {session?.email?.[0].toUpperCase() || 'A'}
                            </div>
                            <div className="hidden sm:flex flex-col text-right">
                                <span className="text-[11px] font-bold text-[#F1F5F9] leading-tight">{session?.name || session?.email.split('@')[0]}</span>
                                <span className="text-[9px] font-bold text-[#475569] uppercase tracking-tighter">{session?.role.replace('_', ' ')}</span>
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
