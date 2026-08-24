import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

type Choice = { title: string; description?: string };

const needs: Choice[] = [
  { title: "Website & Digital Presence", description: "I need a new website or want to improve my current one." },
  { title: "Automation", description: "I want to reduce manual work or automate processes." },
  { title: "AI", description: "I want to explore practical AI solutions for my business." },
  { title: "Lead Generation", description: "I want to generate, capture or manage more leads." },
  { title: "Integrations", description: "I need my systems and tools to work better together." },
  { title: "Not Sure", description: "I know something needs to improve, but I'm not sure what solution I need." },
];

const challenges: Choice[] = [
  { title: "Too much manual work", description: "Repetitive tasks are taking time away from the business." },
  { title: "Not enough leads", description: "We need a better way to attract and manage opportunities." },
  { title: "Poor digital presence", description: "Our online presence no longer reflects our business." },
  { title: "Disconnected systems", description: "Our tools and information don't work well together." },
  { title: "Slow processes", description: "Important work takes longer than it should." },
  { title: "We want to use AI", description: "We need clarity on where AI can create real value." },
  { title: "Something else", description: "Our challenge doesn't fit neatly into these options." },
];

const timelines: Choice[] = [
  { title: "As soon as possible" }, { title: "Within 1–3 months" },
  { title: "Within 3–6 months" }, { title: "Just exploring" },
];

const OTHER = "Something else";

type DetailBlock = {
  need: string;
  key: string;
  title: string;
  options: string[];
  freeText?: { label: string; placeholder: string };
};

const detailBlocks: DetailBlock[] = [
  {
    need: "Website & Digital Presence",
    key: "website",
    title: "What does your website need to do?",
    options: [
      "Book appointments or reservations",
      "Accept online payments",
      "Let customers log in / view an account",
      "Sell products (e-commerce)",
      "Showcase a portfolio or gallery",
      "Publish blog or content updates",
      "Provide instant quotes or estimates",
      "Just needs a modern redesign, no new functionality",
      OTHER,
    ],
  },
  {
    need: "Automation",
    key: "automation",
    title: "Which manual tasks are you hoping to automate?",
    options: [
      "Following up with leads or customers",
      "Sending appointment reminders",
      "Routing/assigning incoming enquiries",
      "Invoicing or billing",
      "Syncing data between tools you already use",
      "Generating reports",
      OTHER,
    ],
  },
  {
    need: "AI",
    key: "ai",
    title: "Where do you want AI involved?",
    options: [
      "Answering customer questions (chatbot/support)",
      "Qualifying or following up with leads",
      "Creating content (marketing, social, etc.)",
      "Summarizing or analyzing business data",
      "Internal assistant for your team",
      "Not sure yet — want recommendations",
      OTHER,
    ],
  },
  {
    need: "Lead Generation",
    key: "leadGeneration",
    title: "What's the goal for lead generation?",
    options: [
      "Get more enquiries from a landing page or campaign",
      "Let customers book a call or appointment directly",
      "Automatically follow up with new leads",
      "Connect leads into a CRM or spreadsheet",
      "Track which sources generate the best leads",
      OTHER,
    ],
  },
  {
    need: "Integrations",
    key: "integrations",
    title: "Which tools do you need connected?",
    options: ["Google Workspace", "Shopify", "QuickBooks", "HubSpot", "Calendly", "Mailchimp", "Zapier", "Other"],
    freeText: {
      label: "List the tools/software you currently use",
      placeholder: "e.g. QuickBooks, Calendly, Shopify, Mailchimp, Google Sheets",
    },
  },
];

function StepContainer({ children }: { children: ReactNode }) {
  return <div className="animate-step-in" role="group">{children}</div>;
}

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-10" aria-label={`Step ${step} of ${total}`}>
      <div className="mb-3 flex justify-between text-xs font-bold uppercase text-muted-foreground">
        <span>Consultation request</span><span>{step} / {total}</span>
      </div>
      <div className="h-1 bg-border"><div className="h-full bg-primary transition-all duration-500" style={{ width: `${(step / total) * 100}%` }} /></div>
    </div>
  );
}

function AnswerCard({ choice, selected, onClick, multi = false }: { choice: Choice; selected: boolean; onClick: () => void; multi?: boolean }) {
  return (
    <button type="button" aria-pressed={selected} onClick={onClick} className={`w-full rounded-md border p-5 text-left transition-all hover:-translate-y-0.5 hover:border-primary focus-visible:outline-2 ${selected ? "border-primary bg-secondary" : "border-border bg-background"}`}>
      <span className="flex items-start justify-between gap-4">
        <span><strong className="block text-sm text-foreground">{choice.title}</strong>{choice.description && <span className="mt-1 block text-sm text-muted-foreground">{choice.description}</span>}</span>
        <span className={`mt-0.5 flex size-5 shrink-0 items-center justify-center border ${multi ? "rounded-sm" : "rounded-full"} ${selected ? "border-primary bg-primary text-primary-foreground" : "border-border"}`} aria-hidden="true">{selected ? "✓" : ""}</span>
      </span>
    </button>
  );
}

