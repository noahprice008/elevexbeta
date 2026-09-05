import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { NetworkVisual } from "@/components/network-visual";
import { useLocalizedPrice } from "@/hooks/use-currency";

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <p className={`text-xs font-extrabold uppercase ${dark ? "text-electric" : "text-primary"}`}>{children}</p>;
}

export function Check({ children }: { children: ReactNode }) {
  return <li className="flex gap-3"><span aria-hidden="true" className="font-bold text-primary">✓</span><span className="text-muted-foreground">{children}</span></li>;
}

export function PageHero({ eyebrow, title, subtitle, primary, secondary, badge }: {
  eyebrow: string; title: string; subtitle: string;
  primary: { label: string; note?: string }; secondary?: { label: string; note?: string }; badge: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy pt-20 text-cloud">
      <NetworkVisual className="pointer-events-none absolute inset-0 h-full w-full" forceDark intensity={1.4} />
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <Link to="/" className="text-xs font-bold uppercase text-cloud/50 hover:text-electric">← Back to ELEVEX</Link>
        <div className="mt-8 max-w-4xl">
          <Eyebrow dark>{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] md:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-7 max-w-3xl text-lg text-cloud/75">{subtitle}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg"><a href="/#consultation">{primary.label}</a></Button>
            {secondary && <Button asChild size="lg" variant="outline"><a href="/#consultation">{secondary.label}</a></Button>}
          </div>
          <div className="mt-4 flex flex-col gap-1 text-sm font-semibold text-cloud/60">
            {primary.note && <span>{primary.note}</span>}
            {secondary?.note && <span>{secondary.note}</span>}
          </div>
          <p className="mt-6 text-sm font-extrabold text-electric">{badge}</p>
        </div>
      </div>
    </section>
  );
}

export function PainPoints({ title, body, items, closing }: {
  title: string; body: string; items: [string, string][] | string[]; closing?: string;
}) {
  return (
    <section className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Eyebrow>THE REALITY TODAY</Eyebrow>
        <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">{title}</h2>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">{body}</p>
        <div className="mt-12 grid gap-px overflow-hidden rounded-md border bg-border md:grid-cols-2">
          {items.map((item) => {
            const [head, copy] = Array.isArray(item) ? item : [null, item];
            return (
              <div key={Array.isArray(item) ? item[0] : item} className="bg-background p-6 md:p-8">
                {head && <h3 className="text-lg font-extrabold">{head}</h3>}
                <p className={`text-muted-foreground ${head ? "mt-3 text-sm" : ""}`}>{copy}</p>
              </div>
            );
          })}
        </div>
        {closing && <p className="mt-10 max-w-3xl text-lg font-semibold text-foreground">{closing}</p>}
      </div>
    </section>
  );
}

