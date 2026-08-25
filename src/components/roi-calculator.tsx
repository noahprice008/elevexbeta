import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SUBSCRIPTION = 199;
const WEEKS_PER_MONTH = 4.3;

const money = (value: number) => `$${Math.round(value).toLocaleString("en-US")}`;

export function RoiCalculator() {
  const [hours, setHours] = useState(8);
  const [rate, setRate] = useState(30);

  const reclaimed = hours * WEEKS_PER_MONTH;
  const value = reclaimed * rate;
  const net = value - SUBSCRIPTION;
  const barWidth = value > 0 ? Math.min(100, Math.max(8, (SUBSCRIPTION / value) * 100)) : 100;

  return (
    <section id="roi-calculator" className="bg-navy py-24 text-cloud md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-xs font-extrabold uppercase text-electric">WHAT IT'S COSTING YOU</p>
        <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">See what manual work is really costing you.</h2>
        <p className="mt-6 max-w-3xl text-lg text-cloud/65">Slide to your weekly hours. We'll show you what an automated system gets back.</p>

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="rounded-md border border-cloud/12 bg-cloud/5 p-7 md:p-10">
            <label htmlFor="roi-hours" className="block text-sm font-bold text-cloud/80">
              Hours per week spent on manual scheduling, invoicing, or admin follow-up
            </label>
            <p className="mt-4 text-5xl font-extrabold text-electric">{hours}<span className="ml-2 text-lg font-bold text-cloud/60">hrs/week</span></p>
            <Slider
              id="roi-hours"
              className="mt-6"
              min={0}
              max={30}
              step={1}
              value={[hours]}
              onValueChange={([v]) => setHours(v ?? 0)}
              aria-label="Hours per week spent on manual work"
            />
            <div className="mt-2 flex justify-between text-xs font-semibold text-cloud/45"><span>0</span><span>30</span></div>

            <div className="mt-8 border-t border-cloud/12 pt-6">
              <label htmlFor="roi-rate" className="text-sm font-bold text-cloud/80">Your time is worth about</label>
              <div className="mt-3 flex items-center gap-3">
                <span className="text-lg font-extrabold text-cloud/70">$</span>
                <Input
                  id="roi-rate"
                  type="number"
                  min={0}
                  value={rate}
                  onChange={(e) => setRate(Math.max(0, Number(e.target.value) || 0))}
                  className="h-12 w-28 border-cloud/20 bg-cloud/5 text-base font-bold text-cloud focus-visible:border-electric"
                />
                <span className="text-sm font-semibold text-cloud/60">/hour</span>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-electric/40 bg-cloud/5 p-7 md:p-10">
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wide text-cloud/50">Hours reclaimed</p>
                <p className="mt-2 text-3xl font-extrabold transition-all duration-300">{Math.round(reclaimed)}<span className="text-sm font-bold text-cloud/60">/mo</span></p>
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wide text-cloud/50">Value of that time</p>
                <p className="mt-2 text-3xl font-extrabold text-electric transition-all duration-300">{money(value)}<span className="text-sm font-bold text-cloud/60">/mo</span></p>
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wide text-cloud/50">Net monthly gain</p>
                <p className="mt-2 text-3xl font-extrabold transition-all duration-300">{net >= 0 ? money(net) : `-${money(Math.abs(net))}`}</p>
              </div>
            </div>
            <p className="mt-6 text-lg font-extrabold">
              ≈ {net >= 0 ? money(net) : money(0)}/month back in your pocket after your subscription
            </p>

            <div className="mt-8 space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-cloud/50">$199/month subscription</p>
                <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-cloud/10">
                  <div className="h-full rounded-full bg-cloud/35" style={{ width: `${barWidth}%` }} />
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-electric">{money(value)}/month reclaimed</p>
                <div className="mt-2 h-5 w-full overflow-hidden rounded-full bg-cloud/10">
                  <div className="h-full w-full rounded-full bg-electric transition-all duration-300" />
                </div>
              </div>
            </div>

            <Button asChild size="lg" className="mt-8 w-full sm:w-auto"><a href="#consultation">Get My Custom Demo →</a></Button>
            <p className="mt-5 text-xs leading-relaxed text-cloud/45">
              Estimate for illustration purposes based on your inputs. Actual results vary by business and are discussed on your discovery call.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
