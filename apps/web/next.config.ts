import path from "node:path";
import type { NextConfig } from "next";

const repoRoot = path.resolve(__dirname, "../..");
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
				source: "/resume/:path*",
				headers: [
					{
						key: "Content-Disposition",
						value: 'attachment; filename="Arya_Teja_PM_Resume.pdf"',
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
