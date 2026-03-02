import Anthropic from "@anthropic-ai/sdk";
import { BaseProvider, StreamOptions } from "./base.provider";
import { MODEL_REGISTRY } from "../registry";

export class ClaudeProvider extends BaseProvider {
    private client: Anthropic;

    constructor() {
        super();
        this.client = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY || "",
        });
    }

    async streamChat(messages: any[], options: StreamOptions): Promise<void> {
        const config = MODEL_REGISTRY[options.modelKey];
        if (!config) throw new Error(`Model ${options.modelKey} not found in registry`);

        const isThinkingModel = config.capabilities.thinking;

        const thinkingConfig = isThinkingModel ? {
            type: "enabled" as const,
            budget_tokens: Math.min(options.maxTokens || 16000, 32000)
        } : undefined;

        try {
            const stream = await this.client.messages.create({
                model: options.modelKey,
                max_tokens: options.maxTokens || config.maxOutputTokens,
                system: options.system,
                messages: messages,
                temperature: options.temperature,
                thinking: thinkingConfig as any,
                stream: true,
            }, {
                signal: options.abortSignal,
            });

            let inputTokens = 0;
            let outputTokens = 0;

            for await (const chunk of stream) {
                if (chunk.type === "message_start") {
                    inputTokens = chunk.message.usage.input_tokens;
                }

                if (chunk.type === "content_block_delta") {
                    if (chunk.delta.type === "text_delta") {
                        options.onChunk(chunk.delta.text);
                    }
                    if (chunk.delta.type === "thinking_delta") {
                        // Thinking blocks are wrapped in custom markers for the UI
                        options.onChunk(`<thinking>${chunk.delta.thinking}</thinking>`);
                    }
                }

                if (chunk.type === "message_delta") {
                    outputTokens = chunk.usage.output_tokens;
                }
            }

            options.onUsage({ inputTokens, outputTokens });

        } catch (error: any) {
            // Anthropic SDK throws AbortError if signal is triggered
            throw error;
        }
    }
}
