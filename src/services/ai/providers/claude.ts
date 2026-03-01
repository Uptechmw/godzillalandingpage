import Anthropic from "@anthropic-ai/sdk";
import { BaseProvider, ExecutionOptions, StreamChunk, ProviderUsage } from "./base.provider";
import { ModelKey, MODEL_REGISTRY } from "../registry";

export class ClaudeProvider extends BaseProvider {
    private client: Anthropic;

    constructor() {
        super();
        this.client = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY || "",
        });
    }

    async *stream(
        modelKey: ModelKey,
        prompt: string,
        options: ExecutionOptions
    ): AsyncGenerator<StreamChunk, ProviderUsage | null> {
        const config = MODEL_REGISTRY[modelKey];

        // Configure thinking mode if the model supports it and we are on the thinking tier
        const isThinkingModel = config.capabilities.thinking;
        const thinkingConfig = isThinkingModel ? {
            type: "enabled" as const,
            budget_tokens: Math.min(options.maxTokens || 16000, 32000)
        } : undefined;

        try {
            const stream = await this.client.messages.create({
                model: modelKey,
                max_tokens: options.maxTokens || config.maxOutputTokens,
                system: options.system,
                messages: [{ role: "user", content: prompt }],
                temperature: options.temperature,
                thinking: thinkingConfig as any,
                stream: true,
            }, {
                // Native AbortSignal support!
                signal: options.signal,
            });

            let inputTokens = 0;
            let outputTokens = 0;

            for await (const chunk of stream) {
                if (chunk.type === "message_start") {
                    inputTokens = chunk.message.usage.input_tokens;
                }

                if (chunk.type === "content_block_delta") {
                    if (chunk.delta.type === "text_delta") {
                        yield { text: chunk.delta.text };
                    }
                    if (chunk.delta.type === "thinking_delta") {
                        yield { text: "", thinking: chunk.delta.thinking };
                    }
                }

                if (chunk.type === "message_delta") {
                    outputTokens = chunk.usage.output_tokens;
                }
            }

            return { input: inputTokens, output: outputTokens };
        } catch (error: any) {
            // Anthropic SDK throws AbortError if signal is triggered
            throw error;
        }
    }
}
