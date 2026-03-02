'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDownloadModal } from '@/hooks/useDownloadModal';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const { openModal } = useDownloadModal();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? 'bg-primary/80 backdrop-blur-md h-[64px] border-b border-border shadow-lg'
            : 'bg-transparent h-[80px]'
            }`}>
            <div className="enterprise-container flex items-center justify-between h-full">
                <div className="flex items-center gap-12">
                    <Link href="/" className="group">
                        <div className="text-[20px] font-display font-black tracking-tighter text-glow-blue uppercase transition-transform group-hover:scale-[0.98]">
                            GODZILLA AI
                        </div>
                    </Link>
                    <div className="hidden lg:flex items-center gap-8">
                        <Link href="#architecture" className="label-micro text-text-muted hover:text-text transition-colors">Architecture</Link>
                        <Link href="#models" className="label-micro text-text-muted hover:text-text transition-colors">Models</Link>
                        <Link href="#security" className="label-micro text-text-muted hover:text-text transition-colors">Security</Link>
                        <Link href="#pricing" className="label-micro text-text-muted hover:text-text transition-colors">Pricing</Link>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <Link href="/auth/login" className="hidden sm:block label-micro text-text-muted hover:text-text transition-colors">Sign In</Link>
                    <button
                        onClick={openModal}
                        className="btn-primary label-micro px-8 !h-[40px]"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
