/**
 * Footer
 * ------
 * Links to each tool plus the site-wide medical disclaimer.
 */
import { Link } from "react-router-dom";
import { TOOL_LIST } from "../lib/tools.js";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-muted">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-base text-ink">Cura AI</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {TOOL_LIST.map((tool) => (
              <Link key={tool.path} to={tool.path} className="hover:text-ink">
                {tool.name}
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-6 max-w-xl text-xs leading-5 text-muted/80">
          Cura AI is for informational purposes only and is not a substitute for professional medical advice,
          diagnosis, or treatment. Always consult a qualified healthcare professional.
        </p>
      </div>
    </footer>
  );
}
