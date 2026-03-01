import React from 'react';
import { PageHeader } from '@/components/admin/PageHeader';
import { AdminAuditLogTable } from '@/components/admin/AuditLogTable';
import { AdminAuditLogService } from '@/services/admin/logs/audit-log.service';
import { Filter, Search, Download } from 'lucide-react';

export default async function AdminLogsPage() {
    const logs = await AdminAuditLogService.listLogs({ limit: 100 });

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <PageHeader
                title="Audit Ledger"
                subtitle="High-integrity cryptographic record of all administrative interactions and system-wide state changes."
            >
                <button className="px-5 py-2.5 bg-[#1F2937] hover:bg-[#374151] border border-[#374151] rounded-xl text-xs font-black uppercase tracking-widest text-white transition-all flex items-center gap-2 group">
                    <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
                    <span>Export Ledger</span>
                </button>
            </PageHeader>

            {/* Filter Terminal */}
            <div className="p-1 bg-[#111827] border border-[#1F2937] rounded-2xl flex flex-col md:flex-row items-stretch md:items-center gap-1 shadow-xl">
                <div className="flex-1 relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors">
                        <Search size={16} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by Admin, Action or ID..."
                        className="w-full bg-transparent border-none focus:ring-0 py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 font-medium"
                    />
                </div>

                <div className="h-px md:h-8 w-full md:w-px bg-[#1F2937] mx-1" />

                <div className="flex items-center gap-1 p-1">
                    <select className="bg-[#1F2937]/50 border border-[#374151] rounded-xl py-2 px-4 text-[10px] font-black uppercase tracking-wider text-slate-300 focus:ring-0 focus:border-blue-500/50 outline-none cursor-pointer">
                        <option value="">All Security Modules</option>
                        <option value="USERS">User Repository</option>
                        <option value="SETTINGS">Core Config</option>
                        <option value="AI_MODELS">Neural Engine</option>
                        <option value="BILLING">Fiscal Layer</option>
                    </select>

                    <button className="p-2.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl hover:bg-blue-500/20 transition-all">
                        <Filter size={16} />
                    </button>
                </div>
            </div>

            <AdminAuditLogTable logs={logs as any} />

            <div className="flex items-center justify-between px-2 pt-4">
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">Showing latest 100 entries</p>
                <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-[#111827] border border-[#1F2937] rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-500 opacity-50 cursor-not-allowed">Previous</button>
                    <button className="px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-[10px] font-black uppercase tracking-widest text-white hover:bg-[#374151] transition-all">Next Page</button>
                </div>
            </div>
        </div>
    );
}
