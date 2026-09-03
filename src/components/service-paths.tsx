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
    <div className={`mt-10 grid gap-6 sm:grid-cols-2 ${items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
      {items.map(({ title, copy, to, Icon }) => (
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
          <span className="mt-7 text-sm font-bold text-cloud/55 transition-colors group-hover:text-electric">Explore →</span>
        </Link>
      ))}
    </div>
  );
}

export function ChooseYourPath() {
  return (
    <section id="choose-your-path" aria-label="Choose your path" className="border-b bg-secondary pt-28 pb-20 md:pb-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-xs font-extrabold uppercase text-primary">Choose Your Path</p>
        <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
          Not sure where to start? Choose the solution that best matches your business goals.
        </h2>
        <ServicePathCards />
      </div>
    </section>
  );
}
