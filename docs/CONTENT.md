# Content runbook

This is the editing playbook for the public knowledge-base surfaces of aryateja.com and the daily content engine around it. The goal is to make refreshes a 5-minute task instead of a 5-hour archaeology dig.

The single source of truth for brand identity, title, location, social links, and voice rules is [`apps/web/lib/portfolio/brand.ts`](../apps/web/lib/portfolio/brand.ts). [`apps/web/lib/portfolio/site.ts`](../apps/web/lib/portfolio/site.ts) derives site metadata from it. Touch `brand.ts` before changing the same string in three places.

The locked identity is:

> "Agentic Engineer · Founder, LeSearch AI + CloudAGI · Building LeCoder MConnect · San Francisco"

If the positioning ever needs to change, update `BRAND` in `brand.ts` first; everything downstream re-reads it.

## Daily content engine

The daily content goal is one useful post adapted across LinkedIn, X, and YouTube Shorts. Use [`PRODUCT.md`](../PRODUCT.md), [`DESIGN.md`](../DESIGN.md), and the `$personal-brand-content` skill for the working system.

### Content pillars

1. Agentic engineering in public: what Arya is learning while building LeCoder MConnect, CloudAGI, LeSearch AI, NL2Shell, and local remote-machine workflows.
2. Multi-agent orchestration: practical patterns, mistakes, coordination surfaces, remote agents, mobile control, SSH, VNC, browser automation, and repo operations.
3. Open-source field notes: daily breakdowns of useful GitHub projects, what they teach, what is hype, and how builders can use them safely.
4. Security and self-hosting: secrets, local-first infra, remote access, browser/profile risk, and how to understand the systems agents operate.
5. Builder biography: honest learning notes from moving from long-time AI enthusiast to product builder.

### One-hour daily loop

1. Pick one source: a repo, newsletter item, product lesson, bug, workflow, or build log.
2. Capture one concrete claim: what changed, what worked, what failed, or what a builder can reuse.
3. Write the canonical note first: 150 to 300 words in plain language.
4. Adapt it:
   - LinkedIn: story plus technical takeaway.
   - X: short thread or sharp standalone post.
   - YouTube Shorts: 30 to 60 second script with one screen-recordable demo or visual.
5. Create one visual: screenshot, diagram, carousel, poster, or template card.
6. Archive the source, draft, final copy, visual prompt, and publish links in the active content tracker.

### Research standard

When a post uses current news, repo facts, release details, pricing, security claims, or tool capabilities, verify against primary sources before drafting. Prefer official docs, GitHub READMEs, changelogs, release notes, source code, and vendor security docs.

## Adding a project

