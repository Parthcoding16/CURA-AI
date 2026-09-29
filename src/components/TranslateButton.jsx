/**
 * TranslateButton
 * ---------------
 * Feature: Hindi translation.
 *
 * Toggles a result between English and Hindi. The first click asks the server
 * to translate. After that, the Hindi text is remembered here, so switching
 * back and forth is instant and doesn't make another API call.
 */
import { useState } from "react";
import { Languages, Loader2 } from "lucide-react";
import { translateToHindi } from "../lib/api.js";

export default function TranslateButton({ text, onTranslated }) {
  const [loading, setLoading] = useState(false);
  const [showingHindi, setShowingHindi] = useState(false);
  const [english, setEnglish] = useState(""); // the original result
  const [hindi, setHindi] = useState(""); // its translation, once fetched

  async function handleClick() {
    // Hindi is showing: switch back to the original English.
    if (showingHindi) {
      onTranslated(english);
      setShowingHindi(false);
      return;
    }

    // Already translated this exact text: reuse it.
    if (hindi && english === text) {
      onTranslated(hindi);
      setShowingHindi(true);
      return;
    }

    // First time: ask the server.
    setLoading(true);
    try {
      const { text: translated } = await translateToHindi(text);
      setEnglish(text);
      setHindi(translated);
      onTranslated(translated);
      setShowingHindi(true);
    } catch (err) {
      console.error("Translation failed:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-muted transition hover:border-brand/40 hover:text-ink disabled:opacity-50"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Languages className="h-4 w-4" />}
      {showingHindi ? "Show English" : "हिंदी में देखें"}
    </button>
  );
}
