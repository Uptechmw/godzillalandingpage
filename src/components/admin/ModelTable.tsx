'use client';
import React from 'react';
import {
    Zap,
    Shield,
    ShieldOff,
    Settings2,
    Database,
    Clock,
    Infinity
} from 'lucide-react';

interface ModelInfo {
    key: string;
    name: string;
    provider: string;
    enabled: boolean;
    hasOverride: boolean;
    effective: {
        maxOutputTokens: number;
        timeoutMs: number;
        rateLimits: {
            requestsPerMinute: number;
            concurrentRequests: number;
        }
    };
}

interface AdminModelTableProps {
    models: ModelInfo[];
}

export function AdminModelTable({ models }: AdminModelTableProps) {
    return (
        <div className="model-table-wrapper relative overflow-hidden rounded-xl bg-[#111827] border border-[#1F2937] shadow-sm">
            <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="border-b border-[#1F2937] bg-[#0B1220]/50">
                            <th className="px-6 py-4 text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Neural Architecture</th>
                            <th className="px-6 py-4 text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Provider</th>
                            <th className="px-6 py-4 text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">System Status</th>
                            <th className="px-6 py-4 text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Rate Limits</th>
                            <th className="px-6 py-4 text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Context Window</th>
                            <th className="px-6 py-4 text-right text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Config</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1F2937]">
                        {models.map((model) => (
                            <tr key={model.key} className="hover:bg-[#1F2937]/30 transition-colors group">
                                <td className="px-6 py-6 whitespace-nowrap">
                                    <div className="flex items-center gap-4">
                                        <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-500 shadow-sm group-hover:scale-105 transition-transform">
                                            <Zap size={16} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight">{model.name}</p>
                                            <p className="text-[10px] font-mono text-slate-500">{model.key}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-6 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-slate-600" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">
                                            {model.provider}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-6 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black tracking-widest uppercase ${model.enabled
                                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                            : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                                            }`}>
                                            <div className={`w-1 h-1 rounded-full ${model.enabled ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
                                            {model.enabled ? 'Live' : 'Offline'}
                                        </div>
                                        {model.hasOverride && (
                                            <div className="w-5 h-5 rounded flex items-center justify-center bg-blue-500/10 text-blue-400 border border-blue-500/20" title="Custom Settings Active">
                                                <Settings2 size={10} />
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-6 whitespace-nowrap">
                                    <div>
                                        <p className="text-xs font-bold text-white tracking-widest">{model.effective.rateLimits.requestsPerMinute} <span className="text-[10px] text-slate-500 font-medium">RPM</span></p>
                                        <p className="text-[10px] text-slate-500 font-medium">{model.effective.rateLimits.concurrentRequests} CONCURRENT</p>
                                    </div>
                                </td>
                                <td className="px-6 py-6 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <Database size={14} className="text-slate-500" />
                                        <span className="text-xs font-bold text-white tracking-widest">{model.effective.maxOutputTokens.toLocaleString()}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-6 text-right whitespace-nowrap">
                                    <button className="px-4 py-2 bg-[#0B1220] hover:bg-blue-500/10 border border-[#1F2937] hover:border-blue-500/50 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
                                        Override
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
