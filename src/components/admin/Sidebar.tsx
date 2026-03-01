import React from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    Users,
    Zap,
    CreditCard,
    Settings,
    ShieldCheck,
    LogOut,
    Activity
} from 'lucide-react';

const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'AI Models', href: '/admin/models', icon: Zap },
    { name: 'Billing', href: '/admin/billing', icon: CreditCard },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
    { name: 'Audit Logs', href: '/admin/logs', icon: ShieldCheck },
];

export function AdminSidebar() {
    return (
        <aside className="admin-sidebar">
            <div className="sidebar-header">
                <span className="logo-text">GODZILLA</span>
                <span className="logo-subtext">ADMIN</span>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <Link key={item.name} href={item.href} className="nav-item">
                        <item.icon size={18} />
                        <span>{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="logout-button">
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>

            <style jsx>{`
                .admin-sidebar {
                    width: 240px;
                    height: 100vh;
                    background-color: #0f172a;
                    border-right: 1px solid #1e293b;
                    display: flex;
                    flex-direction: column;
                    flex-shrink: 0;
                }

                .sidebar-header {
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .logo-text {
                    font-size: 1.2rem;
                    font-weight: 800;
                    letter-spacing: 2px;
                    color: #f8fafc;
                }

                .logo-subtext {
                    font-size: 0.7rem;
                    font-weight: 600;
                    color: #94a3b8;
                    letter-spacing: 1px;
                }

                .sidebar-nav {
                    flex: 1;
                    padding: 12px;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 10px 12px;
                    color: #94a3b8;
                    text-decoration: none;
                    font-size: 0.9rem;
                    border-radius: 6px;
                    transition: all 0.2s;
                }

                .nav-item:hover {
                    background-color: #1e293b;
                    color: #f8fafc;
                }

                .sidebar-footer {
                    padding: 12px;
                    border-top: 1px solid #1e293b;
                }

                .logout-button {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 10px 12px;
                    background: none;
                    border: none;
                    color: #94a3b8;
                    cursor: pointer;
                    font-size: 0.9rem;
                    border-radius: 6px;
                    transition: all 0.2s;
                }

                .logout-button:hover {
                    background-color: #ef44441a;
                    color: #ef4444;
                }
            `}</style>
        </aside>
    );
}
