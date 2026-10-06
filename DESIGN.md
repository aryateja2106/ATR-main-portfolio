# AryaTeja.com — Design System

Active direction: **Field Notes** — editorial paper aesthetic with terracotta accents. Evolved from Archive Founder (luxury-03) with warmer cream tones and evidence-led layout.

## Visual reference

- **Live implementation:** `apps/web/app/(portfolio)/_components/field-notes/`
- **Tokens:** `field-notes/tokens.ts`
- **Brand lab origin:** `brand-lab/luxury-03-archive-founder.html`, `brand-lab/sample-02-field-notes.html`
- **Previews:** `brand-lab/previews/luxury-03-archive-founder.png`

## Color tokens

| Token | Value | Use |
|-------|-------|-----|
| `bg` (cream) | `#e9dfc7` | Page background |
| `paper` | `#f6efdd` | Cards, raised surfaces |
| `ink` | `#131815` | Primary text |
| `muted` | `rgba(19, 24, 21, 0.62)` | Secondary text |
| `line` | `rgba(19, 24, 21, 0.18)` | Hairline borders |
| `accent` (terracotta) | `#a65728` | CTAs, highlights |
| `accentSoft` | `#c98a5a` | Hover, secondary accent |

## Typography

| Role | Font | CSS variable |
|------|------|-------------|
| Display / headlines | Fraunces (serif) | `--font-fraunces` |
| Body | Geist (sans) | `--font-geist` |
| Labels / metadata | JetBrains Mono | `--font-jetbrains-mono` |

Hierarchy: serif for headlines and section titles, mono for kickers/tags/CTAs, sans for body copy.

## Layout principles

1. **Evidence before claims.** Real photos, sourced captions, builder logs.
2. **Sparse and archival.** Generous whitespace, hairline borders, no nested cards.
3. **Monochrome + one accent.** Cream/ink base, terracotta for action.
4. **Editorial rhythm.** Kicker → headline → lede → proof blocks.
5. **No decoration.** No blobs, bokeh, gradient orbs, purple-blue gradients, or terminal-green.

## Motion system

- **Web:** Framer Motion with custom ease from `field-notes/motion.ts`
- **Video-portable:** `storyboard` array in `motion.ts` maps 1:1 to Remotion `<Sequence>` blocks
- **Reduced motion:** respect `prefers-reduced-motion`; static fallbacks required
- **Scroll reveals:** prefer lightweight `animation-on-scroll` patterns; GSAP for complex sequences only

### Storyboard scenes (video-ready)

Defined in `field-notes/motion.ts`. Each scene has `id`, `variant`, `label`, `durationInFrames` at 30fps.

## Component patterns

- **SiteNav:** sticky, minimal, anchor links
- **Hero:** portrait + headline stack + record cards
- **Journey:** photo grid with sourced captions
- **Agents:** numbered work cards (product, services, tool, culture)
- **Writing:** essay list with kind tags
- **VideoStoryboard:** interactive motion demo, Remotion export path documented inline

## Anti-patterns

- Nested cards inside cards
- Generic AI developer portfolio aesthetic
- Giant tech stack grids as hero content
- Unverified metrics or testimonials
- Em-dashes in copy
- Hover-only meaning (keyboard must work)

## Social asset direction

- **LinkedIn banners:** cream background, serif headline, mono kicker
- **X cards:** square crop from journey photos with caption overlay
- **Blog covers:** editorial, no stock robot imagery; use `imageBrief` from content pipeline

## Skill presets for this direction

When using MengTo style skills, prefer:

- `web-design/editorial-tech`
- `web-design/light-mode-paper-technical`
- `web-design/clean-minimal-beige-light-mode`
- `web-design/book-serif-index`

Avoid dark-glass, neon-tech, and purple-container presets unless explicitly requested.
