import React from 'react';

const TrustStrip = () => {
    return (
        <div className="border-b border-border bg-surface py-10">
            <div className="enterprise-container flex flex-wrap items-center justify-between gap-8 opacity-40 grayscale contrast-125">
                <span className="label-micro text-text-muted tracking-widest uppercase">Trusted by engineering teams at:</span>
                <div className="flex flex-wrap items-center gap-12 lg:gap-20">
                    <span className="text-[18px] font-black tracking-tighter uppercase font-display text-text">Vertex Systems</span>
                    <span className="text-[18px] font-black tracking-tighter uppercase font-display text-text">Cipher Global</span>
                    <span className="text-[18px] font-black tracking-tighter uppercase font-display text-text">Luminous Corp</span>
                    <span className="text-[18px] font-black tracking-tighter uppercase font-display text-text">Apex Engineering</span>
                </div>
            </div>
        </div>
    );
};

export default TrustStrip;
