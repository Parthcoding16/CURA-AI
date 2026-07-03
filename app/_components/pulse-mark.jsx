const PulseMark = ({
  className = "h-8 w-8",
  markColor = "currentColor",
  lineColor = "hsl(var(--background))",
}) => (
  <svg
    viewBox="0 0 48 48"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="17" y="4" width="14" height="40" rx="7" fill={markColor} />
    <rect x="4" y="17" width="40" height="14" rx="7" fill={markColor} />
    <path
      d="M2 24H15L19 11L24 39L29 17L32 24H46"
      stroke={lineColor}
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PulseMark;
