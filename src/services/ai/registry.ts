export type ProviderName = 'gemini' | 'anthropic';

export type ModelKey =
    | 'gemini-3.1-pro-preview'
    | 'gemini-3-flash-preview'
    | 'gemini-3.1-pro-preview-customtools'
    | 'claude-sonnet-4-6'
    | 'claude-opus-4-6';

export interface PricingSnapshot {
    version: string;
    baseInputMultiplier: number;
    baseOutputMultiplier: number;
    thinkingMultiplier?: number;
}

export interface ModelConfig {
    name: string; // Internal name
    displayName: string; // User-facing clean name
    tagline: string; // Short description
    category: 'ui' | 'logic';
    recommendedFor: string[];
    isVisibleToUsers?: boolean;
    isPremium?: boolean;
    minCoinBalance?: number;
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
    'gemini-3.1-pro-preview': Object.freeze({
        name: 'Gemini 3.1 Pro Preview',
        displayName: 'Gemini 3.1 Pro',
        tagline: 'Optimized for UI and frontend generation',
        category: 'ui',
        recommendedFor: ['UI', 'Frontend', 'Quality'],
        provider: 'gemini',
        maxOutputTokens: 8192,
        timeoutMs: 60000,
        rateLimits: { requestsPerMinute: 20, concurrentRequests: 2 },
        pricing: { version: 'v2026.03.01', baseInputMultiplier: 1.5, baseOutputMultiplier: 2.5 },
        capabilities: { thinking: false, streaming: true, functionCalling: true }
    }),
    'gemini-3-flash-preview': Object.freeze({
        name: 'Gemini 3 Flash Preview',
        displayName: 'Gemini 3 Flash',
        tagline: 'Optimized for UI and fast iteration',
        category: 'ui',
        recommendedFor: ['UI', 'Frontend', 'Speed'],
        provider: 'gemini',
        maxOutputTokens: 8192,
        timeoutMs: 30000,
        rateLimits: { requestsPerMinute: 120, concurrentRequests: 10 },
        pricing: { version: 'v2026.03.01', baseInputMultiplier: 0.1, baseOutputMultiplier: 0.2 },
        capabilities: { thinking: false, streaming: true, functionCalling: true }
    }),
    'gemini-3.1-pro-preview-customtools': Object.freeze({
        name: 'Gemini 3.1 Pro Preview (Tools)',
        displayName: 'Gemini 3.1 Pro Tools',
        tagline: 'Optimized for tool-using agent workflows',
        category: 'logic',
        recommendedFor: ['Tools', 'Agents'],
        isVisibleToUsers: false,
        provider: 'gemini',
        maxOutputTokens: 8192,
        timeoutMs: 60000,
        rateLimits: { requestsPerMinute: 20, concurrentRequests: 2 },
        pricing: { version: 'v2026.03.01', baseInputMultiplier: 1.5, baseOutputMultiplier: 2.5 },
        capabilities: { thinking: false, streaming: true, functionCalling: true }
    }),
    'claude-sonnet-4-6': Object.freeze({
        name: 'Claude 4.6 Sonnet',
        displayName: 'Claude Sonnet 4.6',
        tagline: 'Optimized for backend logic and architecture',
        category: 'logic',
        recommendedFor: ['Logic', 'Architecture', 'Reasoning'],
        provider: 'anthropic',
        maxOutputTokens: 64000,
        timeoutMs: 120000,
        rateLimits: { requestsPerMinute: 10, concurrentRequests: 1 },
        pricing: { version: 'v2026.03.01', baseInputMultiplier: 3.0, baseOutputMultiplier: 15.0, thinkingMultiplier: 15.0 },
        capabilities: { thinking: true, streaming: true, functionCalling: true }
    }),
    'claude-opus-4-6': Object.freeze({
        name: 'Claude 4.6 Opus',
        displayName: 'Claude Opus 4.6',
        tagline: 'Optimized for complex reasoning and large refactors',
        category: 'logic',
        recommendedFor: ['Logic', 'Architecture', 'Deep reasoning'],
        isPremium: true,
        minCoinBalance: 500,
        provider: 'anthropic',
        maxOutputTokens: 64000,
        timeoutMs: 180000,
        rateLimits: { requestsPerMinute: 5, concurrentRequests: 1 },
        pricing: { version: 'v2026.03.01', baseInputMultiplier: 15.0, baseOutputMultiplier: 75.0, thinkingMultiplier: 75.0 },
        capabilities: { thinking: true, streaming: true, functionCalling: true }
    }),
});
