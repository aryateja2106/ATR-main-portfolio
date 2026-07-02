# Codex Handoff: Archive Founder Redesign

You are starting in `/Users/aryateja/Desktop/Work/personal-website`.

Read these files first:

1. `AGENTS.md`
2. `DESIGN.md`
3. `PRODUCT.md`
4. `docs/CONTENT.md`
5. `docs/COMMUNITY.md`
6. `docs/STYLEGUIDE.md`
7. `apps/web/lib/portfolio/brand.ts`

## Context

Arya chose the **Archive Founder** design direction, with **Ivory Product** as the light companion mode. Do not use Technical Mono as the primary style. Arya has used that style elsewhere and wants this brand to feel more minimal, premium, archival, modern, and monochrome.

Primary visual reference:

- `brand-lab/luxury-03-archive-founder.html`
- Screenshot: `brand-lab/previews/luxury-03-archive-founder.png`

Secondary visual reference:

- `brand-lab/luxury-02-ivory-product.html`
- Screenshot: `brand-lab/previews/luxury-02-ivory-product.png`

Design source of truth:

- `DESIGN.md`

## Goal

Redesign the live Next.js portfolio around Archive Founder.

The site should feel like a founder's working archive of agentic systems: projects, source notes, demos, receipts, essays, and content artifacts. It should be monochrome, premium, sparse, and evidence-led.

## Hard Rules

- Do not commit without Arya's explicit approval.
- Do not edit unrelated dirty worktree files.
- Do not add `.mcp.json`.
- Do not add `.cursor/rules/`.
- Do not use em-dashes in user-facing copy or MDX.
- Do not use "AI PM", "aspiring", or Dallas positioning.
- Do not make the site terminal-green or Technical Mono.
- Do not use purple-blue gradients.
- Do not use nested cards.
- Do not use decorative blobs, bokeh, or gradient orbs.
- Use real artifacts where possible.

## Suggested Implementation Plan

1. Inspect the current app structure under `apps/web/app/(portfolio)` and `apps/web/lib/portfolio`.
2. Create a session PRD in `Plans/` before editing.
3. Update design tokens in `apps/web/app/globals.css` for Archive Founder and Ivory Product.
4. Redesign the shared portfolio shell: layout, nav, footer, background, links, buttons.
5. Redesign the homepage first:
   - Archive hero.
   - Current work records.
   - Source notes or latest posts.
   - Proof/evidence section.
   - Social/content archive section.
6. Then update key pages in order:
   - `/projects`
   - `/blog`
   - `/about`
   - `/now`
   - `/uses`
7. Keep copy grounded in `apps/web/lib/portfolio/brand.ts`.
8. Run verification from repo root:
   - `bun run check-types`
   - `bun run lint`
   - `bun run build`
9. Use Impeccable after the redesign:
   - Run `$impeccable critique apps/web` for the design review.
   - For detector-only output, run `npx --yes impeccable --json --fast apps/web`.
10. Summarize changes and do not commit.

## Current Known Risk

The repo has a dirty worktree with unrelated untracked files and generated state. Inspect `git status --short` before editing and keep changes scoped.

## Acceptance Criteria

- The live site visually matches Archive Founder more than the older teal/terminal portfolio.
- The design uses the Archive Founder token set from `DESIGN.md`.
- Light surfaces follow Ivory Product, not a separate design language.
- Homepage clearly communicates: Agentic Engineer, founder of LeSearch AI + CloudAGI, building LeCoder MConnect, San Francisco.
- Projects and notes feel like records in a working archive.
- No banned voice terms or em-dashes appear in user-facing copy.
- Typecheck, lint, and build pass, or failures are documented with exact errors.
