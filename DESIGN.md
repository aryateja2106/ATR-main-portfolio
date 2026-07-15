# Portfolio design system

## Direction

AryaTeja.com uses a field-notes identity with selective editorial contrast. The portfolio should feel personal, calm, technically credible, and current. ContentOS-style ideas can appear as strong type, visible structure, paper-like panels, and direct interaction, but the site should not become a monochrome software landing page.

The intended balance is roughly 70 percent personal field journal and 30 percent product-editorial energy.

## Visual language

### Core palette

- Ink: `#12110f` and `#171512`
- Paper: `#f7f2e8`, `#f2ecdf`, and `#eee8dc`
- Muted ink: `#514a42`, `#6f665b`, and `#b9b0a2`
- Structural blue: `#2563eb`, `#245af5`, and pale `#cfdcff`
- Green is reserved for clear status or focus accents, not broad decoration.

Dark sections hold identity, work, and navigation. Paper sections create reading pauses for experience, stack details, and long-form articles.

### Type

- Serif: identity, section statements, and article titles.
- Sans serif: body copy, actions, and supporting explanations.
- Mono: labels, dates, indexes, technical metadata, and small annotations.

Use responsive `clamp()` scales for large headings. Avoid squeezing desktop display type into mobile widths.

### Shape and depth

- Borders carry most of the structure.
- Small square shadows may emphasize one primary editorial card.
- Corners stay restrained. Pills are for tags and compact technical items only.
- Do not add glass panels, neon glows, generic gradients, floating particles, or physics effects.

## Interaction principles

- Public content must remain available in the initial HTML.
- Prefer native links, `details`/`summary`, and CSS state over client libraries.
- Hover can reward exploration but cannot be the only way to reveal information.
- Every interactive target should be at least 44 by 44 CSS pixels on touch layouts.
- Focus states must be visible against both ink and paper backgrounds.
- Respect reduced-motion preferences and keep transforms small and optional.

## Responsive behavior

- The fixed desktop navigation becomes a native disclosure menu below the large breakpoint.
- The mobile menu includes every primary destination and the contact action.
- Sections collapse to one column before content becomes cramped.
- Blog images keep stable aspect ratios; article text stays within a readable measure.
- Article contents use a sticky sidebar on desktop and a disclosure block on mobile.
- No route may create horizontal page overflow at 390 CSS pixels.

## Component rules

### Navigation

Keep the logo, all destinations, and contact path semantic. Menu links close the mobile disclosure after selection. Do not hide navigation behind canvas, custom gesture code, or an icon-only desktop pattern.

### Hero

Use a real portrait and direct positioning statement. Follow with evidence or working context, not a wall of badges. The primary action starts a conversation; the secondary action shows work.

### Working stack

The stack is supporting evidence, not the site's identity. Group tools by the work they enable, include operating principles, and use native disclosure cards. Do not restore falling-logo simulations, remote icon injection, or a giant logo cloud.

### Work and experience

Separate current experiments from proven professional experience. Use status labels and truthful descriptions. Proof links should be visible and specific.

### Writing

The index prioritizes one current note and a compact chronological archive. Article pages use one `article` landmark, real heading anchors, publication metadata, structured data, a reader/agent brief, and clear continuation links.

## Accessibility and agent readability

Target WCAG 2.2 AA. Use one main landmark, ordered heading levels, descriptive link text, valid time elements, keyboard-operable disclosures, sufficient contrast, and useful alternative text.

The same structure should work for agents: server-render meaningful copy, publish canonical metadata and JSON-LD, maintain `llms.txt`, preserve sitemap/robots behavior, and expose only bounded, visible WebMCP navigation tools.

## Anti-patterns

- Do not copy Lecoder or ContentOS page-for-page.
- Do not lead with the technology list.
- Do not add another portfolio component family without deleting or migrating the current one.
- Do not use animation to compensate for weak hierarchy.
- Do not publish generated claims, stale job positioning, or implied customer outcomes.
- Do not put chat-only styles or dependencies back into the public route bundle.
