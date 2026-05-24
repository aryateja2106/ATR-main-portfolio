---
title: Cloud Brains, Local Hands. Stop Letting Your AI Coding Agent See Your API Keys.
slug: cloud-brains-local-hands
date: 2026-05-02
status: ready
audience: personal software, open source, security
tags: [agents, security, secrets, local-first, nl2shell, agent-password, lockshell]
estimated_read: 9 min
repo: https://github.com/aryateja2106/lockshell
release: v0.1.3
---

# Cloud Brains, Local Hands

I just watched myself paste a fresh Linear API key into a Claude Code chat. Full access. Read, write, delete every issue and project in my workspace. The reasoning was the kind every developer running an agent has had at some point: *"the conversation is stored locally, so it's fine."*

It is not fine.

The conversation is stored locally. It is also sent to the model provider's servers every turn. That is two copies of a secret I generated thirty seconds ago, in two places I do not fully control, with no record of what either copy will do with it. The local copy is fine because I trust my disk. The cloud copy is fine because I trust the provider. *Probably.* I cannot prove either, and a key is the kind of thing you cannot un-leak.

This post is about the boring fix. It is also about a pattern that should be the default whenever a cloud agent runs commands on your machine.

## The default is broken

If you have ever told an AI coding agent "deploy this to Vercel" or "create a new Supabase project" or "run my migration", you have shipped one of three things up to a model provider:

