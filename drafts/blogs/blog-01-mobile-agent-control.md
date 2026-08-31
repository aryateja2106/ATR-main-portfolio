---
title: "Controlling AI Coding Agents From Your Phone: The MConnect Product Boundary"
slug: "mobile-agent-control-lecoder-mconnect"
date: "2025-03-12"
excerpt: "A field note on why lecoder-mconnect is a phone control surface for terminal agents, not a mobile IDE, and where its guardrail boundary should stay."
tags: [agentic-ai, mobile, multi-agent, observability]
status: published
category: "Build Note"
related_projects: [lecoder-mconnect]
---

## Status

`lecoder-mconnect` is Arya's MConnect project: a CLI and phone-facing control surface for terminal-based coding agents. The README describes a public TestFlight beta, App Store review in progress, a live demo, Opik tracing, Cloudflare Tunnel pairing, guardrail levels, and support for terminal agents such as Claude Code, Gemini CLI, Cursor Agent, OpenCode, Codex, and Aider.

This article is not the implementation guide. The live guide for setup and command-by-command usage is here: [/blog/connecting-terminals-to-web-mconnect](/blog/connecting-terminals-to-web-mconnect).

This field note is about the product decision: the phone should be a control surface for a real terminal, not a second IDE.

## Who this is for

This is for builders who already run coding agents from a terminal and want to supervise work when they are away from the desk:

- Developers using Claude Code, Gemini CLI, Cursor Agent, OpenCode, Codex, Aider, or plain shell workflows.
- Founders who need approval and interruption control without moving a repo into a hosted workspace.
- Nontechnical readers who need the plain version: the code stays on the computer, and the phone becomes the review surface.

If the goal is a full cloud IDE, this is the wrong shape. MConnect is closer to remote terminal supervision.

## The problem

Coding agents are useful when they can keep working through a plan, run commands, inspect failures, and ask for a decision. The awkward part is that the decision often arrives when I am not sitting at the host machine.

A mobile control surface has to solve more than "show terminal text on a phone." It has to preserve the terminal session, keep the repository and credentials on the host, expose enough context for a human decision, and make dangerous actions harder to approve by accident.

The failure mode is simple. An agent asks to run a risky command. I see the prompt on a small screen while distracted. If the product is only a pipe to the shell, it has made the workflow more dangerous. The phone should be a cockpit, not a blind remote keyboard.

## The product boundary

The README describes this working model:

```text
Your Phone
        |
        | QR scan, WebSocket, Cloudflare Tunnel
        |
MConnect Server on your laptop
        |
Claude Code, Gemini CLI, Cursor Agent, shell
        |
Opik tracing when configured
```

That split matters:

- The host machine owns the repo, shell, credentials, and process.
- The phone sends intent and receives state.
- Cloudflare Tunnel makes the active session reachable without port forwarding.
- Opik is optional telemetry, not a requirement for basic control.
- Guardrails filter dangerous commands before they reach the agent.

The phone is not doing the coding. It is supervising a terminal that already runs somewhere I control.

## Guardrails are the product

The README names four guardrail levels:

| Level | Blocks | Needs approval |
|---|---|---|
| Default | Catastrophic commands such as `rm -rf /` and fork bombs | Force push, `npm publish` |
| Strict | Destructive operations | Any `rm`, all `git push` |
| Permissive | Catastrophic commands only | Force push only |
| None | Nothing | Nothing |

That is the part I would protect most aggressively. Mobile control is only useful if it makes approval more deliberate, not faster in the wrong way.

Use MConnect for:

- Checking a long-running agent task while away from the desk.
- Approving or denying a blocked command after reading context.
- Keeping the agent process on a machine you control.
- Monitoring several terminal workflows without opening a full remote desktop.

Do not use it as an unattended production-operations boundary. If a mistaken command can delete customer data, mobile approval is not enough.

## What the README verifies

The README verifies these claims:

- `npx lecoder-mconnect` starts the flow and shows a QR code.
- `mconnect doctor` checks Node.js, `node-pty`, Docker, `cloudflared`, and tmux.
- The CLI supports presets and guardrail levels, including `shell-only`, `single`, `research-spec-test`, `dev-review`, and `container-dev`.
- The iOS app is available through TestFlight, with App Store review in progress in the provided README.
- Opik tracing can record session, agent, command, approval, connection, security, container, and tunnel events when configured.
- Privacy posture in the README: no account is required, no cloud storage is used, sessions are ephemeral, and Opik is the only external call when configured.

## What I learned

The useful abstraction is not "phone as IDE." That is too much surface area for the wrong device.

The useful abstraction is "phone as reviewer with context and a kill switch." The agent works on the host. The phone helps me notice, decide, and stop. Anything beyond that needs a strong reason.

## What remains unverified

- Whether the App Store review status has changed since the README snapshot.
- The exact current behavior of each preset in the published npm package.
- Whether Opik trace payloads exclude all code content in every path.
- The current behavior of reconnects across mobile browser and native iOS app sessions.

## Source

GitHub source: [https://github.com/aryateja2106/lecoder-mconnect](https://github.com/aryateja2106/lecoder-mconnect)
