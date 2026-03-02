import React from 'react';
import { Database, ShieldCheck, Zap, Layers } from 'lucide-react';

const BuiltForTeams = () => {
    const features = [
        {
            title: 'Repository Context',
            desc: 'Deep architectural analysis across multi-file dependencies with local execution.',
            icon: <Layers className="w-5 h-5" />
        },
        {
            title: 'Smart Orchestration',
            desc: 'Deterministic routing across Gemini, Claude, and GPT-4 for optimal results.',
            icon: <Zap className="w-5 h-5" />
        },
        {
            title: 'Enterprise Security',
            desc: 'Secure local runtime with HttpOnly session protection and data isolation.',
            icon: <ShieldCheck className="w-5 h-5" />
        },
        {
            title: 'Predictable Billing',
            desc: 'Transparent usage-based credits integrated directly into your workflow.',
            icon: <Database className="w-5 h-5" />
        },
    ];

    return (
        <section className="section-standard border-b border-border bg-primary py-32">
            <div className="enterprise-container">
                <div className="max-w-3xl mb-20 text-left">
                    <span className="label-micro text-accent-blue mb-6 inline-block tracking-widest">Platform Capability</span>
                    <h2 className="h2 mb-6">Built for Production Codebases</h2>
                    <p className="body-lg text-text-body">
                        Godzilla AI understands your entire system architecture, providing unified context where traditional tools fragment.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-px bg-accent-blue border border-accent-blue/30 overflow-hidden rounded-xl">
                    {features.map((f, idx) => (
                        <div key={idx} className="bg-primary/95 p-12 hover:bg-surface transition-all duration-300 group">
                            <div className="w-12 h-12 rounded bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue mb-8 group-hover:border-accent-blue transition-colors">
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-bold text-text mb-4">{f.title}</h3>
                            <p className="text-text-body leading-relaxed max-w-sm font-medium">
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
