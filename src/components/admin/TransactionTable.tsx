'use client';

import React from 'react';
import {
    ArrowUpRight,
    ArrowDownLeft,
    User,
    Clock,
    Coins,
    Hash
} from 'lucide-react';

interface Transaction {
    id: string;
    type: string;
    amount: number;
    description: string;
    createdAt: Date;
    user: {
        email: string;
    };
}

interface AdminTransactionTableProps {
    transactions: Transaction[];
}

export function AdminTransactionTable({ transactions }: AdminTransactionTableProps) {
    return (
        <div className="relative overflow-hidden rounded-xl bg-[#111827] border border-[#1F2937] shadow-sm">
            <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="border-b border-[#1F2937] bg-[#0B1220]/50">
                            <th className="px-6 py-4 text-[9px] font-bold text-slate-500 uppercase tracking-[0.25em]">Timestamp</th>
                            <th className="px-6 py-4 text-[9px] font-bold text-slate-500 uppercase tracking-[0.25em]">Identity</th>
                            <th className="px-6 py-4 text-[9px] font-bold text-slate-500 uppercase tracking-[0.25em]">Operation</th>
                            <th className="px-6 py-4 text-[9px] font-bold text-slate-500 uppercase tracking-[0.25em]">Volume</th>
                            <th className="px-6 py-4 text-[9px] font-bold text-slate-500 uppercase tracking-[0.25em]">Description</th>
                            <th className="px-6 py-4 text-right text-[9px] font-bold text-slate-500 uppercase tracking-[0.25em]">Trace ID</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1F2937]">
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-16 text-center text-slate-500 text-[11px] font-bold uppercase tracking-widest opacity-50">
                                    Zero financial activity recorded in current frame
                                </td>
                            </tr>
                        ) : (
                            transactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-[#1F2937]/30 transition-colors group">
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-7 h-7 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500">
                                                <Clock size={12} />
                                            </div>
                                            <span className="text-[11px] font-bold text-slate-400">{new Date(tx.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-7 h-7 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                                                <User size={12} />
                                            </div>
                                            <span className="text-[11px] font-bold text-[#F1F5F9]">{tx.user.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-[9px] font-black uppercase tracking-widest ${tx.amount > 0
                                            ? 'bg-green-500/10 border-green-500/20 text-green-500'
                                            : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                                            {tx.amount > 0 ? <ArrowDownLeft size={10} /> : <ArrowUpRight size={10} />}
                                            {tx.type}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className={`flex items-center gap-1.5 text-[11px] font-black ${tx.amount > 0 ? 'text-green-500' : 'text-[#F1F5F9]'}`}>
                                            <Coins size={12} className={tx.amount > 0 ? 'text-green-500' : 'text-blue-500'} />
                                            <span>{tx.amount > 0 ? `+${tx.amount.toLocaleString()}` : tx.amount.toLocaleString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-[11px] font-bold text-slate-500 line-clamp-1 max-w-[200px]">{tx.description}</span>
                                    </td>
                                    <td className="px-6 py-5 text-right whitespace-nowrap focus-within:z-10">
                                        <div className="flex items-center justify-end gap-1 text-[10px] font-mono font-bold text-slate-600 bg-[#0B1220] px-2 py-1 rounded border border-[#1F2937] hover:text-blue-400 hover:border-blue-500/30 transition-all cursor-crosshair">
                                            <Hash size={8} />
                                            {tx.id.substring(0, 8)}
                                        </div>
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
