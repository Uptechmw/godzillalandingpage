import { Redis } from '@upstash/redis';

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

let redisInstance: Redis | null = null;

export function getRedisClient(): Redis | null {
    if (redisInstance) return redisInstance;

    if (!url || !token) {
        if (process.env.NODE_ENV === 'production') {
            console.error("CRITICAL: Redis credentials missing in production!");
        } else {
            console.warn("Redis credentials missing. Rate limiting will be disabled.");
        }
        return null;
    }

    redisInstance = new Redis({
        url: url,
        token: token,
    });

    return redisInstance;
}

// For backward compatibility while we refactor usages
export const redis = (url && token) ? new Redis({ url, token }) : null as unknown as Redis;
