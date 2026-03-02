import React from 'react';
import { Database, ShieldCheck, Zap, Layers } from 'lucide-react';

const BuiltForTeams = () => {
    const features = [
        {
            title: 'Repository Reasoning',
            desc: 'Deep architectural analysis across millions of lines with local context.',
            icon: <Layers className="w-5 h-5" />
        },
        {
            title: 'Model Orchestration',
            desc: 'Deterministic routing across world-class models for cost and speed.',
            icon: <Zap className="w-5 h-5" />
        },
        {
            title: 'Industrial Security',
            desc: 'HttpOnly session protection and isolated secure local execution.',
            icon: <ShieldCheck className="w-5 h-5" />
        },
        {
            title: 'Token Economy',
            desc: 'Transparent usage-based billing integrated into the DEV workflow.',
            icon: <Database className="w-5 h-5" />
        },
    ];

    return (
        <section className="section-standard border-b border-border bg-surface py-32">
            <div className="enterprise-container">
                <div className="max-w-3xl mb-20 text-left">
                    <span className="label-micro text-accent-blue mb-6 inline-block">Enterprise Infrastructure</span>
                    <h2 className="h2 mb-6">Built for Production Codebases</h2>
                    <p className="body-lg text-text-muted">
                        Godzilla AI operates at repository scale, understanding system architecture and multi-file dependencies where traditional tools fail.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-px bg-border border border-border overflow-hidden rounded-lg">
                    {features.map((f, idx) => (
                        <div key={idx} className="bg-primary p-12 hover:bg-surface transition-colors group">
                            <div className="w-12 h-12 rounded bg-surface-soft border border-border flex items-center justify-center text-accent-blue mb-8 group-hover:border-accent-blue/50 transition-colors shadow-inner">
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-bold text-text mb-4">{f.title}</h3>
                            <p className="text-text-muted leading-relaxed max-w-sm font-medium">
                                {f.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BuiltForTeams;
