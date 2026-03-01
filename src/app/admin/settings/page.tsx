import React from 'react';
import { PageHeader } from '@/components/admin/PageHeader';
import { SecretForm } from '@/components/admin/SecretForm';
import { SmtpForm } from '@/components/admin/SmtpForm';
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
                title="System Configuration"
                subtitle="Manage encrypted secrets, API credentials, and core system parameters."
            />

            <div className="settings-container">
                <section className="settings-section">
                    <div className="section-info">
                        <Cpu size={20} className="text-blue-400" />
                        <h3 className="section-title">AI Provider Credentials</h3>
                        <p className="section-desc">Managed API keys for LLM providers. All values are military-grade encrypted at rest.</p>
                    </div>
                    <div className="section-content">
                        <SecretForm
                            secretKey="GEMINI_API_KEY"
                            label="Google Gemini API"
                            description="Production key for Gemini 1.5 Pro and Flash models."
                        />
                        <SecretForm
                            secretKey="ANTHROPIC_API_KEY"
                            label="Anthropic Claude API"
                            description="Production key for Claude 3.7 Opus and Sonnet."
                        />
                    </div>
                </section>

                <div className="divider"></div>

                <section className="settings-section">
                    <div className="section-info">
                        <Mail size={20} className="text-slate-400" />
                        <h3 className="section-title">SMTP Gateway</h3>
                        <p className="section-desc">Transactional mail server configuration for identity and notifications.</p>
                    </div>
                    <div className="section-content">
                        <SmtpForm />
                    </div>
                </section>

                <div className="divider"></div>

                <section className="settings-section">
                    <div className="section-info">
                        <CreditCard size={20} className="text-slate-400" />
                        <h3 className="section-title">Financial Infrastructure</h3>
                        <p className="section-desc">Vault for payment processor secrets and signing keys.</p>
                    </div>
                    <div className="section-content">
                        <SecretForm
                            secretKey="STRIPE_SECRET_KEY"
                            label="Stripe Private Key"
                            description="Restricted production key for payment orchestration."
                        />
                        <SecretForm
                            secretKey="STRIPE_WEBHOOK_SECRET"
                            label="Stripe Webhook Verification"
                            description="Used to cryptographically verify event source."
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}
