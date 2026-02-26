# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

KEIGOLY official portfolio site — a bilingual (ja/en) static website built with Astro 5, React 19, and Tailwind CSS v4. Deployed on Cloudflare Pages at `keigoly.jp`.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Production build to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run cms` | Local Decap CMS proxy server |

No test framework is configured.

## Architecture

### Framework & Rendering
- **Astro** handles page routing and static HTML generation. Pages are `.astro` files in `src/pages/`.
- **React** components (`.tsx`) are used for interactive UI and hydrated via Astro directives (`client:load`, `client:visible`, `client:only="react"`).
- **Tailwind CSS v4** configured through Vite plugin (not PostCSS). Theme tokens defined in `src/styles/global.css` using `@theme` block.

### i18n Pattern
- Japanese (default): `/about`, `/works`, `/blog`, `/contact`
- English: `/en/about`, `/en/works`, `/en/contact`
- English pages are **separate `.astro` files** in `src/pages/en/` that mirror the Japanese pages with `lang="en"` prop.
- Translation strings live in `src/lib/i18n.ts` — use `t(section, key, lang)` to get translated text.
- `getLanguageFromPath(path)` detects language from URL. `getLocalizedPath(path, lang)` generates localized URLs.

### Content Collections
- Blog posts: Markdown/MDX files in `src/content/blog/` with naming pattern `YYYY-MM-DD-slug.md`.
- Schema defined in `src/content/config.ts`: `title`, `description`, `pubDate`, `tags[]`, `draft`, optional `cover` and `updatedDate`.
- Dynamic route at `src/pages/blog/[slug].astro`.

### CMS
- **Decap CMS** (Git-based) served at `/admin`. Config at `public/admin/config.yml`.
- GitHub OAuth handled by a Cloudflare Worker in `decap-oauth-worker/`.

### Supabase Integration
- Used only for blog comment system (`comments` table).
- Client and API functions in `src/lib/supabase.ts`.

### Component Organization
```
src/components/
├── core/       # Page-level: ScrollManager (Lenis), CustomCursor, Opening animation
├── layout/     # Header.tsx (nav, lang switcher, mobile menu), Footer.tsx
├── sections/   # Hero.tsx (image slideshow)
└── ui/         # Reusable: ContactForm, Comments, ShareButtons, WorkCard, ExtensionCard, SectionTitle, SkillSection
```

### Layout
`BaseLayout.astro` wraps all pages. It accepts `title`, `description`, `lang`, `showHeader`, `showFooter`, `fullWidth` props and includes scroll manager, noise texture overlay, header, and footer.

## Design System

All custom colors use the `kg-` prefix (e.g., `bg-kg-bg`, `text-kg-accent`):

| Token | Value | Usage |
|-------|-------|-------|
| `kg-bg` | `#0a0a0a` | Main background |
| `kg-surface` | `#1a1a1a` | Cards/surfaces |
| `kg-text` | `#f0f0f0` | Primary text |
| `kg-text-muted` | `#888888` | Secondary text |
| `kg-accent` | `#c9a861` | Gold accent/links |
| `kg-border` | `#2a2a2a` | Borders |

Fonts: `font-display` (Cinzel) for headings, `font-body`/`font-serif` (Shippori Mincho) for body text.

Custom CSS utilities in `global.css`: `.glass`, `.gradient-overlay`, `.hover-line`, `.bg-noise`.

## Key Conventions

- Animations use Framer Motion in React components and Tailwind `animate-*` classes (fade-in, slide-up, slide-down, scale-in, glow) in Astro templates.
- When adding a new page, create both `src/pages/<page>.astro` (Japanese) and `src/pages/en/<page>.astro` (English) versions.
- Adding translation keys: add entries to the appropriate section in `src/lib/i18n.ts` with both `ja` and `en` values.
