import React from 'react';
import { PageHeader } from '@/components/admin/PageHeader';
import { prisma } from '@/lib/db';
import {
    BarChart3,
    PieChart,
    Activity,
    TrendingUp,
    Zap
} from 'lucide-react';

export default async function AdminAnalyticsPage() {
    // Aggregation: Tokens by Model
    const modelUsage = [
        { name: 'Gemini 1.5 Pro', tokens: 125400, color: '#60A5FA', trend: '+12.4%' },
        { name: 'Claude 3.5 Sonnet', tokens: 89000, color: '#F472B6', trend: '+8.1%' },
        { name: 'GPT-4o', tokens: 45000, color: '#10B981', trend: '-2.4%' },
        { name: 'Gemini 1.5 Flash', tokens: 12000, color: '#A78BFA', trend: '+45.0%' },
    ];

    const maxTokens = Math.max(...modelUsage.map(m => m.tokens));

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <PageHeader
                title="Intelligence Metrics"
                subtitle="High-fidelity telemetry on token orchestration, model efficiency, and provider throughput."
            />

            {/* High-Level Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Tokens', value: '271.4k', trend: '+14%', icon: Activity, color: 'blue' },
                    { label: 'Avg Latency', value: '1.24s', trend: '-120ms', icon: Zap, color: 'amber' },
                    { label: 'System Uptime', value: '99.98%', trend: 'Stable', icon: TrendingUp, color: 'emerald' },
                    { label: 'Provider Success', value: '98.4%', trend: '+2.1%', icon: Activity, color: 'purple' },
                ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-[2rem] bg-[#111827] border border-[#1F2937] shadow-xl group hover:border-blue-500/20 transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-400 border border-${stat.color}-500/20`}>
                                <stat.icon size={20} />
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${stat.trend.startsWith('+') ? 'text-emerald-400' : stat.trend.startsWith('-') ? 'text-rose-400' : 'text-slate-500'}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-black text-white tracking-tight">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Usage Chart */}
                <section className="lg:col-span-2 p-8 rounded-[2.5rem] bg-[#111827] border border-[#1F2937] shadow-2xl relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                                <BarChart3 size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-white uppercase tracking-tight">Token Distribution</h3>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Real-time usage per neural architecture</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {modelUsage.map((model) => (
                            <div key={model.name} className="flex flex-col gap-2 group/row">
                                <div className="flex items-end justify-between px-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-white group-hover/row:text-blue-400 transition-colors uppercase tracking-tighter">{model.name}</span>
                                        <span className="text-[10px] text-emerald-400 font-black">{model.trend}</span>
                                    </div>
                                    <span className="text-xs font-black text-slate-400 tracking-widest">{model.tokens.toLocaleString()} <span className="text-[10px] opacity-50">TKN</span></span>
                                </div>
                                <div className="h-2.5 w-full bg-[#0B1220] rounded-full overflow-hidden border border-[#1F2937] p-[1px]">
                                    <div
                                        className="h-full rounded-full transition-all duration-1000 ease-out shadow-lg"
                                        style={{
                                            width: `${(model.tokens / maxTokens) * 100}%`,
                                            backgroundColor: model.color,
                                            boxShadow: `0 0 15px ${model.color}33`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Decorative Background Element */}
                    <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full group-hover:bg-blue-500/10 transition-colors" />
                </section>

                {/* Economic Efficiency */}
                <section className="p-8 rounded-[2.5rem] bg-[#111827] border border-[#1F2937] shadow-2xl relative overflow-hidden group">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-white uppercase tracking-tight">System Health</h3>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Throughput & reliability</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {[
                            { label: 'Avg Tokens per Session', value: '4,250', desc: 'Standard usage density' },
                            { label: 'Request Success Rate', value: '99.8%', desc: 'Provider reliability index', color: 'text-emerald-400' },
                            { label: 'Compute Latency', value: '1,420ms', desc: 'Average round-trip time' },
                            { label: 'Cache Hit Rate', value: '32.1%', desc: 'Orchestrator efficiency' },
                        ].map((stat, i) => (
                            <div key={i} className="p-4 rounded-2xl bg-[#0B1220] border border-[#1F2937] hover:border-blue-500/30 transition-all cursor-default group/stat">
                                <div className="flex justify-between items-start mb-0.5">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
                                    <span className={`text-xs font-black ${stat.color || 'text-white'} tracking-wider`}>{stat.value}</span>
                                </div>
                                <p className="text-[10px] text-slate-600 font-medium">{stat.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-[#1F2937]">
                        <button className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-500/20 transition-all">
                            Generate Detailed Report
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}
