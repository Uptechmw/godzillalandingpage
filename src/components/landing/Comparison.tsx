"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const comparisons = [
  {
    title: "vs. Cursor",
    headline: "More Models. More Control.",
    description: "Cursor locks you into one AI model. Godzilla gives you three—and lets you switch mid-conversation or orchestrate them together.",
    features: [
      { name: "Multiple AI Models", godzilla: true, competitor: false },
      { name: "Model Switching", godzilla: true, competitor: false },
      { name: "Agent Orchestration", godzilla: true, competitor: false },
      { name: "Full Codebase Context", godzilla: true, competitor: true },
    ],
  },
  {
    title: "vs. GitHub Copilot",
    headline: "Beyond Autocomplete.",
    description: "Copilot suggests code. Godzilla understands your architecture, reviews your PRs, refactors entire modules, and generates docs. It's a team, not a tool.",
    features: [
      { name: "Code Completion", godzilla: true, competitor: true },
      { name: "Architecture Understanding", godzilla: true, competitor: false },
      { name: "Multi-Agent Workflows", godzilla: true, competitor: false },
      { name: "Multiple AI Models", godzilla: true, competitor: false },
    ],
  },
  {
    title: "vs. VS Code Extensions",
    headline: "Integrated. Not Fragmented.",
    description: "Stop juggling ChatGPT tabs, Claude windows, and Copilot extensions. One editor. One interface. All models. Zero context switching.",
    features: [
      { name: "Unified Interface", godzilla: true, competitor: false },
      { name: "No Context Switching", godzilla: true, competitor: false },
      { name: "Integrated Workflow", godzilla: true, competitor: false },
      { name: "Native Performance", godzilla: true, competitor: true },
    ],
  },
];

export default function Comparison() {
  return (
    <section className="relative py-32 px-6 lg:px-8 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            Why Developers Choose{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Godzilla
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're not here to replace your favorite tools. We're here to give you 
            capabilities they can't match.
          </p>
        </motion.div>

        {/* Comparison Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {comparisons.map((comparison, index) => (
            <motion.div
              key={comparison.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
                {/* Header */}
                <div className="mb-6">
                  <div className="text-sm font-semibold text-purple-400 mb-2">
                    {comparison.title}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {comparison.headline}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {comparison.description}
                  </p>
                </div>

                {/* Feature Comparison */}
                <div className="space-y-3">
                  {comparison.features.map((feature) => (
                    <div
                      key={feature.name}
                      className="flex items-center justify-between py-2 border-b border-gray-700/30"
                    >
                      <span className="text-sm text-gray-300">{feature.name}</span>
                      <div className="flex gap-4">
                        {/* Godzilla */}
                        <div className="flex items-center gap-1">
                          {feature.godzilla ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            <X className="w-5 h-5 text-gray-600" />
                          )}
                        </div>
                        {/* Competitor */}
                        <div className="flex items-center gap-1 opacity-50">
                          {feature.competitor ? (
                            <Check className="w-5 h-5 text-gray-400" />
                          ) : (
                            <X className="w-5 h-5 text-gray-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
              <table className="min-w-full divide-y divide-gray-700/50">
                <thead>
                  <tr className="bg-gray-800/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-purple-400">
                      Godzilla
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-500">
                      Cursor
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-500">
                      Copilot
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-500">
                      VS Code + Ext
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/30">
                  {[
                    { name: "Multiple AI Models", godzilla: true, cursor: false, copilot: false, vscode: "Manual" },
                    { name: "Agent Orchestration", godzilla: true, cursor: false, copilot: false, vscode: false },
                    { name: "Token-Based Pricing", godzilla: true, cursor: false, copilot: false, vscode: "Varies" },
                    { name: "Full Codebase Context", godzilla: true, cursor: true, copilot: false, vscode: "Partial" },
                    { name: "Native Desktop App", godzilla: true, cursor: true, copilot: false, vscode: true },
                    { name: "No Monthly Subscription", godzilla: true, cursor: false, copilot: false, vscode: "Varies" },
                    { name: "Multi-Agent Workflows", godzilla: true, cursor: false, copilot: false, vscode: false },
                  ].map((row) => (
                    <tr key={row.name} className="hover:bg-gray-800/30 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-300">{row.name}</td>
                      <td className="px-6 py-4 text-center">
                        {row.godzilla === true ? (
                          <Check className="w-5 h-5 text-green-400 mx-auto" />
                        ) : (
                          <span className="text-sm text-gray-400">{row.godzilla}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center opacity-60">
                        {row.cursor === true ? (
                          <Check className="w-5 h-5 text-gray-400 mx-auto" />
                        ) : row.cursor === false ? (
                          <X className="w-5 h-5 text-gray-600 mx-auto" />
                        ) : (
                          <span className="text-sm text-gray-500">{row.cursor}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center opacity-60">
                        {row.copilot === true ? (
                          <Check className="w-5 h-5 text-gray-400 mx-auto" />
                        ) : row.copilot === false ? (
                          <X className="w-5 h-5 text-gray-600 mx-auto" />
                        ) : (
                          <span className="text-sm text-gray-500">{row.copilot}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center opacity-60">
                        {row.vscode === true ? (
                          <Check className="w-5 h-5 text-gray-400 mx-auto" />
                        ) : row.vscode === false ? (
                          <X className="w-5 h-5 text-gray-600 mx-auto" />
                        ) : (
                          <span className="text-sm text-gray-500">{row.vscode}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
