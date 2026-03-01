import { NextRequest, NextResponse } from 'next/server';
import { AdminAuthService } from '@/services/admin/security/auth.service';
import { headers } from 'next/headers';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        const headerList = await headers();
        const ip = headerList.get('x-forwarded-for') || '127.0.0.1';
        const userAgent = headerList.get('user-agent') || 'unknown';

        // We use the password as the "hash" for now as per current project state 
        // (direct comparison in auth.service). In production, this should be pre-hashed or handled via bcrypt.
        const result = await AdminAuthService.login(email, password, ip, userAgent);

        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }
}
