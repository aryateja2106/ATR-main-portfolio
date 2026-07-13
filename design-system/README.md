# Design System — ATR Portfolio

> **Override notice:** The live site uses **Field Notes** tokens from `DESIGN.md` and `field-notes/tokens.ts` (Fraunces, Geist, JetBrains Mono, cream/terracotta). This UUPM-generated baseline provides industry reasoning, motion recipes, and QA checklists. Merge selectively — do not replace Field Notes colors/fonts without explicit approval.

See `design-system/atr-portfolio/MASTER.md` for the full generated spec.

## When to use

- Starting a new page or section → check `pages/[page].md` first, then MASTER.md
- Need UX checklist before shipping → MASTER.md Pre-Delivery Checklist
- Need motion snippets → MASTER.md Motion section
- Need industry anti-patterns → MASTER.md Avoid section

## Regenerate

```bash
python3 .agents/skills/ui-ux-pro-max/scripts/search.py \
  "developer portfolio personal brand technical creative" \
  --design-system --persist -p "ATR Portfolio" \
  --variance 7 --motion 6 --density 3 -f markdown
```
