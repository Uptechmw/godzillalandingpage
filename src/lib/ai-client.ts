/**
 * Godzilla Coder Desktop AI Client
 * Handles streaming responses and abort propagation.
 */
export class AIClient {
    /**
     * Streams a chat completion from the brokerage backend.
     */
    static async streamChat(params: {
        modelKey: string;
        prompt: string;
        system?: string;
        onChunk: (text: string) => void;
        onThinking?: (thoughts: string) => void;
        onError?: (error: string, code?: string) => void;
    }): Promise<{ abort: () => void }> {
        const controller = new AbortController();
        const ikey = crypto.randomUUID(); // Idempotency key

        fetch("/api/ai/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-idempotency-key": ikey,
            },
            body: JSON.stringify({
                modelKey: params.modelKey,
                prompt: params.prompt,
                system: params.system,
            }),
            signal: controller.signal,
        })
            .then(async (response) => {
                if (!response.ok) {
                    const err = await response.json();
                    params.onError?.(err.error, err.code);
                    return;
                }

                const reader = response.body?.getReader();
                const decoder = new TextDecoder();

                while (true) {
                    const { done, value } = await reader!.read();
                    if (done) break;

                    const raw = decoder.decode(value);
                    const lines = raw.split("\n");

                    for (const line of lines) {
                        if (line.startsWith("data: ")) {
                            const data = line.slice(6).trim();
                            if (data === "[DONE]") break;

                            try {
                                const parsed = JSON.parse(data);
                                if (parsed.text) params.onChunk(parsed.text);
                                if (parsed.thinking) params.onThinking?.(parsed.thinking);
                                if (parsed.error) params.onError?.(parsed.error, parsed.code);
                            } catch (e) {
                                // Handle partial JSON or malformed lines
                            }
                        }
                    }
                }
            })
            .catch((err) => {
                if (err.name === "AbortError") {
                    console.log("Request aborted by user.");
                } else {
                    params.onError?.(err.message);
                }
            });

        return { abort: () => controller.abort() };
    }
}
