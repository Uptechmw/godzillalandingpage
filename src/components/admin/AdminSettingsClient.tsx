"use client";

import React, { useState } from 'react';
import {
    Cpu,
    Mail,
    CreditCard,
    ShieldAlert,
    Key,
    Server,
    CreditCard as BillingIcon,
    Terminal
} from 'lucide-react';
import { SecretForm } from '@/components/admin/SecretForm';
import { SmtpForm } from '@/components/admin/SmtpForm';

const TABS = [
    { id: 'providers', label: 'AI Providers', icon: Cpu },
    { id: 'smtp', label: 'Email Setup', icon: Mail },
    { id: 'financial', label: 'Financials', icon: BillingIcon },
    { id: 'system', label: 'System Logs', icon: Terminal },
];

export default function AdminSettingsClient() {
    const [activeTab, setActiveTab] = useState('providers');

    return (
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
            {/* Tab Navigation */}
            <div className="w-full lg:w-60 flex flex-row lg:flex-col gap-1 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold transition-all uppercase tracking-widest whitespace-nowrap ${activeTab === tab.id
                            ? 'bg-slate-800 text-blue-400 border border-slate-700 shadow-xl'
                            : 'text-slate-500 hover:bg-[#111827] hover:text-slate-300'
                            }`}
                    >
                        <tab.icon size={14} />
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 min-h-[500px]">
                {activeTab === 'providers' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="bg-[#111827] border border-[#1F2937] p-8 lg:p-10 rounded-xl">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                                    <Key className="text-blue-500" size={20} />
                                </div>
                                <div>
                                    <h3 className="text-[#F1F5F9] font-bold text-lg uppercase tracking-tight">API Encryption Vault</h3>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Managed credentials for global AI provider clusters</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <SecretForm
                                    secretKey="GEMINI_API_KEY"
                                    label="Google Gemini API"
                                    description="Primary computational intelligence for text and multimodal tasks."
                                />
                                <SecretForm
                                    secretKey="ANTHROPIC_API_KEY"
                                    label="Anthropic Claude API"
                                    description="Secondary reasoning engine for high-reliability outputs."
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'smtp' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="bg-[#111827] border border-[#1F2937] p-8 lg:p-10 rounded-xl">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                                    <Server className="text-blue-500" size={20} />
                                </div>
                                <div>
                                    <h3 className="text-[#F1F5F9] font-bold text-lg uppercase tracking-tight">Identity Gateway</h3>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Configure secure SMTP transit for system-wide notifications</p>
                                </div>
                            </div>
                            <SmtpForm />
                        </div>
                    </div>
                )}

                {activeTab === 'financial' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="bg-[#111827] border border-[#1F2937] p-8 lg:p-10 rounded-xl">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                                    <ShieldAlert className="text-blue-500" size={20} />
                                </div>
                                <div>
                                    <h3 className="text-[#F1F5F9] font-bold text-lg uppercase tracking-tight">Financial Signing Keys</h3>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Secure hooks and private keys for payment processing</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <SecretForm
                                    secretKey="STRIPE_SECRET_KEY"
                                    label="Stripe Private Key"
                                    description="Production-grade key for payment orchestration."
                                />
                                <SecretForm
                                    secretKey="STRIPE_WEBHOOK_SECRET"
                                    label="Webhook Verification"
                                    description="Cryptographically verifies Stripe event signatures."
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'system' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="bg-[#111827] border border-[#1F2937] p-16 rounded-xl flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 mb-6">
                                <Terminal className="text-blue-500" size={32} />
                            </div>
                            <h3 className="text-[#F1F5F9] font-bold text-lg uppercase tracking-tight">System Logs Interface</h3>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest max-w-[200px] mt-2 leading-relaxed">Log streaming is currently restricted to terminal access for security reasons.</p>
                            <button className="mt-8 px-8 py-3 bg-slate-800 text-[#F1F5F9] text-[10px] font-bold uppercase tracking-[0.2em] rounded-lg border border-slate-700 hover:border-blue-500/50 transition-all">
                                Open Secure Terminal
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
