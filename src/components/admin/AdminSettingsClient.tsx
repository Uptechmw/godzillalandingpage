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
            <div className="w-full lg:w-64 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                : 'text-slate-500 hover:bg-[#111827] hover:text-slate-300'
                            }`}
                    >
                        <tab.icon size={18} />
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 min-h-[500px]">
                {activeTab === 'providers' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="bg-[#111827] border border-[#1F2937] p-8 rounded-3xl">
                            <div className="flex items-center gap-3 mb-6">
                                <Key className="text-blue-500" size={24} />
                                <div>
                                    <h3 className="text-white font-black text-xl">API Encryption Vault</h3>
                                    <p className="text-xs text-slate-500">Managed credentials for global AI provider clusters</p>
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
                        <div className="bg-[#111827] border border-[#1F2937] p-8 rounded-3xl">
                            <div className="flex items-center gap-3 mb-6">
                                <Server className="text-blue-500" size={24} />
                                <div>
                                    <h3 className="text-white font-black text-xl">Identity Gateway</h3>
                                    <p className="text-xs text-slate-500">Configure secure SMTP transit for system-wide notifications</p>
                                </div>
                            </div>
                            <SmtpForm />
                        </div>
                    </div>
                )}

                {activeTab === 'financial' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="bg-[#111827] border border-[#1F2937] p-8 rounded-3xl">
                            <div className="flex items-center gap-3 mb-6">
                                <ShieldAlert className="text-blue-500" size={24} />
                                <div>
                                    <h3 className="text-white font-black text-xl">Financial Signing Keys</h3>
                                    <p className="text-xs text-slate-500">Secure hooks and private keys for payment processing</p>
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
                        <div className="bg-[#111827] border border-[#1F2937] p-8 rounded-3xl flex flex-col items-center justify-center text-center">
                            <Terminal className="text-slate-700 mb-4" size={48} />
                            <h3 className="text-white font-black text-lg">System Logs Interface</h3>
                            <p className="text-xs text-slate-500 max-w-xs mt-2">Log streaming is currently restricted to terminal access for security reasons.</p>
                            <button className="mt-6 px-6 py-2.5 bg-[#1F2937] text-white text-xs font-bold rounded-xl border border-[#374151]">
                                Open Secure Terminal
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
