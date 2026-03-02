import React from 'react';

const Pricing = () => {
    const tiers = [
        { name: 'Developer', price: '$0', desc: 'Professional local runtime with bring-your-own-API-key support.', features: ['BYOK Integration', 'Native Local Execution', 'Core Context Processing'] },
        { name: 'Standard', price: '$29', desc: 'Predictable infrastructure with coin-based usage modeling.', features: ['Unified Model Orchestration', 'Token Consumption Audit', 'Priority Local Runtime'] },
        { name: 'Team', price: '$99', desc: 'Centralized management for professional engineering teams.', features: ['Admin Control Panel', 'Audit Logging & Compliance', 'Shared Context Store'] },
        { name: 'Enterprise', price: 'Custom', desc: 'Industrial-grade infrastructure with guaranteed throughput.', features: ['Transparent Token Billing', 'Custom Model Integration', 'SLA Infrastructure Support'] },
    ];

    return (
        <section className="section-standard border-b border-border bg-primary">
            <div className="enterprise-container">
                <div className="text-left mb-16">
                    <span className="label-micro text-accent-blue mb-6 inline-block">Subscription Model</span>
                    <h2 className="h2 mb-8">Predictable Infrastructure Pricing</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tiers.map((tier, idx) => (
                        <div key={idx} className="enterprise-card flex flex-col items-start h-full border-border/50 hover:border-accent-blue/40 transition-all">
                            <h3 className="text-[20px] font-bold mb-2">{tier.name}</h3>
                            <p className="text-[14px] text-text-muted mb-8 leading-relaxed h-12">{tier.desc}</p>

                            <div className="mb-10 flex items-baseline gap-1">
                                <span className="text-4xl font-display font-light tracking-tight">{tier.price}</span>
                                {tier.price !== 'Custom' && <span className="label-micro text-text-faint lowercase">/mo</span>}
                            </div>

                            <div className="w-full space-y-5 mb-12 flex-grow">
                                {tier.features.map((f, i) => (
                                    <div key={i} className="flex gap-3 items-center text-[13px]">
                                        <div className="w-1.5 h-1.5 bg-emerald opacity-60"></div>
                                        <span className="text-text-muted">{f}</span>
                                    </div>
                                ))}
                            </div>

                            <button className={`w-full ${idx === 3 ? 'btn-primary' : 'btn-secondary'} label-micro px-0`}>
                                {idx === 3 ? 'Contact Sales' : 'Select Plan'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
