"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const tokenPacks = [
  {
    name: "Starter",
    tokens: 100,
    price: 10,
    description: "Trial tokens. No expiration.",
    features: [
      "Access to all models",
      "Full local fs execution",
      "Standard support",
    ],
    cta: "Purchase $10",
  },
  {
    name: "Developer",
    tokens: 1000,
    price: 100,
    description: "Standard pack for daily use.",
    features: [
      "Access to all models",
      "Full local fs execution",
      "Priority API routing",
    ],
    cta: "Purchase $100",
  },
  {
    name: "Bring Your Own Key",
    tokens: "Unlimited",
    price: 15,
    interval: "/month",
    description: "Platform fee. Use your own API keys.",
    features: [
      "Zero markup on tokens",
      "Direct API connections",
      "Team analytics",
    ],
    cta: "Subscribe $15/mo",
  },
];

export default function PricingNew() {
  return (
    <section className="relative py-32 lg:py-40 px-6 lg:px-8 bg-[#0A0A0A] border-t border-[#2A2A2A]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-white tracking-tight">
            Transparent Pricing
          </h2>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            Developers respect spreadsheets, not marketing tactics. Pay for what you use or bring your own API keys. No hidden fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {tokenPacks.map((pack, index) => (
            <motion.div
              key={pack.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative p-8 rounded-xl bg-[#121212] border border-[#2A2A2A] flex flex-col hover:border-[#444444] transition-colors"
            >
              <div className="mb-8">
                <h3 className="text-lg font-medium text-white mb-2">{pack.name}</h3>
                <p className="text-sm text-gray-500">{pack.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-semibold text-white tracking-tight">${pack.price}</span>
                  {pack.interval && <span className="text-gray-500">{pack.interval}</span>}
                </div>
                <div className="mt-2 text-sm text-gray-400">
                  {typeof pack.tokens === "number" ? `${pack.tokens.toLocaleString()} tokens` : pack.tokens}
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {pack.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-gray-400">
                    <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5 opacity-50" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 px-4 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors border border-transparent">
                {pack.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* How pricing works explainer */}
        <div className="max-w-3xl border-t border-[#2A2A2A] pt-12">
          <h3 className="text-lg font-medium text-white mb-6">How pricing works</h3>
          <div className="grid sm:grid-cols-2 gap-8 text-sm">
            <div>
              <h4 className="font-medium text-gray-300 mb-2">Token Math</h4>
              <p className="text-gray-500 leading-relaxed">
                We count tokens exactly as the underlying providers do. GPT-4o queries cost 2x standard tokens, Sonnet costs 1.5x, and Gemini Pro costs 1x.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-300 mb-2">BYOK Architecture</h4>
              <p className="text-gray-500 leading-relaxed">
                If you subscribe to the BYOK tier, requests are routed directly from your desktop to the LLM providers. Godzilla servers never see your code.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
