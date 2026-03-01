import { Prisma } from '@prisma/client';

export type CanonicalErrorCode =
    | "INSUFFICIENT_FUNDS"
    | "CONCURRENCY_LIMIT_REACHED"
    | "MODEL_TIMEOUT"
    | "UPSTREAM_PROVIDER_ERROR"
    | "INVALID_MODEL_KEY"
    | "IDEMPOTENCY_ERROR"
    | "INTERNAL_BROKER_ERROR";

export class AtomicBrokerError extends Error {
    constructor(public code: CanonicalErrorCode, message: string, public details?: any) {
        super(message);
        this.name = 'AtomicBrokerError';
    }
}

/**
 * Normalizes unknown exceptions from Postgres, Redis, Google, or Anthropic 
 * into Stripe-like Canonical Error Codes.
 */
export class ErrorNormalizer {
    static normalize(error: any): AtomicBrokerError {
        if (error instanceof AtomicBrokerError) return error;

        // Prisma Concurrency / Lock conflict
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2034') {
                return new AtomicBrokerError("CONCURRENCY_LIMIT_REACHED", "Simultaneous transaction conflict detected.");
            }
        }

        // Generic HTTP rate limit from Anthropic/Google
        if (error.status === 429) {
            return new AtomicBrokerError("UPSTREAM_PROVIDER_ERROR", "The AI provider is currently at capacity. Please retry.");
        }

        return new AtomicBrokerError("INTERNAL_BROKER_ERROR", "An unexpected system error occurred.", { original: error.message });
    }
}
