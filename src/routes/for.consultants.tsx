import { createFileRoute } from "@tanstack/react-router";
import { AudienceLayout } from "@/components/audience-layout";
import { PageHero, PainPoints, Pillars, StepFlow, PricingBlock, FinalCta } from "@/components/page-blocks";

const title = "Digital Systems for Consultants & Professional Services | ELEVEX";
const description = "Stop fielding unqualified enquiries — a site that sells your authority and screens leads for you. Live within a week, free for 21 days, from $199/month after.";

export const Route = createFileRoute("/for/consultants")({
  head: () => ({ meta: [
    { title }, { name: "description", content: description },
    { property: "og:title", content: title }, { property: "og:description", content: description },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: ConsultantsPage,
});

function ConsultantsPage() {
  return (
    <AudienceLayout>
      <PageHero
        eyebrow="CONSULTANTS & PROFESSIONAL SERVICES"
        title="Stop Chasing Tire-Kickers. Streamline Your High-Ticket Client Pipeline."
        subtitle="Your expertise is high-value, but your client acquisition shouldn't require manual chasing. ELEVEX builds premium digital presences and automated qualification systems for consultants and professional service providers—giving you back your time and bringing you highly qualified clients."
        primary={{ label: "Get Your System Built Within a Week (Try Free)" }}
        secondary={{ label: "Request a Custom Demo" }}
        badge="Live platform within a week. Free for 21 days. Pay only if you stay."
      />
      <PainPoints
        title="Are you spending more time chasing leads than delivering expertise?"
        body="As a consultant or professional service provider, your time is your most valuable asset. Yet, most professionals find themselves trapped in a cycle of manual, repetitive administration:"
        items={[
          "Wasting hours on calls with unqualified leads who can't afford your fees.",
          "Chasing prospects back and forth via email just to coordinate a simple calendar booking.",
          "Losing credibility with an outdated digital presence that doesn't reflect the high quality of your work.",
          "Scrambling to follow up with new inquiries while in the middle of client delivery.",
        ]}
        closing="You don't need to work harder to grow your practice. You need a digital system that qualifies, books, and nurtures your ideal clients in the background so you can focus strictly on high-impact work."
      />
      <Pillars
        title="From Handshakes to Highly Qualified Inquiries."
        sub="We build tailored digital presences, automation, and smart qualification systems designed around how you sell your high-ticket services."
        items={[
          { n: "Pillar 1", title: "Be the obvious choice before the first call", copy: "Your website should do more than just exist—it must build trust instantly. We design modern, high-converting digital platforms that position you as an undisputed authority.", bullets: ["Premium web design & development reflecting your unique personal or firm brand", "Clear value propositions that communicate your expertise and service packages in seconds", "Client case studies & proof integration structured to maximize conversion rates"] },
          { n: "Pillar 2", title: "Automated Qualification & Smart Discovery Bookings", copy: "Ditch the back-and-forth emails. We put booking and qualification on autopilot so you only speak to serious prospects.", bullets: ["Custom qualification flows that filter leads by budget, industry, and urgency before they book", "Integrated calendar scheduling that syncs with Google, Outlook, or iCloud", "Automated video-call link generation and intake questionnaire delivery upon booking"] },
          { n: "Pillar 3", title: "Automated Client Nurturing & Follow-Up", copy: "Never let a hot lead go cold.", bullets: ["Instant confirmation & SMS reminders to virtually eliminate no-shows", "Automated email nurture sequences that deliver your resources, whitepapers, or case studies before the call", "Seamless CRM automations that funnel leads directly into your client tracker (ActiveCampaign, HubSpot, Salesforce, etc.)"] },
          { n: "Pillar 4", title: "Streamlined Onboarding & Proposal Delivery", copy: "Transition prospects to paying clients effortlessly.", bullets: ["Automated welcome workflows that trigger onboarding questionnaires and collect required files as soon as a contract is signed", "Invoice & payment integrations (Stripe, PayPal) to handle retainers or deposits automatically"] },
        ]}
      />
      <StepFlow
        title="No Contracts. No Risks. Just a Live System Within a Week."
        steps={[
          { n: "01", title: "Free 30-Min Video Consultation & Discovery (Day 1)", copy: "We discuss your ideal client profile, your service model, and your current administrative bottlenecks, and quote a single fixed monthly fee on the call." },
          { n: "02", title: "Tailored Build & Integration (Days 2–7)", copy: "We design your site, set up your calendar routing, configure your qualification forms, and wire up your automations." },
          { n: "03", title: "Your Platform is Live (Day 8)", copy: "We deliver your fully functional, integrated platform." },
          { n: "04", title: "21-Day Free Trial", copy: "You get a full 21 days to test the system in the real world, completely free.", highlight: true, badge: "Free" },
          { n: "05", title: "Only Pay If You Stay", copy: "Keep it for the fixed monthly rate quoted on your call (from $199/month — less than an hour of your billable time), or cancel anytime — no contract, no questions asked." },
        ]}
        callout="Try it free for 21 days. Only pay if you keep it."
      />
      <PricingBlock
        card1={{ label: "Start here", title: "The Build & Setup", price: "$0", copy: "Everything needed to get your practice's platform designed, integrated and live — free until you decide to stay.", items: ["Premium site design tailored to professional services", "Custom lead qualification form and onboarding flow", "Full setup of calendar scheduling & CRM integrations", "21 days of free trial usage"] }}
        card2={{ label: "After your free trial", title: "Growth & Maintenance Support", price: "From $199", priceSuffix: "/month", copy: "Roughly an hour of your billable time each month, for a system that qualifies leads around the clock. Quoted live based on your workflow complexity — no contracts, cancel anytime.", items: ["Premium hosting and secure infrastructure", "Ongoing maintenance, patches and backups", "Continuous optimization and copy adjustments", "Priority support", "Room to expand with AI assistants and advanced automations"] }}
      />
      <FinalCta
        title="Ready to reclaim your calendar and scale your firm?"
        body="Your next high-ticket client is out there. Stop losing them to clunky web pages, manual back-and-forths, or slow responses. Let ELEVEX build a digital foundation that works as hard as you do."
        button="Request a Custom Demo →"
        email="sales@elevex.digital"
      />
    </AudienceLayout>
  );
}
