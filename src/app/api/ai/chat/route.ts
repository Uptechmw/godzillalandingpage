import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { ExecutionRouter } from "@/services/ai/broker/router";
import { ErrorNormalizer } from "@/services/ai/utils/normalizer";

/**
 * POST /api/ai/chat
 * 
 * Secure AI chat endpoint with token brokerage, concurrency protection, 
 * and abort-safe streaming.
 */
export async function POST(req: NextRequest) {
    try {
        // 1. Authenticate user (custom JWT)
        const user = await getAuthUser(req);

        // 2. Parse Request Body
        const body = await req.json();
        const { modelKey, prompt, maxTokens, temperature, system } = body;

        // 3. Extract Idempotency Key from headers
        const idempotencyKey = req.headers.get("x-idempotency-key") || undefined;

        if (!modelKey || !prompt) {
            return NextResponse.json(
                { success: false, error: "Missing required fields: modelKey and prompt." },
                { status: 400 }
            );
        }

        // 4. Invoke Execution Router
        const sseStream = await ExecutionRouter.execute(req, {
            userId: user.id,
            modelKey,
            prompt,
            idempotencyKey,
            maxTokens,
            temperature,
            system
        });

        // 5. Return Server-Sent Events (SSE) Response
        return new Response(sseStream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        });

    } catch (error: any) {
        console.error("[AI Chat API Error]", error);

        // Normalize into canonical error shape
        const normalized = ErrorNormalizer.normalize(error);

        return NextResponse.json(
            {
                success: false,
                error: normalized.message,
                code: normalized.code
            },
            { status: normalized.code === "INSUFFICIENT_FUNDS" ? 402 : 500 }
        );
    }
}
