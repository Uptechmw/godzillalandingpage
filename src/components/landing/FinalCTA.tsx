"use client";

import { motion } from "framer-motion";
import { Download, Monitor, Command, Server } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative py-32 lg:py-48 px-6 lg:px-8 overflow-hidden" style={{ background: 'var(--color-primary)', borderTop: '1px solid var(--color-border)' }}>
      {/* Dot grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(37,99,235,0.06) 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }} />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl lg:text-[56px] font-bold tracking-tight leading-tight mb-8" style={{ color: 'var(--color-text)' }}>
            Ready to get started?
          </h2>

          <p className="text-lg mb-12 max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            Download Godzilla Coder and experience multi-agent AI coding on your own machine.
          </p>

          <div className="flex flex-col items-center gap-6">
            <button
              className="flex items-center justify-center gap-2 px-8 py-4 font-semibold text-lg rounded-lg w-full sm:w-auto transition-all"
              style={{ background: 'var(--color-accent)', color: '#fff' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <Download className="w-5 h-5" />
              Download for macOS
            </button>

            <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-mono" style={{ color: 'var(--color-text-faint)' }}>
              <button className="flex items-center gap-2 hover:text-white transition-colors">
                <Command className="w-4 h-4" /> macOS (Apple Silicon & Intel)
              </button>
              <span className="w-1 h-1 rounded-full" style={{ background: 'var(--color-border)' }} />
              <button className="flex items-center gap-2 hover:text-white transition-colors">
                <Monitor className="w-4 h-4" /> Windows (.exe)
              </button>
              <span className="w-1 h-1 rounded-full" style={{ background: 'var(--color-border)' }} />
              <button className="flex items-center gap-2 hover:text-white transition-colors">
                <Server className="w-4 h-4" /> Linux (.AppImage)
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
