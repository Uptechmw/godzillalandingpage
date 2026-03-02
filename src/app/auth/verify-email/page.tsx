"use client";

import { useState, useEffect, useRef } from "react";
import { api } from "@/lib/api";
import { motion } from "framer-motion";
import { Mail, Loader2, CheckCircle2, RefreshCw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { toast } from "sonner";

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
                // TOKEN STORAGE REMOVED: Managed by HttpOnly cookies
                toast.success("Identity Confirmed", {
                    description: "Redirecting to secure dashboard..."
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
            <div className="min-h-screen bg-[#0B1220] flex items-center justify-center p-6">
                <div className="text-center">
                    <p className="text-[#F1F5F9] text-sm font-bold mb-4">INVALID IDENTITY LINK</p>
                    <button
                        onClick={() => router.push('/auth/login')}
                        className="text-blue-500 hover:underline text-xs font-bold uppercase tracking-widest"
                    >
                        Return to login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B1220] flex items-center justify-center p-6 relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-[#111827] border border-[#1F2937] p-8 lg:p-10 rounded-xl shadow-2xl relative"
            >
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-6">
                        <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
                            <Mail className="w-6 h-6 text-blue-500" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-[#F1F5F9] tracking-tight mb-2">
                        Verify Identity
                    </h1>
                    <p className="text-[#94A3B8] text-sm font-medium">
                        Secure authorization dispatched to
                    </p>
                    <p className="text-[#F1F5F9] text-sm font-bold mt-1">{email}</p>
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
                                className="w-12 h-14 bg-[#0B1220] border border-[#1F2937] rounded-lg text-center text-[#F1F5F9] text-xl font-bold focus:outline-none focus:border-blue-500/50 transition-all"
                                disabled={loading}
                            />
                        ))}
                    </div>

                    {error && (
                        <div className="text-red-400 text-[10px] text-center font-bold uppercase tracking-widest">
                            {error}
                        </div>
                    )}

                    <div className="text-center">
                        <p className="text-[#475569] text-[10px] font-bold uppercase tracking-widest">
                            CIPHER EXPIRES: <span className="text-[#94A3B8]">{formatTime(timeLeft)}</span>
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || otp.join('').length !== 6}
                        className="w-full bg-slate-800 border border-slate-700 text-[#F1F5F9] py-4 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-slate-750 hover:border-blue-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <CheckCircle2 className="w-4 h-4" />
                        )}
                        Establish Session
                    </button>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={resending || timeLeft > 540}
                            className="text-[#475569] hover:text-[#F1F5F9] text-[10px] font-bold uppercase tracking-widest transition-colors disabled:opacity-50 flex items-center gap-2 mx-auto"
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

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#0B1220] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
            </div>
        }>
            <VerifyEmailForm />
        </Suspense>
    );
}
