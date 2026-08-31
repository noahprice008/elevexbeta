import { createFileRoute } from "@tanstack/react-router";
import { AudienceLayout } from "@/components/audience-layout";
import { PageHero, PainPoints, Pillars, StepFlow, QaStrip, PricingBlock, FinalCta, standardPricing } from "@/components/page-blocks";

const title = "Digital Systems for Tradesmen & Contractors | ELEVEX";
const description = "Stop missing quotes while you are on the tools — automated booking and instant quoting for tradesmen. Custom demo in 3 days, live platform 7 days from approval, free for 21 days, from $199/month after.";

export const Route = createFileRoute("/for/tradesmen")({
  head: () => ({ meta: [
    { title }, { name: "description", content: description },
    { property: "og:title", content: title }, { property: "og:description", content: description },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: TradesmenPage,
});

function TradesmenPage() {
  return (
    <AudienceLayout>
      <PageHero
        eyebrow="TRADESMEN & CONTRACTORS"
        title="Get Your Evenings Back. Quotes, Jobs, and Follow-Ups Handled—Without the Paperwork."
        subtitle="Your tools belong on-site, not at a desk. We build modern websites, automated booking systems, and instant quoting tools for tradesmen. Get more jobs, secure faster payments, and stop spending your weekends chasing paperwork."
        primary={{ label: "Get My Free Demo →", note: "No card required. Custom demo in 3 days, live platform 7 days from approval." }}
        secondary={{ label: "See How It Works", note: "Free 30-minute video consultation" }}
        badge="Custom demo in 3 days. Live platform 7 days from approval. Free for 21 days. Pay only if it works for you. No contracts, cancel anytime."
      />
      <PainPoints
        title="Are you running your business, or is your paperwork running you?"
        body="You didn't get into the trade to spend your evenings staring at spreadsheets, drafting quotes, and chasing late invoices. But right now, every hour you spend on admin is an hour you aren't earning—or an hour stolen from your family."
        items={[
          ["The Missed Call Problem", "You're on-site or up a ladder. A prospect calls, you can't pick up, and they immediately call your competitor."],
          ["The Evening Quote Grind", "You finish a 10-hour physical workday, only to sit down at 8:00 PM to type up quotes from a notepad."],
          ["The \u201cGhosted\u201d Follow-Up", "You send a great quote but never find the time to follow up. The lead goes cold."],
          ["The Cash Flow Chase", "Sending invoices late means getting paid late. Chasing deposits is awkward and time-consuming."],
        ]}
        closing="There is a better way. We build the digital foundation so your business runs smoothly in the background while you focus on the job."
      />
      <Pillars
        title="Your Digital Crew: Built to Automate Your Business"
        items={[
          { n: "01", title: "The Non-Stop Lead Capture — never miss a job while you are on site", copy: "A modern, mobile-friendly website designed specifically to showcase your past projects, highlight five-star reviews, and let clients request quotes directly. If you miss a call while on-site, our system automatically sends an SMS back: \u201cSorry I missed you! I'm currently on-site. Click here to instantly upload photos of your job and request a quote.\u201d You never lose a lead again." },
          { n: "02", title: "The 5-Minute Quote Generator (Automation)", copy: "We connect your website to simple, templated quoting software tailored to your trade. Select the job type, input the dimensions, and click \u201cSend.\u201d The system automatically generates a professional, branded PDF quote, emails it to the client, and sends a text notification." },
          { n: "03", title: "The Automated Follow-Up Engine (Growth Systems & AI)", copy: "A smart follow-up system that works even when you're asleep. Once a quote is sent, the system automatically follows up via polite email/SMS at Day 3 and Day 7. When they accept, the system automatically prompts them to pay the deposit online to secure their spot on your schedule." },
          { n: "04", title: "Frictionless Client Booking & Reminders (Growth Systems)", copy: "An online calendar that fits around your real schedule. Customers book their own site visits or consultations based on your actual availability. The system automatically sends them SMS reminders to ensure they're home when you arrive, eliminating wasted trips." },
        ]}
      />
      <StepFlow
        title="Get your custom interactive demo in 3 days — and your fully programmed live platform in 7 days from approval."
        sub="We don't do slow, expensive development projects. We build practical solutions fast so you can start saving time immediately."
        steps={[
          { n: "01", title: "The 30-Min Video Call (Free)", copy: "We discuss your trade, your biggest admin bottlenecks, and what you want to automate. We give you a clear recommendation and a fixed monthly quote on the spot." },
          { n: "02", title: "We Build It in a Week", copy: "We design your website, connect your scheduling tools, and set up your automations." },
          { n: "03", title: "21 Days to Test-Drive (Free)", copy: "We hand you the keys. You use the system for 21 days to book real jobs, send real quotes, and experience the time saved—without paying a single cent.", highlight: true, badge: "Free" },
          { n: "04", title: "Keep It or Cancel It", copy: "If it completely changes your business, you stay on for your flat monthly price (from $199/mo — less than one recovered job a month). No long contracts, no lock-ins, cancel anytime. If you don't love it, we turn it off and you owe us nothing." },
        ]}
        callout="Try it free for 21 days. Only pay if you keep it."
      />
      <QaStrip
        eyebrow="COMMON QUESTIONS"
        title="Built for local trade businesses who want to scale."
        items={[
          ["\u201cI'm not good with tech.\u201d", "You don't have to be. We handle 100% of the setup, hosting, security, and maintenance. If you need a change, just text us and we'll update it for you."],
          ["\u201cWhat software do I need to buy?\u201d", "We connect the tools you already use (like Gmail, Outlook, Xero, or WhatsApp) to create a unified system. If we introduce a tool, we build it directly into your flat monthly fee so there are no surprise bills."],
          ["\u201cWill I lose my personal touch?\u201d", "Never. Automation handles the repetitive chores (like typing addresses, sending reminders, and saving contact info) so you have more time to build real relationships with your customers."],
        ]}
      />
      <PricingBlock
        card1={{ ...standardPricing.card1, copy: "A structured 30-minute online video call about your trade, your admin bottlenecks and where automation saves you the most time — followed by a clear recommendation and a fixed quote." }}
        card2={standardPricing.card2}
      />
      <FinalCta
        title="Stop wasting your weekends on admin. Let's automate your trade."
        button="Get My Free Demo →"
        subtext="No credit card. No obligation. Just a practical plan to get your time back."
        email="sales@elevex.digital"
      />
    </AudienceLayout>
  );
}
