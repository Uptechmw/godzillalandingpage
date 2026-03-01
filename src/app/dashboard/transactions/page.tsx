"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { History, Search, Filter, ArrowUpRight, ArrowDownLeft, Clock, Loader2, Menu } from "lucide-react";
import { api } from "@/lib/api";

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                // Placeholder for actual transaction API
                const data = [
                    { id: '1', type: 'PURCHASE', amount: 500, date: '2024-03-01', status: 'COMPLETED', method: 'Stripe' },
                    { id: '2', type: 'USAGE', amount: -20, model: 'GPT-4o', date: '2024-03-01', status: 'COMPLETED' },
                    { id: '3', type: 'USAGE', amount: -15, model: 'Claude 3.5', date: '2024-02-28', status: 'COMPLETED' },
                    { id: '4', type: 'PURCHASE', amount: 1000, date: '2024-02-25', status: 'COMPLETED', method: 'PayPal' },
                    { id: '5', type: 'USAGE', amount: -5, model: 'Gemini 1.5', date: '2024-02-24', status: 'COMPLETED' },
                ];
                setTransactions(data);
            } catch (err) {
                console.error("Failed to fetch transactions:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0B1220]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B1220]">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <main className="lg:ml-64 p-8">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Transaction History</h1>
                            <p className="text-slate-400">Track your coin purchases and usage across models.</p>
                        </div>
                    </div>
                </header>

                <div className="bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-[#1F2937] flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-96">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                className="w-full bg-[#0B1220] border border-[#1F2937] rounded-xl pl-10 pr-4 py-2.5 text-white text-sm outline-none focus:border-blue-500 transition-all"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#1F2937] hover:bg-[#374151] text-white rounded-xl text-sm transition-all border border-[#374151]">
                            <Filter size={16} />
                            Filter
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#1F2937]/30 text-slate-400 text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Transaction</th>
                                    <th className="px-6 py-4 font-semibold">Date</th>
                                    <th className="px-6 py-4 font-semibold">Amount</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold">Method/Model</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1F2937]">
                                {transactions.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-[#1F2937]/20 transition-all">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.amount > 0 ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                                    {tx.amount > 0 ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium text-sm">{tx.type === 'PURCHASE' ? 'Wallet Top-up' : 'Model Usage'}</p>
                                                    <p className="text-xs text-slate-500">ID: #{tx.id.padStart(6, '0')}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm text-slate-400">
                                            {tx.date}
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`text-sm font-bold ${tx.amount > 0 ? 'text-green-500' : 'text-slate-300'}`}>
                                                {tx.amount > 0 ? '+' : ''}{tx.amount} <span className="text-[10px] opacity-70">COINS</span>
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-500/10 text-green-500 border border-green-500/20">
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-sm text-slate-400">
                                            {tx.method || tx.model}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-6 text-center border-t border-[#1F2937]">
                        <button className="text-blue-500 hover:text-blue-400 font-semibold text-sm transition-all flex items-center gap-2 mx-auto">
                            <Clock size={16} />
                            Load more transactions
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
