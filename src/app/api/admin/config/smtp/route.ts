import { NextRequest, NextResponse } from 'next/server';
import { requireAdminRole, unauthorizedResponse } from '@/lib/rbac-helper';
import { jsonError, getRequestId } from '@/lib/http/errors';
import { SecretsService } from '@/services/admin/config/settings.service';

/**
 * GET /api/admin/config/smtp
 * Fetch current SMTP config (masked)
 */
export async function GET(req: NextRequest) {
    const { error, requestId } = await requireAdminRole(req, ['SUPER_ADMIN', 'ADMIN']);
    if (error) return unauthorizedResponse(error);

    try {
        const host = await SecretsService.getSecret('SMTP_HOST');
        const port = await SecretsService.getSecret('SMTP_PORT');
        const secure = await SecretsService.getSecret('SMTP_SECURE');
        const username = await SecretsService.getSecret('SMTP_USERNAME');
        const fromName = await SecretsService.getSecret('SMTP_FROM_NAME');
        const fromEmail = await SecretsService.getSecret('SMTP_FROM_EMAIL');

        return NextResponse.json({
            success: true,
            requestId,
            config: {
                host: host || '',
                port: port || '587',
                secure: secure === 'true',
                username: username || '',
                password: '', // Never return password
                fromName: fromName || '',
                fromEmail: fromEmail || ''
            }
        }, { headers: { 'x-request-id': requestId! } });
    } catch (error) {
        return jsonError(req, 500, 'INTERNAL_ERROR', 'Failed to load SMTP config');
    }
}

/**
 * POST /api/admin/config/smtp
 * Save encrypted SMTP config
 */
export async function POST(req: NextRequest) {
    const { session, error, requestId } = await requireAdminRole(req, ['SUPER_ADMIN']);
    if (error) return unauthorizedResponse(error);

    try {
        const body = await req.json();
        const { host, port, secure, username, password, fromName, fromEmail } = body;

        const adminId = session!.adminId;

        // Save each field as a secret
        await SecretsService.setSecret('SMTP_HOST', host, adminId);
        await SecretsService.setSecret('SMTP_PORT', port, adminId);
        await SecretsService.setSecret('SMTP_SECURE', String(secure), adminId);
        await SecretsService.setSecret('SMTP_USERNAME', username, adminId);
        if (password) {
            await SecretsService.setSecret('SMTP_PASSWORD', password, adminId);
        }
        await SecretsService.setSecret('SMTP_FROM_NAME', fromName, adminId);
        await SecretsService.setSecret('SMTP_FROM_EMAIL', fromEmail, adminId);

        return NextResponse.json({
            success: true,
            message: 'SMTP Configuration updated',
            requestId
        }, { headers: { 'x-request-id': requestId! } });
    } catch (error) {
        return jsonError(req, 500, 'INTERNAL_ERROR', 'Failed to save SMTP config');
    }
}
