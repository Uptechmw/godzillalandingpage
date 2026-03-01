'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Shield, Lock, Mail, RefreshCw, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import './login.css';

function AdminLoginContent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectPath = searchParams.get('redirect') || '/admin';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/admin/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                if (data.requires2FA) {
                    router.push('/admin/auth/verify-2fa');
                } else {
                    toast.success('Access Granted');
                    router.push(redirectPath);
                }
            } else {
                setError(data.error || 'Identity verification failed');
                toast.error(data.error || 'Login failed');
            }
        } catch (err) {
            setError('System connectivity issue');
            toast.error('Connection failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-card">
            <div className="login-header">
                <div className="logo-box">
                    <Shield size={32} className="logo-icon" />
                </div>
                <h1 className="login-title">Management Protocol</h1>
                <p className="login-subtitle">Authorization required for system access.</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
                {error && (
                    <div className="error-banner">
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </div>
                )}

                <div className="form-group">
                    <label className="label">Admin Identifier</label>
                    <div className="input-with-icon">
                        <Mail size={18} className="icon" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@domain.com"
                            required
                            disabled={isLoading}
                            className="input"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="label">Cipher Key</label>
                    <div className="input-with-icon">
                        <Lock size={18} className="icon" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            disabled={isLoading}
                            className="input"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`submit-btn ${isLoading ? 'loading' : ''}`}
                >
                    {isLoading ? (
                        <RefreshCw size={18} className="animate-spin" />
                    ) : (
                        'Establish Session'
                    )}
                </button>
            </form>

            <div className="login-footer">
                <p>Secured by Godzilla Hardening Protocol v2.1</p>
            </div>
        </div>
    );
}

export default function AdminLoginPage() {
    return (
        <div className="admin-login-wrapper">
            <Suspense fallback={<div className="login-card animate-pulse h-96 bg-slate-900/50"></div>}>
                <AdminLoginContent />
            </Suspense>

        </div>
    );
}
