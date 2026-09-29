/**
 * Gemini client (server-side only)
 * ---------------------------------
 * Feature: Security — keeps the Gemini API key out of the browser.
 *
 * The key is read from GEMINI_API_KEY, a server-only environment variable.
 * It is deliberately NOT prefixed with VITE_: Vite inlines every VITE_ variable
 * into the public JavaScript bundle, which is how the key used to leak.
 */
import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-2.5-flash";

// Created lazily on the first request and then reused, so warm serverless
// invocations don't rebuild the client every time.
let model = null;

function getModel() {
  if (!process.env.GEMINI_API_KEY) return null;

  if (!model) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: MODEL_NAME });
  }
  return model;
}

/**
 * Sends a prompt to Gemini and returns the plain-text answer.
 * Throws Error("MISSING_KEY") if the server has no API key configured.
 */
export async function generate(prompt) {
  const gemini = getModel();
  if (!gemini) throw new Error("MISSING_KEY");

  const result = await gemini.generateContent(prompt);
  return result.response.text();
}
