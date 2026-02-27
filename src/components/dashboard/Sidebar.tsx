"use client";

import { motion } from "framer-motion";
import { Coins, History, User, Settings, LogOut, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
    { icon: Home, label: "Overview", href: "/dashboard" },
    { icon: Coins, label: "Buy Coins", href: "/dashboard/billing" },
    { icon: History, label: "History", href: "/dashboard/history" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 h-screen border-r border-godzilla-border bg-godzilla-surface fixed left-0 top-0 flex flex-col pt-8">
            <div className="px-8 mb-10 flex items-center gap-3">
                <div className="w-8 h-8 bg-godzilla-accent rounded-lg flex items-center justify-center font-bold text-black text-sm">G</div>
                <span className="font-black text-white uppercase text-lg">Godzilla</span>
            </div>

            <nav className="flex-1 px-4">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all ${isActive
                                    ? "bg-godzilla-accent text-black font-bold shadow-[0_0_15px_rgba(0,255,148,0.3)]"
                                    : "text-godzilla-text-muted hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-godzilla-border">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all font-medium">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}
