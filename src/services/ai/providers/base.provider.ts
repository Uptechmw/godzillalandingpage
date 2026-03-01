import { ModelKey } from "../registry";

export interface StreamOptions {
    modelKey: ModelKey;
    maxTokens?: number;
    temperature?: number;
    system?: string;
    abortSignal?: AbortSignal;
    onChunk: (chunk: string) => void;
    onUsage: (usage: { inputTokens: number; outputTokens: number }) => void;
}

/**
 * Abstract base class for all AI providers.
 * Enforces a consistent interface for streaming and lifecycle management.
 */
export abstract class BaseProvider {
    /**
     * Executes a streaming chat request with standard callbacks for usage and content.
     * Implementations MUST respect the abortSignal.
     */
    abstract streamChat(
        messages: any[],
        options: StreamOptions
    ): Promise<void>;
}
