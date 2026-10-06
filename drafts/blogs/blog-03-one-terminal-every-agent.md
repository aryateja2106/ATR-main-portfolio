---
title: "One Terminal for Every Agent on Every Machine: Building lecode"
slug: "one-terminal-every-agent-lecode"
date: "2025-09-18"
excerpt: "A field note on lecode, Arya's Rust foundation for spawning CLI coding agents and streaming their output through one JSON-RPC control surface."
tags: [agentic-ai, agent-management, orchestration, platform]
status: published
category: "Build Note"
related_projects: [lecode]
---

## Status

`lecode` is Arya's open-source agent-management platform with the thesis: "One terminal. Every agent. Every machine."

The README is careful about what exists today. Current `lecode` is:

- A Rust daemon that runs on your hardware.
- A way to spawn CLI coding agents such as Claude Code, Codex, and OpenCode on demand.
- A WebSocket JSON-RPC surface that streams agent stdout as `agent.output` notifications.
- A five-crate Rust foundation with Apache-2.0 licensing.

It is not yet a mobile app, desktop app, remote relay, TypeScript SDK, or persistent session system.

## Who this is for

`lecode` is for builders who have crossed from "I use an agent" to "I operate several agents."

That includes:

- Developers testing several CLI agents from one machine.
- Founders supervising multiple agent workflows.
- Teams that want a shared protocol before they build richer UI.
- Nontechnical readers who need the management concept: one terminal as a dispatcher, not one terminal as the place every process physically runs.

If you only run one agent in one terminal, this may be early. The value appears when location and interface drift start costing attention.

## The problem

Agent sprawl starts quietly. One terminal here, one remote shell there, one desktop app somewhere else. When a task fails, the first question becomes "where did I run that?"

The costs are concrete:

- Location coupling: you remember which machine owns which agent.
- Interface drift: every tool has different launch and stop behavior.
- No shared stream: logs and status stay attached to each tool.
- Manual routing: you open the right shell before you can even act.
- Weak audit trail: history follows the tool, not the operator.

`lecode` tries to make agent control protocol-shaped before it becomes UI-shaped.

## Architecture model

The README names one WebSocket endpoint:

```text
ws://127.0.0.1:6767/ws
```

It speaks JSON-RPC 2.0. The live methods listed in the README are:

- `agent.spawn`
- `agent.list`
- `agent.stop`
- `server.handshake`

The crate split is also explicit:

| Crate | Role |
|---|---|
| `lesearch-protocol` | JSON-RPC envelope and protocol types |
| `lesearch-daemon` | Axum WebSocket server and agent manager |
| `lesearch-providers` | Agent provider trait, Claude provider, and test provider |
| `lesearch-cli` | CLI that connects to the daemon, sends `agent.spawn`, and streams output |
| `lesearch-storage` | Session log scaffold, not wired to the daemon yet |

That is the useful boundary. The daemon owns control and streaming. Providers own how an agent process is launched. Storage is acknowledged as future work instead of being treated as shipped.

## Verified commands from the README

The README assumes Rust 1.85 or newer and uses a local checkout:

```bash
cd ~/Projects/lecode
cargo build --workspace
```

The README's test command:

```bash
cd ~/Projects/lecode
cargo test --workspace
```

The manual stream example connects the CLI to a running daemon:

```bash
cd ~/Projects/lecode
cargo run -p lesearch-cli -- --provider test --addr ws://127.0.0.1:6767
```

The README also lists an address override:

```bash
cd ~/Projects/lecode
LESEARCH_ADDR=ws://127.0.0.1:9999 cargo run -p lesearch-cli -- --provider claude
```

It explicitly says `lesearch-cli ls`, `lesearch-cli stop`, and `lesearch-cli daemon status` are planned for v0.1 and do not exist yet.

## Security and limits

A tool that can spawn agents is powerful enough to become a liability. The current README does not claim a full remote access, auth, or mobile control story.

The safe reading is:

- Treat `lecode` as a local Rust foundation.
- Do not assume session persistence, because storage is a scaffold.
- Do not assume remote relay, because the roadmap marks it as future work.
- Keep provider launches scoped to development environments until auth and authorization are documented.

## What I learned

The hard part is not making a nicer CLI. The hard part is deciding what the control surface is allowed to know and do.

The best version of `lecode` stays boring on purpose. It names agents, speaks a small protocol, streams output, and leaves room for UI later.

## What remains unverified

- Current count and status of tests beyond the README snapshot.
- How daemon entrypoint wiring has changed since the README.
- Auth and authorization behavior for non-local use.
- The future storage model for session persistence.

## Source

GitHub source: [https://github.com/aryateja2106/lecode](https://github.com/aryateja2106/lecode)
