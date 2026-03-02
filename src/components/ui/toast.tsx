'use client';

import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { Severity } from '@/lib/errorMap';

interface Toast {
    id: string;
    message: string;
    severity: Severity;
    requestId?: string;
    persistent?: boolean;
}

interface ToastContextType {
    addToast: (toast: Omit<Toast, 'id'>) => void;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => {
            const next = [...prev, { ...toast, id }];
            if (next.length > 3) return next.slice(1); // Max 3 toasts
            return next;
        });

        if (!toast.persistent) {
            setTimeout(() => removeToast(id), 5000);
        }
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && toasts.length > 0) {
                removeToast(toasts[toasts.length - 1].id);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [toasts, removeToast]);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        role={toast.severity === 'error' ? 'alert' : 'status'}
                        className={`pointer-events-auto min-w-[300px] max-w-md p-4 rounded-lg shadow-lg border transition-all transform animate-in slide-in-from-right ${toast.severity === 'error' ? 'bg-red-950/90 border-red-500/50 text-red-100' :
                                toast.severity === 'warning' ? 'bg-amber-950/90 border-amber-500/50 text-amber-100' :
                                    toast.severity === 'success' ? 'bg-green-950/90 border-green-500/50 text-green-100' :
                                        'bg-slate-900/90 border-slate-700 text-slate-100'
                            }`}
                    >
                        <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                                <p className="font-medium">{toast.message}</p>
                                {toast.requestId && (
                                    <p className="text-xs opacity-60 mt-1 font-mono">Reference: {toast.requestId}</p>
                                )}
                            </div>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="opacity-60 hover:opacity-100 transition-opacity"
                                aria-label="Dismiss"
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within ToastProvider');
    return context;
};

// Singleton-ish wrapper for use outside React components (e.g. in api-client.ts)
export let toastNotify = (toast: Omit<Toast, 'id'>) => {
    console.warn('ToastProvider not initialized');
};

export const ToastInitializer = () => {
    const { addToast } = useToast();
    useEffect(() => {
        toastNotify = addToast;
    }, [addToast]);
    return null;
};
