import React from 'react';

const SecurityPrivacy = () => {
    const features = [
        { title: 'HttpOnly Session Cookies', desc: 'Secure server-side cookies with Zero-Trust browser access.' },
        { title: 'DB-Verified Revocation', desc: 'Real-time session invalidation with immediate global propagation.' },
        { title: 'Admin MFA (OTP)', desc: 'Mandatory multi-factor authentication for all administrative control.' },
        { title: 'Secure Local Access', desc: 'Isolated sandbox runtime for native code reasoning and execution.' },
        { title: 'Canonical API Contracts', desc: 'Standardized error handling and audit-ready communication protocols.' },
        { title: 'Role-Based Permissions', desc: 'Granular access control designed for industrial engineering teams.' },
    ];

    return (
        <section className="section-standard border-b border-border bg-primary">
            <div className="enterprise-container text-left">
                <div className="mb-16">
                    <span className="label-micro text-accent-blue mb-6 inline-block">Security Infrastructure</span>
                    <h2 className="h2 mb-8">Uncompromising Privacy and Security</h2>
                    <p className="body-lg text-text-muted max-w-content">
                        Godzilla AI is engineered with a "Defense in Depth" philosophy, ensuring that your code, credentials, and context remain within your secure environment.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex flex-col group">
                            <div className="w-12 h-12 border border-border bg-surface-soft flex items-center justify-center mb-6 group-hover:border-accent-blue transition-colors rounded-sm">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-blue"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
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
