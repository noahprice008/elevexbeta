import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Globe, Workflow, Bot, TrendingUp, HelpCircle, Check, Sparkles, FileImage, type LucideIcon } from "lucide-react";
import {
  formSubmissionTestWebhook,
  formSubmissionProductionWebhook,
  sendToBothEndpoints,
} from "@/lib/webhooks";

/* ---------------------------------- data --------------------------------- */

type Pillar = { id: string; title: string; description: string; icon: LucideIcon };

const pillars: Pillar[] = [
  { id: "digital", title: "Stop losing enquiries to a dated website", icon: Globe, description: "People find you, judge you in seconds, then leave without contacting you. I want a site that turns visitors into booked work." },
  { id: "automation", title: "Stop re-typing the same admin every day", icon: Workflow, description: "Quotes, invoices, CRM entries and follow-ups are done by hand. I want the tools I already use to talk to each other." },
  { id: "ai", title: "Stop leaving customers waiting for a reply", icon: Bot, description: "Enquiries land at 9pm and sit until morning. I want questions answered and leads qualified while my team sleeps." },
  { id: "growth", title: "Stop chasing leads that go cold", icon: TrendingUp, description: "Enquiries slip through the cracks and no-shows eat the diary. I want booking and follow-up to happen on their own." },
  { id: "unsure", title: "Not Sure", icon: HelpCircle, description: "I know we have operational bottlenecks holding us back, but I'm not sure which technology fits." },
];

type FeatureGroup = { pillar: string; title: string; features: { title: string; description: string }[] };

const featureGroups: FeatureGroup[] = [
  { pillar: "digital", title: "Turning visitors into booked work", features: [
    { title: "Professional Website / Landing Page", description: "A clean, mobile-responsive home base for your business." },
    { title: "Dynamic Service Catalog", description: "A structured showcase of your services or past projects." },
    { title: "Secure Client Intake Forms", description: "Tailored forms that capture inquiry details from day one." },
  ]},
  { pillar: "automation", title: "Taking the admin off your desk", features: [
    { title: "Instant Lead Notifications", description: "Receive alerts via email, Slack, Teams, or SMS." },
    { title: "CRM Auto-Syncing", description: "Push new leads automatically into your CRM." },
    { title: "Automated Document Generation", description: "Instant creation of quotes, agreements, or onboarding paperwork." },
  ]},
  { pillar: "ai", title: "Answering customers while you sleep", features: [
    { title: "24/7 AI Customer Support Chatbot", description: "Answer customer questions automatically." },
    { title: "AI Administrative Assistant", description: "Generate follow-ups, reports, summaries, and internal admin tasks." },
  ]},
  { pillar: "growth", title: "Filling the diary without chasing", features: [
    { title: "Online Booking & Calendar Systems", description: "Allow your customers to book appointments automatically." },
    { title: "Intake & Qualification Screening Flow", description: "Filter unqualified leads before they consume staff time." },
    { title: "Multi-Day Lead Nurturing Campaign", description: "Automated follow-up sequences that keep prospects engaged." },
  ]},
];

const integrationGroups: { title: string; items: string[] }[] = [
  { title: "Productivity & Calendars", items: ["Google Workspace", "Microsoft 365", "Calendly"] },
  { title: "CRM Platforms", items: ["HubSpot", "Zoho", "Salesforce", "ActiveCampaign"] },
  { title: "Communication", items: ["Slack", "Microsoft Teams", "WhatsApp", "Discord"] },
  { title: "Cloud Storage", items: ["Google Drive", "Dropbox", "OneDrive"] },
];

const aesthetics: { title: string; description: string; swatches: string[]; font: string; radius: string }[] = [
  { title: "Modern & Professional", description: "Clean, trustworthy, high-contrast palette.", swatches: ["#0B1220", "#38BDF8", "#F8FAFC"], font: "font-sans tracking-tight", radius: "rounded-md" },
  { title: "Warm & Approachable", description: "Soft tones, rounded shapes, human-centered.", swatches: ["#F5E6D8", "#E8A87C", "#8C5E4A"], font: "font-sans", radius: "rounded-2xl" },
  { title: "Minimalist & Premium", description: "Elegant type, spacious monochrome layouts.", swatches: ["#111111", "#8A8A8A", "#EFEFEF"], font: "font-serif tracking-wide", radius: "rounded-none" },
  { title: "Bold & High-Contrast", description: "Vibrant, sharp, technology-forward energy.", swatches: ["#0F0F23", "#7C3AED", "#22D3EE"], font: "font-sans font-black uppercase", radius: "rounded-lg" },
];

