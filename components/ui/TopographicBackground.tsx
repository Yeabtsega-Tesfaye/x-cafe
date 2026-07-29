export default function TopographicBackground({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <pattern
          id="topo-pattern"
          width="400"
          height="400"
          patternUnits="userSpaceOnUse"
        >
          <path d="M0,80 C60,40 140,120 200,80 C260,40 340,120 400,80" fill="none" strokeWidth="1.25" className="stroke-border" />
          <path d="M0,140 C60,180 140,100 200,140 C260,180 340,100 400,140" fill="none" strokeWidth="1.25" className="stroke-border" />
          <path d="M0,200 C60,160 140,240 200,200 C260,160 340,240 400,200" fill="none" strokeWidth="1.25" className="stroke-border" />
          <path d="M0,260 C60,300 140,220 200,260 C260,300 340,220 400,260" fill="none" strokeWidth="1.25" className="stroke-border" />
          <path d="M0,320 C60,280 140,360 200,320 C260,280 340,360 400,320" fill="none" strokeWidth="1.25" className="stroke-border" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#topo-pattern)" />
    </svg>
  );
}