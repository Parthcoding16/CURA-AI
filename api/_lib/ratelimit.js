/**
 * Rate limiter
 * ------------
 * Feature: Rate limiting — protects the paid Gemini API from abuse.
 *
 * The cache only helps with repeated questions. Someone sending thousands of
 * *different* questions would still trigger a paid Gemini call every time.
 * A sliding-window limit caps each IP at MAX_REQUESTS per WINDOW.
 *
 * Like the cache, it turns itself off when Redis isn't configured, and it
 * "fails open": if Redis can't be reached, requests are allowed through
 * rather than blocking real users.
 */
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis.js";

const MAX_REQUESTS = 15;
const WINDOW = "60 s";

const limiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(MAX_REQUESTS, WINDOW),
      prefix: "cura:ratelimit",
    })
  : null;

/**
 * Counts one request for `identifier` (usually an IP address).
 * @returns {Promise<{ allowed: boolean, retryAfterSeconds: number }>}
 */
export async function checkRateLimit(identifier) {
  if (!limiter) return { allowed: true, retryAfterSeconds: 0 };

  try {
    const { success, reset } = await limiter.limit(identifier);
    const retryAfterSeconds = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
    return { allowed: success, retryAfterSeconds };
  } catch (err) {
    console.error("Rate limit check failed:", err);
    return { allowed: true, retryAfterSeconds: 0 };
  }
}
