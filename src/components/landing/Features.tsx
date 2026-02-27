"use client";

import { motion } from "framer-motion";
import { Zap, Triangle, Search } from "lucide-react";

const features = [
    {
        title: "GPT-4o Intelligence",
        description: "Leverage the state-of-the-art reasoning of OpenAI's latest model for complex refactoring and logic.",
        icon: Zap,
        color: "hover:border-[#10a37f]",
        accent: "text-[#10a37f]",
    },
    {
        title: "Claude Code Agent",
        description: "Anthropic's most capable model, optimized for long-context understanding and agentic workflows.",
        icon: Triangle,
        color: "hover:border-[#d4a27a]",
        accent: "text-[#d4a27a]",
    },
    {
        title: "Gemini 1.5 Infinity",
        description: "Massive context window support. Analyze entire codebases in a single breath with Google's most powerful AI.",
        icon: Search,
        color: "hover:border-godzilla-tertiary",
        accent: "text-godzilla-tertiary",
    },
];

export default function Features() {
    return (
        <section id="features" className="py-24 bg-godzilla-bg relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black mb-6"
                    >
                        Unleash the Beast
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-godzilla-text-muted max-w-2xl mx-auto text-lg"
                    >
                        Godzilla Coder combines the reliability of VS Code with the raw power of
                        advanced AI agents. No configuration, just pure productivity.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ translateY: -10 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`bg-godzilla-surface p-10 rounded-2xl border border-godzilla-border ${feature.color} transition-all duration-300 group`}
                        >
                            <div className={`mb-6 ${feature.accent}`}>
                                <feature.icon className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-godzilla-text-muted leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
