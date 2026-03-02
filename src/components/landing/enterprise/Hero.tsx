import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Download, ChevronRight, CheckCircle2 } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative overflow-hidden section-hero border-b border-border bg-primary pt-32 pb-24">
            <div className="enterprise-container grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Side: Content */}
                <div className="z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-soft border border-border label-micro text-accent-blue mb-8">
                        <span className="w-1.5 h-1.5 bg-accent-blue rounded-full animate-pulse"></span>
                        Infrastructure Status: Operational
                    </div>

                    <h1 className="h1 text-glow-blue mb-8 leading-[1.1]">
                        The Multi-Model AI Development Platform for Production Systems
                    </h1>

                    <div className="space-y-4 mb-10">
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-accent-blue mt-0.5" />
                            <p className="text-body-lg text-text font-medium">Local execution context with zero-latency repository reasoning.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-accent-blue mt-0.5" />
                            <p className="text-body-lg text-text font-medium">Smart model orchestration across Gemini, Claude, and GPT-4.</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-12">
                        <Link href="/download" className="btn-primary gap-3 px-10 !h-[56px] text-[15px]">
                            <Download className="w-5 h-5" />
                            <span>Download Godzilla</span>
                        </Link>
                        <Link href="/docs" className="btn-secondary gap-2 px-8 !h-[56px] text-[15px]">
                            <span>Read Technical Docs</span>
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="flex items-center gap-6">
                        <span className="label-micro text-text-faint">Hardware Architecture:</span>
                        <div className="flex gap-4 opacity-50 contrast-125">
                            <span className="text-[12px] font-black tracking-widest uppercase">ARM64</span>
                            <span className="text-[12px] font-black tracking-widest uppercase">X86_64</span>
                            <span className="text-[12px] font-black tracking-widest uppercase">UNIX</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Infrastructure Visual */}
                <div className="relative group">
                    <div className="absolute -inset-10 bg-accent-blue/10 blur-[120px] opacity-20 pointer-events-none"></div>
                    <div className="relative border border-border/50 p-2 bg-black/60 backdrop-blur-sm rounded-lg overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.1)]">
                        <img
                            src="/images/enterprise/hero.png"
                            alt="Godzilla AI Production Infrastructure Interface"
                            className="w-full h-auto object-cover border border-border/50 rounded-md"
                        />
                        <div className="absolute bottom-4 left-4 right-4 p-4 border border-border/50 bg-[#070A11]/80 backdrop-blur-md rounded flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-success rounded-full"></div>
                                <span className="label-micro text-text uppercase">Secure Runtime Active</span>
                            </div>
                            <span className="label-micro text-text-faint">v2.4.1-STABLE</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
