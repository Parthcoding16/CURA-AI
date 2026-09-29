/**
 * API client
 * ----------
 * Feature: Security — the browser only ever talks to our own /api routes.
 *
 * These functions are the ONLY place the frontend makes network requests.
 * The server holds the Gemini key, rate-limits callers, and caches answers,
 * so nothing secret lives in this file.
 */

/**
 * POSTs JSON to one of our endpoints and returns the parsed response body.
 * Throws an Error carrying the server's message (validation error, rate limit,
 * etc.) so pages can show it to the user directly.
 */
async function postJSON(endpoint, body) {
  let response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Network error. Check your connection and try again.");
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong. Please try again.");
  }
  return data;
}

/**
 * The AI endpoints all reply with { result, cached }. This reshapes that into
 * { text, cached } for the pages. `cached` drives the "From cache" badge.
 */
async function askAI(endpoint, body) {
  const data = await postJSON(endpoint, body);
  return { text: data.result, cached: Boolean(data.cached) };
}

// Feature: Symptom Analyzer
export function analyzeSymptoms(symptoms, age, gender, duration) {
  return askAI("/api/analyze-symptoms", { symptoms, age, gender, duration });
}

// Feature: Lab Report Explainer
export function explainLabReport(reportText) {
  return askAI("/api/explain-report", { reportText });
}

// Feature: Medicine Search
export function searchMedicine(medicineName) {
  return askAI("/api/search-medicine", { medicineName });
}

// Feature: Hindi translation
export function translateToHindi(text) {
  return askAI("/api/translate", { text });
}

// Feature: PDF upload
// Reads a File as base64, dropping the "data:application/pdf;base64," prefix.
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = () => reject(new Error("Couldn't read the file."));
    reader.readAsDataURL(file);
  });
}

/**
 * Sends a PDF to the server and returns { text, pages, truncated }.
 */
export async function extractPdfText(file) {
  const fileBase64 = await fileToBase64(file);
  return postJSON("/api/extract-text", { fileBase64 });
}
