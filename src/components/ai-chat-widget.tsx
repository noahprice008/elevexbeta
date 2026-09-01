import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { useChat } from "@/components/chat-provider";
import {
  chatbotContactTestWebhook,
  chatbotContactProductionWebhook,
  sendToBothEndpoints,
} from "@/lib/webhooks";

type Msg = { role: "bot" | "user"; text: string; link?: { label: string; href: string } | undefined };

type Entry = { keys: string[]; answer: string; link?: { label: string; href: string } };

const KB: Entry[] = [
  {
    keys: ["what is elevex", "about", "who are you", "company", "elevex do", "tagline"],
    answer:
      "ELEVEX — Enterprise Technology. Built for the Local Business. Test drive your custom digital platform in 7 days and pay nothing until it works.",
    link: { label: "See what we do →", href: "/#solutions" },
  },
  {
    keys: ["service", "what do you offer", "solutions", "website", "automation", "ai", "lead generation", "integration"],
    answer:
      "We cover five areas: Website & Digital Presence, Automation, AI solutions, Lead Generation and Integrations — all built around your business.",
    link: { label: "Explore solutions →", href: "/#solutions" },
  },
  {
    keys: ["who do you work with", "industry", "industries", "tradesmen", "tradesman", "consultant", "clients"],
    answer:
      "Tradesmen — automated quoting systems that win jobs while you're on the tools. Consultants — AI-driven booking and follow-up systems that secure qualified leads 24/7.",
    link: { label: "Who we work with →", href: "/#why" },
  },
  {
    keys: ["how it works", "process", "steps", "deliver", "timeline", "how long", "how fast"],
    answer:
      "1) Submit the intake form. 2) We prepare a presentation. 3) A 30-minute discovery call. 4) Your platform is built and delivered within a week. 5) 21-day free trial, no card required. 6) Continue at the monthly fee quoted at trial start — no contract.",
    link: { label: "See how we deliver →", href: "/#how-we-deliver" },
  },
  {
    keys: ["trial", "21 day", "free trial", "card", "risk"],
    answer:
      "Your trial runs 21 days, completely free, no card required. We assist with setup and edits throughout.",
    link: { label: "Start with a free demo →", href: "/#consultation" },
  },
  {
    keys: ["cancel", "don't continue", "dont continue", "grace", "export", "leave", "offline"],
    answer:
      "If you don't continue, your platform stays live for a 7-day grace period so you can export your data and content, then it goes offline.",
  },
  {
    keys: ["price", "pricing", "cost", "how much", "199", "plan", "monthly", "fee"],
    answer:
      "The Care & Growth Plan is an ongoing partnership at $199/month. There's no contract — you only pay after your 21-day free trial.",
    link: { label: "See pricing →", href: "/#pricing" },
  },
  {
    keys: ["contact", "email", "phone", "call", "reach", "sales", "support"],
    answer:
      "Sales: sales@elevex.digital • Info: info@elevex.digital • Support: support@elevex.digital • Phone: 054-896-2063",
    link: { label: "Request a demo →", href: "/#consultation" },
  },
  {
    keys: ["form", "intake", "demo", "get started", "sign up", "book"],
    answer:
      "Start with the intake form — it takes a couple of minutes and there's no sales pressure. We'll follow up to arrange your 30-minute discovery call.",
    link: { label: "Open the form →", href: "/#consultation" },
  },
];

const FALLBACK =
  "I can only help with questions about ELEVEX — want me to connect you with our sales team instead?";

const GREETING: Msg = {
  role: "bot",
  text: "Hi, I'm the ELEVEX assistant. Ask me about our services, pricing, timelines or the free trial.",
};

const SUGGESTIONS = ["What does ELEVEX do?", "How much does it cost?", "How does the trial work?"];

function findAnswer(input: string): Msg {
  const q = input.toLowerCase();
  let best: { entry: Entry; score: number } | null = null;
  for (const entry of KB) {
    let score = 0;
    for (const key of entry.keys) if (q.includes(key)) score = Math.max(score, key.length);
    if (score && (!best || score > best.score)) best = { entry, score };
  }
  if (!best) return { role: "bot", text: FALLBACK };
  return { role: "bot", text: best.entry.answer, link: best.entry.link };
}

