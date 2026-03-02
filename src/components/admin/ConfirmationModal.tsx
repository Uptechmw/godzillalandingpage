'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, ShieldAlert } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
    isLoading?: boolean;
}

export function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm Action',
    cancelText = 'Cancel',
    variant = 'danger',
    isLoading = false
}: ConfirmationModalProps) {
    if (!isOpen) return null;

    const accentColor = variant === 'danger' ? 'text-red-500' : variant === 'warning' ? 'text-amber-500' : 'text-blue-400';
    const bgAccent = variant === 'danger' ? 'bg-red-500/10' : variant === 'warning' ? 'bg-amber-500/10' : 'bg-blue-500/10';
    const borderAccent = variant === 'danger' ? 'border-red-500/20' : variant === 'warning' ? 'border-amber-500/20' : 'border-blue-500/20';

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#000000]/80 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="w-full max-w-md bg-[#111827] border border-[#1F2937] rounded-xl shadow-2xl overflow-hidden"
                >
                    <div className="p-6">
                        <div className="flex items-start justify-between mb-6">
                            <div className={`p-3 rounded-lg ${bgAccent} ${borderAccent} border`}>
                                {variant === 'danger' ? <ShieldAlert className={accentColor} size={20} /> : <AlertTriangle className={accentColor} size={20} />}
                            </div>
                            <button
                                onClick={onClose}
                                className="text-slate-500 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <h3 className="text-lg font-bold text-[#F1F5F9] uppercase tracking-tight mb-2">{title}</h3>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{message}</p>
                    </div>

                    <div className="px-6 py-4 bg-[#0B1220] border-t border-[#1F2937] flex items-center justify-end gap-3">
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-white transition-colors disabled:opacity-50"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className={`px-6 py-2 rounded-lg text-white text-[10px] font-bold uppercase tracking-widest transition-all ${variant === 'danger' ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'} shadow-lg ${variant === 'danger' ? 'shadow-red-600/10' : 'shadow-blue-600/10'} disabled:opacity-50 flex items-center gap-2`}
                        >
                            {isLoading && <RefreshCw size={10} className="animate-spin" />}
                            {confirmText}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

import { RefreshCw } from 'lucide-react';
