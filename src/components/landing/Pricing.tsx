"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Zap, Flame, Crown } from "lucide-react";

const tiers = [
    {
        name: "Starter Pack",
        price: "$9",
        coins: "1,000",
        description: "Perfect for students and hobbyists getting started with AI.",
        features: ["GPT-4o Access", "Standard Completions", "Community Support", "Basic Debugging"],
        icon: Zap,
        color: "text-blue-400",
        btnClass: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
    },
    {
        name: "Atomic Power",
        price: "$29",
        coins: "5,000",
        description: "The sweet spot for professional developers and freelancers.",
        features: ["Everything in Starter", "Claude 3.5 Sonnet", "Gemini 1.5 Pro Support", "Priority Processing", "Multi-Agent Ensemble"],
        icon: Flame,
        color: "text-godzilla-accent",
        btnClass: "bg-godzilla-accent text-black shadow-[0_10px_30px_rgba(0,255,148,0.3)]",
        popular: true,
    },
    {
        name: "Godzilla Ultra",
        price: "$99",
        coins: "20,000",
        description: "Massive scale for teams and heavy users building deep tech.",
        features: ["Everything in Power", "Unlimited Gemini Context", "Custom Tool Integrations", "Dedicated Support", "Early Beta Access"],
        icon: Crown,
        color: "text-purple-400",
        btnClass: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 relative bg-godzilla-bg">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-white mb-6"
                    >
                        CHOOSE YOUR <span className="text-godzilla-accent">BREATH.</span>
                    </motion.h2>
                    <p className="text-godzilla-text-muted max-w-xl mx-auto font-bold">
                        Simple, transparent pricing. Purchase Godzilla Coins once and use them across
                        all AI models with zero subscriptions required.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative glass rounded-[2.5rem] p-10 flex flex-col h-full border ${tier.popular ? "border-godzilla-accent/30" : "border-white/5"}`}
                        >
                            {tier.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-godzilla-accent text-black px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 ${tier.color}`}>
                                    <tier.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-1 tracking-tight">{tier.name}</h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-4xl font-black text-white">{tier.price}</span>
                                    <span className="text-godzilla-text-muted font-bold">/ one-time</span>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 mb-6">
                                    <p className="text-godzilla-accent font-black text-xl">{tier.coins} Coins</p>
                                    <p className="text-[10px] text-godzilla-text-muted uppercase font-black tracking-widest mt-1">Starting balance</p>
                                </div>
                                <p className="text-godzilla-text-muted text-sm font-bold leading-relaxed">{tier.description}</p>
                            </div>

                            <ul className="space-y-4 mb-10 flex-grow">
                                {tier.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-start gap-3 text-sm font-bold text-white/80">
                                        <Check className="w-5 h-5 text-godzilla-accent mt-0.5 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link href="/auth/login">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full py-5 rounded-2xl font-black text-lg transition-all ${tier.btnClass}`}
                                >
                                    Get Started
                                </motion.button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-godzilla-accent/5 blur-[150px] rounded-full -z-10" />
        </section>
    );
}
