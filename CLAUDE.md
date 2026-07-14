# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal portfolio site for imagineazhar.com (Muhammad Azhar, data analytics specialist), originally scaffolded by Figma Make. It's a client-side-only React SPA — no backend, no SSR.

## Commands

```
npm run dev       # start Vite dev server
npm run build     # type-check-free production build (vite build) -> dist/
npm run deploy    # build then publish dist/ to the gh-pages branch (gh-pages -d dist)
```

There is no lint script, no test runner, and no tsconfig.json in this repo — TypeScript is transpiled by Vite/esbuild without a separate type-check step. Don't invent `npm test`/`npm run lint` commands; they don't exist.

## Deployment

Two independent deploy paths exist — be aware of both when changing build output or config:
1. **GitHub Actions** (`.github/workflows/deploy.yml`): on every push to `main`, runs `npm ci && npm run build` and publishes `dist/` to GitHub Pages via `peaceiris/actions-gh-pages`. This is the primary path.
2. **Manual** (`npm run deploy`): uses the `gh-pages` package to push `dist/` directly. Useful for local one-off deploys.

`public/CNAME` pins the custom domain (imagineazhar.com). `public/404.html` + the inline script in `index.html`'s `<head>` implement the standard GitHub Pages SPA redirect trick (404.html rewrites the path into a `?p=` query param; index.html reads it back via `history.replaceState` before React Router mounts). If you touch routing or `index.html`, keep both halves in sync or deep links on GitHub Pages will break.

## Architecture

- **Entry**: `src/main.tsx` → `src/app/App.tsx`. App.tsx just wires up `react-router-dom` (`BrowserRouter`) with `Navbar` + `Footer` persistent around two routes: `/` (`HomePage`) and `/case-study/:id` (`CaseStudyPage`).
- **Path alias**: `@` → `src` (configured in `vite.config.ts`). Always import via `@/app/...`, not relative paths across directories.
- **Pages compose sections**: `HomePage.tsx` is just a sequence of section components (`HeroSection`, `AboutSection`, `ServicesSection`, `SelectedWork`, `WritingSection`) from `src/app/components/`. There's no in-page state coordination — each section is self-contained.
- **Case studies are data-driven**: `src/app/data/caseStudies.ts` exports a single typed `CaseStudy[]` array (the `CaseStudy` interface lives in the same file). `CaseStudyPage.tsx` looks up a study by `id` from the route param and renders every field generically — adding a new case study means adding an entry to this array, not writing new page markup. Missing/unknown `id` renders a "Case Study Not Found" state.
- **Manual SEO, no SSR**: `src/app/utils/seo.ts` (`setPageMeta`, `buildUrl`) imperatively sets `document.title`, canonical link, and OG/Twitter meta tags client-side via `useEffect` on each page. Since there's no server-side rendering, crawlers relying on initial HTML meta tags only see the defaults baked into `index.html`; per-page meta is a progressive enhancement for client-rendered visits.
- **UI primitives**: `src/app/components/ui/` is a vendored shadcn/ui set (Radix UI primitives + `class-variance-authority` + `tailwind-merge`). Treat these as generated/library code — extend by composition in feature components rather than editing the primitives, unless fixing a genuine bug in the primitive itself.
- **Styling**: Tailwind v4 (via `@tailwindcss/vite`, not a `tailwind.config.js`). Design tokens (colors, type scale, spacing, line-heights) are CSS custom properties in `src/styles/theme.css`; `src/styles/tailwind.css` and `src/styles/fonts.css` round out global styles, all imported from `src/styles/index.css`.
- **Animation**: uses the `motion` package imported as `motion/react` (Framer Motion's new package name) — not `framer-motion`.
- **Images**: `src/app/components/figma/ImageWithFallback.tsx` is the standard image component used across the app (handles broken `src` gracefully) — prefer it over a bare `<img>` for content images.

## Content notes

- `guidelines/Guidelines.md` is an unfilled Figma Make template (no actual project-specific rules in it currently).
- `LOGO_DESIGN_RATIONALE.md` documents the reasoning behind the custom logo/wordmark (`Logo.tsx`, `DataVizLogo.tsx`) if you need to modify branding.
- `ATTRIBUTIONS.md` tracks third-party asset licensing (shadcn/ui, Unsplash) — update it if you add new externally-sourced assets/components.
