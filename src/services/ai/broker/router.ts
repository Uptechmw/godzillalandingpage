import { createHash } from 'crypto';
import { ModelKey, MODEL_REGISTRY } from '../registry';
import { ProviderFactory } from '../providers/factory';
import { BillingBroker } from './billing';
import { ConcurrencyManager } from './concurrency';
import { RateLimiter } from './rate-limit';
import { AuditLogger } from '../utils/logger';
import { ErrorNormalizer, AtomicBrokerError } from '../utils/normalizer';
import { Tokenizer } from '../security/tokenizer';

export interface ChatRequest {
    userId: string;
    modelKey: ModelKey;
    messages: any[];
    maxTokens?: number;
    idempotencyKey?: string;
}

export class ExecutionRouter {
    /**
     * Orchestrates the hardened AI execution lifecycle and returns a ReadableStream.
     */
    static async execute(req: any, params: any): Promise<ReadableStream> {
        const encoder = new TextEncoder();

        return new ReadableStream({
            async start(controller) {
                try {
                    const chatRequest: ChatRequest = {
                        userId: params.userId,
                        modelKey: params.modelKey,
                        messages: params.prompt ? [{ role: 'user', content: params.prompt }] : params.messages,
                        maxTokens: params.maxTokens,
                        idempotencyKey: params.idempotencyKey
                    };

                    await ExecutionRouter.stream(chatRequest, (chunk) => {
                        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`));
                    });

                    controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                    controller.close();
                } catch (error: any) {
                    const normalized = ErrorNormalizer.normalize(error);
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: normalized.message, code: normalized.code })}\n\n`));
                    controller.close();
                }
            }
        });
    }

    /**
     * Orchestrates the hardened AI execution lifecycle.
     */
    static async stream(req: ChatRequest, onChunk: (content: string) => void) {
        const config = MODEL_REGISTRY[req.modelKey];
        const ikey = req.idempotencyKey || crypto.randomUUID();

        // 1. Generate Request Hash for replay protection
        const requestHash = createHash('sha256')
            .update(JSON.stringify({
                userId: req.userId,
                modelKey: req.modelKey,
                messages: req.messages,
                maxTokens: req.maxTokens
            }))
            .digest('hex');

        // 2. Distributed Rate Limiting (Atomic Lua)
        await RateLimiter.check(req.userId, config.rateLimits.requestsPerMinute);

        // 3. Distributed Concurrency Lock (Atomic Lua)
        const lockId = await ConcurrencyManager.acquire(
            req.userId,
            req.modelKey,
            config.rateLimits.concurrentRequests,
            config.timeoutMs
        );

        let reservation;
        let abortController = new AbortController();
        let timeoutId: NodeJS.Timeout | null = null;
        let estimatedInputTokens = 0;

        try {
            // 4. Atomic Billing Reservation (Stripe-grade)
            estimatedInputTokens = Tokenizer.countTokens(JSON.stringify(req.messages));
            reservation = await BillingBroker.reserve(
                req.userId,
                req.modelKey,
                estimatedInputTokens,
                req.maxTokens || config.maxOutputTokens,
                ikey,
                requestHash
            );

            // 5. Provider Execution
            const provider = ProviderFactory.getProvider(config.provider);

            // Mark state: PROVIDER_STARTED (Atomic DB toggle)
            await BillingBroker.markStarted(reservation.id);

            // Hard timeout enforcement
            timeoutId = setTimeout(() => {
                abortController.abort();
            }, config.timeoutMs);

            let streamedContent = "";
            let usageMetadata: any = null;

            await provider.streamChat(
                req.messages,
                {
                    modelKey: req.modelKey,
                    maxTokens: req.maxTokens || config.maxOutputTokens,
                    abortSignal: abortController.signal,
                    onChunk: (chunk: string) => {
                        streamedContent += chunk;
                        onChunk(chunk);
                    },
                    onUsage: (usage: any) => {
                        usageMetadata = usage;
                    }
                }
            );

            // 6. Authoritative Finalization (Commit)
            if (timeoutId) clearTimeout(timeoutId);

            const finalInput = usageMetadata?.inputTokens || estimatedInputTokens;
            const finalOutput = usageMetadata?.outputTokens || Tokenizer.countTokens(streamedContent);

            await BillingBroker.commit(reservation.id, finalInput, finalOutput, 'COMMITTED');

        } catch (error: any) {
            if (timeoutId) clearTimeout(timeoutId);

            const isAbort = error.name === 'AbortError' || abortController.signal.aborted;

            if (reservation) {
                if (isAbort) {
                    // Partial charge for what was already streamed
                    // Note: In refined implementation, error could carry partial content
                    const partialOutput = Tokenizer.countTokens(error.partialResponse || "");
                    await BillingBroker.commit(reservation.id, estimatedInputTokens, partialOutput, 'TIMEOUT');
                } else {
                    // Fatal provider failure -> Full refund
                    await BillingBroker.release(reservation.id, 'FAILED');
                }
            }

            throw ErrorNormalizer.normalize(error);
        } finally {
            // 7. Cleanup Concurrency Lock
            await ConcurrencyManager.release(req.userId, req.modelKey, lockId);
        }
    }
}
