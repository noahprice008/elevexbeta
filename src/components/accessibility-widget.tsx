import { useCallback, useEffect, useRef, useState } from "react";
import { Accessibility, Minus, Plus, RotateCcw, X } from "lucide-react";

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

export function AccessibilityWidget() {
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
    <div className="fixed bottom-4 left-4 z-50">
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Accessibility options"
          aria-modal="false"
          className="mb-3 w-[17.5rem] rounded-md border border-electric/30 bg-navy p-4 text-cloud shadow-lg"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold uppercase text-electric">Accessibility</h2>
            <button
              type="button"
              aria-label="Close accessibility options"
              onClick={() => {
                setOpen(false);
                buttonRef.current?.focus();
              }}
              className="flex size-8 cursor-pointer items-center justify-center rounded-sm text-cloud/70 transition-colors hover:bg-cloud/10 hover:text-electric focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-4">
            <span id="a11y-text-size" className="text-xs font-bold uppercase text-cloud/55">
              Text size
            </span>
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease text size"
                onClick={() => update({ fontScale: Math.max(90, settings.fontScale - 10) })}
                className="flex min-h-10 min-w-10 cursor-pointer items-center justify-center rounded-sm border border-cloud/20 text-cloud transition-colors hover:border-electric hover:text-electric focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
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
                className="flex min-h-10 min-w-10 cursor-pointer items-center justify-center rounded-sm border border-cloud/20 text-cloud transition-colors hover:border-electric hover:text-electric focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
              >
                <Plus className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <ul className="mt-4 space-y-1">
            {toggles.map((item) => {
              const active = settings[item.key] as boolean;
              return (
                <li key={item.key}>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={active}
                    onClick={() => update({ [item.key]: !active } as Partial<Settings>)}
                    className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-sm px-2 text-left text-sm font-semibold text-cloud/85 transition-colors hover:bg-cloud/10 hover:text-cloud focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
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
            className="mt-4 flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-sm border border-electric/40 text-sm font-bold text-electric transition-colors hover:bg-electric hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Reset to default
          </button>
        </div>
      )}

      <button
        ref={buttonRef}
        type="button"
        aria-label="Accessibility options"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-electric/40 bg-navy text-electric shadow-lg transition-colors hover:bg-navy/90 hover:text-cloud focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
      >
        <Accessibility className="size-5" aria-hidden="true" />
      </button>
    </div>
  );
}
