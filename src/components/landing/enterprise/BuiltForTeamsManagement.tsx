import React from 'react';

const BuiltForTeamsManagement = () => {
    return (
        <section className="section-standard border-b border-border bg-surface relative overflow-hidden">
            <div className="enterprise-container">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <span className="label-micro text-accent-blue mb-6 inline-block tracking-widest">Enterprise Control</span>
                        <h2 className="h2 mb-10 leading-tight">
                            Management Depth for Modern Teams
                        </h2>
                        <p className="text-[17px] text-text-body mb-12 leading-relaxed max-w-content">
                            Godzilla AI provides a comprehensive administration suite to monitor usage, manage keys, and audit system interactions with enterprise-grade precision.
                        </p>

                        <div className="grid grid-cols-2 gap-10">
                            <div className="space-y-3">
                                <h4 className="text-[16px] font-bold">Audit Logs</h4>
                                <p className="label-micro text-text-muted leading-relaxed font-mono">Detailed record of AI transactions and system access.</p>
                            </div>
                            <div className="space-y-3">
                                <h4 className="text-[16px] font-bold">Key Protection</h4>
                                <p className="label-micro text-text-muted leading-relaxed font-mono">Secure encryption for all model and provider keys.</p>
                            </div>
                            <div className="space-y-3">
                                <h4 className="text-[16px] font-bold">Secure Delivery</h4>
                                <p className="label-micro text-text-muted leading-relaxed font-mono">Built-in engine for secure team-wide notifications.</p>
                            </div>
                            <div className="space-y-3">
                                <h4 className="text-[16px] font-bold">Access Control</h4>
                                <p className="label-micro text-text-muted leading-relaxed font-mono">Granular gating for models and administrative actions.</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-10 bg-accent-blue/5 blur-[100px] opacity-20 pointer-events-none"></div>
                        <div className="relative border border-border p-2 bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl skew-y-3 lg:-rotate-3 translate-x-4 lg:translate-x-12 transition-transform duration-700 group-hover:rotate-0 group-hover:skew-y-0 group-hover:translate-x-0">
                            <img
                                src="/images/enterprise/admin_dashboard.png"
                                alt="Admin Management UI"
                                className="w-full h-auto object-cover border border-border rounded-md opacity-90"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BuiltForTeamsManagement;
