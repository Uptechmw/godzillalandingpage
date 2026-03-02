import React from 'react';

const TrustStrip = () => {
    return (
        <div className="border-b border-border bg-surface-soft py-10">
            <div className="enterprise-container flex flex-wrap items-center justify-between gap-8 opacity-40 grayscale contrast-125">
                <span className="label-micro text-text-muted">Trusted by Infrastructures at:</span>
                <div className="flex flex-wrap items-center gap-12 lg:gap-20">
                    <span className="text-[18px] font-black tracking-tighter uppercase">Vertex Systems</span>
                    <span className="text-[18px] font-black tracking-tighter uppercase">Cipher Global</span>
                    <span className="text-[18px] font-black tracking-tighter uppercase">Luminous Corp</span>
                    <span className="text-[18px] font-black tracking-tighter uppercase">Apex Engineering</span>
                </div>
            </div>
        </div>
    );
};

export default TrustStrip;
