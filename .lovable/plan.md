# Sitewide Hero Network Background

Take the animated connected-nodes effect currently behind the homepage hero and make it the background texture of the whole site — every page, section, and card — without changing any background colors.

## How it works

1. One shared animated layer, not many canvases.
   A single fixed, full-viewport canvas is mounted once at the app root, sitting behind all content. Every page (current and future) inherits it automatically, with no per-page work.

2. Theme-aware effect color.
   The canvas reads the active theme:
   - Dark surfaces (navy sections, hero, footer): current look — cool light-blue signal lines and pale nodes.
   - Light surfaces: the same geometry drawn in soft grey/charcoal tones so the texture reads identically without introducing new colors.
   It also follows the existing accessibility "reduce motion" preference and high-contrast mode, as the hero canvas already does.

3. Letting the effect show through sections and cards.
   Section and card backgrounds keep the exact same colors, but get a small amount of transparency (roughly 88-94% opaque) so the moving network is visible faintly behind them. Text contrast stays unchanged at these levels. This applies to the shared section/card wrappers in `page-blocks.tsx` and the surface tokens used across pages, so future pages pick it up too.

4. Hero cleanup.
   The hero's own canvas instance is removed and it uses the shared layer, so the effect is continuous while scrolling rather than restarting per section.

## Technical notes

- `src/components/network-visual.tsx`: add a `fixed` variant, resolve stroke/fill colors from CSS variables (`--electric`, `--foreground`, `--muted-foreground`) instead of hardcoded rgba, and re-resolve on theme change (observe the `dark` class + existing `elevex-a11y-change` event). Density/link distance scale to the viewport.
- New `src/components/site-backdrop.tsx` renders the fixed canvas at `z-[-1]` (or `z-0` with content at `z-10`), `pointer-events-none`, `aria-hidden`.
- Mount once in `src/routes/__root.tsx` inside the root component, above `<Outlet />`.
- Transparency applied via existing utility classes on section/card wrappers (`bg-background/92`, `bg-navy/92`, `bg-card/92`) — token values in `styles.css` are untouched.
- Performance: single RAF loop, DPR capped at 2, animation paused when the tab is hidden.

## Files touched

- `src/components/network-visual.tsx` (theme-aware, reusable)
- `src/components/site-backdrop.tsx` (new)
- `src/routes/__root.tsx` (mount backdrop)
- `src/routes/index.tsx` (remove hero-local canvas)
- `src/components/page-blocks.tsx` and other section/card wrappers (add translucency only)
