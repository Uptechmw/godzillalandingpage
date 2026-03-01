"use client";

import React from 'react';
import {
    SalesOverviewChart,
    PurchasesSparkline,
    WeeklyComparisonChart,
    SalesProgressChart
} from "@/components/dashboard/Charts";
import {
    Users,
    Zap,
    CreditCard,
    AlertCircle,
    Activity,
    Search,
    Shield,
    Terminal
} from 'lucide-react';
import Link from 'next/link';

// --- Mock Data for Admin View ---
const USER_GROWTH_DATA = [
    { name: 'Jan', sales: 1200, prevSales: 1000 },
    { name: 'Feb', sales: 2100, prevSales: 1800 },
    { name: 'Mar', sales: 3400, prevSales: 2500 },
];

const TOKEN_SPARKLINE = [
    { value: 50 }, { value: 80 }, { value: 60 }, { value: 120 }, { value: 90 }, { value: 150 }, { value: 130 }
];

const SYSTEM_LOAD_DATA = [
    { day: 'Sun', value: 20 },
    { day: 'Mon', value: 85 },
    { day: 'Tue', value: 70 },
    { day: 'Wed', value: 95 },
    { day: 'Thu', value: 80 },
    { day: 'Fri', value: 90 },
    { day: 'Sat', value: 40 },
];

export default function AdminDashboardClient({
    userCount,
    tokensUsedToday,
    totalRevenue,
    growthData,
    systemLoad
}: {
    userCount: number,
    tokensUsedToday: string,
    totalRevenue: number,
    growthData?: any[],
    systemLoad?: any[]
}) {
    return (
        <div className="font-outfit">
            {/* Modern Admin Header */}
            <header className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8 bg-[#111827] p-6 rounded-2xl border border-[#1F2937]">
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="text-xl font-extrabold text-white tracking-tight">COMMAND CENTER</h1>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System-Wide Intelligence & Oversight</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group hidden md:block">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search system logs..."
                            className="py-2.5 pl-10 pr-4 text-xs rounded-xl w-64 bg-[#0B1220] border border-[#1F2937] text-white outline-none focus:border-blue-500 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Systems Nominal</span>
                    </div>
                </div>
            </header>

            {/* Admin Grid Floor */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

                {/* Left Column - User Growth */}
                <div className="xl:col-span-1 space-y-6">
                    <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6 shadow-2xl">
                        <div className="mb-6">
                            <h3 className="text-white font-bold text-lg mb-1">User Acquisition</h3>
                            <p className="text-xs text-slate-500">Monthly active user growth trend</p>
                        </div>

                        <SalesOverviewChart data={growthData || USER_GROWTH_DATA} />

                        <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-[#1F2937]">
                            <div>
                                <p className="text-2xl font-black text-white">{userCount}</p>
                                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Total Users</p>
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-400">{(userCount * 0.8).toFixed(0)}</p>
                                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Prev Period</p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            {[
                                { label: "Verified Users", val: (userCount * 0.9).toFixed(0), ly: "90%" },
                                { label: "Premium Subs", val: (userCount * 0.15).toFixed(0), ly: "15%" },
                                { label: "New Today", val: "12", ly: "+5%" },
                            ].map(row => (
                                <div key={row.label} className="flex justify-between items-center text-[10px] font-bold">
                                    <span className="text-slate-400">{row.label}</span>
                                    <div className="flex gap-4">
                                        <span className="text-white">{row.val}</span>
                                        <span className="text-blue-500">{row.ly}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Middle Column - System Metrics */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Token Consumption Widget */}
                        <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Compute Load</p>
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-2xl font-black text-white">{tokensUsedToday}</h2>
                                        <span className="bg-blue-600/10 text-blue-500 text-[10px] font-bold px-2 py-0.5 rounded-full">Tokens/24h</span>
                                    </div>
                                </div>
                                <Activity className="text-slate-600" size={20} />
                            </div>
                            <PurchasesSparkline data={TOKEN_SPARKLINE} />
                        </div>

                        {/* Financial Widget */}
                        <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6">
                            <div className="mb-2">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Revenue Target</p>
                                <p className="text-xs text-white">Monthly Coin Circulation</p>
                            </div>
                            <SalesProgressChart value={totalRevenue > 100000 ? 100 : (totalRevenue / 100000) * 100} total={100} />
                        </div>
                    </div>

                    {/* System Activity Chart */}
                    <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-8">
                        <div className="mb-8">
                            <h3 className="text-white font-bold text-lg mb-1">Global Resource Allocation</h3>
                            <p className="text-xs text-slate-500">Weekly GPU & API usage across all nodes</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
                            <div className="lg:col-span-2">
                                <div className="flex justify-between items-end mb-4">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Weekly Compute</p>
                                        <h2 className="text-3xl font-black text-white">89.4%</h2>
                                        <p className="text-[10px] text-slate-400 mt-2 max-w-[200px]">Average system utilization across global AI clusters</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                                            <span className="text-[10px] font-bold text-slate-500">Prod</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-300" />
                                            <span className="text-[10px] font-bold text-slate-500">Staging</span>
                                        </div>
                                    </div>
                                </div>
                                <WeeklyComparisonChart data={systemLoad || SYSTEM_LOAD_DATA} />
                            </div>

                            <div className="space-y-6">
                                <div className="p-4 bg-[#0B1220] rounded-2xl border border-[#1F2937]">
                                    <p className="text-sm font-black text-white">450ms</p>
                                    <p className="text-[10px] font-bold text-slate-500">Avg Response</p>
                                </div>
                                <div className="p-4 bg-[#0B1220] rounded-2xl border border-[#1F2937]">
                                    <p className="text-sm font-black text-white">99.9%</p>
                                    <p className="text-[10px] font-bold text-slate-500">API Uptime</p>
                                </div>
                                <div className="p-4 bg-[#0B1220] rounded-2xl border border-[#1F2937]">
                                    <p className="text-sm font-black text-white">1.2M</p>
                                    <p className="text-[10px] font-bold text-slate-500">Total Requests</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - System Health */}
                <div className="xl:col-span-1">
                    <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-8 h-full">
                        <div className="mb-10 flex justify-between items-start">
                            <div>
                                <h3 className="text-white font-bold text-lg mb-1">System Health</h3>
                                <p className="text-xs text-slate-500">Active node status & connectivity</p>
                            </div>
                            <Shield className="text-blue-500" size={20} />
                        </div>

                        <div className="space-y-4">
                            {[
                                { name: "PostgreSQL DB", status: "Nominal", color: "text-green-500" },
                                { name: "Redis Cache", status: "Nominal", color: "text-green-500" },
                                { name: "Gemini Pro API", status: "Stellar", color: "text-blue-500" },
                                { name: "Claude 3 API", status: "Nominal", color: "text-green-500" },
                                { name: "Compute Node A1", status: "Active", color: "text-green-500" },
                                { name: "Compute Node B4", status: "High Load", color: "text-amber-500" },
                            ].map((node) => (
                                <div key={node.name} className="flex justify-between items-center p-3 bg-[#0B1220] rounded-xl border border-[#1F2937]">
                                    <span className="text-[10px] font-bold text-slate-300">{node.name}</span>
                                    <span className={`text-[9px] font-black uppercase tracking-widest ${node.color}`}>{node.status}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-[#1F2937]">
                            <button className="w-full py-3 bg-[#1F2937] hover:bg-[#374151] text-white rounded-xl text-xs font-bold transition-all border border-[#374151] flex items-center justify-center gap-2">
                                <Terminal size={14} />
                                System Logs
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
