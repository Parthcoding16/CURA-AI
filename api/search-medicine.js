/**
 * POST /api/search-medicine
 * -------------------------
 * Feature: Medicine Search.
 *
 * Body:     { medicineName: string }
 * Response: { result: string, cached: boolean }
 *
 * Flow: rate limit → validate input → Redis cache → Gemini (on a cache miss).
 */
import { generate } from "./_lib/gemini.js";
import { withCache, TTL } from "./_lib/cache.js";
import { hashKey } from "./_lib/hash.js";
import { guard, sendError, handleAiError } from "./_lib/http.js";
import { medicinePrompt } from "./_lib/prompts.js";
import { MAX_MEDICINE_NAME_LENGTH } from "./_lib/limits.js";

export default async function handler(req, res) {
  if (!(await guard(req, res))) return;

  const { medicineName } = req.body || {};

  if (typeof medicineName !== "string" || !medicineName.trim()) {
    return sendError(res, 400, "Medicine name is required.");
  }
  if (medicineName.length > MAX_MEDICINE_NAME_LENGTH) {
    return sendError(res, 413, "Medicine name is too long.");
  }

  const name = medicineName.trim();

  // Lower-cased so "Paracetamol", "paracetamol" and "PARACETAMOL" share one
  // cache entry. Medicine facts rarely change, so these are kept for a week.
  const cacheKey = "medicine:" + hashKey(name.toLowerCase());

  try {
    const { value, cached } = await withCache(cacheKey, TTL.ONE_WEEK, () => generate(medicinePrompt(name)));
    return res.status(200).json({ result: value, cached });
  } catch (err) {
    return handleAiError(res, err, "search-medicine");
  }
}
