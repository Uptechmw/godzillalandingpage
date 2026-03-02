import { NextRequest, NextResponse } from 'next/server';
import { AdminAuthService } from '@/services/admin/security/auth.service';
import { getRequestId } from '@/lib/http/errors';

export async function POST(req: NextRequest) {
    const requestId = getRequestId(req);
    await AdminAuthService.logout();
    return NextResponse.json({ success: true, requestId }, { headers: { 'x-request-id': requestId } });
}
