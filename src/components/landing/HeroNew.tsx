"use client";

import { motion } from "framer-motion";
import { Download, Monitor, Command, Server, ArrowRight } from "lucide-react";

export default function HeroNew() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden" style={{ background: 'var(--color-primary)' }}>
      {/* Subtle dot grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(37,99,235,0.08) 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left: Text Content */}
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-8"
              style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-accent)' }} />
              <span className="text-xs font-mono" style={{ color: 'var(--color-muted)' }}>AI Powered · v1.2.0</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-sm font-semibold mb-4"
              style={{ color: 'var(--color-accent)' }}
            >
              Godzilla Coder — AI Powered by AI
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl lg:text-[64px] font-bold tracking-tight leading-[1.1] mb-6"
              style={{ color: 'var(--color-text)' }}
            >
              Supercharge<br />
              Your Coding with{" "}
              <span style={{ color: 'var(--color-accent)' }}>AI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg mb-10 leading-relaxed max-w-lg"
              style={{ color: 'var(--color-muted)' }}
            >
              Godzilla Coder boosts your productivity with AI-powered code editing, multi-agent orchestration, and real local execution.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <button
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold transition-all"
                style={{ background: 'var(--color-accent)', color: '#fff' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Get Started
              </button>
              <button
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold transition-all group"
                style={{ background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-surface)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                View Documentation
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-6 text-sm font-mono"
              style={{ color: 'var(--color-text-faint)' }}
            >
              <a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Command className="w-3.5 h-3.5" /> macOS</a>
              <span className="w-1 h-1 rounded-full" style={{ background: 'var(--color-border)' }} />
              <a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Monitor className="w-3.5 h-3.5" /> Windows</a>
              <span className="w-1 h-1 rounded-full" style={{ background: 'var(--color-border)' }} />
              <a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Server className="w-3.5 h-3.5" /> Linux</a>
            </motion.div>
          </div>

          {/* Right: Editor Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex-1 w-full max-w-2xl"
          >
            <div className="rounded-xl overflow-hidden shadow-2xl" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
              {/* Window Chrome */}
              <div className="flex items-center px-4 py-3" style={{ background: 'var(--color-surface-2)', borderBottom: '1px solid var(--color-border)' }}>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: 'var(--color-border)' }}></div>
                  <div className="w-3 h-3 rounded-full" style={{ background: 'var(--color-border)' }}></div>
                  <div className="w-3 h-3 rounded-full" style={{ background: 'var(--color-border)' }}></div>
                </div>
                <div className="mx-auto flex gap-6 text-xs font-mono" style={{ color: 'var(--color-muted)' }}>
                  <span style={{ color: 'var(--color-text)' }}>src/agents/orchestrator.ts</span>
                  <span>lib/models.ts</span>
                </div>
              </div>
              {/* Editor Area */}
              <div className="flex">
                <div className="hidden sm:block w-48 p-4 font-mono text-xs" style={{ borderRight: '1px solid var(--color-border)', color: 'var(--color-text-faint)' }}>
                  <div className="mb-3 text-xs uppercase tracking-wide" style={{ color: 'var(--color-muted)' }}>Explorer</div>
                  <div className="space-y-1.5">
                    <div style={{ color: 'var(--color-muted)' }}>src</div>
                    <div className="pl-3">agents</div>
                    <div className="pl-6" style={{ color: 'var(--color-text)' }}>orchestrator.ts</div>
                    <div className="pl-6">execute.ts</div>
                    <div className="pl-3">lib</div>
                    <div className="pl-3">ui</div>
                  </div>
                </div>
                <div className="flex-1 p-5 font-mono text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  <div className="mb-3" style={{ color: 'var(--color-text-faint)' }}>/* Agent Orchestration Engine */</div>
                  <div><span style={{ color: 'var(--color-accent)' }}>import</span> <span style={{ color: 'var(--color-text)' }}>{'{ Route, AgentContext }'}</span> <span style={{ color: 'var(--color-accent)' }}>from</span> <span style={{ color: '#86efac' }}>'@/lib/types'</span>;</div>
                  <br />
                  <div><span style={{ color: '#c084fc' }}>export async function</span> <span style={{ color: '#fde68a' }}>routeTask</span>(context: AgentContext) {'{'}</div>
                  <div className="pl-4">
                    <div style={{ color: 'var(--color-text-faint)' }}>// Route based on query complexity</div>
                    <div><span style={{ color: '#c084fc' }}>const</span> complexity = await <span style={{ color: '#fde68a' }}>analyzeComplexity</span>(context.prompt);</div>
                    <br />
                    <div><span style={{ color: '#c084fc' }}>if</span> (complexity {'>'} <span style={{ color: '#fb923c' }}>0.8</span>) {'{'}</div>
                    <div className="pl-4"><span style={{ color: '#c084fc' }}>return</span> models.ClaudeSonnet35;</div>
                    <div>{'}'}</div>
                    <div><span style={{ color: '#c084fc' }}>return</span> models.GPT4oMini;</div>
                  </div>
                  <div>{'}'}</div>
                  <div className="mt-4 pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
                    <div><span style={{ color: 'var(--color-accent)' }}>~</span> npm run test:agents</div>
                    <div style={{ color: '#86efac' }}>[OK] Passing: 42/42</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
