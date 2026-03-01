import { NextRequest, NextResponse } from 'next/server';
import { requireAdminRole, unauthorizedResponse } from '@/lib/rbac-helper';
import nodemailer from 'nodemailer';

/**
 * POST /api/admin/config/test-smtp
 * Test SMTP connection with provided credentials
 */
export async function POST(req: NextRequest) {
    const { error, status } = await requireAdminRole(['SUPER_ADMIN', 'ADMIN']);
    if (error) return unauthorizedResponse(error, status);

    try {
        const body = await req.json();
        const { host, port, secure, username, password, fromEmail } = body;

        if (!host || !username) {
            return NextResponse.json({ success: false, message: 'Host and username are required' }, { status: 400 });
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

        return NextResponse.json({ success: true, message: 'SMTP connection verified successfully' });
    } catch (error: any) {
        console.error('[SMTP Test Error]', error);
        return NextResponse.json({
            success: false,
            message: error.message || 'Failed to connect to SMTP server'
        }, { status: 500 });
    }
}
