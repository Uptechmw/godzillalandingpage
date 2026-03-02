import React from 'react';

const TrustStrip = () => {
    const items = [
        { label: 'Multi-Model Engine', detail: 'Native orchestration' },
        { label: 'Secure Local Context', detail: 'Privacy-first reasoning' },
        { label: 'Autonomous Agents', detail: 'Distributed concurrency' },
        { label: 'Enterprise Controls', detail: 'RBAC & Audit logs' },
        { label: 'Deterministic Billing', detail: 'Usage-based economy' },
    ];

    return (
        <div className="border-b border-border bg-black/20">
            <div className="enterprise-container py-10">
                <div className="flex flex-wrap justify-between items-center gap-8 lg:gap-0">
                    {items.map((item, idx) => (
                        <React.Fragment key={idx}>
                            <div className="flex flex-col">
                                <span className="label-micro text-emerald mb-2">{item.detail}</span>
                                <span className="text-sm font-bold tracking-tight text-text whitespace-nowrap">{item.label}</span>
                            </div>
                            {idx < items.length - 1 && (
                                <div className="hidden lg:block w-px h-8 bg-border"></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrustStrip;
