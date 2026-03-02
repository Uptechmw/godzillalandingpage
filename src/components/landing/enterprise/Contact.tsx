import React from 'react';

const Contact = () => {
    return (
        <section className="section-standard border-b border-border bg-primary relative overflow-hidden">
            <div className="enterprise-container">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <span className="label-micro text-emerald mb-6 inline-block">Engineering Support</span>
                        <h2 className="h2 mb-8">Talk to Our Engineering Team</h2>
                        <p className="body-lg text-text-muted mb-12 max-w-md">
                            Direct technical access for production scaling, security audits, and infrastructure integration.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-6 p-4 border border-border bg-surface-soft rounded-sm">
                                <div className="label-micro text-text-faint w-24">General</div>
                                <a href="mailto:support@godzillaai.dev" className="text-[17px] font-mono text-emerald hover:underline">support@godzillaai.dev</a>
                            </div>
                            <div className="flex items-center gap-6 p-4 border border-border bg-surface-soft rounded-sm">
                                <div className="label-micro text-text-faint w-24">Enterprise</div>
                                <a href="mailto:enterprise@godzillaai.dev" className="text-[17px] font-mono text-emerald hover:underline">enterprise@godzillaai.dev</a>
                            </div>
                            <div className="flex items-center gap-6 p-4 border border-border bg-surface-soft rounded-sm">
                                <div className="label-micro text-text-faint w-24">Security</div>
                                <a href="mailto:security@godzillaai.dev" className="text-[17px] font-mono text-emerald hover:underline">security@godzillaai.dev</a>
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-10 bg-emerald/5 blur-[120px] opacity-20 pointer-events-none"></div>
                        <div className="relative border border-border p-2 bg-black overflow-hidden rounded-md shadow-2xl">
                            <img
                                src="/images/enterprise/architecture.png"
                                alt="Godzilla AI Engineering Hub"
                                className="w-full h-auto object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-8 bg-black/60 backdrop-blur-md">
                                <p className="label-micro text-emerald">Production Ops Center</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
