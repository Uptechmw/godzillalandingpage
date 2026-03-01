"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { api } from "@/lib/api";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { LogIn, Github, Mail, Chrome, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import { Suspense } from "react";
import { toast } from "sonner";

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

    // Also listen for query changes if user navigates while on the same page
    useEffect(() => {
        if (mode === "signup") setIsSignUp(true);
    }, [mode]);

    const handleOAuthLogin = async (provider: 'github' | 'google') => {
        if (provider === 'github') {
            setGithubLoading(true);
        } else {
            setGoogleLoading(true);
        }

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
        // Don't reset loading on success - user will be redirected
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isSignUp) {
                // Call backend API for registration with OTP
                const data = await api.post('/auth/register', {
                    email,
                    password,
                    name: email.split('@')[0], // Use email prefix as default name
                });

                if (data.success) {
                    toast.success("Account Created!", {
                        description: "Check your email for verification code."
                    });
                    // Redirect to verification page
                    router.push(`/auth/verify-email?email=${encodeURIComponent(email)}`);
                }
            } else {
                // Call backend API for login
                const data = await api.post('/auth/login', {
                    email,
                    password,
                });

                if (data.success && data.token) {
                    // Store token in localStorage and Cookies for regular users
                    // Admins will be redirected to /admin where they will likely need
                    // to login specifically to get the godzilla_admin_session cookie.

                    if (data.redirectTo === '/admin') {
                        toast.info("Admin Account Detected", {
                            description: "Redirecting to secure admin portal..."
                        });
                        router.push('/admin'); // Middleware will catch and redirect to admin login if no admin session
                    } else {
                        localStorage.setItem('auth_token', data.token);
                        Cookies.set('auth_token', data.token, { expires: 7 });

                        toast.success("Access Granted", {
                            description: "Redirecting to your command center..."
                        });
                        router.push(source === 'app' ? `/auth/callback?source=app` : "/dashboard");
                    }
                }
            }
        } catch (error: any) {
            console.error('[Auth Error]', error);

            // Check if this is an unverified user error
            if (error.data?.requiresVerification) {
                toast.error("Verification Required", {
                    description: "Please verify your email address first."
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
        <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--color-primary)' }}>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-10 rounded-2xl shadow-2xl relative"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            >
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-6">
                        <Image src="/assets/logo.png" alt="Godzilla Coder" width={56} height={56} className="w-14 h-14" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight mb-2" style={{ color: 'var(--color-text)' }}>
                        {isSignUp ? "Create your account" : "Sign in to your account"}
                    </h1>
                    <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Secure access to Godzilla Coder</p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => handleOAuthLogin('github')}
                        disabled={loading || githubLoading || googleLoading}
                        className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-semibold transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface-2)', color: 'var(--color-text)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-surface-3)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-surface-2)'; }}
                        type="button"
                    >
                        {githubLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Github className="w-5 h-5 group-hover:scale-105 transition-transform" />
                        )}
                        Continue with GitHub
                    </button>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center"><div className="w-full" style={{ borderTop: '1px solid var(--color-border)' }}></div></div>
                        <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest"><span className="px-4" style={{ background: 'var(--color-surface)', color: 'var(--color-text-faint)' }}>Or email</span></div>
                    </div>

                    <form onSubmit={handleEmailAuth} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold px-1" style={{ color: 'var(--color-muted)' }}>Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-text-faint)' }} />
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    className="w-full rounded-xl py-3.5 pl-11 pr-4 outline-none transition-all text-sm"
                                    style={{ background: 'var(--color-primary)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.boxShadow = '0 0 0 1px var(--color-accent)'; }}
                                    onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none'; }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold px-1" style={{ color: 'var(--color-muted)' }}>Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                required
                                minLength={8}
                                className="w-full rounded-xl py-3.5 px-4 outline-none transition-all text-sm"
                                style={{ background: 'var(--color-primary)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                                onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.boxShadow = '0 0 0 1px var(--color-accent)'; }}
                                onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none'; }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || githubLoading || googleLoading}
                            className="w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ background: 'var(--color-accent)', color: '#fff' }}
                            onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
                            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <LogIn className="w-5 h-5" />
                            )}
                            {isSignUp ? "Create account" : "Sign in"}
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <button
                            type="button"
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-xs font-semibold transition-colors"
                            style={{ color: 'var(--color-muted)' }}
                            onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-text)'; }}
                            onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-muted)'; }}
                        >
                            {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Create one"}
                        </button>
                    </div>
                </div>

                {source === "app" && (
                    <div className="mt-8 p-4 rounded-xl text-center" style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.15)' }}>
                        <p className="text-[10px] uppercase font-bold tracking-widest" style={{ color: 'var(--color-accent)' }}>App Source Detected</p>
                        <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>Redirecting back to desktop application after sign-in.</p>
                    </div>
                )}

                <div className="mt-10 text-center text-[10px] font-bold uppercase tracking-widest leading-relaxed" style={{ color: 'var(--color-text-faint)' }}>
                    By continuing, you agree to our <br /> <a href="#" className="hover:underline" style={{ color: 'var(--color-muted)' }}>Terms of Service</a> & <a href="#" className="hover:underline" style={{ color: 'var(--color-muted)' }}>Privacy Policy</a>
                </div>
            </motion.div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-godzilla-bg flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-godzilla-accent border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <LoginForm />
        </Suspense>
    );
}
