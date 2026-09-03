import { useCallback, useEffect, useRef, useState } from "react";
import { Accessibility, Minus, Plus, RotateCcw } from "lucide-react";

const STORAGE_KEY = "elevex-a11y";

type Settings = {
  fontScale: number;
  contrast: boolean;
  grayscale: boolean;
  underlineLinks: boolean;
  readableFont: boolean;
  reduceMotion: boolean;
  bigCursor: boolean;
  spacing: boolean;
};

const DEFAULTS: Settings = {
  fontScale: 100,
  contrast: false,
  grayscale: false,
  underlineLinks: false,
  readableFont: false,
  reduceMotion: false,
  bigCursor: false,
  spacing: false,
};

function apply(settings: Settings) {
  const root = document.documentElement;
  root.style.setProperty("--a11y-font-scale", `${settings.fontScale}%`);
  root.classList.toggle("a11y-font-scale", settings.fontScale !== 100);
  root.classList.toggle("a11y-contrast", settings.contrast);
  root.classList.toggle("a11y-grayscale", settings.grayscale);
  root.classList.toggle("a11y-underline", settings.underlineLinks);
  root.classList.toggle("a11y-readable", settings.readableFont);
  root.classList.toggle("a11y-reduce-motion", settings.reduceMotion);
  root.classList.toggle("a11y-cursor", settings.bigCursor);
  root.classList.toggle("a11y-spacing", settings.spacing);
  window.dispatchEvent(new CustomEvent("elevex-a11y-change", { detail: settings }));
}

/** Compact, header-mounted accessibility control. */
export function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = { ...DEFAULTS, ...(JSON.parse(stored) as Partial<Settings>) };
        setSettings(parsed);
        apply(parsed);
      }
    } catch {
      /* storage unavailable */
    }
  }, []);

  const update = useCallback((patch: Partial<Settings>) => {
    setSettings((previous) => {
      const next = { ...previous, ...patch };
      apply(next);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setSettings(DEFAULTS);
    apply(DEFAULTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage unavailable */
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  const toggles: Array<{ key: keyof Settings; label: string }> = [
    { key: "contrast", label: "High contrast" },
    { key: "grayscale", label: "Grayscale" },
    { key: "underlineLinks", label: "Underline links" },
    { key: "readableFont", label: "Readable font" },
    { key: "reduceMotion", label: "Pause animations" },
    { key: "bigCursor", label: "Large cursor" },
    { key: "spacing", label: "Increase text spacing" },
  ];

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-label="Accessibility options"
        title="Accessibility options"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((value) => !value)}
        className={`flex size-9 cursor-pointer items-center justify-center rounded-full border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric ${
          open
            ? "border-electric/40 bg-electric/10 text-electric"
            : "border-cloud/15 bg-cloud/5 text-cloud/70 hover:border-electric/40 hover:text-electric"
        }`}
      >
        <Accessibility className="size-4" strokeWidth={1.9} aria-hidden="true" />
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Accessibility options"
          aria-modal="false"
          className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-[17.5rem] origin-top-right animate-in fade-in-0 zoom-in-95 slide-in-from-top-1 rounded-xl border border-cloud/12 bg-navy/95 p-4 text-cloud shadow-[0_24px_60px_-24px_rgba(0,0,0,0.75)] backdrop-blur-xl duration-150"
        >
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-cloud/45">Text size</span>
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              aria-label="Decrease text size"
              onClick={() => update({ fontScale: Math.max(90, settings.fontScale - 10) })}
              className="flex min-h-10 min-w-10 cursor-pointer items-center justify-center rounded-lg border border-cloud/15 text-cloud transition-colors hover:border-electric hover:text-electric focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
            >
              <Minus className="size-4" aria-hidden="true" />
            </button>
            <output aria-live="polite" className="min-w-14 text-center text-sm font-bold">
              {settings.fontScale}%
            </output>
            <button
              type="button"
              aria-label="Increase text size"
              onClick={() => update({ fontScale: Math.min(150, settings.fontScale + 10) })}
              className="flex min-h-10 min-w-10 cursor-pointer items-center justify-center rounded-lg border border-cloud/15 text-cloud transition-colors hover:border-electric hover:text-electric focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
            >
              <Plus className="size-4" aria-hidden="true" />
            </button>
          </div>

          <ul className="mt-4 space-y-0.5">
            {toggles.map((item) => {
              const active = settings[item.key] as boolean;
              return (
                <li key={item.key}>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={active}
                    onClick={() => update({ [item.key]: !active } as Partial<Settings>)}
                    className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-2 text-left text-sm font-medium text-cloud/80 transition-colors hover:bg-cloud/10 hover:text-cloud focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
                  >
                    <span>{item.label}</span>
                    <span
                      aria-hidden="true"
                      className={`flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors ${active ? "border-electric bg-electric/30" : "border-cloud/25 bg-cloud/5"}`}
                    >
                      <span
                        className={`size-3.5 rounded-full transition-transform ${active ? "translate-x-[1.15rem] bg-electric" : "translate-x-0.5 bg-cloud/50"}`}
                      />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={reset}
            className="mt-3 flex min-h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-electric/30 bg-electric/5 text-sm font-semibold text-electric transition-colors hover:bg-electric/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Reset to default
          </button>
        </div>
      )}
    </div>
  );
}
