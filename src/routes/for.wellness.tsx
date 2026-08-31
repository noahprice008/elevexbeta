import { createFileRoute } from "@tanstack/react-router";
import { AudienceLayout } from "@/components/audience-layout";
import { PageHero, PainPoints, Pillars, StepFlow, PricingBlock, FinalCta } from "@/components/page-blocks";

const title = "Digital Systems for Wellness Studios & Clinics | ELEVEX";
const description = "Automated bookings, reminders, digital intake and client management for wellness studios and clinics. Custom demo in 3 days, live platform 7 days from approval, free for 21 days.";

export const Route = createFileRoute("/for/wellness")({
  head: () => ({ meta: [
    { title }, { name: "description", content: description },
    { property: "og:title", content: title }, { property: "og:description", content: description },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: WellnessPage,
});

function WellnessPage() {
  return (
    <AudienceLayout>
      <PageHero
        eyebrow="WELLNESS STUDIOS & CLINICS"
        title="Bookings, Reminders, and Client Management. Running Beautifully on Autopilot."
        subtitle="Stop wrestling with clunky booking software and chasing class packages. ELEVEX builds custom, high-converting digital systems that handle your scheduling, reminders, and client intake in the background—so you can focus on the people in your studio."
        primary={{ label: "Request a Custom Demo", note: "No obligation, no commitment" }}
        secondary={{ label: "See How It Works" }}
        badge="Your interactive demo in 3 days, live studio platform 7 days from approval. Free for 21 days. Pay only if you love it."
      />
      <PainPoints
        title="You opened your studio to teach and heal—not to manage software."
        body="As a wellness business owner, your energy belongs to your clients. But instead, too many of your evenings are spent dealing with administrative friction:"
        items={[
          ["The Late-Night Booking Shuffle", "Juggling text messages, Instagram DMs, and emails from clients trying to reschedule or book into a full class."],
          ["The Cost of No-Shows", "Empty mats or treatment tables because of missed appointments and lack of automated, friendly reminders."],
          ["Intake Form Friction", "Handing clients paper clipboards when they walk in, then manually typing their health history and goals into a spreadsheet later."],
          ["Disconnected Software Chaos", "Paying for three different platforms—one for scheduling, one for email marketing, one for credit card processing—that refuse to talk to each other."],
        ]}
      />
      <Pillars
        title="We design and connect a seamless digital ecosystem tailored specifically to how your studio or clinic flows."
        items={[
          { n: "01", title: "Turn Browsers Into First Bookings", copy: "We build modern, beautifully responsive websites that instantly reflect the peaceful, professional energy of your space while making it incredibly easy for new clients to book their first visit.", bullets: ["Mobile-optimized scheduling", "Practitioner bios", "Clear class/service menus"] },
          { n: "02", title: "Bookings & Reminders That Run Themselves", copy: "Give clients the freedom to book, reschedule, or purchase class packs 24/7. Automated workflows send friendly SMS and email confirmations and class reminders to keep your schedule full and eliminate costly no-shows.", bullets: ["Integrated calendar sync", "Automated waitlists", "Recurring membership billing"] },
          { n: "03", title: "Effortless Client Management & Digital Intake", copy: "Ditch the paperwork completely. The moment a new client books, your system automatically sends them a beautiful digital intake form — details, waivers, and preferences logged straight into your system before they walk through your door.", bullets: ["Automated waiver signing", "Secure client profiles", "Practitioner note-taking integrations"] },
          { n: "04", title: "Growth Systems for New Member Nurturing", copy: "Turn one-time drop-ins into committed monthly members. Smart follow-up systems automatically check in on new clients after their first class, ask for feedback, and guide them gently toward your membership options.", bullets: ["First-visit welcome flows", "Automated review requests", "Referral tracking"] },
        ]}
      />
      <StepFlow
        title="From idea to an interactive demo in 3 days — your live, self-running studio platform 7 days from approval."
        steps={[
          { n: "01", title: "Tell Us About Your Studio", copy: "Fill out our brief form detailing your goals." },
          { n: "02", title: "We Prepare Your Recommendation", copy: "We design a custom map of your ideal setup." },
          { n: "03", title: "Live 30-Min Video Discovery Call & Fixed Quote", copy: "We lock in one honest monthly price." },
          { n: "04", title: "Your 21-Day Free Trial", copy: "Test it live. We guide you through every step.", highlight: true, badge: "Free" },
          { n: "05", title: "Only Pay If You Stay", copy: "Cancel anytime. No contracts or lock-ins." },
        ]}
        callout="Try it free for 21 days. Only pay if you keep it."
      />
      <PricingBlock
        card1={{ label: "Start here", title: "Free Consultation & Discovery", price: "$0", copy: "A structured 30-minute online video call about your wellness studio's unique workflows, challenges, and client experience, followed by a clear recommendation and fixed quote.", items: ["No card required to start", "No obligation, no commitment", "21 days entirely free before you pay anything", "Live platform delivered 7 days from approval"] }}
        card2={{ label: "After your free trial", title: "After Your 21-Day Free Trial", price: "From $199", priceSuffix: "/month", copy: "Less than the revenue from a couple of recovered no-shows each month. The single, fixed price quoted on your call is exactly what you pay to keep your studio running smoothly, with zero surprise fees and no contracts.", items: ["Premium hosting & secure client databases", "Ongoing platform maintenance and security updates", "Rapid support from our team", "Continuous optimization and minor edits", "Room to scale up automation and custom AI over time"] }}
      />
      <FinalCta
        title="Let's make your studio run beautifully."
        body="Keep your energy where it matters most: with your community. Let ELEVEX build the digital foundation that works in the background so your studio can grow."
        button="Book Your Free 30-Min Wellness Video Consultation →"
      />
    </AudienceLayout>
  );
}
