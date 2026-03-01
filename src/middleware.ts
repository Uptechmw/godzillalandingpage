import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { jwtVerify } from 'jose';

const ADMIN_COOKIE_NAME = 'godzilla_admin_session';

function getAdminJwtSecret(): Uint8Array {
  const key = process.env.MASTER_ENCRYPTION_KEY || 'temporary-dev-secret-change-me-in-production';
  if (!process.env.MASTER_ENCRYPTION_KEY) {
    console.warn('[SECURITY] MASTER_ENCRYPTION_KEY is missing. Using insecure fallback.');
  }
  return new TextEncoder().encode(key);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Protect Admin Routes (/admin/* and /api/admin/*)
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    // Skip public admin routes
    if (pathname === '/api/admin/auth/login' || pathname === '/admin/auth/verify-2fa' || pathname === '/admin/login') {
      return NextResponse.next();
    }

    const adminToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

    if (!adminToken) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized admin access' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // Edge-safe JWT verification
      const { payload } = await jwtVerify(adminToken, getAdminJwtSecret());
      const role = (payload as any).role;

      // Basic role check at Edge
      const adminRoles = ['SUPER_ADMIN', 'ADMIN', 'SUPPORT', 'BILLING_ADMIN'];
      if (!role || !adminRoles.includes(role)) {
        throw new Error('Invalid role');
      }

      // MFA enforcement for SUPER_ADMIN at Edge
      if (role === 'SUPER_ADMIN' && !(payload as any).mfaVerified && pathname !== '/admin/auth/verify-2fa') {
        return NextResponse.redirect(new URL('/admin/auth/verify-2fa', request.url));
      }

      return NextResponse.next();
    } catch (error) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Invalid admin session' }, { status: 403 });
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // 2. Protect Regular User Routes
  const protectedRoutes = ['/dashboard', '/settings', '/profile'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    const token = request.cookies.get('auth_token')?.value ||
      request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }

    try {
      await verifyToken(token);
      return NextResponse.next();
    } catch (error) {
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('redirect', pathname);
      url.searchParams.set('error', 'session_expired');
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/dashboard/:path*',
    '/settings/:path*',
    '/profile/:path*'
  ],
};
