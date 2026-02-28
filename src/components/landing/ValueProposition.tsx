"use client";

import { motion } from "framer-motion";
import { Network, Layers, Search, Coins, Zap } from "lucide-react";

const features = [
  {
    icon: Network,
    title: "Every AI Model. One Conversation.",
    description: "Switch between ChatGPT-4, Claude Sonnet, and Gemini Pro mid-conversation. Or let our orchestration layer route your query to the best model automatically. No context switching. No separate subscriptions.",
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Layers,
    title: "Multi-Agent Workflows That Actually Work",
    description: "Deploy specialized AI agents for different tasks: code review, refactoring, documentation, testing. They collaborate, share context, and deliver results faster than any single model.",
    color: "purple",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Search,
    title: "Your Entire Codebase. In Context.",
    description: "Advanced indexing and semantic search means AI understands your architecture, dependencies, and patterns. Not just the file you're editing—your entire project.",
    color: "cyan",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Coins,
    title: "Pay for Tokens. Not Subscriptions.",
    description: "Buy token packs. Use what you need. No monthly fees. No surprise bills. See exactly what each AI call costs. Unused tokens never expire.",
    color: "green",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Zap,
    title: "Desktop-First. Browser-Never.",
    description: "Built with Electron for true native performance. Full filesystem access. No browser limitations. No lag. No compromises. Your code stays local.",
    color: "orange",
    gradient: "from-orange-500 to-yellow-500",
  },
];

export default function ValueProposition() {
  return (
    <section className="relative py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Built for Serious Developers
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Not another AI chatbot. A complete development environment that orchestrates 
            multiple AI models to match your workflow.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2">
                {/* Gradient Glow on Hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 mb-6 shadow-lg`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Element */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-5 rounded-full blur-3xl`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-gray-400 mb-6">
            Ready to experience the future of AI-powered coding?
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:-translate-y-1">
            Download Godzilla Coder
          </button>
        </motion.div>
      </div>
    </section>
  );
}
