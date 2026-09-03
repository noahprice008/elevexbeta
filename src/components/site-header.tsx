import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ElevexLogo } from "@/components/elevex-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { AccessibilityMenu } from "@/components/accessibility-widget";

type Group = { title: string; items: [string, string][] };

const groups: Group[] = [
  {
    title: "Main",
    items: [
      ["Home", "/"],
      ["Solutions", "/#solutions"],
      ["How We Deliver", "/#how-we-deliver"],
      ["Why ELEVEX", "/#why"],
      ["Pricing", "/#pricing"],
      ["FAQ", "/#faq"],
      ["Contact", "/#contact"],
    ],
  },
  {
    title: "Services",
    items: [
      ["AI Automation", "/ai-automation"],
      ["Automation Consulting", "/automation-consulting"],
      ["Website Design", "/website-design"],
      ["App Development", "/app-development"],
    ],
  },
  {
    title: "Who We Work With",
    items: [
      ["Tradesmen & Contractors", "/for/tradesmen"],
      ["Consultants & Professional Services", "/for/consultants"],
      ["Security & Facilities Firms", "/for/security"],
      ["Wellness Studios & Clinics", "/for/wellness"],
      ["Property Managers & Realtors", "/for/property-managers"],
    ],
  },
  {
    title: "More",
    items: [
      ["Automation Blueprints", "/blueprints"],
      ["21-Day Trial Roadmap", "/roadmap"],
      ["Privacy Policy", "/privacy"],
      ["Terms of Service", "/terms"],
    ],
  },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !triggerRef.current?.contains(target)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [menuOpen]);

  const isActive = (href: string) => href.startsWith("/") && !href.includes("#") && pathname === href;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cloud/10 bg-navy/95 backdrop-blur">
      <div className="relative z-10 mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-10">
        <a
          href="/"
          aria-label="ELEVEX home"
          className="shrink-0 text-xl transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric"
        >
          <ElevexLogo />
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <button
              ref={triggerRef}
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              onClick={() => setMenuOpen((value) => !value)}
              className={`flex h-9 cursor-pointer items-center gap-2 rounded-full border px-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric sm:px-3 ${
                menuOpen
                  ? "border-electric/40 bg-electric/10 text-electric"
                  : "border-cloud/15 bg-cloud/5 text-cloud/75 hover:border-electric/40 hover:text-electric"
              }`}
            >
              {menuOpen ? (
                <X className="size-4" strokeWidth={1.9} aria-hidden="true" />
              ) : (
                <Menu className="size-4" strokeWidth={1.9} aria-hidden="true" />
              )}
              <span className="hidden sm:inline">Menu</span>
            </button>

            {menuOpen && (
              <div
                ref={panelRef}
                role="menu"
                aria-label="Site navigation"
                className="absolute left-0 top-[calc(100%+0.75rem)] z-50 max-h-[75vh] w-[min(20rem,calc(100vw-2.5rem))] origin-top-left animate-in fade-in-0 zoom-in-95 slide-in-from-top-1 overflow-y-auto rounded-xl border border-cloud/12 bg-navy/95 p-4 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.75)] backdrop-blur-xl duration-150 sm:left-auto sm:right-0 sm:origin-top-right md:w-[34rem]"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  {groups.map((group) => (
                    <div key={group.title}>
                      <p className="px-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-cloud/40">
                        {group.title}
                      </p>
                      <ul className="mt-1.5 space-y-0.5">
                        {group.items.map(([label, href]) => {
                          const active = isActive(href);
                          return (
                            <li key={href}>
                              <a
                                href={href}
                                role="menuitem"
                                aria-current={active ? "page" : undefined}
                                onClick={() => setMenuOpen(false)}
                                className={`group flex min-h-9 items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric ${
                                  active
                                    ? "bg-electric/10 font-semibold text-electric"
                                    : "font-medium text-cloud/70 hover:translate-x-0.5 hover:bg-cloud/8 hover:text-cloud"
                                }`}
                              >
                                <span
                                  aria-hidden="true"
                                  className={`h-3.5 w-0.5 rounded-full transition-colors ${active ? "bg-electric" : "bg-transparent group-hover:bg-electric/40"}`}
                                />
                                {label}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <ThemeToggle />
          <AccessibilityMenu />
          <span aria-hidden="true" className="mx-0.5 hidden h-6 w-px bg-cloud/12 sm:block" />

          <Button asChild size="sm">
            <a href="/#consultation">Claim My Free Demo</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
