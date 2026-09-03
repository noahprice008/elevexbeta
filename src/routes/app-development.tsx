import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";

const title = "Custom App & Software Development | ELEVEX";
const description = "Custom internal tools, portals and business applications built around how you actually work. Free working demo in 3 days, live in 7, free for 21 days.";
const url = "https://elevexbeta.lovable.app/app-development";

export const Route = createFileRoute("/app-development")({
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
          { "@type": "ListItem", position: 2, name: "App Development", item: url },
        ],
      }),
    }],
  }),
  component: AppDevelopmentPage,
});

function AppDevelopmentPage() {
  return (
    <ServicePage
      path="/app-development"
      serviceFocus="App Development"
      ctaLabel="Build my free app demo."
      hero={{
        breadcrumb: "App Development",
        eyebrow: "Custom Application Development",
        title: "Custom Software, Built Around How Your Business Actually Works",
        subtitle: "Test Drive Your Custom Application in 7 Days — Pay Nothing Until It Works",
        primary: "Build My Free App Demo",
        secondary: "See What's Possible",
      }}
      explanation={{
        eyebrow: "App Development",
        title: "When Off-The-Shelf Software Doesn't Fit",
        intro: (
          <>
            <p>Many businesses are forced to adapt their processes to generic software.</p>
            <p>The result? Workarounds. Extra admin. Frustrated teams. Inefficient workflows.</p>
            <p>ELEVEX builds custom applications designed around how your business actually operates.</p>
          </>
        ),
        blocks: [
          {
            title: "What Can We Build?",
            bullets: [
              "Internal business tools",
              "Customer portals",
              "Staff management systems",
              "Booking and scheduling platforms",
              "Operations dashboards",
              "Service request systems",
              "Workflow management tools",
              "Industry-specific applications",
            ],
          },
          {
            title: "Built Around Your Process",
            copy: (
              <>
                <p>Instead of forcing your team to change how they work, we build software that supports your existing operations and improves them.</p>
                <p>Every application is designed to solve a real business problem and deliver measurable value.</p>
              </>
            ),
          },
          {
            title: "See Your Application Before Investing",
            copy: <p>We'll create a working front-end demo so you can experience the concept, user flow, and design before committing to development.</p>,
          },
          {
            title: "Ready For What Comes Next",
            copy: <p>Your application connects to the tools you already use and leaves room to layer in automation and AI as your operation grows.</p>,
          },
        ],
        result: ["Better processes.", "Improved efficiency.", "Happier teams.", "A system built specifically for your business."],
      }}
    />
  );
}
