"use client";

import { motion } from "framer-motion";
import { FolderGit2, Network, TerminalSquare, MonitorPlay } from "lucide-react";

const capabilities = [
  {
    icon: FolderGit2,
    title: "Local Context & File System Access",
    description: "Godzilla executes locally. Agents read your actual filesystem, analyze deep directory structures, and execute terminal commands without pasting context into a web browser.",
  },
  {
    icon: Network,
    title: "Multi-Model Orchestration",
    description: "Route complex reasoning to Claude 3.5 Sonnet and fast autocomplete to Gemini. Don't compromise on your stack by being locked into one vendor.",
  },
  {
    icon: TerminalSquare,
    title: "Autonomous Agents",
    description: "Assign tasks, not just prompts. Background agents can refactor entire modules, run tests, and iteratively fix their own errors while you focus on architecture.",
  },
  {
    icon: MonitorPlay,
    title: "Native Desktop Performance",
    description: "Built for speed. Keyboard-first navigation, low-latency UI, and strict resource management. No electron bloat.",
  },
];

export default function ValueProposition() {
  return (
    <section className="relative py-32 lg:py-40 px-6 lg:px-8 bg-[#0A0A0A] border-t border-[#2A2A2A]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold mb-6 text-white tracking-tight">
            Core Capabilities
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
            Four fundamental pillars that distinguish Godzilla Coder from standard web chats.
            Engineered exclusively for local execution and advanced reasoning.
          </p>
        </div>

        {/* Feature Grid - 2x2 */}
        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group p-10 bg-[#121212] border border-[#2A2A2A] rounded-xl flex flex-col items-start gap-6 hover:border-[#444444] transition-colors"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center border border-[#2A2A2A] bg-[#0A0A0A] rounded-lg">
                <capability.icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-medium mb-3 text-white tracking-tight">
                  {capability.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {capability.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
