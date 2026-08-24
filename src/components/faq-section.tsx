import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type QA = { q: string; a: React.ReactNode };

const groups: { category: string; items: QA[] }[] = [
  {
    category: "Fast Turnaround & Free Trial",
    items: [
      { q: "How can you deliver a live platform within a week?", a: "We've streamlined our delivery process into a structured, step-by-step experience. First, you tell us about your business by submitting your details through a short intake form. Our team reviews your submission and prepares a tailored recommendation presentation showing exactly what we'd build and why. Next, we walk you through this recommendation live on a 30-minute online video call, discuss your specific business goals, and lock in a fixed monthly price. Once you're ready to proceed, we build and deliver your live website, automation, or AI platform within a week." },
      { q: "How does the 21-day free trial work? Are there any hidden commitments?", a: "Our 21-day free trial is entirely risk-free and designed for complete peace of mind. It starts with a free 30-minute online video call where you receive a clear recommendation and a fixed monthly quote, with no obligation and no credit card required. We then build and deliver your live platform within a week, giving you 21 days to actually use it in your day-to-day operations. During this trial period, our team helps you get set up and makes any edits you need, completely free of charge. At the end of the 21 days, if it's working for you, you continue at the agreed price with no contracts or lock-ins — you can cancel anytime. If you choose not to stay, you pay nothing." },
      { q: "Do I need to provide a credit card to get started with the trial?", a: "No, there's no card required to start. Your initial 30-minute online video call, recommendation, and subsequent 21-day platform build are entirely free of financial commitment, allowing you to test the platform before making any payment decisions." },
      { q: "What happens if I decide not to continue after the free trial?", a: "No problem — there's no penalty and nothing owed. If you decide not to continue, your platform stays live for a 7-day grace period, giving you time to request an export of your data and content. After that window, we'll take the platform offline. You're never locked in, and you only pay for what you actually choose to keep." },
    ],
  },
  {
    category: "Pricing & Ongoing Maintenance",
    items: [
      { q: "What happens after the 21-day free trial ends?", a: "If the platform is driving value for your business and you decide to stay, you'll transition to the fixed monthly price we quoted on your 30-minute video discovery call. This pricing starts from $199/month and varies depending on your specific project scope. There are no lock-in contracts or long-term commitments, meaning you can cancel at any time if your business needs change." },
      {
        q: "What's included in the monthly fee (starting from $199/month)?",
        a: (
          <>
            <p>The fixed monthly price we quote on your call covers everything required to keep your systems running smoothly, securely, and efficiently:</p>
            <ul className="mt-3 space-y-2">
              {[
                "Hosting & Secure Infrastructure — fast, reliable, and secure hosting for your platform",
                "Ongoing Maintenance & Updates — regular technical upkeep to ensure peak performance",
                "Priority Support — fast access to our team when you need help",
                "Continuous Optimization — ongoing improvements to keep your digital assets aligned with your goals",
                "Monitoring & Backups — regular backups, security monitoring, and reporting",
                "Scalability — room to scale and add automation or AI integrations over time as your business grows",
              ].map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="font-bold text-primary">✓</span><span>{item}</span></li>)}
            </ul>
          </>
        ),
      },
      { q: "Are there any setup fees or hidden surprises?", a: "None at all. We believe in straightforward, honest pricing built around your specific project. We scope and price strictly around what you actually need, meaning there are no pre-packaged plans with tools you'll never use and no hidden setup fees. The fixed price we quote on your 30-minute video discovery call is the exact price you pay — no surprises." },
    ],
  },
  {
    category: "Our Services & Technology Integrations",
    items: [
      {
        q: "What types of digital solutions do you build?",
        a: (
          <>
            <p>ELEVEX connects all of your digital pieces under a single, reliable partner. Our four core pillars are:</p>
            <ol className="mt-3 space-y-2">
              {[
                ["Digital Presence", "modern, responsive websites and digital experiences designed around your customers to build a strong first impression and act as a genuine business asset."],
                ["Automation", "custom business process automation to eliminate repetitive manual work and connect the software tools you already use into smooth, efficient workflows."],
                ["AI Solutions", "practical AI assistants, automated support, smart workflows, and content automation designed to generate measurable business productivity."],
                ["Growth Systems", "custom systems to help you capture, qualify, organize, and follow up with prospective clients, including seamless appointment booking and CRM integrations."],
              ].map(([title, copy], index) => <li key={title} className="flex gap-3"><span className="font-extrabold text-primary">{index + 1}.</span><span><strong className="font-extrabold text-foreground">{title}</strong> — {copy}</span></li>)}
            </ol>
          </>
        ),
      },
      { q: "Can you connect the software tools my business already uses?", a: "Yes, absolutely. We believe technology should make business easier, not create more disconnected systems. Our automation services focus on identifying manual processes and connecting your existing tools — such as CRMs, appointment bookers, and notification systems — to create smooth, unified workflows." },
      { q: "Can you build custom AI solutions for our operations?", a: "Yes, we focus on practical, value-driven AI solutions. We can design and implement custom AI assistants, automated customer support, AI-driven content generation, and smart workflow automations to improve your team's daily productivity and customer experiences." },
      { q: "Do you provide branding, content, or graphic design services?", a: "Yes. In addition to designing and developing your core responsive website, we offer branding, graphic design, video, and content support as optional add-ons to ensure your digital presence is completely tailored to your vision." },
    ],
  },
  {
    category: "Who We Work With & Support",
    items: [
      {
        q: "What industries or business types do you work with?",
        a: (
          <>
            <p>We build custom, outcome-focused solutions for growing local businesses and professional services. We frequently work with:</p>
            <ul className="mt-3 space-y-2">
              {[
                ["Tradesmen & Contractors", "helping them manage quotes, scheduling, jobs, and follow-ups without the tedious paperwork."],
                ["Consultants & Professional Services", "building high-credibility digital experiences that drive a steady flow of qualified inquiries."],
                ["Security & Facilities Firms", "setting up connected scheduling, instant reporting, and seamless client communication."],
                ["Wellness Studios & Clinics", "implementing automated bookings, reminders, and client management systems that run themselves."],
                ["Growing Local Businesses", "providing a robust, scalable digital foundation that expands alongside the business."],
              ].map(([title, copy]) => <li key={title} className="flex gap-3"><span aria-hidden="true" className="font-bold text-primary">✓</span><span><strong className="font-extrabold text-foreground">{title}</strong> — {copy}</span></li>)}
            </ul>
          </>
        ),
      },
      { q: "How do I request edits or get help once my platform is live?", a: "We act as your long-term digital partner. During your 21-day free trial, our team handles all setup and makes active edits along the way. Once you transition to the paid plan, you get priority support directly from our team, along with ongoing maintenance, monitoring, and backups so you never have to worry about the technical details." },
      { q: "What if my business grows and I need to add new features later?", a: "We build practical, scalable systems designed to grow with your business. Your monthly plan maintains room to scale, allowing you to add advanced business process automation, new integrations, or powerful AI capabilities over time as your operational needs expand." },
    ],
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-xs font-extrabold uppercase text-primary">FREQUENTLY ASKED QUESTIONS</p>
        <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">Straight answers to the questions we get most.</h2>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">Everything you need to know about how we work, what it costs, and what to expect.</p>
        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {groups.map((group) => (
            <div key={group.category} className="rounded-md border bg-secondary p-6 md:p-8">
              <h3 className="text-xs font-extrabold uppercase tracking-wide text-primary">{group.category}</h3>
              <Accordion type="single" collapsible className="mt-4">
                {group.items.map((item) => (
                  <AccordionItem key={item.q} value={item.q}>
                    <AccordionTrigger className="text-left text-base font-extrabold hover:text-primary">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
