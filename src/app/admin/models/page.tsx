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
        </div>
    );
}
