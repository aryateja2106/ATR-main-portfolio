import path from "node:path";
import type { NextConfig } from "next";

const repoRoot = path.resolve(__dirname, "../..");

// Security headers applied to every response served by this Next.js app.
//
// Scope note: these headers DO NOT apply to arya-pi.aryateja.com, which is
// served via a Cloudflare Tunnel directly to a Raspberry Pi. That host is
// behind Cloudflare's edge and uses Cloudflare's own security posture.
// Anything below only affects www.aryateja.com / aryateja.com on Vercel.
//
// HSTS deliberately omits `includeSubDomains` so we don't accidentally pin
// HSTS for arya-pi (it serves HTTPS via Cloudflare anyway, but pinning from
// the apex on this app's responses is the wrong layer to do that at).
const securityHeaders = [
	{
		key: "Strict-Transport-Security",
		value: "max-age=63072000",
	},
	{
		key: "X-Content-Type-Options",
		value: "nosniff",
	},
	{
		key: "X-Frame-Options",
		value: "DENY",
	},
	{
		key: "Referrer-Policy",
		value: "strict-origin-when-cross-origin",
	},
	{
		key: "Permissions-Policy",
		value:
			"camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=()",
	},
	{
		key: "Cross-Origin-Opener-Policy",
		value: "same-origin",
	},
	{
		key: "X-DNS-Prefetch-Control",
		value: "on",
	},
	// CSP in Report-Only mode for now. We're collecting violation reports
	// to size up the eventual enforcing policy without breaking inline
	// scripts (Next runtime + theme color sync), Vercel Analytics +
	// Speed Insights, GA, simpleicons CDN, fonts, or self-hosted images.
	// Flip this to `Content-Security-Policy` once forms + Three.js land
	// and the violation set is empty across the routes we care about.
	{
		key: "Content-Security-Policy-Report-Only",
		value: [
			"default-src 'self'",
			"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vercel.live https://www.googletagmanager.com https://www.google-analytics.com",
			"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
			"font-src 'self' data: https://fonts.gstatic.com",
			"img-src 'self' data: blob: https://cdn.simpleicons.org https://ui.shadcn.com https://cursor.com https://avatar.vercel.sh https://www.google-analytics.com",
			"connect-src 'self' https://vitals.vercel-insights.com https://vercel.live https://www.google-analytics.com https://region1.google-analytics.com",
			"frame-ancestors 'none'",
			"base-uri 'self'",
			"form-action 'self'",
			"object-src 'none'",
			"upgrade-insecure-requests",
		].join("; "),
	},
];

const nextConfig: NextConfig = {
	experimental: {
		// ppr: true, // Deprecated in Next.js 16
	},
	outputFileTracingRoot: repoRoot,
	turbopack: {
		// Ensure Turbopack can resolve workspace deps in the monorepo (bun store lives at repo root).
		root: repoRoot,
	},
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: securityHeaders,
			},
			{
				source: "/resume/:path*",
				headers: [
					{
						key: "Content-Disposition",
						value: 'attachment; filename="Arya_Teja_Rudraraju_Resume.pdf"',
					},
				],
			},
			{
				source: "/llms.txt",
				headers: [
					{
						key: "Content-Type",
						value: "text/plain; charset=utf-8",
					},
					{
						key: "X-Robots-Tag",
						value: "all",
					},
				],
			},
		];
	},
	images: {
		remotePatterns: [
			{
				hostname: "avatar.vercel.sh",
			},
			{
				protocol: "https",
				hostname: "cdn.simpleicons.org",
			},
			{
				protocol: "https",
				hostname: "ui.shadcn.com",
			},
			{
				protocol: "https",
				hostname: "cursor.com",
			},
		],
	},
};

export default nextConfig;
