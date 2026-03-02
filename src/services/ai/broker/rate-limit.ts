import fs from 'fs';
import path from 'path';
import { redis } from '@/lib/redis';
import { GodzillaBrokerError } from '../utils/normalizer';

const RATE_LIMIT_SCRIPT = fs.readFileSync(path.join(process.cwd(), 'src/services/ai/broker/lua/rate_limit.lua'), 'utf8');

export class RateLimiter {
    /**
     * Enforces a sliding window rate limit using an atomic Redis Lua script.
     */
    static async check(userId: string, targetRpm: number): Promise<void> {
        const windowSizeMs = 60000;
        const key = `ratelimit:${userId}`;
        const now = Date.now();
        const windowStart = now - windowSizeMs;
        const requestId = crypto.randomUUID();

        const result = await redis.eval(
            RATE_LIMIT_SCRIPT,
            [key],
            [now, windowStart, targetRpm, requestId]
        ) as string;

        if (result !== "OK") {
            throw new GodzillaBrokerError(
                "UPSTREAM_PROVIDER_ERROR",
                "You are sending requests too quickly. Please wait a moment."
            );
        }
    }
}
