import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyPassword } from '@/lib/hash';
import { signToken } from '@/lib/auth';
import { loginSchema } from '@/lib/validation';

/**
 * POST /api/auth/login
 * 
 * Authenticate user and return JWT token
 */
export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();

  try {
    const body = await request.json();

    // Validate input
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach(err => {
        const path = err.path.join('.');
        if (path) fieldErrors[path] = err.message;
      });

      return NextResponse.json(
        {
          success: false,
          errorCode: 'VALIDATION_ERROR',
          message: 'Invalid request parameters',
          details: { fieldErrors },
          requestId
        },
        { status: 400, headers: { 'x-request-id': requestId } }
      );
    }

    const { email, password } = parsed.data;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        tokenBalance: true,
      },
    });

    if (!user || !user.passwordHash) {
      return NextResponse.json(
        {
          success: false,
          errorCode: 'AUTH_INVALID_CREDENTIALS',
          message: 'Invalid email or password',
          requestId
        },
        { status: 401, headers: { 'x-request-id': requestId } }
      );
    }

    // Verify password
    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        {
          success: false,
          errorCode: 'AUTH_INVALID_CREDENTIALS',
          message: 'Invalid email or password',
          requestId
        },
        { status: 401, headers: { 'x-request-id': requestId } }
      );
    }

    // Check email verification
    if (!user.emailVerified) {
      return NextResponse.json(
        {
          success: false,
          errorCode: 'AUTH_REQUIRED',
          message: 'Please verify your email before logging in',
          details: { requiresVerification: true },
          requestId
        },
        { status: 401, headers: { 'x-request-id': requestId } }
      );
    }

    // Generate JWT token
    const token = await signToken(user.id, user.email);

    const adminUser = await (prisma as any).adminUser.findUnique({
      where: { email: user.email }
    });

    const redirectTo = adminUser ? '/admin' : '/dashboard';

    const response = NextResponse.json({
      success: true,
      redirectTo,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        coins: user.tokenBalance?.coins ?? 0,
      },
      requestId
    }, {
      headers: { 'x-request-id': requestId }
    });

    // Set HttpOnly sessions cookie
    response.cookies.set('godzilla_session', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('[Login]', requestId, error.code || error.message);
    return NextResponse.json(
      {
        success: false,
        errorCode: 'INTERNAL_ERROR',
        message: 'Login failed. Please try again.',
        requestId
      },
      { status: 500, headers: { 'x-request-id': requestId } }
    );
  }
}
