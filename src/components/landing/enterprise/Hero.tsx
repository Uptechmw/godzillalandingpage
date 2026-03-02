import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="relative overflow-hidden section-hero border-b border-border">
            <div className="enterprise-container grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Side: Content */}
                <div className="z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-soft border border-border label-micro text-accent-blue mb-8">
                        <span className="w-1.5 h-1.5 bg-accent-blue"></span>
                        System Status: Operational
                    </div>

                    <h1 className="h1 text-glow-blue mb-6">
                        The Multi-Model AI Development Platform for Production Software Engineering
                    </h1>

                    <p className="body-lg text-text-muted mb-8 max-w-content">
                        Godzilla AI is a secure, multi-model AI coding platform designed for serious developers building real-world applications. Local execution, model orchestration, and enterprise-grade infrastructure.
                    </p>

                    <div className="flex flex-wrap gap-4 mb-8">
                        <Link href="/auth/signup" className="btn-primary gap-3 px-8">
                            <span>Get Started</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                        </Link>
                        <Link href="/docs" className="btn-secondary px-8">
                            View Documentation
                        </Link>
                    </div>

                    <div className="flex items-center gap-6">
                        <span className="label-micro text-text-faint">Platform Availability:</span>
                        <div className="flex gap-4 opacity-40 grayscale contrast-125">
                            <span className="text-[13px] font-black tracking-tighter uppercase">macOS</span>
                            <span className="text-[13px] font-black tracking-tighter uppercase">Windows</span>
                            <span className="text-[13px] font-black tracking-tighter uppercase">Linux</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Workstation Visual */}
                <div className="relative group">
                    <div className="absolute -inset-8 bg-accent-blue/5 blur-[100px] opacity-20 pointer-events-none"></div>
                    <div className="relative border border-border p-2 bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl">
                        <img
                            src="/images/enterprise/hero.png"
                            alt="Godzilla AI Production-Grade Multi-Model Development Platform"
                            className="w-full h-auto object-cover border border-border rounded-md"
                        />
                    </div>
                </div>
            </div>

            {/* Background Architectural Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-surface/40 -skew-x-12 transform origin-top pointer-events-none -z-10 border-l border-border/50"></div>
        </section>
    );
};

export default Hero;
