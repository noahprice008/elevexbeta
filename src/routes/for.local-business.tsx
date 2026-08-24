import { createFileRoute } from "@tanstack/react-router";
import { AudienceLayout } from "@/components/audience-layout";
import { PageHero, PainPoints, Pillars, StepFlow, PricingBlock, FinalCta, standardPricing } from "@/components/page-blocks";

const title = "Digital Systems for Growing Local Businesses | ELEVEX";
const description = "Practical websites, automation and AI systems that scale with your growing local business. Live within a week, free for 21 days, from $199/month after.";

export const Route = createFileRoute("/for/local-business")({
  head: () => ({ meta: [
    { title }, { name: "description", content: description },
    { property: "og:title", content: title }, { property: "og:description", content: description },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: LocalBusinessPage,
});

function LocalBusinessPage() {
  return (
    <AudienceLayout>
      <PageHero
        eyebrow="GROWING LOCAL BUSINESSES"
        title="Every Big Business Started as a Growing Local One."
        subtitle="You're growing, but your tools haven't caught up. ELEVEX builds practical websites, automations, and AI-powered systems that scale with you — without the agency price tag or the months-long wait."
        primary={{ label: "Get Your Platform Live in 1 Week (Try Free)" }}
        secondary={{ label: "Book a Free Consultation" }}
        badge="Live platform in 1 week. Free for 21 days. Pay only if you stay."
      />
      <PainPoints
        title="Growing shouldn't feel this chaotic."
        body="More customers should mean more momentum — not more mess. But as local businesses grow, the cracks start to show:"
        items={[
          ["The Outdated First Impression", "Your business has grown, but your website still looks like it did on day one."],
          ["The Spreadsheet Sprawl", "Customer details, bookings, and follow-ups live across five different apps, texts, and notebooks."],
          ["The Follow-Up You Never Get To", "New enquiries come in faster than you can respond to them, and some just slip through."],
          ["The \u201cIs This Even Worth It\u201d Tech Fear", "You've priced out \u201cproper\u201d systems before and assumed they were built for businesses ten times your size."],
        ]}
        closing="You don't need enterprise software. You need the right technology, sized and priced for where your business actually is."
      />
      <Pillars
        title="One partner. Everything connected."
        sub="We combine digital development, automation, AI and integrations into one system built around your business — not a generic template."
        items={[
          { n: "01", title: "Digital Presence — A website that grows with you", copy: "A modern, responsive site that reflects the business you're building today, with room to add booking, e-commerce, or new pages as you grow." },
          { n: "02", title: "Automation — Stop running your business from ten different apps", copy: "We connect the tools you already use and automate the repetitive admin — follow-ups, reminders, data entry — so growth doesn't mean more manual work." },
          { n: "03", title: "AI — Practical AI, no buzzwords", copy: "Simple, useful AI where it actually helps: answering common customer questions, qualifying enquiries, or summarizing what's happening in your business." },
          { n: "04", title: "Growth Systems — Turn steady interest into steady revenue", copy: "Capture, organize, and follow up with every enquiry automatically, so no lead falls through the cracks as volume increases." },
        ]}
      />
      <StepFlow
        title="From first conversation to live platform within a week."
        steps={[
          { n: "01", title: "Tell Us About Your Business", copy: "A short form on what you do, what's slowing you down, and where you want to grow." },
          { n: "02", title: "We Prepare Your Recommendation", copy: "A tailored presentation showing exactly what we'd build and why." },
          { n: "03", title: "Discovery Call & Fixed Quote", copy: "We walk through the plan live and lock in one fixed monthly price." },
          { n: "04", title: "Your Platform Goes Live in a Week", copy: "Built and delivered fast, with our team helping you get set up.", highlight: true, badge: "Free" },
          { n: "05", title: "21 Days Free, Then Only Pay If You Stay", copy: "No contract, no obligation, cancel anytime." },
        ]}
        callout="Try it free for 21 days. Only pay if you keep it."
      />
      <PricingBlock card1={standardPricing.card1} card2={standardPricing.card2} />
      <FinalCta
        title="Ready to grow without the growing pains?"
        body="Whether it's your website, your admin, or your follow-ups slowing you down, ELEVEX can help you find the right place to start — free to try, before you ever pay a cent."
        button="Book a Consultation →"
        email="sales@elevex.digital"
      />
    </AudienceLayout>
  );
}
