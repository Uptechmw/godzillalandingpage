"use client";

import { motion } from "framer-motion";
import { Download, CreditCard, Users } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative py-32 px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600/10 via-transparent to-transparent" />

      <div className="relative max-w-6xl mx-auto">
        {/* Emotional Hook */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">
            <span className="text-white">Stop Choosing.</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Start Building.
            </span>
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6 text-xl text-gray-300 leading-relaxed">
            <p>
              You're not looking for another AI chatbot.
            </p>
            <p>
              You're looking for a coding partner that thinks like your entire team.
            </p>
            <p>
              One that doesn't force you to choose between ChatGPT's reasoning,
              Claude's code quality, or Gemini's speed.
            </p>
            <p className="text-2xl font-semibold text-white">
              One that orchestrates them all—automatically.
            </p>
            <p className="text-3xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              That's Godzilla Coder.
            </p>
          </div>
        </motion.div>

        {/* CTA Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {/* Download CTA */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-purple-500/50">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-4">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Download</h3>
              <p className="text-gray-400 mb-6">
                Get started with Godzilla Coder today. Free 20 tokens included.
              </p>
              <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:-translate-y-1">
                Download for macOS
              </button>
              <div className="mt-4 space-y-1 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Free 20 tokens included</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>5-minute setup</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500">
                <p>macOS (Intel & Apple Silicon)</p>
                <p className="text-gray-600">Windows & Linux coming soon</p>
              </div>
            </div>
          </div>

          {/* Buy Tokens CTA */}
          <div className="relative group">
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Get Tokens</h3>
              <p className="text-gray-400 mb-6">
                Already have Godzilla? Top up your tokens and keep coding.
              </p>
              <button className="w-full py-4 bg-transparent border-2 border-purple-500/50 rounded-xl font-semibold hover:bg-purple-500/10 transition-all duration-300">
                Buy Token Pack →
              </button>
              <div className="mt-6 space-y-2 text-sm text-gray-400">
                <a href="#" className="block hover:text-purple-400 transition-colors">
                  → View pricing
                </a>
                <a href="#" className="block hover:text-purple-400 transition-colors">
                  → Token calculator
                </a>
                <a href="#" className="block hover:text-purple-400 transition-colors">
                  → Usage dashboard
                </a>
              </div>
            </div>
          </div>

          {/* Beta Access CTA */}
          <div className="relative group">
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-yellow-600 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Join Beta</h3>
              <p className="text-gray-400 mb-6">
                Want early access to new features? Join our private beta program.
              </p>
              <button className="w-full py-4 bg-transparent border border-gray-600 rounded-xl font-semibold hover:border-gray-500 hover:bg-gray-700/30 transition-all duration-300">
                Request Beta Access
              </button>
              <div className="mt-6 space-y-1 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Early feature access</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Direct feedback channel</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Bonus tokens</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Shape the roadmap</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8 text-sm text-gray-400"
        >
          <div className="flex items-center gap-2">
            <span className="text-green-400">🔒</span>
            <span>Secure local storage</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-400">💳</span>
            <span>No credit card for trial</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400">⚡</span>
            <span>Instant download</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-400">🔄</span>
            <span>30-day money-back guarantee</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
