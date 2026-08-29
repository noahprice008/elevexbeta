import { useMemo, useState } from "react";
import { Check, Search, Pointer } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Tool = { name: string; category: string };

const tools: Tool[] = [
  { name: "Stripe", category: "Payments" },
  { name: "Square", category: "Payments" },
  { name: "QuickBooks", category: "Payments" },
  { name: "Xero", category: "Payments" },
  { name: "ServiceTitan", category: "Scheduling" },
  { name: "Housecall Pro", category: "Scheduling" },
  { name: "Jobber", category: "Scheduling" },
  { name: "Calendly", category: "Scheduling" },
  { name: "Acuity", category: "Scheduling" },
  { name: "Mindbody", category: "Scheduling" },
  { name: "Vagaro", category: "Scheduling" },
  { name: "Fresha", category: "Scheduling" },
  { name: "HubSpot", category: "CRM" },
  { name: "Salesforce", category: "CRM" },
  { name: "Pipedrive", category: "CRM" },
  { name: "Zoho CRM", category: "CRM" },
  { name: "Slack", category: "Communication" },
  { name: "Twilio", category: "Communication" },
  { name: "WhatsApp Business", category: "Communication" },
  { name: "Google Workspace", category: "Communication" },
  { name: "Mailchimp", category: "Marketing" },
  { name: "Klaviyo", category: "Marketing" },
  { name: "Meta Ads", category: "Marketing" },
  { name: "Google Ads", category: "Marketing" },
  { name: "Google Sheets", category: "Productivity" },
  { name: "Airtable", category: "Productivity" },
  { name: "Notion", category: "Productivity" },
  { name: "Zapier", category: "Productivity" },
  { name: "Make", category: "Productivity" },
  { name: "n8n", category: "Productivity" },
  { name: "Base44", category: "Productivity" },
  { name: "Webflow", category: "Productivity" },
];

const categories = ["Payments", "Scheduling", "CRM", "Communication", "Marketing", "Productivity"];

function initials(name: string) {
  return name.replace(/[^A-Za-z ]/g, "").split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export function IntegrationsFinder() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("");

  const term = query.trim().toLowerCase();
  const results = useMemo(
    () => tools.filter((t) => (category === "" || t.category === category) && (!term || t.name.toLowerCase().includes(term))),
    [term, category],
  );

  const hasSelection = category !== "" || query.trim() !== "";

  return (
    <section id="integrations" className="bg-navy py-24 text-cloud md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-xs font-extrabold uppercase text-electric">YOUR STACK, COVERED</p>
        <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">Already using tools you love? We connect to them.</h2>
        <p className="mt-6 max-w-3xl text-lg text-cloud/65">
          Your calendar, CRM, inbox and invoicing stop living in separate boxes — one enquiry updates all of them, automatically. Search the software you run today to see what plugs into your 7-day build.
        </p>
        <p className="mt-3 max-w-3xl text-sm font-semibold text-cloud/50">
          Don't worry if your platforms aren't shown here — most other platforms can connect. These are simply the most popular ones we work with.
        </p>

        <div className="relative mt-10 max-w-xl">
          <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-cloud/50" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search your tools"
            placeholder="Search your tools — e.g. Stripe, ServiceTitan, HubSpot..."
            className="h-14 rounded-md border-cloud/20 bg-cloud/5 pl-11 text-base text-cloud placeholder:text-cloud/45 focus-visible:border-electric"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter tools by category">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(category === c ? "" : c)}
              aria-pressed={category === c}
              className={`cursor-pointer rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${
                category === c ? "border-electric bg-electric/15 text-electric" : "border-cloud/20 text-cloud/60 hover:border-electric/50 hover:text-cloud"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {!hasSelection ? (
          <div className="mt-14 flex max-w-xl items-start gap-4 rounded-md border border-dashed border-cloud/20 bg-cloud/5 p-6">
            <Pointer className="mt-0.5 size-5 shrink-0 text-electric" aria-hidden="true" />
            <div>
              <p className="font-extrabold text-cloud">Select a category above to see the networks we support.</p>
              <p className="mt-1 text-sm text-cloud/60">Or type a tool name in the search box to check compatibility instantly.</p>
            </div>
          </div>
        ) : results.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {results.map((tool) => (
              <article
                key={tool.name}
                className="animate-reveal group relative rounded-md border border-cloud/12 bg-cloud/5 p-5 text-center transition-colors hover:border-electric/60"
              >
                <span className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <Check className="size-3" aria-hidden="true" />
                </span>
                <span className="mx-auto flex size-11 items-center justify-center rounded-md bg-electric/15 text-sm font-extrabold text-electric">
                  {initials(tool.name)}
                </span>
                <p className="mt-3 text-sm font-bold leading-tight">{tool.name}</p>
                <p className="mt-2 text-[11px] font-semibold leading-snug text-emerald-400">✓ Integrates in your 7-day build</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 max-w-2xl rounded-md border border-electric/30 bg-cloud/5 p-8">
            <h3 className="text-xl font-extrabold">Don't see it?</h3>
            <p className="mt-3 text-cloud/70">
              If it has an API, we can wire it in — so a new enquiry books itself, lands in your CRM and pings your phone without anyone touching a keyboard. (Under the hood: direct APIs, Zapier, Make and n8n.)
            </p>
            <Button asChild className="mt-6"><a href="#consultation">Ask About My Tool →</a></Button>
          </div>
        )}
      </div>
    </section>
  );
}
