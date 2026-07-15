---
{
  "slug": "why-i-bet-on-open-source-agents",
  "title": "Why I Keep Choosing Open Agent Systems",
  "description": "A practical case for inspectable, replaceable agent infrastructure and open protocols, with the tradeoffs stated plainly.",
  "excerpt": "I want business owners to control their models, data, tools, and approval boundaries. Open systems make that possible, but they also make the operator responsible for more decisions.",
  "date": "2025-11-10",
  "category": "Position",
  "tags": [
    "Open Source",
    "AI Agents",
    "MCP",
    "Local-first"
  ],
  "relatedArticles": [
    "1",
    "2"
  ],
  "status": "published"
}
---

I keep returning to one requirement for agent systems: the owner should be able to change the model, inspect the tools, control the data, and decide which actions need approval.

That does not require every component to be open source. It does require the system to avoid making one vendor the permanent owner of the workflow.

## Why this matters

An agent becomes useful when it can act across tools. It reads files, queries data, opens a browser, calls an API, or runs a command. Every new capability increases both the value and the blast radius.

If those connections are hidden inside one product, the team inherits three problems:

- It is difficult to inspect what the agent can do.
- Replacing the model may require rebuilding every integration.
- Moving sensitive work local can become impossible without changing the whole system.

Open protocols and inspectable tools do not solve security automatically. They make the boundaries visible enough to review.

## The architecture I prefer

```text
model
  -> explicit tool contract
  -> policy and approval layer
  -> local or remote execution
  -> visible result and audit trail
```

The model can change. The tool contract should stay understandable. The execution environment should hold the credentials, not the prompt. High-risk actions should stop for a human.

This is why I am interested in protocols such as [MCP](https://modelcontextprotocol.io/) and browser work such as [WebMCP](https://github.com/webmachinelearning/webmcp). They create shared ways to describe tools without forcing every agent and every website into one closed integration path.

## What openness gives me

### Inspection

I can read the code or at least inspect the request and response contract before giving an agent access to a machine or business system.

### Replaceability

I can move from a hosted model to a local model, or from one coding agent to another, without discarding the surrounding workflow.

### Local control

The repository, credentials, memory, and logs can stay on hardware the owner controls. External models can still be used deliberately when the data boundary permits it.

### Smaller experiments

Open components make it easier to test one layer at a time. I can replace the tunnel, memory store, model, or agent without pretending the entire stack must be rebuilt.

## The tradeoffs

Open systems shift responsibility to the operator. Someone still has to patch dependencies, scope credentials, review licenses, monitor exposure, and decide what gets logged.

The right promise is not "open means safe." The right promise is "open gives us enough visibility and control to build a safer workflow."

That is also why I prefer narrow tools over giant agent platforms. A small secret broker, a clear remote-control bridge, or a local memory layer is easier to reason about than a system that owns every part of the work.

## What I am building around this position

My current projects explore this idea from different angles:

- [LeCoder MConnect](https://github.com/aryateja2106/lecoder-mconnect) keeps coding-agent sessions on the host machine and adds mobile supervision.
- [lockshell](https://github.com/aryateja2106/lockshell) explores resolving credentials locally instead of exposing them to the model.
- [LeSearch](https://lesearch.ai) is moving toward a control surface for context, agents, and approvals across machines.

Each project is still responsible for proving its own security and usefulness. The shared position is simpler: business owners should not have to surrender control of their systems to gain the benefits of agents.
