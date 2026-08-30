import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ElevexLogo } from "@/components/elevex-logo";
import { ThemeToggle } from "@/components/theme-toggle";

const links: [string, string][] = [
  ["Solutions", "/#solutions"],
  ["Blueprints", "/blueprints"],
  ["Roadmap", "/roadmap"],
  ["Integrations", "/#integrations"],
  ["Why ELEVEX", "/#why"],
  ["Pricing", "/#pricing"],
  ["FAQ", "/#faq"],
  ["Contact", "/#contact"],
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cloud/10 bg-navy/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="/" className="text-xl"><ElevexLogo /></a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {links.map(([label, href]) => <a key={href} href={href} className="text-sm font-semibold text-cloud/75 transition-colors hover:text-electric">{label}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="lg:hidden"><a href="/#consultation">Get My Custom Demo</a></Button>
          <Button asChild className="hidden lg:inline-flex"><a href="/#consultation">Request a Custom Demo</a></Button>
          <Button variant="ghost" size="icon" className="text-cloud hover:bg-cloud/10 hover:text-electric lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {menuOpen && (
        <nav className="border-t border-cloud/10 bg-navy px-5 py-6 lg:hidden">
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block border-b border-cloud/10 py-4 font-semibold text-cloud">{label}</a>)}
        </nav>
      )}
    </header>
  );
}
