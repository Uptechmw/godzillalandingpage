"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Zap, Shield, Cpu } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Hero() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const x = (clientX - innerWidth / 2) / 25;
            const y = (clientY - innerHeight / 2) / 25;
            setMousePos({ x, y });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-godzilla-bg">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    style={{ y: y1 }}
                    className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-godzilla-accent/10 blur-[120px] rounded-full"
                />
                <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-godzilla-tertiary/5 blur-[100px] rounded-full" />
                <div className="absolute top-[40%] left-[20%] w-[400px] h-[400px] bg-godzilla-secondary/5 blur-[120px] rounded-full" />

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150 pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-godzilla-accent/10 border border-godzilla-accent/20 text-godzilla-accent text-xs font-bold uppercase tracking-widest mb-8"
                    >
                        <Zap className="w-3 h-3 fill-current" />
                        <span>Now with Gemini 1.5 Pro Support</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter text-white"
                    >
                        THE FUTURE OF <br />
                        <span className="gradient-text italic">ATOMIC CODING</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                        className="text-xl md:text-2xl text-godzilla-text-muted max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
                    >
                        Godzilla Coder is the elite AI-first editor that orchestrates
                        multiple AI agents to build entire features in seconds.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                    >
                        <Link href="/auth/login" className="w-full sm:w-auto">
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="group relative bg-godzilla-accent text-black px-10 py-5 rounded-2xl font-black text-xl shadow-[0_20px_40px_rgba(0,255,148,0.2)] flex items-center justify-center gap-3 transition-all w-full"
                            >
                                <Download className="w-6 h-6" />
                                Get Tokens Free
                                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.button>
                        </Link>

                        <button className="flex items-center gap-3 text-white/70 font-bold text-lg hover:text-white transition-all group">
                            <span>Watch Demo</span>
                            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-godzilla-accent transition-all">
                                <ArrowRight className="w-5 h-5 text-godzilla-accent group-hover:translate-x-1 transition-transform" />
                            </div>
                        </button>
                    </motion.div>
                </div>

                {/* 3D Tilted Editor Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 100, rotateX: 20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 5 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        perspective: "2000px",
                        rotateY: mousePos.x,
                        rotateX: 5 - mousePos.y,
                    }}
                    className="relative max-w-6xl mx-auto mt-12"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-godzilla-accent/50 to-godzilla-tertiary/50 rounded-2xl blur-2xl opacity-20" />
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
                        {/* Windows Buttons Decor */}
                        <div className="h-10 border-b border-white/5 bg-white/5 flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                            <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
                            <div className="ml-4 h-5 w-48 bg-white/5 rounded-md border border-white/5" />
                        </div>

                        <Image
                            src="/assets/hero.png"
                            alt="Godzilla Coder Interface"
                            width={1400}
                            height={800}
                            className="w-full h-auto opacity-90 brightness-110"
                            priority
                        />

                        {/* Overlays for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-godzilla-bg via-transparent to-transparent opacity-40" />
                    </div>

                    {/* Floating badges around the editor */}
                    <div className="absolute -left-12 top-1/4 hidden lg:block">
                        <FloatingBadge icon={Cpu} text="Multi-Agent Orchestration" color="text-godzilla-accent" />
                    </div>
                    <div className="absolute -right-16 bottom-1/3 hidden lg:block">
                        <FloatingBadge icon={Shield} text="Enterprise Security" color="text-godzilla-tertiary" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function FloatingBadge({ icon: Icon, text, color }: { icon: any, text: string, color: string }) {
    return (
        <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="glass px-6 py-4 rounded-2xl flex items-center gap-4 shadow-2xl"
        >
            <div className={`p-2 rounded-xl bg-white/5 ${color}`}>
                <Icon className="w-6 h-6" />
            </div>
            <span className="font-bold text-white text-sm whitespace-nowrap">{text}</span>
        </motion.div>
    );
}
