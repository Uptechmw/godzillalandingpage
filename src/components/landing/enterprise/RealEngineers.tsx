import React from 'react';

const RealEngineers = () => {
    const team = [
        { name: 'Marcus Chen', role: 'Lead Infrastructure Architect', img: '/images/team/eng1.png' },
        { name: 'Sarah Vance', role: 'Security Engineering', img: '/images/team/eng2.png' },
        { name: 'David Okafor', role: 'Distributed Systems', img: '/images/team/eng3.png' },
        { name: 'Elena Rossi', role: 'Model Orchestration', img: '/images/team/eng4.png' },
    ];

    return (
        <section className="section-standard border-b border-border bg-primary py-32">
            <div className="enterprise-container">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
                    <div className="max-w-2xl">
                        <span className="label-micro text-accent-blue mb-6 inline-block tracking-widest">Engineering Team</span>
                        <h2 className="h2 mb-6">Designed for Production Software</h2>
                        <p className="body-lg text-text-body">
                            Meet the architects behind Godzilla AI. We are focused on building secure, scalable infrastructure for the next generation of software development.
                        </p>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, idx) => (
                        <div key={idx} className="group cursor-default">
                            <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-lg border border-border bg-surface">
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60"></div>
                            </div>
                            <h3 className="text-[18px] font-bold text-text mb-1">{member.name}</h3>
                            <p className="label-micro text-text-muted">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RealEngineers;
