/**
 * useAiRequest
 * ------------
 * Shared state for every AI tool page: the result text, whether it came from
 * the cache, the loading flag, and any error message.
 *
 * Without this hook, each page repeated the same useState calls and the same
 * try / catch / finally block.
 */
import { useState } from "react";

export function useAiRequest() {
  const [result, setResult] = useState("");
  const [cached, setCached] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Runs `request`, an async function that resolves to { text, cached }.
   * Any thrown Error has its message shown to the user.
   */
  async function run(request) {
    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await request();
      setResult(response.text);
      setCached(response.cached);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // setResult is exposed so the translate button can swap in the Hindi text.
  return { result, setResult, cached, loading, error, setError, run };
}
