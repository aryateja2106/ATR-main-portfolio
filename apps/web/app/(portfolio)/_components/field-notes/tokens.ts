// Field Notes design tokens — single source of truth.
// Values are plain strings so they are consumable by both the web app
// (Tailwind/CSS) and a future video renderer (Remotion / Hyperframes).

export const fn = {
  bg: '#e9dfc7', // cream page background
  paper: '#f6efdd', // card / raised surface
  ink: '#131815', // primary text
  muted: 'rgba(19, 24, 21, 0.62)', // secondary text
  line: 'rgba(19, 24, 21, 0.18)', // hairline borders
  accent: '#a65728', // terracotta
  accentSoft: '#c98a5a',
} as const;

export const fonts = {
  serif: 'var(--font-fraunces), Georgia, serif',
  mono: 'var(--font-jetbrains-mono), "JetBrains Mono", monospace',
  sans: 'var(--font-geist), "IBM Plex Sans", system-ui, sans-serif',
} as const;

export const radii = { sm: 8, md: 10, lg: 14 } as const;

// Aspect ratios reused across web + video storyboard.
export const aspect = {
  portrait: '4 / 5',
  landscape: '3 / 2',
} as const;
