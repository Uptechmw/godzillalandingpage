/**
 * Shared Error Taxonomy Mapping
 * Maps CanonicalErrorCode to user-friendly messages and actions.
 */

export type Severity = 'info' | 'warning' | 'error' | 'success';
export type ActionType = 'LOGIN_REQUIRED' | 'BUY_COINS' | 'RETRY_LATER' | 'CONTACT_SUPPORT' | 'NONE';

export interface ErrorUIMapping {
    message: string;
    severity: Severity;
    action: ActionType;
    persistent?: boolean;
}

export const ERROR_UI_MAP: Record<string, ErrorUIMapping> = {
    // Auth
    AUTH_REQUIRED: {
        message: 'Session expired. Please log in again.',
        severity: 'warning',
        action: 'LOGIN_REQUIRED',
        persistent: true
    },
    AUTH_INVALID_CREDENTIALS: {
        message: 'Invalid email or password.',
        severity: 'error',
        action: 'NONE'
    },
    AUTH_EMAIL_IN_USE: {
        message: 'This email is already registered.',
        severity: 'error',
        action: 'NONE'
    },
    AUTH_TOKEN_EXPIRED: {
        message: 'Your session has expired.',
        severity: 'warning',
        action: 'LOGIN_REQUIRED',
        persistent: true
    },
    AUTH_FORBIDDEN: {
        message: 'Access denied.',
        severity: 'error',
        action: 'NONE'
    },

    // Billing
    INSUFFICIENT_FUNDS: {
        message: 'Insufficient coins to complete this request.',
        severity: 'warning',
        action: 'BUY_COINS',
        persistent: true
    },
    PAYMENT_REQUIRED: {
        message: 'Payment required to use this model.',
        severity: 'warning',
        action: 'BUY_COINS'
    },

    // AI / Broker
    MODEL_UNAVAILABLE: {
        message: 'This model is temporarily unavailable.',
        severity: 'error',
        action: 'RETRY_LATER'
    },
    MODEL_TIMEOUT: {
        message: 'The model took too long to respond.',
        severity: 'warning',
        action: 'RETRY_LATER'
    },
    RATE_LIMITED: {
        message: 'Too many requests. Please wait a minute.',
        severity: 'warning',
        action: 'RETRY_LATER'
    },
    CONCURRENCY_LIMIT_REACHED: {
        message: 'You have too many active requests.',
        severity: 'warning',
        action: 'RETRY_LATER'
    },
    UPSTREAM_PROVIDER_ERROR: {
        message: 'The AI provider returned an error.',
        severity: 'error',
        action: 'RETRY_LATER'
    },

    // System
    VALIDATION_ERROR: {
        message: 'Check the highlighted fields and try again.',
        severity: 'warning',
        action: 'NONE'
    },
    NETWORK_ERROR: {
        message: 'Network issue detected. Check your connection.',
        severity: 'error',
        action: 'RETRY_LATER'
    },
    INTERNAL_ERROR: {
        message: 'An internal system error occurred.',
        severity: 'error',
        action: 'CONTACT_SUPPORT'
    },
    SERVICE_UNAVAILABLE: {
        message: 'Service is temporarily down for maintenance.',
        severity: 'error',
        action: 'RETRY_LATER'
    }
};

/**
 * Resolves a canonical error code to its UI mapping.
 */
export function resolveErrorUI(code: string, fallbackMessage?: string): ErrorUIMapping {
    return ERROR_UI_MAP[code] || {
        message: fallbackMessage || 'An unexpected error occurred.',
        severity: 'error',
        action: 'NONE'
    };
}
