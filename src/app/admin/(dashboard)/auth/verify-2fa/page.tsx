'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { KeyRound, Loader2, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminOTPPage() {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length !== 6) return toast.error('Please enter the 6-digit code.');

        setLoading(true);
        try {
            const res = await fetch('/api/admin/auth/verify-2fa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otp }),
            });

            if (res.ok) {
                toast.success('Identity verified. Welcome back.');
                router.push('/admin/analytics');
            } else {
                const data = await res.json();
                toast.error(data.error || 'Invalid or expired code.');
            }
        } catch (err) {
            toast.error('Connection failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="otp-container">
            <div className="otp-card">
                <div className="icon-wrapper">
                    <ShieldCheck size={32} className="icon" />
                </div>
                <h1 className="title">Identify Yourself</h1>
                <p className="description">
                    We've sent a 6-digit security code to your administrative email.
                    Please enter it below to continue.
                </p>

                <form onSubmit={handleSubmit} className="otp-form">
                    <input
                        type="text"
                        placeholder="000000"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        className="otp-input"
                        autoFocus
                    />

                    <button
                        type="submit"
                        disabled={loading || otp.length !== 6}
                        className="submit-btn"
                    >
                        {loading ? <Loader2 size={20} className="animate-spin" /> : 'Verify Access'}
                    </button>
                </form>

                <div className="footer">
                    <p>Code expires in 5 minutes.</p>
                    <button className="resend-link">Request a new code</button>
                </div>
            </div>

            <style jsx>{`
                .otp-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #020617;
                    padding: 24px;
                }

                .otp-card {
                    width: 100%;
                    max-width: 440px;
                    background-color: #0f172a;
                    border: 1px solid #1e293b;
                    border-radius: 16px;
                    padding: 48px 32px;
                    text-align: center;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }

                .icon-wrapper {
                    width: 64px;
                    height: 64px;
                    background-color: rgba(99, 102, 241, 0.1);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 24px;
                }

                .icon {
                    color: #6366f1;
                }

                .title {
                    font-size: 1.75rem;
                    font-weight: 800;
                    color: #f8fafc;
                    margin-bottom: 12px;
                }

                .description {
                    font-size: 0.95rem;
                    color: #94a3b8;
                    line-height: 1.6;
                    margin-bottom: 32px;
                }

                .otp-form {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                .otp-input {
                    height: 64px;
                    background-color: #020617;
                    border: 1px solid #334155;
                    border-radius: 12px;
                    color: #fff;
                    font-size: 2rem;
                    text-align: center;
                    letter-spacing: 0.75em;
                    font-family: monospace;
                    transition: all 0.2s;
                }

                .otp-input:focus {
                    outline: none;
                    border-color: #6366f1;
                    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
                }

                .submit-btn {
                    height: 56px;
                    background-color: #6366f1;
                    color: #fff;
                    border: none;
                    border-radius: 12px;
                    font-size: 1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .submit-btn:hover:not(:disabled) {
                    background-color: #4f46e5;
                    transform: translateY(-2px);
                }

                .submit-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .footer {
                    margin-top: 32px;
                    font-size: 0.85rem;
                    color: #64748b;
                }

                .resend-link {
                    background: none;
                    border: none;
                    color: #6366f1;
                    font-weight: 600;
                    cursor: pointer;
                    padding: 4px;
                    margin-top: 8px;
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
