import { Link } from "@tanstack/react-router";
import { Wrench, Briefcase, ShieldCheck, HeartPulse, Building2, type LucideIcon } from "lucide-react";

export const audiences: { title: string; copy: string; to: string; Icon: LucideIcon }[] = [
  { title: "Tradesmen & Contractors", copy: "Stop losing Sunday evenings to invoicing. Automatically convert on-site quotes into scheduled jobs, and instantly generate ready-to-send invoice drafts the moment the job is completed.", to: "/for/tradesmen", Icon: Wrench },
  { title: "Consultants & Professional Services", copy: "A credible digital presence and a steady flow of qualified enquiries — without the manual follow-up.", to: "/for/consultants", Icon: Briefcase },
  { title: "Security & Facilities Firms", copy: "Connected scheduling, real-time reporting and client communication that never drops the ball.", to: "/for/security", Icon: ShieldCheck },
  { title: "Wellness Studios & Clinics", copy: "Eliminate no-shows with two-way SMS reminders and automated waitlist fulfilment.", to: "/for/wellness", Icon: HeartPulse },
  { title: "Property Managers & Realtors", copy: "Auto-route maintenance requests, chase tenant applications, and keep every listing inquiry answered in minutes — not days.", to: "/for/property-managers", Icon: Building2 },
];

export function AudienceCards() {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {audiences.map(({ title, copy, to, Icon }) => (
        <Link
          key={to}
          to={to}
          className="group relative flex flex-col overflow-hidden rounded-xl border border-cloud/15 bg-navy/95 p-7 text-cloud shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] transition-all duration-300 hover:-translate-y-1.5 hover:border-electric/60 hover:shadow-[0_24px_48px_-24px_rgba(56,189,248,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric md:p-8"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-24 h-40 bg-[radial-gradient(60%_100%_at_50%_100%,rgba(56,189,248,0.22),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-electric to-transparent transition-transform duration-300 group-hover:scale-x-100"
          />
          <span className="relative flex h-12 w-12 items-center justify-center rounded-lg border border-electric/30 bg-electric/10 text-electric transition-all duration-300 group-hover:scale-110 group-hover:border-electric/60 group-hover:bg-electric/20" aria-hidden="true">
            <Icon className="h-6 w-6" />
          </span>
          <h3 className="relative mt-6 text-lg font-extrabold leading-snug transition-colors group-hover:text-electric">{title}</h3>
          <p className="relative mt-3 flex-1 text-sm text-cloud/65">{copy}</p>
          <span className="relative mt-7 inline-flex items-center gap-1.5 text-sm font-bold text-cloud/55 transition-colors group-hover:text-electric">
            Learn more
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </Link>
      ))}
    </div>

  );
}
