"use client";

import { motion } from "framer-motion";
import { Download, Play } from "lucide-react";

export default function HeroNew() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-32 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="text-sm font-medium text-purple-300">500 developers in private beta</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl lg:text-7xl font-black tracking-tight mb-6"
            >
              <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Code with every AI.
              </span>
              <br />
              <span className="text-white">Ship with one editor.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-300 mb-10 max-w-2xl"
            >
              Godzilla Coder brings ChatGPT-4, Claude Sonnet, and Gemini Pro into a single native desktop editor. 
              Multi-agent orchestration, deep codebase understanding, and transparent token pricing.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:-translate-y-1">
                <Download className="inline-block w-5 h-5 mr-2" />
                Download for macOS
                <div className="absolute -bottom-8 left-0 right-0 text-sm text-gray-400 font-normal">
                  Free 20 tokens • No credit card
                </div>
              </button>
              
              <button className="group px-8 py-4 bg-transparent border-2 border-purple-500/30 rounded-xl font-semibold text-lg hover:border-purple-500/60 hover:bg-purple-500/10 transition-all duration-300">
                <Play className="inline-block w-5 h-5 mr-2" />
                See it in action
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            {/* Editor Preview Mockup */}
            <div className="relative">
              {/* Floating AI Model Badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-8 -left-8 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg backdrop-blur-sm"
              >
                <span className="text-sm font-semibold text-green-300">ChatGPT-4</span>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute -top-4 right-12 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-lg backdrop-blur-sm"
              >
                <span className="text-sm font-semibold text-orange-300">Claude Sonnet</span>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                className="absolute top-8 -right-8 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg backdrop-blur-sm"
              >
                <span className="text-sm font-semibold text-blue-300">Gemini Pro</span>
              </motion.div>

              {/* Main Editor Window */}
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
                {/* Window Controls */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-gray-700">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center text-sm text-gray-400">Godzilla Coder</div>
                </div>
                
                {/* Code Content */}
                <div className="p-6 font-mono text-sm">
                  <div className="space-y-2">
                    <div className="text-purple-400">// Multi-AI orchestration in action</div>
                    <div className="text-gray-300">
                      <span className="text-blue-400">const</span> result = <span className="text-yellow-400">await</span> godzilla.orchestrate({'{'}
                    </div>
                    <div className="text-gray-300 pl-4">
                      models: [<span className="text-green-400">'gpt-4'</span>, <span className="text-orange-400">'claude'</span>, <span className="text-cyan-400">'gemini'</span>],
                    </div>
                    <div className="text-gray-300 pl-4">
                      task: <span className="text-green-400">'refactor'</span>
                    </div>
                    <div className="text-gray-300">{'}'});</div>
                  </div>
                </div>
              </div>

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
                <motion.line
                  x1="10%" y1="20%" x2="50%" y2="50%"
                  stroke="url(#gradient1)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-24 flex flex-wrap justify-center gap-8 text-sm text-gray-400"
        >
          <div className="flex items-center gap-2">
            <span className="text-green-400">🔒</span>
            <span>Secure local storage</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-400">⚡</span>
            <span>Native performance</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400">💎</span>
            <span>Premium quality</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
