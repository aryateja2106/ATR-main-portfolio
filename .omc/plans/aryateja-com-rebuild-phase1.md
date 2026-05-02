---
name: aryateja-com-rebuild-phase1
created: 2026-05-02
status: draft
effort: advanced
timeline: 2-weeks
owner: Arya Teja Rudraraju
---

# aryateja.com — Phase 1 Rebuild Plan

## 1. Requirements Summary

Rebuild aryateja.com from a stale "AI Engineer & Automation Specialist" portfolio into a sharp, mobile-first **Agentic Engineer** brand site for an SF-based founder (LeSearch AI + CloudAGI, building LeCoder MConnect). Phase 1 is brand site only. The authenticated chat surface and AI artifact editors are removed entirely. Phase 2 (deferred) is the agent control surface (TUI/tmux multi-agent UI) on a separate subdomain.

**Canonical identity** (from brand audit 2026-02-28):
> Agentic Engineer · Founder, LeSearch AI + CloudAGI · Building LeCoder MConnect · San Francisco

**Voice rules:**
- Builder who ships in public. Direct, technical, no corporate speak.
- No em-dashes anywhere in copy (signals AI-written).
- No "aspiring" language. No "AI PM" framing (deprecated identity).

**Design direction:** Mobile-first AI-OS-lite. Subtle OS-influenced layout (cmd+K palette, status bar, dock-style nav, terminal accent), single Three.js ambient hero, cursor-follow novelty interaction on mobile (finger drives a virtual cursor, ties to LeCoder MConnect product narrative). Clean, scannable inner pages.

**Backend:** Migrate Drizzle from `@vercel/postgres` to Supabase. Phase 1 tables: `newsletter_subscribers`, `contact_messages`. Drop chat/auth schema entirely.

---

## 2. Acceptance Criteria (atomic, testable)

### A. Cleanup (kill bloat)

- [ ] AC-1: `app/(chat)/` directory deleted
- [ ] AC-2: `app/(auth)/` directory deleted
- [ ] AC-3: `apps/web/artifacts/` directory deleted
- [ ] AC-4: `lib/editor/` directory deleted (ProseMirror)
- [ ] AC-5: `components/sheet-editor.tsx` and chat-only artifact components deleted
- [ ] AC-6: `next-auth`, `bcrypt-ts` removed from `apps/web/package.json`
- [ ] AC-7: All `prosemirror-*` deps removed from `apps/web/package.json`
- [ ] AC-8: `matter-js`, `poly-decomp` removed
- [ ] AC-9: `react-data-grid`, `papaparse`, `diff-match-patch`, `codemirror`, `@codemirror/*` removed unless retained for blog code blocks
- [ ] AC-10: `@ai-sdk/google`, `@ai-sdk/xai`, `@ai-sdk/react`, `ai` removed
- [ ] AC-11: `lib/ai/` directory deleted
- [ ] AC-12: `apps/web/app/(portfolio)/_components/fancy/physics/` deleted (matter-js gravity hero)
- [ ] AC-13: `.cursor/` removed from repo (gitignored if needed)
- [ ] AC-14: `github-stars-da` orphan fragment cleaned up
- [ ] AC-15: `bun install` succeeds with zero unresolved imports after cleanup
- [ ] AC-16: `bun run check-types` passes with zero errors
- [ ] AC-17: `bun run build` succeeds locally

### B. Database migration to Supabase

- [ ] AC-18: New Supabase project provisioned. URL + anon key + service-role key in `.env.local`
- [ ] AC-19: `@vercel/postgres` removed; `postgres` driver retained
- [ ] AC-20: `drizzle.config.ts` points to Supabase connection string
- [ ] AC-21: `lib/db/schema.ts` reduced to two tables: `newsletter_subscribers`, `contact_messages`
- [ ] AC-22: `lib/db/helpers/01-core-to-parts.ts` deleted (chat-specific)
- [ ] AC-23: New migration generated via `bun run db:generate`
- [ ] AC-24: Migration applied via `bun run db:migrate`
- [ ] AC-25: RLS enabled on both tables, write policies via service-role only

### C. Brand foundation (copy + tokens)

