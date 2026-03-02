import { NextRequest, NextResponse } from 'next/server';
import { AdminAuthService, AdminRole } from '@/services/admin/security/auth.service';
import { jsonError, getRequestId } from '@/lib/http/errors';

/**
 * Higher-order helper to require a specific admin role for API routes.
 * This provides defense-in-depth on top of middleware.
 */
export async function requireAdminRole(
    req: NextRequest | Request,
    allowedRoles: AdminRole[] = ['SUPER_ADMIN', 'ADMIN']
) {
    const requestId = getRequestId(req);
    const session = await AdminAuthService.getSession();

    if (!session) {
        return {
            error: jsonError(req, 401, 'AUTH_REQUIRED', 'Unauthorized admin access'),
            status: 401
        };
    }

    if (!allowedRoles.includes(session.role)) {
        return {
            error: jsonError(req, 403, 'AUTH_FORBIDDEN', 'Insufficient permissions'),
            status: 403
        };
    }

    // Special check for SUPER_ADMIN MFA
    if (session.role === 'SUPER_ADMIN' && !session.mfaVerified) {
        return {
            error: jsonError(req, 403, 'AUTH_FORBIDDEN', 'MFA verification required'),
            status: 403,
            requiresMFA: true
        };
    }

    return { session, error: null, requestId };
}

/**
 * Standardized response for unauthorized admin API access
 */
export function unauthorizedResponse(error: any) {
    // If error is already a NextResponse (from jsonError), return it
    if (error instanceof NextResponse) return error;

    // Otherwise fallback (should not happen with new pattern)
    return NextResponse.json(error, {
        status: 401,
        headers: { 'x-request-id': error.requestId || crypto.randomUUID() }
    });
}
