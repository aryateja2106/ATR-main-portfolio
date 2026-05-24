# AGENTS.md — aryateja.com

Agent-readable project context. Every CLI agent that opens this folder (Claude Code, pi/Tommy, Cursor, Codex, Gemini, Amp, Copilot, OMC team workers) should read this file first.

## What this repo is

Personal brand site for **Arya Teja Rudraraju** at https://www.aryateja.com. Turbo monorepo. The shipping app lives in `apps/web` (Next.js 16 + React 19 + Tailwind, Bun package manager, deployed on Vercel).

The site is being rebuilt from a stale "AI Engineer / Automation Specialist / AI PM" portfolio into a sharp **Agentic Engineer** brand site. The rebuild plan is `.omc/plans/aryateja-com-rebuild-phase1.md` (73 atomic acceptance criteria, 9 implementation steps, 2-week timeline).

## Identity (locked — do not improvise)

> Agentic Engineer · Founder, LeSearch AI + CloudAGI · Building LeCoder MConnect · San Francisco

The canonical brand strings live (or will live, post Step 3) in `apps/web/lib/portfolio/brand.ts`. **That file is the single source of truth.** Do not duplicate brand strings elsewhere; import from `brand.ts`.

## Voice rules (lint-enforced)

- **No em-dashes** (`—`) anywhere in user-facing copy or MDX. Signals AI writing.
- **No "aspiring" / "hoping to" / "looking to break into"** language.
- **No "AI PM" / "AI Product Manager"** framing — that's the deprecated identity.
- **No "Dallas, TX"** — location is San Francisco.
- Builder-who-ships-in-public tone. Direct, technical, no corporate fluff.

CI lint scripts will enforce these. See `.omc/plans/aryateja-com-rebuild-phase1.md` AC-27 / AC-28 / AC-42.

## Audience (the people we're building for)

Builders who care about **personal software, open source, and security**:

- Self-hosters who run their own infra and want to understand what they're running
- Engineers actively hunting open-source projects to study, fork, contribute to
- People who care about how OSS is built, leveraged, and securely implemented
- The Hacker News / Lobsters / r/selfhosted overlap — terminal-first, local-first, transparency-first

Content and copy decisions should resonate with this audience. See `docs/COMMUNITY.md` (forthcoming) for full positioning.

## Architecture

- **Public portfolio surface** — `apps/web/app/(portfolio)/...`: home, /about, /projects, /blog, /faq, /now, /uses, /reading, /github-stars, /resume. Server-rendered, indexable.
- **Phase 1 backend** — Supabase (Drizzle ORM) with two tables only: `newsletter_subscribers`, `contact_messages`. Chat/auth/artifacts schema being deleted in the current rebuild branch.
- **Phase 2 (deferred)** — agent control surface at `agents.aryateja.com` on a separate subdomain.

## Stack

- Next.js 16 (App Router, Turbopack), React 19
- TypeScript, Biome (lint + format), ESLint
- Tailwind CSS, design tokens in `apps/web/app/globals.css`
- Drizzle ORM + Supabase (post-migration; `@vercel/postgres` removed)
- Three.js + react-three-fiber for the home hero
- next-auth being **removed** (no auth needed for brand site)
- Bun ≥ 1.1.20 (package manager + runtime)
- Vercel (hosting)

## Build verify (before saying "done")

From the repo **root**, not `apps/web`:

```bash
bun run check-types   # tsc --noEmit
bun run lint          # biome lint --write --unsafe
bun run build         # next build (validates everything)
```

Exit codes must be 0. No lint warnings, no type errors. Husky pre-commit runs `biome check --write --unsafe` automatically.

## Critical rules (zero exceptions)

1. **No force push.** Ever. Even on feature branches.
2. **No direct edits on `main`.** Branch from `main`, PR back.
3. **No commits without explicit user approval** unless instructed otherwise for the session.
4. **Don't touch the dirty working tree** belonging to another agent without checking with Arya first. Multiple agents work this repo in parallel.
5. **Don't add `.cursor/rules/`** — the rebuild plan deletes `.cursor/` (AC-13).
6. **Don't add `.mcp.json`** in this iteration — Arya is avoiding MCP context bloat. Use CLIs.
7. **No real secret values committed.** All env vars in `.env.local` (gitignored) or pulled from `agent-password` at runtime.
8. **Em-dashes are banned in user copy.** Lints will fail.
9. **Surgical fixes only.** Touch only what was asked. No bonus refactors.
10. **Read before modifying.** Existing patterns first, then conform.

## Coordination surfaces

