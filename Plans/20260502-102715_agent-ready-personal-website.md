---
task: Make personal-website agent-ready with shared context and MCPs
slug: 20260502-102715_agent-ready-personal-website
effort: advanced
phase: execute
progress: 28/40
mode: interactive
started: 2026-05-02T10:27:15-07:00
updated: 2026-05-02T10:27:15-07:00
---

## Context

Arya wants the `personal-website` repo (turbo monorepo, Next.js 16 portfolio at apps/web) to become a fully **agent-ready workspace**. Multiple AI coding agents (Claude Code, pi/Tommy, Cursor, Gemini, Codex, Amp, OMC teams) work on this codebase — each needs:

1. **Shared context** — one source of truth describing the project, Arya's positioning, North Star, and current rebrand goals, surfaced to whichever agent is invoked.
2. **Local MCPs** — project-scoped MCP server config so any agent operating in this folder has the same tool surface (filesystem, GitHub, web fetch, possibly Linear/Notion/Vercel).
3. **Local API keys & repo access** — agents working in this folder should have GitHub repo access and the right env keys WITHOUT leaking secrets into git history.
4. **Brand / community direction** — codified positioning for AI-agent / agent-engineering community, grants, fellowships, programs, network-building.

Another Claude Code agent has been doing rebrand/restyling work in parallel. Arya will share its plan as it lands; I should build *infrastructure* that supports its content/code work, not duplicate it.

### Existing scaffolding (already in repo)

- `.agent/skills/` and `.agents/skills/` — copywriting, frontend-design, humanizer, vercel-react-best-practices (symlinks structure exists)
- `.cursor/hooks/state/`, `.gemini/skills/`, `.opencode/skills/`, `.github/skills/` — partial agent dirs (skills mostly via symlink)
- `.omc/` — OMC team coordinator state + project-memory.json (auto-generated)
- `docs/` — 14 engineering docs (Architecture, SEO-AEO, STYLEGUIDE, etc.)
- `ai-helpful-docs/`, `mydocs/` — reference material
- `Plans/` — empty (this file goes here)
- Repo: github.com/aryateja2106/ATR-main-portfolio.git, branch `main`, dirty working tree (uncommitted UI work)

### What's missing for agent-readiness

- No top-level `CLAUDE.md` / `AGENTS.md` / pi-style context shim
- No `.mcp.json` for Claude Code project-scoped MCP
- No `.cursor/rules/` (only hooks dir exists)
- No shared "agent README" pointing each agent type at the right context
- No documented brand/community/grants positioning anywhere agents can find it
- Secret strategy not defined (where do agents get GitHub PAT, OpenAI key, etc., per-folder?)
- Empty `Plans/` directory — no roadmap surfaced

## Criteria

### Phase 0 — Repo exploration (NEW, runs first via cmux fan-out)
- [x] ISC-EXP-1: agent-password repo cloned to ~/Projects/agent-password
- [x] ISC-EXP-2: agent-password builds with `cargo build`
- [ ] ISC-EXP-3: agent-password vault initialized via Touch ID (BLOCKED: needs Arya approval + presence)
- [x] ISC-EXP-4: Skill-Lab installed via uv venv at ~/Projects/skill-lab/.venv
- [x] ISC-EXP-5: Skill-Lab `sklab evaluate` run against `.agents/skills/*` (all 95-99, PASS)
- [x] ISC-EXP-6: skill-scanner installed via uv
- [x] ISC-EXP-7: skill-scanner `scan-all` run against `.agents/skills/` (0 HIGH/CRITICAL)
- [x] ISC-EXP-8: InnerWarden cloned to ~/Projects/innerwarden-study (study-only as planned)
- [x] ISC-EXP-9: All four reports written to Plans/exploration/

### Phase 1 — Universal agent context (after exploration)
- [x] ISC-1: Root `AGENTS.md` exists with project summary + tech stack
- [x] ISC-2: Root `AGENTS.md` codifies critical rules
- [x] ISC-3: Root `AGENTS.md` references `apps/web/lib/portfolio/brand.ts`
- [x] ISC-4: Root `AGENTS.md` points to `Plans/`, `.omc/plans/`, `docs/`
- [x] ISC-5: Root `AGENTS.md` documents the CLI tooling map
- [x] ISC-6: Root `CLAUDE.md` exists as a thin pointer to `AGENTS.md`
- [x] ISC-7: `.github/copilot-instructions.md` exists

### Phase 1.5 — Pi skills bug fix (added mid-session)
- [x] ISC-PI-1: 8 missing SKILL.md files written
- [x] ISC-PI-2: 2 broken symlinks repointed to ~/.agents/skills/ stubs
- [x] ISC-PI-3: All 12 pi skills score 96-100 on Skill-Lab
- [x] ISC-PI-4: All 12 pi skills 0 HIGH/CRITICAL on skill-scanner

