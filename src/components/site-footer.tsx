import { Button } from "@/components/ui/button";
import { ElevexLogo } from "@/components/elevex-logo";

function FooterColumn({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <h3 className="text-sm font-extrabold">{title}</h3>
      <ul className="mt-4 space-y-2">
        {items.map(([label, href]) => <li key={label}><a href={href} className="text-sm text-cloud/60 hover:text-electric">{label}</a></li>)}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-navy text-cloud">
      <div className="mx-auto max-w-7xl border-t border-cloud/10 px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-2xl"><ElevexLogo /></div>
            <p className="mt-2 text-xs uppercase text-cloud/45">Digital Solutions Development</p>
            <p className="mt-5 text-sm text-cloud/60">Digital solutions built for growing businesses.</p>
          </div>
          <FooterColumn title="Navigation" items={[["Solutions", "/#solutions"], ["How We Deliver", "/#how-we-deliver"], ["Why ELEVEX", "/#why"], ["Pricing", "/#pricing"], ["FAQ", "/#faq"], ["Contact", "/#contact"]]} />
          <FooterColumn title="Who We Work With" items={[["Tradesmen & Contractors", "/for/tradesmen"], ["Consultants & Professional Services", "/for/consultants"], ["Security & Facilities Firms", "/for/security"], ["Wellness Studios & Clinics", "/for/wellness"], ["Growing Local Businesses", "/for/local-business"]]} />
          <div>
            <h3 className="text-sm font-extrabold">Contact</h3>
            <a href="mailto:info@elevex.digital" className="mt-4 block text-sm text-cloud/60 hover:text-electric">info@elevex.digital</a>
            <a href="mailto:support@elevex.digital" className="mt-1 block text-sm text-cloud/60 hover:text-electric">support@elevex.digital</a>
            <a href="https://elevex.digital" className="mt-2 block text-sm text-cloud/45 hover:text-electric">elevex.digital</a>
            <Button asChild className="mt-6"><a href="/#consultation">Book a Consultation →</a></Button>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-cloud/10 pt-6 text-xs text-cloud/45 sm:flex-row">
          <p>© 2026 ELEVEX. All rights reserved.</p>
          <div className="flex gap-5"><a href="#">Privacy Policy</a><a href="#">Terms of Service</a></div>
        </div>
      </div>
    </footer>
  );
}
