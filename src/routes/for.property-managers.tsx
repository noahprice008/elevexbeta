import { createFileRoute } from "@tanstack/react-router";
import { AudienceLayout } from "@/components/audience-layout";
import { PageHero, PainPoints, Pillars, StepFlow, PricingBlock, ConsultationSection, FinalCta, standardPricing } from "@/components/page-blocks";

const title = "Digital Systems for Property Managers & Realtors | ELEVEX";
const description = "Stop chasing tenants and buyers across five apps. Custom demo in 3 days, live platform 7 days from approval, free for 21 days, from $199/month after.";

export const Route = createFileRoute("/for/property-managers")({
  head: () => ({ meta: [
    { title }, { name: "description", content: description },
    { property: "og:title", content: title }, { property: "og:description", content: description },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: PropertyManagersPage,
});

function PropertyManagersPage() {
  return (
    <AudienceLayout>
      <PageHero
        eyebrow="PROPERTY MANAGERS & REALTORS"
        title="Every Missed Call Is a Tenant, Buyer, or Listing You Didn't Get."
        subtitle="Maintenance requests, showings, applications, and follow-ups don't stop at 5pm — and neither should your response time. ELEVEX builds the systems that keep every property, listing, and client moving without you chasing it manually."
        primary={{ label: "Claim My Free Demo →" }}
        secondary={{ label: "See How It Works" }}
        badge="Custom demo in 3 days. Live platform 7 days from approval. Free for 21 days."
      />
      <PainPoints
        title="Property doesn't wait for office hours."
        body="Every unit, listing, and client relationship generates its own stream of requests — and they don't pause for the weekend:"
        items={[
          ["The 11pm Maintenance Call", "A tenant reports a leak at night, and by morning it's a missed message buried under twenty others."],
          ["The Listing Going Cold", "A buyer inquiry sits unanswered for hours while they've already booked a viewing somewhere else."],
          ["The Application Black Hole", "Rental applications, ID checks, and references get lost between email, text, and paper — and good tenants move on."],
          ["The Spreadsheet Empire", "Units, leases, showings, and vendor contacts live across a dozen disconnected sheets and sticky notes."],
        ]}
        closing="You don't need more software to check. You need the requests routed, answered, and tracked automatically — the first time."
      />
      <Pillars
        title="One partner. Every property, connected."
        sub="We combine digital development, automation, AI and integrations into one system built around your portfolio — not a generic listing site."
        items={[
          { n: "01", title: "A site and listings page that actually convert", copy: "A modern, mobile-first site and listing pages that turn browsers into booked showings and serious applicants." },
          { n: "02", title: "Automation — maintenance requests that route themselves", copy: "Tenant requests, vendor assignments, and lease reminders handled automatically, so nothing sits in an inbox overnight." },
          { n: "03", title: "AI — answering tenant and buyer questions at any hour", copy: "AI that answers common questions, pre-qualifies leads, and books showings while you sleep." },
          { n: "04", title: "Growth Systems — every inquiry tracked, every follow-up sent", copy: "Every lead, application, and maintenance ticket captured and followed up automatically, so nothing falls through the cracks as your portfolio grows." },
        ]}
      />
      <StepFlow
        title="From first conversation to interactive demo in 3 days — live platform 7 days from approval."
        steps={[
          { n: "01", title: "Tell Us About Your Business", copy: "A short form on what you do, what's slowing you down, and where you want to grow." },
          { n: "02", title: "We Prepare Your Recommendation", copy: "A tailored presentation showing exactly what we'd build and why." },
          { n: "03", title: "30-Min Video Discovery Call & Fixed Quote", copy: "We walk through the plan live and lock in one fixed monthly price." },
          { n: "04", title: "Your Platform Goes Live in a Week", copy: "Built and delivered fast, with our team helping you get set up.", highlight: true, badge: "Free" },
          { n: "05", title: "21 Days Free, Then Only Pay If You Stay", copy: "No contract, no obligation, cancel anytime." },
        ]}
        callout="Try it free for 21 days. Only pay if you keep it."
      />
      <PricingBlock card1={standardPricing.card1} card2={standardPricing.card2} />
      <ConsultationSection industry="Property Managers & Realtors" />
      <FinalCta
        title="Ready to stop chasing tenants and leads?"
        body="Whether it's maintenance requests, showings, or applications slowing you down, ELEVEX can help you find the right place to start — free to try, before you ever pay a cent."
        button="Build My Free Demo →"
        email="sales@elevex.digital"
      />
    </AudienceLayout>
  );
}
