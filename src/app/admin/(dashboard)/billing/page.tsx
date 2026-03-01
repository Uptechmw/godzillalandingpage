import { AdminBillingService } from '@/services/admin/billing/admin-billing.service';
import { BillingProductManager } from '@/components/admin/BillingProductManager';
import { AdminTransactionTable } from '@/components/admin/TransactionTable';
import {
    TrendingUp,
    Download
} from 'lucide-react';

export default async function AdminBillingPage() {
    const products = await AdminBillingService.listProducts();
    const transactions = await AdminBillingService.listTransactions({ limit: 50 });

    return (
        <div className="admin-billing-page max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
            <header className="mb-12 bg-[#111827] p-8 lg:p-12 rounded-[2.5rem] border border-[#1F2937] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full -mr-20 -mt-20 group-hover:bg-blue-600/10 transition-all duration-700" />

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-black text-white mb-3 tracking-tight uppercase">FINANCIAL OPERATIONS</h1>
                        <p className="text-xs lg:text-sm text-slate-500 font-bold uppercase tracking-[0.2em]">Compute Economy & Revenue Ledger Control</p>
                    </div>

                    <button className="px-6 py-3 bg-[#1F2937] hover:bg-[#374151] text-white rounded-2xl border border-[#374151] text-xs font-black transition-all flex items-center gap-2 group/btn">
                        <Download size={16} className="group-hover/btn:translate-y-0.5 transition-transform" />
                        EXPORT LEDGER
                    </button>
                </div>
            </header>

            <div className="space-y-16">
                <section className="product-section animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <BillingProductManager initialProducts={products as any[]} />
                </section>

                <section className="transaction-section pt-16 border-t border-[#1F2937] animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="section-header flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                            <TrendingUp size={20} />
                        </div>
                        <div>
                            <h3 className="text-white font-black text-xl tracking-tight uppercase">Global Transaction Feed</h3>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Real-time revenue & credit events</p>
                        </div>
                    </div>
                    <AdminTransactionTable transactions={transactions as any} />
                </section>
            </div>
        </div>
    );
}
