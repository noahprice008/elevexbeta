import { ElevexXMark } from "./elevex-x-mark";

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
    return <ElevexXMark className="h-[1em] w-[1em]" />;
  }

  return (
    <span className="inline-flex flex-col" aria-label="ELEVEX">
      <span className="inline-flex items-center font-extrabold tracking-tight">
        <span className={dark ? "text-cloud" : "text-navy"}>ELEV</span>
        <span className="text-blue-hover">E</span>
        <ElevexXMark className="ml-[0.02em] h-[0.86em] w-[0.86em] translate-y-[0.02em]" />
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
