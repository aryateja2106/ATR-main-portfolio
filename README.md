# AryaTeja.com

The source for [aryateja.com](https://aryateja.com), Arya Teja Rudraraju's personal portfolio and field journal about practical AI agent systems.

The public site is intentionally small and evidence-led. It explains the work, exposes a readable working stack, publishes technical notes, and gives people or software agents a reliable way to understand the current focus.

## Product documents

- [`PRODUCT.md`](PRODUCT.md): audience, purpose, voice, boundaries, and trust principles.
- [`DESIGN.md`](DESIGN.md): visual language, responsive behavior, and component rules.
- [`docs/Architecture.md`](docs/Architecture.md): live routes, data flow, retained subsystems, and change boundaries.
- [`apps/web/public/llms.txt`](apps/web/public/llms.txt): public, crawlable context for AI agents.

Read these before redesigning the portfolio. They are the source of truth; old screenshots and deleted components are not.

## Local development

This is a Bun workspace with one Next.js application.

```bash
bun install
bun run dev
```

The portfolio and blog render without chat credentials. Authenticated chat routes additionally need the values documented in [`apps/web/.env.example`](apps/web/.env.example).

Useful checks:

```bash
bun run check-types
bun run lint
bun --cwd apps/web run test:content
bun --cwd apps/web run build
```

The web build syncs blog source content before compiling and runs the database migration used by the retained chat subsystem. For UI-only build verification without configured production services, run the focused tests and type check first.

## Live application surfaces

- `/`: server-rendered portfolio sections with a native mobile menu and accessible interactive stack cards.
- `/blog`: server-rendered featured note and chronological archive.
- `/blog/[slug]`: semantic article page with metadata, structured data, agent brief, and responsive contents navigation.
- `/chat`, `/login`, `/register`: retained authenticated chat subsystem. It is isolated from the public portfolio and should not be removed as incidental cleanup.
- `/llms.txt`, `/sitemap.xml`, `/robots.txt`: discovery surfaces for crawlers and software agents.

## Content flow

Blog source content is synchronized by `apps/web/scripts/sync-blog-content.mjs` into `apps/web/lib/portfolio/blogs.json`. Do not hand-edit the generated JSON. Update the source content and run:

```bash
bun --cwd apps/web run content:sync
bun --cwd apps/web run test:content
```

## Change rules

- Prefer server components and native HTML disclosure controls for public pages.
- Keep important copy and links in the initial HTML so browsers, screen readers, and agents can inspect them.
- Use real project evidence. Do not invent metrics, maturity, testimonials, or security guarantees.
- Reuse the field-notes components under `apps/web/app/(portfolio)/_components/field-notes` before adding another design system.
- Keep portfolio CSS and chat-only CSS scoped to their route groups.
- Add a dependency only when an existing utility or browser primitive cannot do the job clearly.

## Repository hygiene

The current portfolio lives only in the field-notes component set. Earlier portfolio variants, physics effects, unused storyboards, stale screenshots, and copied provider documentation have been removed. Experimental or private work should live on its own branch or in a clearly named, ignored workspace rather than beside production components.

Never commit `.env.local`, credentials, pairing links, private client data, or generated build output.
