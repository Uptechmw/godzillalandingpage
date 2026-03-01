import { NextResponse } from 'next/server';
import { AdminAuthService } from '@/services/admin/security/auth.service';

export async function POST() {
    await AdminAuthService.logout();
    return NextResponse.json({ success: true });
}
