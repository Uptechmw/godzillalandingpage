"use client";

import { motion } from "framer-motion";
import { Coins, History, User, Settings, LogOut, Home } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

const menuItems = [
    { icon: Home, label: "Overview", href: "/dashboard" },
    { icon: Coins, label: "Buy Coins", href: "/dashboard/buy" },
    { icon: History, label: "Transaction History", href: "/dashboard/transactions" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    return (
        <div className="w-64 h-screen fixed left-0 top-0 hidden lg:flex flex-col pt-8" style={{
            background: 'var(--color-surface)',
            borderRight: '1px solid var(--color-border)'
        }}>
            <div className="px-6 mb-10 flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
                <Image
                    src="/assets/logo.png"
                    alt="Godzilla Coder"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                />
                <span className="font-bold text-base" style={{ color: 'var(--color-text)' }}>Godzilla Coder</span>
            </div>

            <nav className="flex-1 px-4">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all text-sm font-medium"
                            style={{
                                background: isActive ? 'rgba(37,99,235,0.12)' : 'transparent',
                                color: isActive ? 'var(--color-accent)' : 'var(--color-muted)',
                                borderLeft: isActive ? '2px solid var(--color-accent)' : '2px solid transparent',
                            }}
                            onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = 'var(--color-text)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; } }}
                            onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = 'var(--color-muted)'; e.currentTarget.style.background = 'transparent'; } }}
                        >
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4" style={{ borderTop: '1px solid var(--color-border)' }}>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm"
                    style={{ color: 'var(--color-muted)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-danger)'; e.currentTarget.style.background = 'rgba(220,38,38,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-muted)'; e.currentTarget.style.background = 'transparent'; }}
                >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );
}
