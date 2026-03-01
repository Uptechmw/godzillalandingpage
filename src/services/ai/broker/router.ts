import { NextRequest } from "next/server";
import { MODEL_REGISTRY, ModelKey } from "../registry";
import { BillingBroker } from "./billing";
import { ConcurrencyManager } from "./concurrency";
import { RateLimiter } from "./rate-limit";
import { ProviderFactory } from "../providers/factory";
import { FallbackTokenizer } from "../security/tokenizer";
import { ErrorNormalizer, AtomicBrokerError } from "../utils/normalizer";
import { AuditLogger } from "../utils/logger";

export interface ExecutionOptions {
    userId: string;
    modelKey: ModelKey;
    prompt: string;
    idempotencyKey?: string;
    maxTokens?: number;
    temperature?: number;
    system?: string;
}

/**
 * The core orchestrator for AI model execution.
 * Handles the end-to-end lifecycle: Rate Limiting -> Concurrency -> Billing -> Execution -> Commit.
 */
export class ExecutionRouter {
    static async execute(req: NextRequest, options: ExecutionOptions) {
        const { userId, modelKey, prompt, idempotencyKey, maxTokens, temperature, system } = options;
        const config = MODEL_REGISTRY[modelKey];
        const requestId = crypto.randomUUID();

        if (!config) {
            throw new AtomicBrokerError("INVALID_MODEL_KEY", `Model ${modelKey} is not supported.`);
        }

        // 1. Rate Limiting (Distributed Redis)
        await RateLimiter.check(userId, config.rateLimitRpm);

        // 2. Acquire Concurrency Lock (Distributed Redis)
        const lockId = await ConcurrencyManager.acquire(
            userId,
            modelKey,
            config.concurrencyLimit,
            config.timeoutMs
        );

        let reservationId: string | null = null;
        let concatenatedOutput = "";

        // 3. Setup Abort Propagation (Timeout + Client Disconnect)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort("TIMEOUT");
        }, config.timeoutMs);

        // Monitor client disconnect
        req.signal.addEventListener("abort", () => {
            controller.abort("CLIENT_DISCONNECT");
        });

        try {
            // 4. Token Estimation & Reservation
            const estimatedInput = FallbackTokenizer.count(prompt);
            const reservation = await BillingBroker.reserve(
                userId,
                modelKey,
                estimatedInput,
                maxTokens,
                idempotencyKey
            );
            reservationId = reservation.id;

            // 5. Retrieve Provider & Start Stream
            const provider = ProviderFactory.get(config.provider);
            const stream = provider.stream(modelKey, prompt, {
                system,
                temperature,
                maxTokens,
                signal: controller.signal
            });

            // 6. Define the Streaming Bridge (Transform into SSE)
            const encoder = new TextEncoder();
            const sseStream = new ReadableStream({
                async start(streamController) {
                    try {
                        for await (const chunk of stream) {
                            if (chunk.text) {
                                concatenatedOutput += chunk.text;
                                streamController.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk.text })}\n\n`));
                            }
                            if (chunk.thinking) {
                                streamController.enqueue(encoder.encode(`data: ${JSON.stringify({ thinking: chunk.thinking })}\n\n`));
                            }
                        }

                        // Clean close
                        clearTimeout(timeoutId);

                        // Authoritative usage calculation
                        const actualInput = estimatedInput; // Gemini/Claude SDK usage metadata is usually at the end
                        const actualOutput = FallbackTokenizer.count(concatenatedOutput);

                        if (reservationId) {
                            await BillingBroker.commit(reservationId, actualInput, actualOutput);
                        }

                        await ConcurrencyManager.release(userId, modelKey, lockId);
                        streamController.enqueue(encoder.encode(`data: [DONE]\n\n`));
                        streamController.close();

                    } catch (err: any) {
                        clearTimeout(timeoutId);
                        await ConcurrencyManager.release(userId, modelKey, lockId);

                        const reason = controller.signal.aborted ? controller.signal.reason : "ERROR";

                        // Commit partial usage on abort/timeout
                        if (reservationId && (reason === "TIMEOUT" || reason === "CLIENT_DISCONNECT")) {
                            const partialOutput = FallbackTokenizer.count(concatenatedOutput);
                            await BillingBroker.commit(reservationId, estimatedInput, partialOutput, reason);
                        } else if (reservationId) {
                            await BillingBroker.releaseFull(reservationId);
                        }

                        if (!controller.signal.aborted) {
                            const normalized = ErrorNormalizer.normalize(err);
                            streamController.enqueue(encoder.encode(`data: ${JSON.stringify({ error: normalized.message, code: normalized.code })}\n\n`));
                        }
                        streamController.close();
                    }
                }
            });

            return sseStream;

        } catch (error: any) {
            // Immediate failure cleanup (before stream started)
            clearTimeout(timeoutId);
            await ConcurrencyManager.release(userId, modelKey, lockId);
            if (reservationId) await BillingBroker.releaseFull(reservationId);

            throw ErrorNormalizer.normalize(error);
        }
    }
}
