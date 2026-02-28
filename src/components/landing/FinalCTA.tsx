"use client";

import { motion } from "framer-motion";
import { Download, Monitor, Command, Server } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative py-32 lg:py-48 px-6 lg:px-8 bg-[#0A0A0A] border-t border-[#2A2A2A] overflow-hidden">
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Minimalist Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl lg:text-[56px] font-semibold tracking-[-0.02em] leading-tight mb-8 text-white">
            Ready to integrate?
          </h2>

          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Download Godzilla Coder and experience deterministic multi-agent orchestration on your own machine.
          </p>

          <div className="flex flex-col items-center gap-6">
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-medium text-lg rounded-lg hover:bg-gray-200 transition-colors w-full sm:w-auto">
              <Download className="w-5 h-5" />
              Download for macOS
            </button>

            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500 font-mono">
              <button className="flex items-center gap-2 hover:text-white transition-colors">
                <Command className="w-4 h-4" /> macOS
              </button>
              <span className="w-1 h-1 rounded-full bg-[#2A2A2A]" />
              <button className="flex items-center gap-2 hover:text-white transition-colors">
                <Monitor className="w-4 h-4" /> Windows
              </button>
              <span className="w-1 h-1 rounded-full bg-[#2A2A2A]" />
              <button className="flex items-center gap-2 hover:text-white transition-colors">
                <Server className="w-4 h-4" /> Linux
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
