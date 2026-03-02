"use client";

import { useState, useEffect, Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { api } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, Github, Mail, Loader2, Shield, UserPlus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

/**
 * Professional Auth Page (Deep Slate Theme)
 * No gradients, no emojis.
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
                    // Note: Backend sets the 'godzilla_session' HttpOnly cookie automatically.
                    // We no longer store tokens in localStorage per Phase A security mandate.

                    if (data.redirectTo === '/admin') {
                        toast.info("Admin authentication detected", {
                            description: "Redirecting to secure management gate..."
                        });
                        router.push('/admin/auth/login');
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
        <div className="min-h-screen bg-[#0B1220] flex items-center justify-center p-6 selection:bg-blue-500/30">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-[#111827] border border-[#1F2937] rounded-xl shadow-2xl p-8 lg:p-10"
            >
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Shield className="text-white w-7 h-7" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-[#F1F5F9] tracking-tight">
                        {isSignUp ? "Create Workspace" : "System Access"}
                    </h1>
                    <p className="text-sm text-[#94A3B8] mt-1 font-medium">GODZILLA AI AUTHENTICATION</p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => handleOAuthLogin('github')}
                        disabled={loading || githubLoading || googleLoading}
                        className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-[#1F2937] bg-[#1F2937]/50 text-[#F1F5F9] font-semibold text-sm hover:bg-[#1F2937] transition-all disabled:opacity-50"
                    >
                        {githubLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                        ) : (
                            <Github className="w-4 h-4" />
                        )}
                        Continue with GitHub
                    </button>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#1F2937]"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-[#475569]">
                            <span className="px-4 bg-[#111827]">Network Credentials</span>
                        </div>
                    </div>

                    <form onSubmit={handleEmailAuth} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-tight text-[#94A3B8] px-1">Identity Provider (Email)</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
                                <input
                                    type="email"
                                    placeholder="name@organization.com"
                                    required
                                    className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg py-3 pl-11 pr-4 outline-none transition-all text-sm text-[#F1F5F9] placeholder:text-[#475569] focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-tight text-[#94A3B8] px-1">Security Cipher (Password)</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                required
                                minLength={8}
                                className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg py-3 px-4 outline-none transition-all text-sm text-[#F1F5F9] placeholder:text-[#475569] focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || githubLoading || googleLoading}
                            className="w-full py-3.5 rounded-lg bg-blue-600 font-bold text-sm text-white hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                isSignUp ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />
                            )}
                            {isSignUp ? "Register Account" : "Authorize Session"}
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <button
                            type="button"
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-xs font-semibold text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
                        >
                            {isSignUp ? "Existing account? Authorize here" : "Need access? Request credentials"}
                        </button>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-[#1F2937] text-center text-[10px] font-bold uppercase tracking-widest text-[#475569] leading-relaxed">
                    Godzilla AI Security Protocol v3.0 <br />
                    <span className="opacity-50">Controlled Access Only</span>
                </div>
            </motion.div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#0B1220] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <LoginForm />
        </Suspense>
    );
}
