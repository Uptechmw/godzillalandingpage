"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Hero() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (window.innerWidth / 2 - e.pageX) / 50,
                y: (window.innerHeight / 2 - e.pageY) / 50,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section className="relative min-height-[100vh] flex items-center pt-32 pb-20 overflow-hidden">
            {/* Background Glow Blobs */}
            <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-godzilla-accent/20 blur-[100px] rounded-full -z-10" />
            <div className="absolute top-[20%] left-[-200px] w-[600px] h-[600px] bg-godzilla-tertiary/10 blur-[100px] rounded-full -z-10" />

            <div className="container mx-auto px-6 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-8xl font-extrabold mb-6 leading-tight tracking-tight"
                >
                    Code with <span className="gradient-text">Atomic Power</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="text-lg md:text-xl text-godzilla-text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    The world's most advanced AI-first desktop code editor. Built on VS Code,
                    powered by Godzilla AI. Seamless agent collaboration with Zero Latency.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                >
                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-godzilla-accent text-black px-8 py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(0,255,148,0.4)]"
                    >
                        Get Started Free
                    </motion.a>
                    <a href="#" className="flex items-center gap-2 text-white font-semibold hover:text-godzilla-accent transition-colors">
                        View Roadmap <ArrowRight className="w-5 h-5" />
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    style={{
                        perspective: "1000px",
                        rotateX: `${mousePos.y}deg`,
                        rotateY: `${mousePos.x}deg`,
                    }}
                    className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden border border-godzilla-border bg-godzilla-surface shadow-[0_50px_100px_rgba(0,0,0,0.5),0_0_40px_rgba(0,255,148,0.1)] transition-transform duration-100 ease-out"
                >
                    <Image
                        src="/assets/hero.png"
                        alt="Godzilla Coder Editor Preview"
                        width={1200}
                        height={675}
                        className="w-full h-auto block"
                        priority
                    />
                </motion.div>
            </div>
        </section>
    );
}
