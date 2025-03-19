require('dotenv/config');
const Redis = require('ioredis');

const redis = new Redis(process.env.REDIS_URL);

function cacheFunction(fn, ttl = 60) {
    return async function(...args) {
        const cacheKey = `${fn.name}-${JSON.stringify(args)}`;
        const cachedResult = await redis.get(cacheKey);

        if (cachedResult) {
            return JSON.parse(cachedResult);
        }

        const result = await fn.apply(this, args);
        await redis.set(cacheKey, JSON.stringify(result), 'EX', ttl);
        return result;
    };
}

module.exports = {cacheFunction};