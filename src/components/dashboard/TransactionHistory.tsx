"use client";

import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, Zap, MessageSquare, BugSquare } from "lucide-react";

const transactions = [
    { id: 1, type: "spend", feature: "Chat", amount: -3, date: "2 mins ago", icon: MessageSquare, color: "text-blue-400" },
    { id: 2, type: "spend", feature: "Completion", amount: -1, date: "15 mins ago", icon: Zap, color: "text-amber-400" },
    { id: 3, type: "purchase", feature: "Starter Pack", amount: +100, date: "1 hour ago", icon: ArrowDownLeft, color: "text-godzilla-accent" },
    { id: 4, type: "spend", feature: "Debug Assistant", amount: -3, date: "2 hours ago", icon: BugSquare, color: "text-purple-400" },
];

export default function TransactionHistory() {
    return (
        <div className="bg-godzilla-surface rounded-3xl border border-godzilla-border overflow-hidden">
            <div className="p-6 border-b border-godzilla-border flex justify-between items-center bg-white/5">
                <h3 className="font-bold text-white text-lg">Recent Activity</h3>
                <button className="text-godzilla-accent text-sm font-bold hover:underline">View All</button>
            </div>

            <div className="divide-y divide-godzilla-border">
                {transactions.map((tx, index) => (
                    <motion.div
                        key={tx.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 flex items-center justify-between hover:bg-white/5 transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl bg-white/5 ${tx.color}`}>
                                <tx.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-bold text-white">{tx.feature}</p>
                                <p className="text-godzilla-text-muted text-xs">{tx.date}</p>
                            </div>
                        </div>
                        <div className={`font-black text-lg ${tx.amount > 0 ? "text-godzilla-accent" : "text-white"}`}>
                            {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
