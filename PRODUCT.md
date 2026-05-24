# Aryateja.com Product Notes

Aryateja.com is Arya's public operating surface for building an Agentic Engineer brand. It should make the work easy to inspect, follow, cite, and reuse.

## Source of truth

- Brand strings live in `apps/web/lib/portfolio/brand.ts`.
- Content workflows live in `docs/CONTENT.md`.
- Visual direction lives in `DESIGN.md` and `docs/STYLEGUIDE.md`.
- Session execution lives in `Plans/`.

## Audience

Build for technical people who like transparent systems:

- Self-hosters and local-first builders.
- Engineers studying open-source repos before they fork or contribute.
- Security-minded people who want to know what agents can touch.
- Founder-engineers who want useful field notes, not inspirational filler.

## Brand job

The site and content system should make Arya legible as someone who can:

- Build agentic products end to end.
- Explain multi-agent orchestration in practical terms.
- Operate remote machines from mobile and desktop.
- Turn open-source exploration into daily learning assets.
- Ship in public without pretending the learning curve does not exist.

## Daily content product

The content engine produces one daily topic adapted into:

- LinkedIn post: credibility, story, practical lesson.
- X post or thread: concise technical punch.
- YouTube Short script: one visual idea, one takeaway, one closing line.
- Optional carousel or deck: reusable visual asset for LinkedIn and X.

Every post should preserve one useful artifact: source link, screenshot, workflow note, prompt, diagram, or code pointer.

## Tooling stance

- Use Codex skills from `.agents/skills/` for repo-local guidance.
- Use Impeccable for design critique and anti-pattern detection.
- Use Open Design and Beautiful HTML Templates as reference libraries unless a task explicitly needs their runtime.
- Keep Browser Harness and Canva as opt-in production tools because they touch real browser sessions or external design accounts.
- Keep Career-Ops as an operating-model reference for structured evaluation, proof points, and trackers.
