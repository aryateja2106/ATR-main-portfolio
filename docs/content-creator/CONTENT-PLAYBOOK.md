# Content Playbook

## Daily Workflow

Use this 60-minute flow for each content package.

| Time | Action | Output |
| --- | --- | --- |
| 0-10 min | Pick one source and one claim | Topic, pillar, source link |
| 10-20 min | Verify facts | Confirmed facts, unknowns, inferences |
| 20-35 min | Write the canonical note | 150-300 word source note |
| 35-45 min | Adapt for channels | LinkedIn draft, X draft or thread |
| 45-55 min | Plan the visual | Screenshot, carousel, or diagram brief |
| 55-60 min | Run review | Checklist complete, archive fields filled |

## Editorial Pillars

- Agentic engineering in public: what Arya built, tested, removed, or learned.
- Multi-agent orchestration: plans, handoffs, repo state, MCP minimalism, browser control, permissions, and verification.
- Remote machines from mobile: SSH, VNC, tunnels, screenshots, approvals, terminal state, and real device constraints.
- Open-source field notes: what a repo does, why it matters, what to copy, what to avoid.
- Security and self-hosting: secrets, local-first tooling, browser profiles, agent permissions, production safety, and inspection.
- Builder biography: personal lessons only when anchored in an artifact.

## LinkedIn Rules

Best use: narrative plus credibility.

Structure:

1. Hook from a real build, source, bug, or decision.
2. Short context.
3. What changed or what Arya learned.
4. 3 to 5 practical takeaways.
5. One low-pressure CTA or question.

Rules:

- Use one screenshot, carousel, or diagram.
- Keep paragraphs short.
- Do not use em dashes.
- Do not overclaim product maturity.
- Do not publish without source links and Arya approval.

## X Rules

Best use: sharp point or compact thread.

Standalone:

- Sentence 1: the claim.
- Sentence 2: why it matters.
- Sentence 3: the practical move.

Thread:

- Post 1: hook.
- Posts 2-4: evidence or steps.
- Post 5: takeaway.
- Post 6: source link or build log.

Rules:

- Make each post stand alone.
- Avoid vague hype.
- Link the source when the claim depends on a repo, release, or tool behavior.

## Review And Publishing Checklist

Before sending to Arya:

- The post has one clear claim.
- Every factual claim has a source or is marked `TODO:`.
- Current facts are checked against primary sources.
- Screenshots hide secrets, private URLs, active tunnels, QR codes, client data, and private repo paths.
- The copy does not position Arya as a job seeker, AI PM, Dallas-based operator, or crypto consultant.
- The copy does not include unsupported metrics, testimonials, security guarantees, or production claims.
- The visual has alt text.
- CTA matches the audience and does not overpromise.
- File names follow the naming rules below.

Publish only after:

- Arya approves final copy.
- Arya approves the visual.
- Public links open correctly.
- The archive entry includes source links and final URLs.

## Source Hierarchy

Use this order:

1. `apps/web/public/llms.txt` for current public profile, services, links, and warnings.
2. `apps/web/app/(portfolio)/_components/field-notes/content.ts` for current homepage content.
3. `PRODUCT.md` for site purpose, audience, positioning, and anti-references.
4. `.agents/skills/personal-brand-content/references/` for daily workflow, pillars, formats, and verification.
5. Public repo, official docs, release notes, and source files for technical claims.
6. SecondBrain notes only for private context. Do not quote or publish private context unless Arya approves it.

## Long-Form Blog Workflow

1. Copy `apps/web/content/blogs/ARTICLE-TEMPLATE.md` to a date-first file in the same folder.
2. Keep `"status": "draft"` while writing and reviewing.
3. Use JSON inside the frontmatter block. Do not switch it to YAML.
4. Add primary source links, verified screenshots, and commands that were actually run.
5. Ask Arya to approve the title, claims, visual, and CTA.
6. Change the status to `published` only after approval.
7. From `apps/web`, run `bun run content:sync` and review the generated blog index.

The site build runs the same sync automatically, so the Markdown files remain the editable source of truth.

## No-Hallucination Rules

- If a fact is missing, write `TODO:` and stop.
- If a source is old or conflicts with current site copy, use current site copy.
- If a claim is inferred, label it as inference in the draft notes.
- Do not turn plans into shipped facts.
- Do not turn "in progress" into "launched."
- Do not turn one screenshot into a general product claim.
- Do not guess dates, titles, metrics, client names, or availability.

## Topics To Avoid Or Qualify

Avoid:

- Legacy CloudAGI blockchain or crypto positioning.
- Job-search positioning.
- AI Product Manager positioning.
- Dallas-based current location.
- Private client work without approval.
- Secret storage details beyond safe public policy.

Qualify carefully:

- Security: say what was checked, not that something is secure.
- Production: say what is deployed or tested, not that it is production-ready.
- LeSearch AI: use current public wording unless Arya gives a newer status.
- MConnect: source claims from public docs or repo state.
- AI tools and protocols: use official docs for current behavior.

## File Naming

Use lowercase, date-first files for drafts:

```text
YYYY-MM-DD-pillar-short-topic.md
YYYY-MM-DD-platform-short-topic.md
YYYY-MM-DD-visual-short-topic.md
```

Examples:

```text
2026-07-12-agentic-engineering-mconnect-guardrails.md
2026-07-12-linkedin-mconnect-guardrails.md
2026-07-12-visual-mconnect-guardrails.md
```

Archive fields:

- Date.
- Topic.
- Pillar.
- Source links.
- Draft copy.
- Final copy.
- Visual brief or asset path.
- Published URLs.
- Reflection: what got easier, what felt blocked.
