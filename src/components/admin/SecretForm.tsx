'use client';

import React, { useState } from 'react';
import {
    Key,
    Eye,
    EyeOff,
    RefreshCw,
    CheckCircle2,
    AlertCircle,
    Send
} from 'lucide-react';
import { toast } from 'sonner';

interface SecretFormProps {
    secretKey: string;
    label: string;
    description?: string;
    isSensitive?: boolean;
}

export function SecretForm({ secretKey, label, description, isSensitive = true }: SecretFormProps) {
    const [value, setValue] = useState('');
    const [isTesting, setIsTesting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showValue, setShowValue] = useState(false);

    const handleTest = async () => {
        setIsTesting(true);
        try {
            // This would call an API route that uses ConnectionTestService
            const res = await fetch('/api/admin/config/test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: secretKey, value })
            });
            const data = await res.json();

            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Failed to run connection test.");
        } finally {
            setIsTesting(false);
        }
    };

    const handleSave = async () => {
        if (!value) return;
        setIsSaving(true);
        try {
            const res = await fetch('/api/admin/config/secrets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: secretKey, value })
            });

            if (res.ok) {
                toast.success(`${label} rotated and archived successfully.`);
                setValue('');
            } else {
                toast.error(`Failed to rotate ${label}.`);
            }
        } catch (error) {
            toast.error("Network error while rotating secret.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="secret-form-card">
            <div className="secret-header">
                <div className="secret-title">
                    <Key size={16} className="text-slate-400" />
                    <span className="font-semibold">{label}</span>
                    <span className="version-badge">v1</span>
                </div>
                <div className="secret-actions">
                    <button
                        className="btn-text"
                        onClick={() => setShowValue(!showValue)}
                        title={showValue ? "Hide" : "Show masked"}
                    >
                        {showValue ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button
                        className={`btn-test ${isTesting ? 'loading' : ''}`}
                        onClick={handleTest}
                        disabled={!value || isTesting}
                    >
                        {isTesting ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
                        <span>Test</span>
                    </button>
                    <button
                        className={`btn-save ${isSaving ? 'loading' : ''}`}
                        onClick={handleSave}
                        disabled={!value || isSaving}
                    >
                        {isSaving ? <RefreshCw size={14} className="animate-spin" /> : <RefreshCw size={14} />}
                        <span>Rotate</span>
                    </button>
                </div>
            </div>

            {description && <p className="secret-description">{description}</p>}

            <div className="input-group">
                <input
                    type={showValue ? 'text' : 'password'}
                    placeholder={isSensitive ? '************' : 'Enter value'}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="secret-input"
                    autoComplete="off"
                />
            </div>

            <style jsx>{`
                .secret-form-card {
                    background-color: #0f172a;
                    border: 1px solid #1e293b;
                    border-radius: 10px;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .secret-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .secret-title {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .version-badge {
                    font-size: 0.65rem;
                    background-color: #1e293b;
                    color: #94a3b8;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-weight: 700;
                    text-transform: uppercase;
                }

                .secret-actions {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .secret-description {
                    font-size: 0.8rem;
                    color: #64748b;
                    line-height: 1.4;
                }

                .input-group {
                    position: relative;
                }

                .secret-input {
                    width: 100%;
                    background-color: #020617;
                    border: 1px solid #334155;
                    border-radius: 6px;
                    padding: 10px 12px;
                    color: #fff;
                    font-size: 0.9rem;
                    outline: none;
                    transition: border-color 0.2s;
                }

                .secret-input:focus {
                    border-color: #3b82f6;
                }

                .btn-text {
                    background: none;
                    border: none;
                    color: #64748b;
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 4px;
                }

                .btn-test {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    background-color: #1e293b;
                    border: 1px solid #334155;
                    color: #94a3b8;
                    padding: 6px 12px;
                    border-radius: 6px;
                    font-size: 0.8rem;
                    cursor: pointer;
                    font-weight: 600;
                }

                .btn-test:hover:not(:disabled) {
                    background-color: #334155;
                    color: #fff;
                }

                .btn-save {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    background-color: #3b82f6;
                    border: none;
                    color: #fff;
                    padding: 6px 14px;
                    border-radius: 6px;
                    font-size: 0.8rem;
                    cursor: pointer;
                    font-weight: 700;
                }

                .btn-save:hover:not(:disabled) {
                    background-color: #2563eb;
                }

                .animate-spin {
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
            `}</style>
        </div>
    );
}
