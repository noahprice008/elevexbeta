import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type QA = { q: string; a: React.ReactNode };

const groups: { category: string; items: QA[] }[] = [
  {
    category: "Fast Turnaround & Free Trial",
    items: [
      { q: "How can you deliver a live platform so fast?", a: "We've streamlined our delivery process into a structured, step-by-step experience. First, you tell us about your business by submitting your details through a short intake form. Our team reviews your submission and prepares a tailored recommendation presentation showing exactly what we'd build and why. Next, we walk you through this recommendation live on a 30-minute online video call, discuss your specific business goals, and lock in a fixed monthly price. Once you're ready to proceed, we build and deliver your live website, automations, and AI in 7 days from approval." },
      { q: "How does the 21-day free trial work? Are there any hidden commitments?", a: "We believe you shouldn't pay for technology until you see it working in your actual business. We build a fully functional visual demo of your future website or system for free within a few business days. If you like what you see, we program the live databases and integrations and deliver your live platform 7 days from approval. You then test-drive it in your daily operations for 21 days with active support. If it delivers value, you keep it at your quoted monthly rate — if not, we turn it off and you pay nothing. No credit card required upfront, zero obligation." },
      { q: "Do I need to provide a credit card to get started with the trial?", a: "No, there's no card required to start. Your initial 30-minute online video call, recommendation, and subsequent 21-day platform build are entirely free of financial commitment, allowing you to test the platform before making any payment decisions." },
      { q: "What happens if I decide not to continue after the free trial?", a: "No problem — there's no penalty and nothing owed. If you decide not to continue, your platform stays live for a 7-day grace period, giving you time to request an export of your data and content. After that window, we'll take the platform offline. You're never locked in, and you only pay for what you actually choose to keep." },
    ],
  },
  {
    category: "Pricing & Ongoing Maintenance",
    items: [
      { q: "What happens after the 21-day free trial ends?", a: "If the platform is driving value for your business and you decide to stay, you'll transition to the fixed monthly price we quoted on your 30-minute video discovery call. Pricing starts from $199/month — roughly what a few hours of part-time admin help costs, for a system that answers enquiries and books work around the clock. It varies depending on your specific project scope. There are no lock-in contracts or long-term commitments, meaning you can cancel at any time if your business needs change." },
      {
        q: "What do I get for the monthly fee (from $199/month — less than a few hours of admin help)?",
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
      { q: "What happens if I cancel — do I lose my site and data?", a: "No. You own your site, your customer database, and your domain 100% — that never changes. If you cancel, we help you export your files, content, and data in standard, portable formats, and we hand over domain control. The same applies after the free trial: your platform stays live for a 7-day grace period so there's time to export everything. No lock-in, no assets held hostage." },
      {
        q: "What counts as included maintenance vs. a new project?",
        a: (
          <>
            <p>We keep the line clear so there are never surprise invoices. Anything that keeps your existing systems healthy and current is included. Anything that builds something new is scoped and quoted before we start.</p>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wide text-primary">Included in your plan (from $199/month)</p>
                <ul className="mt-3 space-y-2">
                  {[
                    "Hosting and secure infrastructure",
                    "Security monitoring and backups",
                    "Domain health and uptime checks",
                    "Standard text and image updates",
                    "Performance checks and tuning",
                    "Routine operational tweaks (changing a form field, updating a phone number)",
                  ].map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="font-bold text-primary">✓</span><span>{item}</span></li>)}
                </ul>
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wide text-foreground">New project scope (quoted separately)</p>
                <ul className="mt-3 space-y-2">
                  {[
                    "New pages or sections",
                    "New automation sequences",
                    "New third-party integrations",
                    "Major feature additions",
                  ].map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="font-bold text-muted-foreground">+</span><span>{item}</span></li>)}
                </ul>
              </div>
            </div>
          </>
        ),
      },
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
                ["A website that wins the job", "before: visitors judge an outdated site and call someone else. After: a fast, mobile-first site that shows your work, your reviews and a quote request within one tap."],
                ["An end to manual admin", "before: quotes typed twice, leads copied into a CRM by hand, follow-ups forgotten. After: one enquiry updates every tool you already use, on its own."],
                ["Answers at 9pm, not 9am", "before: after-hours enquiries sit unread overnight. After: common questions get answered instantly and hot leads are qualified before you open the laptop."],
                ["A diary that fills itself", "before: chasing quotes and losing slots to no-shows. After: customers book themselves in, get reminded automatically, and nothing goes cold."],
              ].map(([title, copy], index) => <li key={title} className="flex gap-3"><span className="font-extrabold text-primary">{index + 1}.</span><span><strong className="font-extrabold text-foreground">{title}</strong> — {copy}</span></li>)}
            </ol>
          </>
        ),
      },
      { q: "Can you connect the software tools my business already uses?", a: "We design systems that respect the tools you already use. Whether it's Gmail, Outlook, HubSpot, Xero, Stripe, or an industry-specific CRM, your platform acts as the bridge connecting them — automating the movement of data between tools so you never have to re-key information again. If you'd rather replace an outdated or expensive tool entirely, we can handle that migration too." },
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
                ["Property Managers & Realtors", "automating maintenance requests, tenant applications, and listing follow-ups so nothing sits unanswered overnight."],
              ].map(([title, copy]) => <li key={title} className="flex gap-3"><span aria-hidden="true" className="font-bold text-primary">✓</span><span><strong className="font-extrabold text-foreground">{title}</strong> — {copy}</span></li>)}
            </ul>
          </>
        ),
      },
      { q: "How do I request edits or get help once my platform is live?", a: "We don't hand over a finished build and walk away — every client gets an ongoing technical partner. Need a text change, a new automated notification, or a tweak to an AI assistant? Our team handles it. Ongoing optimization is part of the plan, so your system keeps working to reclaim your time and win you more jobs. During your 21-day trial all edits are handled free; afterwards you get priority support, maintenance, monitoring, and backups." },
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
