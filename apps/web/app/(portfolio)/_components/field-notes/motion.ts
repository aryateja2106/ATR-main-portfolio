import type { Variants } from 'framer-motion';

// Shared easing — MUST be reused verbatim by any video renderer so the
// web animation and the generated video feel identical.
export const EASE: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

// Parent that staggers its children's entrance.
export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: gap, delayChildren: delay },
  },
});

// Scroll-reveal props — spread onto any <motion.*> to animate on enter.
export const reveal = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, margin: '-80px' },
} as const;

// ---------------------------------------------------------------------------
// VIDEO-PORTABLE STORYBOARD
// A format-agnostic description of the page as a timed sequence. Remotion /
// Hyperframes consume this exact data so the promo video replays the site's
// motion 1:1. Durations are in frames @ STORYBOARD_FPS.
// ---------------------------------------------------------------------------
export const STORYBOARD_FPS = 30;

export type SceneVariant = 'fadeUp' | 'scaleIn' | 'stagger';

export interface StoryboardScene {
  id: string;
  label: string;
  durationInFrames: number;
  variant: SceneVariant;
}

export const storyboard: StoryboardScene[] = [
  { id: 'hero', label: 'Hero', durationInFrames: 90, variant: 'fadeUp' },
  { id: 'journey', label: 'Journey', durationInFrames: 120, variant: 'stagger' },
  { id: 'writing', label: 'Writing', durationInFrames: 90, variant: 'stagger' },
  { id: 'agents', label: 'Agents', durationInFrames: 90, variant: 'scaleIn' },
];

export const storyboardTotalFrames = storyboard.reduce(
  (sum, s) => sum + s.durationInFrames,
  0,
);
