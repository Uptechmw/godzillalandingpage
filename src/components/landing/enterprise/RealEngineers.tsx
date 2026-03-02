import React from 'react';

const RealEngineers = () => {
    const testimonials = [
        {
            quote: "Godzilla AI isn't just a tool; it's a fundamental architectural shift. The local execution context combined with multi-model routing has halved our architectural refactor cycles.",
            author: "Marcus Thorne",
            role: "Lead Infrastructure Engineer, Velo Dynamics"
        },
        {
            quote: "Finally, an AI platform that understands the security requirements of a regulated industry. HttpOnly session protection and local runtime isolation are non-negotiable for us.",
            author: "Elena Vance",
            role: "Chief Technology Officer, CipherSafe"
        }
    ];

    return (
        <section className="section-standard border-b border-border bg-primary relative overflow-hidden">
            <div className="enterprise-container">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Images Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="border border-border p-1 bg-surface-soft h-64 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500 rounded-sm">
                            <img
                                src="/Users/macbookair/.gemini/antigravity/brain/4339a5b1-ce14-4317-a791-b8b186413c7f/engineers_collaboration_professional_1772479701988.png"
                                alt="Team collaboration"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="border border-border p-1 bg-surface-soft h-64 overflow-hidden relative translate-y-12 grayscale hover:grayscale-0 transition-all duration-500 rounded-sm">
                            <img
                                src="/Users/macbookair/.gemini/antigravity/brain/4339a5b1-ce14-4317-a791-b8b186413c7f/godzilla_icon_1772440818283.png"
                                alt="Godzilla Identity"
                                className="w-full h-full object-contain opacity-20 p-8"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-4 bg-black/60 backdrop-blur-md">
                                <p className="label-micro text-emerald">Authored by humans</p>
                            </div>
                        </div>
                    </div>

                    {/* Quotes */}
                    <div className="space-y-16">
                        <span className="label-micro text-emerald mb-6 inline-block">Trusted by Leaders</span>
                        {testimonials.map((t, idx) => (
                            <div key={idx} className="relative">
                                <div className="text-5xl font-serif text-emerald opacity-20 absolute -top-8 -left-8">"</div>
                                <blockquote className="text-[20px] font-medium leading-relaxed text-text italic mb-6">
                                    {t.quote}
                                </blockquote>
                                <div>
                                    <p className="font-bold text-[16px] text-text">{t.author}</p>
                                    <p className="label-micro text-text-faint mt-2">{t.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RealEngineers;
