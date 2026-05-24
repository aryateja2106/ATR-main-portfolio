---
task: Archive Founder design system handoff
slug: 20260509-074513_archive-founder-design-system-handoff
effort: standard
phase: complete
progress: 6/6
mode: interactive
started: 2026-05-09T07:45:13-07:00
updated: 2026-05-09T07:52:22-07:00
---

## Context

Arya selected `Archive Founder` as the preferred direction and said `Ivory Product` is decent as a light shade. He explicitly does not want `Technical Mono` because he has used that style on other projects.

This session turns that decision into a concrete design system and a clean handoff for a new Codex session.

## Criteria

- [x] AFH-1: Preserve Archive Founder as the primary direction.
- [x] AFH-2: Preserve Ivory Product as the secondary light companion.
- [x] AFH-3: Explicitly reject Technical Mono as the primary style.
- [x] AFH-4: Rewrite `DESIGN.md` as the design-system source of truth.
- [x] AFH-5: Create a paste-ready new-session handoff.
- [x] AFH-6: Keep implementation scoped to docs and handoff files.

Anti-criteria:

- [ ] AFH-A1: Do not redesign the live app in this turn.
- [ ] AFH-A2: Do not commit.
- [ ] AFH-A3: Do not add MCP or Cursor rules.

## Decisions

2026-05-09:

- `Archive Founder` is the core identity: minimal, monochrome, premium, archival, source-backed.
- `Ivory Product` is the companion light mode for readable product and content surfaces.
- The next session should implement the live Next.js redesign from `DESIGN.md` using `brand-lab/luxury-03-archive-founder.html` and `brand-lab/luxury-02-ivory-product.html` as references.

## Verification

- Checked `DESIGN.md`, `HANDOFFS/20260509-archive-founder-redesign`, and this PRD for em-dashes.
- Checked the same files for non-ASCII characters.
- Confirmed the handoff folder contains `PROMPT.md`, `QUICK_START.md`, and `README.md`.
- Corrected the handoff's Impeccable detector command to match the local skill reference.
- Did not run build commands because this turn only changed docs and handoff files.
