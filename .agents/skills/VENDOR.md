# Skill sources

Skills imported from external repositories for portfolio UI/UX, motion, and content workflows.

## MengTo/Skills

- **Repo:** https://github.com/MengTo/Skills
- **License:** MIT
- **Imported:** 31 skills across `codex/`, `ui/`, `web-design/`, `media/`
- **Skipped duplicates:** `copywriting` (kept portfolio-native version)

## UI UX Pro Max

- **Repo:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- **License:** MIT
- **Imported:** `ui-ux-pro-max` (core engine + CSV data), `brand`, `design`, `design-system`, `ui-styling`, `banner-design`, `slides`

## Portfolio-native

Retained and unchanged: `personal-brand-content`, `impeccable`, `humanizer`, `copywriting`, `vercel-react-best-practices`

## Updates

To refresh MengTo skills:

```bash
git clone --depth 1 https://github.com/MengTo/Skills.git /tmp/MengTo-Skills
# Re-copy desired skills from /tmp/MengTo-Skills/agent-skills/
```

To refresh UI UX Pro Max:

```bash
npm install -g ui-ux-pro-max-cli
uipro init --ai cursor
```
