"use client";

import { motion } from "framer-motion";
import { Users, BarChart3, ShieldAlert, Cpu, Activity, Search, Globe } from "lucide-react";

export default function AdminDashboardPage() {
    const stats = [
        { label: "Total Users", value: "1,284", icon: Users, color: "text-blue-400" },
        { label: "AI Requests (24h)", value: "42.5k", icon: Cpu, color: "text-godzilla-accent" },
        { label: "Coin Volume", value: "250k", icon: BarChart3, color: "text-amber-400" },
        { label: "Active Nodes", value: "12", icon: Globe, color: "text-purple-400" },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <ShieldAlert className="w-5 h-5 text-red-500" />
                        <span className="text-xs font-black text-red-500 uppercase tracking-widest">Administrator Console</span>
                    </div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter">System Oversight</h1>
                </div>

                <div className="flex gap-4">
                    <button className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-lg font-bold text-sm">Emergency Stop</button>
                    <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg font-bold text-sm">Export Data</button>
                </div>
            </header>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-godzilla-surface border border-godzilla-border p-6 rounded-2xl relative overflow-hidden"
                    >
                        <div className={`mb-4 ${stat.color}`}>
                            <stat.icon className="w-8 h-8" />
                        </div>
                        <p className="text-godzilla-text-muted text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-3xl font-black tracking-tight">{stat.value}</p>
                        <div className={`absolute bottom-0 left-0 h-1 w-full opacity-20 bg-current ${stat.color}`} />
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* User Management Table */}
                <div className="lg:col-span-2 bg-godzilla-surface border border-godzilla-border rounded-2xl overflow-hidden">
                    <div className="p-6 border-b border-godzilla-border flex justify-between items-center">
                        <h3 className="font-bold flex items-center gap-2">
                            <Users className="w-4 h-4 text-godzilla-accent" />
                            User Directory
                        </h3>
                        <div className="relative">
                            <Search className="w-4 h-4 text-godzilla-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                            <input type="text" placeholder="Filter users..." className="bg-black/50 border border-godzilla-border rounded-lg pl-9 pr-3 py-2 text-xs focus:border-godzilla-accent outline-none w-48" />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-white/5 text-godzilla-text-muted uppercase text-[10px] font-bold tracking-widest">
                                <tr>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Balance</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-godzilla-border">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <tr key={i} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-gradient-to-br from-godzilla-accent to-godzilla-tertiary rounded-full opacity-50" />
                                                <div>
                                                    <p className="font-bold text-white">user_{i}@example.com</p>
                                                    <p className="text-[10px] text-godzilla-text-muted">UID: GZ-99{i}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-godzilla-accent/10 text-godzilla-accent rounded text-[10px] font-black uppercase">Active</span>
                                        </td>
                                        <td className="px-6 py-4 font-bold">{(i * 500).toLocaleString()} <span className="text-[10px] opacity-40">GZ</span></td>
                                        <td className="px-6 py-4">
                                            <button className="text-godzilla-text-muted hover:text-white transition-colors">Adjust Balance</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* AI Health / Diagnostics */}
                <div className="bg-godzilla-surface border border-godzilla-border rounded-2xl p-6">
                    <h3 className="font-bold mb-6 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-godzilla-accent" />
                        AI Node Health
                    </h3>
                    <div className="space-y-6">
                        {["GPT-4o Proxy", "Claude Agent", "Gemini Gateway", "Stripe Webhook"].map((service) => (
                            <div key={service} className="space-y-2">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-godzilla-text-muted">{service}</span>
                                    <span className="text-godzilla-accent">99.9% Uptime</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "99.9%" }}
                                        className="h-full bg-godzilla-accent"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                        <div className="flex items-start gap-3">
                            <BarChart3 className="w-5 h-5 text-amber-500 shrink-0" />
                            <div>
                                <p className="text-xs font-bold text-amber-500 mb-1 uppercase tracking-widest">Rate Limit Warning</p>
                                <p className="text-[10px] text-godzilla-text-muted leading-tight">Gemini Gateway is approaching 80% quota for the current period.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
