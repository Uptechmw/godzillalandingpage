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

        // Create an abort promise that rejects when signal fires
        const abortPromise = options.abortSignal
            ? new Promise<never>((_, reject) => {
                if (options.abortSignal!.aborted) {
                    reject(new DOMException('Aborted', 'AbortError'));
                    return;
                }
                options.abortSignal!.addEventListener('abort', () => {
                    reject(new DOMException('Aborted', 'AbortError'));
                }, { once: true });
            })
            : null;

        // 10s startup timeout: if SDK doesn't return a stream handle within this
        // window, we abort early to prevent hanging connections and wasted reservation time.
        // This is separate from the per-request timeout in ExecutionRouter which covers
        // the entire streaming lifecycle.
        const STARTUP_TIMEOUT_MS = 10_000;
        let startupTimer: ReturnType<typeof setTimeout> | null = null;
        const startupTimeout = new Promise<never>((_, reject) => {
            startupTimer = setTimeout(() => {
                reject(new DOMException('Model initialization timed out', 'AbortError'));
            }, STARTUP_TIMEOUT_MS);
        });

        const sdkCall = model.generateContentStream({
            contents: messages,
            generationConfig: {
                temperature: options.temperature,
                maxOutputTokens: options.maxTokens,
            },
        });

        // Race: SDK init vs abort vs startup timeout
        const racers: Promise<any>[] = [sdkCall, startupTimeout];
        if (abortPromise) racers.push(abortPromise);

        const result = await Promise.race(racers);

        // SDK returned successfully — clear the startup timeout
        if (startupTimer) clearTimeout(startupTimer);

        try {
            for await (const chunk of result.stream) {
                if (options.abortSignal?.aborted) {
                    throw new DOMException('Aborted', 'AbortError');
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
            // Ensure startup timer is cleared even if stream loop throws
            if (startupTimer) clearTimeout(startupTimer);
            throw error;
        }
    }
}
