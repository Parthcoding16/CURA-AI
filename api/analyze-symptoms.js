/**
 * POST /api/analyze-symptoms
 * --------------------------
 * Feature: Symptom Analyzer.
 *
 * Body:     { symptoms: string, age?: string, gender?: string, duration?: string }
 * Response: { result: string, cached: boolean }
 *
 * Flow: rate limit → validate input → Redis cache → Gemini (on a cache miss).
 */
import { generate } from "./_lib/gemini.js";
import { withCache, TTL } from "./_lib/cache.js";
import { hashKey } from "./_lib/hash.js";
import { guard, sendError, handleAiError } from "./_lib/http.js";
import { symptomsPrompt } from "./_lib/prompts.js";
import { MAX_SYMPTOMS_LENGTH } from "./_lib/limits.js";

export default async function handler(req, res) {
  if (!(await guard(req, res))) return;

  const { symptoms, age, gender, duration } = req.body || {};

  // Input validation — reject bad requests before spending a Gemini call.
  if (typeof symptoms !== "string" || !symptoms.trim()) {
    return sendError(res, 400, "Symptoms are required.");
  }
  if (symptoms.length > MAX_SYMPTOMS_LENGTH) {
    return sendError(res, 413, `Symptoms text is too long (max ${MAX_SYMPTOMS_LENGTH} characters).`);
  }

  const input = { symptoms: symptoms.trim(), age, gender, duration };

  // The same symptoms with the same age/gender/duration share one cache entry.
  const cacheKey =
    "symptoms:" + hashKey(input.symptoms, String(age ?? ""), String(gender ?? ""), String(duration ?? ""));

  try {
    const { value, cached } = await withCache(cacheKey, TTL.ONE_DAY, () => generate(symptomsPrompt(input)));
    return res.status(200).json({ result: value, cached });
  } catch (err) {
    return handleAiError(res, err, "analyze-symptoms");
  }
}
