import React from 'react';

const Contact = () => {
    return (
        <section className="section-standard border-b border-border bg-primary relative overflow-hidden">
            <div className="enterprise-container">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <span className="label-micro text-accent-blue mb-6 inline-block">Direct Engineering Access</span>
                        <h2 className="h2 mb-8">Infrastructure Technical Support</h2>
                        <p className="body-lg text-text-muted mb-12 max-w-md">
                            Direct technical access for production scaling, secure audits, and infrastructure integration. Reach our engineering team directly.
                        </p>

                        <div className="space-y-4">
                            {[
                                { label: 'Infrastucture', email: 'support@godzillaai.dev' },
                                { label: 'Auth & Security', email: 'security@godzillaai.dev' },
                                { label: 'Enterprise Ops', email: 'enterprise@godzillaai.dev' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-6 p-5 border border-border bg-surface rounded-md hover:border-accent-blue/30 transition-colors">
                                    <div className="label-micro text-text-muted w-24 border-r border-border/50">{item.label}</div>
                                    <a href={`mailto:${item.email}`} className="text-[15px] font-mono text-text hover:text-accent-blue transition-colors font-bold tracking-tight">
                                        {item.email}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-10 bg-accent-blue/5 blur-[120px] opacity-20 pointer-events-none"></div>
                        <div className="relative border border-border p-2 bg-black overflow-hidden rounded-md shadow-2xl">
                            <img
                                src="/images/enterprise/architecture.png"
                                alt="Godzilla AI Engineering Hub"
                                className="w-full h-auto object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-8 bg-black/60 backdrop-blur-md">
                                <p className="label-micro text-accent-blue">Production Ops Center</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
