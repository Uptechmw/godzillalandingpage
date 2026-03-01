import fs from 'fs';
import path from 'path';
import { redis } from '@/lib/redis';
import { ModelKey } from '../registry';
import { AtomicBrokerError } from '../utils/normalizer';

const CONCURRENCY_SCRIPT = fs.readFileSync(path.join(process.cwd(), 'src/services/ai/broker/lua/concurrency.lua'), 'utf8');

export class ConcurrencyManager {
    /**
     * Acquires a concurrency lock for a specific user and model using an atomic Lua script.
     */
    static async acquire(userId: string, modelKey: ModelKey, limit: number, timeoutMs: number): Promise<string> {
        const key = `concurrency:${userId}:${modelKey}`;
        const now = Date.now();
        const lockId = crypto.randomUUID();

        // Atomic Lua script handles expiration-reap and concurrent-count-check
        const result = await redis.eval(
            CONCURRENCY_SCRIPT,
            [key],
            [now, limit, timeoutMs, lockId]
        ) as string;

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
