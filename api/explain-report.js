/**
 * POST /api/explain-report
 * ------------------------
 * Feature: Lab Report Explainer.
 *
 * Body:     { reportText: string }   (pasted text, or text taken from a PDF)
 * Response: { result: string, cached: boolean }
 *
 * Flow: rate limit → validate input → Redis cache → Gemini (on a cache miss).
 */
import { generate } from "./_lib/gemini.js";
import { withCache, TTL } from "./_lib/cache.js";
import { hashKey } from "./_lib/hash.js";
import { guard, sendError, handleAiError } from "./_lib/http.js";
import { labReportPrompt } from "./_lib/prompts.js";
import { MAX_REPORT_LENGTH } from "./_lib/limits.js";

export default async function handler(req, res) {
  if (!(await guard(req, res))) return;

  const { reportText } = req.body || {};

  if (typeof reportText !== "string" || !reportText.trim()) {
    return sendError(res, 400, "Lab report text is required.");
  }
  if (reportText.length > MAX_REPORT_LENGTH) {
    return sendError(res, 413, `Report is too long (max ${MAX_REPORT_LENGTH} characters).`);
  }

  const report = reportText.trim();
  const cacheKey = "lab:" + hashKey(report);

  try {
    const { value, cached } = await withCache(cacheKey, TTL.ONE_DAY, () => generate(labReportPrompt(report)));
    return res.status(200).json({ result: value, cached });
  } catch (err) {
    return handleAiError(res, err, "explain-report");
  }
}
