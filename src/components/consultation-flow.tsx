import { useState, type FormEvent, type ReactNode } from "react";
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

function StepContainer({ children }: { children: ReactNode }) {
  return <div className="animate-step-in" role="group">{children}</div>;
}

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-10" aria-label={`Step ${step} of 4`}>
      <div className="mb-3 flex justify-between text-xs font-bold uppercase text-muted-foreground">
        <span>Consultation request</span><span>{step} / 4</span>
      </div>
      <div className="h-1 bg-border"><div className="h-full bg-primary transition-all duration-500" style={{ width: `${step * 25}%` }} /></div>
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
  const [challenge, setChallenge] = useState("");
  const [timeline, setTimeline] = useState("");
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);

  const advance = (valid: boolean) => {
    if (!valid) { setError("Please choose an option to continue."); return; }
    setError(""); setStep((current) => Math.min(4, current + 1));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) { event.currentTarget.reportValidity(); return; }
    setComplete(true);
  };

  if (complete) return (
    <div className="mx-auto max-w-3xl animate-step-in py-10 text-center">
      <span className="mb-6 inline-flex size-12 items-center justify-center rounded-full bg-secondary text-xl text-primary">✓</span>
      <h3 className="text-3xl font-extrabold md:text-5xl">Thanks. We've got it.</h3>
      <p className="mx-auto mt-5 max-w-xl text-muted-foreground">We've received your request and will review the information you provided. The next step is a short conversation about your business, your goals and where ELEVEX may be able to help.</p>
      <div className="mx-auto mt-8 min-h-32 max-w-xl rounded-md border border-dashed border-border bg-secondary/40 p-6 text-sm text-muted-foreground">Calendar scheduling will be available here.</div>
      <div className="mt-8 flex flex-col items-center gap-4"><Button size="lg">Book Your Consultation →</Button><a href="#top" className="text-sm font-semibold text-muted-foreground hover:text-primary">I'll schedule later</a></div>
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl">
      <ProgressBar step={step} />
      {step === 1 && <StepContainer><StepHeading title="What can we help you improve?" copy="Select the areas you're interested in." /><div className="grid gap-3 sm:grid-cols-2">{needs.map((choice) => <AnswerCard key={choice.title} choice={choice} multi selected={selectedNeeds.includes(choice.title)} onClick={() => setSelectedNeeds((current) => current.includes(choice.title) ? current.filter((item) => item !== choice.title) : [...current, choice.title])} />)}</div><StepActions error={error} onNext={() => advance(selectedNeeds.length > 0)} /></StepContainer>}
      {step === 2 && <StepContainer><StepHeading title="What's your biggest challenge right now?" /><div className="grid gap-3 sm:grid-cols-2">{challenges.map((choice) => <AnswerCard key={choice.title} choice={choice} selected={challenge === choice.title} onClick={() => setChallenge(choice.title)} />)}</div><StepActions error={error} onBack={() => setStep(1)} onNext={() => advance(Boolean(challenge))} /></StepContainer>}
      {step === 3 && <StepContainer><StepHeading title="When are you looking to make a change?" /><div className="grid gap-3 sm:grid-cols-2">{timelines.map((choice) => <AnswerCard key={choice.title} choice={choice} selected={timeline === choice.title} onClick={() => setTimeline(choice.title)} />)}</div><StepActions error={error} onBack={() => setStep(2)} onNext={() => advance(Boolean(timeline))} /></StepContainer>}
      {step === 4 && <StepContainer><StepHeading title="Let's continue the conversation." copy="Leave your details and we'll get back to you to discuss your goals and potential next steps." /><form onSubmit={submit}><div className="grid gap-5 sm:grid-cols-2"><Field label="First Name" name="firstName" /><Field label="Last Name" name="lastName" /><Field label="Business / Company" name="company" /><Field label="Work Email" name="email" type="email" /><Field label="Phone" name="phone" type="tel" /><Field label="Website (optional)" name="website" required={false} /></div><label className="mt-5 block text-sm font-bold">Message (optional)<textarea name="message" rows={4} placeholder="Tell us briefly about your business or what you're trying to achieve." className="mt-2 w-full rounded-md border bg-background p-4 font-normal focus:border-primary focus:outline-none" /></label><div className="mt-8 flex flex-wrap items-center gap-4"><Button type="button" variant="ghost" onClick={() => setStep(3)}>← Back</Button><Button type="submit" size="lg">Request a Consultation →</Button></div><p className="mt-4 text-xs text-muted-foreground">By submitting this form, you agree to be contacted by ELEVEX regarding your inquiry.</p></form></StepContainer>}
    </div>
  );
}

function StepHeading({ title, copy }: { title: string; copy?: string }) { return <div className="mb-8"><h3 className="text-2xl font-extrabold md:text-4xl">{title}</h3>{copy && <p className="mt-3 text-muted-foreground">{copy}</p>}</div>; }
function StepActions({ onBack, onNext, error }: { onBack?: () => void; onNext: () => void; error: string }) { return <div className="mt-8"><div className="flex items-center gap-3">{onBack && <Button variant="ghost" onClick={onBack}>← Back</Button>}<Button size="lg" onClick={onNext}>Continue →</Button></div>{error && <p role="alert" className="mt-3 text-sm font-semibold text-destructive">{error}</p>}</div>; }
function Field({ label, name, type = "text", required = true }: { label: string; name: string; type?: string; required?: boolean }) { return <label className="block text-sm font-bold">{label}<input name={name} type={type} required={required} className="mt-2 h-12 w-full rounded-md border bg-background px-4 font-normal focus:border-primary focus:outline-none" /></label>; }