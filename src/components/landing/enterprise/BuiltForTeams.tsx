import React from 'react';

const BuiltForTeams = () => {
    const points = [
        { title: 'Repository-Wide Reasoning', desc: 'Perform deep analysis across millions of lines of code with zero-latency local context.' },
        { title: 'Model Orchestration (Gemini + Claude)', desc: 'Smart routing across world-class models based on task complexity and cost optimization.' },
        { title: 'Deterministic Token Billing', desc: 'Transparent usage-based economy integrated directly into the development workflow.' },
        { title: 'Secure Runtime Environment', desc: 'Execute and test generated code in isolated, secure local environments.' },
        { title: 'Distributed Concurrency Management', desc: 'Manage massive codebases with architecture-level lock-step synchronization.' },
        { title: 'Production-Safe Streaming', desc: 'High-availability data pipelines designed for industrial-scale engineering.' },
    ];

    return (
        <section className="section-standard border-b border-border bg-surface">
            <div className="enterprise-container grid lg:grid-cols-2 gap-20 items-center">
                {/* Left Side: Professional Imagery */}
                <div className="relative group">
                    <div className="absolute -inset-8 bg-emerald/5 blur-[100px] opacity-0 group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative border border-border p-2 bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl">
                        <img
                            src="/images/enterprise/engineers.png"
                            alt="Professional engineering team collaborating on Godzilla AI infrastructure"
                            className="w-full h-auto object-cover border border-border rounded-md"
                        />
                    </div>
                </div>

                {/* Right Side: Technical Specs */}
                <div>
                    <span className="label-micro text-emerald mb-6 inline-block">AI Infrastructure for Code</span>
                    <h2 className="h2 mb-10">
                        AI Infrastructure Built for Production Codebases
                    </h2>

                    <p className="text-text-muted mb-12 text-[17px] leading-relaxed max-w-xl">
                        Unlike browser-based AI tools, Godzilla AI operates at repository scale. It understands system architecture, multi-file dependencies, and real-world engineering constraints.
                    </p>

                    <div className="space-y-8 text-left">
                        {points.map((point, idx) => (
                            <div key={idx} className="flex gap-6 group">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full border border-border bg-surface-soft flex items-center justify-center text-[10px] font-mono group-hover:border-emerald transition-colors font-bold">
                                    0{idx + 1}
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-[18px] font-bold text-text">{point.title}</h3>
                                    <p className="text-[16px] text-text-muted leading-relaxed max-w-md">
                                        {point.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BuiltForTeams;
