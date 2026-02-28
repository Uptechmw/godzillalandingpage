"use client";

import { motion } from "framer-motion";
import { Download, Monitor, Command, Server, ArrowRight } from "lucide-react";

export default function HeroNew() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0A0A0A]">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2A2A2A] bg-[#121212] mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-white opacity-80" />
            <span className="text-xs font-mono text-gray-400">v1.2.0 Desktop Release</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl lg:text-[72px] font-semibold tracking-[-0.02em] leading-[1.1] mb-6 max-w-4xl text-white"
          >
            The AI development environment for serious engineering.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-400 mb-12 max-w-2xl leading-relaxed"
          >
            A desktop-native code editor with multi-agent orchestration. Bring Claude, GPT, and Gemini directly to your local file system. Token-based pricing. Zero lock-in.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center gap-4 w-full"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors border border-transparent">
                <Download className="w-4 h-4" />
                Download for macOS
              </button>

              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent border border-[#2A2A2A] text-white rounded-lg font-medium hover:bg-[#121212] transition-colors group">
                View Documentation
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
              </button>
            </div>

            <div className="flex items-center gap-6 mt-4 text-sm text-gray-500 font-mono">
              <a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Command className="w-3.5 h-3.5" /> macOS (Apple Silicon & Intel)</a>
              <span className="w-1 h-1 rounded-full bg-[#2A2A2A]" />
              <a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Monitor className="w-3.5 h-3.5" /> Windows (.exe)</a>
              <span className="w-1 h-1 rounded-full bg-[#2A2A2A]" />
              <a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Server className="w-3.5 h-3.5" /> Linux (.AppImage)</a>
            </div>
          </motion.div>
        </div>

        {/* Product Screenshot Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-24 relative max-w-5xl mx-auto"
        >
          <div className="relative rounded-lg overflow-hidden border border-[#2A2A2A] bg-[#0A0A0A] shadow-2xl">
            {/* Window Chrome */}
            <div className="flex items-center px-4 py-3 bg-[#121212] border-b border-[#2A2A2A]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#2A2A2A]"></div>
                <div className="w-3 h-3 rounded-full bg-[#2A2A2A]"></div>
                <div className="w-3 h-3 rounded-full bg-[#2A2A2A]"></div>
              </div>
              <div className="mx-auto flex gap-6 text-xs font-mono text-gray-500">
                <span className="text-gray-300">src/agents/orchestrator.ts</span>
                <span>lib/models.ts</span>
                <span>test/agent.test.ts</span>
              </div>
            </div>
            {/* Editor Area */}
            <div className="flex">
              {/* Sidebar */}
              <div className="hidden sm:block w-64 border-r border-[#2A2A2A] bg-[#0A0A0A] p-4 font-mono text-xs text-gray-500">
                <div className="mb-4 text-gray-400 font-medium tracking-wide text-[10px] uppercase">Explorer</div>
                <div className="space-y-2">
                  <div className="text-gray-300">📁 src</div>
                  <div className="pl-4">📁 agents</div>
                  <div className="pl-8 text-white">📄 orchestrator.ts</div>
                  <div className="pl-8">📄 execute.ts</div>
                  <div className="pl-4">📁 lib</div>
                  <div className="pl-4">📁 ui</div>
                  <div className="mt-4 text-gray-300">📁 test</div>
                  <div className="text-gray-300">📄 package.json</div>
                </div>
              </div>
              {/* Main Workspace */}
              <div className="flex-1 p-6 font-mono text-[13px] leading-relaxed overflow-hidden">
                <div className="text-gray-500 mb-4">/* Godzilla Coder: Agent Orchestration Engine */</div>
                <div className="text-blue-400">import</div> <div className="inline text-white">{'{'} Route, AgentContext {'}'}</div> <div className="inline text-blue-400">from</div> <div className="inline text-green-400">'@/lib/types'</div>;
                <br /><br />
                <div className="text-purple-400">export async function</div> <div className="inline text-yellow-200">routeTask</div><div className="inline text-white">(context: AgentContext): Promise&lt;Route&gt; {'{'}</div>
                <div className="pl-4 mt-2">
                  <div className="text-gray-500">// Fallback to local deterministic rules for routing.</div>
                  <div className="text-purple-400">const</div> <div className="inline text-white">complexity = await <span className="text-yellow-200">analyzeComplexity</span>(context.prompt);</div>
                  <br /><br />
                  <div className="text-purple-400">if</div> <div className="inline text-white">(complexity &gt; <span className="text-orange-300">0.8</span>) {'{'}</div>
                  <div className="pl-4 mt-1">
                    <div className="text-purple-400">return</div> <div className="inline text-white">models.ClaudeSonnet35; <span className="text-gray-500">// Best for deep reasoning</span></div>
                  </div>
                  <div className="text-white mt-1">{'}'}</div>
                  <br />
                  <div className="text-purple-400">return</div> <div className="inline text-white">models.GPT4oMini; <span className="text-gray-500">// Default fast path</span></div>
                </div>
                <div className="text-white mt-2">{'}'}</div>
                <br /><br />
                <div className="flex items-center gap-2 mt-8 pt-4 border-t border-[#2A2A2A]">
                  <div className="text-blue-400 font-bold">~</div> <div className="text-white">npm run test:agents</div>
                </div>
                <div className="text-gray-400 mt-2">[✓] Passing: 42/42</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
