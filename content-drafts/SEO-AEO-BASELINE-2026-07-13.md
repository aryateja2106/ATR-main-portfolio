# SEO/AEO Baseline Audit: aryateja.com

Date: 2026-07-13 (site live for ~2 days). Six specialist lenses, deduped into one action list. All file paths are relative to the repo root (`apps/web/...`) unless absolute URLs are given.

## 1. Scorecard

| Lens | Score /10 | Verdict |
|---|---|---|
| Technical SEO | 6 | Per-route metadata, sitemap, 404s, and noindex boundaries are genuinely well built, but every canonical signal points at a host that redirects. |
| Structured Data (JSON-LD) | 5.5 | Valid, server-rendered Person + BlogPosting with a stable entity id, but the schema inventory is thin (no WebSite, no Service markup for the consulting offer) and every @id points at the wrong host. |
| AEO (agent readability) | 7.5 | Excellent llms.txt with an anti-hallucination block, all AI crawlers allowed, full SSR prose. Missing the machine layer: no feed, no markdown mirrors, WebMCP is browser-only. |
| Identity & Content Signal | 6 | Served copy is a coherent founder identity with zero "AI PM" language, but the live resume PDF still says AI Product Manager / Dallas / F-1 OPT, and both consulting CTAs are bare mailto links. |
| Blog SEO | 6.5 | Per-post plumbing (canonical, article OG, JSON-LD, static params) all generates correctly from blogs.json, but 2 of 3 posts are ~290-word stubs with fabricated read times and the listing ships every post's full markdown. |
| Live Site Health | 7.5 | Everything 200s fast (158-249ms, Vercel cache HITs), clean single-hop apex redirect, real 404s, HSTS on. Consistency issues, not availability issues. |

**Overall: 6.5 / 10.** Strong plumbing, two identity-level contradictions (canonical host, resume PDF) suppressing everything built on top of it.

## 2. P0: fix before promoting the site

### P0-1. Canonical host mismatch: the site serves on www, every SEO signal says apex

Flagged independently by all six lenses. Verified live: `curl -sI https://aryateja.com/` returns 308 to `https://www.aryateja.com/`, which serves 200. Meanwhile ALL code-level signals use the bare apex:

- `metadataBase`: `apps/web/app/layout.tsx:12` and `apps/web/app/(portfolio)/layout.tsx:14`
- Canonical tags on /, /blog, and every post (live HTML emits `<link rel="canonical" href="https://aryateja.com...">`)
- `og:url`, `og:image`, and `twitter:image` absolute URLs
- Sitemap baseUrl: `apps/web/app/sitemap.ts:5` (so every `<loc>` in the live sitemap 308-redirects)
- `Sitemap:` line in `apps/web/public/robots.txt:5`
- JSON-LD `@id`, `url`, `mainEntityOfPage`, and image URLs in `apps/web/app/(portfolio)/layout.tsx:79-116` and `apps/web/app/(portfolio)/blog/[slug]/page.tsx:9`
- Every link in `apps/web/public/llms.txt`

Consequences: Google Search Console will report "Page with redirect" for the whole sitemap, canonical consolidation is left to guesswork, and AI crawlers doing exact-URL entity lookup on the Person @id get a redirect instead of a document.

Fix, pick ONE:

- Option A (zero code, fastest): in Vercel project domain settings, make `aryateja.com` the primary domain so www redirects to apex. Code is already correct for this world.
- Option B: keep www primary and replace the host string in all files listed above with `https://www.aryateja.com`.

Either way, extract a single constant so it can never drift again:

```
// apps/web/lib/seo.ts
export const SITE_URL = "https://aryateja.com"; // or www, whichever wins
```

Import it in both layouts, `sitemap.ts`, and `blog/[slug]/page.tsx` (which currently hardcodes its own second `siteUrl`). Regenerate llms.txt and robots.txt to match. Then resubmit the sitemap in GSC.

Verify after deploy:

