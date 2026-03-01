import { NextRequest, NextResponse } from 'next/server';
import { AdminAuthService, AdminRole } from '@/services/admin/security/auth.service';

/**
 * Higher-order helper to require a specific admin role for API routes.
 * This provides defense-in-depth on top of middleware.
 */
export async function requireAdminRole(
    allowedRoles: AdminRole[] = ['SUPER_ADMIN', 'ADMIN']
) {
    const session = await AdminAuthService.getSession();

    if (!session) {
        return { error: 'Unauthorized', status: 401 };
    }

    if (!allowedRoles.includes(session.role)) {
        return { error: 'Forbidden: Insufficient permissions', status: 403 };
    }

    // Special check for SUPER_ADMIN MFA
    if (session.role === 'SUPER_ADMIN' && !session.mfaVerified) {
        return { error: 'MFA verification required', status: 403, requiresMFA: true };
    }

    return { session, error: null };
}

/**
 * Standardized response for unauthorized admin API access
 */
export function unauthorizedResponse(message: string = 'Unauthorized admin access', status: number = 401) {
    return NextResponse.json({ success: false, error: message }, { status });
}
