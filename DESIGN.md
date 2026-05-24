# Aryateja.com Design System

Chosen direction: **Archive Founder**.

Secondary mode: **Ivory Product** for light surfaces, product pages, readable long-form pages, and social assets that need a calmer everyday feel.

The brand should feel like a founder's working archive for agentic systems: minimal, monochrome, premium, source-backed, and calm. It should not feel like a generic AI portfolio, cyberpunk terminal, SaaS landing page, or decorative personal blog.

## North Star

Arya is building in public, but the visual system should make the work feel collected, indexed, and durable. The site is not only a portfolio. It is a public archive of builds, source notes, demos, project receipts, and the learning trail behind LeCoder MConnect, LeSearch AI, CloudAGI, NL2Shell, and related agentic engineering work.

## Mood

- Minimal modern.
- Monochrome first.
- Premium but not flashy.
- Archival, source-aware, and deliberate.
- Technical through evidence, not through terminal aesthetics.
- Calm enough for daily writing, strong enough for launch moments.

## What To Avoid

- No Technical Mono as the primary style.
- No green-on-black terminal brand.
- No purple-blue gradients.
- No glossy SaaS hero.
- No nested cards.
- No decorative blobs, bokeh, or gradient orbs.
- No stock-like abstract AI visuals.
- No em-dashes in public copy or MDX.
- No "AI PM", "aspiring", or Dallas positioning.

## Color System

### Archive Founder Core

Use this for the homepage, about, projects, essays, archive indexes, and serious brand surfaces.

| Token | Hex | Use |
|---|---:|---|
| Archive black | `#12110f` | Page background, dark hero bands |
| Archive panel | `#1c1a17` | Panels, project records, content surfaces |
| Archive ivory | `#f7f2e8` | Primary text on dark surfaces |
| Archive stone | `#b9b0a2` | Secondary text, rules, metadata |
| Archive ash | `#6c655d` | Quiet captions, timestamps, source labels |

### Ivory Product Companion

Use this for light mode, product explainers, social templates, readable guides, and daily content assets.

| Token | Hex | Use |
|---|---:|---|
| Ink | `#111111` | Primary text and primary buttons |
| Ivory | `#fffdf7` | Main light surface |
| Warm paper | `#f2eee4` | Light page background |
| Soft stone | `#c8c0b4` | Rules, dividers, muted UI |
| Warm gray | `#6f6a60` | Secondary text |

### Accent Rule

The brand is monochrome. Accent color should be rare. When needed, use only:

- Deep source red for risk or security warnings.
- Muted brass for "receipt" or "source" moments.
- Never use a bright accent as the main brand signal.

## Typography

The visual system needs a high-contrast editorial display voice plus a clean sans body. Use available repo fonts first, but design toward this structure:

- Display: high-contrast serif or refined editorial face for H1 and hero-level statements.
- Body: clean modern sans for paragraphs, navigation, captions, and repeated UI.
- Mono: metadata only. Use it for dates, source IDs, repo labels, command snippets, and small index markers. Do not make the whole site feel like a terminal.

### Type Scale

- Hero H1: 96 to 128px desktop, 48 to 64px mobile.
- Page H1: 64 to 88px desktop, 40 to 52px mobile.
- Section H2: 32 to 48px.
- Card title: 22 to 30px.
- Body: 17 to 20px, line height 1.5 to 1.65.
- Metadata: 11 to 13px mono, uppercase only when labels are short.

Letter spacing should be 0 for body and metadata. Display type may use slight negative tracking only when the font and viewport can handle it cleanly.

## Layout

Use the archive metaphor:

- Pages feel like records, not marketing funnels.
- Important sections use generous whitespace and strong rules.
- Repeated items look like index entries, source cards, records, or case files.
- Use full-width sections and constrained inner content.
- Cards are allowed for repeated records only. Do not put cards inside cards.

### Page Structure

Homepage:

1. Archive-style hero: identity, one precise statement, current work links.
2. Current records: LeCoder MConnect, LeSearch AI, CloudAGI, NL2Shell.
3. Source notes: recent OSS breakdowns, build logs, security notes.
4. Proof section: screenshots, demos, repo links, receipts.
5. Social/content archive: latest posts and videos.

Project pages:

1. Problem.
2. System.
3. Build receipts.
4. Current status.
5. What changed in Arya's understanding.
6. Source links.

Blog and notes:

1. Strong editorial title.
2. Source/date metadata.
3. Comfortable reading width.
4. Inline evidence blocks.
5. Related notes by topic and source.

## Components

### Navigation

Sparse, text-first, and archival.

- Left: `Arya Teja Rudraraju`.
- Right: `/projects`, `/notes`, `/now`, `/uses`, `/contact`.
- Mobile: simple full-screen list, no decorative animation.

### Buttons

Use thin bordered buttons with 4px radius or square corners.

- Primary dark mode: ivory fill on archive black.
- Primary light mode: black fill on ivory.
- Secondary: transparent with one-pixel border.
- Labels should be specific: `Read the work`, `Study projects`, `Open source notes`.

### Record Cards

Use for projects, posts, and source notes.

Required fields:

- Type label: `Project`, `Source note`, `Build log`, `Security brief`.
- Title.
- One sentence summary.
- Date or status.
- Source or project link when relevant.

### Evidence Blocks

Use for screenshots, command snippets, diagrams, and receipts.

- Caption every evidence block.
- Include source path, repo, or URL when available.
- Avoid decorative frames. The evidence is the design.

### Index Lists

Use for notes and archive pages.

- Left column: date, index number, or source type.
- Right column: title and short summary.
- Thin rule between rows.
- No heavy hover effects.

## Social Templates

The social system should reuse the same archive language.

### LinkedIn Carousel

- Format: 1:1 or 4:5.
- Style: monochrome, thin rules, large editorial title.
- Slide 1: claim.
- Slides 2 to 5: mechanism, example, risk, takeaway.
- Final slide: source link or "follow the build".

### X Card

- Format: 16:9 or 1:1.
- Use one strong sentence.
- Include a source label or repo name.
- Prefer diagrams and screenshots over abstract backgrounds.

### YouTube Short

- Format: 9:16.
- Title frame in Archive Founder dark mode.
- Demo frames can use Ivory Product for readability.
- Use captions with high contrast and large type.

## Image Direction

Use real artifacts first:

- Terminal screenshots only when they prove something.
- Repo screenshots.
- Architecture diagrams.
- Browser or mobile workflow screenshots.
- Product UI screenshots.
- Annotated source files.

Generated images are allowed only when they help explain an abstract idea and still feel monochrome, editorial, and restrained.

## Motion

Motion should be quiet and expensive-feeling:

- Slow opacity and position reveals.
- No bounce or elastic easing.
- No looping decorative motion.
- Hover states should be subtle: rule color, background shift, or slight text movement.
- Respect reduced motion.

## Implementation Notes

- Start from the current Next.js app and remove old teal/glow/terminal visual language.
- Keep app performance high and pages server-rendered where possible.
- Use CSS variables in `apps/web/app/globals.css` for archive tokens.
- Keep components accessible and keyboard navigable.
- Use the `brand-lab/luxury-03-archive-founder.html` board as the primary visual reference.
- Use `brand-lab/luxury-02-ivory-product.html` as the secondary light-mode/product reference.

## Decision

Primary design direction:

> Archive Founder: a working archive of agentic systems.

Secondary companion:

> Ivory Product: a light monochrome mode for product explainers and daily content readability.
