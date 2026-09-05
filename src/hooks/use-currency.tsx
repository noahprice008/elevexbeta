import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * Display-only currency localization.
 * All prices are authored in USD; UK visitors see the GBP equivalent.
 * Billing/checkout always happens in USD — this layer never touches payment logic.
 */
export const USD_TO_GBP = 149 / 199; // anchored on the $199/mo plan mapping to £149/mo

type CurrencyCode = "USD" | "GBP";

const CurrencyContext = createContext<CurrencyCode>("USD");

const STORAGE_KEY = "elevex-currency";

async function detectCountry(signal: AbortSignal): Promise<string | null> {
  const endpoints = [
    { url: "https://ipwho.is/?fields=country_code", key: "country_code" },
    { url: "https://ipapi.co/json/", key: "country_code" },
  ];
  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint.url, { signal });
      if (!res.ok) continue;
      const data = (await res.json()) as Record<string, unknown>;
      const code = data[endpoint.key];
      if (typeof code === "string" && code.length === 2) return code.toUpperCase();
    } catch {
      // try the next provider, otherwise fall back to USD
    }
  }
  return null;
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState<CurrencyCode>("USD");

  useEffect(() => {
    let cancelled = false;

    const cached = typeof window !== "undefined" ? window.sessionStorage.getItem(STORAGE_KEY) : null;
    if (cached === "GBP" || cached === "USD") {
      setCode(cached);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 3000);

    detectCountry(controller.signal)
      .then((country) => {
        const next: CurrencyCode = country === "GB" ? "GBP" : "USD";
        try {
          window.sessionStorage.setItem(STORAGE_KEY, next);
        } catch {
          /* storage unavailable */
        }
        if (!cancelled) setCode(next);
      })
      .catch(() => {
        /* default stays USD */
      })
      .finally(() => window.clearTimeout(timer));

    return () => {
      cancelled = true;
      controller.abort();
      window.clearTimeout(timer);
    };
  }, []);

  return <CurrencyContext.Provider value={code}>{children}</CurrencyContext.Provider>;
}

export type LocalizedPrice = {
  currency: CurrencyCode;
  symbol: string;
  isUK: boolean;
  /** Convert a USD amount into the displayed currency (number only). */
  convert: (usd: number) => number;
  /** Convert a displayed-currency amount back into USD (for inputs). */
  toUsd: (displayed: number) => number;
  /** Format a USD base amount as a localized price string, e.g. "£149". */
  price: (usd: number, options?: { decimals?: number }) => string;
  /** Rewrite any "$1,234" occurrences inside copy into the localized currency. */
  text: (copy: string) => string;
  /** Short disclaimer shown to non-USD visitors, null otherwise. */
  billingNote: string | null;
};

export function useLocalizedPrice(): LocalizedPrice {
  const currency = useContext(CurrencyContext);

  return useMemo(() => {
    const isUK = currency === "GBP";
    const symbol = isUK ? "£" : "$";
    const rate = isUK ? USD_TO_GBP : 1;
    const convert = (usd: number) => usd * rate;
    const toUsd = (displayed: number) => displayed / rate;
    const price = (usd: number, options?: { decimals?: number }) => {
      const decimals = options?.decimals ?? 0;
      const value = convert(usd);
      return `${symbol}${value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
    };
    const text = (copy: string) =>
      isUK ? copy.replace(/\$([\d,]+(?:\.\d+)?)/g, (_m, n: string) => price(Number(n.replace(/,/g, "")))) : copy;

    return {
      currency,
      symbol,
      isUK,
      convert,
      toUsd,
      price,
      text,
      billingNote: isUK ? "Prices shown in GBP for convenience — billed in USD." : null,
    };
  }, [currency]);
}

/** Inline localized price, e.g. <Price usd={199} suffix="/month" />. */
export function Price({ usd, suffix }: { usd: number; suffix?: string }) {
  const { price } = useLocalizedPrice();
  return <>{price(usd)}{suffix}</>;
}

/** Small "billed in USD" note, rendered only for non-USD visitors. */
export function UsdNote({ className }: { className?: string }) {
  const { billingNote } = useLocalizedPrice();
  if (!billingNote) return null;
  return <span className={className ?? "text-xs font-semibold opacity-70"}>{billingNote}</span>;
}
