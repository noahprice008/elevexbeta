import { NetworkVisual } from "@/components/network-visual";

export function SiteBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <NetworkVisual className="h-full w-full" intensity={2.6} />
    </div>
  );
}
