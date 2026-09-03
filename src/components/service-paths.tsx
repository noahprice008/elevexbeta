import { Link } from "@tanstack/react-router";
import { Bot, Compass, Globe, AppWindow, type LucideIcon } from "lucide-react";

export const servicePaths: { title: string; copy: string; to: string; Icon: LucideIcon }[] = [
  {
    title: "AI Automation",
    copy: "Let AI handle the repetitive work. Automate lead management, customer communication, internal processes, and daily operations.",
    to: "/ai-automation",
    Icon: Bot,
  },
  {
    title: "Automation Consulting",
    copy: "Discover what to automate first. We identify the biggest opportunities, create a roadmap, and build the systems that save the most time.",
    to: "/automation-consulting",
    Icon: Compass,
  },
  {
    title: "Website Design",
    copy: "A modern website built for growth. Launch a professional website designed to attract, engage, and convert more customers.",
    to: "/website-design",
    Icon: Globe,
  },
  {
    title: "App Development",
    copy: "Custom software built around your business. Create powerful internal tools, customer portals, and business applications tailored to your workflow.",
    to: "/app-development",
    Icon: AppWindow,
  },
];

export function ServicePathCards({ exclude }: { exclude?: string }) {
  const items = exclude ? servicePaths.filter((item) => item.to !== exclude) : servicePaths;
  return (
    <div className={`mt-12 grid gap-6 sm:grid-cols-2 ${items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
      {items.map(({ title, copy, to, Icon }) => (
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
            Explore
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

export function ChooseYourPath() {
  return (
    <section id="choose-your-path" aria-label="Choose your path" className="relative overflow-hidden border-b bg-secondary pt-28 pb-20 md:pb-24">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Choose Your Path</p>
        <h2 className="mt-5 max-w-4xl animate-reveal text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
          What would you like to improve in your business today?
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          Choose the solution that best matches your business needs and discover what's possible.
        </p>
        <ServicePathCards />
      </div>
    </section>
  );
}

