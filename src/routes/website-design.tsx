import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";

const title = "Website Design, Build & Hosting for Business | ELEVEX";
const description = "A modern website built to convert, live in days not months. See a custom demo in 3 days, launch in 7, test it free for 21 days.";
const url = "https://elevexbeta.lovable.app/website-design";

export const Route = createFileRoute("/website-design")({
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
          { "@type": "ListItem", position: 2, name: "Website Design", item: url },
        ],
      }),
    }],
  }),
  component: WebsiteDesignPage,
});

function WebsiteDesignPage() {
  return (
    <ServicePage
      path="/website-design"
      serviceFocus="Website Design"
      ctaLabel="Build my free website demo."
      hero={{
        breadcrumb: "Website Design",
        eyebrow: "Website Design, Build & Hosting",
        title: "A Website Built to Convert, Live in Days — Not Months",
        subtitle: "Test Drive Your Custom Website in 7 Days — Pay Nothing Until It Works",
        primary: "Build My Free Website Demo",
        secondary: "View The Process",
      }}
      explanation={{
        eyebrow: "Website Design",
        title: "Your Website Should Be Your Best Salesperson",
        intro: (
          <>
            <p>For many businesses, a website is the first impression customers ever see.</p>
            <p>If it's outdated, confusing, slow, or difficult to use, potential customers leave before contacting you.</p>
            <p>ELEVEX builds modern websites designed to create trust, generate leads, and help your business grow.</p>
          </>
        ),
        blocks: [
          {
            title: "What Makes An ELEVEX Website Different?",
            bullets: [
              "Built around your business goals",
              "Mobile-friendly on every device",
              "Fast and responsive",
              "Modern professional design",
              "Clear calls-to-action",
              "Lead generation focused",
              "Easy to update and manage",
              "Secure hosting and ongoing support",
            ],
          },
          {
            title: "See It Before You Buy It",
            copy: (
              <>
                <p>Most agencies ask for payment before you've seen anything.</p>
                <p>We do things differently.</p>
                <p>We'll build a custom demo version of your website so you can experience the design, layout, and user journey before making a commitment.</p>
              </>
            ),
          },
          {
            title: "More Than Just A Website",
            copy: <p>Your website becomes a central part of your growth strategy, working alongside your marketing, automation, and customer experience systems.</p>,
          },
          {
            title: "Connected To Everything Else You Run",
            copy: <p>Enquiries flow straight into your calendar, CRM, and follow-up automations — so the site doesn't just look good, it does the admin for you.</p>,
          },
        ],
        result: ["More credibility.", "More leads.", "More opportunities to grow."],
      }}
    />
  );
}
