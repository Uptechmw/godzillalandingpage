"use client";

import { motion } from "framer-motion";
import { Zap, Triangle, Search, Code2, Sparkles, Layout, Database, Terminal, ArrowRight } from "lucide-react";

const features = [
    {
        title: "Multi-Agent Ensemble",
        description: "Why use one AI when you can use all of them? Godzilla orchestates GPT-4, Claude, and Gemini simultaneously for maximum reasoning density.",
        icon: Sparkles,
        className: "md:col-span-2 md:row-span-2",
        color: "text-godzilla-accent",
        bg: "bg-godzilla-accent/5",
    },
    {
        title: "Atomic Refactoring",
        description: "Complex architectural changes across your entire project in one click.",
        icon: Code2,
        className: "md:col-span-1",
        color: "text-blue-400",
        bg: "bg-blue-400/5",
    },
    {
        title: "Contextual Memory",
        description: "1M+ token window support via Gemini 1.5 Pro.",
        icon: Database,
        className: "md:col-span-1",
        color: "text-purple-400",
        bg: "bg-purple-400/5",
    },
    {
        title: "Zero Latency",
        description: "Local-first performance with native desktop acceleration.",
        icon: Zap,
        className: "md:col-span-1 md:row-span-2",
        color: "text-amber-400",
        bg: "bg-amber-400/5",
    },
    {
        title: "Pro Terminal",
        description: "Integrated AI terminal that speaks bash and zsh fluently with deep file context.",
        icon: Terminal,
        className: "md:col-span-2",
        color: "text-godzilla-tertiary",
        bg: "bg-godzilla-tertiary/5",
    },
];

export default function Features() {
    return (
        <section id="features" className="py-24 relative overflow-hidden bg-godzilla-bg">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mb-16">
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-godzilla-accent font-black uppercase tracking-[0.3em] text-xs mb-4"
                    >
                        Capabilities
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-white mb-6 leading-none"
                    >
                        BUILT FOR THE <br />
                        <span className="text-godzilla-text-muted">NEXT ERA OF CODE.</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`${feature.className} glass rounded-[2.5rem] p-8 flex flex-col justify-between group relative overflow-hidden transition-all duration-500 hover:border-white/20`}
                        >
                            <div className={`absolute inset-0 ${feature.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-500`}>
                                    <feature.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-3 leading-tight tracking-tight">{feature.title}</h3>
                                <p className="text-godzilla-text-muted font-bold text-sm leading-relaxed max-w-xs transition-colors group-hover:text-white/80">
                                    {feature.description}
                                </p>
                            </div>

                            <div className="relative z-10 flex justify-end">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-500 cursor-pointer hover:bg-white/10 hover:border-white/30">
                                    <ArrowRight className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-godzilla-accent/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-godzilla-tertiary/5 blur-[100px] rounded-full -z-10" />
        </section>
    );
}