1. The actual API key (you pasted it, or your `.env` ended up in the agent's context).
2. The output of a command that included the key (a token printed in a debug log, a `curl -v` trace, a JSON response with `auth` echoed back).
3. The capability itself, indirectly, because the agent's tool layer holds the key for it.

Option 3 is what most production setups use. The agent does not see the key directly. It calls a tool that has the key configured server-side. This is fine for centralised platforms. It is not fine for *my own machine*, where the secret is mine, the workflow is mine, and there is no SOC team to clean up after a leak.

What I want is the brain in the cloud and the hands on my machine. The brain decides what to run. The hands hold the key, run the command, and pass back only what is safe to share.

This is doable in a hundred lines of bash. I will show you.

## The pieces

The architecture has four parts. None of them is novel.

```
┌──────────────────────────────────────────────────────────┐
│  CLOUD LLM   intent + reasoning, no secrets             │
└────────────────────────┬─────────────────────────────────┘
                         │ command template with placeholders
                         ▼
┌──────────────────────────────────────────────────────────┐
│  LOCAL BROKER   resolves secrets, executes, redacts      │
└──────┬─────────────────────────────────────────┬─────────┘
       ▼                                         ▼
┌────────────────┐                      ┌──────────────────┐
│  LOCAL VAULT   │                      │  TOOL SUBPROCESS │
│  Touch ID gate │                      │  linear, vercel, │
│  (agent-pwd)   │                      │  supabase, ...   │
└────────────────┘                      └──────────────────┘
```

The cloud LLM produces a command with named placeholders, never values. Something like:

```
linear list --token "{{LINEAR_API_KEY}}" --status open
```

The broker on my machine sees the placeholders, asks my local vault for each one, executes the resolved command in a subprocess, then pipes the output through a redaction filter on its way back. The cloud LLM only ever sees the template it gave me and the cleaned output. The actual key value is never serialised into a chat message, an argv array, an environment variable on a parent shell, or any process I do not control.

That is the whole idea. The interesting work is in the details.

## Detail 1: The vault is the boundary

I use [`agent-password`](https://github.com/tartavull/agent-password) for the local vault. It is a small Rust CLI: encrypted SQLite, key in the macOS keychain, Touch ID gates approval. Two reasons it fits this design:

- It separates *metadata* from *secrets*. The agent can list what exists without seeing values. That alone is a quiet upgrade over `cat .env`.
- It has a request and approval flow. The agent says "I want secret X for purpose Y". I approve via Touch ID. The vault unlocks for that secret, in this session. Close the session, the unlock is gone.

You can build the same shape with `pass` plus a wrapper, with `gnupg`, with 1Password. The point is: the vault is the trust boundary. Everything outside it can be untrusted-but-useful. Everything inside it should require a fresh, observable approval.

## Detail 2: Argv is public, env is per-process

Every Unix programmer learns this twice. Once when they read the man pages, once when they run `ps -ef` on a server they share with someone and see another user's `--password` in clear text. Argv is broadcast to anyone who can see the process table. Env is per-process. If you are going to put a secret somewhere, env is the right hole.

The broker therefore never substitutes secret values into the command string and runs that. It sets the values as env vars on the subprocess, and the command refers to them by name:

```bash
env LINEAR_API_KEY="$resolved" bash -c 'linear list --token "$LINEAR_API_KEY" --status open'
```

Inside that subprocess, `$LINEAR_API_KEY` works. Outside it, in `ps`, in shell history, in any tracing layer that captures argv, the secret is invisible.

## Detail 3: Output redaction is a safety net, not a fence

Tools leak. `curl -v` prints headers. Stack traces include arguments. Misconfigured logging echoes the request. Any of these can put a secret into stdout or stderr.

The broker's last act before printing is to pipe through a redactor:

```
lin_api_[A-Za-z0-9]+      → [REDACTED]
sk-ant-[A-Za-z0-9_-]+     → [REDACTED]
ghp_[A-Za-z0-9]{20,}      → [REDACTED]
xoxb-[A-Za-z0-9-]+        → [REDACTED]
AIza[A-Za-z0-9_-]{35}     → [REDACTED]
eyJ[A-Za-z0-9_-]+\.+      → [REDACTED]
```

These are the well-known token formats. They cover Linear, Anthropic, GitHub, Slack, Google API, JWTs. Add your own. This is a safety net, not the main defence, because if the redactor misses a pattern the secret leaks. The main defence is the env-only injection above. But networks have layers, and so does this.

## Detail 4: The cloud LLM gets a thinner audit trail than your shell history

A surprising property: with this setup, the cloud LLM has *less* information about your secrets than your own shell history does. Shell history captures the resolved command. The cloud LLM never gets the resolved command. It gave a template, the broker resolved locally, the broker logged the template plus a reason locally, and the cloud LLM only saw the redacted output.

This matters when you start letting agents run on your behalf at scale. Compromise of the cloud LLM does not give the attacker your keys. Compromise of the audit log gives them a list of what you did, not what you used to do it.

The audit log itself is sensitive. It lives under `~/.config/lockshell/audit.log` with `0600` permissions, and contains *templates* and *reasons*, not values. If you write a command that hard-codes a secret instead of using a placeholder, that hard-coded value will appear in the log. Don't do that. The whole point is the placeholder.

## Lockshell v0.1.4, shipping today

It grew past 200 lines of bash. The shipping version is a Rust CLI, ~1,500 lines, Apache-2.0, distributed as a pre-built binary. Source: [`github.com/aryateja2106/lockshell`](https://github.com/aryateja2106/lockshell).

![lockshell install + multi-account demo](/images/lockshell/install-and-broker.gif)

Install on macOS:

```bash
curl -fsSL https://raw.githubusercontent.com/aryateja2106/lockshell/main/install.sh | bash
```

The installer detects your CPU architecture (Apple Silicon or Intel), downloads the matching binary from GitHub Releases, verifies its SHA-256 checksum, and installs to `~/.local/bin`. It does not modify your shell rc files; it does not install Rust or any package manager; it does not send data anywhere except GitHub. You can read it first: it is 200 lines of POSIX bash with a 4-line CLAIM at the top.

Usage, the same shape as the bash sketch but production-grade:

```bash
# One-time: register a name → vault entry mapping.
lockshell register LINEAR_API_KEY linear-api password

# Per command: the cloud LLM gives this exact line, you run it.
lockshell run --reason "list open linear issues" -- \
  'linear list --token "{{LINEAR_API_KEY}}" --status open'

# What the cloud LLM sees in its tool result:
#   the template + the redacted output. Never the resolved key.
```

Vault setup is one-time and Touch ID-gated:

```bash
agent-password vault init
agent-password session create
printf '%s' 'YOUR_KEY_HERE' | agent-password login add linear-api \
  --username you --url https://linear.app \
  --password-stdin --tag agent
```

Notice the `printf '%s' '...' | ...` pattern. The value travels through a pipe directly into the vault. It is never on argv, never in `~/.zsh_history`, never visible to other processes. You can also use `pbpaste | ...` to take it straight from the clipboard.

After that, every cloud agent that wants Linear access goes through the broker. None of them see the key.

## Multiple accounts

The most common real-world question I got while testing this: "I have three Supabase projects. How do I tell them apart?"

The naming convention is the answer. The placeholder you write is the source of truth.

```bash
# Vault: per-context vault ids
pbpaste | agent-password login add supabase-cloudagi  --username you --url https://supabase.com --password-stdin --tag agent
pbpaste | agent-password login add supabase-aryateja  --username you --url https://supabase.com --password-stdin --tag agent

# Registry: per-context placeholder names
lockshell register SUPABASE_TOKEN_CLOUDAGI supabase-cloudagi password
lockshell register SUPABASE_TOKEN_ARYATEJA supabase-aryateja password
```

Finding them later, even if you forgot what you registered:

```bash
lockshell list --grep supabase
```

The agent picks the project by which placeholder it puts in the command. There is no global "current project" state, no implicit default. When the cloud LLM says "deploy CloudAGI's migrations", it must write `{{SUPABASE_TOKEN_CLOUDAGI}}` explicitly. That explicitness is the security feature.

```bash
lockshell run --reason "push CloudAGI migrations" -- \
  'SUPABASE_ACCESS_TOKEN={{SUPABASE_TOKEN_CLOUDAGI}} supabase db push --linked'
```

The full provider playbook lives at [`docs/PROVIDERS.md`](https://github.com/aryateja2106/lockshell/blob/main/docs/PROVIDERS.md): tested setup recipes for Linear, Vercel, Supabase, GitHub, OpenAI, Anthropic, OpenRouter, and Cloudflare. Each one ends with a real working command.

## A local dashboard you can hand to anyone

A terminal is a hostile environment for someone who has not lived in one. Asking a non-technical friend to type `lockshell list --grep supabase` is asking too much. So:

```bash
lockshell dashboard
```

That command writes a self-contained HTML page to `/tmp` and opens it in your default browser. Four panels: agent-password session state, registered placeholders, recent audit entries, and quick-action commands. No daemon, no server, no extra deps. Re-run the command to refresh. The dashboard is the v0.1 ancestor of the v0.4 SwiftUI menu bar app: same data shape, just HTML now and native widgets later.

Open-tab dashboards have a quiet superpower: you can leave them open, glance at them mid-call to remember what is unlocked, and screenshot them for a teammate. The values are never in the page. The names and reasons are.

If you have never used a terminal-first secret manager before, the binary ships a beginner-friendly tour:

```bash
lockshell help-me
```

It is a single-page narrative with copy-paste recipes for Linear, GitHub, OpenAI, Anthropic, Vercel, Supabase, and Cloudflare. Designed so a friend who has never used `agent-password` can get to a working brokered API call in five minutes.

## Honesty: what got audited and what got fixed

Before I cut v0.1.3, two other agents took a pass at the source.

**Codex CLI** (GPT-5.4 in xhigh reasoning mode) ran the agent-readiness pass: install, follow `AGENTS.md` blind, try to misuse the tool. It found three issues. The most important: `lockshell doctor` was returning exit code 0 even when blocking errors were present, which would have made automated checks miss problems. Fixed in v0.1.1. Score after fix: 9 of 10.

**Gemini 2.5 Flash** then ran a security-focused review with full source access. Eleven findings. One critical (a shell-injection path: my placeholder substitution emitted `$NAME` instead of `"$NAME"`, which meant a secret value containing whitespace or shell metacharacters could break out of the intended argument boundary). One high (config files were created world-readable; `~/.config/lockshell/audit.log` was `0644`, should have been `0600`). Three mediums worth fixing now. All five are fixed in v0.1.2. The full audit report and the diff that resolved each finding live at [`docs/SECURITY_AUDIT.md`](https://github.com/aryateja2106/lockshell/blob/main/docs/SECURITY_AUDIT.md) in the repo.

I am writing this in the same blog post as the announcement because that is the only way I want to ship. Find it, fix it, name the agent that found it, link the diff. If you find more, file an issue. If you find a vulnerability, see [`CONTRIBUTING.md`](https://github.com/aryateja2106/lockshell/blob/main/CONTRIBUTING.md) § Security disclosures.

## A caveat I cannot engineer around in v0.1

The `agent-password` binary is unsigned because it is distributed via `cargo install --path .`. macOS will run it, but it cannot register a real LocalAuthentication policy with the Keychain. In practice this means the Touch ID prompt during `requests approve` is best-effort: on some macOS releases it shows up, on others it silently no-ops and the approval still goes through without biometric.

This is the kind of thing I want to be loud about. The right fix is a Developer ID-signed binary that can register a proper biometric ACL. That is on the v0.3 roadmap, paired with a native Apple Keychain backend that drops the `agent-password` dependency entirely and lets `lockshell` ship as a single signed binary that an enterprise IT team would actually approve.

## What this does not solve

A short, honest list:

- It does not protect against malicious local code. If an attacker can run binaries as my user, the vault unlocks for their process too. This is a "defend against cloud LLM and network exfil" tool, not a "defend against full local compromise" tool. For that, you want hardware security modules and a different threat model.
- It does not protect against me telling the cloud LLM the value directly, which is exactly what I just did with my Linear key. Habits beat tooling. The mitigation is to make the right path the path of least resistance, which is what `lockshell run --reason ...` is.
- It does not protect against bad scope at the source. A read-only token is still safer than a full-access token broker'd through perfect plumbing. Scope at the API provider first.
- It does not protect against the cloud LLM exfiltrating data via the *content* of redacted output. If your tool prints customer emails and the LLM gets them, that is a separate leak. Same threat model as any cloud agent, just narrower than the previous "key plus everything" version.

## Why the local model matters here

[NL2Shell](https://nl2shell.com) is a small model I have been training to translate natural language into shell commands. Less than one gigabyte. It runs on my laptop. It does not need an internet connection.

The combination is the thing. The cloud LLM is great at reasoning, planning, and writing the kind of structured intent that an experienced engineer would write. The local model is great at translating my fuzzy intent ("show me what's open in Linear assigned to me") into the concrete shell command (`linear list --status open --assignee @me`). The broker is great at running it without exposing keys.

You can build the system without the local model. The broker pattern works fine with cloud LLMs that produce concrete templates. You add the local model when you want to remove the cloud from the loop entirely for a specific category of action: "do not bother the cloud about the shape of this command; it is mechanical translation, do it locally."

That is where this is heading. The cloud LLM stays in the loop for the parts that need taste and reasoning. The local model handles the parts that need determinism and privacy. The broker is the airlock between them.

## The bigger pattern

The internet spent twenty years moving from "we trust the box on your desk" to "we trust the cloud and you have a thin client". AI agents are now reversing some of that for a specific class of action. The reasoning is in the cloud because that is where the big models live. The execution wants to be local again because execution touches data that has cost and risk.

I am building NL2Shell because I want a shell that I can trust to act on my behalf. I am building Lockshell because the shell is no good if the keys leak the moment a cloud LLM is in the loop. They are two halves of the same problem.

If this resonates, the source is here:

- [`github.com/aryateja2106/lockshell`](https://github.com/aryateja2106/lockshell) — this post's broker. v0.1.3 today.
- [`nl2shell.com`](https://nl2shell.com) — the local model.

Star them, file issues, fork them. The audience for this is people who care about personal software, open source, and security. People who want to understand what their machine is actually doing, who want to run their own infrastructure, who want their tools to be inspectable.

The roadmap from here:

- v0.2: long-running daemon, Unix-socket protocol, MCP server (so any MCP-aware agent can broker through `lockshell` natively).
- v0.3: native Apple Keychain backend, Developer ID-signed binary, biometric ACL on a real LocalAuthentication policy. This drops the `agent-password` dependency.
- v0.4: a SwiftUI menu bar app so you can see at a glance which keys are unlocked, which agents have asked for what, and revoke with one click.
- v0.5: SSH agent bridge, varlock plugin, schema-aware (`.env.schema`) integration, and the start of the Linux port.
- v1.0: passkey handler, crypto wallet signer bridge.

I would much rather hand you the recipe and the binary. Both are now available.

---

*If you have a better redactor pattern, a different threat model, or you have already built this and want to share notes, my email is on the home page. I read everything.*

*Thanks to Codex and Gemini for the audits. The bugs they found are documented at [`docs/SECURITY_AUDIT.md`](https://github.com/aryateja2106/lockshell/blob/main/docs/SECURITY_AUDIT.md). Two AI agents reviewing a tool built to keep AI agents honest is exactly the recursion this whole space deserves.*