1. Open [`apps/web/lib/portfolio/projects.ts`](../apps/web/lib/portfolio/projects.ts) and append a `Project` object to `PROJECTS`. Required fields: `slug`, `title`, `tagline`, `description`, `status`, `statusVariant`, `techStack`, `startedAt`, `role`, `deepDive` (problem/approach/outcomes).
2. Run `bun run check-types` from the repo root to verify the type contract.
3. The project is automatically picked up by:
   - [`/projects`](https://www.aryateja.com/projects) index page
   - [`/projects/[slug]`](../apps/web/app/(portfolio)/projects/[slug]/page.tsx) deep-dive page
   - [`apps/web/app/sitemap.ts`](../apps/web/app/sitemap.ts) and the dynamic OG image route
4. If the project has a related blog post, set `relatedBlogSlug` to wire up the cross-link.
5. To surface the project on the home page card grid, also update the `projectsData` array in [`apps/web/app/(portfolio)/_components/projects.tsx`](../apps/web/app/(portfolio)/_components/projects.tsx), or refactor that component to consume `PROJECTS` directly.

## Adding a blog post

1. Append an entry to [`apps/web/lib/portfolio/blogs.json`](../apps/web/lib/portfolio/blogs.json). The schema is enforced through `BlogPost` in [`apps/web/lib/types`](../apps/web/lib/types).
2. Required fields: `id`, `slug`, `title`, `description`, `excerpt`, `date`, `formattedDate`, `readTime`, `category`, `tags`, `coverImage`, `author`, `relatedArticles`, `content` (markdown string).
3. Cover images: drop the file at `apps/web/public/assets/<name>.png` and set `coverImage: "/assets/<name>.png"`. If the image is missing, the page renders fine without it (the dynamic OG route still produces a social preview).
4. Tags become URLs at `/blog/tag/<encoded-tag>` automatically and feed the sitemap.
5. Per-post metadata (title, description, OG, Twitter, Article JSON-LD) is generated in [`apps/web/app/(portfolio)/blog/[slug]/page.tsx`](../apps/web/app/(portfolio)/blog/[slug]/page.tsx), so no manual work is needed.

## Adding an FAQ entry

Open [`apps/web/app/(portfolio)/faq/page.tsx`](../apps/web/app/(portfolio)/faq/page.tsx) and append to the `FAQS` array. The page emits both readable HTML and a `FAQPage` JSON-LD block, so AI engines pick it up automatically.

## Refreshing /now (monthly)

1. Update `LAST_UPDATED` and `LAST_UPDATED_LABEL` at the top of [`apps/web/app/(portfolio)/now/page.tsx`](../apps/web/app/(portfolio)/now/page.tsx).
2. Refresh the three sections: Building / Learning / Looking for / Not focused on.
3. Use the `monthly-update.yml` GitHub issue template to track the next refresh.

## Refreshing /uses

Same flow as `/now` but in [`apps/web/app/(portfolio)/uses/page.tsx`](../apps/web/app/(portfolio)/uses/page.tsx). Update the `LAST_UPDATED` constants and the `GROUPS` array. Add `url` for any tool you want to link out to.

## Refreshing /reading

Edit `CURRENT` and `RECENT` in [`apps/web/app/(portfolio)/reading/page.tsx`](../apps/web/app/(portfolio)/reading/page.tsx). Anything currently on the desk goes in `CURRENT`. Past reads worth recommending go in `RECENT`.

## Refreshing the AEO summary (`llms.txt`)

[`apps/web/public/llms.txt`](../apps/web/public/llms.txt) is the authoritative summary that AI answer engines treat as a primary source. Update it whenever:

- Job title or employer changes
- A new flagship project ships
- Contact details change
- The "How to cite Arya" section needs a new canonical page

After editing, re-run the OpenAI / Perplexity / Gemini prompt set from [`docs/SEO-AEO.md`](./SEO-AEO.md) to verify the answer engines pick up the change.

## Updating positioning everywhere at once

Change values in [`apps/web/lib/portfolio/site.ts`](../apps/web/lib/portfolio/site.ts):

- `SITE_TITLE_DEFAULT`: drives `<title>` on `/`
- `SITE_DESCRIPTION`: drives the `<meta name=description>` and OG description
- `SITE_TAGLINE`: drives the OG image subtitle
- `personJsonLd`: the canonical Person schema rendered once in `app/layout.tsx`

Re-deploy and verify with [Google Rich Results Test](https://search.google.com/test/rich-results) that the structured data still validates.

## Adding cover images for blog posts (currently missing)

The current blog entries in `blogs.json` reference `/assets/mconnect.png`, `/assets/lesearch.png`, `/assets/opensource.png`. Those files don't ship in `public/assets/` yet, and the page handles that gracefully. To restore real cover images:

1. Drop the PNGs into `apps/web/public/assets/`.
2. Remove the `!post.coverImage.startsWith("/assets/")` defensive check in [`apps/web/app/(portfolio)/blog/[slug]/page.tsx`](../apps/web/app/(portfolio)/blog/[slug]/page.tsx) (currently it short-circuits when the asset path doesn't exist).
