"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import UserSettingsClient from "@/components/dashboard/UserSettingsClient";
import { api } from "@/lib/api";
import { Loader2, Menu } from "lucide-react";

export default function SettingsPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        api.get("/auth/me")
            .then(res => setUser(res.user || res))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0B1220]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B1220] font-outfit">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <main className="lg:ml-64 p-4 lg:p-10">
                <header className="mb-10 bg-[#111827] p-8 rounded-3xl border border-[#1F2937] shadow-xl flex items-center gap-4">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black text-white mb-2 tracking-tight uppercase">SYSTEM PREFERENCES</h1>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Manage your neural identity and compute allocation</p>
                    </div>
                </header>

                <div className="max-w-6xl">
                    <UserSettingsClient user={user} />
                </div>
            </main>
        </div>
    );
}
