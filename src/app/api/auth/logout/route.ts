import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AdminAuthService } from '@/services/admin/security/auth.service';

export async function POST(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'admin' or 'user'
    const requestId = crypto.randomUUID();

    if (type === 'admin') {
        await AdminAuthService.logout();
        const response = NextResponse.json({ success: true, requestId }, { headers: { 'x-request-id': requestId } });
        return response;
    }

    // User logout
    const cookieStore = await cookies();
    cookieStore.delete('godzilla_session');

    // NOTE: If we had a UserSession table in DB, we would invalidate it here too.
    // For now, clearing the HttpOnly JWT cookie is the primary mechanism.

    const response = NextResponse.json({ success: true, requestId }, { headers: { 'x-request-id': requestId } });
    return response;
}
