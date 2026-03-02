import { Prisma } from '@prisma/client';

export type CanonicalErrorCode =
    // Auth
    | "AUTH_REQUIRED"
    | "AUTH_INVALID_CREDENTIALS"
    | "AUTH_EMAIL_IN_USE"
    | "AUTH_TOKEN_EXPIRED"
    | "AUTH_FORBIDDEN"
    // Billing
    | "INSUFFICIENT_FUNDS"
    | "PAYMENT_REQUIRED"
    | "BILLING_PROVIDER_ERROR"
    // AI / Broker
    | "MODEL_UNAVAILABLE"
    | "MODEL_TIMEOUT"
    | "RATE_LIMITED"
    | "CONCURRENCY_LIMIT_REACHED"
    | "UPSTREAM_PROVIDER_ERROR"
    | "INVALID_MODEL_KEY"
    | "REQUEST_TOO_LARGE"
    | "IDEMPOTENCY_ERROR"
    | "IDEMPOTENCY_MISMATCH"
    // System
    | "VALIDATION_ERROR"
    | "NETWORK_ERROR"
    | "INTERNAL_ERROR"
    | "SERVICE_UNAVAILABLE"
    | "INTERNAL_BROKER_ERROR";

export class GodzillaBrokerError extends Error {
    constructor(
        public code: CanonicalErrorCode,
        message: string,
        public details?: any,
        public requestId?: string
    ) {
        super(message);
        this.name = 'GodzillaBrokerError';
    }

    toJSON() {
        return {
            success: false,
            errorCode: this.code,
            message: this.message,
            details: this.details,
            requestId: this.requestId
        };
    }
}

/**
 * Normalizes unknown exceptions into Stripe-like Canonical Error Codes.
 */
export class ErrorNormalizer {
    static normalize(error: any, requestId?: string): GodzillaBrokerError {
        if (error instanceof GodzillaBrokerError) {
            if (requestId) error.requestId = requestId;
            return error;
        }

        // Prisma Concurrency / Lock conflict
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2034') {
                return new GodzillaBrokerError("CONCURRENCY_LIMIT_REACHED", "Simultaneous transaction conflict detected.", null, requestId);
            }
        }

        // Generic HTTP rate limit from Anthropic/Google
        if (error.status === 429) {
            return new GodzillaBrokerError("UPSTREAM_PROVIDER_ERROR", "The AI provider is currently at capacity. Please retry.", null, requestId);
        }

        return new GodzillaBrokerError("INTERNAL_BROKER_ERROR", "An unexpected system error occurred.", { original: error.message }, requestId);
    }

    static httpStatus(code: CanonicalErrorCode): number {
        switch (code) {
            case "AUTH_REQUIRED":
            case "AUTH_INVALID_CREDENTIALS":
            case "AUTH_TOKEN_EXPIRED": return 401;
            case "AUTH_FORBIDDEN": return 403;
            case "AUTH_EMAIL_IN_USE": return 409;
            case "INSUFFICIENT_FUNDS": return 402;
            case "VALIDATION_ERROR": return 400;
            case "RATE_LIMITED":
            case "CONCURRENCY_LIMIT_REACHED": return 429;
            case "SERVICE_UNAVAILABLE": return 503;
            default: return 500;
        }
    }
}
