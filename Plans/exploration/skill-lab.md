# Skill-Lab exploration (Arya)

Date: 2026-05-02. Tooling-root: `/Users/aryateja/Projects/skill-lab` (isolated venv only).

## What it is

[Skill-Lab](https://github.com/8ddieHu0314/Skill-Lab) (`skill-lab` on PyPI) is an **agent-skills evaluation CLI** (`sklab`). It runs **static analysis** across ~37 checks (structure, naming, description, content, security), assigns a **0–100 score**, and can optionally run an **LLM quality review** or **trigger tests** (those need API keys / Claude CLI). With **`--skip-review`**, evaluation is **static-only**—no model calls.

## Install steps actually taken (with paths)

1. **Repo:** `cd /Users/aryateja/Projects && git clone https://github.com/8ddieHu0314/Skill-Lab.git skill-lab` (repo already present; `git pull` path not needed on this run).
2. **README:** `cat /Users/aryateja/Projects/skill-lab/README.md`
3. **Isolated environment (no global install):**
   - `cd /Users/aryateja/Projects/skill-lab`
   - `uv venv .venv` → **CPython 3.13.13** at `/Users/aryateja/Projects/skill-lab/.venv`
   - `source .venv/bin/activate` (per session)
   - `uv pip install skill-lab` → installed **`skill-lab==0.7.0`** (+ deps) into that venv
4. **Verify:** `sklab --help` succeeded from the activated venv.

**Run pattern used:** `cd /Users/aryateja/Projects/skill-lab && . .venv/bin/activate && sklab evaluate <skill-dir> --skip-review`

## Skill scores (table: skill name, score, top 3 issues)

### Personal website — `.agents/skills/` (static-only)

| Skill | Score | Top issues (priority) |
|--------|-------|------------------------|
| copywriting | **96.9** | Non-standard frontmatter: `version` → move to `metadata`; no fenced **code examples** (`content.has-examples`). |
| frontend-design | **98.8** | No fenced code examples. |
| humanizer | **94.9** | `allowed-tools` must be **space-delimited string**, not YAML list; `version` in top-level frontmatter; no code examples. |
| vercel-react-best-practices | **99.0** | **Extra paths** at skill root: `AGENTS.md`, `rules/` → move under `references/`, `assets/`, or `scripts/` per spec dirs check. |

All four **passed** static analysis (`overall_pass` / PASS in CLI).

### `~/.pi/agent/skills/*` (Tommy / Pi layout)

Only **two** directories contained a `SKILL.md`. **Eight** others are empty of `SKILL.md`; **two** symlinks resolve to paths that **do not exist** on this machine.

| Path / name | Score | Top issues |
|-------------|-------|------------|
| `background-computer-use` | **99.0** | `bcu.sh` at skill root flagged as outside spec dirs → move to `scripts/` / `references/` / `assets/`. |
| `interaction-shell` | **100.0** | None in static pass (32/32 checks). |
| `active-listener`, `build-verify`, `cmux-swarm`, `conversational-response`, `delegate`, `mental-model`, `north-star-check`, `zero-micromanagement` | *n/a* | **`sklab evaluate` error:** no `SKILL.md` — not treated as a skill folder. |
| `autofix`, `code-review` (symlinks → `../../../.agents/skills/...`) | *n/a* | **Broken target:** resolves to `/Users/aryateja/.agents/skills/...` which is **missing** here; `sklab` reports path does not exist. |

*Note:* The user message referenced “7 Tommy skills”; on disk, **most** `~/.pi/agent/skills/` entries are placeholders without `SKILL.md`, so Skill-Lab cannot score them until content exists or paths are fixed.

## Most actionable findings

1. **`humanizer` — `allowed-tools` format:** Switch from YAML list to a single string, e.g. `allowed-tools: "tool1 tool2"`, to satisfy `frontmatter.allowed-tools-format`.
2. **`copywriting` / `humanizer` — `version` field:** Move `version` under `metadata:` map for spec-aligned frontmatter.
3. **`vercel-react-best-practices` — layout:** Relocate `AGENTS.md` and `rules/` into allowed subfolders so `structure.files-outside-spec-dirs` passes.
4. **Low-hanging quality:** Add **minimal fenced code examples** to `copywriting`, `frontend-design`, and `humanizer` to clear `content.has-examples` (marked LOW severity).
5. **Pi skill hygiene:** Populate empty skill dirs with `SKILL.md` or remove them from evaluation targets; fix **symlink targets** for `autofix` / `code-review` if those skills should be evaluated.

## How to use this in CI

- **Gate** on hard failures only: `sklab check <skill-path>` exits **non-zero** on **high-severity** failures (good for PR gates). Options: `--repo` or `--all` to discover skills from repo or cwd.
- **Full static score** in CI (no API key): run `sklab evaluate <skill-path> --skip-review -f json -o sklab-report.json` and archive the JSON artifact; optionally fail if `quality_score` &lt; a threshold or `overall_pass` is false.
- **Pin tooling:** use the same pattern as this exploration — **`uv venv` + `uv pip install skill-lab`** in CI cache, then invoke `sklab` from that venv (avoid global pip).
- **Optional:** `sklab scan` for security-focused reporting; `sklab evaluate` without `--skip-review` for LLM review when secrets are available (not used here).

## Concerns / unknowns

- **Telemetry:** README states anonymous telemetry may be on by default; opt-out via `sklab telemetry disable` if CI or policy requires it.
- **Score vs. severity:** High scores can coexist with MEDIUM structural issues (e.g. frontmatter); CI should not rely on score alone if spec compliance matters—consider `sklab check` or parsing JSON for failed **medium/high** checks.
- **Trigger / generate:** Not exercised here; requires `ANTHROPIC_API_KEY` and/or Claude CLI per README.
- **`~/.pi` symlink layout:** Broken symlinks are an **environment** issue, not Skill-Lab’s; evaluation will fail until targets exist.
- **Python version:** Venv used **3.13**; package declares **3.10+** — acceptable but worth aligning CI with local if differences appear.
