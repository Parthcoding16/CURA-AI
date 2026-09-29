/**
 * Navbar
 * ------
 * Sticky top bar shown on every page: logo, links to the three tools (the
 * current page is highlighted), and a shortcut to the Symptom Analyzer.
 */
import { Link, useLocation } from "react-router-dom";
import { Plus } from "lucide-react";
import { TOOL_LIST, TOOLS } from "../lib/tools.js";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white">
            <Plus className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">Cura AI</span>
        </Link>

        {/* Tool links (hidden on small screens) */}
        <div className="hidden items-center gap-1 md:flex">
          {TOOL_LIST.map((tool) => {
            const isActive = pathname === tool.path;
            return (
              <Link
                key={tool.path}
                to={tool.path}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 text-sm transition ${
                  isActive ? "bg-brand-soft text-brand-deep" : "text-muted hover:text-ink"
                }`}
              >
                {tool.navLabel}
              </Link>
            );
          })}
        </div>

        {/* Call to action */}
        <Link
          to={TOOLS.symptoms.path}
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-deep"
        >
          Check symptoms
        </Link>
      </div>
    </nav>
  );
}
