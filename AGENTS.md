# AryaTeja.com — Agent Instructions

Portfolio monorepo for Arya Teja Rudraraju. Primary surface: trust, proof, writing, and conversion for AI agent consulting.

## Read first

1. `PRODUCT.md` — audience, positioning, anti-references
2. `DESIGN.md` — visual system, motion, video direction
3. `apps/web/lib/portfolio/brand.ts` — identity, links, voice
4. `docs/CONTENT.md` — daily content runbook

## Stack

- **Monorepo:** Turborepo + Bun
- **App:** Next.js 16 App Router in `apps/web/`
- **Styling:** Tailwind CSS, Framer Motion
- **Active UI:** `apps/web/app/(portfolio)/_components/field-notes/`
- **Design lab:** `brand-lab/` (HTML explorations, not production)

## Build commands

```bash
bun install          # from repo root
bun run dev          # start dev server
bun run build        # production build
bun run lint         # Biome lint
```

## Hard rules

- Do not commit without Arya's explicit approval.
- Do not use em-dashes in user-facing copy.
- Do not position Arya as AI PM, aspiring, Dallas-based, or job-seeking.
- Do not use purple-blue gradients, terminal-green, nested cards, or decorative blobs.
- Every public claim must be verifiable. Mark experiments honestly.
- Prefer `bun` over `npm`. Use Biome for lint/format.

## Skill routing

Load the **narrowest matching skill** from `.agents/skills/` before acting.

| Task | Skill |
|------|-------|
| Portfolio copy, social, daily content | `personal-brand-content` |
| Visual QA, craft, live browser review | `impeccable` |
| React/Next.js performance | `vercel-react-best-practices` |
| Blog draft humanization | `humanizer` |
| Marketing page copy | `copywriting` |
| Design system decisions (fonts, colors, patterns) | `ui-ux-pro-max` |
| Reference video → build spec | `codex/video-to-superprompt` |
| HTML page → interaction prompts | `codex/html-to-interaction-prompts` |
| Full-page reference capture | `codex/stitched-full-page-capture` |
| Daily UI inspiration loop | `codex/daily-ui-inspiration-capture` |
| Spec-driven UI prompting | `ui/design-first-ui-prompting` |
| Distinctive frontend aesthetics | `ui/frontend-design` |
| Landing page structure | `web-design/landing-page` |
| Scroll reveals (lightweight) | `web-design/animation-on-scroll` |
| Complex scroll/motion | `web-design/gsap`, `web-design/cinematic-gsap-lenis-motion-system` |
| Typography motion | `web-design/staggered-word-reveal`, `web-design/masked-reveal` |
| Visual polish | `web-design/progressive-blur`, `web-design/beautiful-shadows` |
| Style presets | `web-design/editorial-tech`, `web-design/light-mode-paper-technical` |
| Animation performance | `codex/optimize-web-animations` |
| Stock imagery | `media/unsplash-asset-images` |
| Brand voice + tokens | `brand` |
| shadcn/Tailwind implementation | `ui-styling` |

Full inventory: `.agents/skills/SKILLS.md`

## Video and motion workflow

1. Capture reference: `codex/stitched-full-page-capture` or screen recording
2. Analyze: `codex/video-to-superprompt` → detailed recreation prompt
3. Spec: `ui/design-first-ui-prompting` → constrained design brief
4. Implement: adapt to Next.js client components + Framer Motion
5. Port to video: use `field-notes/motion.ts` storyboard (Remotion/Hyperframes ready)
6. Perf check: `codex/optimize-web-animations` + `vercel-react-best-practices`

## Design system generation

```bash
python3 .agents/skills/ui-ux-pro-max/scripts/search.py \
  "developer portfolio personal brand technical creative" \
  --design-system --persist -p "ATR Portfolio" \
  --variance 7 --motion 6 --density 3 -f markdown
```

Output persists to `design-system/MASTER.md`. Merge with `DESIGN.md` before major UI changes.
