"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import CoinCard from "@/components/dashboard/CoinCard";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import { motion } from "framer-motion";
import { Bell, Search, UserCircle, Loader2, LogOut } from "lucide-react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                const userData = await api.get("/auth/me");
                setUser(userData.user || userData);
            } catch (err: any) {
                console.error("Dashboard Fetch Error:", err);
                router.push("/auth/login?error=" + encodeURIComponent("Please log in to access your dashboard."));
                return;
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-primary)' }}>
                <Loader2 className="w-10 h-10 animate-spin" style={{ color: 'var(--color-accent)' }} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center" style={{ background: 'var(--color-primary)' }}>
                <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>Unable to Load Dashboard</h2>
                <p className="mb-8" style={{ color: 'var(--color-muted)' }}>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 rounded-lg font-semibold"
                    style={{ background: 'var(--color-accent)', color: '#fff' }}
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ background: 'var(--color-primary)' }}>
            <Sidebar />

            <main className="lg:ml-64 p-4 lg:p-8">
                {/* Header */}
                <header className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-10">
                    <div className="flex justify-between items-start w-full lg:w-auto">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                                Welcome back, <span style={{ color: 'var(--color-accent)' }}>{user?.name || "there"}</span>
                            </h1>
                            <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                                Here's what's happening with your account today.
                            </p>
                        </div>

                        {/* Mobile sign out */}
                        <button
                            onClick={async () => { await supabase.auth.signOut(); router.push("/"); }}
                            className="lg:hidden p-3 rounded-xl transition-all"
                            style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.15)', color: 'var(--color-danger)' }}
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="relative group hidden md:block">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 transition-colors" style={{ color: 'var(--color-muted)' }} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="py-2.5 pl-10 pr-4 text-sm rounded-lg w-56 outline-none transition-all"
                                style={{
                                    background: 'var(--color-surface)',
                                    border: '1px solid var(--color-border)',
                                    color: 'var(--color-text)',
                                }}
                                onFocus={e => (e.currentTarget.style.border = '1px solid var(--color-accent)')}
                                onBlur={e => (e.currentTarget.style.border = '1px solid var(--color-border)')}
                            />
                        </div>

                        <button className="relative p-2.5 rounded-lg transition-all" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}>
                            <Bell className="w-5 h-5" />
                            <div className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: 'var(--color-accent)' }} />
                        </button>

                        <div className="flex items-center gap-3 pl-4" style={{ borderLeft: '1px solid var(--color-border)' }}>
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold leading-none mb-1" style={{ color: 'var(--color-text)' }}>{user?.name || "User"}</p>
                                <p className="text-xs" style={{ color: 'var(--color-accent)' }}>Pro Member</p>
                            </div>
                            <UserCircle className="w-9 h-9" style={{ color: 'var(--color-muted)' }} />
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="lg:col-span-1">
                        <CoinCard balance={user?.coins || 0} />
                    </div>
                    <div className="lg:col-span-2">
                        <TransactionHistory />
                    </div>
                </div>

                {/* AI Models Status */}
                <div>
                    <h2 className="text-sm font-semibold mb-4 uppercase tracking-wide" style={{ color: 'var(--color-muted)' }}>Available AI Models</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: "GPT-4o", provider: "OpenAI" },
                            { name: "Claude 3.5", provider: "Anthropic" },
                            { name: "Gemini 1.5", provider: "Google" },
                            { name: "DeepSeek", provider: "DeepSeek" },
                        ].map((model) => (
                            <div
                                key={model.name}
                                className="p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all"
                                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                            >
                                <div>
                                    <p className="text-xs mb-0.5" style={{ color: 'var(--color-muted)' }}>{model.provider}</p>
                                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{model.name}</p>
                                </div>
                                <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--color-success)', boxShadow: '0 0 8px rgba(22,163,74,0.5)' }} />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
