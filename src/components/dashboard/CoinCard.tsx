"use client";

import { motion } from "framer-motion";
import { Coins, ArrowUpRight } from "lucide-react";

interface CoinCardProps {
    balance: number;
}

export default function CoinCard({ balance }: CoinCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-godzilla-surface p-8 rounded-3xl border border-godzilla-border relative overflow-hidden group shadow-2xl"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-godzilla-accent/10 blur-[50px] rounded-full group-hover:bg-godzilla-accent/20 transition-all duration-500" />

            <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-godzilla-accent/10 rounded-2xl text-godzilla-accent">
                    <Coins className="w-8 h-8" />
                </div>
                <button className="text-white hover:text-godzilla-accent transition-colors">
                    <ArrowUpRight className="w-6 h-6" />
                </button>
            </div>

            <div>
                <h3 className="text-godzilla-text-muted text-sm font-bold uppercase tracking-widest mb-1">Your Balance</h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white tracking-tight">{balance.toLocaleString()}</span>
                    <span className="text-godzilla-accent font-bold">Coins</span>
                </div>
            </div>

            <div className="mt-8 flex gap-3">
                <button className="flex-1 bg-godzilla-accent text-black py-4 rounded-xl font-black shadow-[0_0_20px_rgba(0,255,148,0.2)] hover:shadow-[0_0_30px_rgba(0,255,148,0.4)] transition-all">
                    Top up
                </button>
                <button className="flex-1 bg-white/5 text-white py-4 rounded-xl font-bold border border-white/10 hover:bg-white/10 transition-all">
                    History
                </button>
            </div>
        </motion.div>
    );
}
