/**
 * MarkdownView
 * ------------
 * Feature: Formatted AI output.
 *
 * Gemini answers in Markdown (**bold**, lists, headings, tables). Printing it
 * as plain text showed the raw ** and # characters, so we render it as real
 * HTML with react-markdown. remark-gfm adds GitHub-style tables, and the
 * `prose` classes from @tailwindcss/typography style the output.
 */
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownView({ children }) {
  return (
    <div className="prose prose-sm max-w-none prose-headings:font-display prose-headings:font-semibold prose-headings:text-ink prose-p:text-ink/85 prose-a:text-brand prose-strong:text-ink prose-li:text-ink/85 prose-li:marker:text-brand">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
