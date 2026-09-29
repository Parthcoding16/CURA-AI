/**
 * ResultPanel
 * -----------
 * The right-hand card on every tool page. It shows exactly one of four states:
 *
 *   1. error   — a red message from the server (validation, rate limit, etc.)
 *   2. loading — a spinner with `loadingText`
 *   3. empty   — a prompt telling the user what to do first
 *   4. result  — the AI answer as formatted Markdown, with the cache badge,
 *                the Hindi translate button, and the medical disclaimer
 *
 * aria-live="polite" makes screen readers announce the result when it appears.
 */
import { Loader2 } from "lucide-react";
import MarkdownView from "./MarkdownView.jsx";
import Disclaimer from "./Disclaimer.jsx";
import CachedBadge from "./CachedBadge.jsx";
import TranslateButton from "./TranslateButton.jsx";

export default function ResultPanel({
  tool,
  request, // the object returned by useAiRequest()
  loadingText,
  emptyTitle,
  emptyText,
  notice, // optional extra message shown above the result
}) {
  const { result, setResult, cached, loading, error } = request;
  const Icon = tool.icon;

  return (
    <section className="card min-h-[320px] p-6" aria-live="polite">
      {/* 1. Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* 2. Loading */}
      {loading && (
        <div className="flex h-full flex-col items-center justify-center gap-3 py-16">
          <Loader2 className="h-8 w-8 animate-spin text-brand" />
          <p className="text-sm text-muted">{loadingText}</p>
        </div>
      )}

      {/* 3. Empty */}
      {!loading && !result && !error && (
        <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
          <Icon className="h-10 w-10 text-line" />
          <p className="font-medium text-ink">{emptyTitle}</p>
          <p className="max-w-xs text-sm text-muted">{emptyText}</p>
        </div>
      )}

      {/* 4. Result */}
      {!loading && result && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            {cached ? <CachedBadge /> : <span />}
            <TranslateButton text={result} onTranslated={setResult} />
          </div>

          {notice && (
            <p className="mb-3 rounded-lg bg-brand-soft px-3 py-2 text-xs text-brand-deep">{notice}</p>
          )}

          <MarkdownView>{result}</MarkdownView>
          <Disclaimer />
        </div>
      )}
    </section>
  );
}