```
curl -sI https://aryateja.com/ | grep -iE "HTTP|location"
curl -s https://<canonical-host>/sitemap.xml | grep "<loc>"   # every loc must 200, zero hops
curl -s https://<canonical-host>/ | grep -o 'rel="canonical"[^>]*'
```

### P0-2. Live resume PDF contradicts the entire site identity

`https://www.aryateja.com/resume/Arya_Teja_PM_Resume.pdf` serves 200 and opens with "AI Product Manager with 2+ years shipping AI products... Dallas, TX... Work Authorization: F-1 OPT (valid through July 2028)". This is exactly the persona `apps/web/public/llms.txt` lines 59-61 instructs agents to discard. Worse, the site's own MCP tool routes agents straight to it (`navigate_portfolio` in `apps/web/app/(portfolio)/_components/WebMcpProvider.tsx:171`), and llms.txt line 34 advertises it as "the public resume". Any diligent prospect or agent that pulls it gets a contradictory, job-seeking identity that undercuts the consulting pitch.

Fix:

1. Author a consulting/founder one-pager (Agentic Systems Builder framing, India-based, CloudAGI/LeSearch/LeCoder work, no PM language, no visa status).
2. Ship it as `apps/web/public/resume/Arya_Teja_Rudraraju.pdf`, delete `Arya_Teja_PM_Resume.pdf` (let the old URL 404, or add a redirect in `next.config.ts`).
3. Update the path in `WebMcpProvider.tsx:171` and `public/llms.txt:34`.
4. Keep the existing `X-Robots-Tag: noindex` header rule for `/resume/*` in `apps/web/next.config.ts`.

## 3. P1: this week

1. **Homepage og:image is a 5.4 MB, 5712x4284 photo declared as 1200x630.** `public/real-images/yc-robo-hk-solo.jpeg` (5,420,818 bytes) exceeds X/Twitter's 5 MB card limit, so `summary_large_image` cards on / and /blog render with no image; LinkedIn/Slack scrapers crop the 4:3 photo badly against the declared 1.91:1. Export a purpose-made 1200x630 image under 300 KB (or add `app/opengraph-image.tsx` with next/og) and update `openGraph.images` + `twitter.images` in `apps/web/app/(portfolio)/layout.tsx:52-59,67`.

2. **/blog ships no og:image and an incoherent Twitter card.** Next.js replaces (not merges) the openGraph/twitter objects per level: `apps/web/app/(portfolio)/blog/page.tsx:6-20` defines openGraph without images and no twitter block, so live /blog has zero og:image and inherits the homepage twitter:title/image while og:title says "Writing". Add explicit `openGraph.images` and a full `twitter` block there, and add `twitter.site` (`@r_aryateja`) to the layout defaults.

3. **No ProfessionalService/Service schema despite consulting being the revenue purpose.** The homepage visibly sells "AI agent consulting" but there is zero Service, Organization, or Offer markup, so Google and agents have no machine-readable signal that paid consulting exists. Add a ProfessionalService node (provider: person @id, serviceType, url to contact) to the JSON-LD in `apps/web/app/(portfolio)/layout.tsx`, and link Person to a CloudAGI Organization via worksFor/founder if that brand is staying.

4. **No WebSite schema on any page.** The standard anchor for site-name display and page-to-site attribution is absent. Add a `WebSite` node (`@id: .../#website`, publisher: person @id) to a sitewide `@graph`, and reference it from BlogPosting via `isPartOf`.

5. **No RSS/Atom feed anywhere.** All probes 404 (/feed.xml, /rss.xml, /atom.xml, /blog/feed.xml) and there is no `<link rel="alternate">`. The daily blog-to-social content engine has no machine-consumable output. Add `apps/web/app/feed.xml/route.ts` generating from `lib/portfolio/blogs.json` (slug, title, description, date all exist) plus the alternate link in layout metadata.

