# Weekly GitHub Field Notes Workflow

Use this for one sourced blog draft and one short-video script each week. Drafting may be delegated. Arya approves every publication and media generation.

## 1. Intake

Add daily candidates to `apps/web/content/inbox/github-links.md`:

```text
- YYYY-MM-DD | https://github.com/owner/repo | why it may help Arya's audience
```

Do not add private repos, tokens, client details, personal phone numbers, home addresses, private email, active tunnels, QR codes, or access links.

## 2. Select

Choose three to five repos that answer one audience question. Prefer a coherent workflow over a list of unrelated trends.

## 3. Verify

For each repo, read the official GitHub README, upstream `LICENSE`, and relevant release or tag. Record:

- source URLs and access date;
- confirmed capabilities and requirements;
- current release, tag, or commit when relevant;
- license identifier and required notices;
- one risk, unknown, or non-use case.

Treat summaries, videos, and trending lists as leads only. Do not make legal, security, performance, or production-readiness claims from them.

## 4. Draft the blog

Copy `apps/web/content/blogs/ARTICLE-TEMPLATE.md` to a date-first file. Keep `"status": "draft"`.

Write in progressive order:

1. Executive summary.
2. Agent navigation with stable section links.
3. Decision table by workflow problem.
4. Plain-language use cases.
5. Demo, POC, and MVP suitability.
6. License and reuse boundaries.
7. Risks, unknowns, and primary sources.

Run the content parser test. Do not change the article to `published` until Arya approves the title, claims, visual, CTA, and sources.

## 5. Draft the short-video script

Explain one use case, not the whole article:

- 0 to 3 seconds: the workflow problem.
- 3 to 10 seconds: why the usual approach fails.
- 10 to 40 seconds: one repo and a visible example.
- 40 to 55 seconds: license or safety boundary.
- 55 to 60 seconds: practical next step and article URL.

Create a visual shot list and captions. Keep Remotion, Hyperframes, voice generation, uploads, and social publishing off until human approval.

## 6. Human gate

Arya reviews facts, license wording, screenshots, voice script, pronunciation, CTA, and privacy. After approval, generate media using environment-variable names only. Never print or commit API keys.
