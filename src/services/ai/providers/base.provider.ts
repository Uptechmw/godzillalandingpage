import { ModelKey } from "../registry";

export interface ProviderUsage {
    input: number;
    output: number;
    metadata?: any;
}

export interface StreamChunk {
    text: string;
    thinking?: string; // For Claude thinking blocks
}

export interface ExecutionOptions {
    system?: string;
    temperature?: number;
    maxTokens?: number;
    signal?: AbortSignal;
}

/**
 * Abstract base class for all AI providers.
 * Enforces a consistent interface for streaming and lifecycle management.
 */
export abstract class BaseProvider {
    /**
     * Generates a stream of content for a specific model.
     * Must respect the AbortSignal to prevent wasted compute/tokens.
     */
    abstract stream(
        modelKey: ModelKey,
        prompt: string,
        options: ExecutionOptions
    ): AsyncGenerator<StreamChunk, ProviderUsage | null>;
}