6. **No markdown mirrors; llms.txt links only to HTML.** `.md` endpoints and /llms-full.txt all 404, so an agent must parse ~125 KB of HTML/flight payload to read a post whose markdown already lives in blogs.json. Add a `/blog/[slug].md` route handler serving raw markdown, optionally /llms-full.txt, and point llms.txt links at the .md URLs.

7. **Posts 2 and 3 are ~290-word stubs with fabricated read times.** `building-lesearch-from-papers-to-action` is 289 words labeled "8 min read"; `why-i-bet-on-open-source-agents` is 299 words labeled "5 min read" (`apps/web/lib/portfolio/blogs.json`). The /blog header promises "exact commands, security boundaries, and how to verify the result"; only the MConnect guide delivers. For a site whose pitch is verified claims, visibly wrong read times are self-inflicted damage. Compute readTime from word count at build time (one function in `app/(portfolio)/_hooks/blog.ts`), then either expand both posts to case-study depth or relabel them honestly. Also point the LeSearch CTA at lesearch.ai, not lesearch-app.vercel.app.

8. **Consulting conversion path is a bare mailto; CloudAGI is invisible to humans.** Both CTAs are `mailto:aryateja2106@gmail.com` (`field-notes/content.ts:17,125`); no form, no booking link, no /services page; CloudAGI exists only as a meta keyword. A mobile visitor without a mail client hits a dead end. Add a contact form (API route or Formspree/Resend) or booking link, and one visible sentence connecting CloudAGI consulting to the site (or drop the keyword).

9. **Dead legacy components still carry the banned "AI PM" persona in the public repo.** `hero.tsx:113`, `experience.tsx:9,42`, `about.tsx:18,240,265`, plus `mobile-menu.tsx`/`header.tsx` linking the PM resume. Nothing imports them today, but one accidental import re-ships the old identity, and agents reading the repo see contradictory copy. Delete the unused legacy components (hero, about, experience, projects, skills, header, footer, mobile-menu, qualities, blogs, and unreferenced fancy/ physics files).

10. **/blog serializes every post's full markdown into the listing payload.** `blog/page.tsx:23,45` passes full `getAllBlogs()` objects to the client `blog-list.tsx`, which never reads `content`. Verified live: post body text appears in the /blog RSC payload. With 13+ posts this becomes 150 KB+ of invisible markdown on one URL. Map to a summary shape (id, slug, title, excerpt, category, date, readTime, coverImage) before passing down.

11. **No legacy-route redirect map.** `apps/web/next.config.ts` has no `redirects()`; /projects, /about, /blogs, /work, /contact, /resume all hard-404. If the previous site had any of these with inbound links, that equity dead-ends. Pull the old route list (old repo, GSC "Not found", or Vercel 404 logs after a few days) and add 308s: /blogs to /blog, /projects and /about to /, /resume to the new PDF.

## 4. P2: nice to have

