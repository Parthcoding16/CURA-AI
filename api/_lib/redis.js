/**
 * Shared Redis connection
 * -----------------------
 * Used by both the response cache (cache.js) and the rate limiter
 * (ratelimit.js), so they share one client instead of creating two.
 *
 * We use Upstash because it talks to Redis over HTTP. Serverless functions
 * start and stop constantly, and a normal TCP Redis client would leak
 * connections in that environment.
 *
 * If the Upstash env vars are missing (e.g. local development), `redis` is
 * null and both features quietly switch themselves off.
 */
import { Redis } from "@upstash/redis";

const { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } = process.env;

export const redis =
  UPSTASH_REDIS_REST_URL && UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: UPSTASH_REDIS_REST_URL,
        token: UPSTASH_REDIS_REST_TOKEN,
        // Store and return raw strings; our cached values are plain text.
        automaticDeserialization: false,
      })
    : null;
