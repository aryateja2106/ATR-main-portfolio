---
title: "Persistent agent memory from the terminal: the cmem approach"
slug: "terminal-agent-memory"
date: "2025-01-22"
excerpt: "A source-backed note on cmem, a terminal CLI for searching, streaming, and managing persistent agent memory through a local worker."
tags: [agentic-ai, agent-memory, terminal-tooling]
status: published
category: "Build Note"
related_projects: [cmem]
---

## Status

`cmem` is a Context Memory CLI for persistent AI agent memory. The README describes it as agent- and model-agnostic: any agent that can run a shell command and read stdout can use it.

The current README verifies a concrete CLI surface, a default localhost worker backend, JSON output for agents, semantic exit codes, and security behavior such as input validation and `<private>` tag stripping.

The public source is Arya's repository at `aryateja2106/cmem`.

## Who this is for

`cmem` is for people who do not want agent memory trapped inside one product:

- Developers switching between Claude Code, OpenCode, Codex, Gemini, Cursor, and local models.
- Solo builders who need project conventions and decisions to survive across sessions.
- Teams that want memory they can inspect, prune, and govern.
- Nontechnical readers who need the simple version: this is a shared notebook for agents, controlled from the terminal.

The portability problem starts when more than one tool needs the same context.

## The problem

Agent memory fails when it is locked away.

The common failure modes:

- Lock-in: one agent remembers something another agent cannot read.
- Opaqueness: you cannot see or correct what the agent thinks it knows.
- Staleness: bad facts stay in memory because no one reviews them.
- Weak portability: memory does not move cleanly between local models, hosted models, and CLI agents.
- No shell access: work happens in the terminal, but memory is hidden in an app or daemon.

The deeper point: memory should be a resource, not a feature owned by one runtime.

## Architecture model

The README describes `cmem` as a CLI that talks to a memory worker:

```text
cmem command
        |
input validation
        |
TTY output or JSON output
        |
IMemoryClient
        |
Memory Worker on 127.0.0.1:37777
        |
SQLite + FTS5, ChromaDB, SSE stream
```

The current supported backend is the memory worker. Direct SQLite and Mem0 MCP are marked as planned.

That boundary is useful. Commands do not call storage directly. They call `IMemoryClient`, and backend selection sits behind that interface.

## Verified commands from the README

The README lists these install paths:

```bash
npx cmem --help
npm i -g cmem
bun add -g cmem
```

Human terminal commands:

```bash
cmem search "authentication bug"
cmem timeline 2543 --before 5 --after 5
cmem stream
cmem stats
```

Agent-oriented JSON commands:

```bash
cmem search "auth bug" --json | jq '.data.results[].id'
cmem get 2543 --json
cmem search "JWT" --json --limit 10
cmem timeline 2543 --json
cmem get 2543 2102 --json
```

Memory management commands:

```bash
cmem remember "insight text"
cmem export-data --project <name>
cmem import-data backup.json
```

Worker and queue commands:

```bash
cmem worker status
cmem queue status
cmem queue process
cmem settings list
cmem settings set KEY value
cmem logs
```

Live streaming commands:

```bash
cmem stream
cmem stream --tmux
cmem endless on
cmem endless off
cmem endless status
```

## Why progressive disclosure matters

The README presents a three-layer retrieval model:

```text
search   -> compact results
timeline -> context around an anchor
get      -> full observation details
```

That is a practical agent pattern. Start broad, pick IDs, then fetch details only for the observations that matter. It keeps memory useful without dumping everything into context.

## Security and limits

The README verifies several important safety boundaries:

- By default, `cmem` connects only to `127.0.0.1`.
- There is no remote connection mechanism in the current implementation.
- Path traversal patterns and null bytes are rejected.
- Control characters are stripped from text inputs.
- Settings keys are validated against an allowlist.
- Observation IDs must be positive integers.
- `<private>` tags are stripped from output, with stripping also happening at the worker hook layer.
- Write operations such as `remember`, `settings set`, and `queue process` support `--dry-run`.

Memory is still sensitive. A stale memory can steer future agents, and a secret in memory can leak to every tool that reads it. The article should not imply that a CLI boundary alone solves memory governance.

## What I learned

The right comparison is not "agent memory versus no memory." The right comparison is "memory I can inspect versus memory I have to trust."

I would rather use a simple terminal memory store I can search, stream, and edit than a hidden memory system that quietly drifts.

## What remains unverified

- Current worker startup path, because the README only says a running memory worker is required.
- Whether ChromaDB is always required or only required for semantic search.

## Source

GitHub source: [https://github.com/aryateja2106/cmem](https://github.com/aryateja2106/cmem)
