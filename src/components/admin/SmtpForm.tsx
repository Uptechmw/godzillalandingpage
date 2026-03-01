'use client';

import React, { useState, useEffect } from 'react';
import { Mail, ShieldCheck, RefreshCw, Send, Save, Server } from 'lucide-react';
import { toast } from 'sonner';

export function SmtpForm() {
    const [config, setConfig] = useState({
        host: '',
        port: '587',
        secure: false,
        username: '',
        password: '',
        fromName: '',
        fromEmail: ''
    });
    const [isTesting, setIsTesting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load existing settings on mount
        async function loadSettings() {
            try {
                const res = await fetch('/api/admin/config/smtp');
                if (res.ok) {
                    const data = await res.json();
                    if (data.config) {
                        setConfig(data.config);
                    }
                }
            } catch (error) {
                console.error('Failed to load SMTP settings');
            } finally {
                setIsLoading(false);
            }
        }
        loadSettings();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setConfig(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleTest = async () => {
        setIsTesting(true);
        try {
            const res = await fetch('/api/admin/config/test-smtp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });
            const data = await res.json();
            if (data.success) {
                toast.success('SMTP Connection Successful');
            } else {
                toast.error(data.message || 'SMTP Connection Failed');
            }
        } catch (error) {
            toast.error('Failed to run SMTP test');
        } finally {
            setIsTesting(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/admin/config/smtp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });
            if (res.ok) {
                toast.success('SMTP Configuration Saved and Encrypted');
            } else {
                toast.error('Failed to save SMTP configuration');
            }
        } catch (error) {
            toast.error('Network error while saving SMTP config');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="animate-pulse h-64 bg-slate-900/50 rounded-xl"></div>;

    return (
        <div className="smtp-form-container">
            <div className="smtp-grid">
                <div className="form-group span-2">
                    <label className="label">SMTP Host</label>
                    <div className="input-wrapper">
                        <Server size={16} className="input-icon" />
                        <input
                            name="host"
                            value={config.host}
                            onChange={handleChange}
                            placeholder="smtp.example.com"
                            className="input-with-icon"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="label">Port</label>
                    <input
                        name="port"
                        value={config.port}
                        onChange={handleChange}
                        placeholder="587"
                        className="input"
                    />
                </div>

                <div className="form-group flex-row">
                    <label className="label checkbox-label">
                        <input
                            type="checkbox"
                            name="secure"
                            checked={config.secure}
                            onChange={handleChange}
                        />
                        <span>Secure (SSL/TLS)</span>
                    </label>
                </div>

                <div className="form-group">
                    <label className="label">Username</label>
                    <input
                        name="username"
                        value={config.username}
                        onChange={handleChange}
                        placeholder="user@example.com"
                        className="input"
                        autoComplete="off"
                    />
                </div>

                <div className="form-group">
                    <label className="label">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={config.password}
                        onChange={handleChange}
                        placeholder="••••••••••••"
                        className="input"
                        autoComplete="off"
                    />
                </div>

                <div className="form-group">
                    <label className="label">From Name</label>
                    <input
                        name="fromName"
                        value={config.fromName}
                        onChange={handleChange}
                        placeholder="Godzilla Support"
                        className="input"
                    />
                </div>

                <div className="form-group">
                    <label className="label">From Email</label>
                    <input
                        name="fromEmail"
                        value={config.fromEmail}
                        onChange={handleChange}
                        placeholder="noreply@godzilla.ai"
                        className="input"
                    />
                </div>
            </div>

            <div className="form-actions">
                <button
                    className={`btn btn-secondary ${isTesting ? 'loading' : ''}`}
                    onClick={handleTest}
                    disabled={isTesting || !config.host}
                >
                    {isTesting ? <RefreshCw className="animate-spin" size={16} /> : <Send size={16} />}
                    <span>Test Gateway</span>
                </button>
                <button
                    className={`btn btn-primary ${isSaving ? 'loading' : ''}`}
                    onClick={handleSave}
                    disabled={isSaving || !config.host}
                >
                    {isSaving ? <RefreshCw className="animate-spin" size={16} /> : <Save size={16} />}
                    <span>Apply Settings</span>
                </button>
            </div>

            <style jsx>{`
                .smtp-form-container {
                    background-color: #020617;
                    border: 1px solid #1e293b;
                    border-radius: 12px;
                    padding: 32px;
                }
                .smtp-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 24px;
                }
                .span-2 {
                    grid-column: span 2;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .flex-row {
                    flex-direction: row;
                    align-items: center;
                    padding-top: 24px;
                }
                .label {
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .checkbox-label {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    text-transform: none;
                    color: #f8fafc;
                    font-size: 0.85rem;
                }
                .input-wrapper {
                    position: relative;
                }
                .input-icon {
                    position: absolute;
                    left: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #475569;
                }
                .input, .input-with-icon {
                    width: 100%;
                    background-color: #0f172a;
                    border: 1px solid #1e293b;
                    border-radius: 8px;
                    padding: 12px;
                    color: #fff;
                    font-size: 0.9rem;
                    outline: none;
                    transition: border-color 0.2s;
                }
                .input-with-icon {
                    padding-left: 40px;
                }
                .input:focus, .input-with-icon:focus {
                    border-color: #3b82f6;
                }
                .form-actions {
                    margin-top: 32px;
                    display: flex;
                    justify-content: flex-end;
                    gap: 16px;
                    padding-top: 24px;
                    border-top: 1px solid #1e293b;
                }
                .btn {
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: all 0.2s;
                    border: none;
                }
                .btn-primary {
                    background-color: #3b82f6;
                    color: #fff;
                }
                .btn-primary:hover {
                    background-color: #2563eb;
                }
                .btn-secondary {
                    background-color: transparent;
                    color: #94a3b8;
                    border: 1px solid #1e293b;
                }
                .btn-secondary:hover {
                    background-color: #0f172a;
                    color: #fff;
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
