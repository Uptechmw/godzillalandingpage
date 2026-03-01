'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Zap,
    CreditCard,
    Settings,
    ShieldCheck,
    LogOut,
    Activity,
    Lock
} from 'lucide-react';
import { toast } from 'sonner';

const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard, group: 'System' },
    { name: 'Users', href: '/admin/users', icon: Users, group: 'Management' },
    { name: 'AI Models', href: '/admin/models', icon: Zap, group: 'Management' },
    { name: 'Billing', href: '/admin/billing', icon: CreditCard, group: 'Management' },
    { name: 'Settings', href: '/admin/settings', icon: Settings, group: 'System' },
    { name: 'Audit Logs', href: '/admin/logs', icon: ShieldCheck, group: 'Security' },
];

export function AdminSidebar() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/admin/auth/logout', { method: 'POST' });
            if (res.ok) {
                toast.success('Logged out successfully');
                router.push('/auth/login');
            } else {
                toast.error('Logout failed');
            }
        } catch (error) {
            toast.error('Network error during logout');
        }
    };

    const groups = ['System', 'Management', 'Security'];

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-header">
                <span className="logo-text">GODZILLA</span>
                <span className="logo-subtext">CORE ADMIN</span>
            </div>

            <nav className="sidebar-nav">
                {groups.map(group => (
                    <div key={group} className="nav-group">
                        <div className="group-label">{group}</div>
                        {navItems.filter(item => item.group === group).map((item) => (
                            <Link key={item.name} href={item.href} className="nav-item">
                                <item.icon size={18} />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="logout-button" onClick={handleLogout}>
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>
            </div>

            <style jsx>{`
                .admin-sidebar {
                    width: 260px;
                    height: 100vh;
                    background-color: #020617;
                    border-right: 1px solid #1e293b;
                    display: flex;
                    flex-direction: column;
                    flex-shrink: 0;
                    position: sticky;
                    top: 0;
                }

                .sidebar-header {
                    padding: 32px 24px;
                    display: flex;
                    flex-direction: column;
                }

                .logo-text {
                    font-size: 1.1rem;
                    font-weight: 900;
                    letter-spacing: 1px;
                    color: #fff;
                }

                .logo-subtext {
                    font-size: 0.65rem;
                    font-weight: 700;
                    color: #64748b;
                    letter-spacing: 2px;
                    margin-top: 4px;
                    text-transform: uppercase;
                }

                .sidebar-nav {
                    flex: 1;
                    padding: 0 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                    overflow-y: auto;
                }

                .nav-group {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .group-label {
                    padding: 0 12px;
                    font-size: 0.65rem;
                    font-weight: 700;
                    color: #475569;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 8px;
                }

                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 10px 12px;
                    color: #94a3b8;
                    text-decoration: none;
                    font-size: 0.85rem;
                    font-weight: 500;
                    border-radius: 6px;
                    transition: all 0.2s;
                }

                .nav-item:hover {
                    background-color: #0f172a;
                    color: #f8fafc;
                }

                .sidebar-footer {
                    padding: 24px 16px;
                    border-top: 1px solid #1e293b;
                }

                .logout-button {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px;
                    background-color: transparent;
                    border: 1px solid #1e293b;
                    color: #94a3b8;
                    cursor: pointer;
                    font-size: 0.85rem;
                    font-weight: 600;
                    border-radius: 8px;
                    transition: all 0.2s;
                }

                .logout-button:hover {
                    background-color: #ef444410;
                    color: #ef4444;
                    border-color: #ef444430;
                }
            `}</style>
        </aside>
    );
}
