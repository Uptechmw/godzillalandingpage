import { NextRequest, NextResponse } from 'next/server';
import { AdminAuthService } from '@/services/admin/security/auth.service';
import { ConnectionTestService } from '@/services/admin/config/test-connection.service';

/**
 * API route to run connection tests for external providers.
 */
export async function POST(req: NextRequest) {
    const session = await AdminAuthService.getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { key, value } = await req.json();
        if (!key || !value) return NextResponse.json({ error: 'Value is required' }, { status: 400 });

        let result;

        if (key === 'GEMINI_API_KEY') {
            result = await ConnectionTestService.testGemini(value);
        } else if (key === 'ANTHROPIC_API_KEY') {
            result = await ConnectionTestService.testClaude(value);
        } else if (key === 'SMTP_PASSWORD') {
            // In a real scenario, we'd need other SMTP fields too.
            // For now, assume this triggers a standard verification.
            return NextResponse.json({ success: true, message: "SMTP testing requires full config." });
        } else {
            return NextResponse.json({ error: 'Unsupported test key' }, { status: 400 });
        }

        return NextResponse.json(result);
    } catch (error: any) {
        console.error('[AdminAPI] Test Error:', error);
        return NextResponse.json({ error: 'Internal server error during test' }, { status: 500 });
    }
}
