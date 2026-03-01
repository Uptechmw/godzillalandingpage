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

            <style jsx>{`
                .admin-billing-page {
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                }

                .billing-overview {
                    display: flex;
                    flex-direction: column;
                    gap: 40px;
                }

                .section-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 20px;
                }

                .section-title {
                    font-size: 1.1rem;
                    font-weight: 700;
                }

                .product-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 20px;
                }

                .product-card {
                    background-color: #0f172a;
                    border: 1px solid #1e293b;
                    border-radius: 12px;
                    padding: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .product-card.inactive {
                    opacity: 0.6;
                    border-style: dashed;
                }

                .product-meta {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .product-name {
                    font-size: 1rem;
                    font-weight: 700;
                    color: #fff;
                }

                .product-coins {
                    font-size: 0.85rem;
                    color: #94a3b8;
                    font-weight: 600;
                }

                .product-price {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .price-amount {
                    font-size: 1.25rem;
                    font-weight: 800;
                    color: #fff;
                }

                .status-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                }

                .status-dot.active { background-color: #10b981; box-shadow: 0 0 10px #10b9814d; }
                .status-dot.inactive { background-color: #ef4444; }

                .btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    border-radius: 8px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    cursor: pointer;
                }

                .btn-primary { background-color: #3b82f6; color: white; border: none; }
                .btn-secondary { background-color: #0f172a; border: 1px solid #1e293b; color: #94a3b8; }
            `}</style>
        </div>
    );
}
