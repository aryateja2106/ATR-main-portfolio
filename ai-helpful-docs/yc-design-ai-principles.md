# Designing With AI — Principles (YC Head of Design talk)

Source: "YC's Head of Design Shows You How To Design With AI" — transcript in
`ai-helpful-docs/yc-design-ai-transcript.txt`.

## Overview
AI design tools (Claude/Codex + a `soul.md` context file) let a single
non-typing designer move from idea to polished, interactive, shippable product
at near-zero cost — but only if you treat the agent as a collaborator you
*shepherd* with rich context, then fine-tune with your own disposable tools.
Taste still comes from you; the AI handles execution and surprise.

## Core principles & tactics
1. **Build a `soul.md` source of truth.** Record meetings, dump transcripts,
   add your manifesto + glossaries. "As much context as you can give the agent,
   the better."
2. **Start with a mood board** (Pinterest/Google). Bookmark sites you love —
   you don't need to know *why*; the agent analyzes the pattern.
3. **One-shot many versions, not one.** Ask for ~16 one-shot variants as
   *exploration* — "you don't expect high craft, you're using it as exploration."
4. **Build disposable tools for yourself.** A private gallery to browse
   iterations with pin/bookmark; pick pieces, discard the rest.
5. **Train the "I can build anything" muscle.** When defaults feel off, ask the
   agent to build you a modal to turn the knobs yourself, then discard it.
6. **Talk instead of type.** Voice layer for stream-of-consciousness prompts;
   iterate by speaking changes.
7. **Shepherd the vibe precisely.** Generic output comes from thin prompts.
   Feed screenshots, mood boards, copy — "then it's going to surprise you."
8. **Use real content from the start.** Article titles, event dates, names so
   the agent includes them organically.
9. **Keep one consistent visual language** across site, social cards, tickets,
   venue screens — consistency is now trivially cheap.
10. **Build custom mini-tools for repeatable assets** (speaker cards, etc.).
11. **Human taste for hero craft, AI for volume.** Hand-make the hero/cover
    where taste must show; let AI do the volume.
12. **Ship a machine-readable version** (distilled markdown + copy-to-clipboard)
    for agents.
13. **Let users prompt the product** — a "request a topic" form that opens a PR.
14. **Make feedback fun and personal** — playful, surprising cards beat dashboards.

## What this means for aryateja.com
- **Redesign:** a `soul.md` capturing Arya's positioning (lesearch.ai,
  cloudagi.ai, agent-first ethos), then one-shot 10–16 mood-board-driven
  homepage variants and pin favorites. Reuse ONE type/shader system across the
  whole site; hand-craft only the hero/portfolio pieces.
- **Content workflow:** turn each talk/case study into a `soul.md` + mood board,
  then generate notes, blog, and social cards from the same source —
  auto-generating shareable PNGs. Add an agent-friendly markdown view of the
  site. Build a private gallery to A/B drafts by voice, and consider a
  "request a topic" prompt box that opens a PR.
