---
title: "Building a Multi-Agent Task Orchestrator: the Kanban Board Boundary"
slug: "multi-agent-kanban-orchestrator"
date: "2024-09-30"
excerpt: "A build note on the claude-agent-monitor boundary: a Kanban board and dependency resolver can coordinate agent work without turning transcripts into the task database."
tags: [agentic-ai, orchestration, rust]
status: published
category: "Build Note"
related_projects: [claude-agent-monitor]
---

## Status

`claude-agent-monitor` is Arya's public multi-agent task orchestrator project. I am keeping this article at the product-boundary level: it should not claim shipped commands, repository architecture, persistence format, API shape, Rust module layout, screenshots, or install steps until those details are verified from source.

What can publish safely is the design boundary: when several coding agents work on one codebase, task state needs to live somewhere more reliable than transcripts.

## Who this is for

Use this model if you are:

- Running more than one coding agent on the same repo.
- Supervising agent work and need visible task state.
- Trying to decide whether a task is safe to parallelize.
- Building an internal agent workflow where reading every transcript no longer scales.

This is a design field note, not a verified setup guide.

## The problem

Manual orchestration breaks for boring reasons:

1. No shared source of truth. Each agent reports progress in its own transcript, and the human becomes the database.
2. Hidden dependencies. Agent B starts before Agent A finishes the refactor B depends on.
3. Double claims. Two agents grab the same task because the unclaimed state was not updated safely.
4. Mixed rollback. One agent damages a file while another makes a useful change nearby.
5. Invisible idle time. Agents wait because a dependency is blocked, but nobody sees the queue.

These are scheduling and state problems. Human teams solved part of this with task boards and dependency graphs. Agent teams need a stricter version because agents are worse at informal coordination.

## The smallest useful boundary

The smallest useful orchestrator owns three things:

- A board with task states.
- A dependency resolver.
- A claim path that prevents two agents from owning the same task.

Everything else can wait.

```text
task board
  |
  | dependencies decide what can run
  |
claim one task
  |
agent executes in its own terminal
  |
agent reports done, failed, or blocked
```

The orchestrator should own scheduling and state. Agents should own execution. Agents should not negotiate task ownership through chat.

## Copyable task card shape

This card shape is a practical minimum for agent orchestration:

```yaml
id: task-014
title: Add password reset email
status: ready
owner: unassigned
depends_on:
  - task-009
allowed_files:
  - apps/web/app/(auth)/**
  - apps/web/lib/email/**
blocked_reason:
acceptance:
  - User can request a reset email
  - Token expires
  - Existing auth tests pass
```

That is the lowest useful version of orchestration. It gives agents a contract and gives the human a review checklist.

## What not to claim yet

Until the implementation details are verified, this article should not claim:

- A Rust backend exists.
- A specific CLI exists.
- A web UI exists.
- A persistence layer exists.
- Atomic claims are implemented.
- A dependency resolver is implemented.
- Any command has been verified.

Those may be true in the repository, but this article does not rely on them yet.

## Lessons learned

- The board is memory. If state lives only in transcripts, the system has no reliable memory.
- Dependencies must be enforceable. A note saying "wait for task A" is not enough.
- File ownership matters. Two agents editing the same module need explicit coordination.
- Visible blockage is useful. A blocked task is information the system can route around.

## Security and limits

An orchestrator does not make agents safe by itself.

- It should not grant broad shell or credential access.
- It should record which agent claimed which task.
- It should make destructive operations human-approved.
- It should leave enough audit trail to review failed work.
- It should not pretend a Kanban board can solve merge conflicts or bad requirements.

For sensitive repos, combine a board with branch isolation, small file scopes, tests, and human review.

## Questions I am still testing

- Whether claims are guarded by locks, transactions, compare-and-swap, or another mechanism.
- Whether the task board is local-only, file-backed, database-backed, or service-backed.
- The current install, run, and test commands.
- The current API and persistence model.

## Source

GitHub source: [https://github.com/aryateja2106/claude-agent-monitor](https://github.com/aryateja2106/claude-agent-monitor)
