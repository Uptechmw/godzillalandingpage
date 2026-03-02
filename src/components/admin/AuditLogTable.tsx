'use client';
import React from 'react';
import {
    Clock,
    User,
    Activity,
    Database,
    Shield,
    ExternalLink
} from 'lucide-react';

interface AuditLog {
    id: string;
    action: string;
    module: string;
    targetId: string | null;
    ipAddress: string | null;
    createdAt: Date;
    admin: {
        email: string;
        name: string | null;
    };
    oldValue: any;
    newValue: any;
}

interface AdminAuditLogTableProps {
    logs: AuditLog[];
}

export function AdminAuditLogTable({ logs }: AdminAuditLogTableProps) {
    return (
        <div className="audit-table-wrapper relative overflow-hidden rounded-xl bg-[#111827] border border-[#1F2937] shadow-sm">
            <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-[#1F2937] bg-[#0B1220]/50">
                            <th className="px-6 py-4 text-left text-[9px] font-bold text-slate-500 uppercase tracking-[0.25em]">Timestamp</th>
                            <th className="px-6 py-4 text-left text-[9px] font-bold text-slate-500 uppercase tracking-[0.25em]">Admin</th>
                            <th className="px-6 py-4 text-left text-[9px] font-bold text-slate-500 uppercase tracking-[0.25em]">Action</th>
                            <th className="px-6 py-4 text-left text-[9px] font-bold text-slate-500 uppercase tracking-[0.25em]">Module</th>
                            <th className="px-6 py-4 text-left text-[9px] font-bold text-slate-500 uppercase tracking-[0.25em]">Target</th>
                            <th className="px-6 py-4 text-right text-[9px] font-bold text-slate-500 uppercase tracking-[0.25em]">Details</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1F2937]">
                        {logs.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-24 text-center">
                                    <div className="flex flex-col items-center gap-3 opacity-20">
                                        <Activity size={48} className="text-slate-400" />
                                        <p className="text-sm font-bold uppercase tracking-widest text-slate-400">No events captured in ledger</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            logs.map((log) => (
                                <tr key={log.id} className="hover:bg-[#1F2937]/30 transition-colors group">
                                    <td className="px-6 py-6 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                                                <Clock size={14} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-white">{new Date(log.createdAt).toLocaleDateString()}</p>
                                                <p className="text-[10px] text-slate-500 font-medium">{new Date(log.createdAt).toLocaleTimeString()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-slate-500/10 border border-slate-500/20 flex items-center justify-center text-slate-400">
                                                <User size={14} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-white uppercase tracking-tight">{log.admin.name || 'Admin'}</p>
                                                <p className="text-[10px] text-slate-500 font-medium lowercase">{log.admin.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 whitespace-nowrap">
                                        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-[10px] font-black uppercase tracking-wider">
                                            {log.action.replace(/_/g, ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{log.module}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 whitespace-nowrap">
                                        <code className="text-[10px] font-mono font-bold text-blue-400/70 bg-[#0B1220] px-2 py-1 rounded border border-[#1F2937]">
                                            {log.targetId || 'SYSTEM_GLOBAL'}
                                        </code>
                                    </td>
                                    <td className="px-6 py-6 text-right whitespace-nowrap">
                                        <button className="w-8 h-8 rounded-lg bg-[#0B1220] border border-[#1F2937] flex items-center justify-center text-slate-500 hover:text-white hover:border-blue-500/50 transition-all group/btn">
                                            <Activity size={14} className="group-hover/btn:scale-110 transition-transform" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