const brandHelpOptions = [
  { id: "logo", label: "I have artwork or a logo to upload", icon: FileImage },
  { id: "suggest", label: "I don't know — can you suggest?", icon: Sparkles },
];

const industries = [
  "Tradesmen & Contractors",
  "Consultants & Professional Services",
  "Security & Facilities Firms",
  "Wellness Studios & Clinics",
  "Growing Local Businesses",
];

const bottleneckPlaceholders: Record<string, string> = {
  "Tradesmen & Contractors": "e.g., spending hours on manual client follow-ups and typing up quotes on my phone after a long day in the field...",
  "Consultants & Professional Services": "e.g., manually copying lead info from our landing page into our spreadsheet and sending out individual introductory emails...",
  "Security & Facilities Firms": "e.g., coordinating security staff shifts manually across multiple sites using messy group chats and sheets...",
  "Wellness Studios & Clinics": "e.g., spending half our day answering basic booking questions on the phone and manually texting appointment reminders...",
  "Growing Local Businesses": "e.g., manually double-entering client details into separate invoices and our legacy CRM software...",
};


const stageTitles = ["Core Growth Pillars", "Phase 1 Essentials", "Integrations", "Brand Direction", "Business Profile"];

type FormData = {
  growthPillars: string[];
  mustHaveFeatures: string[];
  integrations: string[];
  brandHelp: string[];
  logoNames: string[];
  logoBase64: string[];
  brandAesthetic: string[];
  fullName: string;
  jobTitle: string;
  businessName: string;
  email: string;
  website: string;
  industry: string;
  operationalBottleneck: string;
};

const initialData: FormData = {
  growthPillars: [], mustHaveFeatures: [], integrations: [], brandHelp: [], logoNames: [], logoBase64: [], brandAesthetic: [],
  fullName: "", jobTitle: "", businessName: "", email: "", website: "", industry: "", operationalBottleneck: "",
};

const toggle = (list: string[], value: string) =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

const emailValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const fileToBase64 = (file: File) =>
  new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });

/* -------------------------------- primitives ------------------------------- */

