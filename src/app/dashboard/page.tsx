"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import {
    SalesOverviewChart,
    PurchasesSparkline,
    WeeklyComparisonChart,
    SalesProgressChart
} from "@/components/dashboard/Charts";
import {
    Bell,
    Search,
    UserCircle,
    Loader2,
    LogOut,
    ArrowUpRight,
    TrendingUp,
    Activity,
    DollarSign,
    LayoutDashboard,
    Zap,
    Menu
} from "lucide-react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// --- Mock Data ---
const OVERVIEW_DATA = [
    { name: 'Jan', lines: 12000, prevLines: 8000 },
    { name: 'Feb', lines: 25000, prevLines: 15000 },
    { name: 'Mar', lines: 48520, prevLines: 32000 },
];

const SPARKLINE_DATA = [
    { value: 120 }, { value: 450 }, { value: 200 }, { value: 800 }, { value: 600 }, { value: 1200 }, { value: 950 }
];

const WEEKLY_DATA = [
    { day: 'Sun', value: 150 },
    { day: 'Mon', value: 2400 },
    { day: 'Tue', value: 1800 },
    { day: 'Wed', value: 3200 },
    { day: 'Thu', value: 2100 },
    { day: 'Fri', value: 4500 },
    { day: 'Sat', value: 800 },
];

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [userData, statsData] = await Promise.all([
                    api.get("/auth/me"),
                    api.get("/user/stats")
                ]);

                setUser(userData.user || userData);
                setStats(statsData.stats);
            } catch (err: any) {
                console.error("Dashboard Fetch Error:", err);
                router.push("/auth/login");
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0B1220]">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
            </div>
        );
    }

    const balancePercent = Math.min(((stats?.balance || user?.coins || 0) / 1000) * 100, 100);

    return (
        <div className="min-h-screen bg-[#0B1220] font-outfit">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="lg:ml-64 p-4 lg:p-8">
                {/* Modern Header */}
                <header className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8 bg-[#111827] p-6 rounded-2xl border border-[#1F2937]">
                    <div className="flex items-center justify-between w-full lg:w-auto">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
                            >
                                <Menu size={24} />
                            </button>
                            <div>
                                <h1 className="text-xl font-extrabold text-white tracking-tight">WORKSPACE</h1>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Personal Compute & Token Metrics</p>
                            </div>
                        </div>

                        {/* Mobile Profile Trigger (Optional, but good for symmetry) */}
                        <div className="flex lg:hidden items-center gap-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                                <Zap className="w-4 h-4 text-blue-500 fill-blue-500" />
                                <span className="text-sm font-bold text-white">{(stats?.balance || user?.coins || 0).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group hidden md:block">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search analytics..."
                                className="py-2.5 pl-10 pr-4 text-xs rounded-xl w-64 bg-[#0B1220] border border-[#1F2937] text-white outline-none focus:border-blue-500 transition-all"
                            />
                        </div>
                        <div className="hidden lg:flex items-center gap-4">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                                <Zap className="w-4 h-4 text-blue-500 fill-blue-500" />
                                <span className="text-sm font-bold text-white">{(stats?.balance || user?.coins || 0).toLocaleString()} <span className="text-[10px] text-slate-500">COINS</span></span>
                            </div>
                            <div className="flex items-center gap-3 bg-[#0B1220] p-1.5 rounded-xl border border-[#1F2937]">
                                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                                    {user?.name?.charAt(0) || "G"}
                                </div>
                                <span className="text-xs font-bold text-white pr-2 hidden sm:block">{user?.name || "Admin"}</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Grid Floor */}
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

                    {/* Left Column - Large Chart */}
                    <div className="xl:col-span-1 space-y-6">
                        <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6 shadow-2xl">
                            <div className="mb-6">
                                <h3 className="text-white font-bold text-lg mb-1">Development Velocity</h3>
                                <p className="text-xs text-slate-500">Cumulative lines of code assisted by AI</p>
                            </div>

                            <SalesOverviewChart data={stats?.overviewData || OVERVIEW_DATA} />

                            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-[#1F2937]">
                                <div>
                                    <p className="text-2xl font-black text-white">{(stats?.locCount || 0).toLocaleString()}</p>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Total LOC</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-black text-slate-400">{(stats?.locCount * 0.7 || 0).toLocaleString()}</p>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Prev Period</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column - Multi Widgets */}
                    <div className="xl:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Purchases Widget */}
                            <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Coin Consumption</p>
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-2xl font-black text-white">{(stats?.totalUsage || 0).toLocaleString()}</h2>
                                            <span className="bg-blue-600/10 text-blue-500 text-[10px] font-bold px-2 py-0.5 rounded-full">Total Spent</span>
                                        </div>
                                    </div>
                                    <TrendingUp className="text-slate-600" size={20} />
                                </div>
                                <PurchasesSparkline data={stats?.dailyUsage || SPARKLINE_DATA} />
                            </div>

                            {/* Sales Progress Widget */}
                            <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6">
                                <div className="mb-2">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Project Milestone</p>
                                    <p className="text-xs text-white">Compute Readiness</p>
                                </div>
                                <SalesProgressChart value={balancePercent} total={100} />
                            </div>
                        </div>

                        {/* Combo Chart Large Widget */}
                        <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-8">
                            <div className="mb-8">
                                <h3 className="text-white font-bold text-lg mb-1">Activity Breakdown</h3>
                                <p className="text-xs text-slate-500">Resource allocation vs Token usage</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
                                <div className="lg:col-span-2">
                                    <div className="flex justify-between items-end mb-4">
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Weekly Tokens</p>
                                            <h2 className="text-3xl font-black text-white">{(stats?.totalUsage / 1000).toFixed(1)}K</h2>
                                            <p className="text-[10px] text-slate-400 mt-2 max-w-[200px]">Real-time token processing across all active AI agents</p>
                                        </div>
                                    </div>
                                    <WeeklyComparisonChart data={stats?.weeklyData || WEEKLY_DATA} />
                                </div>

                                <div className="space-y-6">
                                    <div className="p-4 bg-[#0B1220] rounded-2xl border border-[#1F2937]">
                                        <p className="text-sm font-black text-white">{stats?.activeAgents || 2}</p>
                                        <p className="text-[10px] font-bold text-slate-500">Active Agents</p>
                                    </div>
                                    <div className="p-4 bg-[#0B1220] rounded-2xl border border-[#1F2937]">
                                        <p className="text-sm font-black text-white">1.2ms</p>
                                        <p className="text-[10px] font-bold text-slate-500">Avg Latency</p>
                                    </div>
                                    <div className="p-4 bg-[#0B1220] rounded-2xl border border-[#1F2937]">
                                        <p className="text-sm font-black text-white">{stats?.projectCount || 0}</p>
                                        <p className="text-[10px] font-bold text-slate-500">Live Projects</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Bar Stats */}
                    <div className="xl:col-span-1">
                        <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-8 h-full">
                            <div className="mb-10">
                                <h3 className="text-white font-bold text-lg mb-1">Weekly Productivity</h3>
                                <p className="text-xs text-slate-500">Active coding hours per day</p>
                            </div>

                            <div className="space-y-6 mb-10">
                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
                                    <div key={day} className="flex items-center gap-4">
                                        <span className="text-[10px] font-bold text-slate-500 w-8">{day}</span>
                                        <div className="flex-1 h-8 bg-[#0B1220] rounded-lg overflow-hidden relative">
                                            <div
                                                className="absolute left-0 top-0 h-full bg-blue-600 rounded-lg transition-all"
                                                style={{ width: `${60 + (i * 5)}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-[#1F2937]">
                                <div>
                                    <p className="text-2xl font-black text-white">124h</p>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Total Time</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-black text-slate-400">98h</p>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Prev Week</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
