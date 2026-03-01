"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import Link from "next/link";

export default function PricingNew() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/billing/products')
      .then(res => res.json())
      .then(data => setPlans(data))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="pricing" className="relative py-24 lg:py-32 px-6 lg:px-8" style={{ background: 'var(--color-primary)', borderTop: '1px solid var(--color-border)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 tracking-tight" style={{ color: 'var(--color-text)' }}>
            Simple, Transparent Pricing
          </h2>
          <p className="max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            No hidden fees. Pay for what you use, or bring your own API keys.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16 min-h-[400px]">
          {loading ? (
            <div className="col-span-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : plans.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-500 italic">
              No pricing plans currently active.
            </div>
          ) : (
            plans.map((plan, index) => {
              const highlighted = index === 1; // Middle one usually
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative p-8 rounded-xl flex flex-col"
                  style={{
                    background: highlighted ? 'var(--color-surface-2)' : 'var(--color-surface)',
                    border: `1px solid ${highlighted ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  }}
                >
                  {highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: 'var(--color-accent)' }}>
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--color-text)' }}>{plan.name}</h3>
                    <p className="text-sm" style={{ color: 'var(--color-muted)' }}>{plan.description || `Get ${plan.coins.toLocaleString()} Godzilla Coins`}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>${plan.priceAmount}</span>
                      <span style={{ color: 'var(--color-muted)' }}>/ lifetime</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {(plan.features || []).map((feature: string) => (
                      <li key={feature} className="flex items-start gap-3 text-sm" style={{ color: 'var(--color-muted)' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-success)' }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/dashboard/buy"
                    className="w-full py-3 px-4 text-sm text-center font-semibold rounded-lg transition-all"
                    style={{
                      background: highlighted ? 'var(--color-accent)' : 'transparent',
                      color: highlighted ? '#fff' : 'var(--color-text)',
                      border: `1px solid ${highlighted ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    }}
                  >
                    Select Plan
                  </Link>
                </motion.div>
              );
            })
          )}
        </div>

        <div className="text-center text-sm" style={{ color: 'var(--color-text-faint)' }}>
          Have more questions?{" "}
          <Link href="#" className="transition-colors" style={{ color: 'var(--color-accent)' }}>
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
