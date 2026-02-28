import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { signToken } from '@/lib/auth';
import { verifyOtpSchema } from '@/lib/validation';

/**
 * POST /api/auth/verify-otp
 * 
 * Verify email with OTP code and return JWT token
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const parsed = verifyOtpSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.errors[0].message,
        },
        { status: 400 }
      );
    }

    const { email, code } = parsed.data;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        tokenBalance: true,
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

    // Find valid OTP (not verified, not expired)
    const otpRecord = await prisma.emailVerification.findFirst({
      where: {
        userId: user.id,
        verified: false,
        expiresAt: {
          gte: new Date(),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!otpRecord) {
      return NextResponse.json(
        {
          success: false,
          error: 'No valid OTP found. Please request a new code.',
        },
        { status: 400 }
      );
    }

    // Verify code
    if (otpRecord.code !== code) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid verification code',
        },
        { status: 400 }
      );
    }

    // Mark OTP as verified and update user
    await prisma.$transaction([
      prisma.emailVerification.update({
        where: { id: otpRecord.id },
        data: { verified: true },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: true },
      }),
    ]);

    // Generate JWT token
    const token = signToken(user.id, user.email);

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully!',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        coins: user.tokenBalance?.coins ?? 0,
      },
    });
  } catch (error) {
    console.error('[Verify OTP Error]', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Verification failed. Please try again.',
      },
      { status: 500 }
    );
  }
}