### Phase 1.6 — Skill-eval pipeline (Arya's new request)
- [x] ISC-PIPE-1: ~/.config/scripts/skill-eval.sh written, exits 0/1/2/3
- [x] ISC-PIPE-2: ~/.config/scripts/skill-watch.sh written for fswatch daemon
- [x] ISC-PIPE-3: ~/.config/scripts/skill-eval.README.md documents usage + CI integration
- [ ] ISC-PIPE-4: launchd plist for skill-watch.sh (deferred until fswatch installed)

### Phase 2 — Community + audience
- [ ] ISC-8: `docs/COMMUNITY.md` defines audience (personal software + open source + security)
- [ ] ISC-9: `docs/COMMUNITY.md` lists target communities (HN, Lobsters, r/selfhosted, etc.)
- [ ] ISC-10: `docs/COMMUNITY.md` lists content pillars
- [ ] ISC-11: `docs/COMMUNITY.md` lists grants/fellowships seed list
- [ ] ISC-12: `docs/COMMUNITY.md` referenced from `AGENTS.md`

### Phase 3 — CLI tooling (replaces MCP scope)
- [x] ISC-13: `supabase` CLI installed (brew, 2.95.4)
- [ ] ISC-14: `wrangler` (Cloudflare) CLI installed — DEFERRED per Arya, last
- [x] ISC-15: `agent-password` installed (cargo, 0.1.0, in ~/.cargo/bin)
- [x] ISC-16: Linear CLI installed (allanhortle/linear-cli@0.3.1 via bun)
- [ ] ISC-17: `docs/AGENT_TOOLING.md` documents each CLI
- [ ] ISC-18: `AGENTS.md` references `docs/AGENT_TOOLING.md`

### Phase 4 — Secrets strategy (via agent-password + lockshell broker)
- [ ] ISC-19: `.env.agents.example` (deferred — brokered access supersedes static .env.agents)
- [ ] ISC-20: `.env.agents` gitignore (deferred)
- [x] ISC-21: `docs/SECRETS.md` documents agent-password + lockshell
- [x] ISC-22: `AGENTS.md` references `docs/SECRETS.md`

### Phase 4.5 — Lockshell secret broker (NEW, this turn)
- [x] ISC-LOCK-1: `~/.config/scripts/lockshell.sh` written, executable, smoke tested
- [x] ISC-LOCK-2: Default redactor patterns covering Linear, Anthropic, GitHub, Slack, Google, JWTs
- [x] ISC-LOCK-3: Registry / audit log / redactor file structure under `~/.config/lockshell/`
- [x] ISC-LOCK-4: Blog draft at `Plans/blog-drafts/lockshell-secret-broker.md` (~12KB, 8 min read)
- [x] ISC-LOCK-5: `docs/SECRETS.md` ties broker into agent workflow rules
- [ ] ISC-LOCK-6: Repo at `github.com/aryateja2106/lockshell` (Arya, when ready to publish)
- [ ] ISC-LOCK-7: Real end-to-end demo with vault (blocked on Arya's `agent-password vault init`)

### Phase 5 — Plans/ coordination
- [ ] ISC-23: `Plans/README.md` explains how Plans/ is used
- [ ] ISC-24: `Plans/README.md` documents `.omc/plans/` vs `Plans/` distinction
- [ ] ISC-25: `Plans/exploration/` holds the four exploration reports
- [ ] ISC-26: `Plans/README.md` referenced from `AGENTS.md`

### Anti-criteria
- [ ] ISC-A1: No real secret values committed
- [ ] ISC-A2: No modifications to Arya's already-modified files
- [ ] ISC-A3: No `.cursor/rules/` added (would conflict with rebuild AC-13)
- [ ] ISC-A4: No `.mcp.json` added in this pass
- [ ] ISC-A5: No git commits without explicit approval
- [ ] ISC-A6: No duplication of `lib/portfolio/brand.ts` content
- [ ] ISC-A7: NO `curl ... | sudo bash` of InnerWarden install (study only)
- [ ] ISC-A8: NO blind `wrangler` writes against Cloudflare (read-only first, list zones, confirm before any change)
- [ ] ISC-A9: NO global pip install (use uv or pipx)
- [ ] ISC-A10: NO system-wide cargo install without confirmation

## Decisions

- **2026-05-02:** Drop 1Password CLI in favor of `agent-password` (tartavull/agent-password) — local macOS, Touch ID gated, agent-aware request/approve flow.
- **2026-05-02:** Skip MCP setup entirely this pass (Arya's context bloat concern). CLIs only.
- **2026-05-02:** InnerWarden = study-only on macOS (Linux daemon primarily). Document install path but don't run.
- **2026-05-02:** Use cmux for parallel exploration so Arya can watch on dedicated monitor.
- **2026-05-02:** Each repo gets its own cmux workspace running cursor-agent (cheap bulk lane). InnerWarden gets codex (deep Rust reasoning).

## Verification

(populated during VERIFY)
