import React from 'react';

const Architecture = () => {
    return (
        <section className="section-arch border-b border-border bg-primary relative overflow-hidden">
            <div className="enterprise-container text-left lg:text-center">
                <div className="mb-16 max-w-content mx-auto">
                    <span className="label-micro text-emerald mb-6 inline-block">Platform Architecture</span>
                    <h2 className="h2 mb-8">
                        Engineered for Scale and Security
                    </h2>
                    <p className="body-lg text-text-muted">
                        The Godzilla AI runtime operates as a stateful infrastructure layer between your development environment and the world's most capable models.
                    </p>
                </div>

                <div className="relative group max-w-5xl mx-auto">
                    {/* Subtle grid pattern background */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

                    <div className="relative border border-border p-4 bg-black/40 backdrop-blur-xl rounded-lg overflow-hidden shadow-2xl">
                        <img
                            src="/Users/macbookair/.gemini/antigravity/brain/4339a5b1-ce14-4317-a791-b8b186413c7f/infrastructure_architecture_diagram_1772479799207.png"
                            alt="Infrastructure Architecture"
                            className="w-full h-auto object-cover border border-border rounded-md"
                        />

                        <div className="absolute bottom-8 left-8 right-8 flex flex-wrap justify-between gap-12 pointer-events-none">
                            <div className="label-micro text-text-faint p-2 border border-border bg-black/40 backdrop-blur-md">
                                Protocol: gRPC / TLS 1.3
                            </div>
                            <div className="label-micro text-text-faint p-2 border border-border bg-black/40 backdrop-blur-md">
                                Encryption: AES-256-GCM
                            </div>
                            <div className="label-micro text-text-faint p-2 border border-border bg-black/40 backdrop-blur-md">
                                Locality: Edge + Native
                            </div>
                        </div>
                    </div>
                </div>

                {/* System Pillars */}
                <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
                    <div className="enterprise-card border-l-4 border-emerald text-left">
                        <h4 className="label-micro text-emerald mb-4">Core Orchestrator</h4>
                        <p className="text-[16px] font-medium leading-relaxed">
                            Multi-model routing with deterministic latency guarantees and context window optimization.
                        </p>
                    </div>
                    <div className="enterprise-card border-l-4 border-enterprise-blue text-left">
                        <h4 className="label-micro text-enterprise-blue mb-4">Billing Engine</h4>
                        <p className="text-[16px] font-medium leading-relaxed">
                            Usage-based token management with real-time audit logs and cost-center allocation.
                        </p>
                    </div>
                    <div className="enterprise-card border-l-4 border-text-faint text-left">
                        <h4 className="label-micro text-text-faint mb-4">Secure Execution</h4>
                        <p className="text-[16px] font-medium leading-relaxed">
                            High-isolation runtime for native code execution and autonomous agent reasoning.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Architecture;
