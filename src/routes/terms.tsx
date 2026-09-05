import { createFileRoute } from "@tanstack/react-router";
import { AudienceLayout } from "@/components/audience-layout";
import { Price, useLocalizedPrice } from "@/hooks/use-currency";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — ELEVEX" },
      { name: "description", content: "ELEVEX Terms of Service: the agreement that governs your use of our site and platforms." },
      { property: "og:title", content: "Terms of Service — ELEVEX" },
      { property: "og:description", content: "ELEVEX Terms of Service: the agreement that governs your use of our site and platforms." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <AudienceLayout>
      <section className="bg-background px-5 pb-24 pt-32 text-foreground lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-navy dark:text-cloud">Terms of Service</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: September 1, 2026</p>

          <div className="mt-10 space-y-10 leading-relaxed text-foreground/90">
            <p>
              These Terms of Service ("Terms") govern your use of elevex.digital and any platform, website, or system built and delivered by ELEVEX ("ELEVEX," "we," "us," or "our"). By submitting our intake form, participating in a discovery call, or using a platform we build for you, you agree to these Terms.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-cloud">1. Our Service</h2>
              <p className="mt-4">
                ELEVEX designs and builds custom websites, automation systems, and AI tools for local businesses. Our standard delivery process is:
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-6">
                <li>You submit our discovery form describing your business and needs.</li>
                <li>We prepare a customized presentation and a free interactive demo, typically within a few business days.</li>
                <li>We hold a discovery call to walk through the demo, confirm your requirements, and agree on a monthly rate.</li>
                <li>We build and deliver your fully functional live platform, typically within 7 days of approval.</li>
                <li>You test-drive the live platform in your business for a <strong>21-day free trial</strong>, with our support.</li>
              </ol>
              <p className="mt-4">
                No credit card is required to start your free trial, and there is no fixed-term contract at any point in this process.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-cloud">2. Free Trial</h2>
              <p className="mt-4">
                During your 21-day free trial, you may use your platform in your day-to-day operations at no cost. If you decide the platform isn't right for your business, simply let us know before the trial ends — you will not be charged, and no card is required to have reached this point.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-cloud">3. Continuing After Your Trial</h2>
              <p className="mt-4">
                If you choose to continue using your platform after the trial, you will be charged the monthly rate quoted to you during your discovery call (starting from <Price usd={199} suffix="/month" />, depending on the complexity of your build). There is no long-term contract — you may cancel at any time.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-cloud">4. Cancellation and Data Export</h2>
              <p className="mt-4">If you cancel or choose not to continue after your trial:</p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>Your platform will remain live for a <strong>7-day grace period</strong>, during which you may request an export of your data, content, and files.</li>
                <li>After this grace period, your platform will be taken offline.</li>
                <li>You retain ownership of your domain, your customer data, and your content at all times. We do not hold your data, domain, or platform hostage as a condition of cancellation.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-cloud">5. Ownership</h2>
              <p className="mt-4">
                You own your website, your domain name, your customer database, and your business data. ELEVEX retains ownership of its own underlying tools, templates, and internal processes used to deliver your platform, but the finished platform and your data belong to you.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-cloud">6. What's Included in Your Monthly Plan</h2>
              <p className="mt-4">
                Your monthly subscription covers hosting, security monitoring, domain health, routine operational updates (such as text or image changes, minor field edits), and general performance and uptime monitoring.
              </p>
              <p className="mt-4">
                Requests that go beyond routine maintenance — such as new pages, new automation workflows, or new third-party integrations — are treated as new project scope and quoted separately. We'll always let you know before any additional cost is incurred.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-cloud">7. Your Responsibilities</h2>
              <p className="mt-4">
                You agree to provide accurate information about your business when using our discovery form and during your discovery call, and to use any platform we build for you in compliance with applicable laws (including with respect to any customer data you collect through it).
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-cloud">8. Third-Party Tools and Integrations</h2>
              <p className="mt-4">
                Where your platform connects to third-party tools (such as your CRM, calendar, email, or payment processor), your use of those tools remains subject to that provider's own terms. ELEVEX is not responsible for the availability, performance, or policies of third-party services we integrate with on your behalf.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-cloud">9. Limitation of Liability</h2>
              <p className="mt-4">
                Our platforms are built to a high standard, but as with any software, we cannot guarantee uninterrupted or error-free operation at all times. To the fullest extent permitted by law, ELEVEX's liability for any claim arising from our services is limited to the amount you paid us in the three months preceding the claim.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-cloud">10. Changes to These Terms</h2>
              <p className="mt-4">
                We may update these Terms from time to time. If we make material changes, we will update the "Last updated" date above and, where appropriate, notify active clients directly.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-cloud">11. Contact Us</h2>
              <p className="mt-4">Questions about these Terms can be sent to:</p>
              <p className="mt-4">
                <strong>Email:</strong> <a href="mailto:info@elevex.digital" className="text-primary hover:underline">info@elevex.digital</a><br />
                <strong>Website:</strong> elevex.digital
              </p>
            </div>
          </div>
        </div>
      </section>
    </AudienceLayout>
  );
}