1. **viewport maximum-scale=1 disables pinch-zoom sitewide** (`apps/web/app/layout.tsx:18-20`). Fails WCAG 1.4.4, hurts mobile readers. Remove it, or scope to the (chat) layout if the iOS input-zoom concern matters there.
2. **Duplicated root metadata**: two `metadataBase` declarations and divergent default title/description between `app/layout.tsx` and `app/(portfolio)/layout.tsx`. This is exactly how the host drift happened. Consolidate through `lib/seo.ts`.
3. **Hardcoded freshness dates will go stale**: `sitemap.ts:6` pins `new Date('2026-07-11')` for / and /blog, ProfilePage `dateModified` is a literal (`layout.tsx:85`), and BlogPosting `dateModified` always equals `datePublished` (`blog/[slug]/page.tsx:72`). Derive from the max post date and add an optional `updatedAt` per post in blogs.json.
4. **ProfilePage JSON-LD is stamped on every page**, including all posts and the blog index (shared layout). Move ProfilePage to the homepage only; keep a sitewide @graph of Person + WebSite so #person stays resolvable.
5. **Schema inventory gaps**: no BreadcrumbList on posts (Home > Writing > Post), no Blog/CollectionPage/ItemList on /blog, no FAQPage anywhere, and BlogPosting omits keywords/articleSection/timeRequired/publisher even though blogs.json already carries tags, category, and readTime. Cheap mapping work in `blog/[slug]/page.tsx` and `blog/page.tsx`.
6. **llms.txt lists only 1 of 3 published posts** and will drift further with the ~10 drafts. Generate it (or at least the guides section) from blogs.json via `app/llms.txt/route.ts`.
7. **WebMCP tools are demo-only**: they register only when `document.modelContext` exists; no remote MCP endpoint for Claude Desktop or MCP SDKs, and robots.txt disallows /api/ anyway. Expose the two read-only tools via a streamable-HTTP route (e.g. `app/mcp/route.ts`) and advertise it in llms.txt. `createPortfolioTools` is already factored for reuse.
8. **robots.txt has no explicit AI-crawler stanzas or llms.txt pointer.** Wildcard allow works today, but explicit GPTBot/ClaudeBot/PerplexityBot/Google-Extended/CCBot stanzas plus a llms.txt comment document intent against policy drift.
9. **Square 1024x1024 og:images for posts 2 and 3** (`public/assets/context-engineering.png`, `mcp.png`) get center-cropped by summary_large_image. Export 1200x630 crops into `public/blog-images/` and standardize the convention there.
10. **Meta descriptions off-target**: post 1 at 165 chars truncates; posts 2 and 3 at 77/84 chars waste the snippet. Rewrite to 140-155 chars, front-load intent keywords, add a length check script over blogs.json for the incoming drafts.
11. **Slug/title keyword mismatch on the flagship post**: `connecting-terminals-to-web-mconnect` carries none of the title's money keywords ("control AI coding agents from your phone"). Rename now (2 days post-launch) with a permanent redirect, and settle a slug convention before the 10 drafts land.
12. **Category filters are client-only useState buttons**: no ?category= param, no /blog/category/ routes, so filtered views are not crawlable or shareable. Sync to a searchParam at minimum; add static category pages when categories hold more than one post each.
13. **Data-model scaling frictions in blogs.json**: hand-maintained `formattedDate` duplicates `date`; `relatedArticles` is manual id-wiring that will rot; `blog-list.tsx:152` decides eager image loading by `parseInt(post.id) <= 4` instead of list index; the author block is copy-pasted per post with an avatar path (`/images/avatar-arya.jpg`) that 404s live. Derive computed fields at build time, compute related posts by shared tags, switch eager-loading to index, hoist author to one object, add or drop the avatar.
14. **Footer social proof**: "YouTube" links to generic youtube.com (`content.ts:150`), and the GitHub profile is absent from visible socials despite being the primary proof surface. Fix or remove YouTube, add GitHub.
15. **No canonical job title**: four variants in play ("Founder and Agentic Systems Builder", "Agentic Systems Founder", "Founder · multi-agent systems", "Agentic Engineer" as keyword only). Pick one and use it verbatim in hero, JSON-LD jobTitle, author bio, llms.txt, and LinkedIn.
16. **Portfolio inventory incomplete, zero social proof**: nl2shell.com appears nowhere in the app source; no testimonials, client logos, or evidenced outcomes on the served site (the only metrics live in the contradictory PM resume). Add nl2shell to the work grid and 1-3 evidenced outcomes per llms.txt's own standard.
17. **Unbranded /chat is publicly live and unexplained**: 307s anonymous visitors to a login wall, unlinked from nav and llms.txt, public register endpoint invites abuse. Brand it as an on-site agent demo with a guest mode, or gate/remove it.
18. **Schema claims not anchored on-page**: `alumniOf: Duquesne University` and knowsAbout topics like "Product Strategy" appear in Person JSON-LD but nowhere in rendered copy. Surface education in the visible Journey section or move the claim to where it is stated.
19. **HSTS lacks includeSubDomains and preload**: one-line hardening in `next.config.ts` headers() after confirming all subdomains serve HTTPS.
20. **favicon.ico served with max-age=0, must-revalidate** (15 KB revalidated every visit, slowest probe at 412ms). Add a long-max-age header rule or serve via app metadata conventions.

