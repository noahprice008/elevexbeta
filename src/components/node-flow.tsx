type NodeStep = { label: string; detail?: string };

/**
 * Horizontal / vertical node-and-line diagram matching the hero network visual
 * language: pulsing nodes joined by thin connecting lines.
 */
export function NodeFlow({ steps, dark = false }: { steps: NodeStep[]; dark?: boolean }) {
  const line = dark ? "bg-cloud/20" : "bg-border";
  const ring = dark ? "border-cloud/25" : "border-border";
  const text = dark ? "text-cloud" : "text-foreground";
  const sub = dark ? "text-cloud/60" : "text-muted-foreground";

  return (
    <ol className="flex flex-col gap-0 md:flex-row md:items-start">
      {steps.map((step, index) => (
        <li key={step.label} className="relative flex flex-1 gap-4 md:flex-col md:gap-0">
          {/* connector */}
          <div className="relative flex w-6 flex-col items-center md:h-6 md:w-full md:flex-row">
            <span className={`absolute md:static ${line} left-1/2 top-0 h-full w-px md:h-px md:w-full ${index === 0 ? "md:invisible" : ""}`} />
            <span
              aria-hidden="true"
              className={`relative z-10 mt-2 flex size-3.5 shrink-0 items-center justify-center rounded-full border-2 ${ring} bg-electric md:mt-0`}
            >
              <span className="absolute inset-0 rounded-full bg-electric/40 blur-[3px]" />
            </span>
            <span className={`hidden md:block ${line} h-px w-full ${index === steps.length - 1 ? "invisible" : ""}`} />
          </div>
          <div className="pb-8 md:pb-0 md:pr-6 md:pt-5">
            <p className={`text-sm font-extrabold leading-snug ${text}`}>{step.label}</p>
            {step.detail && <p className={`mt-2 text-sm ${sub}`}>{step.detail}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
