/**
 * CachedBadge
 * -----------
 * Feature: Redis caching (made visible).
 *
 * Shown when the server answered from Redis instead of calling Gemini, so the
 * cache can be seen working: ask the same question twice and the badge
 * appears on the second, near-instant answer.
 */
import { Zap } from "lucide-react";

export default function CachedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2 py-0.5 text-xs font-medium text-brand-deep">
      <Zap className="h-3 w-3" />
      From cache
    </span>
  );
}
