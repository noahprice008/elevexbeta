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
    return <span className="font-extrabold text-electric">X</span>;
  }

  return (
    <span className="inline-flex flex-col" aria-label="ELEVEX">
      <span className="font-extrabold tracking-tight">
        <span className={dark ? "text-cloud" : "text-navy"}>ELEV</span>
        <span className="text-blue-hover">E</span>
        <span className="text-electric">X</span>
      </span>
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
