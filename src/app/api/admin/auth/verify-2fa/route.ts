import { NextRequest, NextResponse } from 'next/server';
import { AdminAuthService } from '@/services/admin/security/auth.service';
import { headers } from 'next/headers';

export async function POST(req: NextRequest) {
    try {
        const { otp } = await req.json();
        const headerList = await headers();
        const ip = headerList.get('x-forwarded-for') || '127.0.0.1';
        const userAgent = headerList.get('user-agent') || 'unknown';

        await AdminAuthService.verify2FA(otp, ip, userAgent);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }
}
