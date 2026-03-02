import React from 'react';

const MultiModel = () => {
    const models = [
        {
            name: 'Gemini 3.1 Pro',
            type: 'UI & Frontend Orchestration',
            strength: 'Optimized for high-concurrency UI generation and complex frontend reasoning.',
            accent: 'border-emerald'
        },
        {
            name: 'Claude Sonnet 4.6',
            type: 'Backend & Architecture',
            strength: 'Maximum performance for system-level architecture and backend engineering flows.',
            accent: 'border-enterprise-blue'
        },
        {
            name: 'Claude Opus 4.6',
            type: 'Advanced Reasoning',
            strength: 'The enterprise-grade standard for autonomous logical deduction and complex refactors.',
            accent: 'border-text-faint'
        }
    ];

    return (
        <section className="section-standard border-b border-border bg-surface">
            <div className="enterprise-container">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-12 text-left">
                    <div>
                        <span className="label-micro text-emerald mb-6 inline-block">Intelligence Layer</span>
                        <h2 className="h2 uppercase">Multi-Model Intelligence</h2>
                    </div>
                    <p className="text-text-muted max-w-content text-[17px] leading-relaxed">
                        Godzilla AI orchestrates the world's most capable models, automatically selecting the optimal engine for every development task.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {models.map((model, idx) => (
                        <div key={idx} className={`enterprise-card ${model.accent} border-t-4 pt-10 h-full flex flex-col`}>
                            <div className="label-micro text-emerald mb-8 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-emerald"></span>
                                Integrated Deployment
                            </div>
                            <h3 className="h3 mb-3">{model.name}</h3>
                            <p className="label-micro text-text-faint mb-10">{model.type}</p>
                            <p className="text-[16px] text-text-muted leading-relaxed mt-auto">
                                {model.strength}
                            </p>
                            <div className="mt-12 pt-6 border-t border-border flex justify-between items-center group cursor-pointer">
                                <span className="label-micro group-hover:text-emerald transition-colors">Technical Specs</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MultiModel;
