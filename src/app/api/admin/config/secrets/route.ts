import { NextRequest, NextResponse } from 'next/server';
import { AdminAuthService } from '@/services/admin/security/auth.service';
import { AdminPermission } from '@/services/admin/security/rbac';
import { SecretsService } from '@/services/admin/config/settings.service';
import { requireAdminRole, unauthorizedResponse } from '@/lib/rbac-helper';
import { jsonError } from '@/lib/http/errors';

/**
 * API route to save encrypted secrets. 
 * Restricted to SUPER_ADMIN.
 */
export async function POST(req: NextRequest) {
    const { error, status, session } = await requireAdminRole(req, ['SUPER_ADMIN', 'ADMIN']);
    if (error) return unauthorizedResponse(error);

    try {
        const { key, value } = await req.json();
        await SecretsService.setSecret(key, value, session!.adminId);

        return NextResponse.json({ success: true, message: `Secret ${key} updated successfully.` });
    } catch (error: any) {
        console.error('[AdminAPI] Secret Save Error:', error);
        return jsonError(req, 500, 'INTERNAL_ERROR', 'Failed to save secret');
    }
}
