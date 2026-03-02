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
        <section id="pricing" className="section-standard border-y border-border bg-tinted-gradient relative overflow-hidden ambient-glow">
            <div className="enterprise-container relative z-10">
                <div className="text-left mb-16 max-w-2xl">
                    <span className="label-micro text-accent-blue mb-6 inline-block tracking-widest">Pricing Strategy</span>
                    <h2 className="h2 mb-6">Simple, predictable pricing</h2>
                    <p className="body-lg text-text-body">
                        Buy AI Coins and use them across chat, autocomplete, and code actions. No hidden fees or complex contracts.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.isArray(plans) && plans.map((plan, index) => {
                        const isLast = index === plans.length - 1;
                        // Dev/Pro plans often marked as popular
                        const isPopular = plan.name.toLowerCase().includes('dev') ||
                            plan.name.toLowerCase().includes('pro') ||
                            plan.name.toLowerCase().includes('standard');

                        const rawFeatures = plan.features;
                        const features = Array.isArray(rawFeatures) ? (rawFeatures as string[]) : [];

                        // Build redirect URLs
                        const signUpUrl = `/auth/signup?plan=${plan.id}`;
                        const buyUrl = `/dashboard/buy?plan=${plan.id}`;
                        const ctaHref = isLoggedIn ? buyUrl : signUpUrl;

                        return (
                            <div
                                key={plan.id}
                                className={`enterprise-card flex flex-col items-start h-full transition-all relative ${isLast
                                    ? '!bg-accent-blue !border-accent-blue shadow-xl shadow-accent-blue/20'
                                    : isPopular
                                        ? 'border-accent-blue ring-1 ring-accent-blue/20 bg-surface/80'
                                        : 'border-border/50 bg-surface/40'
                                    }`}
                            >
                                {isPopular && (
                                    <div className={`absolute -top-3 left-6 px-3 py-1 border label-micro !text-[10px] rounded-full font-bold ${isLast
                                        ? 'bg-white/20 !border-white text-white'
                                        : 'bg-[rgba(37,99,235,0.18)] border-accent-blue text-accent-blue'
                                        }`}>
                                        Most Popular
                                    </div>
                                )}

                                <h3 className={`text-xl font-bold mb-2 ${isLast ? 'text-white' : 'text-text'}`}>{plan.name}</h3>
                                <div className="mb-8 flex items-baseline gap-1">
                                    <span className={`text-4xl font-display font-light tracking-tight ${isLast ? 'text-white' : 'text-text'}`}>${plan.priceAmount}</span>
                                    <span className={`label-micro lowercase ${isLast ? 'text-white/70' : 'text-text-muted'}`}>/one-time</span>
                                </div>

                                <p className={`text-[14px] mb-8 leading-relaxed font-medium ${isLast ? 'text-white/90' : 'text-text-body'}`}>
                                    {plan.description || `${plan.coins} AI Coins for infrastructure access.`}
                                </p>

                                <div className="w-full space-y-4 mb-10 flex-grow">
                                    {features.map((f, i) => (
                                        <div key={i} className="flex gap-3 items-center text-[13px]">
                                            <Check className={`w-4 h-4 flex-shrink-0 ${isLast ? 'text-white' : 'text-accent-blue'}`} />
                                            <span className={`font-medium ${isLast ? 'text-white/95' : 'text-text-body'}`}>{f}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    href={ctaHref}
                                    className={`w-full flex items-center justify-center h-12 rounded-md label-micro transition-all ${isLast
                                        ? 'bg-white text-accent-blue hover:bg-white/90 shadow-xl'
                                        : isPopular
                                            ? 'bg-accent-blue text-white hover:bg-accent-blue-hover shadow-lg shadow-accent-blue/20'
                                            : 'bg-transparent border border-border text-text-body hover:border-accent-blue/50 hover:text-text'
                                        }`}
                                >
                                    {isLoggedIn ? 'Buy Credits' : 'Choose Plan'}
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
