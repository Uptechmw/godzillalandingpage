local key = KEYS[1]
local now = tonumber(ARGV[1])
local windowStart = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])
local requestId = ARGV[4]

-- 1. Remove entries outside the sliding window
redis.call('ZREMRANGEBYSCORE', key, 0, windowStart)

-- 2. Count requests in the current window
local count = redis.call('ZCARD', key)

if count < limit then
    -- 3. Add current request timestamp
    redis.call('ZADD', key, now, requestId)
    -- 4. Expire the key after the window + buffer
    redis.call('EXPIRE', key, 65)
    return "OK"
else
    return "LIMIT_REACHED"
end
