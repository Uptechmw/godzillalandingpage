'use client';

import React, { useState } from 'react';
import {
    Key,
    Eye,
    EyeOff,
    RefreshCw,
    Send,
    Lock,
    Shield
} from 'lucide-react';
import { toast } from 'sonner';

interface SecretFormProps {
    secretKey: string;
    label: string;
    description?: string;
    isSensitive?: boolean;
}

export function SecretForm({ secretKey, label, description, isSensitive = true }: SecretFormProps) {
    const [value, setValue] = useState('');
    const [isTesting, setIsTesting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showValue, setShowValue] = useState(false);

    const handleTest = async () => {
        setIsTesting(true);
        try {
            const res = await fetch('/api/admin/config/test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: secretKey, value })
            });
            const data = await res.json();

            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Failed to run connection test.");
        } finally {
            setIsTesting(false);
        }
    };

    const handleSave = async () => {
        if (!value) return;
        setIsSaving(true);
        try {
            const res = await fetch('/api/admin/config/secrets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: secretKey, value })
            });

            if (res.ok) {
                toast.success(`${label} rotated and archived successfully.`);
                setValue('');
            } else {
                toast.error(`Failed to rotate ${label}.`);
            }
        } catch (error) {
            toast.error("Network error while rotating secret.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-[#0B1220] border border-[#1F2937] rounded-xl p-6 flex flex-col gap-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Lock size={12} className="text-slate-500" />
                        <span className="text-[11px] font-bold text-[#F1F5F9] uppercase tracking-widest">{label}</span>
                        <div className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[9px] font-bold text-slate-500 uppercase tracking-tighter">v1.2</div>
                    </div>
                    {description && <p className="text-[10px] text-slate-500 font-medium leading-relaxed max-w-sm">{description}</p>}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        className="p-2 text-slate-500 hover:text-white transition-colors"
                        onClick={() => setShowValue(!showValue)}
                        title={showValue ? "Hide" : "Show masked"}
                    >
                        {showValue ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    <button
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-700 bg-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:border-slate-600 hover:text-white transition-all ${isTesting ? 'opacity-50 cursor-wait' : ''}`}
                        onClick={handleTest}
                        disabled={!value || isTesting}
                    >
                        {isTesting ? <RefreshCw size={10} className="animate-spin" /> : <Send size={10} />}
                        <span>Verify</span>
                    </button>
                    <button
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-blue-500 transition-all ${isSaving ? 'opacity-50 cursor-wait' : ''}`}
                        onClick={handleSave}
                        disabled={!value || isSaving}
                    >
                        <RefreshCw size={10} className={isSaving ? "animate-spin" : ""} />
                        <span>Rotate</span>
                    </button>
                </div>
            </div>

            <div className="relative group">
                <Shield size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 transition-colors group-focus-within:text-blue-500/50" />
                <input
                    type={showValue ? 'text' : 'password'}
                    placeholder={isSensitive ? '••••••••••••••••••••••••' : 'Enter specific identifier'}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full bg-[#111827] border border-[#1F2937] rounded-lg py-2.5 pl-11 pr-4 outline-none transition-all text-xs text-[#F1F5F9] placeholder:text-[#334155] focus:border-blue-500/30 font-mono"
                    autoComplete="off"
                />
            </div>
        </div>
    );
}
