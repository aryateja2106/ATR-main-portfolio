---
title: "Building a Local-First Mobile Control Layer for AI Coding Agents"
date: TODO  # set publish date when assets are verified
excerpt: "How LeSearch AI + MConnect turn a laptop-bound coding agent into something you can monitor and approve from your phone — and where the edges (Watch approvals, the second-brain Postgres migration) still need real proof."
cover: TODO  # assign a generated cover like the MConnect article
tags: [local-first, agents, mconnect, lesearch, mobile]
status: draft  # not for publication until Apple Watch + Postgres sections are verified
---

> Editorial style: "Daily Dose" — a detailed, step-by-step walkthrough, not a
> hype post. Every claim that isn't shipped must be marked TODO and backed by a
> screenshot or a copy-pasted command output before this goes live.
>
> Source of truth: this draft is standalone. When `codex/portfolio-foundation`
> is checked out, match its frontmatter + MDX structure (see the upgraded
> "Connecting terminals to the web" article for the canonical layout, captioned
> full-color screenshots, and working copy buttons).

## The problem

Coding agents do their best work unattended — running builds, grepping a massive
codebase, applying a refactor while you're away from the laptop. But "unattended"
has a trust problem: the moment an agent wants to do something with side effects
(ship a branch, spend money, hit a production key), you're the bottleneck, and
you're probably not at a terminal.

The usual answer is a cloud dashboard. The local-first answer is different: keep
the agent on your own machines, and give yourself a thin native control surface
on the device you actually carry — phone first, watch when it earns it.

This article is the build log for that control layer, in three parts:

1. **What's shipped** — MConnect as the mobile bridge, and the `npx` command that
   stands it up.
2. **What's in progress** — iPhone approval flows.
3. **What is NOT done** — Apple Watch approvals and the second-brain Postgres
   migration. Both are explicitly **TODO** below and will not be presented as
   complete until they have fresh screenshots and verified commands.

## Part 1 — MConnect: the mobile bridge (shipped)

MConnect is the open-source bridge that puts a coding agent's terminal and long
running workflows in your pocket. It's not a new agent — it's a control plane over
the agent you already run locally.

Stand it up with:

```bash
# TODO: confirm exact flags/behavior against the current published package
npx lecoder-mconnect
```

What that gives you today:

- A remote terminal view of the agent's session (the same PTY it's running in).
- QR-based access from your phone — no port forwarding, no public ingress.
- The real MConnect demonstration screenshot lives with the MConnect article;
  reuse the assigned secure mobile-agent visual here for consistency.

> TODO: paste the actual `npx lecoder-mconnect` startup output (clean run) and
> the QR-pairing screenshot. These are the receipts for "shipped."

## Part 2 — iPhone approval flows (in progress)

The next layer is deliberate approval boundaries: the agent can *propose* an
action with side effects, and you *approve* it from your iPhone. This is the
"mission control" half of LeSearch AI.

- Status: **in progress.** Do not present as GA.
- TODO: screenshot the iPhone approval prompt (propose → approve).
- TODO: the command or API the agent calls to raise an approval request.
- TODO: what happens on timeout / denial (does the agent halt, or fall back?).

## Part 3 — Apple Watch approvals (NOT complete — do not publish as done)

Per the editorial note, Apple Watch approvals are **intentionally not presented
as complete.** They are a research direction, not a feature.

- TODO: only fill this section once there is a real Watch screenshot + a working
  flow. Until then, keep it as a "what we're exploring" note, not a claim.

## Part 4 — Second-brain Postgres migration (NOT complete — needs verification)

The "second brain" moves agent memory/context into Postgres. This is **in
progress** and currently lacks fresh screenshots and command verification.

- TODO: fresh schema/migration screenshot.
- TODO: the verified migration command and its output.
- TODO: confirmation the dev DB auth issue (see build notes) is resolved before
  any of this is shown.

## Local-first principles this enforces

- **Your machines, your network.** The agent stays local; mobile access is a
  bridge, not a re-host.
- **Approval is explicit.** Side-effecting actions wait for a human yes.
- **No public ingress by default.** QR pairing, not open ports.

## Publish checklist (all must be green)

- [ ] `npx lecoder-mconnect` output captured (clean run)
- [ ] QR pairing screenshot
- [ ] iPhone approval screenshot + flow described accurately
- [ ] Apple Watch section either verified or kept as "exploring" (not claimed)
- [ ] Postgres migration screenshot + verified command
- [ ] Dev DB auth warning resolved or explicitly noted
- [ ] Cover image assigned; matches MConnect article visual language
- [ ] Frontmatter date + tags set; `status: draft` → `published`
