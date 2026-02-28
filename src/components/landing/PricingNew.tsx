"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const tokenPacks = [
  {
    name: "Starter Pack",
    tokens: 100,
    price: 10,
    description: "Perfect for trying Godzilla",
    features: [
      "All AI models",
      "Full features",
      "Never expires",
      "Email support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro Pack",
    tokens: 1000,
    price: 80,
    originalPrice: 100,
    savings: "Save 20%",
    description: "Perfect for professional developers",
    features: [
      "All AI models",
      "Priority support",
      "Never expires",
      "Usage analytics",
    ],
    cta: "Most Popular",
    popular: true,
  },
  {
    name: "Team Pack",
    tokens: 10000,
    price: 600,
    originalPrice: 1000,
    savings: "Save 40%",
    description: "Perfect for development teams",
    features: [
      "All AI models",
      "Team dashboard",
      "Usage analytics",
      "Priority support",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingNew() {
  return (
    <section className="relative py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Transparent Pricing.
            </span>{" "}
            <span className="text-white">Zero Surprises.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Buy tokens. Use AI. That's it. No subscriptions. No per-seat fees. 
            No hidden costs. Unused tokens never expire.
          </p>
        </motion.div>

        {/* Why Tokens Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          <div className="p-6 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50">
            <h3 className="text-xl font-bold mb-3 text-white">Pay for What You Use</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p className="line-through">Traditional SaaS: $20/month whether you use it or not</p>
              <p className="text-green-400 font-semibold">Godzilla: $20 = 1,000 tokens. Use 100? Pay for 100.</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50">
            <h3 className="text-xl font-bold mb-3 text-white">Model Flexibility</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Different models, different costs:</p>
              <ul className="space-y-1">
                <li>• GPT-4: 2 tokens per query</li>
                <li>• Claude: 1.5 tokens per query</li>
                <li>• Gemini: 1 token per query</li>
              </ul>
              <p className="text-purple-400 font-semibold">You choose. You control.</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50">
            <h3 className="text-xl font-bold mb-3 text-white">Team Scaling</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Add developers without adding seats:</p>
              <ul className="space-y-1">
                <li>• Share token pool</li>
                <li>• Usage-based billing</li>
                <li>• No per-user fees</li>
                <li>• Scales with actual usage</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Token Packs */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {tokenPacks.map((pack, index) => (
            <motion.div
              key={pack.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Popular Badge */}
              {pack.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="px-4 py-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Card */}
              <div className={`relative h-full p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
                pack.popular
                  ? "bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-2 border-purple-500/50 shadow-xl shadow-purple-500/20"
                  : "bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 hover:border-purple-500/30"
              }`}>
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-white">{pack.name}</h3>
                  <p className="text-sm text-gray-400">{pack.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-black text-white">${pack.price}</span>
                    {pack.originalPrice && (
                      <span className="text-xl text-gray-500 line-through">${pack.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-purple-400">{pack.tokens.toLocaleString()} tokens</span>
                    {pack.savings && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded">
                        {pack.savings}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {pack.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                  pack.popular
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:shadow-purple-500/50 hover:-translate-y-1"
                    : "bg-gray-700/50 hover:bg-gray-700 border border-gray-600"
                }`}>
                  {pack.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Token Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50"
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-white">Calculate Your Usage</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Queries per day
              </label>
              <input
                type="range"
                min="1"
                max="50"
                defaultValue="10"
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-1">
                <span>1</span>
                <span className="font-semibold text-purple-400">10 queries/day</span>
                <span>50</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Primary model
              </label>
              <select className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none">
                <option>GPT-4 (2 tokens/query)</option>
                <option>Claude Sonnet (1.5 tokens/query)</option>
                <option>Gemini Pro (1 token/query)</option>
              </select>
            </div>

            <div className="pt-6 border-t border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Estimated monthly cost:</span>
                <span className="text-3xl font-bold text-white">$24</span>
              </div>
              <div className="text-sm text-gray-500 space-y-1">
                <p>vs. Cursor subscription: $20/month (1 model only)</p>
                <p>vs. Copilot subscription: $10/month (autocomplete only)</p>
              </div>
              <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <p className="text-sm text-purple-300">
                  <strong>But you get:</strong> 3 AI models, agent orchestration, 
                  full codebase context, and no wasted subscription fees.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
