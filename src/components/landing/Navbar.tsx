"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-[1000] bg-godzilla-bg/80 backdrop-blur-xl border-b border-godzilla-border h-20 flex items-center">
            <div className="container mx-auto px-6 flex justify-between items-center w-full">
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/assets/logo.png"
                        alt="Godzilla Coder Logo"
                        width={40}
                        height={40}
                        className="w-10 h-10"
                    />
                    <span className="font-black text-xl text-white uppercase tracking-tight">
                        Godzilla Coder
                    </span>
                </Link>

                <div className="hidden md:flex gap-8 items-center">
                    <Link href="#features" className="text-godzilla-text-muted hover:text-godzilla-accent text-sm font-medium transition-colors">
                        Features
                    </Link>
                    <Link href="#agents" className="text-godzilla-text-muted hover:text-godzilla-accent text-sm font-medium transition-colors">
                        AI Agents
                    </Link>
                    <Link href="#billing" className="text-godzilla-text-muted hover:text-godzilla-accent text-sm font-medium transition-colors">
                        Coins
                    </Link>
                    <Link href="https://github.com/microsoft/vscode" target="_blank" className="text-godzilla-text-muted hover:text-godzilla-accent text-sm font-medium transition-colors">
                        OSS
                    </Link>
                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.05, translateY: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-godzilla-accent text-black px-6 py-3 rounded-lg font-bold text-sm shadow-[0_0_20px_rgba(0,255,148,0.4)] hover:shadow-[0_0_30px_rgba(0,255,148,0.6)] transition-all"
                    >
                        Download Beta
                    </motion.a>
                </div>
            </div>
        </nav>
    );
}
