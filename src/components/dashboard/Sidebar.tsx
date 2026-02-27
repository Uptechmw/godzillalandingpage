"use client";

import { motion } from "framer-motion";
import { Coins, History, User, Settings, LogOut, Home } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

const menuItems = [
    { icon: Home, label: "Overview", href: "/dashboard" },
    { icon: Coins, label: "Buy Coins", href: "/dashboard/billing" },
    { icon: History, label: "Mission History", href: "/dashboard/history" },
    { icon: Settings, label: "System Prefs", href: "/dashboard/settings" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    return (
        <div className="w-64 h-screen border-r border-godzilla-border bg-godzilla-surface fixed left-0 top-0 hidden lg:flex flex-col pt-8">
            <div className="px-8 mb-12 flex items-center gap-3 group cursor-pointer" onClick={() => router.push("/")}>
                <div className="relative">
                    <Image
                        src="/assets/logo.png"
                        alt="Godzilla Logo"
                        width={32}
                        height={32}
                        className="w-8 h-8 group-hover:rotate-12 transition-transform"
                    />
                    <div className="absolute inset-0 bg-godzilla-accent/20 blur-lg rounded-full" />
                </div>
                <span className="font-black text-white uppercase text-xl mt-1 tracking-tighter">Godzilla</span>
            </div>

            <nav className="flex-1 px-4">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl mb-2 transition-all group ${isActive
                                ? "bg-godzilla-accent text-black font-black shadow-[0_10px_20px_rgba(0,255,148,0.2)]"
                                : "text-godzilla-text-muted hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? "text-black" : "text-godzilla-text-muted group-hover:text-godzilla-accent"}`} />
                            <span className="font-bold text-sm uppercase tracking-tight">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-godzilla-border">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-5 py-4 text-godzilla-text-muted hover:text-white hover:bg-red-500/10 hover:text-red-400 rounded-2xl transition-all font-black text-xs uppercase tracking-widest"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Terminate Session</span>
                </button>
            </div>
        </div>
    );
}
