import { NextRequest, NextResponse } from 'next/server';
import { AdminAuthService } from '@/services/admin/security/auth.service';
import { headers } from 'next/headers';
import { jsonError, getRequestId } from '@/lib/http/errors';

export async function POST(req: NextRequest) {
    const requestId = getRequestId(req);
    try {
        const { email, password } = await req.json();
        const headerList = await headers();
        const ip = headerList.get('x-forwarded-for') || '127.0.0.1';
        const userAgent = headerList.get('user-agent') || 'unknown';

        const result = await AdminAuthService.login(email, password, ip, userAgent);

        return NextResponse.json({ ...result, requestId }, { headers: { 'x-request-id': requestId } });
    } catch (error: any) {
        console.error('[AdminLogin] Error:', error);
        return jsonError(
            req,
            401,
            error.errorCode || 'AUTH_INVALID_CREDENTIALS',
            error.message || 'Invalid credentials'
        );
    }
}
