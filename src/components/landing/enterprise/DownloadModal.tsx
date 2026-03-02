'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Apple, Monitor, Terminal, Download, ArrowRight } from 'lucide-react';

interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const OS_OPTIONS = [
    {
        id: 'macos',
        name: 'macOS',
        version: 'Apple Silicon & Intel',
        file: 'godzillaai-macos.dmg',
        icon: <Apple className="w-6 h-6" />,
        ext: '.dmg',
    },
    {
        id: 'windows',
        name: 'Windows',
        version: '64-bit installer',
        file: 'godzillaai-windows.exe',
        icon: <Monitor className="w-6 h-6" />,
        ext: '.exe',
    },
    {
        id: 'linux',
        name: 'Linux',
        version: 'AppImage',
        file: 'godzillaai-linux.AppImage',
        icon: <Terminal className="w-6 h-6" />,
        ext: '.AppImage',
    },
];

const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
    const [detectedOs, setDetectedOs] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const ua = window.navigator.userAgent.toLowerCase();
            if (ua.includes('mac')) setDetectedOs('macos');
            else if (ua.includes('win')) setDetectedOs('windows');
            else if (ua.includes('linux')) setDetectedOs('linux');
        }
    }, []);

    const handleDownload = (osFile: string) => {
        window.location.href = `/downloads/${osFile}`;
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-all"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[101] p-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-[560px] bg-[#0F172A] border border-[#1F2A44] rounded-xl shadow-2xl p-8 lg:p-10 pointer-events-auto relative overflow-hidden"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 text-text-faint hover:text-text transition-colors"
                                title="Close"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Modal Header */}
                            <div className="mb-10 text-left">
                                <h2 className="text-2xl font-bold text-[#F9FAFB] tracking-tight mb-2">
                                    Download Godzilla AI
                                </h2>
                                <p className="text-[#9CA3AF] text-sm font-medium">
                                    Choose your operating system.
                                </p>
                            </div>

                            {/* OS Selection Cards */}
                            <div className="space-y-4">
                                {OS_OPTIONS.map((os) => (
                                    <button
                                        key={os.id}
                                        onClick={() => handleDownload(os.file)}
                                        className={`w-full group flex items-center justify-between p-5 border rounded-lg transition-all duration-300 transform active:scale-[0.99] text-left ${detectedOs === os.id
                                                ? 'bg-[#1E293B]/40 border-accent-blue shadow-[0_0_20px_rgba(37,99,235,0.05)]'
                                                : 'bg-[#0F1B2E] border-[#1F2A44] hover:border-accent-blue/40 hover:bg-[#1E293B]/20'
                                            }`}
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className={`w-12 h-12 flex items-center justify-center rounded-lg transition-colors border ${detectedOs === os.id
                                                    ? 'bg-accent-blue border-accent-blue text-white'
                                                    : 'bg-[#0F172A] border-[#1F2A44] text-text-faint group-hover:text-accent-blue group-hover:border-accent-blue/30'
                                                }`}>
                                                {os.icon}
                                            </div>

                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[17px] font-bold text-[#F9FAFB] tracking-tight">
                                                        {os.name}
                                                    </span>
                                                    {detectedOs === os.id && (
                                                        <span className="px-2 py-0.5 bg-accent-blue/10 text-accent-blue text-[10px] font-bold uppercase tracking-wider rounded border border-accent-blue/20">
                                                            Recommended
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-[13px] text-[#9CA3AF] font-medium mt-0.5">
                                                    {os.version} • {os.ext}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                                            <Download className="w-5 h-5 text-accent-blue" />
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Modal Footer */}
                            <div className="mt-10 pt-8 border-t border-[#1F2A44] flex items-center justify-between">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#4B5563]">
                                    INDUSTRIAL INFRASTRUCTURE v2.4.1
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-success rounded-full"></span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-success">
                                        Verified Secure
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default DownloadModal;
