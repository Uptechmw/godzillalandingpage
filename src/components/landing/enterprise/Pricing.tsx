import React from 'react';

const Pricing = () => {
    const tiers = [
        { name: 'Starter', price: '$0', desc: 'For individual exploration and rapid prototyping.', features: ['Multi-Model Orchestration', 'Local Execution', 'Basic Support'] },
        { name: 'Developer', price: '$29', desc: 'For professional engineers and complex workflows.', features: ['Full Model Garden', 'Advanced RAG', 'Priority Local Runtime'] },
        { name: 'Standard', price: '$99', desc: 'For engineering teams and scaling projects.', features: ['Shared Context Store', 'Team Admin Panel', 'Audit Logs (30 days)'] },
        { name: 'Enterprise', price: 'Custom', desc: 'For massive infrastructure and guaranteed uptime.', features: ['SLA Guarantees', 'On-Premise Runtime', 'Unlimited Audit Logs'] },
    ];

    return (
        <section className="section-standard border-b border-border bg-primary">
            <div className="enterprise-container">
                <div className="text-left mb-16">
                    <span className="label-micro text-emerald mb-6 inline-block">Subscription Model</span>
                    <h2 className="h2 mb-8">Predictable Infrastructure Pricing</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tiers.map((tier, idx) => (
                        <div key={idx} className="enterprise-card flex flex-col items-start h-full border-border/50 hover:border-emerald/40 transition-all">
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
