import React from 'react';
import { Shield, Lock, EyeOff, Globe } from 'lucide-react';

const SecurityPrivacy = () => {
    const guards = [
        {
            title: 'Isolated Execution',
            desc: 'Your code runs in secure local runtimes with zero external exposure.',
            icon: <Lock className="w-5 h-5" />
        },
        {
            title: 'Data Privacy',
            desc: 'We never store your proprietary source code or repository context.',
            icon: <EyeOff className="w-5 h-5" />
        },
        {
            title: 'Secure Sessions',
            desc: 'Enterprise-grade protection for your identity and access management.',
            icon: <Shield className="w-5 h-5" />
        },
        {
            title: 'Compliance Ready',
            desc: 'SOC2 Type II and GDPR compliant infrastructure for global engineering teams.',
            icon: <Globe className="w-5 h-5" />
        },
    ];

    return (
        <section className="section-standard border-b border-border bg-primary py-32">
            <div className="enterprise-container">
                <div className="text-center mb-24 max-w-2xl mx-auto">
                    <span className="label-micro text-accent-blue mb-6 inline-block tracking-widest">Security & Privacy</span>
                    <h2 className="h2 mb-6 text-glow-blue">Infrastructure Protection</h2>
                    <p className="body-lg text-text-body">
                        Godzilla AI is built for the most sensitive production environments. Your code stays within your infrastructure.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {guards.map((guard, idx) => (
                        <div key={idx} className="group p-8 border border-border bg-surface rounded-lg hover:border-accent-blue/50 transition-colors">
                            <div className="w-10 h-10 rounded bg-primary border border-border flex items-center justify-center text-accent-blue mb-6 group-hover:scale-110 transition-transform">
                                {guard.icon}
                            </div>
                            <h3 className="text-lg font-bold text-text mb-3">{guard.title}</h3>
                            <p className="text-[14px] text-text-body leading-relaxed font-medium">{guard.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SecurityPrivacy;
