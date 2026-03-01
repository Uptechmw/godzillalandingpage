import { prisma } from '@/lib/db';
import { ModelKey, MODEL_REGISTRY, ModelConfig } from '../../ai/registry';

/**
 * Service to manage and apply administrative overrides to AI models.
 */
export class RegistryOverrideService {
    /**
     * Fetches the effective configuration for a model, merging registry defaults with DB overrides.
     */
    static async getEffectiveConfig(modelKey: ModelKey): Promise<ModelConfig> {
        const base = MODEL_REGISTRY[modelKey];
        const override = await prisma.modelOverride.findUnique({ where: { modelKey } });

        if (!override) return base;

        // Merge overrides onto base config
        return {
            ...base,
            maxOutputTokens: override.maxOutputTokens ?? base.maxOutputTokens,
            timeoutMs: override.timeoutMs ?? base.timeoutMs,
            rateLimits: {
                requestsPerMinute: override.rateLimitRpm ?? base.rateLimits.requestsPerMinute,
                concurrentRequests: override.concurrencyLimit ?? base.rateLimits.concurrentRequests,
            },
            // Apply pricing modifiers if present
            pricing: override.pricingModifiers ? {
                ...base.pricing,
                ...(override.pricingModifiers as any)
            } : base.pricing
        };
    }

    /**
     * Updates or creates a model override.
     */
    static async setOverride(modelKey: string, data: Partial<Omit<ModelConfig, 'provider' | 'capabilities'>>, adminId: string): Promise<void> {
        await prisma.modelOverride.upsert({
            where: { modelKey },
            update: {
                maxOutputTokens: data.maxOutputTokens,
                timeoutMs: data.timeoutMs,
                rateLimitRpm: data.rateLimits?.requestsPerMinute,
                concurrencyLimit: data.rateLimits?.concurrentRequests,
                // We'd map data.pricing to pricingModifiers...
            },
            create: {
                modelKey,
                enabled: true,
                maxOutputTokens: data.maxOutputTokens,
                timeoutMs: data.timeoutMs,
                rateLimitRpm: data.rateLimits?.requestsPerMinute,
                concurrencyLimit: data.rateLimits?.concurrentRequests,
            }
        });

        await prisma.auditLog.create({
            data: {
                adminId,
                action: 'UPDATE_MODEL_CONFIG',
                module: 'AI_MODELS',
                targetId: modelKey,
                newValue: data as any
            }
        });
    }
}
