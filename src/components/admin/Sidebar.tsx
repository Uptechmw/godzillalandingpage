'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
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
import { toast } from 'sonner';
import './sidebar.css';

const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard, group: 'System' },
    { name: 'Analytics', href: '/admin/analytics', icon: Activity, group: 'System' },
    { name: 'Settings', href: '/admin/settings', icon: Settings, group: 'System' },
    { name: 'Users', href: '/admin/users', icon: Users, group: 'Management' },
    { name: 'AI Models', href: '/admin/models', icon: Zap, group: 'Management' },
    { name: 'Billing', href: '/admin/billing', icon: CreditCard, group: 'Management' },
    { name: 'Audit Logs', href: '/admin/logs', icon: ShieldCheck, group: 'Security' },
];

export function AdminSidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/admin/auth/logout', { method: 'POST' });
            if (res.ok) {
                toast.success('Logged out successfully');
                router.push('/admin/login');
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
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`nav-item${pathname === item.href ? ' active' : ''}`}
                            >
                                <item.icon size={17} />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="logout-button" onClick={handleLogout}>
                    <LogOut size={17} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
