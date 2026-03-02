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
    Activity,
    Shield,
    X
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

interface AdminSidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/auth/logout?type=admin', { method: 'POST' });
            if (res.ok) {
                toast.success('Logged out successfully');
                router.push('/admin/auth/login');
            } else {
                toast.error('Logout failed');
            }
        } catch (error) {
            toast.error('Network error during logout');
        }
    };

    const groups = ['System', 'Management', 'Security'];

    return (
        <>
            <div
                className={`admin-sidebar-overlay ${isOpen ? 'visible' : ''}`}
                onClick={onClose}
            />
            <aside className={`admin-sidebar ${isOpen ? 'mobile-open' : ''}`}>
                <div className="sidebar-header">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Shield className="text-white w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="logo-text">GODZILLA</span>
                                <span className="logo-subtext">ADMIN CLOUD</span>
                            </div>
                        </div>
                        <button
                            className="lg:hidden p-2 text-slate-500 hover:text-white transition-colors"
                            onClick={onClose}
                        >
                            <X size={18} />
                        </button>
                    </div>
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
                                    onClick={onClose}
                                >
                                    <item.icon size={15} />
                                    <span>{item.name}</span>
                                </Link>
                            ))}
                        </div>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button className="logout-button" onClick={handleLogout}>
                        <LogOut size={14} />
                        <span>Terminate Session</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
