export function ElevexLogo({
  dark = true,
  compact = false,
  tagline = false,
}: {
  dark?: boolean;
  compact?: boolean;
  tagline?: boolean;
}) {
  if (compact) {
    return (
      <img
        src="/elevex-x.png"
        alt="ELEVEX"
        className="h-8 w-auto object-contain"
      />
    );
  }
  return (
    <span className="inline-flex flex-col" aria-label="ELEVEX">
      <img
        src={dark ? "/elevex-wordmark-dark.png" : "/elevex-wordmark-light.png"}
        alt="ELEVEX"
        className="h-10 w-auto object-contain"
      />
      {tagline && (
        <span
          className={`mt-1 text-[0.5em] font-medium uppercase tracking-[0.32em] ${dark ? "text-cloud/50" : "text-navy/50"}`}
        >
          Digital Solutions Development
        </span>
      )}
    </span>
  );
}
