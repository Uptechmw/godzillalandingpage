"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";

export default function Comparison() {
  return (
    <section className="relative py-24 lg:py-32 px-6 lg:px-8" style={{ background: 'var(--color-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4 tracking-tight" style={{ color: 'var(--color-text)' }}>
            Architectural Differences
          </h2>
          <p className="max-w-2xl leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            A technical breakdown of how Godzilla Coder compares to web-based chat interfaces and single-model IDE extensions.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto rounded-xl"
          style={{ border: '1px solid var(--color-border)' }}
        >
          <table className="min-w-full divide-y text-sm" style={{ borderColor: 'var(--color-border)' }}>
            <thead>
              <tr style={{ background: 'var(--color-surface)' }}>
                <th className="px-6 py-5 text-left font-medium w-1/3" style={{ color: 'var(--color-muted)' }}>Capability</th>
                <th className="px-6 py-5 text-left font-semibold w-1/4" style={{ color: 'var(--color-accent)' }}>Godzilla Coder</th>
                <th className="px-6 py-5 text-left font-medium w-1/4" style={{ color: 'var(--color-text-faint)' }}>Single-Model IDE</th>
                <th className="px-6 py-5 text-left font-medium w-1/4" style={{ color: 'var(--color-text-faint)' }}>Web Chat</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Execution Environment", godzilla: "Local Desktop", ide: "Local/Cloud", chat: "Cloud Only" },
                { name: "Model Architecture", godzilla: "Multi-Model", ide: "Single Vendor", chat: "Single Vendor" },
                { name: "File System Context", godzilla: "Native Access", ide: "Native Access", chat: "Manual Upload" },
                { name: "Terminal Integration", godzilla: "Read/Write/Execute", ide: "Read Only", chat: "None" },
                { name: "Autonomous Agents", godzilla: "Yes", ide: "No", chat: "No" },
                { name: "Pricing Model", godzilla: "Token-Based / BYOK", ide: "Subscription", chat: "Subscription" },
              ].map((row, i) => (
                <tr key={row.name} style={{ background: i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
                  <td className="px-6 py-4 font-mono text-xs" style={{ color: 'var(--color-muted)' }}>{row.name}</td>
                  <td className="px-6 py-4 font-medium" style={{ color: 'var(--color-text)' }}>
                    {row.godzilla === "Yes" ? <Check className="w-4 h-4" style={{ color: 'var(--color-success)' }} /> : row.godzilla}
                  </td>
                  <td className="px-6 py-4" style={{ color: 'var(--color-text-faint)' }}>
                    {row.ide === "No" ? <Minus className="w-4 h-4" /> : row.ide}
                  </td>
                  <td className="px-6 py-4" style={{ color: 'var(--color-text-faint)' }}>
                    {row.chat === "No" ? <Minus className="w-4 h-4" /> : row.chat}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
