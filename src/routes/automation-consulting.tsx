import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";

const title = "Automation Consulting & Strategy Roadmaps | ELEVEX";
const description = "Find out what to automate first. We map your bottlenecks, build the roadmap, then implement it in days — free demo in 3 days, free for 21 days.";
const url = "https://elevexbeta.lovable.app/automation-consulting";

export const Route = createFileRoute("/automation-consulting")({
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
          { "@type": "ListItem", position: 2, name: "Automation Consulting", item: url },
        ],
      }),
    }],
  }),
  component: AutomationConsultingPage,
});

function AutomationConsultingPage() {
  return (
    <ServicePage
      path="/automation-consulting"
      serviceFocus="Automation Consulting"
      ctaLabel="Claim my free strategy session."
      hero={{
        breadcrumb: "Automation Consulting",
        eyebrow: "Automation Strategy & Implementation",
        title: "From Manual Chaos to an Automated Machine — We Map It, Then We Build It",
        subtitle: "Get a Custom Automation Roadmap, Then Watch Us Build It in Days",
        primary: "Claim My Free Strategy Session",
        secondary: "See The Process",
      }}
      explanation={{
        eyebrow: "Automation Consulting",
        title: "Not Sure What To Automate First?",
        intro: (
          <>
            <p>Most businesses know they have inefficiencies.</p>
            <p>The challenge isn't finding technology. The challenge is knowing where automation will create the biggest impact.</p>
            <p>That's where ELEVEX comes in.</p>
          </>
        ),
        blocks: [
          {
            title: "We Start With Strategy",
            copy: <p>Before building anything, we take a deep look at how your business operates today. We identify:</p>,
            bullets: [
              "Time-consuming manual tasks",
              "Process bottlenecks",
              "Areas where leads are being lost",
              "Communication breakdowns",
              "Opportunities to reduce costs",
              "Opportunities to improve customer experience",
            ],
          },
          {
            title: "Then We Build The Roadmap",
            copy: <p>You'll receive a clear plan showing:</p>,
            bullets: [
              "What should be automated first",
              "Expected business impact",
              "Recommended systems and tools",
              "Implementation priorities",
              "Quick wins and long-term opportunities",
            ],
          },
          {
            title: "And If You Want, We Build It Too",
            copy: (
              <>
                <p>Unlike traditional consultants, we don't stop at recommendations.</p>
                <p>Our team can implement the entire roadmap for you, turning strategy into working systems in days rather than months.</p>
              </>
            ),
          },
          {
            title: "Strategy That Ends in Working Systems",
            copy: (
              <>
                <p>Every recommendation is tied to a measurable outcome — hours reclaimed, leads recovered, admin removed.</p>
                <p>You see the first working demo within 3 days of your session, before any commitment.</p>
              </>
            ),
          },
        ],
        result: ["A clear plan.", "Better processes.", "Faster operations.", "Less guesswork."],
      }}
    />
  );
}
