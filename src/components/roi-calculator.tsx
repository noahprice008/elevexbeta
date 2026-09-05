import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocalizedPrice } from "@/hooks/use-currency";

const MIN_SUBSCRIPTION = 199;
const MAX_SUBSCRIPTION = 999;
const SUBSCRIPTION_STEP = 100;
const WEEKS_PER_MONTH = 4.3;
const DEFAULT_RATE_USD = 30;
const subscriptionOptions = Array.from({ length: 9 }, (_, index) => MIN_SUBSCRIPTION + index * SUBSCRIPTION_STEP);

export function RoiCalculator() {
  const { price, convert, toUsd, symbol, billingNote } = useLocalizedPrice();
  // All math stays in USD; conversion happens at display time only.
  const money = (usdValue: number) => price(Math.round(usdValue));

  const [hours, setHours] = useState(8);
  const [rate, setRate] = useState(DEFAULT_RATE_USD);
  const [subscription, setSubscription] = useState(MIN_SUBSCRIPTION);

  const reclaimed = hours * WEEKS_PER_MONTH;
  const value = reclaimed * rate;
  const net = value - subscription;
  const barWidth = value > 0 ? Math.min(100, Math.max(8, (subscription / value) * 100)) : 100;
  const displayedRate = Math.round(convert(rate));


  return (
    <section id="roi-calculator" className="border-t border-cloud/10 bg-navy py-24 text-cloud md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-xs font-extrabold uppercase text-electric">WHAT IS MANUAL ADMIN COSTING YOU?</p>
        <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">Calculate the Hidden 'Tax' on Your Time (and Your Evenings).</h2>
        <p className="mt-6 max-w-3xl text-lg text-cloud/65">Slide the controls below to see exactly how many hours you can claw back each month, and the real-world dollar amount you save by putting your operations on autopilot.</p>

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="rounded-md border border-cloud/12 bg-cloud/5 p-7 md:p-10">
            <label htmlFor="roi-hours" className="block text-sm font-bold text-cloud/80">
              How many hours a week do you spend on scheduling, invoicing, or chasing follow-ups?
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
            <p className="mt-4 text-xs leading-relaxed text-cloud/45">Be honest — include the minutes spent texting clients at the dinner table, typing quotes on Sunday nights, or playing phone tag.</p>

            <div className="mt-8 border-t border-cloud/12 pt-6">
              <label htmlFor="roi-rate" className="text-sm font-bold text-cloud/80">What is your time worth to your business?</label>
              <p className="mt-1 text-xs leading-relaxed text-cloud/45">We've pre-set this to a basic admin rate of {money(DEFAULT_RATE_USD)}/hr. If you're a specialized tradesman, consultant, or clinic owner, your billable rate is likely much higher.</p>
              <div className="mt-3 flex items-center gap-3">
                <span className="text-lg font-extrabold text-cloud/70">{symbol}</span>
                <Input
                  id="roi-rate"
                  type="number"
                  min={0}
                  value={displayedRate}
                  onChange={(e) => setRate(Math.max(0, toUsd(Number(e.target.value) || 0)))}
                  className="h-12 w-28 border-cloud/20 bg-cloud/5 text-base font-bold text-cloud focus-visible:border-electric"
                />
                <span className="text-sm font-semibold text-cloud/60">/hour</span>
              </div>
            </div>

            <div className="mt-8 border-t border-cloud/12 pt-6">
              <label htmlFor="roi-subscription" className="text-sm font-bold text-cloud/80">Estimated ELEVEX Investment</label>
              <p className="mt-3 text-sm font-bold text-cloud/60">Our core platform starts at just $199/month — less than a single day of part-time admin help. Our systems work 24/7, never call in sick, and never let a hot lead go cold.</p>
              <p className="mt-1 text-4xl font-extrabold text-electric">{money(subscription)}<span className="ml-2 text-lg font-bold text-cloud/60">/month selected</span></p>
              <input
                id="roi-subscription"
                type="range"
                min={MIN_SUBSCRIPTION}
                max={MAX_SUBSCRIPTION}
                step={SUBSCRIPTION_STEP}
                value={subscription}
                onChange={(event) => setSubscription(Number(event.target.value))}
                className="mt-5 h-3 w-full cursor-pointer accent-electric"
                aria-label="Estimated ELEVEX subscription per month"
              />
              <div className="mt-2 flex justify-between text-xs font-semibold text-cloud/45"><span>{money(MIN_SUBSCRIPTION)}</span><span>{money(MAX_SUBSCRIPTION)}</span></div>
              <label htmlFor="roi-subscription-select" className="mt-5 block text-xs font-extrabold uppercase text-cloud/50">Or choose an amount</label>
              <select
                id="roi-subscription-select"
                value={subscription}
                onChange={(event) => setSubscription(Number(event.target.value))}
                className="mt-2 h-12 w-full cursor-pointer rounded-md border border-cloud/20 bg-navy px-3 text-sm font-extrabold text-cloud outline-none focus:border-electric focus:ring-2 focus:ring-electric/30"
              >
                {subscriptionOptions.map((amount) => (
                  <option key={amount} value={amount}>{money(amount)}/month</option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-md border border-electric/40 bg-cloud/5 p-7 md:p-10">
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wide text-cloud/50">Hours of Your Life Reclaimed</p>
                <p className="mt-2 text-3xl font-extrabold transition-all duration-300">{Math.round(reclaimed)}<span className="text-sm font-bold text-cloud/60">/mo</span></p>
                <p className="mt-2 text-[11px] leading-relaxed text-cloud/45">That is nearly a full workweek handed back to you every single month.</p>
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wide text-cloud/50">Reclaimed Productivity Value</p>
                <p className="mt-2 text-3xl font-extrabold text-electric transition-all duration-300">{money(value)}<span className="text-sm font-bold text-cloud/60">/mo</span></p>
                <p className="mt-2 text-[11px] leading-relaxed text-cloud/45">The financial value of the hours you buy back to focus on actual billable work.</p>
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wide text-cloud/50">Your Monthly Freedom Dividend</p>
                <p className="mt-2 text-3xl font-extrabold transition-all duration-300">{net >= 0 ? money(net) : `-${money(Math.abs(net))}`}</p>
                <p className="mt-2 text-[11px] leading-relaxed text-cloud/45">≈ {money(net)}/month back in your pocket after covering your ELEVEX subscription.</p>
              </div>
            </div>
            <p className="mt-6 text-lg font-extrabold">
              ≈ {net >= 0 ? money(net) : money(0)}/month back in your pocket after your subscription
            </p>

            <div className="mt-8 space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-cloud/50">from {money(subscription)}/month subscription</p>
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

            <Button asChild size="lg" className="mt-8 w-full sm:w-auto"><a href="#consultation">Build My Free Demo →</a></Button>
            <p className="mt-5 text-xs leading-relaxed text-cloud/45">
              Estimates are for illustration based on your inputs. Your actual custom setup and subscription rate will be quoted transparently on your discovery call based on your workflow complexity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
