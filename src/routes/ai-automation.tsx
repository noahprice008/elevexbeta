import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";

const title = "AI Automation Systems for Growing Businesses | ELEVEX";
const description = "Custom AI and automation that follow up on leads, answer customers and remove manual admin. Free demo in 3 days, live in 7, free for 21 days.";
const url = "https://elevexbeta.lovable.app/ai-automation";

export const Route = createFileRoute("/ai-automation")({
  head: () => ({
    meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://elevexbeta.lovable.app/" },
          { "@type": "ListItem", position: 2, name: "AI Automation", item: url },
        ],
      }),
    }],
  }),
  component: AiAutomationPage,
});

function AiAutomationPage() {
  return (
    <ServicePage
      path="/ai-automation"
      serviceFocus="AI Automation"
      ctaLabel="Build my free AI automation demo."
      hero={{
        breadcrumb: "AI Automation",
        eyebrow: "AI Automation Systems",
        title: "Enterprise-Grade AI, Engineered to Run Your Business — Day and Night",
        subtitle: "Test Drive Your Custom AI System in 7 Days — Pay Nothing Until It Works",
        primary: "Build My Free AI Demo",
        secondary: "See How It Works",
      }}
      explanation={{
        eyebrow: "AI Automation",
        title: "Stop Doing Work That Software Can Do For You",
        intro: (
          <>
            <p>Most businesses waste hours every week on repetitive tasks that slow down growth.</p>
            <p>Following up with leads. Answering the same questions. Updating spreadsheets. Moving information between systems. Chasing appointments. Managing inboxes.</p>
            <p>ELEVEX builds custom AI and automation systems that handle these tasks automatically, so your team can focus on work that actually drives revenue.</p>
          </>
        ),
        blocks: [
          {
            title: "What Can Be Automated?",
            bullets: [
              "Lead capture and follow-up",
              "Customer service and support",
              "Appointment booking and reminders",
              "Internal business processes",
              "Data entry and reporting",
              "Team notifications and workflows",
              "CRM and software integrations",
              "AI assistants for staff and customers",
            ],
          },
          {
            title: "Built Specifically For Your Business",
            copy: (
              <>
                <p>No templates. No generic software.</p>
                <p>We design and build systems around your existing processes, tools, and goals.</p>
                <p>Before you spend a dollar, we'll create a working demo so you can see exactly how your automation will work inside your business.</p>
              </>
            ),
          },
        ],
        result: ["Less manual work.", "Faster response times.", "Better customer experiences.", "More time to focus on growth."],
      }}
    />
  );
}
