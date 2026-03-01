import React from 'react';
import { PageHeader } from '@/components/admin/PageHeader';
import { AdminModelTable } from '@/components/admin/ModelTable';
import { AdminModelService } from '@/services/admin/ai/admin-model.service';
import { RefreshCw, ZapOff, Zap } from 'lucide-react';

export default async function AdminModelsPage() {
    const models = await AdminModelService.listModels();

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <PageHeader
                title="Neural Registry"
                subtitle="Global overrides and provider limits for the core AI orchestration layer."
            >
                <button className="px-5 py-2.5 bg-[#1F2937] hover:bg-[#374151] border border-[#374151] rounded-xl text-xs font-black uppercase tracking-widest text-white transition-all flex items-center gap-2 group">
                    <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                    <span>Sync Models</span>
                </button>
                <button className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 border border-rose-400/50 rounded-xl text-xs font-black uppercase tracking-widest text-white transition-all flex items-center gap-2 shadow-lg shadow-rose-500/20 group">
                    <ZapOff size={14} className="group-hover:scale-110 transition-transform" />
                    <span>Kill Switch</span>
                </button>
            </PageHeader>

            <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 flex items-start gap-4 group">
                <div className="p-2.5 bg-amber-500/20 rounded-xl text-amber-500">
                    <Zap size={20} className="animate-pulse" />
                </div>
                <div>
                    <h4 className="text-sm font-black text-amber-500 uppercase tracking-widest mb-1">Active Neural Override</h4>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">
                        Configuration changes made here are pushed in real-time to the AI broker.
                        Ensure all limits are validated against provider quotas before applying custom overrides.
                    </p>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full -mr-16 -mt-16" />
            </div>

            <AdminModelTable models={models} />

            <div className="flex items-center gap-4 px-2">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Broker Latency: 42ms</span>
                </div>
                <div className="flex items-center gap-2 border-l border-[#1F2937] pl-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Uptime: 99.99%</span>
                </div>
            </div>
        </div>
    );
}
