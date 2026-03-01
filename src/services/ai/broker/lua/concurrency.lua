local key = KEYS[1]
local now = tonumber(ARGV[1])
local limit = tonumber(ARGV[2])
local timeout = tonumber(ARGV[3])
local lockId = ARGV[4]

-- 1. Remove expired entries
redis.call('ZREMRANGEBYSCORE', key, 0, now)

-- 2. Count active entries
local count = redis.call('ZCARD', key)

if count < limit then
    -- 3. Add current request with expiration timestamp as score
    redis.call('ZADD', key, now + timeout, lockId)
    -- 4. Ensure the keyspace itself expires as a fallback
    redis.call('EXPIRE', key, math.ceil(timeout / 1000) + 60)
    return "OK"
else
    return "LIMIT_REACHED"
end
