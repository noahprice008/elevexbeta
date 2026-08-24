import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BackToTop } from "@/components/back-to-top";
import { AccessibilityWidget } from "@/components/accessibility-widget";

export function AudienceLayout({ children }: { children: ReactNode }) {
  return (
    <main id="top" className="overflow-hidden">
      <SiteHeader />
      {children}
      <SiteFooter />
      <BackToTop />
      <AccessibilityWidget />
    </main>
  );
}
