let uid = 0;

/**
 * Brand X mark: two crossed geometric beams with an electric-blue gradient
 * and a light burst at the intersection, per the ELEVEX brand sheet.
 */
export function ElevexXMark({ className = "" }: { className?: string }) {
  const id = `x-${uid++}`;
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="ELEVEX X mark"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7DD3FC" />
          <stop offset="45%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="55%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <radialGradient id={`${id}-burst`}>
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="60%" stopColor="#BAE6FD" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0" />
        </radialGradient>
      </defs>
      <polygon points="4,2 32,2 96,98 68,98" fill={`url(#${id}-a)`} />
      <polygon points="68,2 96,2 32,98 4,98" fill={`url(#${id}-b)`} />
      <circle cx="50" cy="50" r="16" fill={`url(#${id}-burst)`} />
      <path
        d="M50 36 L52.2 47.8 L64 50 L52.2 52.2 L50 64 L47.8 52.2 L36 50 L47.8 47.8 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}
