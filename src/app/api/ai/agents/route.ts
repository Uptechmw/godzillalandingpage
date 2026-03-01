import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { WorkflowContext } from "@/services/ai/orchestrator/workflow";
import { ErrorNormalizer } from "@/services/ai/utils/normalizer";

/**
 * POST /api/ai/agents
 * 
 * Orchestration endpoint for multi-agent workflows.
 * Reserves a shared token budget and executes a defined agent sequence.
 */
export async function POST(req: NextRequest) {
    try {
        const user = await getAuthUser(req);
        const body = await req.json();
        const { workflowType, modelKey, prompt } = body;

        if (!workflowType || !prompt) {
            return NextResponse.json({ error: "Missing workflowType or prompt." }, { status: 400 });
        }

        // 1. Initialize budgeted context (e.g., reserve 20k tokens upfront)
        const idempotencyKey = req.headers.get('x-idempotency-key') || crypto.randomUUID();
        const context = await WorkflowContext.start(user.id, modelKey || "claude-3-7-sonnet-thinking", 20000, idempotencyKey);

        // 2. Mock workflow execution (In production, this would call AgentOrchestrator)
        // Here we just return the reservation ID to prove the billing link
        return NextResponse.json({
            success: true,
            workflowId: context.getReservationId(),
            message: "Workflow budget reserved and initialized. Processing..."
        });

    } catch (error: any) {
        const normalized = ErrorNormalizer.normalize(error);
        return NextResponse.json({ error: normalized.message }, { status: 500 });
    }
}
