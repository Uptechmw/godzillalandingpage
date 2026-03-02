import { NextRequest, NextResponse } from 'next/server';
import { requireAdminRole, unauthorizedResponse } from '@/lib/rbac-helper';
import { jsonError, getRequestId } from '@/lib/http/errors';
import nodemailer from 'nodemailer';

/**
 * POST /api/admin/config/test-smtp
 * Test SMTP connection with provided credentials
 */
export async function POST(req: NextRequest) {
    const { error } = await requireAdminRole(req, ['SUPER_ADMIN', 'ADMIN']);
    if (error) return unauthorizedResponse(error);

    try {
        const body = await req.json();
        const { host, port, secure, username, password, fromEmail } = body;

        const requestId = getRequestId(req);

        if (!host || !username) {
            return jsonError(req, 400, 'VALIDATION_ERROR', 'Host and username are required');
        }

        const transporter = nodemailer.createTransport({
            host,
            port: parseInt(port),
            secure: secure,
            auth: {
                user: username,
                pass: password
            },
            connectionTimeout: 5000
        } as any);

        // Verify connection configuration
        await transporter.verify();

        return NextResponse.json({
            success: true,
            message: 'SMTP connection verified successfully',
            requestId
        }, { headers: { 'x-request-id': requestId } });
    } catch (error: any) {
        console.error('[SMTP Test Error]', error);
        return jsonError(req, 500, 'INTERNAL_ERROR', error.message || 'Failed to connect to SMTP server');
    }
}
