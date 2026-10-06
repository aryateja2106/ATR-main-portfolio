# Content operations

Daily content and publishing runbook for AryaTeja.com. See also `content-drafts/RUNBOOK.md` for the blog factory workflow.

## Daily loop (~30–45 min)

1. **Draft** (~15 min) — agents generate fact-verified blog JSON + social snippets
2. **Review** (~10 min) — human voice check, cut anything off-brand
3. **Publish** (~10 min) — merge to `blogs.json`, cover image, PR, Vercel deploy
4. **Distribute** (~10 min) — LinkedIn + X, reply to comments for 2 hours

## Source order for agents

1. `apps/web/lib/portfolio/brand.ts` — identity, links, voice
2. `PRODUCT.md` — audience, positioning, anti-references
3. `DESIGN.md` — visual direction for social assets
4. This file — operational runbook

## Editorial pillars

- **Build logs:** real shipping records from active repos
- **Case studies:** problem → constraints → outcome (verifiable)
- **Position pieces:** opinions Arya can defend with evidence
- **Field notes:** community events, teams, conversations (sourced photos)

## Voice guardrails

- Business value before technical novelty
- Every claim traces to a repo file or verifiable source
- Unverifiable → cut or mark `TODO:`
- No em-dashes, no "aspiring", no inflated metrics
- Experiments labeled honestly

## Publishing checklist

- [ ] Fact-check verdict reviewed (`rewrite_needed` → rerun or drop)
- [ ] `post` object appended to `apps/web/lib/portfolio/blogs.json`
- [ ] Cover image at `apps/web/public/blog-images/<slug>-cover.webp`
- [ ] `bun run build` passes
- [ ] PR created, reviewed, merged to `main`
- [ ] Social posts distributed with live URL

## Skills for content work

| Task | Skill |
|------|-------|
| Daily multi-channel content | `personal-brand-content` |
| Blog draft humanization | `humanizer` |
| Marketing copy | `copywriting` |
| Visual QA before publish | `impeccable` |

## Video and social assets

Use `codex/video-to-superprompt` to turn screen recordings into build specs.
Use `field-notes/motion.ts` storyboard for Remotion/Hyperframes video exports.
Social dimensions: see `banner-design` skill for platform-specific sizes.
