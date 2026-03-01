"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { LayoutDashboard, LogOut } from "lucide-react";
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
        <nav className="fixed top-0 w-full z-[1000] h-16 flex items-center backdrop-blur-md" style={{
            background: 'rgba(11, 18, 32, 0.85)',
            borderBottom: '1px solid var(--color-border)'
        }}>
            <div className="container mx-auto px-6 flex justify-between items-center w-full max-w-7xl">
                <Link href="/" className="flex items-center gap-3 group">
                    <Image
                        src="/assets/logo.png"
                        alt="Godzilla Coder"
                        width={28}
                        height={28}
                        className="w-7 h-7"
                    />
                    <span className="font-semibold text-sm tracking-tight" style={{ color: 'var(--color-text)' }}>
                        Godzilla Coder
                    </span>
                </Link>

                <div className="hidden md:flex gap-8 items-center">
                    <Link href="#capabilities" className="text-sm transition-colors" style={{ color: 'var(--color-muted)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
                    >
                        Features
                    </Link>
                    <Link href="#pricing" className="text-sm transition-colors" style={{ color: 'var(--color-muted)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
                    >
                        Pricing
                    </Link>
                    <Link href="#" className="text-sm transition-colors" style={{ color: 'var(--color-muted)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
                    >
                        AI Models
                    </Link>
                    <Link href="#" className="text-sm transition-colors" style={{ color: 'var(--color-muted)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
                    >
                        Resources
                    </Link>

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
            </div>
        </nav>
    );
}
