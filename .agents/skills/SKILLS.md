# Agent Skills Inventory

Canonical location: `.agents/skills/`. Symlinks in `.agent/skills/` for multi-tool compatibility.

Sources:
- **MengTo/Skills** — https://github.com/MengTo/Skills (MIT)
- **ui-ux-pro-max** — https://github.com/nextlevelbuilder/ui-ux-pro-max-skill (MIT)
- **Portfolio-native** — custom skills for AryaTeja.com

## Portfolio-native (6)

| Skill | Trigger |
|-------|---------|
| `personal-brand-content` | Daily LinkedIn/X/blog/carousel content for Arya |
| `impeccable` | Visual QA, craft, live browser review |
| `humanizer` | Remove AI writing patterns from drafts |
| `copywriting` | Marketing page copy, CTAs, headlines |
| `vercel-react-best-practices` | React/Next.js performance optimization |

## UI UX Pro Max (6)

| Skill | Trigger |
|-------|---------|
| `ui-ux-pro-max` | Design system generation, UX guidelines, stack-specific patterns |
| `brand` | Voice, visual identity, token sync |
| `design` | Router for logo, CIP, slides, banners |
| `design-system` | 3-layer token architecture |
| `ui-styling` | shadcn/ui + Tailwind implementation |
| `banner-design` | Social/ad/hero banners |
| `slides` | HTML presentations |

## Codex workflows — MengTo (5)

| Skill | Trigger |
|-------|---------|
| `codex/video-to-superprompt` | Screen recording → detailed recreation prompt |
| `codex/html-to-interaction-prompts` | HTML page → reusable interaction prompts |
| `codex/stitched-full-page-capture` | Full-page screenshots for lazy/WebGL pages |
| `codex/daily-ui-inspiration-capture` | Daily 5-reference UI inspiration bundles |
| `codex/optimize-web-animations` | Profile and reduce animation/WebGL cost |

## UI prompting — MengTo (5)

| Skill | Trigger |
|-------|---------|
| `ui/design-first-ui-prompting` | Spec-driven UI prompt skeleton |
| `ui/frontend-design` | Distinctive production-grade UI |
| `ui/redesign-existing-projects` | Upgrade existing sites incrementally |
| `ui/high-end-visual-design` | Agency-grade fonts/spacing/cards |
| `ui/gpt-taste` | GSAP motion + layout variance |

## Web design — MengTo (20)

| Skill | Trigger |
|-------|---------|
| `web-design/landing-page` | Conversion landing page structure |
| `web-design/animation-on-scroll` | Lightweight IntersectionObserver reveals |
| `web-design/gsap` | GSAP timelines, ScrollTrigger, stagger |
| `web-design/gsap-scrolltrigger-storytelling` | Scroll-driven narrative sections |
| `web-design/cinematic-gsap-lenis-motion-system` | Premium Lenis + GSAP motion |
| `web-design/cinematic-scroll-storytelling` | Cinematic scroll sequences |
| `web-design/staggered-word-reveal` | Editorial typography motion |
| `web-design/masked-reveal` | Mask-based content reveals |
| `web-design/marquee-loop` | Infinite marquee loops |
| `web-design/progressive-blur` | Progressive blur treatments |
| `web-design/beautiful-shadows` | Layered shadow systems |
| `web-design/css-border-gradient` | Gradient border effects |
| `web-design/editorial-tech` | Editorial + technical layout preset |
| `web-design/light-mode-paper-technical` | Paper/technical light mode preset |
| `web-design/clean-minimal-beige-light-mode` | Minimal beige preset |
| `web-design/book-serif-index` | Serif index/gallery layout |
| `web-design/tailwindcss` | Tailwind implementation patterns |
| `web-design/animation-systems` | Unified animation system setup |
| `web-design/webgl-landing-steering` | WebGL landing page direction |
| `web-design/threejs` | Three.js scene patterns |

## Media — MengTo (1)

| Skill | Trigger |
|-------|---------|
| `media/unsplash-asset-images` | High-quality Unsplash asset selection |

## Removed (cleanup)

- `frontend-design` (old) — replaced by `ui/frontend-design` from MengTo
- `.sklab/evals/` — stale eval artifacts with wrong paths

## Usage

Read `AGENTS.md` for task → skill routing. Load the narrowest matching `SKILL.md` before acting.
