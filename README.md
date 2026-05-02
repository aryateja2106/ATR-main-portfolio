# aryateja.com

Personal website + digital knowledge base for **Arya Teja Rudraraju** — AI Product Manager at Pilvi Systems and founder of LeSearch AI. Live at [https://www.aryateja.com](https://www.aryateja.com).

The repository is a Turbo monorepo. The current production app lives at [`apps/web`](apps/web) and is built with Next.js 16 + React 19 + Tailwind, with an auth-gated AI chat playground built on the Vercel AI SDK.

## Architecture

The site has two surfaces:

- **Public knowledge-base surface** (`apps/web/app/(portfolio)/...`): home, blog, about, FAQ, projects, /now, /uses, /reading, etc. Server-rendered, fully indexable, optimized for SEO and AEO.
- **Auth-gated playground** (`apps/web/app/(chat)/...` and `apps/web/app/(auth)/...`): `/chat`, document storage, file upload, chat history. Requires sign-in and is intentionally never indexed.

`apps/web/proxy.ts` (Next.js 16's renamed-from-`middleware.ts` edge handler, wrapping NextAuth `authConfig`) gates the playground.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript, Biome, ESLint
- Tailwind CSS
- Drizzle ORM + Vercel Postgres (chat persistence only)
- Vercel Blob (uploaded artifacts)
- AI SDK (xAI Grok, Google Gemini, OpenRouter) — chat-only
- next-auth v5
- Bun as the package manager
- Vercel for hosting

## Local development

Prereqs: [Bun](https://bun.sh) ≥ 1.1.20.

```bash
git clone https://github.com/aryateja2106/ATR-main-portfolio.git
cd ATR-main-portfolio
bun install
cp apps/web/.env.example apps/web/.env.local
# Fill in keys you actually need. The public portfolio surface needs none.
bun run dev
```

The dev server boots at [http://localhost:3000](http://localhost:3000).

### Environment variables

The public portfolio renders without any env vars. Chat features require:

- `AUTH_SECRET` — generate with `openssl rand -base64 32`
- `XAI_API_KEY` — [xAI console](https://console.x.ai/)
- `GOOGLE_AI_API_KEY` — [Google AI Studio](https://aistudio.google.com/)
- `OPENROUTER_API_KEY` — [OpenRouter](https://openrouter.ai)
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob
- `POSTGRES_URL` — Vercel Postgres (chat persistence)

See [`apps/web/.env.example`](apps/web/.env.example) for the full list.

## SEO and AEO

This site is also a knowledge base optimized for search engines and answer engines. The runbook for keeping that working lives in [`docs/SEO-AEO.md`](docs/SEO-AEO.md). Editing patterns for content (projects, FAQ, /now updates) live in [`docs/CONTENT.md`](docs/CONTENT.md).

Canonical hostname is `https://www.aryateja.com`. The apex domain 301s to www at the Vercel edge (see [`vercel.json`](vercel.json)).

## Scripts

Run from the repo root via Turborepo:

```bash
bun run dev          # next dev --turbo
bun run build        # next build
bun run lint         # biome lint --write --unsafe
bun run format       # biome format --write
bun run check-types  # tsc --noEmit
```

Workspace-scoped DB scripts live in `apps/web` and require `POSTGRES_URL`:

```bash
cd apps/web
bun run db:generate   # drizzle-kit generate
bun run db:migrate    # apply migrations
bun run db:studio     # local studio
```

## Deployment

Deployed continuously on Vercel from `main`. The build runs `tsx lib/db/migrate && next build`; if `POSTGRES_URL` is missing the migration step gracefully no-ops.

## Documentation

Engineering docs live in [`docs/`](docs/):

- [`docs/Architecture.md`](docs/Architecture.md)
- [`docs/Database Schema.md`](docs/Database%20Schema.md)
- [`docs/Deployment Guide.md`](docs/Deployment%20Guide.md)
- [`docs/Folder Structure.md`](docs/Folder%20Structure.md)
- [`docs/Security.md`](docs/Security.md)

## License

MIT — see [LICENSE](LICENSE).
