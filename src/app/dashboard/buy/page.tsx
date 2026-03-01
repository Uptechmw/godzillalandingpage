"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Coins, CheckCircle2, Zap, Trophy, Crown, Loader2, Package, Menu } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";

export default function BuyCoinsPage() {
    const [packages, setPackages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        api.get('/billing/products')
            .then(res => setPackages(res))
            .catch(err => toast.error("Failed to load packages"))
            .finally(() => setLoading(false));
    }, []);

    const getIcon = (index: number) => {
        if (index === 0) return Zap;
        if (index === 1) return Trophy;
        return Crown;
    };

    const getColor = (index: number) => {
        if (index === 0) return { color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' };
        if (index === 1) return { color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' };
        return { color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' };
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0B1220] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    const handlePurchase = () => {
        if (!selected) return;
        setIsProcessing(true);

        // Placeholder for payment gateway gateway
        setTimeout(() => {
            toast.success("Purchase successful! Coins added to your account.");
            setIsProcessing(false);
            setSelected(null);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#0B1220]">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <main className="lg:ml-64 p-8">
                <header className="mb-10 flex items-center gap-4">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Buy Coins</h1>
                        <p className="text-slate-400">Choose a package to power up your interactions.</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {packages.map((pkg, idx) => {
                        const Icon = getIcon(idx);
                        const theme = getColor(idx);
                        const isPopular = idx === 1;

                        return (
                            <div
                                key={pkg.id}
                                onClick={() => setSelected(pkg.id)}
                                className={`relative p-8 rounded-3xl border transition-all cursor-pointer group ${selected === pkg.id
                                    ? 'bg-blue-600/10 border-blue-500 scale-[1.02] shadow-[0_0_30px_-10px_rgba(37,99,235,0.3)]'
                                    : 'bg-[#111827] border-[#1F2937] hover:border-[#374151]'
                                    }`}
                            >
                                {isPopular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                        Most Popular
                                    </div>
                                )}

                                <div className={`w-14 h-14 ${theme.bg} ${theme.color} rounded-2xl flex items-center justify-center mb-6 border ${theme.border}`}>
                                    <Icon size={28} />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-1">{pkg.name}</h3>
                                <div className="flex items-end gap-1 mb-6">
                                    <span className="text-3xl font-black text-white">${pkg.priceAmount}</span>
                                    <span className="text-slate-500 text-sm mb-1">/ lifetime</span>
                                </div>

                                <div className="flex items-center gap-2 px-4 py-2 bg-[#0B1220] rounded-xl border border-[#1F2937] mb-8">
                                    <Coins size={18} className="text-amber-500" />
                                    <span className="text-white font-bold">{pkg.coins.toLocaleString()} <span className="text-[10px] opacity-70">COINS</span></span>
                                </div>

                                <ul className="space-y-4 mb-10">
                                    {(pkg.features || []).map((feat: string) => (
                                        <li key={feat} className="flex items-start gap-3 text-sm text-slate-400">
                                            <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className={`w-full py-4 rounded-xl font-bold transition-all ${selected === pkg.id
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-[#1F2937] hover:bg-[#374151] text-slate-300'
                                        }`}
                                >
                                    {selected === pkg.id ? 'Selected' : 'Choose Plan'}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {selected && (
                    <div className="mt-12 max-w-md mx-auto p-6 bg-[#111827] border border-blue-500/30 rounded-2xl text-center">
                        <p className="text-slate-400 text-sm mb-6">You've selected the <span className="text-white font-bold">{packages.find(p => p.id === selected)?.name}</span>. Ready to checkout?</p>
                        <button
                            onClick={handlePurchase}
                            disabled={isProcessing}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Processing Payment...
                                </>
                            ) : (
                                'Proceed to Payment Gateway'
                            )}
                        </button>
                        <p className="mt-4 text-[10px] text-slate-500 uppercase tracking-widest">Secure 256-bit SSL connection</p>
                    </div>
                )}
            </main>
        </div>
    );
}
