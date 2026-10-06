# Agent Context

Use this file when an AI assistant drafts content for Arya.

## Source Hierarchy

Trust sources in this order:

1. `apps/web/public/llms.txt`
2. `apps/web/app/(portfolio)/_components/field-notes/content.ts`
3. `PRODUCT.md`
4. `.agents/skills/personal-brand-content/SKILL.md`
5. `.agents/skills/personal-brand-content/references/*.md`
6. Public official docs and public repos for external facts.
7. SecondBrain notes for private orientation only.

If sources conflict, prefer the current public site source unless Arya says otherwise.

## Known Current Public Facts

- Name: Arya Teja Rudraraju.
- Location: India. Previously based in the United States.
- Education: MBA and MS Analytics, Duquesne University.
- GitHub: `https://github.com/aryateja2106`
- LinkedIn: `https://linkedin.com/in/arya-teja-rudraraju`
- X: `https://x.com/r_aryateja`
- Email: `aryateja2106@gmail.com`
- Status: open to consulting, collaborations, and practical agent systems work.
- Current engagement anchor: AryaTeja.com.

## Current Public Positioning

Use:

> Founder and agentic systems builder helping teams design, secure, and ship practical AI agent systems and local-first workflows.

Use these service themes:

- Secure setup and hardening for coding agents and remote agent workflows.
- Local-first AI systems.
- Agent workflow audits, prototyping, integration, and implementation support.
- Business and product framing for deciding which AI automations are worth building.

## Unknowns

Treat these as `TODO:` unless Arya provides proof:

- Current client names.
- Revenue.
- Customer outcomes.
- Exact LeSearch AI launch status beyond current public copy.
- Current MConnect package metrics.
- Testimonials.
- Benchmarks.
- Availability windows.
- Pricing.

## Agent Prompts

### Draft A Daily Package

```text
You are drafting content for Arya Teja Rudraraju. Use the source hierarchy in docs/content-creator/AGENT-CONTEXT.md. Create one daily package from the source below.

Rules:
- Do not invent facts.
- Mark unknown facts as TODO:.
- Separate confirmed facts, inferences, and draft copy.
- Do not use em dashes.
- Do not position Arya as a job seeker, AI PM, Dallas-based operator, or crypto consultant.
- Include LinkedIn, X, visual brief, CTA, source links, and review checklist.

Source:
[paste source link, notes, screenshot description, or repo path]
```

### Verify A Draft

```text
Audit this draft for Arya's content rules.

Check:
- Unsupported facts.
- Current public positioning.
- Proof boundaries.
- Secrets or private context.
- Stale CloudAGI, job-search, AI PM, Dallas, or crypto framing.
- Em dashes.
- Missing visual alt text.
- CTA fit.

Return:
- Must fix before Arya review.
- Nice to improve.
- Claims that need sources.
- Clean revised draft.
```

### Turn A Build Log Into Posts

```text
Turn this build log into channel-native content for Arya.

Output:
- Core idea in one sentence.
- Why now.
- LinkedIn post.
- X standalone post or 5-post thread.
- Visual brief.
- Source links.
- TODOs.

Constraints:
- One claim only.
- Builder-first, business-aware voice.
- No hype without proof.
- No em dashes.
```

## Final Human Gate

An agent may draft and verify. Arya or an authorized human must approve before publishing.

