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
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#111827] p-4 rounded-2xl border border-[#1F2937]">
                <div className="relative w-full md:w-96 group">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search by email..."
                        className="w-full py-2.5 pl-10 pr-4 text-xs rounded-xl bg-[#0B1220] border border-[#1F2937] text-white outline-none focus:border-blue-500 transition-all"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-300 bg-[#1F2937] hover:bg-[#374151] rounded-xl border border-[#374151] transition-all">
                    <Filter size={14} />
                    <span>Filter</span>
                </button>
            </div>

            <div className="bg-[#111827] border border-[#1F2937] rounded-3xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#1F2937]">
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Identify</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Balance</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Activity</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Join Date</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Ops</th>
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
