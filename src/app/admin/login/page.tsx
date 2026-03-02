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
        <div className="min-h-screen bg-[#0B1220] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-[#111827] border border-[#1F2937] rounded-xl shadow-2xl p-8 lg:p-10"
            >
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                            <Shield className="text-blue-500 w-7 h-7" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-[#F1F5F9] tracking-tight">Management Portal</h1>
                    <p className="text-sm text-[#94A3B8] mt-1 font-medium italic">SECURE GATEWAY ALPHA</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs font-semibold">
                            <AlertCircle size={14} />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-[#475569] px-1">Identity Identifier</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@domain.com"
                                required
                                disabled={isLoading}
                                className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg py-3.5 pl-11 pr-4 outline-none transition-all text-sm text-[#F1F5F9] placeholder:text-[#475569] focus:border-blue-500/50"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-[#475569] px-1">Authorization Cipher</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                disabled={isLoading}
                                className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg py-3.5 pl-11 pr-4 outline-none transition-all text-sm text-[#F1F5F9] placeholder:text-[#475569] focus:border-blue-500/50"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 rounded-lg bg-slate-800 border border-slate-700 font-bold text-xs uppercase tracking-widest text-[#F1F5F9] hover:bg-slate-750 hover:border-blue-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            'Authorize Session'
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-[#1F2937] text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#475569] leading-6">
                        Godzilla Hardening Protocol v2.1 <br />
                        <span className="text-blue-500/50">Restricted Environmental Access</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

export default function AdminLoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#0B1220] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
            </div>
        }>
            <AdminLoginContent />
        </Suspense>
    );
}
