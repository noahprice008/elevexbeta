import { createFileRoute } from "@tanstack/react-router";
import { AudienceLayout } from "@/components/audience-layout";
import { PageHero, PainPoints, Pillars, StepFlow, QaStrip, PricingBlock, ConsultationSection, FinalCta, standardPricing } from "@/components/page-blocks";

const title = "Digital Systems for Security & Facilities Firms | ELEVEX";
const description = "Connected scheduling, automated field reporting and real-time client updates for security and facilities firms. Custom demo in 3 days, live platform 7 days from approval, free for 21 days.";

export const Route = createFileRoute("/for/security")({
  head: () => ({ meta: [
    { title }, { name: "description", content: description },
    { property: "og:title", content: title }, { property: "og:description", content: description },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: SecurityPage,
});

function SecurityPage() {
  return (
    <AudienceLayout>
      <PageHero
        eyebrow="SECURITY & FACILITIES FIRMS"
        title="The Digital Backbone for Modern Security & Facilities Operations."
        subtitle="Connect your scheduling, automate incident reporting, and give clients real-time transparency—without the administrative headache. Get your interactive demo in 3 days and a fully programmed live platform 7 days from approval, try it free for 21 days, and only pay if it delivers."
        primary={{ label: "Claim My Free Demo →" }}
        badge="No contracts or lock-ins • 100% risk-free trial • Custom demo in 3 days, fully live 7 days from approval"
      />
      <PainPoints
        title="You protect people and properties. Who is protecting your time?"
        body="Running a security or facilities firm is a 24/7 logistical puzzle. If you're still relying on disconnected systems, spreadsheets, or paper logs, minor friction points quickly turn into major liabilities:"
        items={[
          ["The Scheduling Chaos", "Spending hours texting guards, cleaners, or technicians to confirm rosters, handle shift changes, and track attendance."],
          ["The Reporting Delay", "Waiting days for handwritten incident logs to reach your desk, leaving clients in the dark and exposing you to liability."],
          ["The Trust Gap", "Property managers and commercial clients demanding immediate proof of service while you struggle to gather the data."],
          ["The Unprofessional First Impression", "An outdated website or slow response times causing lucrative corporate contracts to go to larger competitors."],
        ]}
      />
      <Pillars
        title="Technology built around your field operations, not the other way around."
        sub="We don't sell generic software. We build a unified digital ecosystem designed specifically for your security or facilities brand."
        items={[
          { n: "01", title: "Pass Procurement Before You Are In the Room", copy: "Win More Premium Commercial Contracts. Your website is your digital storefront. We build highly professional, secure, and modern websites designed to pass rigorous corporate procurement standards and position your firm as an industry leader." },
          { n: "02", title: "Connected Scheduling & Attendance", copy: "No More Shift No-Shows or Scattered Text Chains. We connect your scheduling tools to keep your roster organized. Instantly dispatch teams, track check-ins, and notify supervisors of scheduling gaps before they become on-site issues." },
          { n: "03", title: "Automated Field Reporting & Logs", copy: "Turn On-Site Logs into Polished Client Reports, Instantly. Equip your team to file incident reports, safety checks, or daily logs directly from their mobile devices. We automate the workflow, routing formatted, professional PDF reports to your management team and clients." },
          { n: "04", title: "Real-Time Client Communication", copy: "Deliver the Transparency Your Competitors Can't. Build automatic notification flows that text or email clients when a patrol is completed, an incident is resolved, or a scheduled service is checked off." },
        ]}
      />
      <QaStrip
        eyebrow="THE ELEVEX ADVANTAGE"
        title="Practical technology, delivered at operational speed."
        items={[
          ["Business-First Integration", "We start with the software and tools you already use (or help you find the right ones) and connect them seamlessly."],
          ["Speed Over Bureaucracy", "Traditional agencies take 3 to 6 months to deploy custom field tools. We deliver an interactive demo in 3 days and a fully functional live platform 7 days from approval."],
          ["Zero Upfront Risk", "Use your custom platform free for 21 days—if it doesn't save you time and impress your clients, you don't pay a penny."],
        ]}
      />
      <StepFlow
        title="From operational blueprint to interactive demo in 3 days — live platform 7 days from approval."
        steps={[
          { n: "01", title: "Tell Us About Your Business (5-Min Intake)", copy: "Submit your operational pain points—how you schedule, what reports you need, and where the bottlenecks are." },
          { n: "02", title: "We Design Your Blueprint", copy: "We map out an operational recommendation detailing the exact integrations, forms, and client portals we'll build." },
          { n: "03", title: "Clear Recommendation & Fixed Monthly Quote", copy: "We review the plan on a 30-minute online video call and provide a transparent, fixed monthly price quoted to your needs." },
          { n: "04", title: "Your Custom Platform Goes Live 7 Days From Approval", copy: "You get 21 days of full, unrestricted access to run your business with it—completely free.", highlight: true, badge: "Free" },
          { n: "05", title: "Only Pay If You Stay", copy: "If our automation saves you hours of admin work and delights your clients, keep it at the fixed price quoted. If not, cancel anytime with no lock-ins or fees." },
        ]}
        callout="Try it free for 21 days. Only pay if you keep it."
      />
      <PricingBlock card1={standardPricing.card1} card2={standardPricing.card2} />
      <ConsultationSection industry="Security & Facilities Firms" />
      <FinalCta
        title="Ready to run a tighter, more profitable operation?"
        body="Stop chasing rosters and chasing down paper incident reports. Let us build a modern digital foundation that scales alongside your business."
        button="Build My Free Demo →"
        email="sales@elevex.digital"
      />
    </AudienceLayout>
  );
}
