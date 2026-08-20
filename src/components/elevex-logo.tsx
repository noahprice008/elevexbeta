export function ElevexLogo({ dark = true, compact = false }: { dark?: boolean; compact?: boolean }) {
  if (compact) {
    return <span className="font-extrabold text-electric">X</span>;
  }

  return (
    <span className="font-extrabold tracking-normal" aria-label="ELEVEX">
      <span className={dark ? "text-cloud" : "text-navy"}>ELEV</span>
      <span className="text-electric">EX</span>
    </span>
  );
}