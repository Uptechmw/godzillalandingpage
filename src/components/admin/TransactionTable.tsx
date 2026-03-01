import React from 'react';
import {
    ArrowUpRight,
    ArrowDownLeft,
    User,
    Clock,
    Coins,
    CheckCircle2,
    XCircle,
    Info
} from 'lucide-react';

interface Transaction {
    id: string;
    type: string;
    amount: number;
    description: string;
    createdAt: Date;
    user: {
        email: string;
    };
}

interface AdminTransactionTableProps {
    transactions: Transaction[];
}

export function AdminTransactionTable({ transactions }: AdminTransactionTableProps) {
    return (
        <div className="transaction-table-container">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>User</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th className="text-right">ID</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="empty-row">No transactions found.</td>
                        </tr>
                    ) : (
                        transactions.map((tx) => (
                            <tr key={tx.id}>
                                <td>
                                    <div className="time-cell">
                                        <Clock size={14} className="text-slate-500" />
                                        <span>{new Date(tx.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="user-cell">
                                        <User size={14} />
                                        <span>{tx.user.email}</span>
                                    </div>
                                </td>
                                <td>
                                    <span className={`type-badge ${tx.type.toLowerCase()}`}>
                                        {tx.amount > 0 ? <ArrowDownLeft size={12} /> : <ArrowUpRight size={12} />}
                                        {tx.type}
                                    </span>
                                </td>
                                <td>
                                    <div className={`amount-cell ${tx.amount > 0 ? 'credit' : 'debit'}`}>
                                        <Coins size={14} />
                                        <span>{tx.amount > 0 ? `+${tx.amount}` : tx.amount}</span>
                                    </div>
                                </td>
                                <td>
                                    <span className="tx-desc">{tx.description}</span>
                                </td>
                                <td className="text-right">
                                    <code className="tx-id">{tx.id.substring(0, 8)}...</code>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <style jsx>{`
                .transaction-table-container {
                    display: flex;
                    flex-direction: column;
                }

                .admin-table {
                    width: 100%;
                    border-collapse: collapse;
                    background-color: #0f172a;
                    border: 1px solid #1e293b;
                    border-radius: 12px;
                    overflow: hidden;
                }

                th {
                    text-align: left;
                    padding: 12px 20px;
                    background-color: #1e293b;
                    color: #94a3b8;
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                }

                td {
                    padding: 14px 20px;
                    border-bottom: 1px solid #1e293b;
                    font-size: 0.85rem;
                }

                .text-right { text-align: right; }

                .time-cell, .user-cell {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #94a3b8;
                }

                .user-cell span {
                    color: #f8fafc;
                    font-weight: 500;
                }

                .type-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 0.7rem;
                    font-weight: 700;
                    background-color: #1e293b;
                    color: #f8fafc;
                }

                .amount-cell {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-weight: 700;
                }

                .amount-cell.credit { color: #10b981; }
                .amount-cell.debit { color: #ef4444; }

                .tx-desc {
                    color: #94a3b8;
                    font-size: 0.8rem;
                }

                .tx-id {
                    font-family: monospace;
                    color: #64748b;
                    font-size: 0.75rem;
                }

                .empty-row {
                    text-align: center;
                    padding: 48px;
                    color: #64748b;
                }
            `}</style>
        </div>
    );
}
