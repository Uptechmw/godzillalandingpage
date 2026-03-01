import { ProviderName, ModelKey, MODEL_REGISTRY } from "../registry";
import { BaseProvider } from "./base.provider";
import { GeminiProvider } from "./gemini";
import { ClaudeProvider } from "./claude";

export class ProviderFactory {
    private static instances: Map<ProviderName, BaseProvider> = new Map();

    /**
     * Retrieves the singleton instance for a specific provider.
     */
    static getProvider(providerName: ProviderName): BaseProvider {
        let instance = this.instances.get(providerName);

        if (!instance) {
            switch (providerName) {
                case "gemini":
                    instance = new GeminiProvider();
                    break;
                case "anthropic":
                    instance = new ClaudeProvider();
                    break;
                default:
                    throw new Error(`Unsupported provider: ${providerName}`);
            }
            this.instances.set(providerName, instance);
        }

        return instance;
    }

    /**
     * Helper to get provider instance directly from a model key.
     */
    static getForModel(modelKey: ModelKey): BaseProvider {
        const config = MODEL_REGISTRY[modelKey];
        if (!config) {
            throw new Error(`Model ${modelKey} not found in registry.`);
        }
        return this.getProvider(config.provider);
    }
}
