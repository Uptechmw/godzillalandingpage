'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Shield, Lock, Mail, RefreshCw, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLoginPage() {
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
        <div className="admin-login-wrapper">
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

            <style jsx>{`
                .admin-login-wrapper {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #020617;
                    padding: 24px;
                    color: #f8fafc;
                }
                .login-card {
                    width: 100%;
                    max-width: 420px;
                    background-color: #0f172a;
                    border: 1px solid #1e293b;
                    border-radius: 16px;
                    padding: 48px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }
                .login-header {
                    text-align: center;
                    margin-bottom: 40px;
                }
                .logo-box {
                    width: 64px;
                    height: 64px;
                    background-color: #1e293b;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 24px;
                }
                .logo-icon {
                    color: #3b82f6;
                }
                .login-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 8px;
                    letter-spacing: -0.5px;
                }
                .login-subtitle {
                    color: #94a3b8;
                    font-size: 0.9rem;
                }
                .login-form {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }
                .error-banner {
                    background-color: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.2);
                    color: #f87171;
                    padding: 12px;
                    border-radius: 8px;
                    font-size: 0.85rem;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .label {
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .input-with-icon {
                    position: relative;
                }
                .input-with-icon .icon {
                    position: absolute;
                    left: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #475569;
                }
                .input {
                    width: 100%;
                    background-color: #020617;
                    border: 1px solid #1e293b;
                    border-radius: 8px;
                    padding: 12px 12px 12px 40px;
                    color: #fff;
                    font-size: 0.95rem;
                    outline: none;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .input:focus {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 1px #3b82f6;
                }
                .submit-btn {
                    background-color: #3b82f6;
                    color: #fff;
                    border: none;
                    border-radius: 8px;
                    padding: 14px;
                    font-weight: 700;
                    font-size: 0.95rem;
                    cursor: pointer;
                    transition: background-color 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .submit-btn:hover:not(:disabled) {
                    background-color: #2563eb;
                }
                .submit-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                .login-footer {
                    margin-top: 48px;
                    text-align: center;
                    font-size: 0.75rem;
                    color: #475569;
                    letter-spacing: 0.5px;
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
