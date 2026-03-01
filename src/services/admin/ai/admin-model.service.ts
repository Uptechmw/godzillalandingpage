import { prisma } from '@/lib/db';
import { ModelKey, MODEL_REGISTRY } from '../../ai/registry';
import { RegistryOverrideService } from './registry-override.service';

/**
 * Service for managing AI models from the admin perspective.
 */
export class AdminModelService {
    /**
     * Lists all models with their effective configuration (registry + overrides).
     */
    static async listModels() {
        const modelKeys = Object.keys(MODEL_REGISTRY) as ModelKey[];

        return await Promise.all(modelKeys.map(async (key) => {
            const effective = await RegistryOverrideService.getEffectiveConfig(key);
            const override = await prisma.modelOverride.findUnique({ where: { modelKey: key } });

            return {
                key,
                name: MODEL_REGISTRY[key].name,
                provider: MODEL_REGISTRY[key].provider,
                effective,
                hasOverride: !!override,
                enabled: override?.enabled ?? true
            };
        }));
    }

    /**
     * Kill switch for a model.
     */
    static async toggleModel(modelKey: string, enabled: boolean, adminId: string) {
        await prisma.modelOverride.upsert({
            where: { modelKey },
            update: { enabled },
            create: { modelKey, enabled }
        });

        await prisma.auditLog.create({
            data: {
                adminId,
                action: enabled ? 'ENABLE_MODEL' : 'DISABLE_MODEL',
                module: 'AI_MODELS',
                targetId: modelKey
            }
        });
    }
}