export function ConsultationFlow() {
  const [step, setStep] = useState(1);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [details, setDetails] = useState<Record<string, string[]>>({});
  const [detailNotes, setDetailNotes] = useState<Record<string, string>>({});
  const [integrationTools, setIntegrationTools] = useState("");
  const [challenge, setChallenge] = useState("");
  const [timeline, setTimeline] = useState("");
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);

  const activeBlocks = useMemo(
    () => detailBlocks.filter((block) => selectedNeeds.includes(block.need)),
    [selectedNeeds],
  );
  const hasDetailStep = activeBlocks.length > 0;
  const total = hasDetailStep ? 5 : 4;
  // Logical step ids in order
  const stepIds = hasDetailStep
    ? (["needs", "detail", "challenge", "timeline", "contact"] as const)
    : (["needs", "challenge", "timeline", "contact"] as const);
  const currentId = stepIds[Math.min(step, total) - 1];

  const toggleDetail = (key: string, option: string) =>
    setDetails((current) => {
      const chosen = current[key] ?? [];
      return { ...current, [key]: chosen.includes(option) ? chosen.filter((item) => item !== option) : [...chosen, option] };
    });

  const advance = (valid: boolean) => {
    if (!valid) { setError("Please choose an option to continue."); return; }
    setError(""); setStep((current) => Math.min(total, current + 1));
  };
  const goBack = () => { setError(""); setStep((current) => Math.max(1, current - 1)); };

  const detailStepValid = activeBlocks.every((block) => {
    const chosen = details[block.key] ?? [];
    if (block.key === "integrations") return chosen.length > 0 || integrationTools.trim().length > 0;
    return chosen.length > 0;
  });

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? "").trim();

    const submission = {
      areasOfInterest: selectedNeeds,
      requirements: activeBlocks.map((block) => ({
        area: block.need,
        question: block.title,
        selected: details[block.key] ?? [],
        ...(detailNotes[block.key]?.trim() ? { additionalDetail: (detailNotes[block.key] ?? "").trim() } : {}),
        ...(block.key === "integrations" && integrationTools.trim() ? { toolsListed: integrationTools.trim() } : {}),
      })),
      biggestChallenge: challenge,
      timeline,
      contact: {
        firstName: value("firstName"),
        lastName: value("lastName"),
        company: value("company"),
        email: value("email"),
        phone: value("phone"),
        website: value("website"),
        message: value("message"),
        teamSize: value("teamSize"),
        currentTools: integrationTools.trim() || value("currentTools"),
        designInspiration: value("designInspiration"),
        hearAboutUs: value("hearAboutUs"),
      },
      submittedAt: new Date().toISOString(),
    };

    // Structured payload, ready to forward to email/webhook/database.
    console.info("[ELEVEX consultation request]", submission);
    setComplete(true);
  };

  if (complete) return (
    <div className="mx-auto max-w-3xl animate-step-in py-10 text-center">
      <span className="mb-6 inline-flex size-12 items-center justify-center rounded-full bg-secondary text-xl text-primary">✓</span>
      <h3 className="text-3xl font-extrabold md:text-5xl">Thanks. We've got it.</h3>
      <p className="mx-auto mt-5 max-w-xl text-muted-foreground">We've received your request and will review the information you provided. The next step is a short conversation about your business, your goals and where ELEVEX may be able to help.</p>
      <div className="mx-auto mt-8 min-h-32 max-w-xl rounded-md border border-dashed border-border bg-secondary/40 p-6 text-sm text-muted-foreground">Calendar scheduling will be available here.</div>
      <div className="mt-8 flex flex-col items-center gap-4"><Button size="lg">Book Your 30-Min Video Consultation →</Button><a href="#top" className="text-sm font-semibold text-muted-foreground hover:text-primary">I'll schedule later</a></div>
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl">
      <ProgressBar step={Math.min(step, total)} total={total} />

      {currentId === "needs" && <StepContainer><StepHeading title="What can we help you improve?" copy="Select the areas you're interested in." /><div className="grid gap-3 sm:grid-cols-2">{needs.map((choice) => <AnswerCard key={choice.title} choice={choice} multi selected={selectedNeeds.includes(choice.title)} onClick={() => setSelectedNeeds((current) => current.includes(choice.title) ? current.filter((item) => item !== choice.title) : [...current, choice.title])} />)}</div><StepActions error={error} onNext={() => advance(selectedNeeds.length > 0)} /></StepContainer>}

      {currentId === "detail" && (
        <StepContainer>
          <StepHeading title="Tell us more about what you need" copy="Select everything that applies — this helps us scope your build before the call." />
          <div className="space-y-10">
            {activeBlocks.map((block) => {
              const chosen = details[block.key] ?? [];
              return (
                <fieldset key={block.key}>
                  <legend className="mb-4 text-lg font-extrabold md:text-xl">{block.title}</legend>
                  {block.freeText && (
                    <label className="mb-4 block text-sm font-bold">{block.freeText.label}
                      <input type="text" value={integrationTools} onChange={(event) => setIntegrationTools(event.target.value)} placeholder={block.freeText.placeholder} className="mt-2 h-12 w-full rounded-md border bg-background px-4 font-normal focus:border-primary focus:outline-none" />
                    </label>
                  )}
                  <div className="grid gap-3 sm:grid-cols-2">
                    {block.options.map((option) => <AnswerCard key={option} choice={{ title: option }} multi selected={chosen.includes(option)} onClick={() => toggleDetail(block.key, option)} />)}
                  </div>
                  {(chosen.includes(OTHER) || chosen.includes("Other")) && (
                    <label className="mt-4 block text-sm font-bold">Tell us more
                      <input type="text" value={detailNotes[block.key] ?? ""} onChange={(event) => setDetailNotes((current) => ({ ...current, [block.key]: event.target.value }))} placeholder="Describe what you have in mind." className="mt-2 h-12 w-full rounded-md border bg-background px-4 font-normal focus:border-primary focus:outline-none" />
                    </label>
                  )}
                </fieldset>
              );
            })}
          </div>
          <StepActions error={error} onBack={goBack} onNext={() => advance(detailStepValid)} />
        </StepContainer>
      )}

      {currentId === "challenge" && <StepContainer><StepHeading title="What's your biggest challenge right now?" /><div className="grid gap-3 sm:grid-cols-2">{challenges.map((choice) => <AnswerCard key={choice.title} choice={choice} selected={challenge === choice.title} onClick={() => setChallenge(choice.title)} />)}</div><StepActions error={error} onBack={goBack} onNext={() => advance(Boolean(challenge))} /></StepContainer>}

      {currentId === "timeline" && <StepContainer><StepHeading title="When are you looking to make a change?" /><div className="grid gap-3 sm:grid-cols-2">{timelines.map((choice) => <AnswerCard key={choice.title} choice={choice} selected={timeline === choice.title} onClick={() => setTimeline(choice.title)} />)}</div><StepActions error={error} onBack={goBack} onNext={() => advance(Boolean(timeline))} /></StepContainer>}

      {currentId === "contact" && <StepContainer><StepHeading title="Let's continue the conversation." copy="Leave your details and we'll get back to you to discuss your goals and potential next steps." /><form onSubmit={submit}>
        <div className="grid gap-5 sm:grid-cols-2"><Field label="First Name" name="firstName" /><Field label="Last Name" name="lastName" /><Field label="Business / Company" name="company" /><Field label="Work Email" name="email" type="email" /><Field label="Phone" name="phone" type="tel" /><Field label="Website (optional)" name="website" required={false} /></div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <SelectField label="Team size (optional)" name="teamSize" options={["Just me", "2–10", "11–50", "50+"]} />
          <SelectField label="How did you hear about us? (optional)" name="hearAboutUs" options={["Referral", "Google", "Social Media", "Other"]} />
          {!integrationTools.trim() && <Field label="Current tools you rely on (optional)" name="currentTools" required={false} placeholder="Any software or platforms you'd want us to know about (CRM, booking, payments, etc.)" />}
          <Field label="Anything you'd want it to look or work like? (optional)" name="designInspiration" required={false} placeholder="Any sites, apps, or examples you like the feel of?" />
        </div>
        <label className="mt-5 block text-sm font-bold">Message (optional)<textarea name="message" rows={4} placeholder="Tell us briefly about your business or what you're trying to achieve." className="mt-2 w-full rounded-md border bg-background p-4 font-normal focus:border-primary focus:outline-none" /></label>
        <div className="mt-8 flex flex-wrap items-center gap-4"><Button type="button" variant="ghost" onClick={goBack}>← Back</Button><Button type="submit" size="lg">Request My 30-Min Video Consultation →</Button></div>
        <p className="mt-4 text-xs text-muted-foreground">By submitting this form, you agree to be contacted by ELEVEX regarding your inquiry.</p>
      </form></StepContainer>}
    </div>
  );
}

function StepHeading({ title, copy }: { title: string; copy?: string }) { return <div className="mb-8"><h3 className="text-2xl font-extrabold md:text-4xl">{title}</h3>{copy && <p className="mt-3 text-muted-foreground">{copy}</p>}</div>; }
function StepActions({ onBack, onNext, error }: { onBack?: () => void; onNext: () => void; error: string }) { return <div className="mt-8"><div className="flex items-center gap-3">{onBack && <Button variant="ghost" onClick={onBack}>← Back</Button>}<Button size="lg" onClick={onNext}>Continue →</Button></div>{error && <p role="alert" className="mt-3 text-sm font-semibold text-destructive">{error}</p>}</div>; }
function Field({ label, name, type = "text", required = true, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) { return <label className="block text-sm font-bold">{label}<input name={name} type={type} required={required} placeholder={placeholder} className="mt-2 h-12 w-full rounded-md border bg-background px-4 font-normal focus:border-primary focus:outline-none" /></label>; }
function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) { return <label className="block text-sm font-bold">{label}<select name={name} defaultValue="" className="mt-2 h-12 w-full rounded-md border bg-background px-4 font-normal focus:border-primary focus:outline-none"><option value="">Select an option</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>; }
