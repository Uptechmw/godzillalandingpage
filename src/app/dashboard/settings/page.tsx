"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import UserSettingsClient from "@/components/dashboard/UserSettingsClient";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function SettingsPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

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
            <Sidebar />
            <main className="lg:ml-64 p-4 lg:p-10">
                <header className="mb-10 bg-[#111827] p-8 rounded-3xl border border-[#1F2937] shadow-xl">
                    <h1 className="text-3xl font-black text-white mb-2 tracking-tight uppercase">SYSTEM PREFERENCES</h1>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Manage your neural identity and compute allocation</p>
                </header>

                <div className="max-w-6xl">
                    <UserSettingsClient user={user} />
                </div>
            </main>
        </div>
    );
}
