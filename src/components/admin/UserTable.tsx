'use client';
import React from 'react';
import {
    MoreVertical,
    Shield,
    ShieldOff,
    Coins,
    Search,
    Filter
} from 'lucide-react';

interface User {
    id: string;
    email: string;
    emailVerified: boolean;
    createdAt: Date;
    tokenBalance?: { coins: number } | null;
    _count: {
        transactions: number;
        tokenReservations: number;
    };
}

interface AdminUserTableProps {
    users: User[];
}

export function AdminUserTable({ users }: AdminUserTableProps) {
    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#111827] p-3 rounded-xl border border-[#1F2937]">
                <div className="relative w-full md:w-80 group">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                    <input
                        type="text"
                        placeholder="Search by identity email..."
                        className="w-full py-2 pl-9 pr-4 text-[11px] font-bold rounded-lg bg-[#0B1220] border border-[#1F2937] text-[#F1F5F9] placeholder:text-[#334155] outline-none focus:border-blue-500/30 transition-all uppercase tracking-wider"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-[#0B1220] hover:text-white rounded-lg border border-[#1F2937] transition-all">
                    <Filter size={12} />
                    <span>Filter Parameters</span>
                </button>
            </div>

            <div className="bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#1F2937] bg-[#0B1220]/30">
                                <th className="px-6 py-3 text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Identify</th>
                                <th className="px-6 py-3 text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Email Status</th>
                                <th className="px-6 py-3 text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Balance</th>
                                <th className="px-6 py-3 text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Activity</th>
                                <th className="px-6 py-3 text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Join Date</th>
                                <th className="px-6 py-3 text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] text-right">Ops</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1F2937]">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500 text-xs">
                                        No authorized users found in local registry.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id} className="hover:bg-blue-500/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-blue-600/20">
                                                    {user.email[0].toUpperCase()}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-white leading-tight">{user.email}</span>
                                                    <span className="text-[9px] text-slate-500 font-mono tracking-tighter mt-1">{user.id}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${user.emailVerified ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'
                                                }`}>
                                                <div className={`w-1 h-1 rounded-full ${user.emailVerified ? 'bg-green-500' : 'bg-amber-500'}`} />
                                                {user.emailVerified ? 'Verified' : 'Pending'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-xs font-black text-white">
                                                <Coins size={12} className="text-blue-500" />
                                                <span>{(user.tokenBalance?.coins || 0).toLocaleString()}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-300">{user._count.transactions} txns</span>
                                                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">{user._count.tokenReservations} compute hooks</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-bold text-slate-400">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-slate-500 hover:text-white transition-colors">
                                                <MoreVertical size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
