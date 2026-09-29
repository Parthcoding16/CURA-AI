/**
 * HTTP helpers shared by every API route
 * --------------------------------------
 * Features: Rate limiting, consistent error responses.
 *
 * `guard()` runs the checks every endpoint needs before doing any work.
 * `sendError()` and `handleAiError()` keep error responses in one shape:
 * { error: "human-readable message" }, which the frontend shows as-is.
 */
import { checkRateLimit } from "./ratelimit.js";

export function sendError(res, status, message) {
  return res.status(status).json({ error: message });
}

// Vercel puts the real client IP first in x-forwarded-for.
function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"] || "";
  return forwarded.split(",")[0].trim() || req.socket?.remoteAddress || "unknown";
}

/**
 * Returns true if the request may continue. Otherwise it has already sent a
 * 405 (wrong method) or 429 (too many requests), and the caller should stop.
 */
export async function guard(req, res) {
  if (req.method !== "POST") {
    sendError(res, 405, "Method not allowed.");
    return false;
  }

  const { allowed, retryAfterSeconds } = await checkRateLimit(getClientIp(req));
  if (!allowed) {
    // Retry-After is the standard header telling clients when to try again.
    res.setHeader("Retry-After", String(retryAfterSeconds));
    sendError(res, 429, `Too many requests. Try again in ${retryAfterSeconds}s.`);
    return false;
  }

  return true;
}

/**
 * Turns a failure from the Gemini call into the right HTTP response.
 * `route` is only used to label the server log.
 */
export function handleAiError(res, err, route) {
  if (err.message === "MISSING_KEY") {
    return sendError(res, 500, "Server is not configured (missing GEMINI_API_KEY).");
  }
  console.error(`${route} failed:`, err);
  return sendError(res, 502, "The AI service failed. Please try again.");
}
