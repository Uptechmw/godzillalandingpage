import React from 'react';

const SecurityPrivacy = () => {
    const features = [
        { title: 'HttpOnly Sessions', desc: 'Strict cookie security with zero-access client-side scripts.' },
        { title: 'DB-Verified Revocation', desc: 'Real-time session invalidation across all Edge nodes.' },
        { title: 'Admin 2FA Authorization', desc: 'Mandatory clinical authorization for all system-level changes.' },
        { title: 'Secure Local Execution', desc: 'Isolated sandbox for native code generation and testing.' },
        { title: 'Canonical Error Architecture', desc: 'Standardized security response patterns for audit compliance.' },
        { title: 'Role-Based Access Control', desc: 'Granular permissions for teams and infrastructure management.' },
    ];

    return (
        <section className="section-standard border-b border-border bg-primary">
            <div className="enterprise-container text-left">
                <div className="mb-16">
                    <span className="label-micro text-emerald mb-6 inline-block">Security Infrastructure</span>
                    <h2 className="h2 mb-8">Uncompromising Privacy and Security</h2>
                    <p className="body-lg text-text-muted max-w-content">
                        Godzilla AI is engineered with a "Defense in Depth" philosophy, ensuring that your code, credentials, and context remain within your secure environment.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex flex-col group">
                            <div className="w-12 h-12 border border-border bg-surface-soft flex items-center justify-center mb-6 group-hover:border-emerald transition-colors rounded-sm">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                            </div>
                            <h3 className="text-[19px] font-bold mb-4">{feature.title}</h3>
                            <p className="text-[16px] text-text-muted leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SecurityPrivacy;
