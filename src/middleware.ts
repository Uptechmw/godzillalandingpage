import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const USER_COOKIE_NAME = 'godzilla_session';
const ADMIN_COOKIE_NAME = 'godzilla_admin_session';

function getJwtSecret(): Uint8Array {
    const key = process.env.JWT_SECRET || 'build-time-placeholder-secret';
    return new TextEncoder().encode(key);
}

function getAdminJwtSecret(): Uint8Array {
    const key = process.env.MASTER_ENCRYPTION_KEY || 'temporary-dev-secret-change-me-in-production';
    return new TextEncoder().encode(key);
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const requestId = crypto.randomUUID();

    // 1. PUBLIC PATHS EXEMPTION
    const publicPaths = [
        '/admin/auth/login',
        '/admin/login',
        '/admin/auth/verify-2fa',
        '/api/admin/auth/login',
        '/api/admin/auth/verify-2fa',
        '/api/auth/session-check', // Must be public for middleware to call it
        '/auth/login',
        '/auth/register',
        '/auth/verify-email'
    ];

    if (publicPaths.some(p => pathname === p)) {
        return NextResponse.next();
    }

    // 2. SESSION CHECK (DB-VERIFIED)
    let sessionData = { ok: false, kind: null, role: null } as any;

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 500);

        const checkRes = await fetch(new URL('/api/auth/session-check', request.url), {
            headers: { cookie: request.headers.get('cookie') || '' },
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (checkRes.ok) {
            sessionData = await checkRes.json();
        }
    } catch (e) {
        console.warn('[Middleware] Session check failed or timed out. Falling back to Guest.', e);
    }

    // 3. PROTECTION LOGIC

    // --- ADMIN PROTECTION ---
    if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
        if (!sessionData.ok || sessionData.kind !== 'admin') {
            // If API, return JSON
            if (pathname.startsWith('/api/')) {
                return NextResponse.json(
                    { success: false, errorCode: 'AUTH_REQUIRED', message: 'Admin session required', requestId },
                    { status: 401, headers: { 'x-request-id': requestId } }
                );
            }

            // Redirect Guest to login
            if (!sessionData.ok) {
                return NextResponse.redirect(new URL('/admin/auth/login', request.url));
            }

            // Redirect User to dashboard
            if (sessionData.kind === 'user') {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
        }

        // Handle MFA requirement for SUPER_ADMIN
        if (sessionData.role === 'SUPER_ADMIN' && !sessionData.ok && sessionData.errorCode === 'ADMIN_MFA_REQUIRED') {
            if (!pathname.startsWith('/api/')) {
                return NextResponse.redirect(new URL('/admin/auth/verify-2fa', request.url));
            }
        }
    }

    // --- DASHBOARD PROTECTION ---
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/settings') || pathname.startsWith('/profile')) {
        if (!sessionData.ok) {
            const url = new URL('/auth/login', request.url);
            url.searchParams.set('redirect', pathname);
            return NextResponse.redirect(url);
        }

        // If Admin hits /dashboard, send back to /admin
        if (sessionData.kind === 'admin') {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    const response = NextResponse.next();
    response.headers.set('x-request-id', requestId);
    return response;
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/api/admin/:path*',
        '/dashboard/:path*',
        '/settings/:path*',
        '/profile/:path*',
        '/auth/login',
        '/auth/register'
    ],
};
