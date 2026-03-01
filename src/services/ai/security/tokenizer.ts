export class Tokenizer {
    /**
     * Fallback tokenizer that uses simple character-based estimation for cost calculation
     * when upstream metadata is missing or partial.
     */
    static countTokens(text: string): number {
        if (!text) return 0;
        // Standard heuristic: 1 token ~= 4 characters for English text
        return Math.ceil(text.length / 4);
    }
}