export function Pillars({ title, sub, items }: {
  title: string; sub?: string; items: { n: string; title: string; copy: string; bullets?: string[] }[];
}) {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Eyebrow>WHAT WE BUILD</Eyebrow>
        <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">{title}</h2>
        {sub && <p className="mt-6 max-w-3xl text-lg text-muted-foreground">{sub}</p>}
        <div className="mt-14 grid gap-px overflow-hidden rounded-md border bg-border md:grid-cols-2">
          {items.map((item) => (
            <article key={item.n} className="bg-background p-7 transition-transform hover:-translate-y-1 md:p-10">
              <span className="text-sm font-extrabold text-primary">{item.n}</span>
              <h3 className="mt-5 text-2xl font-extrabold">{item.title}</h3>
              <p className="mt-5 text-muted-foreground">{item.copy}</p>
              {item.bullets && <ul className="mt-5 space-y-3 text-sm">{item.bullets.map((b) => <Check key={b}>{b}</Check>)}</ul>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StepFlow({ title, sub, steps, callout }: {
  title: string; sub?: string; steps: { n: string; title: string; copy: string; highlight?: boolean; badge?: string }[]; callout?: string;
}) {
  const cols = steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-5";
  const { text } = useLocalizedPrice();
  return (
    <section id="how-we-deliver" className="border-y bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Eyebrow>HOW WE DELIVER</Eyebrow>
        <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">{title}</h2>
        {sub && <p className="mt-5 max-w-3xl text-lg text-muted-foreground">{sub}</p>}
        <div className={`mt-14 grid gap-6 md:grid-cols-2 ${cols} lg:items-start`}>
          {steps.map((step) => (
            <article key={step.n} className={`relative rounded-md border p-6 ${step.highlight ? "border-primary bg-background shadow-lg md:p-8" : "border-border bg-background"}`}>
              <span className="text-sm font-extrabold text-primary">{step.n}</span>
              {step.badge && <span className="absolute -top-3 right-4 rounded-full bg-electric px-3 py-1 text-xs font-extrabold text-navy">{step.badge}</span>}
              <h3 className="mt-4 text-xl font-extrabold">{step.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{text(step.copy)}</p>
            </article>
          ))}
        </div>
        {callout && <div className="mt-12 rounded-md bg-navy px-6 py-6 text-center text-lg font-extrabold text-cloud md:text-xl">{callout}</div>}
      </div>
    </section>
  );
}

export function QaStrip({ eyebrow, title, items }: { eyebrow: string; title: string; items: [string, string][] }) {
  return (
    <section className="bg-navy py-20 text-cloud md:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Eyebrow dark>{eyebrow}</Eyebrow>
        <h2 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight md:text-4xl">{title}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map(([head, copy]) => (
            <div key={head} className="rounded-md border border-cloud/15 p-6">
              <h3 className="text-base font-extrabold">{head}</h3>
              <p className="mt-3 text-sm text-cloud/65">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingBlock({ intro, card1, card2 }: {
  intro?: string;
  card1: { label: string; title: string; price: string; copy: string; items: string[] };
  card2: { label: string; title: string; price: string; priceSuffix?: string; copy: string; items: string[] };
}) {
  const { text, billingNote } = useLocalizedPrice();
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Eyebrow>SIMPLE, HONEST PRICING</Eyebrow>
        <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">Straightforward pricing. Built around your project.</h2>
        {intro && <p className="mt-6 max-w-3xl text-lg text-muted-foreground">{text(intro)}</p>}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <article className="rounded-md border bg-secondary p-8 md:p-10">
            <span className="text-xs font-extrabold uppercase text-primary">{card1.label}</span>
            <h3 className="mt-4 text-3xl font-extrabold">{card1.title}</h3>
            <p className="mt-2 text-4xl font-extrabold text-primary">{text(card1.price)}</p>
            <p className="mt-5 text-muted-foreground">{text(card1.copy)}</p>
            <ul className="mt-6 space-y-3 text-sm">{card1.items.map((i) => <Check key={i}>{text(i)}</Check>)}</ul>
          </article>
          <article className="rounded-md border border-primary bg-background p-8 md:p-10">
            <span className="text-xs font-extrabold uppercase text-primary">{card2.label}</span>
            <h3 className="mt-4 text-3xl font-extrabold">{card2.title}</h3>
            <p className="mt-2 text-4xl font-extrabold">{text(card2.price)}{card2.priceSuffix && <span className="text-lg font-bold text-muted-foreground">{card2.priceSuffix}</span>}</p>
            {billingNote && <p className="mt-1 text-xs font-semibold text-muted-foreground">{billingNote}</p>}
            <p className="mt-1 text-sm text-muted-foreground">{text(card2.copy)}</p>
            <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">{card2.items.map((i) => <Check key={i}>{text(i)}</Check>)}</ul>
          </article>
        </div>
        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Button asChild size="lg"><a href="/#consultation">Build My Free Demo →</a></Button>
          <span className="text-sm text-muted-foreground">Free 30-minute online video consultation — no obligation.</span>
        </div>
      </div>
    </section>
  );
}

export function FinalCta({ title, body, button, subtext, email }: {
  title: string; body?: string; button: string; subtext?: string; email?: string;
}) {
  return (
    <section className="bg-navy py-24 text-cloud md:py-28">
      <div className="mx-auto max-w-7xl px-5 text-center lg:px-8">
        <Eyebrow dark>READY TO MOVE FORWARD?</Eyebrow>
        <h2 className="mt-5 text-4xl font-extrabold md:text-5xl">{title}</h2>
        {body && <p className="mx-auto mt-6 max-w-3xl text-lg text-cloud/65">{body}</p>}
        <div className="mt-9 flex justify-center"><Button asChild size="lg"><a href="/#consultation">{button}</a></Button></div>
        {subtext && <p className="mt-5 text-sm text-cloud/60">{subtext}</p>}
        {email && <p className="mt-3 text-sm text-cloud/60">Prefer email? <a href={`mailto:${email}`} className="font-semibold text-electric hover:underline">{email}</a></p>}
      </div>
    </section>
  );
}

export const standardPricing = {
  card1: {
    label: "Start here",
    title: "Free Consultation & Discovery",
    price: "$0",
    copy: "A structured 30-minute online video call about your business, your challenges and where technology can make the biggest difference — followed by a clear recommendation and a fixed quote.",
    items: ["No obligation, no commitment", "No card required", "Fixed monthly price quoted on the call", "Live platform delivered 7 days from approval", "21 days free before you pay anything"],
  },
  card2: {
    label: "After your free trial",
    title: "After Your 21-Day Free Trial",
    price: "From $199",
    priceSuffix: "/month",
    copy: "Less than a few hours of part-time admin help each month — and it works every hour of every day. Two recovered enquiries typically cover it. The flat price we quote on your call is the price you pay after your free 21 days — no contracts, cancel anytime.",
    items: ["Hosting and secure infrastructure", "Ongoing maintenance and updates", "Priority support from your team", "Continuous optimization and improvements", "Monitoring, backups and reporting", "Room to add automation and AI over time"],
  },
};
