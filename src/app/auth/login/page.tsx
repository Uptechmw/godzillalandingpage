"use client";

import { useState, useEffect, Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { api } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, Github, Mail, Loader2, Shield, UserPlus, CheckCircle2, Lock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";

/**
 * Enterprise Split-Panel Auth Page
 * Phase 2: System Alignment Refactor
 */
function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [githubLoading, setGithubLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const source = searchParams.get("source");
    const mode = searchParams.get("mode");
    const [isSignUp, setIsSignUp] = useState(mode === "signup");

    useEffect(() => {
        if (mode === "signup") setIsSignUp(true);
        else if (mode === "login") setIsSignUp(false);
    }, [mode]);

    const handleOAuthLogin = async (provider: 'github' | 'google') => {
        if (provider === 'github') setGithubLoading(true);
        else setGoogleLoading(true);

        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback${source ? `?source=${source}` : ''}`,
            },
        });

        if (error) {
            toast.error(error.message);
            setGithubLoading(false);
            setGoogleLoading(false);
        }
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isSignUp) {
                const data = await api.post('/auth/register', {
                    email,
                    password,
                    name: email.split('@')[0],
                });

                if (data.success) {
                    toast.success("Verification required", {
                        description: "An authorization code has been dispatched to your email."
                    });
                    router.push(`/auth/verify-email?email=${encodeURIComponent(email)}`);
                }
            } else {
                const data = await api.post('/auth/login', {
                    email,
                    password,
                });

                if (data.success) {
                    if (data.redirectTo === '/admin') {
                        toast.info("Admin authentication detected", {
                            description: "Redirecting to secure management gate..."
                        });
                        router.push('/admin/login');
                    } else {
                        toast.success("Session established", {
                            description: "Entry authorized. Redirecting to dashboard..."
                        });
                        router.push(source === 'app' ? `/auth/callback?source=app` : "/dashboard");
                    }
                }
            }
        } catch (error: any) {
            if (error.data?.requiresVerification) {
                toast.error("Account pending verification", {
                    description: "Authorization code required to proceed."
                });
                router.push(`/auth/verify-email?email=${encodeURIComponent(email)}`);
                return;
            }
            toast.error(error.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-primary flex flex-col lg:flex-row overflow-hidden">
            {/* Left Panel: Brand Authority & Visuals */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#0F172A] flex-col justify-between p-16 border-r border-border overflow-hidden">
                {/* Background Blueprint Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

                <div className="relative z-10">
                    <Link href="/" className="inline-block mb-24">
                        <div className="text-[24px] font-display font-black tracking-tighter text-glow-blue uppercase">
                            GODZILLA AI
                        </div>
                    </Link>

                    <div className="max-w-md">
                        <h2 className="text-4xl font-display font-extrabold tracking-tight text-[#F9FAFB] mb-6 leading-tight">
                            Sign in to Godzilla AI
                        </h2>
                        <p className="text-lg text-[#E5E7EB] mb-12 leading-relaxed">
                            Access your workspace and continue building with AI.
                        </p>

                        <div className="space-y-6">
                            {[
                                "Multi-model AI Orchestration",
                                "Isolated secure local runtimes",
                                "Transparent infrastructure billing",
                                "Zero-persistence source privacy"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-accent-blue" />
                                    <span className="text-sm font-medium text-[#9CA3AF]">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-12 opacity-60">
                        <div className="flex flex-col">
                            <span className="label-micro text-text-faint mb-1">Environment</span>
                            <span className="text-xs font-mono font-bold text-accent-blue">STABLE_PRODUCTION</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="label-micro text-text-faint mb-1">Version</span>
                            <span className="text-xs font-mono font-bold text-accent-blue">v1.2.0</span>
                        </div>
                    </div>
                </div>

                {/* Faint architecture graphic in background */}
                <div className="absolute bottom-0 right-0 w-2/3 h-1/2 opacity-5 pointer-events-none translate-x-1/4 translate-y-1/4 grayscale invert">
                    <img src="/images/enterprise/architecture.png" alt="" className="w-full h-full object-contain" />
                </div>
            </div>

            {/* Right Panel: Auth Form */}
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
                        <h1 className="text-2xl font-bold text-[#F9FAFB] mb-2">
                            {isSignUp ? "Create your account" : "Sign in"}
                        </h1>
                        <p className="text-[#9CA3AF] text-sm font-medium font-sans">
                            Use your account credentials to access your workspace.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <button
                            onClick={() => handleOAuthLogin('github')}
                            disabled={loading || githubLoading}
                            className="w-full flex items-center justify-center gap-3 h-[48px] rounded-lg border border-[#1F2937] bg-transparent hover:bg-[#161B22] text-[#E5E7EB] font-semibold text-sm transition-all disabled:opacity-50"
                        >
                            {githubLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin text-accent-blue" />
                            ) : (
                                <Github className="w-4 h-4" />
                            )}
                            Continue with GitHub
                        </button>

                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#1F2937]"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-[#4B5563]">
                                <span className="px-4 bg-[#0B1220]">OR CONTINUE WITH EMAIL</span>
                            </div>
                        </div>

                        <form onSubmit={handleEmailAuth} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#9CA3AF] px-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4B5563]" />
                                    <input
                                        type="email"
                                        placeholder="name@company.com"
                                        required
                                        className="w-full h-[48px] bg-[#0F172A] border border-[#1F2937] rounded-lg pl-12 pr-4 outline-none transition-all text-sm text-[#F9FAFB] placeholder:text-[#4B5563] focus:border-accent-blue focus:ring-4 focus:ring-accent-blue/10"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-xs font-bold text-[#9CA3AF]">Password</label>
                                    {!isSignUp && (
                                        <Link href="/auth/reset-password" title="Recover Access" className="text-xs font-semibold text-[#4B5563] hover:text-accent-blue transition-colors">
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4B5563]" />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                        minLength={8}
                                        className="w-full h-[48px] bg-[#0F172A] border border-[#1F2937] rounded-lg pl-12 pr-4 outline-none transition-all text-sm text-[#F9FAFB] placeholder:text-[#4B5563] focus:border-accent-blue focus:ring-4 focus:ring-accent-blue/10"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || githubLoading}
                                className="w-full h-[48px] rounded-lg bg-accent-blue font-bold text-sm text-white hover:bg-[#1D4ED8] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 shadow-lg shadow-accent-blue/20"
                            >
                                {loading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    isSignUp ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />
                                )}
                                {isSignUp ? "Create account" : "Sign in"}
                            </button>
                        </form>

                        <div className="text-center mt-6">
                            <button
                                type="button"
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="text-xs font-bold text-[#4B5563] hover:text-[#E5E7EB] transition-colors"
                            >
                                {isSignUp ? "Already have an account? Sign in" : "Don’t have an account? Create one"}
                            </button>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-[#1F2937] flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-[#4B5563]">
                        <span>GODZILLA INFRASTRUCTURE</span>
                        <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-success rounded-full"></span>
                            SYSTEM OPERATIONAL
                        </span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-accent-blue border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <LoginForm />
        </Suspense>
    );
}
