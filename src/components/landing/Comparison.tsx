"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";

export default function Comparison() {
  return (
    <section className="relative py-32 lg:py-40 px-6 lg:px-8 bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-white tracking-tight">
            Architectural Differences
          </h2>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            A technical breakdown of how Godzilla Coder compares to web-based chat interfaces and standard single-model IDE extensions.
          </p>
        </div>

        {/* Minimalist Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto"
        >
          <div className="border border-[#2A2A2A] rounded-lg bg-[#0A0A0A] overflow-hidden">
            <table className="min-w-full divide-y divide-[#2A2A2A] text-sm">
              <thead>
                <tr className="bg-[#121212]">
                  <th className="px-6 py-5 text-left font-medium text-gray-300 w-1/3">Capability</th>
                  <th className="px-6 py-5 text-left font-medium text-white w-1/4">Godzilla Coder</th>
                  <th className="px-6 py-5 text-left font-medium text-gray-500 w-1/4">Single-Model IDE</th>
                  <th className="px-6 py-5 text-left font-medium text-gray-500 w-1/4">Web Chat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A1A]">
                {[
                  { name: "Execution Environment", godzilla: "Local Desktop", ide: "Local/Cloud", chat: "Cloud Only" },
                  { name: "Model Architecture", godzilla: "Multi-Model Ensemble", ide: "Single Vendor", chat: "Single Vendor" },
                  { name: "File System Context", godzilla: "Native Access", ide: "Native Access", chat: "Manual Upload" },
                  { name: "Terminal Integration", godzilla: "Read/Write/Execute", ide: "Read Only", chat: "None" },
                  { name: "Autonomous Agents", godzilla: "Yes", ide: "No", chat: "No" },
                  { name: "Pricing Model", godzilla: "Token-Based / BYOK", ide: "Subscription", chat: "Subscription" },
                ].map((row) => (
                  <tr key={row.name} className="hover:bg-[#121212] transition-colors">
                    <td className="px-6 py-4 text-gray-300 font-mono text-xs">{row.name}</td>
                    <td className="px-6 py-4 text-white">
                      {row.godzilla === "Yes" ? <Check className="w-4 h-4 text-gray-300" /> : row.godzilla}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {row.ide === "No" ? <Minus className="w-4 h-4 text-gray-600" /> : row.ide}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {row.chat === "No" ? <Minus className="w-4 h-4 text-gray-600" /> : row.chat}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
