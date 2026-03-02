import React from 'react';

const MultiModel = () => {
    const models = [
        {
            name: 'Gemini 3.1 Pro',
            type: 'Frontend & UI',
            strength: 'High-performance generation for complex UI components and frontend architecture.',
            accent: 'border-accent-blue'
        },
        {
            name: 'Claude 4.6',
            type: 'Systems & Logic',
            strength: 'Exceptional reasoning across Sonnet & Opus architectures for backend systems and API design.',
            accent: 'border-accent-blue'
        },
        {
            name: 'ChatGPT 5.2',
            type: 'General Engineering',
            strength: 'Versatile performance across full-stack development and rapid prototyping.',
            accent: 'border-accent-blue'
        }
    ];

    return (
        <section className="section-standard border-b border-border bg-surface">
            <div className="enterprise-container">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-12 text-left">
                    <div>
                        <span className="label-micro text-accent-blue mb-6 inline-block tracking-widest">Model Intelligence</span>
                        <h2 className="h2 uppercase">Multi-Model Orchestration</h2>
                    </div>
                    <p className="text-text-body max-w-content text-[17px] leading-relaxed">
                        Godzilla AI dynamically routes requests to the most capable model while maintaining unified context and billing across your entire development workflow.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {models.map((model, idx) => (
                        <div key={idx} className={`enterprise-card ${model.accent} border-t-4 pt-10 h-full flex flex-col bg-primary/40`}>
                            <div className="label-micro text-accent-blue mb-8 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-accent-blue"></span>
                                Unified Context
                            </div>
                            <h3 className="h3 mb-3">{model.name}</h3>
                            <p className="label-micro text-text-muted mb-10">{model.type}</p>
                            <p className="text-[16px] text-text-body leading-relaxed mt-auto">
                                {model.strength}
                            </p>
                            <div className="mt-12 pt-6 border-t border-border flex justify-between items-center group cursor-pointer">
                                <span className="label-micro group-hover:text-accent-blue transition-colors">Technical Details</span>
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
