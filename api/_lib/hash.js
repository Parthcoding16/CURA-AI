/**
 * Cache-key hashing
 * -----------------
 * Feature: Redis caching.
 *
 * Turns request inputs into a fixed-length SHA-256 key. This keeps keys short
 * no matter how long the input is (a lab report can be thousands of
 * characters), and avoids storing raw health data in key names.
 */
import { createHash } from "crypto";

export function hashKey(...parts) {
  // The NUL separator stops ("ab", "c") and ("a", "bc") from colliding.
  return createHash("sha256").update(parts.join("\u0000")).digest("hex");
}
