import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-border/50">
            <div className="enterprise-container flex items-center justify-between h-[80px]">
                <div className="flex items-center gap-12">
                    <div className="text-[22px] font-display font-black tracking-tighter text-glow-blue uppercase">
                        GODZILLA AI
                    </div>
                    <div className="hidden lg:flex items-center gap-8">
                        <Link href="#architecture" className="label-micro text-text-muted hover:text-text transition-colors">Architecture</Link>
                        <Link href="#models" className="label-micro text-text-muted hover:text-text transition-colors">Models</Link>
                        <Link href="#security" className="label-micro text-text-muted hover:text-text transition-colors">Security</Link>
                        <Link href="#pricing" className="label-micro text-text-muted hover:text-text transition-colors">Pricing</Link>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <Link href="/auth/login" className="hidden sm:block label-micro text-text-muted hover:text-text">Sign In</Link>
                    <Link href="/auth/signup" className="btn-primary label-micro px-8">Get Started</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
