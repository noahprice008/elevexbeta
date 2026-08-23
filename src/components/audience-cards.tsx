import { Link } from "@tanstack/react-router";
import { Wrench, Briefcase, ShieldCheck, HeartPulse, Store, type LucideIcon } from "lucide-react";

export const audiences: { title: string; copy: string; to: string; Icon: LucideIcon }[] = [
  { title: "Tradesmen & Contractors", copy: "Quotes, jobs and follow-ups handled without the paperwork.", to: "/for/tradesmen", Icon: Wrench },
  { title: "Consultants & Professional Services", copy: "A credible presence and a steady flow of qualified enquiries.", to: "/for/consultants", Icon: Briefcase },
  { title: "Security & Facilities Firms", copy: "Connected scheduling, reporting and client communication.", to: "/for/security", Icon: ShieldCheck },
  { title: "Wellness Studios & Clinics", copy: "Bookings, reminders and client management that run themselves.", to: "/for/wellness", Icon: HeartPulse },
  { title: "Growing Local Businesses", copy: "A digital foundation that keeps up as the business expands.", to: "/for/local-business", Icon: Store },
];

export function AudienceCards() {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {audiences.map(({ title, copy, to, Icon }) => (
        <Link
          key={to}
          to={to}
          className="group flex flex-col rounded-md border border-cloud/15 bg-navy/95 p-7 text-cloud transition-all duration-200 hover:-translate-y-1 hover:border-electric/60 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric md:p-8"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-md border border-electric/30 bg-electric/10 text-electric transition-colors group-hover:bg-electric/20" aria-hidden="true">
            <Icon className="h-6 w-6" />
          </span>
          <h3 className="mt-6 text-lg font-extrabold leading-snug">{title}</h3>
          <p className="mt-3 flex-1 text-sm text-cloud/65">{copy}</p>
          <span className="mt-7 text-sm font-bold text-cloud/55 transition-colors group-hover:text-electric">Learn more →</span>
        </Link>
      ))}
    </div>
  );
}
