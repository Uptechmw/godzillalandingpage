import { NextRequest, NextResponse } from 'next/server';
import { AdminAuthService } from '@/services/admin/security/auth.service';
import { jwtVerify } from 'jose';
import { jsonError } from '@/lib/http/errors';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getJwtSecret(): Uint8Array {
    const key = process.env.JWT_SECRET || 'build-time-placeholder-secret';
    return new TextEncoder().encode(key);
}

/**
 * GET /api/auth/session-check
 * Verifies both user and admin sessions.
 * This is used by Edge middleware to perform high-security session checks.
 */
export async function GET(req: NextRequest) {
    const requestId = crypto.randomUUID();
    const adminToken = req.cookies.get('godzilla_admin_session')?.value;
    const userToken = req.cookies.get('godzilla_session')?.value;

    try {
        // 1. Check Admin Session (Precedence)
        if (adminToken) {
            const session = await AdminAuthService.getSessionByToken(adminToken);
            if (session) {
                // Check if SUPER_ADMIN and needs MFA
                if (session.role === 'SUPER_ADMIN' && !session.mfaVerified) {
                    return NextResponse.json({
                        success: false,
                        ok: false,
                        errorCode: 'ADMIN_MFA_REQUIRED',
                        message: 'MFA verification required',
                        requestId
                    }, { headers: { 'Cache-Control': 'no-store' } });
                }

                return NextResponse.json({
                    success: true,
                    ok: true,
                    kind: 'admin',
                    role: session.role,
                    requestId
                }, { headers: { 'Cache-Control': 'no-store' } });
            }
        }

        // 2. Check User Session (JWT-only as there is no UserSession table yet)
        if (userToken) {
            try {
                const { payload } = await jwtVerify(userToken, getJwtSecret());
                const userId = (payload as any).id;

                if (userId) {
                    return NextResponse.json({
                        success: true,
                        ok: true,
                        kind: 'user',
                        userId,
                        requestId
                    }, { headers: { 'Cache-Control': 'no-store' } });
                }
            } catch (err) {
                // Invalid user JWT - fall through to error
                console.warn('[SessionCheck] Invalid user JWT attempt');
            }
        }

        // 3. No valid session found
        return NextResponse.json({
            success: false,
            ok: false,
            errorCode: 'AUTH_REQUIRED',
            message: 'No active session found',
            requestId
        }, { status: 401, headers: { 'Cache-Control': 'no-store' } });

    } catch (error) {
        console.error('[SessionCheck] Critical Error:', error);
        return jsonError(req, 500, 'INTERNAL_ERROR', 'Session verification failed');
    }
}
