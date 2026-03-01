export type ProviderName = 'gemini' | 'anthropic';

export type ModelKey =
    | 'gemini-3.1-pro'
    | 'gemini-3.1-pro-9b'
    | 'gemini-3-flash'
    | 'claude-3-7-sonnet-thinking'
    | 'claude-3-7-opus-thinking';

export interface PricingSnapshot {
    version: string;
    baseInputMultiplier: number;
    baseOutputMultiplier: number;
    thinkingMultiplier?: number;
}

export interface ModelConfig {
    name: string;
    provider: ProviderName;
    maxOutputTokens: number;
    timeoutMs: number;
    rateLimits: {
        requestsPerMinute: number;
        concurrentRequests: number;
    };
    pricing: PricingSnapshot;
    capabilities: {
        thinking: boolean;
        streaming: boolean;
        functionCalling: boolean;
    };
}

export const MODEL_REGISTRY: Readonly<Record<ModelKey, Readonly<ModelConfig>>> = Object.freeze({
    'gemini-3.1-pro': Object.freeze({
        name: 'Gemini 1.5 Pro (3.1)',
        provider: 'gemini',
        maxOutputTokens: 8192,
        timeoutMs: 60000,
        rateLimits: { requestsPerMinute: 20, concurrentRequests: 2 },
        pricing: { version: 'v2026.03.01', baseInputMultiplier: 1.5, baseOutputMultiplier: 2.5 },
        capabilities: { thinking: false, streaming: true, functionCalling: true }
    }),
    'gemini-3.1-pro-9b': Object.freeze({
        name: 'Gemini 1.5 Pro 9B',
        provider: 'gemini',
        maxOutputTokens: 8192,
        timeoutMs: 45000,
        rateLimits: { requestsPerMinute: 40, concurrentRequests: 4 },
        pricing: { version: 'v2026.03.01', baseInputMultiplier: 0.8, baseOutputMultiplier: 1.5 },
        capabilities: { thinking: false, streaming: true, functionCalling: true }
    }),
    'gemini-3-flash': Object.freeze({
        name: 'Gemini 1.5 Flash',
        provider: 'gemini',
        maxOutputTokens: 8192,
        timeoutMs: 30000,
        rateLimits: { requestsPerMinute: 120, concurrentRequests: 10 },
        pricing: { version: 'v2026.03.01', baseInputMultiplier: 0.1, baseOutputMultiplier: 0.2 },
        capabilities: { thinking: false, streaming: true, functionCalling: true }
    }),
    'claude-3-7-sonnet-thinking': Object.freeze({
        name: 'Claude 3.7 Sonnet (Thinking)',
        provider: 'anthropic',
        maxOutputTokens: 64000,
        timeoutMs: 120000,
        rateLimits: { requestsPerMinute: 10, concurrentRequests: 1 },
        pricing: { version: 'v2026.03.01', baseInputMultiplier: 3.0, baseOutputMultiplier: 15.0, thinkingMultiplier: 15.0 },
        capabilities: { thinking: true, streaming: true, functionCalling: true }
    }),
    'claude-3-7-opus-thinking': Object.freeze({
        name: 'Claude 3.7 Opus (Thinking)',
        provider: 'anthropic',
        maxOutputTokens: 64000,
        timeoutMs: 180000,
        rateLimits: { requestsPerMinute: 5, concurrentRequests: 1 },
        pricing: { version: 'v2026.03.01', baseInputMultiplier: 15.0, baseOutputMultiplier: 75.0, thinkingMultiplier: 75.0 },
        capabilities: { thinking: true, streaming: true, functionCalling: true }
    }),
});
