import { redis } from '@/lib/redis';

/**
 * Service for administrative rate limiting using Redis.
 * Uses Lua scripts for atomic increment and expiry.
 */
export class RateLimiterService {
    /**
     * Checks if a request is allowed based on rate limits.
     * @param key Unique key for the limit (e.g., ip:login or admin:api)
     * @param limit Maximum number of requests allowed in the window
     * @param windowInSeconds Time window in seconds
     */
    static async check(key: string, limit: number, windowInSeconds: number): Promise<boolean> {
        if (!redis) return true; // Fail open if Redis is not configured (or fail closed in strict prod)

        const script = `
            local key = KEYS[1]
            local limit = tonumber(ARGV[1])
            local window = tonumber(ARGV[2])

            local current = redis.call('get', key)
            if current and tonumber(current) >= limit then
                return 0
            else
                local res = redis.call('incr', key)
                if tonumber(res) == 1 then
                    redis.call('expire', key, window)
                end
                return 1
            end
        `;

        try {
            const result = await redis.eval(script, [key], [limit, windowInSeconds]);
            return result === 1;
        } catch (error) {
            console.error(`[RateLimiterService] Redis error:`, error);
            return true; // Fail open for resilience, or false for maximum security
        }
    }

    /**
     * Specialized check for login attempts per IP.
     */
    static async checkLoginAttempt(ip: string): Promise<boolean> {
        return this.check(`ratelimit:login:${ip}`, 5, 60); // 5 attempts per minute
    }

    /**
     * Specialized check for admin API requests per user.
     */
    static async checkAdminAPI(adminId: string): Promise<boolean> {
        return this.check(`ratelimit:api:${adminId}`, 20, 60); // 20 requests per minute
    }
}
