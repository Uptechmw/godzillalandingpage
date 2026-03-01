import React from 'react';
import { PageHeader } from '@/components/admin/PageHeader';
import { SecretForm } from '@/components/admin/SecretForm';
import {
    Mail,
    Cpu,
    CreditCard,
    Globe,
    ShieldAlert
} from 'lucide-react';

export default async function AdminSettingsPage() {
    return (
        <div className="admin-settings-page">
            <PageHeader
                title="System Settings"
                subtitle="Configure site-wide parameters and managed encrypted secrets."
            />

            <div className="settings-container">
                <section className="settings-section">
                    <div className="section-info">
                        <Cpu size={20} className="text-blue-400" />
                        <h3 className="section-title">AI Provider Keys</h3>
                        <p className="section-desc">Manage API credentials for LLM providers. These are encrypted at rest.</p>
                    </div>
                    <div className="section-content">
                        <SecretForm
                            secretKey="GEMINI_API_KEY"
                            label="Google Gemini API Key"
                            description="Used for gemini-1.5-pro and gemini-1.5-flash models."
                        />
                        <SecretForm
                            secretKey="ANTHROPIC_API_KEY"
                            label="Anthropic Claude API Key"
                            description="Used for claude-3-opus, sonnet, and haiku models."
                        />
                    </div>
                </section>

                <div className="divider"></div>

                <section className="settings-section">
                    <div className="section-info">
                        <Mail size={20} className="text-emerald-400" />
                        <h3 className="section-title">SMTP Configuration</h3>
                        <p className="section-desc">Email settings for transactional emails like password resets and notifications.</p>
                    </div>
                    <div className="section-content">
                        <SecretForm
                            secretKey="SMTP_PASSWORD"
                            label="SMTP Password / App Password"
                            description="Encrypted password for the SMTP server."
                        />
                    </div>
                </section>

                <div className="divider"></div>

                <section className="settings-section">
                    <div className="section-info">
                        <CreditCard size={20} className="text-amber-400" />
                        <h3 className="section-title">Payment Gateways</h3>
                        <p className="section-desc">Configure API keys and webhook secrets for payment providers.</p>
                    </div>
                    <div className="section-content">
                        <SecretForm
                            secretKey="STRIPE_SECRET_KEY"
                            label="Stripe Secret Key"
                            description="Production secret key for Stripe payments."
                        />
                        <SecretForm
                            secretKey="STRIPE_WEBHOOK_SECRET"
                            label="Stripe Webhook Signing Secret"
                            description="Used to verify incoming payment notifications."
                        />
                    </div>
                </section>

                <div className="divider"></div>

                <section className="settings-section danger-zone">
                    <div className="section-info">
                        <ShieldAlert size={20} className="text-red-500" />
                        <h3 className="section-title">Security & Maintenance</h3>
                        <p className="section-desc">High-privilege system actions.</p>
                    </div>
                    <div className="section-content">
                        <div className="maintenance-card">
                            <div className="card-text">
                                <span className="card-title">Clear System Cache</span>
                                <p className="card-desc">Redistributes latest DB settings to all active server nodes.</p>
                            </div>
                            <button className="btn btn-secondary">Reload All Settings</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
