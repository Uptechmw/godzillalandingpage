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
  try {
    const body = await request.json();

    // Validate input
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.errors[0].message,
        },
        { status: 400 }
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
          error: 'Invalid email or password',
        },
        { status: 401 }
      );
    }

    // Verify password
    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email or password',
        },
        { status: 401 }
      );
    }

    // Check email verification
    if (!user.emailVerified) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please verify your email before logging in',
          requiresVerification: true,
        },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = await signToken(user.id, user.email);

    // FIX: Professional redirect logic for Admins vs Users
    // This is the USER login route. If an admin logs in here, we should ideally
    // check if they have an AdminUser record and redirect accordingly.
    const adminUser = await (prisma as any).adminUser.findUnique({
      where: { email: user.email }
    });

    const redirectTo = adminUser ? '/admin' : '/dashboard';

    return NextResponse.json({
      success: true,
      token,
      redirectTo,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        coins: user.tokenBalance?.coins ?? 0,
      },
    });
  } catch (error: any) {
    console.error('[Login Error]', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Login failed. Please try again.',
        details: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
