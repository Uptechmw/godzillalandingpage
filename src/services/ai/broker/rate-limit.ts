import { redis } from '@/lib/redis';
import { AtomicBrokerError } from '../utils/normalizer';

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

        const script = `
            local key = KEYS[1]
            local now = tonumber(ARGV[1])
            local windowStart = tonumber(ARGV[2])
            local limit = tonumber(ARGV[3])
            local requestId = ARGV[4]

            redis.call('ZREMRANGEBYSCORE', key, 0, windowStart)
            local count = redis.call('ZCARD', key)

            if count < limit then
                redis.call('ZADD', key, now, requestId)
                redis.call('EXPIRE', key, 65)
                return "OK"
            else
                return "LIMIT_REACHED"
            end
        `;

        const result = await redis.eval(script, [key], [now, windowStart, targetRpm, requestId]) as string;

        if (result !== "OK") {
            throw new AtomicBrokerError(
                "UPSTREAM_PROVIDER_ERROR",
                "You are sending requests too quickly. Please wait a moment."
            );
        }
    }
}
