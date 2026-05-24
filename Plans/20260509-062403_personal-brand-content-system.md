---
task: Personal brand content and design system setup
slug: 20260509-062403_personal-brand-content-system
effort: extended
phase: complete
progress: 8/9
mode: interactive
started: 2026-05-09T06:24:03-07:00
updated: 2026-05-09T06:24:03-07:00
---

## Context

Arya asked to set up Codex for personal brand building, daily content creation, better design, social templates, and coordination across Codex, Claude Code, and Gemini. The request named Impeccable, Career-Ops, Browser Harness, Open Design, Beautiful HTML Templates, and Noustiny as relevant inputs.

This session should create a usable foundation without polluting the repo with heavy runtimes, MCP config, or unrelated generated state.

## Criteria

- [x] PBC-1: Inspect repo state before editing.
- [x] PBC-2: Verify linked external toolkits from public sources.
- [x] PBC-3: Use subagents for bounded repo/toolkit research.
- [x] PBC-4: Create a session PRD before executing substantive setup.
- [x] PBC-5: Fix stale content positioning that conflicts with locked brand identity.
- [x] PBC-6: Add a repo-local Codex skill for daily personal brand content.
- [x] PBC-7: Install or document the Impeccable design workflow.
- [ ] PBC-8: Run required validation for touched skills where possible.
- [x] PBC-9: Summarize open questions for Arya's daily content cadence.

Anti-criteria:

- [ ] PBC-A1: Do not edit `.cursor/` or add `.mcp.json`.
- [ ] PBC-A2: Do not commit without explicit approval.
- [ ] PBC-A3: Do not vendor heavy external apps into the website repo.
- [ ] PBC-A4: Do not add real secrets or account tokens.

## Decisions

2026-05-09:

- Install Impeccable as the only repo-local third-party Codex skill because it ships a Codex-native `.agents/skills/impeccable` bundle.
- Treat Open Design as an external workbench/reference because its skills often assume the Open Design daemon and environment variables.
- Treat Beautiful HTML Templates as reference material for decks and social formats, not website runtime code.
- Treat Career-Ops as an operating-model reference for proof points, trackers, and structured evaluation.
- Treat Browser Harness and Canva as opt-in tools because they touch real browser/profile or external design-account surfaces.

## Verification

- `git status --short --branch` showed branch `codex/Refine-design` and a dirty tree before edits.
- Public toolkit facts were checked from GitHub project pages and local shallow clones under `/tmp/codex-toolkit-research`.
- Added `.agents/skills/personal-brand-content` with Codex metadata and references.
- Installed `.agents/skills/impeccable` from `pbakaus/impeccable`.
- `~/.config/scripts/skill-eval.sh .agents/skills/personal-brand-content` and `~/.config/scripts/skill-eval.sh .agents/skills/impeccable` both exited 3 because `/Users/aryateja/Projects/skill-lab/.venv` is missing.
- `npx --yes impeccable detect --fast --json apps/web` ran and found existing design anti-patterns in the app, including gradient text, pure black backgrounds, gray-on-color text, a side-tab border, and a purple gradient.
- `bun run check-types` passed from the repo root.