export function AiChatWidget() {
  const { open, setOpen } = useChat();
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"chat" | "lead">("chat");
  const [lead, setLead] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [leadError, setLeadError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, mode]);

  const send = (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }, findAnswer(text)]);
  };

  const submitLead = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!lead.name.trim() || /^\S+@\S+\.\S+$/.test(lead.email)) {
      setLeadError("Please add your name and a valid email.");
      return;
    }
    setLeadError("");
    setSending(true);
    try {
      const response = await fetch("https://n8n.elevex.digital/webhook/chatbot-contact-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          message: lead.message,
          pageContext: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      let confirmation = "Thanks! Our sales team will reach out shortly.";
      try {
        const data = (await response.clone().json()) as { message?: string; reply?: string };
        confirmation = data.message || data.reply || confirmation;
      } catch {
        const text = (await response.text()).trim();
        if (text && text.length < 300) confirmation = text;
      }
      setMode("chat");
      setLead({ name: "", email: "", message: "" });
      setMessages((prev) => [...prev, { role: "bot", text: confirmation }]);
    } catch {
      setLeadError("Something went wrong. Please email sales@elevex.digital.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-4 right-4 z-[60] flex h-[min(560px,75vh)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-xl border border-electric/25 bg-navy shadow-2xl">
          <div className="flex items-center gap-3 border-b border-cloud/10 bg-navy px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-electric/10">
              <MessageSquare className="h-4 w-4 text-electric" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-extrabold text-cloud">
                ELEV<span className="text-electric">EX</span> Assistant
              </p>
              <p className="text-xs font-semibold text-cloud/50">Answers about ELEVEX only</p>
            </div>
            <button type="button" aria-label="Close chat" onClick={() => setOpen(false)} className="rounded-md p-1.5 text-cloud/60 transition-colors hover:bg-cloud/10 hover:text-electric">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((msg, index) => (
              <div key={index} className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${msg.role === "user" ? "bg-electric font-semibold text-navy" : "bg-cloud/8 text-cloud/85 ring-1 ring-cloud/10"}`}>
                  <p>{msg.text}</p>
                  {msg.link && (
                    <a href={msg.link.href} onClick={() => setOpen(false)} className="mt-2 inline-block text-xs font-extrabold text-electric hover:underline">
                      {msg.link.label}
                    </a>
                  )}
                </div>
              </div>
            ))}

            {mode === "chat" && messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((suggestion) => (
                  <button key={suggestion} type="button" onClick={() => send(suggestion)} className="rounded-full border border-cloud/15 px-3 py-1.5 text-xs font-semibold text-cloud/70 transition-colors hover:border-electric hover:text-electric">
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {mode === "lead" && (
              <form onSubmit={submitLead} className="rounded-lg border border-electric/25 bg-cloud/5 p-3.5">
                <p className="text-xs font-extrabold uppercase tracking-wide text-electric">Request a call from sales</p>
                <input value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} placeholder="Your name" className="mt-3 w-full rounded-md border border-cloud/15 bg-navy px-3 py-2 text-sm text-cloud placeholder:text-cloud/40 focus:border-electric focus:outline-none" />
                <input value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} placeholder="Email address" className="mt-2 w-full rounded-md border border-cloud/15 bg-navy px-3 py-2 text-sm text-cloud placeholder:text-cloud/40 focus:border-electric focus:outline-none" />
                <textarea value={lead.message} onChange={(e) => setLead({ ...lead, message: e.target.value })} rows={3} placeholder="What would you like to discuss?" className="mt-2 w-full rounded-md border border-cloud/15 bg-navy px-3 py-2 text-sm text-cloud placeholder:text-cloud/40 focus:border-electric focus:outline-none" />
                {leadError && <p className="mt-2 text-xs font-semibold text-red-400">{leadError}</p>}
                <div className="mt-3 flex gap-2">
                  <button type="submit" disabled={sending} className="rounded-md bg-electric px-3 py-2 text-xs font-extrabold text-navy transition-opacity hover:opacity-90 disabled:opacity-60">
                    {sending ? "Sending…" : "Send request"}
                  </button>
                  <button type="button" onClick={() => setMode("chat")} className="rounded-md px-3 py-2 text-xs font-bold text-cloud/60 hover:text-cloud">
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="border-t border-cloud/10 px-4 py-3">
            {mode === "chat" && (
              <button type="button" onClick={() => setMode("lead")} className="mb-2 text-xs font-extrabold text-electric hover:underline">
                Request a call from sales →
              </button>
            )}
            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex items-center gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about ELEVEX…" aria-label="Message" className="flex-1 rounded-md border border-cloud/15 bg-cloud/5 px-3 py-2 text-sm text-cloud placeholder:text-cloud/40 focus:border-electric focus:outline-none" />
              <button type="submit" aria-label="Send message" className="rounded-md bg-electric p-2 text-navy transition-opacity hover:opacity-90">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
