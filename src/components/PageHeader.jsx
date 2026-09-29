/**
 * PageHeader
 * ----------
 * Title block at the top of each tool page: icon, name and a one-line
 * description, all read from the tool's entry in lib/tools.js.
 */
import ToolIcon from "./ToolIcon.jsx";

export default function PageHeader({ tool }) {
  return (
    <header className="mb-8 flex items-center gap-3">
      <ToolIcon tool={tool} />
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">{tool.name}</h1>
        <p className="text-sm text-muted">{tool.subtitle}</p>
      </div>
    </header>
  );
}
