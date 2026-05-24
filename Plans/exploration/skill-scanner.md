# Cisco AI Skill Scanner — exploration (Arya)

Date: 2026-05-02. Work stayed under `/Users/aryateja/Projects/skill-scanner` (clone, venv, SARIF/JSON artifacts). No LLM keys, no `--use-llm`, no `--use-aidefense`. `~/.pi/agent/skills/` was scanned read-only; nothing there was modified.

## What it is (vs Skill-Lab)

**Skill Scanner** ([`cisco-ai-defense/skill-scanner`](https://github.com/cisco-ai-defense/skill-scanner), PyPI `cisco-ai-skill-scanner`) is a **security-oriented** scanner for agent skill packages (Cursor Agent Skills, Codex-style skills, and with `--lenient` looser layouts such as Claude Code command folders). It layers **static** rules (YAML signatures + YARA), **bytecode** analysis, a **pipeline** orchestrator, optional **behavioral** dataflow analysis, and (not used here) LLM semantic review, VirusTotal, and Cisco AI Defense. Output includes SARIF for GitHub Code Scanning. The README states clearly that **no findings ≠ safe**—coverage is best-effort.

**Skill-Lab** (see `Plans/exploration/skill-lab.md` in this repo) is a separate **`sklab` evaluation CLI**: static **quality/spec checks**, a 0–100 score, optional LLM review and trigger tests. It optimizes for **structure, examples, and spec compliance**, not the same **threat taxonomy** (prompt injection, exfiltration patterns, obfuscation signals) that Skill Scanner targets.

**Summary:** Skill-Lab answers “does this skill look well-formed and high quality?” Skill Scanner answers “does this skill match known malicious or risky patterns?” They complement each other; neither replaces human review for high-stakes use.

## Install steps actually taken

1. **`~/Projects`:** `git clone https://github.com/cisco-ai-defense/skill-scanner.git skill-scanner` — remote already cloned; subsequent `git pull` reported “Already up to date.”
2. **README:** Read `/Users/aryateja/Projects/skill-scanner/README.md` (first ~200 lines).
3. **Isolated venv:** `cd /Users/aryateja/Projects/skill-scanner` then:
   - `uv venv .venv` → **failed** because `.venv` already existed (`Use --clear to replace`).
   - **Actual:** `source .venv/bin/activate` then `uv pip install cisco-ai-skill-scanner` (package already satisfied / checked from cache on repeat).
   - Python in venv: **CPython 3.13.13**.
4. **Verify:** `skill-scanner --help` succeeded.

## Scans performed

| Target | Command notes |
|--------|----------------|
| Personal website | `skill-scanner scan-all "/Users/aryateja/Desktop/Work/personal-website/.agents/skills/" --recursive --lenient --use-behavioral` |
| Pi agent skills | Same flags, path `/Users/aryateja/.pi/agent/skills/` |

**Why `--use-behavioral`:** Step 5 listed `--recursive --lenient` only; the same instruction asked for **static + behavioral + bytecode** without LLM. Upstream enables behavioral analysis only with `--use-behavioral`; core analyzers still include static, bytecode, and pipeline.

**Artifacts (under `~/Projects/skill-scanner/`):**

- JSON: `scan-personal-website.json`, `scan-pi-skills.json` (for summarizing counts).
- SARIF: `results-personal-website.sarif`, `results-pi-skills.sarif` via `--format sarif --output <path>`.

Lenient mode logged fallbacks for `vercel-react-best-practices/rules` and `copywriting/references` (no `SKILL.md`; scanned bundled `.md` files instead).

## Findings summary (HIGH / CRITICAL counts per skill)

**Totals — personal-website tree:** 6 skill bundles scanned, **18** findings, **0 CRITICAL**, **0 HIGH** (14 LOW, 4 INFO).

**Totals — `~/.pi/agent/skills/`:** 2 skill bundles scanned, **6** findings, **0 CRITICAL**, **0 HIGH** (4 LOW, 2 INFO).

| Scope | Skill / logical bundle | CRITICAL | HIGH | Total findings |
|--------|------------------------|----------|------|----------------|
| personal-website | copywriting | 0 | 0 | 4 |
| personal-website | frontend-design | 0 | 0 | 3 |
| personal-website | vercel-react-best-practices | 0 | 0 | 3 |
| personal-website | humanizer | 0 | 0 | 4 |
| personal-website | rules *(nested under vercel-react-best-practices)* | 0 | 0 | 2 |
| personal-website | references *(nested under copywriting)* | 0 | 0 | 2 |
| ~/.pi/agent/skills | interaction-shell | 0 | 0 | 3 |
| ~/.pi/agent/skills | background-computer-use | 0 | 0 | 3 |

## Top 5 individual findings worth investigating

1. **`HIDDEN_DATA_FILE` on `.sklab/config.yaml` (LOW)** — Appears across multiple skills. These are **Skill-Lab** config trees, not covert payloads; worth confirming whether to exclude `.sklab/` from security scans or accept recurring LOW noise in Code Scanning.
2. **`HIDDEN_DATA_FILE` on `.sklab/evals/*.json` (LOW)** — Eval artifacts with dotted paths; same “benign but noisy” pattern as above.
3. **`MANIFEST_MISSING_LICENSE` (INFO)** — Several `SKILL.md` files omit a `license` frontmatter field; easy hygiene fix if you want cleaner SARIF and clearer redistribution terms.
4. **`SOCIAL_ENG_VAGUE_DESCRIPTION` (LOW)** on **`rules`** and **`references`** — Lenient mode synthesizes minimal metadata for nested folders; descriptions are **placeholder-short**, triggering “vague description” rules. Improves with real `SKILL.md` + description or scanning only top-level skills.
5. **Behavioral analyzer produced no additional HIGH findings** — Good signal for these trees, but **do not over-interpret**: absence of elevated severities here does not prove skills are safe against novel attacks.

## CI integration recommendation (`.github/workflows/scan-skills.yml` for personal-website?)

**Viable, with path and input tweaks.** Upstream documents a **reusable workflow** in [`docs/github-actions.md`](https://github.com/cisco-ai-defense/skill-scanner/blob/main/docs/github-actions.md): `uses: cisco-ai-defense/skill-scanner/.github/workflows/scan-skills.yml@main` with `skill_path`, optional `use_behavioral: true`, `lenient: true`, `fail_on_severity`, and `extra_args`.

For **personal-website**, skills live under **`.agents/skills/`**, not the doc default `.cursor/skills/`. Example:

```yaml
name: Scan Skills

on:
  push:
    paths: [".agents/skills/**"]
  pull_request:
    paths: [".agents/skills/**"]

jobs:
  scan:
    uses: cisco-ai-defense/skill-scanner/.github/workflows/scan-skills.yml@main
    with:
      skill_path: .agents/skills
      lenient: true
      use_behavioral: true
      fail_on_severity: high
    permissions:
      security-events: write
      contents: read
```

Requires **GitHub Advanced Security / code scanning** entitlement for SARIF upload annotations on private repos (public repos have broader support). If upload is unwanted, use a **self-hosted** workflow snippet from the same doc and archive SARIF as an artifact only.

## Concerns

- **False-positive churn from `.sklab/`** — Dot-directories trigger `HIDDEN_DATA_FILE` even when they are known tooling (Skill-Lab). Tune policy, add ignore paths if the tool supports it, or relocate tooling outside the scanned skill root in CI.
- **Lenient nested “skills”** — Subfolders like `rules/` and `references/` become separate scan units with stub metadata, inflating **vague description** findings; prefer explicit `SKILL.md` or narrower `skill_path` in CI if noise is high.
- **Coverage limits** — README and policy docs stress incomplete detection; pair scanning with **Skill-Lab** (spec/quality) and **manual review** for anything shipped to untrusted environments.
- **`fail_on_severity: high`** — Current trees had **no HIGH/CRITICAL**; if you later tighten policy (e.g. `strict`) or add rule packs, CI may start failing—plan for triage.
- **Python 3.13 locally** — Scanner requires 3.10+; align CI `python_version` with what you test (docs default 3.12).
