'use client';

import React, { useState, useEffect } from 'react';
import { Mail, ShieldCheck, RefreshCw, Send, Save, Server, Lock, Globe } from 'lucide-react';
import { toast } from 'sonner';

export function SmtpForm() {
    const [config, setConfig] = useState({
        host: '',
        port: '587',
        secure: false,
        username: '',
        password: '',
        fromName: '',
        fromEmail: ''
    });
    const [isTesting, setIsTesting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadSettings() {
            try {
                const res = await fetch('/api/admin/config/smtp');
                if (res.ok) {
                    const data = await res.json();
                    if (data.config) {
                        setConfig(data.config);
                    }
                }
            } catch (error) {
                console.error('Failed to load SMTP settings');
            } finally {
                setIsLoading(false);
            }
        }
        loadSettings();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setConfig(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleTest = async () => {
        setIsTesting(true);
        try {
            const res = await fetch('/api/admin/config/test-smtp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });
            const data = await res.json();
            if (data.success) {
                toast.success('SMTP Connection Successful');
            } else {
                toast.error(data.message || 'SMTP Connection Failed');
            }
        } catch (error) {
            toast.error('Failed to run SMTP test');
        } finally {
            setIsTesting(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/admin/config/smtp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });
            if (res.ok) {
                toast.success('SMTP Configuration Saved and Encrypted');
            } else {
                toast.error('Failed to save SMTP configuration');
            }
        } catch (error) {
            toast.error('Network error while saving SMTP config');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="animate-pulse h-64 bg-slate-900/50 rounded-xl border border-slate-800"></div>;

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Primary SMTP Gateway</label>
                    <div className="relative">
                        <Globe size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                        <input
                            name="host"
                            value={config.host}
                            onChange={handleChange}
                            placeholder="smtp.relay.provider.com"
                            className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg py-3 pl-11 pr-4 outline-none transition-all text-sm text-[#F1F5F9] placeholder:text-[#334155] focus:border-blue-500/30"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Network Port</label>
                    <div className="relative">
                        <Server size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                        <input
                            name="port"
                            value={config.port}
                            onChange={handleChange}
                            placeholder="587"
                            className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg py-3 pl-11 pr-4 outline-none transition-all text-sm text-[#F1F5F9] focus:border-blue-500/30"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3 px-1 pt-6">
                    <label className="relative inline-flex items-center cursor-pointer group">
                        <input
                            type="checkbox"
                            name="secure"
                            checked={config.secure}
                            onChange={handleChange}
                            className="sr-only peer"
                        />
                        <div className="w-10 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 peer-checked:after:bg-white group-hover:after:bg-slate-300"></div>
                        <span className="ml-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-200 transition-colors">Enforce SSL/TLS Protocol</span>
                    </label>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Auth Username</label>
                    <div className="relative">
                        <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                        <input
                            name="username"
                            value={config.username}
                            onChange={handleChange}
                            placeholder="access@relay.com"
                            className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg py-3 pl-11 pr-4 outline-none transition-all text-sm text-[#F1F5F9] placeholder:text-[#334155] focus:border-blue-500/30"
                            autoComplete="off"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Auth Password</label>
                    <div className="relative">
                        <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                        <input
                            type="password"
                            name="password"
                            value={config.password}
                            onChange={handleChange}
                            placeholder="••••••••••••"
                            className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg py-3 pl-11 pr-4 outline-none transition-all text-sm text-[#F1F5F9] placeholder:text-[#334155] focus:border-blue-500/30"
                            autoComplete="off"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Outbound Signal Name</label>
                    <input
                        name="fromName"
                        value={config.fromName}
                        onChange={handleChange}
                        placeholder="Godzilla Cloud Service"
                        className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg py-3 px-4 outline-none transition-all text-sm text-[#F1F5F9] placeholder:text-[#334155] focus:border-blue-500/30"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Outbound Source Address</label>
                    <input
                        name="fromEmail"
                        value={config.fromEmail}
                        onChange={handleChange}
                        placeholder="no-reply@godzilla.ai"
                        className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg py-3 px-4 outline-none transition-all text-sm text-[#F1F5F9] placeholder:text-[#334155] focus:border-blue-500/30"
                    />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-[#1F2937]">
                <button
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-750 hover:text-white transition-all ${isTesting ? 'opacity-50 cursor-wait' : ''}`}
                    onClick={handleTest}
                    disabled={isTesting || !config.host}
                >
                    {isTesting ? <RefreshCw className="animate-spin" size={12} /> : <Send size={12} />}
                    Dispatch Trace Signal
                </button>
                <button
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/10 ${isSaving ? 'opacity-50 cursor-wait' : ''}`}
                    onClick={handleSave}
                    disabled={isSaving || !config.host}
                >
                    {isSaving ? <RefreshCw className="animate-spin" size={12} /> : <Save size={12} />}
                    Commit Configuration
                </button>
            </div>
        </div>
    );
}
