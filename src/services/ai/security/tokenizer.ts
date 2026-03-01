/**
 * Minimal fallback tokenizer used when upstream provider usage metadata is missing or aborted mid-stream.
 * In a real-world scenario, you would use a library like `tiktoken` here.
 * For this sandbox, we use a simple heuristic: 1 token ≈ 4 characters.
 */
export class FallbackTokenizer {
    static count(text: string): number {
        if (!text) return 0;
        // Rough estimation: OpenAI / Anthropic average ~4 chars per token for English text
        return Math.ceil(text.length / 4);
    }
}
