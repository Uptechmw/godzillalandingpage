"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User, LogIn, LayoutDashboard, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
        };
        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    };

    return (
        <nav className="fixed top-0 w-full z-[1000] bg-godzilla-bg/80 backdrop-blur-xl border-b border-godzilla-border h-20 flex items-center">
            <div className="container mx-auto px-6 flex justify-between items-center w-full">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <Image
                            src="/assets/logo.png"
                            alt="Godzilla Coder Logo"
                            width={42}
                            height={42}
                            className="w-10 h-10 group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-godzilla-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="font-black text-xl text-white uppercase tracking-tighter leading-none">
                        Godzilla <span className="text-godzilla-accent italic">Coder</span>
                    </span>
                </Link>

                <div className="hidden md:flex gap-10 items-center">
                    <Link href="#features" className="text-godzilla-text-muted hover:text-white text-xs font-black uppercase tracking-widest transition-colors">
                        Capabilities
                    </Link>
                    <Link href="#pricing" className="text-godzilla-text-muted hover:text-white text-xs font-black uppercase tracking-widest transition-colors">
                        Packs
                    </Link>

                    <div className="h-6 w-px bg-white/10 mx-2" />

                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                                >
                                    <LayoutDashboard className="w-4 h-4 text-godzilla-accent" />
                                    Dashboard
                                </motion.button>
                            </Link>

                            <motion.button
                                onClick={handleLogout}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 text-godzilla-text-muted hover:text-red-400 px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </motion.button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-6">
                            <Link href="/auth/login" className="text-white hover:text-godzilla-accent text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-2">
                                <LogIn className="w-4 h-4" />
                                Sign In
                            </Link>
                            <motion.a
                                href="/auth/login"
                                whileHover={{ scale: 1.05, translateY: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-godzilla-accent text-black px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(0,255,148,0.3)] hover:shadow-[0_0_30px_rgba(0,255,148,0.5)] transition-all"
                            >
                                Get Tokens
                            </motion.a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
