import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

/**
 * GET /api/auth/me
 * 
 * Get current authenticated user profile
 * Requires: Authorization header with JWT token
 */
export async function GET(request: NextRequest) {
  try {
    // Verify JWT and extract user
    const authUser = getAuthUser(request);

    // Fetch full user profile
    const user = await prisma.user.findUnique({
      where: { id: authUser.id },
      include: {
        tokenBalance: true,
        preferences: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'User not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
        emailVerified: user.emailVerified,
        coins: user.tokenBalance?.coins ?? 0,
        preferences: user.preferences,
        createdAt: user.createdAt,
      },
    });
  } catch (error: any) {
    console.error('[Auth Me Error]', error);
    
    // Handle authentication errors
    if (error.message.includes('token')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid or expired token',
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch user profile',
      },
      { status: 500 }
    );
  }
}
