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
                if (!session) {
                    router.push("/auth/login");
                    return;
                }

                const userData = await api.get("/auth/me");
                setUser(userData);
            } catch (err: any) {
                console.error("Dashboard Fetch Error:", err);
                // Handle 401 Unauthorized by gracefully logging out
                if (err.message && (err.message.includes("401") || err.message.includes("Expired") || err.message.includes("Invalid"))) {
                    await supabase.auth.signOut();
                    router.push("/auth/login?error=Session expired. Please log in again.");
                    return;
                }
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-godzilla-bg flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-godzilla-accent animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-godzilla-bg flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-2xl font-black text-white mb-4">Sync Error</h2>
                <p className="text-godzilla-text-muted mb-8">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-godzilla-accent text-black px-8 py-3 rounded-xl font-bold"
                >
                    Retry Connection
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-godzilla-bg">
            <Sidebar />

            <main className="lg:ml-64 p-4 lg:p-8">
                {/* Header */}
                <header className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-10">
                    <div className="flex justify-between items-start w-full lg:w-auto">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tighter uppercase">
                                Commander <span className="text-godzilla-accent">{user.name || "Benjamin"}</span>
                            </h1>
                            <p className="text-godzilla-text-muted font-bold text-[10px] md:text-sm tracking-tight italic">Status: System Online // Atomic Link Active</p>
                        </div>

                        {/* Mobile Logout */}
                        <button
                            onClick={async () => {
                                await supabase.auth.signOut();
                                router.push("/");
                            }}
                            className="lg:hidden p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 hover:bg-red-500/20 transition-all"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="relative group hidden md:block">
                            <Search className="w-5 h-5 text-godzilla-text-muted group-focus-within:text-godzilla-accent transition-colors absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search atomic resources..."
                                className="bg-godzilla-surface border border-godzilla-border rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-godzilla-accent transition-all w-64"
                            />
                        </div>
                        <button className="relative p-3 bg-godzilla-surface border border-godzilla-border rounded-xl text-godzilla-text-muted hover:text-white transition-all">
                            <Bell className="w-5 h-5" />
                            <div className="absolute top-3 right-3 w-2 h-2 bg-godzilla-accent rounded-full border-2 border-godzilla-surface" />
                        </button>
                        <div className="flex items-center gap-3 md:pl-6 md:border-l border-godzilla-border">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black text-white leading-none mb-1 uppercase tracking-tighter">{user.name || "Benjamin"}</p>
                                <p className="text-[10px] font-black text-godzilla-accent uppercase tracking-widest leading-none">Atomic Elite</p>
                            </div>
                            <UserCircle className="w-10 h-10 text-godzilla-text-muted" />
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="lg:col-span-1">
                        <CoinCard balance={user.coins || 0} />
                    </div>

                    <div className="lg:col-span-2">
                        <TransactionHistory />
                    </div>
                </div>

                {/* AI Agent Status */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["GPT-4o", "Claude 3.5", "Gemini 1.5", "DeepSeek"].map((agent) => (
                        <div key={agent} className="bg-godzilla-surface p-6 rounded-2xl border border-dotted border-godzilla-border flex items-center justify-between group hover:border-godzilla-accent transition-all cursor-pointer">
                            <div>
                                <p className="text-[10px] font-black text-godzilla-text-muted uppercase tracking-widest mb-1">Neural Node</p>
                                <p className="text-white font-black">{agent}</p>
                            </div>
                            <div className="w-3 h-3 bg-godzilla-accent rounded-full shadow-[0_0_10px_#00ff94]" />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
