import { redis } from '@/lib/redis';
import { ModelKey } from '../registry';
import { AtomicBrokerError } from '../utils/normalizer';

export class ConcurrencyManager {
    /**
     * Acquires a concurrency lock for a specific user and model.
     * Uses a Redis Lua script to ensure atomic check-and-set.
     */
    static async acquire(userId: string, modelKey: ModelKey, limit: number, timeoutMs: number): Promise<string> {
        const key = `concurrency:${userId}:${modelKey}`;
        const now = Date.now();
        const lockId = crypto.randomUUID();

        const script = `
            local key = KEYS[1]
            local now = tonumber(ARGV[1])
            local limit = tonumber(ARGV[2])
            local timeout = tonumber(ARGV[3])
            local lockId = ARGV[4]

            redis.call('ZREMRANGEBYSCORE', key, 0, now)
            local count = redis.call('ZCARD', key)

            if count < limit then
                redis.call('ZADD', key, now + timeout, lockId)
                redis.call('EXPIRE', key, math.ceil(timeout / 1000) + 60)
                return "OK"
            else
                return "LIMIT_REACHED"
            end
        `;

        const result = await redis.eval(script, [key], [now, limit, timeoutMs, lockId]) as string;

        if (result !== "OK") {
            throw new AtomicBrokerError(
                "CONCURRENCY_LIMIT_REACHED",
                `Too many simultaneous requests. Limit for ${modelKey} is ${limit}.`
            );
        }

        return lockId;
    }

    /**
     * Releases the specific lock acquired by a request.
     */
    static async release(userId: string, modelKey: ModelKey, lockId: string): Promise<void> {
        const key = `concurrency:${userId}:${modelKey}`;
        await redis.zrem(key, lockId);
    }
}
