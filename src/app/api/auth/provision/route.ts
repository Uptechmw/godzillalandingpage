import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createClient } from '@supabase/supabase-js';

/**
 * POST /api/auth/provision
 *
 * Called after GitHub/Google OAuth login.
 * Ensures a Prisma user record exists for the Supabase user.
 * Returns a user profile for the dashboard.
 */
export async function POST(request: NextRequest) {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

        // Get the access token from the Authorization header
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, error: 'Missing token' }, { status: 401 });
        }
        const accessToken = authHeader.substring(7);

        // Verify the token with Supabase and get the user
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        const { data: { user: supabaseUser }, error: userError } = await supabase.auth.getUser(accessToken);

        if (userError || !supabaseUser) {
            return NextResponse.json({ success: false, error: 'Invalid session token' }, { status: 401 });
        }

        const email = supabaseUser.email;
        if (!email) {
            return NextResponse.json({ success: false, error: 'No email found in account' }, { status: 400 });
        }

        const name = supabaseUser.user_metadata?.full_name
            || supabaseUser.user_metadata?.name
            || supabaseUser.user_metadata?.user_name
            || email.split('@')[0];

        const avatarUrl = supabaseUser.user_metadata?.avatar_url || null;

        // Upsert: create user if not exists, otherwise update
        const SIGNUP_BONUS = parseInt(process.env.COIN_SIGNUP_BONUS || '20');

        const user = await prisma.user.upsert({
            where: { email },
            update: {
                name,
                avatarUrl,
                emailVerified: true, // OAuth users are always verified
            },
            create: {
                email,
                name,
                avatarUrl,
                emailVerified: true,
                // No passwordHash — this is an OAuth user
                tokenBalance: {
                    create: { coins: SIGNUP_BONUS },
                },
                preferences: {
                    create: {},
                },
                transactions: {
                    create: {
                        type: 'SIGNUP_BONUS',
                        amount: SIGNUP_BONUS,
                        description: 'Welcome bonus — 20 Godzilla Coins!',
                    },
                },
            },
            include: {
                tokenBalance: true,
            },
        });

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                avatarUrl: user.avatarUrl,
                coins: user.tokenBalance?.coins ?? 0,
            },
        });
    } catch (error: any) {
        console.error('[Provision Error]', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to provision user account.',
                details: error?.message || String(error),
            },
            { status: 500 }
        );
    }
}
