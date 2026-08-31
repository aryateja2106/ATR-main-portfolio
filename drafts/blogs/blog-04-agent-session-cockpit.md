---
title: "A session browser for every coding agent: notes on Agent Sessions"
slug: "agent-session-cockpit"
date: "2024-11-08"
excerpt: "A source-backed field note on Agent Sessions, an upstream macOS app for browsing, searching, and resuming local AI coding sessions."
tags: [agentic-ai, agent-observability, tooling]
status: published
category: "Open-source Field Note"
related_projects: [agent-sessions]
---

## Status

`agent-sessions` is a fork/reference project in Arya's workspace, not an Arya-authored upstream project. The upstream macOS app is by `jazzyalex`.

The README describes Agent Sessions as a local-first macOS app for browsing, searching, and resuming AI coding sessions across Codex, Claude, Hermes, Cursor, Gemini, GitHub Copilot, OpenCode, OpenClaw, and Pi CLI surfaces.

The current README snapshot says it requires macOS 14+, is MIT licensed, has no telemetry, and keeps session history local. It also describes Agent Cockpit as a beta live command center for active iTerm2 Codex CLI, Claude CLI, and OpenCode CLI sessions.

## Who this is for

This is for anyone whose work history is split across agent tools:

- Developers switching between Claude Code, Codex, Gemini, OpenCode, Copilot, Cursor, and local-model tools.
- Solo builders who need to find the session where a decision was made.
- Teams that want an audit trail of agent work without forcing everyone into one agent.
- Nontechnical readers who need the simple version: this is a search and resume app for agent work history.

If you only use one agent and never need old context, this may not matter yet. If you have ever thought "which tool did I use to fix that bug?", it matters.

## The problem

Agent work creates history, but that history is fragmented. Each tool stores sessions in its own format and location. Some expose resume flows. Some bury useful context in local files.

The result is a weak memory system:

- Search is per tool.
- Resume is per tool.
- Archiving is manual.
- Active sessions are hard to compare.
- Rate and usage views are scattered.

That is not a model-quality problem. It is an operations problem.

## What the README verifies

The README verifies these product surfaces:

- Unified browse and search across supported local agent session stores.
- Unified Search and in-session Find.
- Readable tool calls, tool outputs, prompts, and errors.
- Right-click "Copy Resume Command" for Claude CLI, Codex CLI, OpenCode CLI, GitHub Copilot CLI, and Gemini CLI sessions.
- Local-only indexing for large histories.
- Agent Cockpit beta for active iTerm2 sessions.
- Optional Sparkle update checks as the only named network activity.

The README also lists these default read-only session locations:

```text
~/.codex/sessions
~/.claude/sessions
~/.gemini/tmp
~/.copilot/session-state
~/.cursor/projects
~/.cursor/chats
~/.factory/sessions
~/.factory/projects
~/.local/share/opencode/opencode.db
~/.local/share/opencode/storage/session
```

## Verified install and development commands

The README lists a DMG release and a Homebrew cask:

```bash
brew tap jazzyalex/agent-sessions
brew install --cask agent-sessions
```

For development, it lists:

```bash
xcodebuild -project AgentSessions.xcodeproj -scheme AgentSessions -configuration Debug -destination 'platform=macOS' build
```

And tests:

```bash
xcodebuild -project AgentSessions.xcodeproj -scheme AgentSessionsTests -destination 'platform=macOS' test
```

## Security and privacy limits

The local-first posture is the most important claim in the README:

- Session data stays on the Mac.
- No telemetry, analytics, remote logging, advertising identifiers, or session-history uploads.
- The app reads selected folders and supported defaults.
- It builds local indexes and databases.
- Explicit actions may open Terminal or iTerm2 resume commands.

Those claims make the app useful for sensitive agent work, but they also mean the local index itself should be treated as sensitive. Session history can contain prompts, repo paths, tool output, and accidental secrets.

## What I learned

The useful product is not a better chat history page. It is a memory surface for work.

Search answers "what happened?" Resume answers "can I continue from there?" Cockpit answers "what is active right now?" Those belong together because they are the operator loop.

## What remains unverified

- Whether Arya's fork differs materially from upstream.
- Exact resume command behavior for every supported agent.
- Current behavior of live Claude usage tracking.
- Whether every listed desktop-app session source still matches current vendor storage formats.

## Source

GitHub source: [https://github.com/jazzyalex/agent-sessions](https://github.com/jazzyalex/agent-sessions)
