/**
 * ToolIcon
 * --------
 * The tinted square with a tool's icon, used on the home page cards and in
 * each tool page's header. The tint is the tool's colour at low opacity.
 */
export default function ToolIcon({ tool }) {
  const Icon = tool.icon;
  return (
    <span
      className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
      style={{ backgroundColor: `${tool.color}14`, color: tool.color }}
    >
      <Icon className="h-5 w-5" />
    </span>
  );
}
