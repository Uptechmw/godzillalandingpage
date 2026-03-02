"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [user, setUser] = useState<any>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        setIsMenuOpen(false);
        router.push("/");
        router.refresh();
    };

    const navLinks = [
        { name: 'Features', href: '#capabilities' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'AI Models', href: '#' },
        { name: 'Resources', href: '#' },
    ];

    return (
        <nav className="fixed top-0 w-full z-[1000] h-16 flex items-center backdrop-blur-md" style={{
            background: 'rgba(11, 18, 32, 0.85)',
            borderBottom: '1px solid var(--color-border)'
        }}>
            <div className="container mx-auto px-6 flex justify-between items-center w-full max-w-7xl">
                <Link href="/" className="flex items-center gap-3 group relative z-[1001]">
                    <Image
                        src="/assets/logo.png"
                        alt="Godzilla"
                        width={28}
                        height={28}
                        className="w-7 h-7"
                    />
                    <span className="font-semibold text-sm tracking-tight" style={{ color: 'var(--color-text)' }}>
                        Godzilla
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-8 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm transition-colors"
                            style={{ color: 'var(--color-muted)' }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="h-4 w-px mx-2" style={{ background: 'var(--color-border)' }} />

                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard">
                                <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-all" style={{ color: 'var(--color-text)', border: '1px solid transparent' }}
                                    onMouseEnter={e => (e.currentTarget.style.border = '1px solid var(--color-border)')}
                                    onMouseLeave={e => (e.currentTarget.style.border = '1px solid transparent')}
                                >
                                    <LayoutDashboard className="w-4 h-4" style={{ color: 'var(--color-muted)' } as any} />
                                    Dashboard
                                </button>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-all"
                                style={{ color: 'var(--color-muted)' }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/auth/login" className="px-4 py-2 text-sm transition-colors" style={{ color: 'var(--color-muted)' }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
                            >
                                Sign In
                            </Link>
                            <Link href="/auth/signup">
                                <button className="px-4 py-2 rounded-md font-semibold text-sm transition-all" style={{ background: 'var(--color-accent)', color: '#fff' }}
                                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                                >
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden relative z-[1001] p-2 text-slate-400 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="fixed inset-0 bg-[#0B1220] z-[1000] flex flex-col pt-24 px-8 md:hidden"
                        >
                            <div className="flex flex-col gap-6 mb-12">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-2xl font-bold text-slate-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="h-px w-full bg-[#1F2937] mb-8" />

                            {user ? (
                                <div className="flex flex-col gap-4">
                                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                                        <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#111827] border border-[#1F2937] rounded-2xl text-white font-bold transition-all">
                                            <LayoutDashboard className="w-5 h-5 text-blue-500" />
                                            Dashboard
                                        </button>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-slate-400 font-bold"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                                        <button className="w-full py-4 text-slate-400 font-bold text-lg">
                                            Sign In
                                        </button>
                                    </Link>
                                    <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                                        <button className="w-full py-4 bg-blue-600 rounded-2xl text-white font-black text-lg shadow-lg shadow-blue-600/20">
                                            Get Started
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
