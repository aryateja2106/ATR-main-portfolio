---
title: "Building an AI-safe Secret Broker: Letting Cloud LLMs Decide Without Seeing Secrets"
slug: "ai-safe-secret-broker"
date: "2026-07-12"
excerpt: "lockshell is a local secret broker where cloud LLMs produce command templates, while a local broker resolves secrets and executes without exposing values."
tags: [agentic-ai, security, local-first, secrets]
status: published
category: "Build Note"
related_projects: [lockshell]
---

## Why this matters

Agentic AI has a blunt security problem: an LLM needs to act, but the credentials required to act are exactly what you should not paste into a model prompt.

`lockshell` solves for a narrower and safer shape. The public README describes it as an AI-safe secret broker: cloud LLMs decide what to run, while Lockshell resolves secrets locally and executes commands without exposing values to the cloud LLM, chat log, process argv list, or tracked files.

That split is the key idea. The model can propose a command template. The local broker resolves named placeholders against a local vault and runs the command.

## Who this is for

This is for:

- Builders wiring LLM agents to APIs, repos, databases, or deployment tools.
- Founders who want cloud-model capability without handing secrets to hosted agents.
- Engineers designing tool calls with least privilege.
- Operators who need a simple rule: the model can request an action, but the local machine holds the credentials.

## The problem

Most agent tool setups collapse decision-making and secret custody into the same trust boundary.

Two common failures:

1. **Secrets in context.** The model sees an API key, database password, or GitHub token directly.
2. **Secrets in an overpowered tool host.** The prompt does not show the key, but the tool server can read the full environment or vault.

The real design question is not "cloud model or local model?" It is: which process is allowed to hold credentials, and what can the model ask that process to do?

## How lockshell approaches it

The README describes a template flow:

```text
Cloud LLM
  -> command template with named placeholders
  -> lockshell local broker
  -> local vault
  -> tool subprocess
  -> redacted output
```

The cloud LLM writes placeholders such as `{{LINEAR_API_KEY}}`, not the secret value. Lockshell resolves the placeholder locally, passes secrets through environment variables rather than argv, filters output through redaction, and logs the template and reason rather than the value.

The current README says the v0.1 baseline works end to end against the `agent-password` vault. It also labels the project alpha, which matters. This is useful software, but not a finished security platform.

## Capability contract

A safe broker should expose capabilities, not raw secrets:

```yaml
capability: "github:push"
allowed_repos:
  - "aryateja2106/*"
allowed_branches:
  - "feature/*"
requires_human_approval: true
broker_action: "run_command_with_local_token"
model_receives:
  - "success"
  - "failure"
  - "remote_ref"
model_never_receives:
  - "github_token"
  - "vault_path"
  - "full_env"
```

That is not the README's exact policy syntax. It is the principle the project points at: the model asks for an action, not a credential.

## What the README verifies

The README documents:

- macOS-first install through a release installer.
- build-from-source support with Rust 1.74+.
- an `agent-password` vault backend in the v0.1 baseline.
- commands for setup, registration, running templated commands, audit, status, dashboard, and diagnostics.
- a local dashboard rendered as a self-contained HTML page.
- an explicit threat model with protections and non-protections.

I am not including a full runbook here because I did not run the install path in this workspace. The article claim is architectural and source-backed, not a fresh installation report.

## Security limits

`lockshell` reduces one major risk: credential custody by the model. It does not remove every risk.

- A bad policy can still allow harmful actions.
- A compromised local machine can still access local secrets.
- A broker bug can leak secrets through logs, errors, or overly broad results.
- Redaction filters tokens, not arbitrary sensitive data returned by tools.
- The README says today's biometric gate is best-effort because the upstream `agent-password` path can degrade to login-keychain access.

Least privilege still matters: narrow credentials, scoped targets, approval for dangerous actions, local audit logs, and easy revocation.

## Lessons learned

- **Custody is the boundary.** The cloud model can reason without holding credentials.
- **Templates beat values.** Pass named placeholders across the boundary, not secret strings.
- **Policy belongs in local code.** Do not rely on a prompt to enforce security.
- **Local-first does not mean cloud-free.** It means the sensitive part stays on a machine you control.

## What remains unverified

- The current release behavior on a clean macOS machine.
- The exact contents and format of the local registry and audit files.
- The roadmap items beyond the v0.1 `agent-password` baseline.
- How the planned daemon, MCP server, native Keychain backend, and Linux support behave when shipped.

## Source

GitHub source: [aryateja2106/lockshell](https://github.com/aryateja2106/lockshell)
