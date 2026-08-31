---
title: "Remote Desktop as an Agent Fleet: Notes on Building LeScreen"
slug: "remote-desktop-agent-fleet-lescreen"
date: "2025-06-04"
excerpt: "A field note on LeScreen, Arya's v0 alpha fleet daemon for phone-accessible remote machines and AI coding agents."
tags: [agentic-ai, remote-desktop, daemon, fleet]
status: published
category: "Build Note"
related_projects: [lescreen]
---

## Status

LeScreen is Arya's open-source fleet command center for AI coding agents and remote machines. The README frames the long-term mission as a better remote desktop stack, but the current v0 alpha is narrower: the `lesd` daemon proves the agent fleet loop on real hardware.

The README marks these as shipped:

- Hub HTTP API and mobile-first web UI.
- Agent pair, heartbeat, and fleet view.
- Public exposure through Cloudflare Tunnel.
- Pre-built Linux binary download for target machines.
- Scannable SVG QR pairing.
- In-browser terminal of the hub through WebSocket PTY.

It marks remote terminal for any fleet machine, VNC desktop, Lockshell-managed credentials, ScreenCaptureKit plus WebRTC, and a native iOS app as future work.

## Who this is for

LeScreen is for people who already have machines they want to operate from somewhere else:

- Solo builders using a home workstation, Raspberry Pi, VM, or spare desktop as an agent host.
- Teams experimenting with shared agent machines.
- Operators who want fleet health and a terminal surface in one browser UI.
- Nontechnical readers who understand remote desktop and want the agent-fleet version of that idea.

The plain version: classic remote desktop lets you use a machine remotely. LeScreen asks what changes when the machine is also running a fleet of agents.

## The problem

Remote desktop tools solve one old problem: "I need to see and control that machine." Agent fleets add different problems:

- Several agents may be running at the same time.
- Each node needs health and heartbeat state.
- Closing the viewer should not kill the work.
- Pairing a new machine should not require every node to have inbound network access.
- A screen view alone does not tell you which agent host is alive.

That is why the daemon matters. In v0, `lesd` is the product surface: hub mode, join mode, pairing, heartbeats, the web UI, and WebSocket PTY.

## Architecture model

The README shows this architecture:

```text
phone / iPad / laptop browser
        |
http(s) over tailnet or cloudflared public tunnel
        |
lesd hub mode: axum + sqlite + ws
        |
heartbeat and /v1/term/local PTY
        |
lesd join-mode machines
```

The key product decision is outbound joining. Agents dial out to the hub, so a machine can join the fleet without exposing inbound ports.

That makes LeScreen different from a simple screen-sharing wrapper. The hub is the coordination point, and the browser is one view over it.

## Verified setup path from the README

The README lists this hub flow:

```bash
git clone https://github.com/aryateja2106/lescreen
cd lescreen
cargo build --release -p lesd
./target/release/lesd serve --admin-secret hunter2
```

It then says to open `http://127.0.0.1:8443/` in a browser.

To pair another machine:

```bash
LESD_ADMIN_SECRET=hunter2 ./target/release/lesd pair --label "Raspberry Pi"
```

For phone access without Tailscale on every node:

```bash
brew install cloudflared
cloudflared tunnel --url http://localhost:8443
```

The README also says to point `lesd` at the generated `*.trycloudflare.com` URL with `--public-url`.

## Security and limits

A browser-accessible fleet daemon has a wide blast radius. It can expose terminal access, process state, logs, and whatever credentials are available to the daemon.

The safe reading of the README is:

- Treat this as v0 alpha.
- Use scoped development credentials.
- Treat `--admin-secret` as sensitive.
- Do not assume VNC, full remote terminal, or managed credentials are shipped until the roadmap says they are.
- Run the documented checks before contributing:

```bash
cargo clippy --all-targets -- -D warnings
cargo test -p lesd
```

## What I learned

The useful idea is daemon-first remote access. The screen is familiar, but the daemon is the control plane.

If the daemon owns pairing, heartbeats, and terminal surfaces, reconnects become normal. If the viewer owns lifecycle, every disconnect becomes a possible incident.

## What remains unverified

- Current behavior of the planned remote terminal for any fleet machine.
- Auth and multi-client rules beyond the README's `--admin-secret` examples.
- Whether the pre-built Linux binary path is still current.
- Exact production hardening requirements for public tunnel use.

## Source

GitHub source: [https://github.com/aryateja2106/lescreen](https://github.com/aryateja2106/lescreen)
