'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Shield, Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

function AdminLoginContent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectPath = searchParams.get('redirect') || '/admin';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/admin/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                if (data.requires2FA) {
                    toast.info('Authorization Required', {
                        description: 'Multi-factor code sent to secure email.'
                    });
                    router.push('/admin/auth/verify-2fa');
                } else {
                    toast.success('Identity Verified');
                    router.push(redirectPath);
                }
            } else {
                setError(data.message || 'Identity verification failed');
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
        <div className="min-h-screen bg-[#111827] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[440px] bg-[#0B1220] border border-[#1F2937] rounded-xl shadow-2xl p-10 lg:p-12"
            >
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-6">
                        <div className="w-14 h-14 bg-[#0F172A] rounded-lg flex items-center justify-center border border-[#1F2937]">
                            <Shield className="text-accent-blue w-8 h-8" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-[#F9FAFB] tracking-tight">Management Portal</h1>
                    <p className="text-[#9CA3AF] text-sm font-medium mt-2">Sign in to your administrative account</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs font-semibold font-sans">
                            <AlertCircle size={14} />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#9CA3AF] px-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4B5563]" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                required
                                disabled={isLoading}
                                className="w-full h-[48px] bg-[#0F172A] border border-[#1F2937] rounded-lg pl-12 pr-4 outline-none transition-all text-sm text-[#F9FAFB] placeholder:text-[#4B5563] focus:border-accent-blue focus:ring-4 focus:ring-accent-blue/10"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#9CA3AF] px-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4B5563]" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                disabled={isLoading}
                                className="w-full h-[48px] bg-[#0F172A] border border-[#1F2937] rounded-lg pl-12 pr-4 outline-none transition-all text-sm text-[#F9FAFB] placeholder:text-[#4B5563] focus:border-accent-blue focus:ring-4 focus:ring-accent-blue/10"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-[48px] rounded-lg bg-accent-blue font-bold text-sm text-white hover:bg-[#1D4ED8] transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-accent-blue/20"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <div className="mt-10 pt-8 border-t border-[#1F2937] text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4B5563] leading-6">
                        GODZILLA INFRASTRUCTURE v2.1 <br />
                        <span className="text-accent-blue/50">Restricted Access Portal</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

export default function AdminLoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-border border-t-accent-blue rounded-full animate-spin" />
            </div>
        }>
            <AdminLoginContent />
        </Suspense>
    );
}
