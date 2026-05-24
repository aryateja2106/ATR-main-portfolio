# Plans/

Working session PRDs (Product Requirements Documents). Anything an agent does that takes more than a few minutes lives here as a structured doc with frontmatter.

## Distinction from `.omc/plans/`

| Location | Purpose | Audience |
|---|---|---|
| `.omc/plans/` | Formal multi-agent rebuild/feature plans. Single canonical source. | The whole team across days/weeks. |
| `Plans/` | Per-session working PRDs. One agent, one task, structured logs of phases. | The agent producing it; Arya reading along. |

If you find yourself drafting a multi-week plan, it belongs in `.omc/plans/`. If you're capturing a single session's reasoning + execution, it belongs here.

## File naming

```
Plans/YYYYMMDD-HHMMSS_kebab-task-description.md
```

Example: `Plans/20260502-102715_agent-ready-personal-website.md`

## Required frontmatter

```yaml
---
task: 8-word task description
slug: 20260502-102715_agent-ready-personal-website
effort: standard | extended | advanced | deep | comprehensive
phase: observe | think | plan | build | execute | verify | learn | complete
progress: N/M     # criteria passed / total criteria
mode: interactive | hands-free | dispatch | monitor
started: 2026-05-02T10:27:15-07:00
updated: 2026-05-02T10:27:15-07:00
---
```

## Required sections (populate as the session progresses)

```markdown
## Context
What the task is. Why it matters. What was requested. What was NOT requested.
Risks and prerequisites.

## Criteria
- [ ] ISC-1: atomic, verifiable criterion (one passes/fails per checkbox)
- [ ] ISC-2: ...

Anti-criteria:
- [ ] ISC-A1: things that must NOT happen

## Decisions
Dated, append-only. Why we chose X over Y.

## Verification
Per-criterion evidence (command output, file paths, diffs).
```

See `~/.claude/PAI/PRDFORMAT.md` for the full spec the PRDs follow.

## Subdirectories

- `Plans/exploration/` — reports from sub-agents that were spawned to evaluate external repos or tools. One markdown file per repo/tool.

## Anti-patterns

- Editing a PRD that belongs to another session (don't — start a new one)
- Putting code or copy here that should live in `apps/web/`
- Duplicating content from `.omc/plans/` (link to it instead)
- Committing real secrets

## Index

| File | Status | Owner |
|---|---|---|
| `20260509-062403_personal-brand-content-system.md` | build | codex |
| `20260502-102715_agent-ready-personal-website.md` | build | tommy |

(Update this index when adding new session PRDs.)
