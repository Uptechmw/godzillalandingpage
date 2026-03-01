'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Key, RefreshCw, AlertCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import '../../login/login.css'; // Reuse login styles

export default function Verify2FAPage() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Focus first input on mount
        const firstInput = document.getElementById('otp-0');
        if (firstInput) firstInput.focus();
    }, []);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return; // Only numbers

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Only last char
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const code = otp.join('');
        if (code.length < 6) {
            toast.error('Please enter the full 6-digit code');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/admin/auth/verify-2fa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otp: code }),
            });

            if (res.ok) {
                toast.success('Identity Confirmed');
                router.push('/admin');
            } else {
                const data = await res.json();
                setError(data.error || 'Invalid authorization code');
                toast.error(data.error || 'Verification failed');
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
                        <Key size={32} className="logo-icon" />
                    </div>
                    <h1 className="login-title">Security Checkpoint</h1>
                    <p className="login-subtitle">A multi-factor authorization code has been dispatched to your secure email.</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    {error && (
                        <div className="error-banner">
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="form-group">
                        <label className="label text-center mb-6">Authorization Code</label>
                        <div className="flex justify-between gap-2 mb-8">
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    id={`otp-${i}`}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(i, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(i, e)}
                                    className="w-12 h-14 bg-slate-900 border border-slate-700 rounded-xl text-center text-xl font-bold text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                    autoComplete="off"
                                />
                            ))}
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
                            'Verify Identity'
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => router.push('/admin/login')}
                        className="w-full mt-4 flex items-center justify-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={12} />
                        Return to Authentication
                    </button>
                </form>

                <div className="login-footer">
                    <p>Secured by Godzilla Hardening Protocol v2.1</p>
                </div>
            </div>
        </div>
    );
}
