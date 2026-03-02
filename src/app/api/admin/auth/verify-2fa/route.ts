import { NextRequest, NextResponse } from 'next/server';
import { requireAdminRole, unauthorizedResponse } from '@/lib/rbac-helper';
import { jsonError } from '@/lib/http/errors';
import { AdminAuthService } from '@/services/admin/security/auth.service';
import { headers } from 'next/headers';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { otp } = body;

        const headerList = await headers();
        const ip = headerList.get('x-forwarded-for') || '127.0.0.1';
        const userAgent = headerList.get('user-agent') || 'unknown';

        if (!otp) return jsonError(req, 400, 'VALIDATION_ERROR', 'OTP is required');

        await AdminAuthService.verify2FA(otp, ip, userAgent);

        return NextResponse.json({ success: true, message: 'Verification successful' });
    } catch (error: any) {
        console.error('[Admin2FA] Error:', error);
        // AdminAuthService.verify2FA might throw a canonical-like object or a standard error
        return jsonError(
            req,
            error.status || 401,
            error.errorCode || 'AUTH_INVALID_CREDENTIALS',
            error.message || 'Verification failed'
        );
    }
}