function ProgressHeader({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-10">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Step {step} of {total}</p>
          <p className="mt-1 text-sm font-bold text-foreground">Business Growth Assessment</p>
        </div>
        <p className="text-xs font-semibold text-muted-foreground">{stageTitles[step - 1]}</p>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-border" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={total} aria-label="Assessment progress">
        <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${(step / total) * 100}%` }} />
      </div>
    </div>
  );
}

const confettiPieces = [
  { left: "18%", delay: "0ms", color: "bg-electric", drift: "-14px" },
  { left: "30%", delay: "60ms", color: "bg-white", drift: "10px" },
  { left: "42%", delay: "20ms", color: "bg-electric", drift: "-8px" },
  { left: "54%", delay: "90ms", color: "bg-white", drift: "16px" },
  { left: "66%", delay: "40ms", color: "bg-electric", drift: "-12px" },
  { left: "78%", delay: "110ms", color: "bg-white", drift: "8px" },
  { left: "88%", delay: "70ms", color: "bg-electric", drift: "-16px" },
];

function StickyProgressBar({ step, total, visible, celebrating }: { step: number; total: number; visible: boolean; celebrating: boolean }) {
  const percentage = celebrating ? 100 : Math.round((step / total) * 100);
  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 top-20 z-40 transition-all duration-300 ease-out ${visible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0 pointer-events-none"}`}
    >
      <div className="border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-1 lg:px-8">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-foreground/90">
            {celebrating ? "Complete" : `Step ${step} of ${total}`}
          </span>
          <span className="text-[11px] font-bold text-muted-foreground">{celebrating ? "Request submitted" : stageTitles[step - 1]}</span>
        </div>
        <div className="relative h-1.5 w-full bg-navy/10 dark:bg-cloud/10" role="progressbar" aria-valuenow={celebrating ? total : step} aria-valuemin={1} aria-valuemax={total} aria-label="Form progress">
          <div
            className={`relative h-full rounded-r-full bg-electric transition-[width] ease-out ${celebrating ? "duration-[600ms]" : "duration-[400ms]"}`}
            style={{ width: `${percentage}%` }}
          >
            <span className="absolute -right-1.5 top-1/2 -translate-y-1/2" aria-hidden="true">
              <span key={celebrating ? "done" : step} className="block h-3 w-3 rounded-full bg-electric shadow-[0_0_14px_rgba(56,189,248,0.85)] animate-progress-ping" />
            </span>
          </div>
          {celebrating && (
            <span className="pointer-events-none absolute inset-x-0 -top-2 flex justify-center" aria-hidden="true">
              {confettiPieces.map((piece, index) => (
                <span
                  key={index}
                  className={`animate-confetti-burst absolute h-1.5 w-1.5 rounded-full ${piece.color} motion-reduce:hidden`}
                  style={{ left: piece.left, animationDelay: piece.delay, ["--drift" as string]: piece.drift }}
                />
              ))}
              <span className="animate-check-bounce -mt-4 flex size-7 items-center justify-center rounded-full bg-electric text-navy shadow-[0_0_18px_rgba(56,189,248,0.7)] motion-reduce:animate-check-fade">
                <Check className="size-4" strokeWidth={3} aria-hidden="true" />
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function SelectCard({ title, description, selected, onClick, icon: Icon }: { title: string; description?: string; selected: boolean; onClick: () => void; icon?: LucideIcon }) {
  return (
    <button type="button" aria-pressed={selected} onClick={onClick}
      className={`group h-full w-full rounded-xl border p-5 text-left shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${selected ? "border-primary bg-secondary shadow-md" : "border-border bg-background/70"}`}>
      <span className="flex items-start justify-between gap-4">
        <span className="flex items-start gap-3">
          {Icon && <span className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg ${selected ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"}`}><Icon className="size-4" aria-hidden="true" /></span>}
          <span>
            <strong className="block text-sm font-extrabold text-foreground">{title}</strong>
            {description && <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{description}</span>}
          </span>
        </span>
        <span className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border ${selected ? "border-primary bg-primary text-primary-foreground" : "border-border"}`} aria-hidden="true">
          {selected && <Check className="size-3.5" />}
        </span>
      </span>
    </button>
  );
}

function CheckboxPill({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" aria-pressed={selected} onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${selected ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground"}`}>
      <span className={`flex size-4 items-center justify-center rounded-sm border ${selected ? "border-primary-foreground/60" : "border-border"}`} aria-hidden="true">{selected && <Check className="size-3" />}</span>
      {label}
    </button>
  );
}

function AestheticCard({ style, selected, onClick }: { style: (typeof aesthetics)[number]; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" aria-pressed={selected} onClick={onClick}
      className={`group relative overflow-hidden rounded-xl border p-4 text-left backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-md hover:shadow-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${selected ? "border-primary bg-secondary shadow-md shadow-primary/15" : "border-border bg-background/70"}`}>
      <span aria-hidden="true" className={`flex h-14 w-full items-end gap-1 overflow-hidden rounded-t-md p-2`} style={{ background: `linear-gradient(135deg, ${style.swatches[0]} 0%, ${style.swatches[1]} 100%)` }}>
        <span className={`block h-2 w-12 rounded-sm`} style={{ background: style.swatches[2] }} />
        <span className={`block h-2 w-6 rounded-sm`} style={{ background: style.swatches[2], opacity: 0.6 }} />
      </span>
      <span className="mt-3 flex items-start justify-between gap-2">
        <span>
          <strong className={`block text-xs font-extrabold text-foreground ${style.font}`}>{style.title}</strong>
          <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{style.description}</span>
        </span>
        <span className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded border ${selected ? "border-primary bg-primary text-primary-foreground" : "border-border"}`} aria-hidden="true">
          {selected && <Check className="size-2.5" />}
        </span>
      </span>
    </button>
  );
}

function StepHeading({ title, copy }: { title: string; copy?: string }) {
  return <div className="mb-8"><h3 className="text-2xl font-extrabold md:text-4xl">{title}</h3>{copy && <p className="mt-3 max-w-2xl text-muted-foreground">{copy}</p>}</div>;
}

function StepShell({ children }: { children: ReactNode }) { return <div className="animate-step-in">{children}</div>; }

function Field({ label, value, onChange, type = "text", placeholder, error, required = true, maxLength }: { label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string; error?: string | undefined; required?: boolean; maxLength?: number }) {
  return (
    <label className="block text-sm font-bold">
      {label}{!required && <span className="font-normal text-muted-foreground"> (optional)</span>}
      <input type={type} value={value} maxLength={maxLength} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)}
        className={`mt-2 h-12 w-full rounded-lg border bg-background px-4 font-normal transition-colors focus:outline-none ${error ? "border-destructive" : "border-border focus:border-primary"}`} />
      {error && <span role="alert" className="mt-1.5 block text-xs font-semibold text-destructive">{error}</span>}
    </label>
  );
}

/* --------------------------------- flow ---------------------------------- */

const TOTAL = 5;

export function ConsultationFlow() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [complete, setComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    const node = containerRef.current;
    if (!node) return;
    const reduce = document.documentElement.classList.contains("a11y-reduce-motion");
    const top = node.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }, [step, complete]);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => setFormData((current) => ({ ...current, [key]: value }));

  const activeGroups = useMemo(
    () => featureGroups.filter((group) => formData.growthPillars.includes(group.pillar)),
    [formData.growthPillars],
  );

  const goNext = () => {
    if (step === 1 && formData.growthPillars.length === 0) { setError("Select at least one area to continue."); return; }
    if (step === 2 && activeGroups.length > 0 && formData.mustHaveFeatures.length === 0) { setError("Select at least one must-have feature to continue."); return; }
    setError("");
    setStep((current) => Math.min(TOTAL, current + 1));
  };
  const goBack = () => { setError(""); setStep((current) => Math.max(1, current - 1)); };

  const validateProfile = () => {
    const errors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.fullName.trim()) errors.fullName = "Please enter your full name.";
    if (!formData.jobTitle.trim()) errors.jobTitle = "Please enter your job title.";
    if (!formData.businessName.trim()) errors.businessName = "Please enter your business name.";
    if (!emailValid(formData.email)) errors.email = "Please enter a valid business email.";
    if (!formData.industry) errors.industry = "Please select your primary audience or industry.";
    const bottleneck = formData.operationalBottleneck.trim();
    if (bottleneck.length < 50) errors.operationalBottleneck = `Please add a little more detail (${bottleneck.length}/50 characters minimum).`;
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submit = async () => {
    if (!validateProfile()) { setError("Please fix the highlighted fields."); return; }
    setError(""); setSubmitting(true);
    const payload = { ...formData, submittedAt: new Date().toISOString() };
    try {
      await sendToBothEndpoints(
        formSubmissionTestWebhook,
        formSubmissionProductionWebhook,
        payload,
      );
    } catch (submissionError) {
      // Webhook failures are non-blocking: the user still sees the success/reward flow.
      console.error("[ELEVEX discovery submission failed]", submissionError);
    } finally {
      setSubmitting(false);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        || document.documentElement.classList.contains("a11y-reduce-motion");
      setCelebrating(true);
      // Let the reward animation own a beat before the success panel appears.
      window.setTimeout(() => {
        setCelebrating(false);
        setComplete(true);
      }, reduceMotion ? 600 : 1500);
    }
  };

  const sentinelRef = useRef<HTMLDivElement>(null);
  const [barVisible, setBarVisible] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const HEADER_HEIGHT = 80;
    const update = () => {
      const rect = sentinel.getBoundingClientRect();
      setBarVisible(rect.bottom > HEADER_HEIGHT + 8 && rect.top < window.innerHeight);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div ref={sentinelRef} className="relative">
      <StickyProgressBar step={step} total={TOTAL} celebrating={celebrating} visible={barVisible && (!complete || celebrating)} />
      {complete ? (
        <div ref={containerRef} className="mx-auto max-w-3xl animate-step-in rounded-2xl border bg-background/70 p-8 text-center shadow-sm backdrop-blur md:p-12">
          <span className="mb-6 inline-flex size-14 items-center justify-center rounded-full bg-secondary text-primary"><Check className="size-6" aria-hidden="true" /></span>
          <h3 className="text-3xl font-extrabold md:text-5xl">Thanks — We've Got Everything We Need</h3>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">Your requirements have been submitted successfully. Our team will review your goals, priorities, and technology stack before creating a tailored ELEVEX demo experience designed around your business.</p>
          <ul className="mx-auto mt-8 grid max-w-md gap-3 text-left text-sm">
            {["A custom demo concept", "Recommended automation opportunities", "Suggested technology stack", "A follow-up link to discuss next steps"].map((item) => (
              <li key={item} className="flex items-start gap-3"><Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /><span className="text-muted-foreground">{item}</span></li>
            ))}
          </ul>
          <p className="mt-8 text-sm font-bold">Expected review time: 24–48 business hours.</p>
          <div className="mt-8"><Button asChild size="lg"><a href="/">Return to Homepage</a></Button></div>
        </div>
      ) : (
        <div ref={containerRef} className="mx-auto w-full max-w-5xl scroll-mt-28 rounded-2xl border bg-background/60 p-6 shadow-sm backdrop-blur md:p-10">
          <ProgressHeader step={step} total={TOTAL} />

      {step === 1 && (
        <StepShell>
          <StepHeading title="Where do you want to grow?" copy="Select every area you'd like to improve. Quick checkbox selection — no technical background required." />
          <div className="grid gap-4 md:grid-cols-2">
            {pillars.map((pillar) => (
              <SelectCard key={pillar.id} title={pillar.title} description={pillar.description} icon={pillar.icon}
                selected={formData.growthPillars.includes(pillar.id)}
                onClick={() => update("growthPillars", toggle(formData.growthPillars, pillar.id))} />
            ))}
          </div>
        </StepShell>
      )}

      {step === 2 && (
        <StepShell>
          <StepHeading title="What belongs in your Phase 1 Essentials?" copy="Select the systems your business needs working from day one. Your answers shape a sharper, more relevant demo." />
          {activeGroups.length === 0 ? (
            <p className="rounded-xl border border-dashed p-6 text-muted-foreground">No problem — we'll recommend a starting point based on the bottleneck you describe in the next steps.</p>
          ) : (
            <div className="space-y-10">
              {activeGroups.map((group) => (
                <fieldset key={group.pillar}>
                  <legend className="mb-4 text-lg font-extrabold md:text-xl">{group.title} — Must-Haves</legend>
                  <div className="grid gap-4 md:grid-cols-2">
                    {group.features.map((feature) => (
                      <SelectCard key={feature.title} title={feature.title} description={feature.description}
                        selected={formData.mustHaveFeatures.includes(feature.title)}
                        onClick={() => update("mustHaveFeatures", toggle(formData.mustHaveFeatures, feature.title))} />
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>
          )}
        </StepShell>
      )}

      {step === 3 && (
        <StepShell>
          <StepHeading title="What tools does your business already use?" copy="We'll review your requirements before recommending solutions." />
          <fieldset>
            <legend className="sr-only">Integrations</legend>
            <p className="mb-5 text-sm text-muted-foreground">Select any that apply — leave blank if none.</p>
            <div className="space-y-6">
              {integrationGroups.map((group) => (
                <div key={group.title}>
                  <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-muted-foreground">{group.title}</p>
                  <div className="flex flex-wrap gap-2.5">
                    {group.items.map((item) => (
                      <CheckboxPill key={item} label={item} selected={formData.integrations.includes(item)}
                        onClick={() => update("integrations", toggle(formData.integrations, item))} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </fieldset>
        </StepShell>
      )}

      {step === 4 && (
        <StepShell>
          <StepHeading title="How should your platform look and feel?" copy="Share what you have, or let us propose a direction." />

          <fieldset>
            <legend className="mb-3 text-lg font-extrabold md:text-xl">Brand assets</legend>
            <div className="flex flex-wrap gap-2.5">
              {brandHelpOptions.map((option) => {
                const selected = formData.brandHelp.includes(option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => update("brandHelp", toggle(formData.brandHelp, option.id))}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${selected ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground"}`}
                  >
                    <option.icon className="size-4" aria-hidden="true" />
                    {option.label}
                  </button>
                );
              })}
            </div>

            {formData.brandHelp.includes("logo") && (
              <label className="mt-5 block rounded-xl border border-dashed border-border bg-background/70 p-5 transition-colors hover:border-primary/50">
                <span className="flex items-center gap-2 text-sm font-bold">
                  <FileImage className="size-4 text-primary" aria-hidden="true" />
                  Upload your current artwork (or similar)
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">SVG, PNG, JPG, or PDF. Up to 5 files, max 5 MB each.</span>
                <input
                  type="file"
                  multiple
                  accept=".svg,.png,.jpg,.jpeg,.pdf"
                  className="mt-3 block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-2 file:font-semibold file:text-foreground hover:file:bg-secondary/80"
                  onChange={async (event) => {
                    const files = Array.from(event.target.files ?? []).slice(0, 5);
                    update("logoNames", files.map((file) => file.name));
                    update("logoBase64", await Promise.all(files.map((file) => fileToBase64(file))));
                  }}
                />
                {formData.logoNames.length > 0 && (
                  <span className="mt-2 block text-xs font-semibold text-primary">Selected ({formData.logoNames.length}/5): {formData.logoNames.join(", ")}</span>
                )}
              </label>
            )}

          </fieldset>

          <fieldset className="mt-10">
            <legend className="mb-3 text-lg font-extrabold md:text-xl">Which style best represents your business?</legend>
            <p className="mb-4 text-sm text-muted-foreground">Pick one or more directions — optional if you'd like us to suggest.</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {aesthetics.map((style) => (
                <AestheticCard key={style.title} style={style}
                  selected={formData.brandAesthetic.includes(style.title)}
                  onClick={() => update("brandAesthetic", toggle(formData.brandAesthetic, style.title))} />
              ))}
            </div>
          </fieldset>
        </StepShell>
      )}

      {step === 5 && (
        <StepShell>
          <StepHeading title="A little about your business" copy="No sales pressure. No obligation." />
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Full Name" value={formData.fullName} onChange={(value) => update("fullName", value)} error={fieldErrors.fullName} />
            <Field label="Job Title" value={formData.jobTitle} onChange={(value) => update("jobTitle", value)} error={fieldErrors.jobTitle} />
            <Field label="Business Name" value={formData.businessName} onChange={(value) => update("businessName", value)} error={fieldErrors.businessName} />
            <Field label="Business Email" type="email" value={formData.email} onChange={(value) => update("email", value)} error={fieldErrors.email} />
            <Field label="Current Website" required={false} placeholder="https://yourwebsite.com" value={formData.website} onChange={(value) => update("website", value)} />
            <label className="block text-sm font-bold">Primary Target Audience / Industry
              <select value={formData.industry} onChange={(event) => update("industry", event.target.value)} aria-invalid={Boolean(fieldErrors.industry)}
                className={`mt-2 h-12 w-full rounded-lg border bg-background px-4 font-normal focus:outline-none ${fieldErrors.industry ? "border-destructive" : "border-border focus:border-primary"}`}>
                <option value="">Select an option</option>
                {industries.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
              {fieldErrors.industry && <span role="alert" className="mt-1.5 block text-xs font-semibold text-destructive">{fieldErrors.industry}</span>}
            </label>
          </div>
          <label className="mt-6 block text-sm font-bold">Core Operational Bottleneck
            <span className="mt-1 block text-sm font-normal text-muted-foreground">What is the single most time-consuming manual task in your business today?</span>
            <textarea rows={5} maxLength={500} value={formData.operationalBottleneck} placeholder={bottleneckPlaceholders[formData.industry] ?? "e.g., we lose hours every week re-typing the same customer details across email, spreadsheets and invoices..."} onChange={(event) => update("operationalBottleneck", event.target.value)} aria-invalid={Boolean(fieldErrors.operationalBottleneck)}
              className={`mt-2 w-full rounded-lg border bg-background p-4 font-normal focus:outline-none ${fieldErrors.operationalBottleneck ? "border-destructive" : "border-border focus:border-primary"}`} />
            <span className="mt-1.5 flex justify-between text-xs text-muted-foreground">
              <span className={fieldErrors.operationalBottleneck ? "font-semibold text-destructive" : ""}>{fieldErrors.operationalBottleneck ?? "Minimum 50 characters."}</span>
              <span>{formData.operationalBottleneck.length}/500</span>
            </span>
          </label>
          <p className="mt-6 text-xs text-muted-foreground">By submitting this form, you agree to be contacted by ELEVEX regarding your inquiry.</p>
        </StepShell>
      )}

      <div className="mt-10 border-t pt-6">
        <div className="flex flex-wrap items-center gap-3">
          {step > 1 && <Button type="button" variant="ghost" onClick={goBack}>← Back</Button>}
          {step < TOTAL
            ? <Button type="button" size="lg" onClick={goNext}>Continue →</Button>
            : <Button type="button" size="lg" onClick={submit} disabled={submitting}>{submitting ? "Submitting…" : "Submit Requirements & Request Demo"}</Button>}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Takes less than two minutes to complete • No credit card required • No obligation</p>
      </div>
      {error && <p role="alert" className="mt-3 text-sm font-semibold text-destructive">{error}</p>}
    </div>
  )}
</div>
  );
}
