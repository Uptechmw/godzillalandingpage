"use client";

import { useState, useEffect, useRef } from "react";
import { api } from "@/lib/api";
import { motion } from "framer-motion";
import { Mail, Loader2, CheckCircle2, RefreshCw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { toast } from "sonner";
import Link from "next/link";

/**
 * Enterprise Split-Panel Verify Email
 * Phase 2: System Alignment Refactor
 */
function VerifyEmailForm() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState("");
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        setError("");
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const newOtp = [...otp];
        for (let i = 0; i < pastedData.length; i++) {
            newOtp[i] = pastedData[i];
        }
        setOtp(newOtp);
        const nextIndex = Math.min(pastedData.length, 5);
        inputRefs.current[nextIndex]?.focus();
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        const code = otp.join('');
        if (code.length !== 6) {
            setError('Please enter all 6 digits');
            return;
        }

        setLoading(true);
        setError("");

        try {
            const data = await api.post('/auth/verify-otp', {
                email,
                code,
            });

            if (data.success) {
                toast.success("Identity Confirmed", {
                    description: "Authorization successful. Redirecting to workspace..."
                });
                router.push("/dashboard");
            }
        } catch (error: any) {
            setError(error.message || 'Invalid verification code');
            toast.error(error.message || 'Verification failed');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setResending(true);
        setError("");
        try {
            const data = await api.post('/auth/resend-otp', { email });
            if (data.success) {
                toast.success("Authorization Resent", {
                    description: "Check your secure inbox for the new code."
                });
                setTimeLeft(600);
                setOtp(["", "", "", "", "", ""]);
                inputRefs.current[0]?.focus();
            }
        } catch (error: any) {
            toast.error(error.message || 'Failed to resend code');
        } finally {
            setResending(false);
        }
    };

    if (!email) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center p-6">
                <div className="text-center">
                    <p className="text-white text-sm font-bold mb-4 uppercase tracking-[0.2em]">Invalid Identity Link</p>
                    <Link
                        href="/auth/login"
                        className="text-accent-blue hover:underline text-xs font-bold uppercase tracking-widest"
                    >
                        Return to Authentication
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary flex flex-col lg:flex-row overflow-hidden">
            {/* Left Panel: Brand Authority (Same as Login) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#070A11] flex-col justify-between p-16 border-r border-border overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

                <div className="relative z-10">
                    <Link href="/" className="inline-block mb-24">
                        <div className="text-[24px] font-display font-black tracking-tighter text-glow-blue uppercase">
                            GODZILLA AI
                        </div>
                    </Link>

                    <div className="max-w-md">
                        <h2 className="text-4xl font-display font-extrabold tracking-tight text-white mb-6 leading-tight">
                            Identity Verification Required
                        </h2>
                        <p className="text-lg text-text-muted mb-12 leading-relaxed">
                            To ensure high-security infrastructure access, we have dispatched a multi-factor authorization code to your registered identity provider.
                        </p>

                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-accent-blue" />
                                <span className="label-micro text-text-muted">Multi-factor Authentication</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-accent-blue" />
                                <span className="label-micro text-text-muted">Zero-Trust Environment</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Footer */}
                <div className="relative z-10">
                    <div className="flex items-center gap-12 opacity-60">
                        <div className="flex flex-col">
                            <span className="label-micro text-text-faint mb-1">MFA Status</span>
                            <span className="text-xs font-mono font-bold text-accent-blue">PENDING_VERIFICATION</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="label-micro text-text-faint mb-1">Security Gate</span>
                            <span className="text-xs font-mono font-bold text-accent-blue">GATE-MFA-001</span>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 right-0 w-2/3 h-1/2 opacity-10 pointer-events-none translate-x-1/4 translate-y-1/4 grayscale invert">
                    <img src="/images/enterprise/architecture.png" alt="" className="w-full h-full object-contain" />
                </div>
            </div>

            {/* Right Panel: OTP Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-primary">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-[420px]"
                >
                    <div className="mb-12">
                        <div className="lg:hidden text-[22px] font-display font-black tracking-tighter text-glow-blue uppercase mb-12">
                            GODZILLA AI
                        </div>
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-10 h-10 bg-surface-soft border border-border flex items-center justify-center rounded-md">
                                <Mail className="w-5 h-5 text-accent-blue" />
                            </div>
                            <h1 className="h2 translate-y-[2px]">Verify Identity</h1>
                        </div>
                        <p className="text-text-muted text-[15px] font-medium leading-relaxed">
                            Secure authorization dispatched to <span className="text-white font-bold">{email}</span>. Please enter the 6-digit code to authorize your session.
                        </p>
                    </div>

                    <form onSubmit={handleVerify} className="space-y-8">
                        <div className="flex gap-2 justify-center">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { inputRefs.current[index] = el; }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className="w-12 h-14 bg-[#070A11] border border-border rounded-md text-center text-white text-xl font-bold focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 transition-all"
                                    disabled={loading}
                                />
                            ))}
                        </div>

                        {error && (
                            <div className="text-red-400 text-[10px] text-center font-bold uppercase tracking-[0.15em] py-2 bg-red-400/5 border border-red-400/20 rounded-md">
                                {error}
                            </div>
                        )}

                        <div className="text-center py-4 bg-surface-soft/50 border border-border/50 rounded-md">
                            <p className="label-micro text-text-faint">
                                AUTHORIZATION EXPIRES IN: <span className="text-white font-mono">{formatTime(timeLeft)}</span>
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || otp.join('').length !== 6}
                            className="w-full bg-accent-blue text-white py-4 rounded-md font-bold text-sm transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 shadow-lg shadow-accent-blue/20"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <CheckCircle2 className="w-4 h-4" />
                            )}
                            ESTABLISH SESSION
                        </button>

                        <div className="text-center mt-6">
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={resending || timeLeft > 540}
                                className="text-text-faint hover:text-text text-[11px] font-bold uppercase tracking-widest transition-colors disabled:opacity-50 flex items-center gap-2 mx-auto justify-center"
                            >
                                {resending ? (
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                    <RefreshCw className="w-3 h-3" />
                                )}
                                Request New Authorization
                            </button>
                        </div>
                    </form>

                    <div className="mt-16 pt-8 border-t border-border flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-text-faint">
                        <span>MFA-GATE-001</span>
                        <span>v1.2.0-STABLE</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-accent-blue border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <VerifyEmailForm />
        </Suspense>
    );
}
