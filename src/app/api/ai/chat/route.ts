import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { ExecutionRouter } from "@/services/ai/broker/router";
import { ErrorNormalizer, GodzillaBrokerError } from "@/services/ai/utils/normalizer";
import { chatSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * POST /api/ai/chat
 * 
 * Secure AI chat endpoint with token brokerage, concurrency protection, 
 * and abort-safe streaming.
 */
export async function POST(req: NextRequest) {
    const requestId = crypto.randomUUID();

    try {
        // 1. Authenticate user (custom JWT)
        const user = await getAuthUser(req);

        // 2. Parse and Validate Request Body
        const body = await req.json();
        const parsed = chatSchema.safeParse(body);

        if (!parsed.success) {
            const fieldErrors: Record<string, string> = {};
            parsed.error.errors.forEach(err => {
                const path = err.path.join('.');
                if (path) fieldErrors[path] = err.message;
            });

            throw new GodzillaBrokerError(
                "VALIDATION_ERROR",
                "Invalid request parameters",
                { fieldErrors }
            );
        }

        const { modelKey, prompt, maxTokens, temperature, system, idempotencyKey } = parsed.data;

        // 3. Invoke Execution Router
        const sseStream = await ExecutionRouter.execute(req, {
            userId: user.id,
            modelKey,
            prompt,
            idempotencyKey,
            maxTokens,
            temperature,
            system,
            requestId // Pass requestId for logging and framing
        });

        // 4. Return Server-Sent Events (SSE) Response
        return new Response(sseStream, {
            headers: {
                "Content-Type": "text/event-stream; charset=utf-8",
                "Cache-Control": "no-cache, no-transform",
                "x-request-id": requestId
            },
        });

    } catch (error: any) {
        // Normalize into canonical error shape
        const normalized = ErrorNormalizer.normalize(error, requestId);

        return NextResponse.json(
            normalized.toJSON(),
            {
                status: ErrorNormalizer.httpStatus(normalized.code),
                headers: { "x-request-id": requestId }
            }
        );
    }
}
