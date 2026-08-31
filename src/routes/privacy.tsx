import { createFileRoute } from "@tanstack/react-router";
import { AudienceLayout } from "@/components/audience-layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — ELEVEX" },
      { name: "description", content: "ELEVEX Privacy Policy: how we collect, use, store, and protect your information." },
      { property: "og:title", content: "Privacy Policy — ELEVEX" },
      { property: "og:description", content: "ELEVEX Privacy Policy: how we collect, use, store, and protect your information." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <AudienceLayout>
      <section className="bg-background px-5 pb-24 pt-32 text-foreground lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-navy dark:text-cloud">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: September 1, 2026</p>

          <div className="mt-10 space-y-10 leading-relaxed text-foreground/90">
            <p>
              ELEVEX ("ELEVEX," "we," "us," or "our") provides custom websites, automation systems, and AI tools for local businesses. This Privacy Policy explains what information we collect when you use elevex.digital, why we collect it, and how we handle it.
            </p>
            <p>
              By submitting our intake form, requesting a demo, or otherwise using our site, you agree to the practices described here.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-cloud">1. Information We Collect</h2>
              <p className="mt-4">
                When you complete our discovery form or contact us, we collect the information you choose to provide, which may include:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li><strong>Contact details:</strong> first and last name, company name, job title, work email address, and phone number</li>
                <li><strong>Business information:</strong> your website (if any), industry, team size, how you heard about us, and the tools/software you currently use</li>
                <li><strong>Project details:</strong> the areas you're interested in (website, automation, AI, lead generation, integrations), your biggest operational challenge, your timeline, and any free-text message you provide</li>
                <li><strong>Files you upload:</strong> if you choose to share a logo or brand materials as part of your submission</li>
                <li><strong>Style or reference examples:</strong> any links or notes you provide about design preferences</li>
              </ul>
              <p className="mt-4">
                We do not require payment information to start a free trial, and we do not collect financial or payment details unless and until you choose to continue as a paying client, at which point payment will be handled through our billing provider under its own terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-cloud">2. How We Use Your Information</h2>
              <p className="mt-4">We use the information you provide to:</p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>Prepare a customized presentation and demo of a platform built for your business</li>
                <li>Schedule and conduct your discovery call</li>
                <li>Build, deliver, and support your platform during your 21-day trial and afterward, if you continue</li>
                <li>Communicate with you about your project, your trial, and your account</li>
                <li>Improve our services and internal processes</li>
              </ul>
              <p className="mt-4">
                We do not sell your personal information, and we do not use it for advertising or share it with third parties for their own marketing purposes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-cloud">3. How Your Information Is Processed and Stored</h2>
              <p className="mt-4">
                To deliver our service, we use a small number of trusted third-party tools to process and store the information you provide, including:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li><strong>Database and record-keeping tools</strong> (such as Airtable) to store your submission and project details</li>
                <li><strong>AI language model providers</strong> (such as Google and Anthropic) to help analyze your submission and generate an initial demo build based on the information you provide</li>
                <li><strong>Email delivery tools</strong> (such as Gmail/Google Workspace) to send you communications related to your project</li>
              </ul>
              <p className="mt-4">
                These providers process data on our behalf and are bound by their own privacy and security commitments. We do not permit these providers to use your information for purposes unrelated to delivering our service to you.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-cloud">4. Data Retention and Deletion</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>If you do not continue past your free trial, your platform remains live for a <strong>7-day grace period</strong>, during which you may request an export of your data and content.</li>
                <li>After this grace period, your platform is taken offline, and we delete your project data from our active systems within a reasonable period thereafter, except where we are required to retain limited records for legitimate business or legal purposes.</li>
                <li>If you continue as a paying client, we retain your information for as long as your account is active, and in accordance with your cancellation rights described in our Terms of Service.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-cloud">5. Ownership of Your Data</h2>
              <p className="mt-4">
                You own your website, your domain, and your customer data. If you choose to leave ELEVEX at any time, we will help you export your files and data. There is no lock-in.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-cloud">6. Cookies and Analytics</h2>
              <p className="mt-4">
                Our site may use basic functional cookies necessary for the site to operate correctly, and may use standard web analytics tools to understand general site usage (such as which pages are visited). We do not use these tools to build advertising profiles about you.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-cloud">7. Your Rights</h2>
              <p className="mt-4">
                Depending on your location, you may have the right to access, correct, export, or request deletion of your personal information. To exercise any of these rights, contact us at <strong>info@elevex.digital</strong>.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-cloud">8. Children's Privacy</h2>
              <p className="mt-4">
                Our services are intended for business use and are not directed at, or knowingly used by, individuals under the age of 18.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-cloud">9. Changes to This Policy</h2>
              <p className="mt-4">
                We may update this Privacy Policy from time to time. If we make material changes, we will update the "Last updated" date above.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-cloud">10. Contact Us</h2>
              <p className="mt-4">
                If you have questions about this Privacy Policy or how your information is handled, contact us at:
              </p>
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
