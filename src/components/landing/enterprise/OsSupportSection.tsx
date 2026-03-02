import React from 'react';

const OS_PLATFORMS = [
    {
        id: 'macos',
        name: 'macOS',
        version: 'Apple Silicon & Intel',
        icon: '/assets/mac-os-logo.png',
    },
    {
        id: 'windows',
        name: 'Windows',
        version: 'Windows 10+',
        icon: '/assets/microsoft.png',
    },
    {
        id: 'linux',
        name: 'Linux',
        version: '.AppImage',
        icon: '/assets/linux.png',
    },
];

const OsSupportSection = () => {
    return (
        <section className="bg-primary pt-12 pb-24 border-b border-border/50">
            <div className="enterprise-container text-center">
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-text mb-4 tracking-tight">
                        Works on macOS, Windows, and Linux
                    </h2>
                    <p className="text-text-body text-sm font-medium">
                        Download Godzilla AI for your desktop environment.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {OS_PLATFORMS.map((os) => (
                        <div
                            key={os.id}
                            className="bg-surface border border-border/60 p-8 rounded-[12px] transition-all duration-300 hover:border-accent-blue/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.1)] group flex flex-col items-center"
                        >
                            <div className="mb-6 group-hover:scale-110 transition-transform duration-500">
                                <img
                                    src={os.icon}
                                    alt={os.name}
                                    className="w-12 h-12 object-contain transition-all duration-300"
                                />
                            </div>
                            <h3 className="text-[18px] font-bold text-text mb-2">{os.name}</h3>
                            <p className="label-micro text-text-muted">{os.version}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OsSupportSection;
