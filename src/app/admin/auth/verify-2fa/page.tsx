'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Key, Loader2, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import Link from 'next/link';

/**
 * Admin Split-Panel 2FA Verification
 * Phase 2: System Alignment Refactor
 */
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
        <div className="min-h-screen bg-primary flex flex-col lg:flex-row overflow-hidden">
            {/* Left Panel: Brand Authority (Unified with User Auth) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#0F172A] flex-col justify-between p-16 border-r border-border overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

                <div className="relative z-10">
                    <Link href="/" className="inline-block mb-24">
                        <div className="text-[24px] font-display font-black tracking-tighter text-glow-blue uppercase">
                            GODZILLA AI
                        </div>
                    </Link>

                    <div className="max-w-md">
                        <h2 className="text-4xl font-display font-extrabold tracking-tight text-[#F9FAFB] mb-6 leading-tight">
                            Identity Verification
                        </h2>
                        <p className="text-lg text-[#E5E7EB] mb-12 leading-relaxed">
                            To protect your account, a second layer of verification is required for administrative access.
                        </p>

                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-accent-blue" />
                                <span className="text-sm font-medium text-[#9CA3AF]">Multi-factor authentication</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-accent-blue" />
                                <span className="text-sm font-medium text-[#9CA3AF]">Zero-trust session isolation</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Footer */}
                <div className="relative z-10">
                    <div className="flex items-center gap-12 opacity-60">
                        <div className="flex flex-col">
                            <span className="label-micro text-text-faint mb-1">Access Level</span>
                            <span className="text-xs font-mono font-bold text-accent-blue">SYSTEM_ADMIN</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="label-micro text-text-faint mb-1">Status</span>
                            <span className="text-xs font-mono font-bold text-accent-blue">PENDING_VERIFICATION</span>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 right-0 w-2/3 h-1/2 opacity-5 pointer-events-none translate-x-1/4 translate-y-1/4 grayscale invert">
                    <img src="/images/enterprise/architecture.png" alt="" className="w-full h-full object-contain" />
                </div>
            </div>

            {/* Right Panel: 2FA Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-[#111827]">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-[440px] bg-[#0B1220] p-10 rounded-xl border border-[#1F2937] shadow-2xl"
                >
                    <div className="mb-10">
                        <div className="lg:hidden text-[22px] font-display font-black tracking-tighter text-glow-blue uppercase mb-10">
                            GODZILLA AI
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 bg-[#0F172A] border border-[#1F2937] flex items-center justify-center rounded-lg text-accent-blue">
                                <Shield className="w-5 h-5" />
                            </div>
                            <h1 className="text-2xl font-bold text-[#F9FAFB] tracking-tight">Verification</h1>
                        </div>
                        <p className="text-[#9CA3AF] text-sm font-medium leading-relaxed font-sans">
                            A verification code has been sent to your email. Please enter it below to confirm your identity.
                        </p>
                    </div>

                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {error && (
                            <div className="flex items-center gap-3 p-4 bg-red-400/5 border border-red-400/20 rounded-md text-red-400 text-xs font-semibold font-sans">
                                <AlertCircle size={14} />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="flex justify-between gap-3">
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    id={`otp-${i}`}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(i, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(i, e)}
                                    className="w-full h-14 bg-[#0F172A] border border-[#1F2937] rounded-lg text-center text-xl font-bold text-[#F9FAFB] focus:outline-none focus:border-accent-blue focus:ring-4 focus:ring-accent-blue/10 transition-all shadow-inner"
                                    autoComplete="off"
                                />
                            ))}
                        </div>

                        <div className="space-y-6">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-[48px] rounded-lg bg-accent-blue text-white font-bold text-sm transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 shadow-lg shadow-accent-blue/20"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    'Confirm code'
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => router.push('/auth/login')}
                                className="w-full flex items-center justify-center gap-2 text-xs font-bold text-[#4B5563] hover:text-[#E5E7EB] transition-colors"
                            >
                                <ArrowLeft size={14} />
                                Back to login
                            </button>
                        </div>
                    </form>

                    <div className="mt-12 pt-8 border-t border-[#1F2937] flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-[#4B5563]">
                        <span>GODZILLA INFRASTRUCTURE</span>
                        <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-success rounded-full"></span>
                            SECURE SESSION
                        </span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
