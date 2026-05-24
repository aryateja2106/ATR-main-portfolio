---
task: Luxury mono brand variants
slug: 20260509-071547_luxury-mono-variants
effort: extended
phase: complete
progress: 6/6
mode: interactive
started: 2026-05-09T07:15:47-07:00
updated: 2026-05-09T07:15:47-07:00
---

## Context

Arya liked `System 04 | Luxury Mono` best among the prior options. He does not want Technical Mono because he has used that style for other projects.

This pass explores multiple variants inside the Luxury Mono lane. The goal is to keep the direction monochrome, minimal, premium, and modern while testing how much editorial, product, archive, and social energy the brand should carry.

## Criteria

- [x] LMV-1: Preserve Luxury Mono as the chosen direction.
- [x] LMV-2: Avoid Technical Mono and terminal-coded visuals.
- [x] LMV-3: Create multiple full-brand variant boards.
- [x] LMV-4: Include a comparison page.
- [x] LMV-5: Verify no em-dashes or non-ASCII characters in new files.
- [x] LMV-6: Capture previews and summarize tradeoffs.

Anti-criteria:

- [ ] LMV-A1: Do not redesign the live app yet.
- [ ] LMV-A2: Do not introduce non-monochrome palette drift.
- [ ] LMV-A3: Do not commit without explicit approval.

## Verification

- Created `brand-lab/luxury-index.html`, `brand-lab/luxury-variants.css`, and four Luxury Mono variants.
- Checked the new luxury files and this PRD for em-dashes and non-ASCII characters.
- Served `brand-lab/` locally on `127.0.0.1:4177`, opened all four variants with Playwright, and saved previews under `brand-lab/previews/`.
