import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/db';
import { hashPassword } from '@/lib/hash';
import { registerSchema } from '@/lib/validation';
import { sendOTPEmail } from '@/lib/email';

/**
 * POST /api/auth/register
 * 
 * Create new user account and send OTP verification email
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.errors[0].message,
        },
        { status: 400 }
      );
    }

    const { email, password, name } = parsed.data;

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email already registered',
        },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user with initial balance and preferences
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name: name || email.split('@')[0],
        emailVerified: false,
        tokenBalance: {
          create: {
            coins: parseInt(process.env.COIN_SIGNUP_BONUS || '20'),
          },
        },
        preferences: {
          create: {},
        },
        transactions: {
          create: {
            type: 'SIGNUP_BONUS',
            amount: parseInt(process.env.COIN_SIGNUP_BONUS || '20'),
            description: 'Welcome bonus - 20 Godzilla Coins!',
          },
        },
      },
      include: {
        tokenBalance: true,
      },
    });

    // Generate 6-digit OTP
    const otpCode = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP in database
    await prisma.emailVerification.create({
      data: {
        userId: user.id,
        code: otpCode,
        expiresAt,
      },
    });

    // Send OTP email (don't fail registration if email fails)
    try {
      await sendOTPEmail(email, otpCode);
    } catch (error) {
      console.error('[Register] Failed to send OTP email:', error);
      // Continue - user can request resend
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully! Please check your email for verification code.',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          coins: user.tokenBalance?.coins ?? 20,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Register Error]', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create account. Please try again.',
      },
      { status: 500 }
    );
  }
}