- [ ] AC-26: `lib/portfolio/site.ts` updated: location = "San Francisco, CA", title = "Agentic Engineer", company = "LeSearch AI + CloudAGI"
- [ ] AC-27: All site copy passes a "no em-dash" lint (zero em-dash chars in `app/(portfolio)/**/*.{tsx,md,mdx}`)
- [ ] AC-28: All site copy passes a "no aspiring" lint (zero matches for `aspiring|hoping to|looking to break into`)
- [ ] AC-29: Design tokens in `app/globals.css` as CSS vars: bg, surface, border, text, text-muted, primary, accent, warn, font-body (Geist), font-mono (Geist Mono)
- [ ] AC-30: Light + dark themes both defined; defaults to system preference
- [ ] AC-31: `tailwind.config.ts` consumes only token CSS vars (no hex literals)

### D. Home page (AI-OS-lite landing)

- [ ] AC-32: Top status bar shows: location (`SF`), current focus (`building LeCoder`), command palette hint (`⌘K`)
- [ ] AC-33: Hero section displays terminal-style identity block: `$ whoami` rendering "Arya Teja Rudraraju · Agentic Engineer · SF"
- [ ] AC-34: One Three.js ambient hero scene renders behind/beside the terminal block. Scene loads under 200KB gzipped JS budget.
- [ ] AC-35: Cmd+K command palette opens via `cmd/ctrl+k`, lists routes (about, projects, blog, faq, now, uses, reading, github-stars, resume), navigates on select
- [ ] AC-36: Bottom dock-style nav visible on desktop (≥768px), collapses to standard mobile nav on <768px
- [ ] AC-37: Widget cards for "Now", "Latest project", "Latest post", "Reading" populate from data sources (MDX, /now/page, /reading)
- [ ] AC-38: Mobile cursor-follow novelty: finger touch drives a virtual cursor element with smooth easing, visible on home hero only
- [ ] AC-39: Lighthouse mobile score ≥ 90 perf, ≥ 95 a11y, 100 SEO
- [ ] AC-40: First contentful paint < 1.5s on simulated 3G

### E. About page

- [ ] AC-41: Headline reads "Agentic Engineer" (no "AI PM", no em-dashes)
- [ ] AC-42: Location reads "San Francisco" (zero "Dallas" or "Texas" references in active copy)
- [ ] AC-43: Bio narrative covers pivot from marketing to AI engineering to founding LeSearch AI + CloudAGI to building LeCoder MConnect
- [ ] AC-44: Career arc section dated 2024 to present with three concrete milestones
- [ ] AC-45: "What I'm building right now" lists at minimum LeSearch AI, LeCoder MConnect, CloudAGI, Software Factory, NL2Shell

### F. Projects

- [ ] AC-46: `lib/portfolio/projects.ts` includes in this order: LeCoder MConnect, LeSearch AI, CloudAGI, Software Factory, NL2Shell, Karna, Claude Agent Monitor
- [ ] AC-47: Each project entry has title, one-liner, status, stack, repo URL, live URL (if any), 3-5 bullet description
- [ ] AC-48: `/projects` index renders all projects as cards with consistent layout
- [ ] AC-49: `/projects/[slug]` deep-dive renders full detail with screenshots if available

### G. Blog

- [ ] AC-50: Existing blog routes (`/blog`, `/blog/[slug]`, `/blog/tag/[tag]`) retained and restyled to AI-OS-lite tokens
- [ ] AC-51: Blog source remains MDX
- [ ] AC-52: Each post has title, dek, date, tags, reading time, OG image, JSON-LD article schema
- [ ] AC-53: Tag pages list posts filtered by tag; sitemap includes all tag URLs
- [ ] AC-54: Code blocks render with syntax highlighting via `shiki` or `rehype-pretty-code`

### H. Secondary routes

- [ ] AC-55: `/now` page reflects May 2026 baseline and is dated
- [ ] AC-56: `/faq` contains answer-engine Q&A: "Who is Arya Teja Rudraraju?", "What is LeCoder MConnect?", "What is CloudAGI?", "What is LeSearch AI?", "How can I contact Arya?", "Is Arya hiring or open to roles?"
- [ ] AC-57: `/uses` lists current stack (hardware, dev tools, AI tools, services), dated
- [ ] AC-58: `/reading` lists current and recent reads with one-line takeaways
- [ ] AC-59: `/github-stars` ports `github-stars-dashboard.html` to a Next.js page consuming the same JSON, themed to AI-OS-lite tokens
- [ ] AC-60: `/resume` route serves the current PDF (renamed to drop `_PM`)

