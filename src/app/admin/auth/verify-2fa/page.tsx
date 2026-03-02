'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Key, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function Verify2FAPage() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const firstInput = document.getElementById('otp-0');
        if (firstInput) firstInput.focus();
    }, []);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const code = otp.join('');
        if (code.length < 6) {
            toast.error('Six-digit authorization code required');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/admin/auth/verify-2fa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otp: code }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Identity Confirmed');
                router.push('/admin');
            } else {
                setError(data.message || 'Invalid authorization code');
                toast.error(data.message || 'Verification failed');
            }
        } catch (err) {
            setError('Security subsystem connectivity failure');
            toast.error('Connection failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0B1220] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-[#111827] border border-[#1F2937] rounded-xl shadow-2xl p-8 lg:p-10"
            >
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                            <Key className="text-blue-500 w-7 h-7" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-[#F1F5F9] tracking-tight">Security Checkpoint</h1>
                    <p className="text-sm text-[#94A3B8] mt-1 font-medium">AUTHORIZED EMAIL DISPATCHED</p>
                </div>

                <form className="space-y-8" onSubmit={handleSubmit}>
                    {error && (
                        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs font-semibold">
                            <AlertCircle size={14} />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="flex justify-between gap-2">
                        {otp.map((digit, i) => (
                            <input
                                key={i}
                                id={`otp-${i}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(i, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(i, e)}
                                className="w-12 h-14 bg-[#0B1220] border border-[#1F2937] rounded-lg text-center text-xl font-bold text-[#F1F5F9] focus:border-blue-500/50 outline-none transition-all"
                                autoComplete="off"
                            />
                        ))}
                    </div>

                    <div className="space-y-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 rounded-lg bg-slate-800 border border-slate-700 font-bold text-xs uppercase tracking-widest text-[#F1F5F9] hover:bg-slate-750 hover:border-blue-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                'Confirm Identity'
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => router.push('/admin/auth/login')}
                            className="w-full flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#475569] hover:text-[#F1F5F9] transition-colors"
                        >
                            <ArrowLeft size={12} />
                            Terminate Session & Return
                        </button>
                    </div>
                </form>

                <div className="mt-10 pt-8 border-t border-[#1F2937] text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#475569] leading-6">
                        Godzilla Hardening Protocol v2.1 <br />
                        <span className="text-blue-500/50">Restricted Environmental Access</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