| Surface | Purpose |
|---|---|
| `.omc/plans/` | Formal multi-agent plans. Currently: `aryateja-com-rebuild-phase1.md` (73 ACs). |
| `Plans/` | Working session PRDs (any agent's scratchpad with structured frontmatter). See `Plans/README.md`. |
| `Plans/exploration/` | Repo / tool evaluation reports written by sub-agents. |
| `docs/` | Engineering docs (Architecture, Database Schema, Deployment, Security, SEO-AEO, STYLEGUIDE, CONTENT). |
| `ai-helpful-docs/` | Reference docs (Next.js 15→16 migration, job-app knowledge base). |
| `mydocs/` | Implementation guides (PDF + web search guide, etc.). |

When an agent starts non-trivial work, write a PRD to `Plans/<timestamp>_<slug>.md` first. Don't execute outside that PRD.

## CLI tooling map (replaces MCP context bloat)

Arya's working theory: agents should shell out to real CLIs instead of loading MCP servers at session start. CLIs are deterministic, well-documented (`--help`), and don't bloat context windows.

| CLI | Purpose | Auth | Status (2026-05-02) |
|---|---|---|---|
| `gh` | GitHub repo / issues / PR ops | `gh auth login` (already done globally) | ✅ ready |
| `vercel` | Vercel project + deploys | `vercel login` (already done) | ✅ ready |
| `supabase` | Supabase project, DB, migrations, RLS | `supabase login` | ✅ installed via brew, **not yet logged in** |
| `linear` | Linear issues / cycles | `LINEAR_TOKEN` env var | ✅ installed via bun, **needs token** |
| `agent-password` | Local secret vault, Touch ID gated | macOS Touch ID | ✅ installed, **needs `vault init`** (Arya, Touch ID) |
| `wrangler` | Cloudflare Workers / DNS / R2 / KV | `wrangler login` | ⏳ deferred (4 crucial domains, treat with extreme care) |

For full setup, see `docs/AGENT_TOOLING.md` (forthcoming).

## Secrets strategy

- **No literal secrets in any tracked file.** Ever.
- **Local development:** `.env.local` (gitignored) for `apps/web` runtime env.
- **Agent runtime:** Use `agent-password` for any tool that needs a secret. Pattern:
  ```bash
  agent-password secrets list                       # discovery
  agent-password secrets request <id> --requester pi --reason "..."
  # Arya runs: agent-password requests approve <req-id> all   (Touch ID)
  agent-password secrets get <id> --field token --env-file /tmp/x.env
  source /tmp/x.env && rm /tmp/x.env                # use, then delete
  ```
- **Source of truth (legacy):** `~/.config/secrets.env.REVIEW` (chmod 600). Agents should migrate to `agent-password` over time, not duplicate keys into `.env.local`.

For full strategy, see `docs/SECRETS.md` (forthcoming).

## Skill evaluation pipeline (gate every new skill)

Every agent skill installed locally (under any of `~/.pi/agent/skills/`, `~/.agents/skills/`, `~/.claude/skills/`, `~/.cursor/skills/`, `~/.gemini/skills/`, or any `.agents/skills/` in this repo) is evaluated by:

```bash
~/.config/scripts/skill-eval.sh <skill-path-or-dir>
```

The pipeline runs **Skill-Lab** (quality 0-100) and **Cisco AI Defense skill-scanner** (severity-tagged threat findings). It blocks on HIGH/CRITICAL by default, supports `--strict` (also gates MEDIUM), and exits non-zero so it can be wired into CI or pre-install hooks.

A `skill-watch.sh` daemon monitors all skill dirs via fswatch and auto-evaluates new SKILL.md files; see `~/.config/scripts/skill-eval.README.md`.

## North Star

Every task gets weighed against **does this advance LeSearch AI, CloudAGI, NL2Shell, or aryateja.com (this repo)?** If none, surface to Arya before doing the work.

## When you finish a task

1. Run build verify from the root
2. Diff your changes (`git diff` and `git diff --staged`)
3. Run `~/.config/scripts/skill-eval.sh` if you touched any skill
4. Update the relevant PRD in `Plans/` (mark criteria, update phase)
5. **Do not commit unless Arya says so**
6. Summarize for Arya in your output mode (NATIVE / ALGORITHM / MINIMAL)

## See also

- `.omc/plans/aryateja-com-rebuild-phase1.md` — current 2-week rebuild plan
- `Plans/README.md` — how the Plans/ directory works
- `docs/Architecture.md` — current architecture (will update with rebuild)
- `docs/STYLEGUIDE.md` — code style (Biome, TypeScript conventions)
- `docs/SEO-AEO.md` — search + answer engine optimization runbook

---

*Last updated: 2026-05-02 by Tommy (pi). Update this file when adding new context surfaces, CLIs, or critical rules.*