### I. SEO + AEO surface

- [ ] AC-61: `public/llms.txt` rewritten: title = "Agentic Engineer · Founder, LeSearch AI + CloudAGI", location = SF, projects list updated to match `/projects`, contact = aryateja2106@gmail.com (verify), all links current
- [ ] AC-62: `public/robots.txt` allows all crawlers, references sitemap and llms.txt
- [ ] AC-63: `app/sitemap.ts` includes all current routes; chat/auth exclusions removed
- [ ] AC-64: Root metadata: title template, description = single Agentic Engineer one-liner, canonical = https://www.aryateja.com, OG + Twitter card images set
- [ ] AC-65: JSON-LD Person schema: name, url, sameAs (LinkedIn, GitHub, X, npm), jobTitle = "Agentic Engineer", worksFor (LeSearch AI)
- [ ] AC-66: Per-route `opengraph-image.tsx` retained and updated for new branding
- [ ] AC-67: `app/(portfolio)/projects/[slug]/opengraph-image.tsx` generates OG cards per project
- [ ] AC-68: IndexNow script runs on deploy and submits all sitemap URLs

### J. Newsletter + contact

- [ ] AC-69: Footer/dedicated section has newsletter form posting to `/api/subscribe`, writes to `newsletter_subscribers` (email, signup_source, created_at)
- [ ] AC-70: Contact form posts to `/api/contact`, writes to `contact_messages` (name, email, message, created_at), triggers email via Resend to aryateja2106@gmail.com
- [ ] AC-71: Both forms have client validation, loading state, success/error toast, rate limit (1/min/IP)

### K. Phase-2 hooks

- [ ] AC-72: README updated with phase-1 scope and explicit "phase 2 = agent surface on subdomain" note
- [ ] AC-73: `lib/portfolio/projects.ts` has a `phase2Hooks` comment block listing follow-on work

---

## 3. Implementation Steps (sequenced)

### Step 1: Cleanup pass (Day 1)
1.1. Branch: `git checkout -b rebuild/phase-1-cleanup`
1.2. Delete `app/(chat)/`, `app/(auth)/`, `apps/web/artifacts/`, `lib/editor/`, `lib/ai/`
1.3. Delete `apps/web/app/(portfolio)/_components/fancy/physics/`
1.4. Trim `apps/web/package.json` deps per AC-6 to AC-11
1.5. Run `bun install`, fix import errors, run `bun run check-types` until clean
1.6. Run `bun run build` locally
1.7. Commit: `chore(rebuild): aggressive bloat removal — chat, auth, artifacts, prosemirror, matter-js, ai-sdk`

### Step 2: Supabase migration (Day 2)
2.1. Provision Supabase project. Capture URL, anon key, service-role key.
2.2. Add `.env.local` and `.env.example` keys: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `DATABASE_URL`
2.3. Update `drizzle.config.ts` to point at Supabase connection
2.4. Rewrite `lib/db/schema.ts`: drop User, Chat, Message, Vote, Document, Suggestion. Add `newsletter_subscribers` and `contact_messages`.
2.5. Replace `lib/db/migrate.ts` with simple Drizzle migrate runner
2.6. `bun run db:generate`
2.7. `bun run db:migrate`
2.8. Configure RLS policies via Supabase SQL
2.9. Commit: `feat(db): migrate Drizzle to Supabase, schema = newsletter + contact only`

### Step 3: Brand foundation (Day 3)
3.1. Create `lib/portfolio/brand.ts` with canonical strings (identity, location, voice rules)
3.2. Update `lib/portfolio/site.ts` with new metadata
3.3. Define design tokens in `app/globals.css` (light + dark)
3.4. Update `tailwind.config.ts` to consume only tokens
3.5. Build component primitives: `WindowChrome`, `StatusBar`, `Dock`, `Widget`, `TerminalBlock`, `CommandPalette`
3.6. Add `lint:no-emdash` script to `package.json`
3.7. Commit: `feat(brand): tokens, primitives, no-em-dash lint`

