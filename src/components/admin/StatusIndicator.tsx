'use client';

import React from 'react';

export function AdminStatusIndicator() {
    return (
        <div className="flex items-center gap-2.5 px-4 border-r border-[#1F2937]">
            <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-20"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                Grid Online
            </span>
        </div>
    );
}
