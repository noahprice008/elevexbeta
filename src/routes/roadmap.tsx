import { createFileRoute } from "@tanstack/react-router";
import { AudienceLayout } from "@/components/audience-layout";
import { PageHero, Eyebrow, FinalCta } from "@/components/page-blocks";
import { NodeFlow } from "@/components/node-flow";

const title = "The 21-Day Trial Roadmap | ELEVEX";
const description = "Exactly what happens from intake form to decision day: discovery call, Phase 1 Essentials build, delivery within a week, and a 21-day live trial with full ELEVEX support.";

export const Route = createFileRoute("/roadmap")({
  head: () => ({ meta: [
    { title }, { name: "description", content: description },
    { property: "og:title", content: title }, { property: "og:description", content: description },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: RoadmapPage,
});

const stages: { label: string; detail: string }[] = [
  { label: "01 — Intake form", detail: "A short guided form captures your priorities, the tools you already run on and what you want handled first." },
  { label: "02 — 30-minute discovery call", detail: "An online video call to confirm scope, agree what belongs in Phase 1 and give you a fixed monthly quote." },
  { label: "03 — Phase 1 Essentials build", detail: "We build Your Launch-Ready Core Systems: the site, the booking and the automations that carry the most weight from day one." },
  { label: "04 — Delivery within a week", detail: "Your platform goes live, connected to your existing tools, tested and handed over ready to use." },
  { label: "05 — 21-day live trial", detail: "You run real work through it for 21 days with full ELEVEX support. Tweaks and adjustments are included throughout." },
  { label: "06 — Decision day", detail: "Continue at the quoted monthly fee, or walk away with a 7-day export grace period to take your data with you." },
];

function RoadmapPage() {
  return (
    <AudienceLayout>
      <PageHero
        eyebrow="THE 21-DAY TRIAL ROADMAP"
        title="No Mystery. Here Is Every Step From First Form to Decision Day."
        subtitle="You know what happens, when it happens and what it costs before you commit to anything. Nothing is billed until the trial is over and you have decided to keep it."
        primary={{ label: "Start the Intake Form →", note: "Takes a few minutes. No credit card." }}
        badge="Live within a week. Free for 21 days. Pay only if you keep it."
      />

      <section className="bg-navy py-24 text-cloud md:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Eyebrow dark>THE JOURNEY</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
            Six stages. One flat fee. Zero guesswork.
          </h2>
          <div className="mt-14 rounded-md border border-cloud/10 bg-cloud/[0.03] p-8 md:p-12">
            <NodeFlow dark steps={stages} />
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>DURING THE TRIAL</Eyebrow>
              <h2 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl">
                Your team gets custom video guides, recorded for your exact setup.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                A system nobody uses is a system that failed. During your 21-day trial we record short screen-capture walkthroughs of
                <em> your </em>
                platform — not generic help documentation — so any member of staff can watch two minutes and get on with the job.
              </p>
              <p className="mt-4 text-muted-foreground">
                New hire in month four? Send them the same library. Changed a workflow? We re-record it. Adoption is part of the delivery, not an afterthought.
              </p>
            </div>
            <div className="rounded-md border bg-card p-8">
              <NodeFlow
                steps={[
                  { label: "We record your workflows", detail: "Short, narrated screen captures of the exact screens your staff will use." },
                  { label: "Your team watches and applies", detail: "Two-minute clips instead of a manual nobody opens." },
                  { label: "We re-record as you change", detail: "Update a process and the guide is refreshed to match." },
                ]}
              />
              <p className="mt-8 border-t pt-6 text-sm font-extrabold text-primary">
                Makes sure the system actually gets used, not just delivered.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Eyebrow>DECISION DAY</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">Two clear outcomes. Both fair.</h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-md border bg-border md:grid-cols-2">
            <div className="bg-card p-8">
              <h3 className="text-xl font-extrabold">You keep it</h3>
              <p className="mt-3 text-muted-foreground">
                You continue at the monthly fee quoted on your discovery call — hosting, support, maintenance and ongoing tweaks included. No contract, cancel anytime.
              </p>
            </div>
            <div className="bg-card p-8">
              <h3 className="text-xl font-extrabold">You walk away</h3>
              <p className="mt-3 text-muted-foreground">
                You owe nothing. A 7-day export grace period gives you time to take your data and content with you before the system is switched off.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FinalCta
        title="Ready to start the 21 days?"
        button="Request a Custom Demo →"
        subtext="A 30-minute online video call, a fixed quote, and a working platform within a week."
      />
    </AudienceLayout>
  );
}