### Step 4: Three.js hero + cursor-follow (Day 4-5)
4.1. Add `three`, `@react-three/fiber`, `@react-three/drei` (verify bundle budget)
4.2. Build `components/hero/AmbientScene.tsx`. GPU-light, paused on prefers-reduced-motion
4.3. Code-split: dynamic import with `ssr: false`, fallback to static gradient on first paint
4.4. Build `components/interactions/MobileCursor.tsx`. Finger-driven virtual cursor with spring easing (Framer Motion)
4.5. Wire into `app/(portfolio)/page.tsx` home only
4.6. Verify Lighthouse mobile perf ≥ 90
4.7. Commit: `feat(home): Three.js ambient hero + mobile cursor-follow interaction`

### Step 5: Home + command palette (Day 5-6)
5.1. Rebuild `app/(portfolio)/page.tsx`: StatusBar then TerminalBlock + AmbientScene then Widget grid then Dock
5.2. Build `components/CommandPalette.tsx` (use `cmdk`, ~12KB)
5.3. Wire `cmd/ctrl+k`, mobile fallback button
5.4. Wire widgets: pull /now content, latest project, latest blog post, current reading
5.5. Commit: `feat(home): AI-OS-lite landing with cmd+K palette and widget grid`

### Step 6: Inner pages copy refresh (Day 6-8)
6.1. Rewrite `/about` per AC-41 to AC-45. Run no-em-dash lint.
6.2. Update `lib/portfolio/projects.ts` per AC-46. Rebuild `/projects` index and `/projects/[slug]`.
6.3. Update `/now` to May 2026 state.
6.4. Rewrite `/faq` Q&A per AC-56.
6.5. Refresh `/uses` and `/reading`.
6.6. Port github-stars dashboard HTML to a Next.js page consuming `lib/portfolio/github-stars.json`. Style with new tokens.
6.7. Verify resume PDF and route at `/resume`.
6.8. Commit: `feat(content): rewrite about/projects/faq/now/uses/reading; port github-stars`

### Step 7: SEO + AEO polish (Day 9)
7.1. Rewrite `public/llms.txt` per AC-61
7.2. Update `public/robots.txt`
7.3. Verify `app/sitemap.ts` covers all current routes
7.4. Update root layout metadata + JSON-LD Person schema
7.5. Update per-route OG images
7.6. Add `app/(portfolio)/projects/[slug]/opengraph-image.tsx`
7.7. Run IndexNow after first deploy
7.8. Commit: `feat(seo): rewrite llms.txt, JSON-LD Person, per-project OG images`

### Step 8: Newsletter + contact (Day 10)
8.1. Build `/api/subscribe` route handler, write to Supabase
8.2. Build `/api/contact` route handler, write to Supabase + Resend email
8.3. Add Resend dep, configure `RESEND_API_KEY`
8.4. Build `components/forms/NewsletterForm.tsx` and `ContactForm.tsx`
8.5. Wire into footer and `/about`
8.6. Add rate limiting (Upstash Redis or in-memory map for v1)
8.7. Commit: `feat(forms): newsletter + contact via Supabase + Resend`

### Step 9: Verification + ship (Day 11-14)
9.1. Full Lighthouse mobile + desktop
9.2. Manually walk every route on iPhone Safari, Android Chrome, desktop Safari, Chrome, Firefox
9.3. Test cmd+K on mac+windows keyboards
9.4. Test mobile cursor-follow on real device
9.5. Verify newsletter + contact end-to-end (DB row + email received)
9.6. Verify Vercel preview deploys
9.7. Update root README with phase-1 scope
9.8. Merge to main, deploy to production
9.9. Run IndexNow submit
9.10. Verify Google sees new content in Search Console
9.11. Tag release `v4.0.0-phase1`

---

