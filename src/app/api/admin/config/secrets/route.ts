import { NextRequest, NextResponse } from 'next/server';
import { AdminAuthService } from '@/services/admin/security/auth.service';
import { AdminPermission } from '@/services/admin/security/rbac';
import { SecretsService } from '@/services/admin/config/settings.service';

/**
 * API route to save encrypted secrets. 
 * Restricted to SUPER_ADMIN.
 */
export async function POST(req: NextRequest) {
    const session = await AdminAuthService.getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const isAuthorized = await AdminAuthService.guard(AdminPermission.MANAGE_SECRETS);
    if (!isAuthorized) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    try {
        const { key, value } = await req.json();
        if (!key || !value) return NextResponse.json({ error: 'Key and Value are required' }, { status: 400 });

        await SecretsService.setSecret(key, value, session.adminId);

        return NextResponse.json({ success: true, message: `Secret ${key} updated successfully.` });
    } catch (error: any) {
        console.error('[AdminAPI] Secret Save Error:', error);
        return NextResponse.json({ error: 'Failed to save secret' }, { status: 500 });
    }
}
