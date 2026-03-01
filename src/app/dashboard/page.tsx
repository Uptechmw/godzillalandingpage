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
    LayoutDashboard
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
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await api.get("/auth/me");
                setUser(userData.user || userData);
            } catch (err: any) {
                console.error("Dashboard Fetch Error:", err);
                router.push("/auth/login");
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0B1220]">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B1220] font-outfit">
            <Sidebar />

            <main className="lg:ml-64 p-4 lg:p-8">
                {/* Modern Header */}
                <header className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8 bg-[#111827] p-6 rounded-2xl border border-[#1F2937]">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div>
                                <h1 className="text-xl font-extrabold text-white tracking-tight">WORKSPACE</h1>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Personal Compute & Token Metrics</p>
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
                        <div className="flex items-center gap-3 bg-[#0B1220] p-1.5 rounded-xl border border-[#1F2937]">
                            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                                {user?.name?.charAt(0) || "G"}
                            </div>
                            <span className="text-xs font-bold text-white pr-2 hidden sm:block">{user?.name || "Admin"}</span>
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
                                <p className="text-xs text-slate-500">Cumulative lines of code written across projects</p>
                            </div>

                            <SalesOverviewChart data={OVERVIEW_DATA} />

                            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-[#1F2937]">
                                <div>
                                    <p className="text-2xl font-black text-white">48,520</p>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Total LOC</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-black text-slate-400">32,100</p>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Prev Period</p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                {[
                                    { label: "Frontend Web", val: "23,497", ly: "18,200", u: "12 Projects" },
                                    { label: "Backend API", val: "21,976", ly: "12,500", u: "8 Projects" },
                                    { label: "AI Training", val: "3,047", ly: "1,400", u: "2 Tasks" },
                                ].map(row => (row.label && (
                                    <div key={row.label} className="flex justify-between items-center text-[10px] font-bold">
                                        <span className="text-slate-400">{row.label}</span>
                                        <div className="flex gap-4">
                                            <span className="text-white">{row.val}</span>
                                            <span className="text-slate-500">{row.ly}</span>
                                        </div>
                                    </div>
                                )))}
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
                                            <h2 className="text-2xl font-black text-white">{user?.coins?.toLocaleString() || "12,350"}</h2>
                                            <span className="bg-blue-600/10 text-blue-500 text-[10px] font-bold px-2 py-0.5 rounded-full">Spent Today</span>
                                        </div>
                                    </div>
                                    <TrendingUp className="text-slate-600" size={20} />
                                </div>
                                <PurchasesSparkline data={SPARKLINE_DATA} />
                            </div>

                            {/* Sales Progress Widget */}
                            <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6">
                                <div className="mb-2">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Project Milestone</p>
                                    <p className="text-xs text-white">Full-Stack Deployment</p>
                                </div>
                                <SalesProgressChart value={75} total={100} />
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
                                            <h2 className="text-3xl font-black text-white">45.2K</h2>
                                            <p className="text-[10px] text-slate-400 mt-2 max-w-[200px]">Real-time token processing across all active AI agents</p>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                                <span className="text-[10px] font-bold text-slate-500">Active</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-blue-300" />
                                                <span className="text-[10px] font-bold text-slate-500">Idle</span>
                                            </div>
                                        </div>
                                    </div>
                                    <WeeklyComparisonChart data={WEEKLY_DATA} />
                                </div>

                                <div className="space-y-6">
                                    <div className="p-4 bg-[#0B1220] rounded-2xl border border-[#1F2937]">
                                        <p className="text-sm font-black text-white">24</p>
                                        <p className="text-[10px] font-bold text-slate-500">Active Agents</p>
                                    </div>
                                    <div className="p-4 bg-[#0B1220] rounded-2xl border border-[#1F2937]">
                                        <p className="text-sm font-black text-white">1.2ms</p>
                                        <p className="text-[10px] font-bold text-slate-500">Avg Latency</p>
                                    </div>
                                    <div className="p-4 bg-[#0B1220] rounded-2xl border border-[#1F2937]">
                                        <p className="text-sm font-black text-white">12</p>
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