## 4. Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Three.js + r3f inflate bundle past mobile budget | Code-split, lazy-load, prefers-reduced-motion fallback, 200KB hero chunk budget |
| Mobile cursor-follow feels gimmicky on real devices | Kill switch (`?nocursor=1`), feature flag, A/B test before going live |
| Aggressive deletion breaks something subtle | Run `check-types` after every deletion batch; small reviewable PR |
| Supabase migration loses data | Currently no production data outside chat (which is being removed). Verify by SELECT before migration; SQL backup if any rows |
| Em-dash lint flags legitimate uses in MDX | Scope lint to non-blog directories; allow long-dash with explicit `<!-- emdash-ok -->` |
| Cursor-follow doesn't ship cleanly | Treat as nice-to-have; ship without if Day 4-5 budget overruns |
| Phase-2 agent surface gets re-introduced on main domain | Document in README and CLAUDE.md; reject in PR review |
| llms.txt drifts from canonical brand strings | Single source: `lib/portfolio/brand.ts`; generate llms.txt from same source where possible |
| Bun install resolves stale lockfile after dep removals | `rm bun.lockb && bun install` after each major dep cut |

---

## 5. Verification Steps

### Cleanup
- `find apps/web -type d \( -name '(chat)' -o -name '(auth)' -o -name 'artifacts' -o -name 'editor' -o -name 'ai' \)` returns empty
- `bun run check-types` exits 0
- `bun run lint` exits 0
- `bun run build` exits 0
- `du -sh apps/web/.next` shows materially smaller bundle vs baseline

### Brand
- `grep -rn em-dash chars in apps/web/app apps/web/lib apps/web/components` returns zero outside MDX
- `grep -rni 'aspiring\|hoping to\|AI PM\|Dallas\|Texas' apps/web/app apps/web/lib apps/web/components` returns zero
- llms.txt diff vs brand audit matches identity exactly
- `/about` headline contains "Agentic Engineer"
- `/about` location contains "San Francisco"

### SEO
- `curl https://www.aryateja.com/sitemap.xml` returns valid XML with all routes
- `curl https://www.aryateja.com/llms.txt` matches new content
- `curl https://www.aryateja.com/robots.txt` allows all + references sitemap + llms.txt
- View-source on home shows JSON-LD Person schema
- Lighthouse SEO = 100 on home, about, projects, blog index

### Performance
- Lighthouse mobile perf ≥ 90 on home, about, projects, blog
- Bundle analyzer: hero chunk < 200KB gzipped
- FCP < 1.5s simulated 3G

### Functional
- cmd+K opens palette on macOS Chrome and Safari
- ctrl+K opens palette on Windows Chrome and Edge
- Mobile cursor-follow works on iPhone Safari and Android Chrome
- Newsletter form writes a row to Supabase, shows success toast
- Contact form writes a row AND sends email to aryateja2106@gmail.com
- Resume PDF downloads via `/resume`

### AEO (post-deploy)
- Manual query in ChatGPT, Claude, Gemini for "Who is Arya Teja Rudraraju?" cites aryateja.com and reflects Agentic Engineer identity within 2 weeks
- Search Console shows new metadata indexed within 1 week
- Site appears for "Arya Teja Rudraraju" search with new headline within 1-2 weeks

---

## 6. Phase-2 Follow-ons (deferred)

1. Agent control surface at `agents.aryateja.com`. TUI/tmux multi-agent UI, separate Next.js or Tauri app, integrates LeCoder MConnect protocol
2. Content pipeline. 11labs voice clone API, Gemini/Codex image gen, scheduled blog draft + social post generation from SecondBrain notes
3. Software Factory product page once the personal-app deployment system has its own landing
4. Newsletter automation. RSS-to-email or scheduled digest via Resend or Buttondown
5. Comments/interactions on blog posts (Cusdis or Giscus)
6. Analytics dashboard (already on Vercel Analytics; consider Plausible self-host)

---

## 7. Open Questions (need user input before/during execution)

1. Final Three.js hero concept: particle grid vs low-poly globe vs custom Spline import? (defer to Day 4)
2. Should `/resume` redirect to a printable HTML resume page in addition to PDF? (phase 2 candidate)
3. Newsletter provider: Supabase-only, or layer Resend Audiences / Buttondown for delivery?
4. Inspiration sites or Figma URLs to reference: paste in next message so design pass can use them concretely

---

## Changelog

- 2026-05-02: initial draft from interview + brand audit + codebase explore
