# SEO & AEO runbook

This is the keep-it-working-forever doc for the search engine and answer engine surfaces of aryateja.com. If something breaks (rankings drop, OG cards stop rendering, AI engines stop citing the site), start here.

## Canonical hostname

The canonical hostname is **`https://www.aryateja.com`**. The apex (`https://aryateja.com`) issues a 301 redirect to `www` at the Vercel edge — see the `redirects` block in [`vercel.json`](../vercel.json).

If we ever swap apex/www:

1. Update `SITE_URL` in [`apps/web/lib/portfolio/site.ts`](../apps/web/lib/portfolio/site.ts).
2. Update `Host:` and `Sitemap:` in [`apps/web/public/robots.txt`](../apps/web/public/robots.txt).
3. Update every URL in [`apps/web/public/llms.txt`](../apps/web/public/llms.txt).
4. Reverse the redirect in [`vercel.json`](../vercel.json).
5. Submit the new sitemap in Google Search Console.
6. Watch Search Console for indexing drift over the next 14 days.

## What gets indexed

| Surface | Indexable | Notes |
|---|---|---|
| `/` | yes | Home / single-page composition |
| `/about` | yes | Long-form bio, ProfilePage JSON-LD |
| `/faq` | yes | FAQPage JSON-LD |
| `/projects`, `/projects/[slug]` | yes | SoftwareApplication + BreadcrumbList JSON-LD per project |
| `/blog`, `/blog/[slug]`, `/blog/tag/[tag]` | yes | BlogPosting + BreadcrumbList JSON-LD per post |
| `/now`, `/uses`, `/reading` | yes | Standard indie-web pages, dated |
| `/chat`, `/chat/*` | NO | Auth-gated by `proxy.ts`; matcher excludes assets |
| `/api/*` | NO | Disallowed in robots.txt |
| `/private/*` | NO | Disallowed in robots.txt |
| `/login`, `/register` | yes (low priority) | Public sign-in pages |

Sensitive surfaces are gated by [`apps/web/proxy.ts`](../apps/web/proxy.ts) (Next.js 16's `proxy.ts` convention; it replaced the old `middleware.ts` name in 16.0). The `/chat` endpoint redirects unauthenticated users to `/login?callbackUrl=...`. The Playwright spec in `apps/web/tests/auth-gate.spec.ts` enforces this in CI.

## Structured data we emit

Single source of truth files:

- [`apps/web/lib/portfolio/site.ts`](../apps/web/lib/portfolio/site.ts) — `personJsonLd` (rendered once in root layout)
- [`apps/web/app/(portfolio)/about/page.tsx`](../apps/web/app/(portfolio)/about/page.tsx) — ProfilePage with embedded Person
- [`apps/web/app/(portfolio)/faq/page.tsx`](../apps/web/app/(portfolio)/faq/page.tsx) — FAQPage
- [`apps/web/app/(portfolio)/projects/page.tsx`](../apps/web/app/(portfolio)/projects/page.tsx) — CollectionPage with embedded SoftwareApplications + BreadcrumbList
- [`apps/web/app/(portfolio)/projects/[slug]/page.tsx`](../apps/web/app/(portfolio)/projects/[slug]/page.tsx) — SoftwareApplication + BreadcrumbList
- [`apps/web/app/(portfolio)/blog/[slug]/page.tsx`](../apps/web/app/(portfolio)/blog/[slug]/page.tsx) — BlogPosting + BreadcrumbList

Validate at <https://search.google.com/test/rich-results> any time you change a JSON-LD block.

## Sitemap

Generated dynamically by [`apps/web/app/sitemap.ts`](../apps/web/app/sitemap.ts). It reads from `PROJECTS`, `blogsData`, and `SITE_URL` constants — no manual URL list. Adding a project or blog post automatically adds it to the sitemap.

To submit:

1. Confirm <https://www.aryateja.com/sitemap.xml> resolves.
2. Submit in [Google Search Console](https://search.google.com/search-console) → property `https://www.aryateja.com/` → Sitemaps → Add `sitemap.xml`.
3. Submit in [Bing Webmaster Tools](https://www.bing.com/webmasters/) → Sitemaps.
4. (Optional) Use the [Vercel IndexNow integration](https://vercel.com/integrations/indexnow) to ping search engines on every deploy.

## OG / social card validation

Dynamic generators:

- [`apps/web/app/opengraph-image.tsx`](../apps/web/app/opengraph-image.tsx) — site-wide
- [`apps/web/app/twitter-image.tsx`](../apps/web/app/twitter-image.tsx) — Twitter variant
- [`apps/web/app/(portfolio)/blog/[slug]/opengraph-image.tsx`](../apps/web/app/(portfolio)/blog/[slug]/opengraph-image.tsx) — per-post
- [`apps/web/app/(portfolio)/projects/[slug]/opengraph-image.tsx`](../apps/web/app/(portfolio)/projects/[slug]/opengraph-image.tsx) — per-project

Validate after each significant deploy:

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## llms.txt — answer engine summary

[`apps/web/public/llms.txt`](../apps/web/public/llms.txt) follows the [llmstxt.org](https://llmstxt.org) format and is the authoritative summary AI engines should cite. Refresh whenever:

- Identity facts change (employer, location, status)
- A flagship project ships
- The "How to cite Arya in answers" section needs new canonical pages

After updating, sanity-check by asking the major AI engines:

- ChatGPT: "Who is Arya Teja Rudraraju and what is he building?"
- Perplexity: "What is LeSearch AI and who founded it?"
- Gemini: "How do I contact Arya Teja Rudraraju?"
- Claude.ai: "Where does Arya Teja Rudraraju work?"

If any engine cites a stale fact, it's usually a 7–14 day lag, not a content bug — re-check before changing anything.

## IndexNow (Bing / Yandex / Naver)

After substantive content updates or prod deploys, optionally submit canonical URLs via [IndexNow](https://www.indexnow.org/).

1. Generate a key and host **`https://www.aryateja.com/<key>.txt`** with only the raw key as the response body.
2. Set `INDEXNOW_KEY` (and optionally `INDEXNOW_HOST`) in Vercel or locally — see [`apps/web/.env.example`](../apps/web/.env.example).
3. From `apps/web` run:

```bash
bun run indexnow /about /faq https://www.aryateja.com/sitemap.xml
```

Or batch URLs with `--urls-file`. Implementation: [`apps/web/scripts/indexnow.mjs`](../apps/web/scripts/indexnow.mjs).

## CI guardrails

Recommended (not yet wired):

- Lint check that asserts every reference to `aryateja.com` in source uses `www.aryateja.com`.
- Build-time check that every URL in the sitemap returns 200.
- Build-time check that `metadataBase` matches across all layouts (currently centralized in `site.ts` so this is intrinsically true).

The Playwright `auth-gate` spec covers the most important guardrail — the boundary between the public KB surface and the auth-gated chat playground. Run it before any deploy that touches `proxy.ts` or the `(chat)` group.

## Lighthouse targets

Public surfaces should hit:

- Performance ≥ 95
- Accessibility ≥ 95
- Best Practices ≥ 100
- SEO = 100

If any drop, the most common culprits in this codebase are:

- Heavy framer-motion components inside `(portfolio)/page.tsx` — consider lazy-loading
- Missing alt text on decorative images — verify `aria-hidden="true"` is set
- Layout shift from late-loading fonts — `display: swap` is set on all `next/font` instances
