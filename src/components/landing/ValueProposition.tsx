"use client";

import { motion } from "framer-motion";
import { FolderGit2, Network, TerminalSquare, MonitorPlay } from "lucide-react";

const features = [
  {
    icon: FolderGit2,
    title: "AI Code Completion",
    description: "AI code completion reuses your codebase context. Works across files and provides accurate, relevant suggestions based on your actual code.",
  },
  {
    icon: Network,
    title: "Advanced Debugging",
    description: "From Godzilla's deep code understanding, debug complex issues and find solutions intelligently with multi-model reasoning.",
  },
  {
    icon: TerminalSquare,
    title: "Ask Anything",
    description: "Experience seamless answers across all your development challenges — from architecture decisions to code refactoring.",
  },
  {
    icon: MonitorPlay,
    title: "Native Desktop Performance",
    description: "Built for speed. Keyboard-first navigation, low-latency UI, and strict resource management. No browser limitations.",
  },
];

export default function ValueProposition() {
  return (
    <section className="relative py-24 lg:py-32 px-6 lg:px-8" style={{ background: 'var(--color-primary)', borderTop: '1px solid var(--color-border)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 tracking-tight" style={{ color: 'var(--color-text)' }}>
            Upgrade Your Coding Game
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            Four fundamental capabilities that distinguish Godzilla from standard tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 rounded-xl group transition-all"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-lg mb-4" style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)' }}>
                <feature.icon className="w-5 h-5" style={{ color: 'var(--color-accent)' }} strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {feature.description}
              </p>
            </motion.div>
          ))}

          {/* AI Input Demo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="md:col-span-2 lg:col-span-3 p-4 rounded-xl flex items-center gap-3"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
          >
            <div className="w-5 h-5 flex items-center justify-center" style={{ color: 'var(--color-muted)' }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </div>
            <span className="text-sm" style={{ color: 'var(--color-text-faint)' }}>Generate a secure authentication system for Next.js...</span>
            <div className="ml-auto w-7 h-7 flex items-center justify-center rounded-md" style={{ background: 'var(--color-accent)' }}>
              <svg width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
