"use client";

import { useState, useEffect, useRef } from "react";
import { api } from "@/lib/api";
import { motion } from "framer-motion";
import { Mail, Loader2, CheckCircle2, RefreshCw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
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

    // Countdown timer
    useEffect(() => {
        if (timeLeft <= 0) return;
        
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    // Format time as MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Handle OTP input
    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return; // Only allow digits

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Only take last character
        setOtp(newOtp);
        setError("");

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Handle backspace
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Handle paste
    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const newOtp = [...otp];
        
        for (let i = 0; i < pastedData.length; i++) {
            newOtp[i] = pastedData[i];
        }
        
        setOtp(newOtp);
        
        // Focus last filled input or first empty
        const nextIndex = Math.min(pastedData.length, 5);
        inputRefs.current[nextIndex]?.focus();
    };

    // Verify OTP
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

            if (data.token) {
                localStorage.setItem('auth_token', data.token);
                toast.success("Email Verified!", {
                    description: "Your account is now active. Redirecting..."
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

    // Resend OTP
    const handleResend = async () => {
        setResending(true);
        setError("");

        try {
            await api.post('/auth/resend-otp', { email });
            toast.success("Code Resent!", {
                description: "Check your email for the new verification code."
            });
            setTimeLeft(600); // Reset timer
            setOtp(["", "", "", "", "", ""]); // Clear inputs
            inputRefs.current[0]?.focus();
        } catch (error: any) {
            toast.error(error.message || 'Failed to resend code');
        } finally {
            setResending(false);
        }
    };

    if (!email) {
        return (
            <div className="min-h-screen bg-godzilla-bg flex items-center justify-center p-6">
                <div className="text-center">
                    <p className="text-white text-lg mb-4">Invalid verification link</p>
                    <button
                        onClick={() => router.push('/auth/login')}
                        className="text-godzilla-accent hover:underline"
                    >
                        Return to login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-godzilla-bg flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-godzilla-accent/10 blur-[120px] rounded-full -z-10" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-godzilla-surface border border-godzilla-border p-10 rounded-3xl shadow-2xl relative"
            >
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-godzilla-accent/20 rounded-full flex items-center justify-center">
                            <Mail className="w-8 h-8 text-godzilla-accent" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                        Verify Your Email
                    </h1>
                    <p className="text-godzilla-text-muted text-sm font-bold">
                        We sent a 6-digit code to
                    </p>
                    <p className="text-white text-sm font-bold mt-1">{email}</p>
                </div>

                <form onSubmit={handleVerify} className="space-y-6">
                    {/* OTP Input */}
                    <div className="flex gap-2 justify-center">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    inputRefs.current[index] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="w-12 h-14 bg-black/50 border border-godzilla-border rounded-xl text-center text-white text-xl font-bold focus:outline-none focus:border-godzilla-accent transition-all"
                                disabled={loading}
                            />
                        ))}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-sm text-center font-bold"
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Timer */}
                    <div className="text-center">
                        <p className="text-godzilla-text-muted text-xs font-bold">
                            Code expires in: <span className="text-white">{formatTime(timeLeft)}</span>
                        </p>
                    </div>

                    {/* Verify Button */}
                    <button
                        type="submit"
                        disabled={loading || otp.join('').length !== 6}
                        className="w-full bg-godzilla-accent text-black py-4 rounded-xl font-black text-sm shadow-[0_0_20px_rgba(0,255,148,0.2)] hover:shadow-[0_0_30px_rgba(0,255,148,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <CheckCircle2 className="w-5 h-5" />
                        )}
                        Verify Email
                    </button>

                    {/* Resend Button */}
                    <div className="text-center">
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={resending || timeLeft > 540} // Can resend after 1 minute
                            className="text-godzilla-text-muted hover:text-white text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                        >
                            {resending ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <RefreshCw className="w-4 h-4" />
                            )}
                            Didn't receive the code? Resend
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-[10px] text-godzilla-text-muted font-bold uppercase tracking-widest">
                    Secure email verification powered by Godzilla Coder
                </p>
            </motion.div>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-godzilla-bg flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-godzilla-accent border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <VerifyEmailForm />
        </Suspense>
    );
}
