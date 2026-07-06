import { useState } from "react";
import { Languages, Loader2 } from "lucide-react";
import { translateToHindi } from "../lib/gemini.js";

export default function TranslateButton({ text, onTranslated }) {
  const [loading, setLoading] = useState(false);
  const [showingHindi, setShowingHindi] = useState(false);
  const [original, setOriginal] = useState(text);

  async function handleClick() {
    if (showingHindi) {
      onTranslated(original);
      setShowingHindi(false);
      return;
    }

    setLoading(true);
    try {
      const hindi = await translateToHindi(text);
      setOriginal(text);
      onTranslated(hindi);
      setShowingHindi(true);
    } catch (err) {
      console.error("Translation failed:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Languages className="w-4 h-4" />
      )}
      {showingHindi ? "Show English" : "हिंदी में देखें"}
    </button>
  );
}