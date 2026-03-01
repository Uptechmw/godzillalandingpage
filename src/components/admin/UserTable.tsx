'use client';
import React from 'react';
import {
    MoreVertical,
    Shield,
    ShieldOff,
    Coins,
    Search,
    Filter
} from 'lucide-react';

interface User {
    id: string;
    email: string;
    status: string;
    createdAt: Date;
    tokenBalance?: { coins: number } | null;
    _count: {
        transactions: number;
        tokenReservations: number;
    };
}

interface AdminUserTableProps {
    users: User[];
}

export function AdminUserTable({ users }: AdminUserTableProps) {
    return (
        <div className="admin-user-table-container">
            <div className="table-actions">
                <div className="search-bar">
                    <Search size={18} />
                    <input type="text" placeholder="Search by email..." />
                </div>
                <button className="filter-button">
                    <Filter size={18} />
                    <span>Filter</span>
                </button>
            </div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Status</th>
                        <th>Balance</th>
                        <th>Activity</th>
                        <th>Joined</th>
                        <th className="text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="empty-row">No users found.</td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <div className="user-cell">
                                        <div className="user-avatar">
                                            {user.email[0].toUpperCase()}
                                        </div>
                                        <div className="user-meta">
                                            <span className="user-email">{user.email}</span>
                                            <span className="user-id">{user.id}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className={`status-badge ${user.status.toLowerCase()}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="balance-cell">
                                        <Coins size={14} />
                                        <span>{user.tokenBalance?.coins || 0}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="activity-cell">
                                        <span>{user._count.transactions} txns</span>
                                        <span className="subtext">{user._count.tokenReservations} requests</span>
                                    </div>
                                </td>
                                <td>
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="text-right">
                                    <button className="action-menu-button">
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <style jsx>{`
                .admin-user-table-container {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .table-actions {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .search-bar {
                    flex: 1;
                    max-width: 320px;
                    background-color: #0f172a;
                    border: 1px solid #1e293b;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    padding: 0 12px;
                    gap: 10px;
                    color: #64748b;
                }

                .search-bar input {
                    background: none;
                    border: none;
                    height: 36px;
                    width: 100%;
                    color: #f8fafc;
                    font-size: 0.9rem;
                    outline: none;
                }

                .filter-button {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 0 16px;
                    height: 38px;
                    background-color: #0f172a;
                    border: 1px solid #1e293b;
                    border-radius: 8px;
                    color: #94a3b8;
                    cursor: pointer;
                    font-size: 0.85rem;
                    transition: all 0.2s;
                }

                .filter-button:hover {
                    background-color: #1e293b;
                    color: #f8fafc;
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
                    letter-spacing: 0.5px;
                }

                td {
                    padding: 16px 20px;
                    border-bottom: 1px solid #1e293b;
                    font-size: 0.9rem;
                }

                .text-right { text-align: right; }

                .empty-row {
                    text-align: center;
                    padding: 48px;
                    color: #64748b;
                }

                .user-cell {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .user-avatar {
                    width: 32px;
                    height: 32px;
                    background-color: #334155;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 0.8rem;
                }

                .user-meta {
                    display: flex;
                    flex-direction: column;
                }

                .user-email {
                    font-weight: 500;
                    color: #f8fafc;
                }

                .user-id {
                    font-size: 0.75rem;
                    color: #64748b;
                }

                .status-badge {
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 0.7rem;
                    font-weight: 700;
                    text-transform: uppercase;
                }

                .status-badge.active {
                    background-color: #10b9811a;
                    color: #10b981;
                }

                .status-badge.disabled {
                    background-color: #f59e0b1a;
                    color: #f59e0b;
                }

                .status-badge.banned {
                    background-color: #ef44441a;
                    color: #ef4444;
                }

                .balance-cell {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    color: #f8fafc;
                    font-weight: 600;
                }

                .activity-cell {
                    display: flex;
                    flex-direction: column;
                }

                .activity-cell .subtext {
                    font-size: 0.75rem;
                    color: #64748b;
                }

                .action-menu-button {
                    background: none;
                    border: none;
                    color: #64748b;
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 4px;
                }

                .action-menu-button:hover {
                    background-color: #1e293b;
                    color: #f8fafc;
                }
            `}</style>
        </div>
    );
}
