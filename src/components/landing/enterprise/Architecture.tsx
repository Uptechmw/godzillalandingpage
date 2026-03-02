import React from 'react';

const Architecture = () => {
    return (
        <section className="section-arch border-b border-border bg-primary relative overflow-hidden">
            <div className="enterprise-container text-left lg:text-center">
                <div className="mb-16 max-w-content mx-auto">
                    <span className="label-micro text-accent-blue mb-6 inline-block">Platform Architecture</span>
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
                            src="/images/enterprise/architecture.png"
                            alt="Godzilla AI Enterprise Infrastructure Architecture Diagram"
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
                    <div className="enterprise-card border-l-4 border-accent-blue text-left">
                        <h4 className="label-micro text-accent-blue mb-4">Identity & Access</h4>
                        <p className="text-[16px] font-medium leading-relaxed">
                            DB-verified session validation with immediate revocation and Admin 2FA authentication.
                        </p>
                    </div>
                    <div className="enterprise-card border-l-4 border-accent-blue text-left">
                        <h4 className="label-micro text-accent-blue mb-4">Economy Engine</h4>
                        <p className="text-[16px] font-medium leading-relaxed">
                            Token-level accounting with granular cost-center allocation and usage-based transparency.
                        </p>
                    </div>
                    <div className="enterprise-card border-l-4 border-text-faint text-left">
                        <h4 className="label-micro text-text-faint mb-4">Secure Runtime</h4>
                        <p className="text-[16px] font-medium leading-relaxed">
                            Hardened streaming pipelines and role-based access control for industrial scale.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Architecture;
