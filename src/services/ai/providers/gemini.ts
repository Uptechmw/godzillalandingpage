import {
    GoogleGenerativeAI,
} from "@google/generative-ai";
import { BaseProvider, StreamOptions } from "./base.provider";

export class GeminiProvider extends BaseProvider {
    private genAI: GoogleGenerativeAI;

    constructor() {
        super();
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    }

    async streamChat(messages: any[], options: StreamOptions): Promise<void> {
        const model = this.genAI.getGenerativeModel({
            model: options.modelKey,
            systemInstruction: options.system,
        });

        try {
            const result = await model.generateContentStream({
                contents: messages,
                generationConfig: {
                    temperature: options.temperature,
                    maxOutputTokens: options.maxTokens,
                },
            });

            for await (const chunk of result.stream) {
                if (options.abortSignal?.aborted) {
                    throw options.abortSignal.reason;
                }
                const text = chunk.text();
                options.onChunk(text);
            }

            const response = await result.response;
            if (response.usageMetadata) {
                options.onUsage({
                    inputTokens: response.usageMetadata.promptTokenCount,
                    outputTokens: response.usageMetadata.candidatesTokenCount
                });
            }
        } catch (error: any) {
            throw error;
        }
    }
}
