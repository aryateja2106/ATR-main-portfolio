# Daily content runbook: blog factory

One repeatable loop: **draft → review → publish → distribute.** Total hands-on time ≈ 30–45 min/day.

## 1. Generate drafts (~15 min, agents do the work)

From any Claude Code session in `~/Projects`:

```
ultracode: run the blog-factory workflow (scriptPath ~/Projects/.claude/workflows/blog-factory.js)
with args {"date": "<today YYYY-MM-DD>"}
```

To target specific projects instead of the default ten, pass them in `args.projects`:

```json
{"date": "2026-07-12", "projects": [
  {"name": "lecoder", "repo": "aryateja2106/lecoder-mconnect",
   "local": "/Users/aryateja/Projects/lecoder",
   "angle": "Building a local-first mobile control layer for AI coding agents"}
]}
```

Each project runs through three agents: **inventory** (fact sheet traced to real repo files) → **draft** (blog JSON + LinkedIn post + X thread + image brief) → **verify** (adversarial fact-check, fixes applied in place). Drafts land in `content-drafts/<date>/<project>.json`.

## 2. Review (~10 min, the human part)

Read each draft's `post.content`. Your voice, your judgment: cut anything that feels off. The `verdict` field tells you what the fact-checker found. Anything marked `rewrite_needed` gets rerun or dropped.

## 3. Publish (~10 min)

1. Append the chosen draft's `post` object to `apps/web/lib/portfolio/blogs.json` (assign the next numeric `id`, fill `relatedArticles` with 1–2 existing ids).
2. Generate the cover from `imageBrief.prompt` (Canva/your image tool) → `apps/web/public/blog-images/<slug>-cover.webp`.
3. `bun run build` from the repo root (or check the dev server): then commit on a feature branch, PR, merge. Vercel deploys from `main`. Branch protection now requires the PR: that's intentional.

## 4. Distribute (~10 min)

- `social.linkedin` → LinkedIn (replace `{URL}` with the live post URL).
- `social.x` → X as a short thread.
- Reply to every comment for the first 2 hours: that's the trust-building part no agent can fake yet.

## Workspaces

Run these once inside a herdr pane (they talk to the running herdr server):

```bash
herdr workspace create --cwd /Users/aryateja/Projects/lecoder --label "lecoder"
herdr workspace create --cwd /Users/aryateja/Projects/ATR-main-portfolio --label "portfolio"
```

## House rules

- Every claim traces to a repo file. Unverifiable → cut or `TODO:`.
- Drafts stay on a local branch until reviewed: never auto-publish.
- New repo? Apply the security baseline: `~/Projects/.claude/scripts/security-baseline.sh <repo>` (+ `security-md-prs.sh <repo>`).
