# Plan: Make ELEVEX Hostslinger-Compatible (Standard Vite SPA)

## Goal
Convert the project from a Lovable/TanStack Start full-stack build to a standard Vite + React single-page application that Hostslinger can build directly from the GitHub repository, with no Lovable-specific packages or server runtime.

## Background
The current `vite.config.ts` uses `@tanstack/react-start/plugin/vite` and `nitro`, which are full-stack/server-framework plugins. Hostslinger's build container cannot resolve these (and previously failed on `@lovable.dev/vite-tanstack-config`). The site is actually a static marketing SPA with no server-side data loading, so it can be simplified to a plain Vite React build.

## What will change

### 1. Build tooling
- Replace `vite.config.ts` with a standard Vite configuration using:
  - `@vitejs/plugin-react`
  - `@tailwindcss/vite`
  - `vite-tsconfig-paths`
  - `@tanstack/router-plugin/vite` (already in `package.json`) for file-based route generation
- Remove `tanstackStart(...)` and `nitro()` plugins.
- Set `base: "/"` and ensure the build outputs to `dist/`.

### 2. Entry points
- Create `index.html` at the repository root pointing to `src/main.tsx`.
- Create `src/main.tsx` as the new client entry point:
  - Render the router into `document.getElementById("root")`.
  - Use `RouterProvider` from `@tanstack/react-router`.

### 3. Router conversion
- Update `src/router.tsx` to use `createRouter` from `@tanstack/react-router` with default browser history and the existing `routeTree`.
- Remove the `QueryClient` from router context if it is no longer needed, or keep it in `main.tsx` wrapping `RouterProvider`.

### 4. Root route simplification
- Update `src/routes/__root.tsx`:
  - Remove `shellComponent`, `HeadContent`, and `Scripts` (these are TanStack Start SSR APIs).
  - Return a plain component that wraps children in `QueryClientProvider` and renders `<Outlet />` plus the AI chat widget.
  - Move static `<head>` tags (charset, viewport, title, description, fonts, favicons) into `index.html`.
  - Keep per-route `head()` metadata where supported by TanStack Router, or move critical SEO tags into `index.html` if the standard router plugin does not generate head at runtime for a static SPA.

### 5. Server files removal
- Delete `src/server.ts` (serverless worker entry).
- Delete `src/start.ts` (CSRF/error middleware and Start instance).
- Remove any imports of these files.

### 6. Dependencies
- Remove from `package.json`:
  - `@tanstack/react-start`
  - `nitro`
- Keep:
  - `@tanstack/react-router`
  - `@tanstack/router-plugin`
  - `@tanstack/react-query`
  - All UI/component dependencies
- Run install to update the lockfile.

### 7. Lovable-specific code
- Replace or guard `src/lib/lovable-error-reporting.ts` so it no-ops outside the Lovable editor (it already checks `typeof window`, but the file name and global types can be simplified).
- Remove the `reportLovableError` call in `src/routes/__root.tsx` or make it a safe console-only fallback.

### 8. Route tree
- Keep `src/routeTree.gen.ts` as the generated route tree.
- Configure `@tanstack/router-plugin/vite` with `routesDirectory: "src/routes"` and `generatedRouteTree: "src/routeTree.gen.ts"` so it regenerates automatically during dev/build.

### 9. Static hosting behavior
- Because Hostslinger serves the `dist/` folder as static files, deep links like `/blueprints` or `/for/tradesmen` require the host to fall back to `index.html`. The plan assumes Hostslinger provides this fallback (standard for static SPAs). If not, we can switch to hash-based history as a follow-up.

## What will NOT change
- All page content, copy, components, styling, and the AI chat widget logic.
- The existing webhook URLs and form payloads.
- The file-based routing convention under `src/routes/`.
- The public assets in `public/`.

## Verification
- Run `bun install`.
- Run `bun run build` and confirm `dist/` is produced with `index.html` and assets.
- Run `bun run preview` and spot-check navigation across `/`, `/blueprints`, `/roadmap`, `/privacy`, `/terms`, and the `/for/*` industry pages.
- Confirm no `@lovable.dev`, `@tanstack/react-start`, or `nitro` imports remain in the built output.

## Risks / follow-ups
- TanStack Router's `head()` API may behave differently in a pure client SPA than under Start SSR; if meta tags are missing at build time, we will move them into `index.html` or add `react-helmet-async`.
- If Hostslinger does not provide an `index.html` fallback for deep links, we will switch the router to hash history.
