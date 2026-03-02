import { NextRequest, NextResponse } from 'next/server';
import { requireAdminRole, unauthorizedResponse } from '@/lib/rbac-helper';
import { jsonError, getRequestId } from '@/lib/http/errors';
import { ConnectionTestService } from '@/services/admin/config/test-connection.service';

/**
 * API route to run connection tests for external providers.
 */
export async function POST(req: NextRequest) {
    const { error, requestId } = await requireAdminRole(req, ['SUPER_ADMIN', 'ADMIN']);
    if (error) return unauthorizedResponse(error);

    try {
        const { key, value } = await req.json();
        if (!key || !value) return jsonError(req, 400, 'VALIDATION_ERROR', 'Key and Value are required');

        let result;

        if (key === 'GEMINI_API_KEY') {
            result = await ConnectionTestService.testGemini(value);
        } else if (key === 'ANTHROPIC_API_KEY') {
            result = await ConnectionTestService.testClaude(value);
        } else if (key === 'SMTP_PASSWORD') {
            return NextResponse.json({
                success: true,
                message: "SMTP testing requires full config. Use the dedicated test-smtp endpoint.",
                requestId
            }, { headers: { 'x-request-id': requestId! } });
        } else {
            return jsonError(req, 400, 'VALIDATION_ERROR', 'Unsupported test key');
        }

        return NextResponse.json({ ...result, requestId }, { headers: { 'x-request-id': requestId! } });
    } catch (error: any) {
        console.error('[AdminAPI] Test Error:', error);
        return jsonError(req, 500, 'INTERNAL_ERROR', 'Internal server error during test');
    }
}
