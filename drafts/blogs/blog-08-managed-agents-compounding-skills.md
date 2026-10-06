---
title: "Managed Agents That Compound: notes on Multica"
slug: "managed-agents-compounding-skills"
date: "2024-12-11"
excerpt: "An open-source field note on upstream Multica, a managed-agents platform for assigning work, tracking progress, and reusing skills."
tags: [agentic-ai, agent-platforms, skill-compounding]
status: published
category: "Open-source Field Note"
related_projects: [multica-arya]
---

## Status

`multica-arya` is a fork/reference project in Arya's workspace, not an Arya-authored upstream project. The upstream project is Multica by `multica-ai`.

The README describes Multica as an open-source managed agents platform: assign coding-agent work, track progress, run agents through runtimes, and reuse skills over time.

The README names supported agent CLIs including Claude Code, Codex, GitHub Copilot CLI, OpenClaw, OpenCode, Hermes, Gemini, Pi, Cursor Agent, Kimi, and Kiro CLI.

## Who this is for

This article is for:

- Builders running repeated agent work across one repo or product.
- Founders who want agent work to become more inspectable over time.
- Engineering leads evaluating whether a dashboard is real management or just prettier logs.
- Nontechnical readers who want a plain-English model for agents as teammates.

The key idea is simple: a managed agent should leave behind useful state, not just a transcript.

## The problem

Single-agent loops fail in predictable ways:

1. Assignment is ad hoc. You paste context into a prompt and hope the agent knows the right scope.
2. Progress is hard to inspect. A long run may be stuck, looping, or making progress.
3. Learning evaporates. The agent finds a workaround or learns a module boundary, then loses it when the context window closes.

Teams solve this with ownership, tickets, docs, review, and memory. A managed-agent platform tries to encode those habits in software.

## What the README verifies

The README describes these features:

- Agents as teammates, with profiles, board presence, comments, created issues, and proactive blocker reporting.
- Squads, where work can be assigned to a group led by an agent.
- Autonomous execution with enqueue, claim, start, complete or fail lifecycle states.
- Real-time progress streaming over WebSocket.
- Autopilots for recurring work through cron triggers, webhooks, or manual runs.
- Reusable skills so solutions can become team knowledge.
- Unified runtimes for local daemons and cloud runtimes.
- Multi-workspace isolation.

It also describes the architecture:

| Layer | Stack |
|---|---|
| Frontend | Next.js 16 App Router |
| Backend | Go with Chi router, sqlc, and gorilla/websocket |
| Database | PostgreSQL 17 with pgvector |
| Agent runtime | Local daemon executing supported agent CLIs |

## Verified commands from the README

The README lists Homebrew install:

```bash
brew install multica-ai/tap/multica
```

Install script:

```bash
curl -fsSL https://raw.githubusercontent.com/multica-ai/multica/main/scripts/install.sh | bash
```

Windows PowerShell install:

```powershell
irm https://raw.githubusercontent.com/multica-ai/multica/main/scripts/install.ps1 | iex
```

Setup:

```bash
multica setup
```

Self-hosting:

```bash
curl -fsSL https://raw.githubusercontent.com/multica-ai/multica/main/scripts/install.sh | bash -s -- --with-server
multica setup self-host
```

Development:

```bash
make dev
```

The README says development requires Node.js v20+, pnpm v10.28+, Go v1.26+, and Docker.

## Why skills need provenance

The interesting product claim is "compound skills." The README states that every solution can become a reusable skill for the team.

That only works if skills are inspectable. A useful skill should show:

```yaml
title: Run auth tests with UTC timezone
source_task: task-042
repo_path: apps/web
applies_to:
  - auth tests
  - date parsing
expires_when:
  - test runner config changes
  - timezone handling changes
```

That example is an evaluation shape, not a verified Multica schema. The principle is the point: memory without source, date, scope, and expiry becomes folklore.

## Security and limits

Managed agents can touch code, comments, issues, runtime machines, and memory. That makes boundaries important:

- Agents need scoped runtime access.
- Skills should not store secrets, customer data, or raw private logs.
- Autopilots need clear approval and failure behavior.
- Self-hosting requires Docker and server operations discipline.
- Cloud and local runtimes should be treated as separate trust boundaries.

The README verifies platform intent and commands. It does not prove every deployment boundary for every team.

## What I learned

Ownership beats broadcast. A named agent with scoped responsibility is easier to guide than a pool of interchangeable prompts.

Progress state is product surface. If you cannot see blocked and in-progress work, you cannot manage it.

Memory only compounds when humans can inspect and correct it.

## What remains unverified

- Whether Arya's fork differs materially from upstream Multica.
- Exact database schema for reusable skills.
- How skills are reviewed, edited, expired, and exported.
- Current behavior of the iOS mobile client under `apps/mobile/`.
- Which GHCR tags are currently published for self-hosting.

## Source

GitHub source: [https://github.com/multica-ai/multica](https://github.com/multica-ai/multica)
