import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold
} from "@google/generative-ai";
import { BaseProvider, ExecutionOptions, StreamChunk, ProviderUsage } from "./base.provider";
import { ModelKey } from "../registry";
import { AtomicBrokerError } from "../utils/normalizer";

export class GeminiProvider extends BaseProvider {
    private genAI: GoogleGenerativeAI;

    constructor() {
        super();
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    }

    async *stream(
        modelKey: ModelKey,
        prompt: string,
        options: ExecutionOptions
    ): AsyncGenerator<StreamChunk, ProviderUsage | null> {
        try {
            const model = this.genAI.getGenerativeModel({
                model: modelKey,
                systemInstruction: options.system,
            });

            const result = await model.generateContentStream({
                contents: [{ role: "user", parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: options.temperature,
                    maxOutputTokens: options.maxTokens,
                },
                // Note: The Google SDK doesn't natively accept an AbortSignal in generateContentStream directly yet,
                // but we monitor it within our loop to stop yielding.
            });

            let inputTokens = 0;
            let outputTokens = 0;

            for await (const chunk of result.stream) {
                // Immediate check for abort
                if (options.signal?.aborted) {
                    throw options.signal.reason || new Error("ABORTED");
                }

                const text = chunk.text();
                yield { text };
            }

            // Authoritative Metadata from final response
            const response = await result.response;
            if (response.usageMetadata) {
                inputTokens = response.usageMetadata.promptTokenCount;
                outputTokens = response.usageMetadata.candidatesTokenCount;
            }

            return { input: inputTokens, output: outputTokens };
        } catch (error: any) {
            if (error.name === "AbortError" || error === "CLIENT_DISCONNECT" || error === "TIMEOUT") {
                throw error;
            }
            throw error; // Let ErrorNormalizer handle upstream API errors
        }
    }
}
