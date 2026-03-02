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
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#070A11] flex-col justify-between p-16 border-r border-border overflow-hidden">
                {/* Background Blueprint Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

                <div className="relative z-10">
                    <Link href="/" className="inline-block mb-24">
                        <div className="text-[24px] font-display font-black tracking-tighter text-glow-blue uppercase">
                            GODZILLA AI
                        </div>
                    </Link>

                    <div className="max-w-md">
                        <h2 className="text-4xl font-display font-extrabold tracking-tight text-white mb-6 leading-tight">
                            Secure Access to Godzilla AI Infrastructure
                        </h2>
                        <p className="text-lg text-text-muted mb-12 leading-relaxed">
                            Access the mission-critical development platform for multi-model AI orchestration and production software engineering.
                        </p>

                        <div className="space-y-6">
                            {[
                                "Multi-model AI Orchestration",
                                "Production-grade Authentication",
                                "Deterministic Billing Engine",
                                "Enterprise-level Runtime Security"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-accent-blue" />
                                    <span className="label-micro text-text-muted">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-12 opacity-60">
                        <div className="flex flex-col">
                            <span className="label-micro text-text-faint mb-1">Environment</span>
                            <span className="text-xs font-mono font-bold text-accent-blue">PRODUCTION_SERVER_V1</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="label-micro text-text-faint mb-1">Version</span>
                            <span className="text-xs font-mono font-bold text-accent-blue">v1.2.0-STABLE</span>
                        </div>
                    </div>
                </div>

                {/* Faint architecture graphic in background */}
                <div className="absolute bottom-0 right-0 w-2/3 h-1/2 opacity-10 pointer-events-none translate-x-1/4 translate-y-1/4 grayscale invert">
                    <img src="/images/enterprise/architecture.png" alt="" className="w-full h-full object-contain" />
                </div>
            </div>

            {/* Right Panel: Auth Form */}
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
                        <h1 className="h2 mb-3">
                            {isSignUp ? "Initialize Workspace" : "Sign in to Workspace"}
                        </h1>
                        <p className="text-text-muted text-[15px] font-medium">
                            Authorized personnel only. Secure session protocol enforced.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <button
                            onClick={() => handleOAuthLogin('github')}
                            disabled={loading || githubLoading}
                            className="w-full flex items-center justify-center gap-3 py-3 rounded-md border border-border bg-surface hover:bg-surface-soft text-white font-bold text-sm transition-all disabled:opacity-50"
                        >
                            {githubLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin text-accent-blue" />
                            ) : (
                                <Github className="w-4 h-4" />
                            )}
                            Continue with GitHub
                        </button>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-text-faint">
                                <span className="px-4 bg-primary uppercase">Identity Access Management</span>
                            </div>
                        </div>

                        <form onSubmit={handleEmailAuth} className="space-y-6">
                            <div className="space-y-2">
                                <label className="label-micro text-text-muted px-1">Work Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint" />
                                    <input
                                        type="email"
                                        placeholder="name@organization.com"
                                        required
                                        className="w-full bg-[#070A11] border border-border rounded-md py-3.5 pl-12 pr-4 outline-none transition-all text-sm text-white placeholder:text-text-faint focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="label-micro text-text-muted">Password</label>
                                    {!isSignUp && (
                                        <Link href="/auth/reset-password" title="Recover Access" className="text-[11px] font-bold text-text-faint hover:text-accent-blue transition-colors uppercase tracking-wider">
                                            Recover Access
                                        </Link>
                                    )}
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint" />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                        minLength={8}
                                        className="w-full bg-[#070A11] border border-border rounded-md py-3.5 pl-12 pr-4 outline-none transition-all text-sm text-white placeholder:text-text-faint focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || githubLoading}
                                className="w-full py-4 rounded-md bg-accent-blue font-bold text-sm text-white hover:bg-accent-blue-hover active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 shadow-lg shadow-accent-blue/20"
                            >
                                {loading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    isSignUp ? <UserPlus className="w-4 h-4" /> : <Shield className="w-4 h-4" />
                                )}
                                {isSignUp ? "Initialize Workspace" : "Access Workspace"}
                            </button>
                        </form>

                        <div className="text-center mt-8">
                            <button
                                type="button"
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="text-xs font-bold text-text-faint hover:text-text transition-colors uppercase tracking-widest"
                            >
                                {isSignUp ? "Existing Personnel? Sign In" : "New Authorization? Request Access"}
                            </button>
                        </div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-border flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-text-faint">
                        <span>Godzilla Security V1.2</span>
                        <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span>
                            System Operational
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
