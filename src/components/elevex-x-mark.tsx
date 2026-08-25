import xMark from "@/assets/elevex-x.png.asset.json";

/** Brand X mark from the official ELEVEX logo artwork. */
export function ElevexXMark({ className = "" }: { className?: string }) {
  return <img src={xMark.url} alt="" aria-hidden="true" className={className} />;
}
