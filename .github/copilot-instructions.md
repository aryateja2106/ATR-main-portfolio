# Copilot instructions

GitHub Copilot reads this. The full project context is in **`AGENTS.md`** at the repo root.

Quick rules for inline suggestions:

- **No em-dashes (`—`)** in any generated code comments or copy. Use `,` or `:` or `.`
- **No "aspiring" / "AI PM"** language. Identity is "Agentic Engineer".
- **Run from repo root** for monorepo builds: `bun run check-types`, `bun run lint`, `bun run build`. Not from `apps/web`.
- **Bun**, not npm or pnpm. Lockfile is `bun.lock`.
- **Biome** for lint + format. Not ESLint+Prettier.
- **Drizzle** for DB. Schema in `apps/web/lib/db/schema.ts`. Two tables only post-rebuild: `newsletter_subscribers`, `contact_messages`.
- **No auth anywhere** — `next-auth` is being removed in the current rebuild.
- **Tailwind** uses CSS-variable design tokens; no hex literals in code.

For everything else, read `AGENTS.md`.
