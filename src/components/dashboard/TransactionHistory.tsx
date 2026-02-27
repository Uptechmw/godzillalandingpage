"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, Zap, MessageSquare, Bug, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

const iconMap: any = {
    "SIGNUP_BONUS": { icon: ArrowDownLeft, color: "text-godzilla-accent", label: "System" },
    "AI_CHAT": { icon: MessageSquare, color: "text-blue-400", label: "Chat" },
    "AI_COMPLETION": { icon: Zap, color: "text-amber-400", label: "Completion" },
    "AI_DEBUG": { icon: Bug, color: "text-purple-400", label: "Debug" },
    "PURCHASE": { icon: ArrowUpRight, color: "text-godzilla-accent", label: "Purchase" },
};

export default function TransactionHistory() {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await api.get("/coins/history");
                setTransactions(data.transactions || []);
            } catch (err) {
                console.error("History Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) {
        return (
            <div className="bg-godzilla-surface rounded-3xl border border-godzilla-border overflow-hidden p-12 flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 text-godzilla-accent animate-spin mb-4" />
                <p className="text-godzilla-text-muted font-bold text-sm">Accessing Audit Logs...</p>
            </div>
        );
    }

    return (
        <div className="bg-godzilla-surface rounded-3xl border border-godzilla-border overflow-hidden">
            <div className="p-6 border-b border-godzilla-border flex justify-between items-center bg-white/5">
                <h3 className="font-black text-white text-lg uppercase tracking-tighter">Mission History</h3>
                <span className="px-3 py-1 bg-godzilla-accent/10 border border-godzilla-accent/20 rounded-full text-[10px] font-black text-godzilla-accent uppercase tracking-widest">Live Audit</span>
            </div>

            <div className="divide-y divide-godzilla-border max-h-[400px] overflow-y-auto">
                {transactions.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-godzilla-text-muted font-bold italic">No atomic activity recorded yet.</p>
                    </div>
                ) : (
                    transactions.map((tx, index) => {
                        const style = iconMap[tx.type] || { icon: Zap, color: "text-white", label: tx.type };
                        const Icon = style.icon;

                        return (
                            <motion.div
                                key={tx.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="p-6 flex items-center justify-between hover:bg-white/5 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl bg-white/5 ${style.color} group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-black text-white uppercase tracking-tight text-sm">{tx.description || style.label}</p>
                                        <p className="text-godzilla-text-muted text-[10px] font-bold">{new Date(tx.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className={`font-black text-lg ${tx.amount > 0 ? "text-godzilla-accent" : "text-white"}`}>
                                    {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
