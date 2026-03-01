import { Redis } from '@upstash/redis';

// Initialize Redis client lazily to prevent build-time errors
export const redis = process.env.UPSTASH_REDIS_REST_URL
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
    })
    : null as any; // Fallback for build time; will throw if used without keys at runtime
