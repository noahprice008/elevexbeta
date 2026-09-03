import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { NetworkVisual } from "@/components/network-visual";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BackToTop } from "@/components/back-to-top";
import { ConsultationFlow } from "@/components/consultation-flow";
import { FaqSection } from "@/components/faq-section";
import { StepFlow, PricingBlock, standardPricing, Check } from "@/components/page-blocks";
import { ServicePathCards } from "@/components/service-paths";

export const serviceSteps = [
  { n: "01", title: "Define Your Phase 1 Essentials", copy: "Spend a couple of minutes on our guided discovery form selecting the systems your business must have on day one, your current software stack, and your visual style preferences." },
  { n: "02", title: "We Build Your Custom Demo", copy: "Our team reviews your operational bottlenecks and builds a customized front-end visual demo of your future platform within 2–3 business days — entirely free." },
  { n: "03", title: "Review & Fixed Quote", copy: "We send over your custom demo link and invite you to a short video call to walk through the design, map out custom workflows, and lock in a fixed monthly quote." },
  { n: "04", title: "Live Platform in a Week", copy: "We fully program your system, connect your live databases, integrate your tools, and activate your automations or AI assistants, delivering a fully functional live platform.", highlight: true, badge: "Free" },
  { n: "05", title: "Test-Drive Free for 21 Days", copy: "Use your custom platform in real business operations for 21 days with active support. If it drives value, keep it at your quoted rate — otherwise, pay nothing." },
];

export function Breadcrumbs({ label }: { label: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs font-bold uppercase text-cloud/50">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link to="/" className="hover:text-electric">Home</Link></li>
        <li aria-hidden="true">/</li>
        <li><a href="/#choose-your-path" className="hover:text-electric">Services</a></li>
        <li aria-hidden="true">/</li>
        <li className="text-cloud/80">{label}</li>
      </ol>
    </nav>
  );
}

export function ServiceHero({ eyebrow, title, subtitle, primary, secondary, breadcrumb }: {
  eyebrow: string; title: string; subtitle: string; primary: string; secondary: string; breadcrumb: string;
}) {
  return (
    <section className="relative flex items-center overflow-hidden bg-navy pt-20 text-cloud">
      <NetworkVisual className="pointer-events-none absolute inset-0 h-full w-full" forceDark intensity={1.4} />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
        <Breadcrumbs label={breadcrumb} />
        <div className="mt-8 max-w-4xl">
          <p className="text-xs font-extrabold uppercase tracking-widest text-electric">{eyebrow}</p>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.07] md:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-xl font-bold text-cloud/90">{subtitle}</p>
          <ul className="mt-7 space-y-2">
            {["Custom interactive demo in 3 days", "Live platform launch in 7 days", "Test-drive completely free for 21 days"].map((item) => (
              <li key={item} className="flex items-center gap-3 text-base font-semibold text-cloud/85">
                <span aria-hidden="true" className="font-extrabold text-electric">✓</span>{item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg"><a href="#consultation">{primary} →</a></Button>
            <Button asChild size="lg" variant="outline"><a href="#how-we-deliver">{secondary}</a></Button>
          </div>
          <p className="mt-4 text-sm font-extrabold text-electric">Custom demo in 3 days. Live platform 7 days from approval. Free for 21 days.</p>
        </div>
      </div>
    </section>
  );
}

export function ServiceExplanation({ eyebrow, title, intro, blocks, result }: {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  blocks: { title: string; copy?: ReactNode; bullets?: string[] }[];
  result: string[];
}) {
  return (
    <section className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-xs font-extrabold uppercase text-primary">{eyebrow}</p>
        <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">{title}</h2>
        <div className="mt-6 max-w-3xl space-y-4 text-lg text-muted-foreground">{intro}</div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-md border bg-border md:grid-cols-2">
          {blocks.map((block) => (
            <article key={block.title} className="bg-background p-7 md:p-9">
              <h3 className="text-2xl font-extrabold">{block.title}</h3>
              {block.copy && <div className="mt-4 space-y-3 text-muted-foreground">{block.copy}</div>}
              {block.bullets && <ul className="mt-5 space-y-3 text-sm">{block.bullets.map((b) => <Check key={b}>{b}</Check>)}</ul>}
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-md bg-navy px-6 py-7 text-cloud">
          <p className="text-xs font-extrabold uppercase text-electric">The Result</p>
          <p className="mt-3 text-lg font-extrabold md:text-xl">{result.join(" ")}</p>
        </div>
      </div>
    </section>
  );
}

export function ServicePage({ hero, explanation, serviceFocus, ctaLabel, path }: {
  hero: Parameters<typeof ServiceHero>[0];
  explanation: Parameters<typeof ServiceExplanation>[0];
  serviceFocus: string;
  ctaLabel: string;
  path: string;
}) {
  return (
    <main id="top" className="overflow-hidden">
      <SiteHeader />
      <ServiceHero {...hero} />
      <ServiceExplanation {...explanation} />
      <StepFlow
        title="From first conversation to interactive demo in 3 days — live platform 7 days from approval."
        steps={serviceSteps}
        callout="Try it free for 21 days. Only pay if you keep it."
      />
      <PricingBlock card1={standardPricing.card1} card2={standardPricing.card2} />
      <section id="consultation" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-xs font-extrabold uppercase text-primary">Request a Custom Demo</p>
          <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">{ctaLabel}</h2>
          <p className="mt-4 max-w-2xl text-sm font-semibold text-muted-foreground">Takes a couple of minutes. No sales pressure, no card required.</p>
          <div className="mt-12"><ConsultationFlow serviceFocus={serviceFocus} /></div>
        </div>
      </section>
      <FaqSection />
      <section aria-label="Other ELEVEX services" className="border-t bg-secondary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-xs font-extrabold uppercase text-primary">Explore More</p>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight md:text-4xl">Other ways ELEVEX can help your business grow.</h2>
          <ServicePathCards exclude={path} />
        </div>
      </section>
      <SiteFooter />
      <BackToTop />
    </main>
  );
}
