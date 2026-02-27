"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import CoinCard from "@/components/dashboard/CoinCard";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import { motion } from "framer-motion";
import { Bell, Search, UserCircle } from "lucide-react";

export default function DashboardPage() {
    // Mock data for initial UI assembly
    const user = { name: "Benjamin", balance: 1250 };

    return (
        <div className="min-h-screen bg-godzilla-bg">
            <Sidebar />

            <main className="ml-64 p-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-white mb-2">Welcome Back, {user.name}</h1>
                        <p className="text-godzilla-text-muted font-medium">Here's what's happening with your Godzilla Coder account.</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <Search className="w-5 h-5 text-godzilla-text-muted group-focus-within:text-godzilla-accent transition-colors absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search resources..."
                                className="bg-godzilla-surface border border-godzilla-border rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-godzilla-accent transition-all w-64"
                            />
                        </div>
                        <button className="relative p-3 bg-godzilla-surface border border-godzilla-border rounded-xl text-godzilla-text-muted hover:text-white transition-all">
                            <Bell className="w-5 h-5" />
                            <div className="absolute top-3 right-3 w-2 h-2 bg-godzilla-accent rounded-full border-2 border-godzilla-surface" />
                        </button>
                        <div className="flex items-center gap-3 pl-6 border-l border-godzilla-border">
                            <div className="text-right">
                                <p className="text-sm font-bold text-white leading-none mb-1">{user.name}</p>
                                <p className="text-[10px] font-bold text-godzilla-accent uppercase tracking-widest leading-none">Pro Plan</p>
                            </div>
                            <UserCircle className="w-10 h-10 text-godzilla-text-muted" />
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="lg:col-span-1">
                        <CoinCard balance={user.balance} />
                    </div>

                    <div className="lg:col-span-2">
                        <TransactionHistory />
                    </div>
                </div>

                {/* AI Agent Status / Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {["GPT-4o", "Claude 3.5", "Gemini 1.5", "DeepSeek"].map((agent) => (
                        <div key={agent} className="bg-godzilla-surface p-6 rounded-2xl border border-godzilla-border flex items-center justify-between group hover:border-godzilla-accent transition-all cursor-pointer">
                            <div>
                                <p className="text-xs font-bold text-godzilla-text-muted uppercase tracking-widest mb-1">Status</p>
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
