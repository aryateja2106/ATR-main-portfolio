// Centralized social-image references used by per-page Metadata exports.
//
// Why this file exists:
//  - Next.js does NOT auto-merge file-based opengraph-image.tsx / twitter-image.tsx
//    into a child route's metadata when that child explicitly defines `metadata.openGraph`
//    or `metadata.twitter` (see Next.js issues #47540 / #50698).
//  - Our convention OG/Twitter files live at the (portfolio) route-group segment.
//  - To avoid every page silently losing its og:image when it customizes og:title/description,
//    every page-level openGraph/twitter block should spread these defaults in.
//
// In production, Next.js serves the convention files at stable path-prefixed URLs
// (e.g. /opengraph-image and /twitter-image). They become absolute via metadataBase.

export const SOCIAL_OG_IMAGE = {
	url: "/opengraph-image",
	width: 1200,
	height: 630,
	alt: "Arya Teja Rudraraju · Agentic Engineer · Founder, LeSearch AI + CloudAGI · Building LeCoder MConnect · San Francisco",
} as const;

export const SOCIAL_TWITTER_IMAGE = {
	url: "/twitter-image",
	width: 1200,
	height: 630,
	alt: "Arya Teja Rudraraju · Agentic Engineer · Founder, LeSearch AI + CloudAGI · Building LeCoder MConnect · San Francisco",
} as const;

export const DEFAULT_OG_IMAGES = [SOCIAL_OG_IMAGE];
export const DEFAULT_TWITTER_IMAGES = [SOCIAL_TWITTER_IMAGE];
