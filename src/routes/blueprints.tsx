import { createFileRoute } from "@tanstack/react-router";
import { AudienceLayout } from "@/components/audience-layout";
import { PageHero, Eyebrow, FinalCta } from "@/components/page-blocks";
import { NodeFlow } from "@/components/node-flow";

const title = "Automation Blueprint Gallery | ELEVEX";
const description = "See exactly how ELEVEX automations run in your business — step-by-step blueprints for booking, reminders, reviews and instant lead response.";

export const Route = createFileRoute("/blueprints")({
  head: () => ({ meta: [
    { title }, { name: "description", content: description },
    { property: "og:title", content: title }, { property: "og:description", content: description },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: BlueprintsPage,
});

const blueprints: { name: string; line: string; steps: { label: string; detail: string }[]; outcome: string }[] = [
  {
    name: "The No-Show Killer",
    line: "Every booking confirms, reminds and follows up on its own — so your calendar stays full and your reviews keep coming.",
    steps: [
      { label: "Customer books online", detail: "They pick a real slot from your live availability — no phone tag." },
      { label: "Instant SMS confirmation", detail: "Details land on their phone seconds later, with a one-tap reschedule link." },
      { label: "Reminder sequence", detail: "Timed nudges before the appointment so the slot is not quietly forgotten." },
      { label: "Automated review request", detail: "After the job is done, a review request goes out while the goodwill is fresh." },
    ],
    outcome: "Stops missed appointments before they happen.",
  },
  {
    name: "The Instant Lead Responder",
    line: "Enquiries get answered in seconds, day or night, while the details file themselves away for you.",
    steps: [
      { label: "Lead form submitted", detail: "From your website, ad or listing — every enquiry enters the same pipeline." },
      { label: "Immediate SMS reply", detail: "A branded response goes out within seconds, carrying your booking link." },
      { label: "Booking link opened", detail: "The prospect self-schedules while their interest is still hot." },
      { label: "Records updated", detail: "Contact, source and status are written into your records without you typing a thing." },
    ],
    outcome: "Wins the job before your competitor picks up the phone.",
  },
  {
    name: "The Quiet Cash Collector",
    line: "Deposits, invoices and reminders move themselves through the pipeline until the money lands.",
    steps: [
      { label: "Job accepted", detail: "Approval on the quote triggers everything downstream automatically." },
      { label: "Deposit request sent", detail: "A secure payment link goes out immediately to lock the slot in." },
      { label: "Invoice on completion", detail: "The final invoice issues itself the moment the job is marked done." },
      { label: "Polite chase sequence", detail: "Overdue balances get followed up on schedule, without the awkward call." },
    ],
    outcome: "Gets you paid faster without a single reminder email written by hand.",
  },
];

function BlueprintsPage() {
  return (
    <AudienceLayout>
      <PageHero
        eyebrow="AUTOMATION BLUEPRINT GALLERY"
        title="See Exactly What Runs in the Background of Your Business."
        subtitle="Automation is not an abstract idea. Each blueprint below is a live system we build, install and support — mapped step by step so you can see precisely where your time comes back."
        primary={{ label: "Request a Custom Demo →", note: "Custom demo in 3 days, live platform 7 days from approval. Free for 21 days." }}
        badge="Every blueprint is built into your flat monthly fee. No per-automation billing."
      />

      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Eyebrow>THE BLUEPRINTS</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
            Systems that run whether you are at a desk or on a job.
          </h2>
          <div className="mt-14 space-y-8">
            {blueprints.map((blueprint) => (
              <article key={blueprint.name} className="rounded-md border bg-card p-8 md:p-10">
                <h3 className="text-2xl font-extrabold md:text-3xl">{blueprint.name}</h3>
                <p className="mt-3 max-w-3xl text-muted-foreground">{blueprint.line}</p>
                <div className="mt-10">
                  <NodeFlow steps={blueprint.steps} />
                </div>
                <p className="mt-8 border-t pt-6 text-sm font-extrabold text-primary">{blueprint.outcome}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCta
        title="Want one of these mapped to your business?"
        button="Request a Custom Demo →"
        subtext="A 30-minute online video call. No credit card, no obligation — just a clear picture of what we would automate first."
      />
    </AudienceLayout>
  );
}
