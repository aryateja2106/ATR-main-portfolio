---
{
  "slug": "building-lesearch-from-papers-to-action",
  "title": "What I Am Building Toward With LeSearch",
  "description": "A grounded build note on turning scattered research and agent sessions into source-backed decisions and useful control surfaces.",
  "excerpt": "LeSearch began with research workflows. The current direction is broader: help people inspect context, coordinate agents, and keep important decisions tied to evidence.",
  "date": "2026-07-12",
  "category": "Build Note",
  "tags": [
    "LeSearch",
    "Agent Systems",
    "Research",
    "Local-first"
  ],
  "relatedArticles": [
    "1",
    "3"
  ],
  "status": "published"
}
---

LeSearch started from a frustration I kept running into while learning and building: useful information was everywhere, but decisions were still manual.

A paper lived in one folder. A coding-agent session lived in another app. Notes from an event were in my phone. The command that finally worked was buried in terminal history. Search could retrieve pieces, but it did not give me a reliable view of what mattered next.

That is the problem I am building toward with LeSearch.

## Who this is for

This direction is useful for builders, researchers, and small teams working across several sources and several agents. It is especially relevant when the cost of losing context is higher than the cost of generating another answer.

For a nontechnical founder, the question is not "which model should we use?" It is simpler:

- What information can the system read?
- Which source supports this recommendation?
- Which agent is doing the work?
- What still needs a human decision?
- Can the owner move the workflow without giving up control of the data?

## The product lesson

My early instinct was to focus on research output: summaries, relationships between documents, and better ways to inspect a body of work.

The harder problem sits one level above that. A useful system has to connect research, agent sessions, approvals, and memory without turning them into one opaque black box.

The current LeSearch direction is therefore less about "chat with a PDF" and more about a control surface for work:

```text
source material
    -> bounded retrieval
    -> source-backed context
    -> agent work
    -> visible approval
    -> durable decision or artifact
```

Each arrow is a trust boundary. The user should be able to see what crossed it.

## What I can stand behind

The public LeSearch work currently shows two honest lines of exploration:

- A generative UI second-brain experiment built for an AI Tinkerers hackathon.
- A broader agent-infrastructure direction around seeing and controlling agents across machines.

These are active build directions, not evidence of a finished platform or customer outcomes. I am publishing the system thinking because it is useful on its own, while keeping product maturity separate from the idea.

## The next proof I want

The next convincing demo is small:

1. Start two agent sessions on two machines.
2. Show their state in one control surface.
3. Attach a source-backed context packet to a task.
4. Hold one sensitive action for approval.
5. Approve or reject it from a phone.
6. Save the result with its source and decision history.

That would prove more than a large feature list. It would show that context, control, and accountability can live in the same workflow.

## Source and status

LeSearch remains an active, early build. The main public codebase is organized under the [LeSearch AI GitHub organization](https://github.com/LeSearch-AI), and the current product direction is summarized on [LeSearch AI](https://lesearch.ai).

I will keep updating this note as the product earns stronger proof through working demos, screenshots, and repeatable setup steps.
