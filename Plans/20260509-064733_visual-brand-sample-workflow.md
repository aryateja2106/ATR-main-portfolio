---
task: Visual brand sample workflow
slug: 20260509-064733_visual-brand-sample-workflow
effort: extended
phase: complete
progress: 7/7
mode: interactive
started: 2026-05-09T06:47:33-07:00
updated: 2026-05-09T06:47:33-07:00
---

## Context

Arya wants visual HTML samples before locking the final brand direction. The goal is to create a choice-driven workflow: view several design territories, pick what feels right, then use that choice to rewrite `DESIGN.md` and proceed into the full aryateja.com frontend redesign.

This phase produces static HTML only. It does not redesign the Next.js app yet.

## Criteria

- [x] VBS-1: Read current design notes and frontend-design skill.
- [x] VBS-2: Preserve existing dirty worktree and avoid unrelated files.
- [x] VBS-3: Create a session PRD before substantial edits.
- [x] VBS-4: Generate standalone HTML sample files that can be opened locally.
- [x] VBS-5: Include a visual choice framework for Arya.
- [x] VBS-6: Verify sample files for obvious banned copy issues.
- [x] VBS-7: Summarize next step for final `DESIGN.md`.

Anti-criteria:

- [ ] VBS-A1: Do not edit the live Next.js app in this phase.
- [ ] VBS-A2: Do not add `.mcp.json` or `.cursor/rules/`.
- [ ] VBS-A3: Do not commit without explicit approval.

## Decisions

2026-05-09:

- Create a `brand-lab/` static gallery with multiple visual territories.
- Use real brand content and social formats rather than empty moodboards.
- Keep samples framework-free so they open directly in a browser.

## Verification

Pending.

- Created `brand-lab/index.html`, `brand-lab/styles.css`, and five standalone sample HTML files.
- Checked `brand-lab/` and this PRD for em-dashes and non-ASCII characters.
- Served `brand-lab/` locally on `127.0.0.1:4177`, opened the gallery and the Control Room sample with Playwright, and saved preview screenshots under `brand-lab/previews/`.
- The only Playwright console error was a missing `favicon.ico`, which does not affect the samples.
