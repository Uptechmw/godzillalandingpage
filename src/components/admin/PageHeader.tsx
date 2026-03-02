'use client';

import React from 'react';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
}

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
    return (
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#1F2937]/50">
            <div className="space-y-1">
                <h2 className="text-xl font-bold text-[#F1F5F9] uppercase tracking-tight">{title}</h2>
                {subtitle && <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.1em]">{subtitle}</p>}
            </div>
            {children && <div className="flex items-center gap-3">{children}</div>}
        </header>
    );
}
