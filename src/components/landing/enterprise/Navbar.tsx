import React from 'react';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-border/50">
            <div className="enterprise-container flex items-center justify-between h-[80px]">
                <div className="flex items-center gap-12">
                    <div className="text-[22px] font-display font-black tracking-tighter text-glow-emerald uppercase">
                        GODZILLA AI
                    </div>
                    <div className="hidden lg:flex items-center gap-8">
                        <a href="#architecture" className="label-micro text-text-muted hover:text-text transition-colors">Architecture</a>
                        <a href="#models" className="label-micro text-text-muted hover:text-text transition-colors">Models</a>
                        <a href="#security" className="label-micro text-text-muted hover:text-text transition-colors">Security</a>
                        <a href="#pricing" className="label-micro text-text-muted hover:text-text transition-colors">Pricing</a>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <button className="hidden sm:block label-micro text-text-muted hover:text-text">Sign In</button>
                    <button className="btn-primary label-micro px-8">Download</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
