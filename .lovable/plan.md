# Why the production webhook isn't firing

## Diagnosis

The form posts directly from the visitor's browser to two URLs on `localhost:5678`. That address means "the machine viewing the page", so it can only ever work while you personally have n8n running and are viewing the site locally. Two separate things are blocking it right now:

1. **The workflow isn't Active.** n8n's production URL (`/webhook/...`) only exists while the workflow is toggled Active. Until then it returns 404. The test URL (`/webhook-test/...`) only listens while you click "Listen for test event".
2. **The published site is HTTPS.** Browsers block an HTTPS page from calling `http://localhost`, so on the live site both calls fail silently regardless of n8n's state. Failures are swallowed on purpose today (the success screen shows anyway), which is why it looks like nothing happened.

## Plan

1. Activate the workflow in n8n (your step — the production URL doesn't respond otherwise).
2. Make the webhook URL configurable instead of hardcoded: read `VITE_LEAD_WEBHOOK_URL` (test) and a new `VITE_LEAD_WEBHOOK_PROD_URL` (production), falling back to the current localhost values for local dev. When you get a public n8n URL (n8n Cloud or a tunnel like ngrok/Cloudflare Tunnel), set those and the live site starts working with no code change.
3. Add visible diagnostics: log each webhook's status/failure to the console with a clear tag, and track a per-endpoint result so a total failure can optionally be reported rather than silently succeeding.
4. Skip localhost calls when the page itself is served over HTTPS, and log a one-line explanation instead of letting the browser throw an opaque mixed-content error.

## Technical notes

- File: `src/components/consultation-flow.tsx`, `submit()` around lines 309-326.
- Keep `Promise.allSettled` and keep submission non-blocking so the reward/success animation is unaffected.
- Both existing URLs stay as the local defaults; nothing is removed.

## What this does not fix

While n8n only lives on `localhost`, the published site can never reach it — no code change can bridge that. A publicly reachable n8n URL is required for the live site.
