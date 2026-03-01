import React from 'react';
import { PageHeader } from '@/components/admin/PageHeader';
import { AdminModelTable } from '@/components/admin/ModelTable';
import { AdminModelService } from '@/services/admin/ai/admin-model.service';
import { RefreshCw, ZapOff } from 'lucide-react';

export default async function AdminModelsPage() {
    const models = await AdminModelService.listModels();

    return (
        <div className="admin-models-page">
            <PageHeader
                title="AI Model Configuration"
                subtitle="Manage provider limits, overrides, and global kill-switches for the token economy."
            >
                <button className="btn btn-secondary">
                    <RefreshCw size={18} />
                    <span>Sync Registry</span>
                </button>
                <button className="btn btn-danger">
                    <ZapOff size={18} />
                    <span>Emergency Stop</span>
                </button>
            </PageHeader>

            <div className="alert-banner warning">
                <span className="alert-title">Important:</span>
                <span className="alert-message">Changes made here are applied in real-time to all active AI broker instances. Validating overrides is recommended.</span>
            </div>

            <AdminModelTable models={models} />

            <style jsx>{`
                .admin-models-page {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .alert-banner {
                    padding: 12px 20px;
                    border-radius: 8px;
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .alert-banner.warning {
                    background-color: #f59e0b1a;
                    border: 1px solid #f59e0b33;
                    color: #f59e0b;
                }

                .alert-title {
                    font-weight: 700;
                }

                .btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    border-radius: 8px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-secondary {
                    background-color: #0f172a;
                    border: 1px solid #1e293b;
                    color: #94a3b8;
                }

                .btn-danger {
                    background-color: #ef44441a;
                    border: 1px solid #ef444433;
                    color: #ef4444;
                }

                .btn-danger:hover {
                    background-color: #ef44442a;
                }
            `}</style>
        </div>
    );
}
