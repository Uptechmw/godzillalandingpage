"use client";

import React, { useState } from 'react';
import {
    User as UserIcon,
    Shield,
    Bell,
    CreditCard,
    Zap,
    Lock,
    Eye,
    EyeOff
} from 'lucide-react';
import { toast } from 'sonner';

const TABS = [
    { id: 'profile', label: 'Identity', icon: UserIcon },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Compute & Billing', icon: Zap },
    { id: 'notifications', label: 'Alerts', icon: Bell },
];

export default function UserSettingsClient({ user }: { user: any }) {
    const [activeTab, setActiveTab] = useState('profile');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            toast.success("Settings updated in central registry.");
            setIsSaving(false);
        }, 1000);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 mt-4">
            {/* Sidebar Tabs */}
            <div className="w-full lg:w-64 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[13px] font-bold transition-all whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20'
                                : 'text-slate-500 hover:bg-[#111827] hover:text-slate-300 border border-transparent hover:border-[#1F2937]'
                            }`}
                    >
                        <tab.icon size={18} />
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 max-w-3xl">
                {activeTab === 'profile' && (
                    <form onSubmit={handleSave} className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="bg-[#111827] border border-[#1F2937] p-8 rounded-3xl shadow-2xl">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-black">
                                    {user?.name?.[0] || user?.email?.[0]?.toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-white font-black text-xl">Personal Identity</h3>
                                    <p className="text-xs text-slate-500">How you appear across the Godzilla AI ecosystem</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-slate-500 ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        defaultValue={user?.name || ""}
                                        className="w-full bg-[#0B1220] border border-[#1F2937] rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-slate-500 ml-1">Email Terminal</label>
                                    <input
                                        type="text"
                                        value={user?.email || ""}
                                        disabled
                                        className="w-full bg-[#0B1220] border border-[#1F2937] rounded-xl px-4 py-3 text-sm text-slate-500 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <div className="mt-10 pt-8 border-t border-[#1F2937]">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-blue-600/30"
                                >
                                    {isSaving ? "SYNCING..." : "COMMIT CHANGES"}
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                {activeTab === 'security' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="bg-[#111827] border border-[#1F2937] p-8 rounded-3xl shadow-2xl">
                            <div className="flex items-center gap-4 mb-8">
                                <Lock className="text-blue-500" size={24} />
                                <div>
                                    <h3 className="text-white font-black text-xl">Access Protection</h3>
                                    <p className="text-xs text-slate-500">Manage encryption keys and account security layers</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-5 bg-[#0B1220] rounded-2xl border border-[#1F2937] hover:border-blue-500/30 transition-all cursor-pointer group">
                                    <div>
                                        <p className="text-white font-bold text-sm">Rotate Master Password</p>
                                        <p className="text-[10px] text-slate-500 mt-0.5">Recommended every 90 days for peak security.</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-lg bg-[#1F2937] group-hover:bg-blue-600 flex items-center justify-center text-slate-400 group-hover:text-white transition-all">
                                        <Eye size={14} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-5 bg-[#0B1220] rounded-2xl border border-[#1F2937]">
                                    <div>
                                        <p className="text-white font-bold text-sm">Multi-Factor Transit</p>
                                        <p className="text-[10px] text-slate-500 mt-0.5">Currently using Email OTP for verification.</p>
                                    </div>
                                    <div className="w-11 h-6 bg-blue-600 rounded-full relative">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'billing' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="bg-[#111827] border border-[#1F2937] p-8 rounded-3xl shadow-2xl">
                            <div className="flex items-center gap-4 mb-8">
                                <CreditCard className="text-blue-500" size={24} />
                                <div>
                                    <h3 className="text-white font-black text-xl">Compute Economy</h3>
                                    <p className="text-xs text-slate-500">Monitor your Godzilla Coin circulation and tier</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="p-5 bg-[#0B1220] rounded-2xl border border-[#1F2937]">
                                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-500 mb-2">Active Credit</p>
                                    <p className="text-2xl font-black text-white">{(user?.coins || 0).toLocaleString()}</p>
                                    <p className="text-[9px] text-blue-500 font-bold mt-1">G-COINS AVAILABLE</p>
                                </div>
                                <div className="p-5 bg-[#0B1220] rounded-2xl border border-[#1F2937]">
                                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-500 mb-2">Usage Tier</p>
                                    <p className="text-2xl font-black text-white">BETA</p>
                                    <p className="text-[9px] text-slate-500 font-bold mt-1">FREE ALLOCATION</p>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-[#1F2937] hover:bg-blue-600 text-white rounded-2xl text-[11px] font-black tracking-widest uppercase transition-all border border-[#374151]">
                                Upgrade Resources
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'notifications' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="bg-[#111827] border border-[#1F2937] p-8 rounded-3xl shadow-2xl text-center flex flex-col items-center py-16">
                            <Bell className="text-slate-700 mb-4" size={48} />
                            <h3 className="text-white font-black text-xl">Communication Matrix</h3>
                            <p className="text-xs text-slate-500 max-w-xs mt-2">All system alerts are currently routed to your verified email terminal.</p>
                            <button className="mt-8 px-8 py-3 bg-[#1F2937] text-white text-[11px] font-black rounded-2xl border border-[#374151] uppercase tracking-widest">
                                Manage Subscription
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
