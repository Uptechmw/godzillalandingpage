import React from 'react';
import { Monitor, Cpu, Terminal } from 'lucide-react';

const OS_PLATFORMS = [
    {
        id: 'macos',
        name: 'macOS',
        version: 'Apple Silicon & Intel',
        icon: <Cpu className="w-8 h-8" />,
    },
    {
        id: 'windows',
        name: 'Windows',
        version: 'Windows 10+',
        icon: <Monitor className="w-8 h-8" />,
    },
    {
        id: 'linux',
        name: 'Linux',
        version: '.AppImage',
        icon: <Terminal className="w-8 h-8" />,
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
                            className="bg-[#0F1B2E] border border-[#1F2A44] p-8 rounded-[10px] transition-all duration-300 hover:border-accent-blue hover:shadow-[0_0_30px_rgba(37,99,235,0.1)] group flex flex-col items-center"
                        >
                            <div className="text-accent-blue mb-6 group-hover:scale-110 transition-transform duration-300">
                                {os.icon}
                            </div>
                            <h3 className="text-[18px] font-bold text-text mb-2">{os.name}</h3>
                            <p className="label-micro text-text-faint">{os.version}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OsSupportSection;
