/**
 * Disclaimer
 * ----------
 * Feature: Safety.
 *
 * The prompts ask Gemini to end with a disclaimer, but a model can forget.
 * This one is part of the UI, so it is always shown under every result.
 */
import { Info } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="mt-5 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs leading-5 text-amber-900">
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <span>
        This is AI-generated information, not a medical diagnosis. Always consult a qualified healthcare
        professional.
      </span>
    </div>
  );
}
