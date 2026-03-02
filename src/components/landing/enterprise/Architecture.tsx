import React from 'react';

const Architecture = () => {
    return (
        <section className="section-arch border-y border-border bg-surface-alt relative overflow-hidden ambient-glow">
            <div className="enterprise-container relative z-10 text-left lg:text-center">
                <div className="mb-16 max-w-content mx-auto">
                    <span className="label-micro text-accent-blue mb-6 inline-block tracking-widest">Platform Design</span>
                    <h2 className="h2 mb-8">
                        Engineered for Scale and Security
                    </h2>
                    <p className="body-lg text-text-body">
                        Godzilla AI provides a secure, unified infrastructure layer between your codebase and global AI models.
                    </p>
                </div>

                <div className="relative group max-w-5xl mx-auto">
                    <div className="relative border border-border p-4 bg-black/40 backdrop-blur-xl rounded-lg overflow-hidden shadow-2xl">
                        <img
                            src="/images/enterprise/architecture.png"
                            alt="Godzilla AI Enterprise Infrastructure Architecture Diagram"
                            className="w-full h-auto object-cover border border-border rounded-md opacity-90"
                        />

                        <div className="absolute bottom-8 left-8 right-8 flex flex-wrap justify-between gap-12 pointer-events-none opacity-80">
                            <div className="label-micro text-text-muted p-2 border border-border bg-black/40 backdrop-blur-md">
                                Protocol: gRPC / TLS 1.3
                            </div>
                            <div className="label-micro text-text-muted p-2 border border-border bg-black/40 backdrop-blur-md">
                                Encryption: AES-256-GCM
                            </div>
                            <div className="label-micro text-text-muted p-2 border border-border bg-black/40 backdrop-blur-md">
                                Locality: Edge + Native
                            </div>
                        </div>
                    </div>
                </div>

                {/* System Pillars */}
                <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
                    <div className="enterprise-card border-l-4 border-accent-blue text-left bg-primary/40">
                        <h4 className="label-micro text-accent-blue mb-4">User Authentication</h4>
                        <p className="text-[16px] font-medium leading-relaxed text-text-body">
                            Verified session validation with immediate revocation and multi-factor authentication.
                        </p>
                    </div>
                    <div className="enterprise-card border-l-4 border-accent-blue text-left bg-primary/40">
                        <h4 className="label-micro text-accent-blue mb-4">Usage Credits</h4>
                        <p className="text-[16px] font-medium leading-relaxed text-text-body">
                            Transparent credit-based accounting with granular cost-center allocation.
                        </p>
                    </div>
                    <div className="enterprise-card border-l-4 border-accent-blue text-left bg-primary/40">
                        <h4 className="label-micro text-accent-blue mb-4">Protected Execution</h4>
                        <p className="text-[16px] font-medium leading-relaxed text-text-body">
                            Hardened streaming pipelines and role-based access control for global scale.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Architecture;
