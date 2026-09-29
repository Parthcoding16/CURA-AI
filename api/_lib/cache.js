/**
 * Response cache
 * --------------
 * Feature: Redis caching (cache-aside pattern).
 *
 * Before calling Gemini we look for a saved answer in Redis. On a hit we
 * return it immediately (fast and free). On a miss we call Gemini, save the
 * answer with an expiry (TTL), and return it.
 *
 * Cache errors are logged but never thrown: if Redis is down, the request
 * simply behaves as a cache miss instead of failing.
 */
import { redis } from "./redis.js";

// TTLs in seconds, tuned to how quickly each kind of answer goes stale.
export const TTL = {
  ONE_DAY: 60 * 60 * 24,
  ONE_WEEK: 60 * 60 * 24 * 7,
  THIRTY_DAYS: 60 * 60 * 24 * 30,
};

const KEY_PREFIX = "cura:cache:";

async function readCache(key) {
  if (!redis) return null;
  try {
    return await redis.get(KEY_PREFIX + key);
  } catch (err) {
    console.error("Cache read failed:", err);
    return null;
  }
}

async function writeCache(key, value, ttlSeconds) {
  if (!redis) return;
  try {
    await redis.set(KEY_PREFIX + key, value, { ex: ttlSeconds });
  } catch (err) {
    console.error("Cache write failed:", err);
  }
}

/**
 * Returns the cached value for `key`, or runs `produce()`, caches its result
 * for `ttlSeconds`, and returns that.
 *
 * @returns {Promise<{ value: string, cached: boolean }>}
 *          `cached` tells the frontend whether to show the "From cache" badge.
 */
export async function withCache(key, ttlSeconds, produce) {
  const hit = await readCache(key);
  if (hit !== null && hit !== undefined) {
    return { value: hit, cached: true };
  }

  const value = await produce();
  await writeCache(key, value, ttlSeconds);
  return { value, cached: false };
}
