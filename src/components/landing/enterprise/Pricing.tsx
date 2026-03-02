import React from 'react';
import { prisma } from '@/lib/db';
import { supabase } from '@/lib/supabase';
import { Check } from 'lucide-react';
import Link from 'next/link';

const Pricing = async () => {
    // Fetch user session to determine routing
    const { data: { session } } = await supabase.auth.getSession();
    const isLoggedIn = !!session;

    // Fetch active plans from DB
    const plans = await prisma.tokenProduct.findMany({
        where: { active: true },
        orderBy: { priceAmount: 'asc' },
    });

    return (
        <section className="section-standard border-b border-border bg-primary py-32">
            <div className="enterprise-container">
                <div className="text-left mb-16 max-w-2xl">
                    <span className="label-micro text-accent-blue mb-6 inline-block">Infrastructure Economy</span>
                    <h2 className="h2 mb-6">Predictable Token-Based Pricing</h2>
                    <p className="body-lg text-text-muted">
                        Scalable access to world-class AI models through a transparent usage-based economy. Control your infrastructure spend with surgical precision.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {plans.map((plan) => {
                        const isPopular = plan.name.toLowerCase().includes('pro') || plan.name.toLowerCase().includes('popular');
                        const features = (plan.features as string[]) || [];

                        // Decide routing
                        const ctaHref = isLoggedIn
                            ? `/dashboard/buy?planId=${plan.id}`
                            : `/auth/signup?planId=${plan.id}`;

                        return (
                            <div
                                key={plan.id}
                                className={`enterprise-card flex flex-col items-start h-full transition-all relative ${isPopular ? 'border-accent-blue ring-1 ring-accent-blue/20' : 'border-border/50'
                                    }`}
                            >
                                {isPopular && (
                                    <div className="absolute -top-3 left-6 px-3 py-1 bg-accent-blue text-white label-micro !text-[10px] rounded-full">
                                        Most Popular
                                    </div>
                                )}

                                <h3 className="text-xl font-bold mb-2 text-text">{plan.name}</h3>
                                <div className="mb-8 flex items-baseline gap-1">
                                    <span className="text-4xl font-display font-light tracking-tight text-text">${plan.priceAmount}</span>
                                    <span className="label-micro text-text-faint lowercase">/{plan.currency}</span>
                                </div>

                                <p className="text-[14px] text-text-muted mb-8 leading-relaxed font-medium">
                                    {plan.description || `Industrial access with ${plan.coins} infrastructure tokens.`}
                                </p>

                                <div className="w-full space-y-4 mb-10 flex-grow">
                                    {features.map((f, i) => (
                                        <div key={i} className="flex gap-3 items-center text-[13px]">
                                            <Check className="w-4 h-4 text-accent-blue" />
                                            <span className="text-text-muted font-medium">{f}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    href={ctaHref}
                                    className={`w-full flex items-center justify-center py-4 rounded-md label-micro transition-all ${isPopular
                                            ? 'bg-accent-blue text-white hover:bg-accent-blue-hover shadow-lg shadow-accent-blue/20'
                                            : 'bg-surface-soft border border-border text-text hover:border-accent-blue/50'
                                        }`}
                                >
                                    Select Infrastructure
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