## 5. What agents see today

A cold agent that fetches llms.txt gets a genuinely good briefing: Arya Teja Rudraraju, founder and agentic-systems builder operating from India, building LeSearch and LeCoder MConnect, selling AI agent consulting (secure setups, workflow audits, local-first systems), reachable at aryateja2106@gmail.com with a suggested first message. Unusually, the file also tells the agent what NOT to believe: stale "AI Product Manager / Dallas / job seeker" snippets should be discarded. robots.txt allows every AI crawler, all pages are fully server-rendered with real prose in raw HTML, and Person/BlogPosting JSON-LD with verified sameAs links (GitHub, X, LinkedIn) is present on every page. The core AEO test passes: who, what, sells-what, contact are all answerable from one file.

Then the cracks. Every URL the agent is given (canonicals, sitemap, JSON-LD @ids, llms.txt links) points at a host that 308-redirects, so exact-URL lookups return redirects, not documents. llms.txt lists only one of three published posts, so the LeSearch case study, the direct proof-of-work for the consulting offer, is invisible to an agent that trusts the file as source of truth. There is no feed to subscribe to and no markdown to read, so consuming a post means parsing 125 KB of Next.js payload. The advertised WebMCP tools exist only inside browsers with an experimental API, so headless agents cannot call them. And if the agent does the diligent thing and pulls the linked resume, it reads "AI Product Manager, Dallas, TX, F-1 OPT", the exact persona llms.txt told it to discard, served by the site's own MCP navigation tool. The site tells a strong story and then hands the skeptical reader the one document that contradicts it.

## 6. Baseline metrics (re-measure after fixes)

| Metric | Value at 2026-07-13 |
|---|---|
| Sitemap URLs | 5 (/, /blog, 3 post slugs), all currently 308-redirecting via apex |
| Published posts | 3 (one 2,221-word guide; two stubs at 289 and 299 words); ~10 drafts pending |
| Claimed vs honest read times | 15/8/5 min claimed vs ~10/1/1 min actual |
| llms.txt post coverage | 1 of 3 (33%) |
| JSON-LD types present | ProfilePage, Person, BlogPosting |
| JSON-LD types missing | WebSite, ProfessionalService/Service, BreadcrumbList, Blog/CollectionPage/ItemList, FAQPage |
| Homepage weight | 47,488 bytes raw, ~9,463 bytes compressed, 3 stylesheets, no render-blocking JS for modern browsers |
| Homepage og:image | 5,420,818 bytes, 5712x4284 (declared 1200x630; over X's 5 MB card limit) |
| Route latency | 158-249ms across all core routes, x-vercel-cache HIT on prerendered pages |
| Feed endpoints | 0 (all of /feed.xml, /rss.xml, /atom.xml, /blog/feed.xml 404) |
| Markdown mirrors / llms-full.txt | 0 (all .md probes 404) |
| Canonical host state | www serves 200; apex 308s to www; all code signals say apex |
| Resume PDF | /resume/Arya_Teja_PM_Resume.pdf, 200, ~90 KB, PM/Dallas/F-1 persona |
| WebMCP tools in prod bundle | 4 (get_portfolio_context, find_technical_articles, open_technical_article, navigate_portfolio), browser-only |
| Meta description lengths | 165 / 77 / 84 chars (target 140-155) |
| Legacy-route 404s | /projects, /about, /blogs, /work, /contact, /resume all hard-404, no redirects() in next.config.ts |
| HSTS | max-age=63072000, no includeSubDomains, no preload |
| Issue counts this audit | P0: 2, P1: 11, P2: 20 |

Overall baseline: **6.5 / 10**. Fixing the two P0s and the social-card P1s alone should move the composite to roughly 8; the agent-readability layer (feed, markdown mirrors, generated llms.txt, remote MCP) is what turns the "agent-ready" claim into something headless agents can actually use.
