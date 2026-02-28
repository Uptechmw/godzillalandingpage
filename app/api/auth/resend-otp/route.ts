import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/db';
import { sendOTPEmail } from '@/lib/email';
import { resendOtpSchema } from '@/lib/validation';

/**
 * POST /api/auth/resend-otp
 * 
 * Resend OTP verification code to user's email
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const parsed = resendOtpSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.errors[0].message,
        },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
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

    if (user.emailVerified) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email is already verified',
        },
        { status: 400 }
      );
    }

    // Invalidate previous OTPs
    await prisma.emailVerification.updateMany({
      where: {
        userId: user.id,
        verified: false,
      },
      data: {
        verified: true, // Mark as used
      },
    });

    // Generate new 6-digit OTP
    const otpCode = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store new OTP
    await prisma.emailVerification.create({
      data: {
        userId: user.id,
        code: otpCode,
        expiresAt,
      },
    });

    // Send OTP email
    try {
      await sendOTPEmail(email, otpCode);
      
      return NextResponse.json({
        success: true,
        message: 'Verification code sent successfully!',
      });
    } catch (error) {
      console.error('[Resend OTP] Failed to send email:', error);
      
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send verification email. Please try again.',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('[Resend OTP Error]', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to resend code. Please try again.',
      },
      { status: 500 }
    );
  }
}
