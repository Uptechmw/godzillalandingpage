"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { LogIn, Github, Mail, Chrome } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import { Suspense } from "react";
import { toast } from "sonner";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const source = searchParams.get("source");

    const handleOAuthLogin = async (provider: 'github' | 'google') => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback${source ? `?source=${source}` : ''}`,
            },
        });
        if (error) toast.error(error.message);
        setLoading(false);
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        let authError = null;

        if (isSignUp) {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback${source ? `?source=${source}` : ''}`,
                }
            });
            authError = error;
            if (!error) {
                toast.success("Atomic Link Sent!", {
                    description: "Check your email for the confirmation link to finalize your secure account."
                });
            }
        } else {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            authError = error;
            if (!error) {
                toast.success("Access Granted", {
                    description: "Redirecting to your command center..."
                });
                router.push(source === 'app' ? `/auth/callback?source=app` : "/dashboard");
            }
        }

        if (authError) toast.error(authError.message);
        setLoading(false);
    };

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
                        <Image src="/assets/logo.png" alt="Logo" width={64} height={64} className="w-16 h-16 drop-shadow-[0_0_15px_rgba(0,255,148,0.5)]" />
                    </div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                        {isSignUp ? "Atomic Sign Up" : "Atomic Login"}
                    </h1>
                    <p className="text-godzilla-text-muted text-sm font-bold">Secure access to the Godzilla Coder ecosystem</p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => handleOAuthLogin('github')}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-4 rounded-xl font-bold text-white hover:bg-white/10 transition-all group"
                        type="button"
                    >
                        <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Continue with GitHub
                    </button>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-godzilla-border"></div></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-godzilla-surface px-4 text-godzilla-text-muted font-black tracking-widest">Or Email</span></div>
                    </div>

                    <form onSubmit={handleEmailAuth} className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-godzilla-text-muted" />
                            <input
                                type="email"
                                placeholder="Email address"
                                required
                                className="w-full bg-black/50 border border-godzilla-border rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-godzilla-accent transition-all text-sm mb-4"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                minLength={6}
                                className="w-full bg-black/50 border border-godzilla-border rounded-xl py-4 px-4 text-white focus:outline-none focus:border-godzilla-accent transition-all text-sm"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-godzilla-accent text-black py-4 rounded-xl font-black text-sm shadow-[0_0_20px_rgba(0,255,148,0.2)] hover:shadow-[0_0_30px_rgba(0,255,148,0.4)] transition-all flex items-center justify-center gap-2 mt-2"
                        >
                            <LogIn className="w-5 h-5" />
                            {isSignUp ? "Create Account" : "Sign In to Dashboard"}
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <button
                            type="button"
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-godzilla-text-muted hover:text-white text-xs font-bold transition-colors"
                        >
                            {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
                        </button>
                    </div>
                </div>
                {source === "app" && (
                    <div className="mt-8 p-4 bg-godzilla-accent/10 border border-godzilla-accent/20 rounded-xl text-center">
                        <p className="text-[10px] font-black text-godzilla-accent uppercase tracking-widest">Authentication Source Identified</p>
                        <p className="text-xs text-white/80 mt-1">You will be redirected back to the desktop app after login.</p>
                    </div>
                )}

                <p className="mt-10 text-center text-[10px] text-godzilla-text-muted font-bold uppercase tracking-widest">
                    By continuing, you agree to the Godzilla Coder <br /> <a href="#" className="text-white hover:underline">Terms of Service</a> & <a href="#" className="text-white hover:underline">Privacy Policy</a>
                </p>
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
