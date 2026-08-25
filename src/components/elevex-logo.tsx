import xMark from "@/assets/elevex-x.png.asset.json";
import wordmarkLight from "@/assets/elevex-wordmark.png.asset.json";
import wordmarkDark from "@/assets/elevex-wordmark-dark.png.asset.json";

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
    return <img src={xMark.url} alt="ELEVEX" className="h-[1em] w-auto" />;
  }

  return (
    <span className="inline-flex flex-col" aria-label="ELEVEX">
      <img
        src={dark ? wordmarkDark.url : wordmarkLight.url}
        alt="ELEVEX"
        className="h-[1.05em] w-auto"
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
