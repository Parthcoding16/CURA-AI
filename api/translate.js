/**
 * POST /api/translate
 * -------------------
 * Feature: Hindi translation of any AI result.
 *
 * Body:     { text: string }
 * Response: { result: string, cached: boolean }
 *
 * A translation of the same text never changes, so it is cached for 30 days.
 */
import { generate } from "./_lib/gemini.js";
import { withCache, TTL } from "./_lib/cache.js";
import { hashKey } from "./_lib/hash.js";
import { guard, sendError, handleAiError } from "./_lib/http.js";
import { translatePrompt } from "./_lib/prompts.js";
import { MAX_TRANSLATE_LENGTH } from "./_lib/limits.js";

export default async function handler(req, res) {
  if (!(await guard(req, res))) return;

  const { text } = req.body || {};

  if (typeof text !== "string" || !text.trim()) {
    return sendError(res, 400, "Text to translate is required.");
  }
  if (text.length > MAX_TRANSLATE_LENGTH) {
    return sendError(res, 413, "Text is too long to translate.");
  }

  const cacheKey = "translate:hi:" + hashKey(text);

  try {
    const { value, cached } = await withCache(cacheKey, TTL.THIRTY_DAYS, () =>
      generate(translatePrompt(text)),
    );
    return res.status(200).json({ result: value, cached });
  } catch (err) {
    return handleAiError(res, err, "translate");
  }
}
