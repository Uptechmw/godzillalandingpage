"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { LogIn, LayoutDashboard, LogOut } from "lucide-react";
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
        <nav className="fixed top-0 w-full z-[1000] bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#2A2A2A] h-16 flex items-center">
            <div className="container mx-auto px-6 flex justify-between items-center w-full max-w-7xl">
                <Link href="/" className="flex items-center gap-3 group">
                    <Image
                        src="/assets/logo.png"
                        alt="Godzilla Coder"
                        width={28}
                        height={28}
                        className="w-7 h-7 grayscale opacity-90 group-hover:grayscale-0 transition-all duration-300"
                    />
                    <span className="font-semibold text-sm text-white tracking-tight">
                        Godzilla Coder
                    </span>
                </Link>

                <div className="hidden md:flex gap-8 items-center">
                    <Link href="#capabilities" className="text-gray-400 hover:text-white text-sm transition-colors">
                        Capabilities
                    </Link>
                    <Link href="#pricing" className="text-gray-400 hover:text-white text-sm transition-colors">
                        Pricing
                    </Link>

                    <div className="h-4 w-px bg-white/10 mx-2" />

                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard">
                                <button className="flex items-center gap-2 text-white px-4 py-2 hover:bg-white/5 rounded-md text-sm transition-all border border-transparent hover:border-[#2A2A2A]">
                                    <LayoutDashboard className="w-4 h-4 text-gray-400" />
                                    Dashboard
                                </button>
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 rounded-md text-sm transition-all"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/auth/login" className="text-gray-400 hover:text-white px-4 py-2 text-sm transition-colors flex items-center gap-2">
                                Sign In
                            </Link>
                            <Link href="/auth/signup">
                                <button className="bg-white text-black px-4 py-2 rounded-md font-medium text-sm hover:bg-gray-200 transition-all">
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
