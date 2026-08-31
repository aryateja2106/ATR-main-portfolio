---
title: "Automatic context capture for Claude Code: how claude-mem works"
slug: "automatic-context-capture"
date: "2025-04-15"
excerpt: "An open-source field note on upstream claude-mem, a Claude Code plugin for persistent memory, progressive disclosure, and searchable session context."
tags: [agentic-ai, claude-code, agent-memory]
status: published
category: "Open-source Field Note"
related_projects: [claude-mem]
---

## Status

`claude-mem` is a fork/reference project in Arya's workspace, not an Arya-authored upstream project. The upstream project is by Alex Newman, `thedotmack`.

The README describes Claude-Mem as a persistent memory system for Claude Code. It captures tool-use observations, generates semantic summaries, and makes context available to future sessions.

The README also says the plugin path is different from the npm package: `npm install -g claude-mem` installs the SDK/library only and does not register plugin hooks or set up the worker service.

## Who this is for

This post is for:

- Builders using Claude Code on the same projects repeatedly.
- Small teams that lose time re-explaining repo conventions to agents.
- Nontechnical founders trying to understand why agent memory is more than chat history.
- Anyone evaluating whether automatic memory is worth the privacy, cost, and drift risks.

Unlike `cmem`, this is not agent-agnostic first. It goes deep into Claude Code.

## The problem

Claude Code sessions are fresh by default. That is safe in one sense, but wasteful when the same repo appears again and again.

The failure modes are simple:

- Lost decisions: useful context lives in a transcript nobody reads.
- Repeated work: the agent re-learns conventions instead of reusing them.
- Wrong memory: notes can go stale.
- Context flood: raw transcript replay burns tokens and distracts the model.

The right shape is not "save everything and paste it back." The right shape is capture, compress, search, and inject only relevant context.

## What the README verifies

The README names these components:

- Lifecycle hooks: `SessionStart`, `UserPromptSubmit`, `PostToolUse`, `Stop`, and `SessionEnd`.
- A smart install checker.
- Worker service on port `37777` with a web viewer UI.
- SQLite storage for sessions, observations, and summaries.
- A `mem-search` skill.
- Chroma vector database for hybrid semantic and keyword search.
- Progressive disclosure search with `search`, `timeline`, and `get_observations`.
- `<private>` tags for excluding sensitive content from storage.
- Context configuration for controlling injected context.

That is enough to describe the memory loop without guessing at internals beyond the README.

## Verified install commands from the README

The plugin install path is:

```text
/plugin marketplace add thedotmack/claude-mem
/plugin install claude-mem
```

The OpenClaw gateway install path is:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

The README also lists a bug-report command for an installed marketplace checkout:

```bash
cd ~/.claude/plugins/marketplaces/thedotmack
npm run bug-report
```

## Architecture model

```text
Claude Code session
        |
lifecycle hooks observe activity
        |
worker service on :37777
        |
SQLite observations and summaries
        |
Chroma hybrid search
        |
progressive retrieval for later sessions
```

The important detail for nontechnical readers: memory is a lossy working aid, not the source of truth. The source of truth is still the repo, tests, docs, and human decisions.

## Security and limits

Automatic capture is powerful because it sees a lot. That is also the risk.

- Secrets must be filtered before storage.
- Compression can erase nuance.
- Relevance can be wrong.
- Agent-specific memory can create lock-in.
- A local web viewer at `http://localhost:37777` is useful, but it also means the local worker must be treated as sensitive.

For sensitive projects, inspect and delete memory before trusting automatic injection.

## Related ecosystem work

- `cmem` is the portable memory CLI from the previous piece.
- `agent-sessions` is the cockpit view over sessions.
- `claude-mem` turns session history into future Claude Code context.

## What remains unverified

- Whether Arya's fork differs materially from upstream.
- Exact behavior of the six hook scripts beyond the README summary.
- Default data directory and retention policy.
- Whether every `<private>` exclusion path covers tool outputs and summaries.

## Source

GitHub source: [https://github.com/thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)
