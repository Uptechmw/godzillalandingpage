import React from 'react';
import { PageHeader } from '@/components/admin/PageHeader';
import { AdminTransactionTable } from '@/components/admin/TransactionTable';
import { AdminBillingService } from '@/services/admin/billing/admin-billing.service';
import {
    Package,
    Plus,
    Download,
    CreditCard,
    TrendingUp
} from 'lucide-react';

export default async function AdminBillingPage() {
    const products = await AdminBillingService.listProducts();
    const transactions = await AdminBillingService.listTransactions({ limit: 50 });

    return (
        <div className="admin-billing-page">
            <PageHeader
                title="Billing & Token Products"
                subtitle="Manage token packages, pricing, and monitor global revenue transactions."
            >
                <button className="btn btn-secondary">
                    <Download size={18} />
                    <span>Export Ledger</span>
                </button>
                <button className="btn btn-primary">
                    <Plus size={18} />
                    <span>New Product</span>
                </button>
            </PageHeader>

            <div className="billing-overview">
                <section className="product-section">
                    <div className="section-header">
                        <Package size={20} className="text-blue-400" />
                        <h3 className="section-title">Token Products</h3>
                    </div>
                    <div className="product-grid">
                        {(products as any[]).map((product: any) => (
                            <div key={product.id} className={`product-card ${product.active ? '' : 'inactive'}`}>
                                <div className="product-meta">
                                    <span className="product-name">{product.name}</span>
                                    <span className="product-coins">{product.coins.toLocaleString()} Coins</span>
                                </div>
                                <div className="product-price">
                                    <span className="price-amount">${product.priceAmount}</span>
                                    <span className={`status-dot ${product.active ? 'active' : 'inactive'}`}></span>
                                </div>
                            </div>
                        ))}
                        {products.length === 0 && <p className="empty-text">No active products.</p>}
                    </div>
                </section>

                <section className="transaction-section">
                    <div className="section-header">
                        <TrendingUp size={20} className="text-emerald-400" />
                        <h3 className="section-title">Recent Ledger</h3>
                    </div>
                    <AdminTransactionTable transactions={transactions as any} />
                </section>
            </div>
        </div>
    );
}
