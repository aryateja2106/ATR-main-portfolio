---
title: "Open Agentic Coding: Notes on DeepCode's Paper2Code, Text2Web, and Text2Backend"
slug: "open-agentic-coding-paper-to-code"
date: "2026-07-12"
excerpt: "DeepCode, from HKUDS, frames agentic coding around Paper2Code, Text2Web, and Text2Backend. This field note explains the workflow pattern without claiming authorship of the upstream project."
tags: [agentic-ai, deepcode, agentic-coding]
status: published
category: "Open-source Field Note"
related_projects: [DeepCode]
---

## Why this matters

"AI writes code" is too vague to be useful. The real question is: what kind of input does the agent start from, what intermediate artifacts does it create, and how does anyone verify the result?

DeepCode is an upstream HKUDS project. Arya's copy should be treated as a fork or local reference to that upstream work, not as an authored project claim.

The upstream README frames DeepCode as open agentic coding with three named capabilities:

- Paper2Code
- Text2Web
- Text2Backend

Those are not the same problem. A research paper, a web app description, and a backend requirement all need different checkpoints.

## Who this is for

This is for:

- Builders using coding agents for more than autocomplete.
- Researchers who want runnable implementations from papers.
- Founders turning rough product descriptions into prototypes.
- Engineers deciding where human review belongs in an agentic coding loop.

It is also for nontechnical readers who want the plain-English version: the value is not that the agent types fast. The value is that the workflow can be decomposed, inspected, and corrected.

## The problem

One-shot coding fails differently for each input.

For a paper, the model can miss assumptions, notation, baselines, or evaluation conditions.

For a web app, the model may produce a static page that looks right but has no state, data flow, accessibility, or responsive behavior.

For a backend, the model may guess the data model, then build routes that do not match real persistence or auth needs.

The common bug is skipping the spec. If there is no intermediate artifact, the human can only review the final code after the agent has already made hidden decisions.

## Three pipeline shapes

Treat DeepCode's three named capabilities as three different review loops:

```text
Paper2Code:
  paper -> extracted spec -> module plan -> implementation -> validation

Text2Web:
  prompt -> screen spec -> component scaffold -> rendered preview -> iteration

Text2Backend:
  prompt -> data model -> API contract -> persistence -> tests
```

The exact upstream internals may differ. The useful lesson is the checkpoint structure: spec first, code second, validation third.

## What the upstream README documents

The README describes:

- a web interface and CLI interface
- a Python 3.13 package path through `deepcode-hku`
- source installation through the HKUDS repository
- configuration files named `mcp_agent.config.yaml` and `mcp_agent.secrets.yaml`
- OpenAI or Anthropic model configuration
- optional Brave Search or Bocha-MCP search configuration
- MCP-backed tools for search, filesystem access, fetch, repository download, file download, command execution, code implementation, code reference indexing, and document segmentation
- a Streamlit web interface and a terminal CLI entry point

Those are README claims. I did not run the upstream package or verify the current release in this workspace.

## Copyable review checklist

Use this before accepting agent-generated code:

```text
[ ] What was the input?
[ ] What spec did the agent extract?
[ ] What assumptions did it add?
[ ] What files did it create or edit?
[ ] What command proves it runs?
[ ] What test proves the core behavior?
[ ] What remains unverified?
```

This checklist is intentionally tool-agnostic. It works whether the agent is DeepCode, Codex, Claude Code, Cursor, or a local script.

## Capability notes

### Paper2Code

The right first output is not code. It is a spec extracted from the paper:

- definitions
- equations
- assumptions
- inputs and outputs
- expected metrics or examples
- known limitations

### Text2Web

The right loop includes a rendered preview. Web work cannot be fully reviewed from code text alone. The agent should render, inspect, and revise.

### Text2Backend

The data model should come before route implementation. If the schema is vague, routes and tests become guesses.

## Limits and security notes

Open source does not automatically mean safe. A transparent pipeline can still generate wrong code. It just gives the human better places to intervene.

For any agentic coding workflow:

- run generated code in a disposable workspace first
- keep secrets out of prompts and test environments
- review dependency additions
- require one command that proves the artifact runs
- require one test or check tied to core behavior

The workflow earns trust through evidence, not through the word "agentic."

## What remains unverified

- Whether Arya's fork has changes beyond the upstream HKUDS project.
- Whether the `deepcode-hku` package install path works unchanged today.
- Whether Paper2Code, Text2Web, and Text2Backend are separate entry points or modes under one runtime.
- How generated implementations are validated against source papers, screenshots, browser checks, API tests, or human feedback.
- How auth, persistence, migrations, and error responses are handled for Text2Backend.
- Whether the README's interface screenshots and demo links match the current release.

## Source

Upstream GitHub source: [HKUDS/DeepCode](https://github.com/HKUDS/DeepCode)

This article credits HKUDS as the upstream project and does not present Arya as the author of DeepCode.
