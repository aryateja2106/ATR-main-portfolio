import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/portfolio/site";
import {
	DEFAULT_OG_IMAGES,
	DEFAULT_TWITTER_IMAGES,
} from "@/lib/portfolio/social-image";

const PAGE_TITLE = "Uses";
const PAGE_DESCRIPTION =
	"The hardware, software, and AI tools Arya Teja Rudraraju uses every day to ship agentic products. Inspired by uses.tech.";
const LAST_UPDATED = "2026-05-02";

export const metadata: Metadata = {
	title: PAGE_TITLE,
	description: PAGE_DESCRIPTION,
	alternates: { canonical: "/uses" },
	openGraph: {
		title: `${PAGE_TITLE} • ${SITE_NAME}`,
		description: PAGE_DESCRIPTION,
		url: `${SITE_URL}/uses`,
		type: "website",
		images: DEFAULT_OG_IMAGES,
	},
	twitter: {
		card: "summary_large_image",
		title: `${PAGE_TITLE} • ${SITE_NAME}`,
		description: PAGE_DESCRIPTION,
		images: DEFAULT_TWITTER_IMAGES,
	},
};

type UsesGroup = {
	title: string;
	items: Array<{
		name: string;
		description: string;
		href?: string;
	}>;
};

const groups: UsesGroup[] = [
	{
		title: "Daily AI workflow",
		items: [
			{
				name: "Claude Code",
				description:
					"Primary coding agent. Lives in the terminal, drives 0→1 prototypes.",
				href: "https://www.anthropic.com/claude/code",
			},
			{
				name: "Cursor",
				description:
					"Editor-side AI for refactors, inline edits, and longer multi-file changes.",
				href: "https://cursor.com",
			},
			{
				name: "ChatGPT and Claude (web)",
				description: "Quick lookups, brainstorms, structured writing.",
			},
			{
				name: "mconnect",
				description:
					"My own tool for driving Claude Code and Cursor from the phone — mobile-first AI dev workflows.",
				href: "/projects/lecoder-mconnect",
			},
		],
	},
	{
		title: "Editor and shell",
		items: [
			{
				name: "VS Code + Cursor",
				description: "Default editor with AI integration and pair programming.",
			},
			{
				name: "iTerm2 + zsh",
				description: "Terminal of choice. Powerlevel10k-flavored prompt.",
			},
			{
				name: "Bun",
				description: "Default JS package manager and runtime in this monorepo.",
				href: "https://bun.sh",
			},
		],
	},
	{
		title: "Frontend stack",
		items: [
			{
				name: "Next.js (App Router)",
				description: "Default web framework. Server components by default.",
				href: "https://nextjs.org",
			},
			{
				name: "TypeScript",
				description: "Default language for any non-trivial product code.",
			},
			{
				name: "Tailwind CSS + Radix UI",
				description: "Design system + accessible primitives.",
			},
			{
				name: "Framer Motion",
				description: "Polish layer for hero animations and interactions.",
			},
		],
	},
	{
		title: "Backend and data",
		items: [
			{
				name: "Supabase + Drizzle ORM",
				description:
					"Default OLTP. Hosted Postgres, auth, and storage in one place.",
				href: "https://supabase.com/",
			},
			{
				name: "FastAPI + Python",
				description: "Default for ML-heavy services like LeSearch AI.",
			},
			{
				name: "Bun (server)",
				description: "Runtime for CloudAGI and other TypeScript backends.",
				href: "https://bun.sh",
			},
		],
	},
	{
		title: "Hosting and infra",
		items: [
			{
				name: "Vercel",
				description: "Primary host for production web apps.",
				href: "https://vercel.com",
			},
			{
				name: "Cloudflare",
				description: "Tunnels for mconnect, DNS, and edge config.",
				href: "https://www.cloudflare.com/",
			},
			{
				name: "Supabase",
				description: "When LeSearch AI needs hosted Postgres + Auth.",
				href: "https://supabase.com/",
			},
		],
	},
	{
		title: "Product and analytics",
		items: [
			{
				name: "Amplitude",
				description:
					"Default product analytics. Built an analytics framework purpose-built for tracking agentic workflows.",
				href: "https://amplitude.com/",
			},
			{
				name: "Linear",
				description: "Issue tracking and roadmap.",
				href: "https://linear.app/",
			},
			{
				name: "Obsidian (SecondBrain)",
				description:
					"PRDs, customer discovery notes, knowledge base, daily log.",
				href: "https://obsidian.md/",
			},
		],
	},
	{
		title: "Hardware",
		items: [
			{
				name: "MacBook Pro (M-series)",
				description: "Daily driver. Runs everything except cloud GPU work.",
			},
			{
				name: "iPhone",
				description:
					"Where I drive Claude Code over mconnect when I am away from the desk.",
			},
		],
	},
];

export default function UsesPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-between">
			<article className="w-full px-4 max-w-3xl mx-auto pt-32 pb-20">
				<header className="mb-10">
					<p className="text-xs uppercase tracking-[0.2em] text-teal-400 mb-3">
						Uses
					</p>
					<h1 className="text-4xl md:text-5xl font-bold mb-3">
						What I use to ship agentic products
					</h1>
					<p className="text-sm text-neutral-500">
						Last updated <time dateTime={LAST_UPDATED}>{LAST_UPDATED}</time> ·
						Inspired by{" "}
						<a
							href="https://uses.tech"
							target="_blank"
							rel="noopener noreferrer"
							className="text-teal-400 hover:underline"
						>
							uses.tech
						</a>
						.
					</p>
				</header>

				{groups.map((group) => (
					<section key={group.title} className="mb-10">
						<h2 className="text-2xl font-semibold mb-3">{group.title}</h2>
						<ul className="space-y-3">
							{group.items.map((item) => (
								<li key={item.name}>
									{item.href ? (
										item.href.startsWith("/") ? (
											<Link
												href={item.href}
												className="text-teal-400 hover:underline font-medium"
											>
												{item.name}
											</Link>
										) : (
											<a
												href={item.href}
												target="_blank"
												rel="noopener noreferrer"
												className="text-teal-400 hover:underline font-medium"
											>
												{item.name}
											</a>
										)
									) : (
										<span className="font-medium text-neutral-100">
											{item.name}
										</span>
									)}{" "}
									<span className="text-neutral-400">— {item.description}</span>
								</li>
							))}
						</ul>
					</section>
				))}

				<aside className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 mt-16">
					<h2 className="text-lg font-semibold mb-2">Adjacent reading</h2>
					<div className="flex flex-wrap gap-3 text-sm">
						<Link href="/now" className="text-teal-400 hover:underline">
							/now →
						</Link>
						<Link href="/projects" className="text-teal-400 hover:underline">
							/projects →
						</Link>
						<Link href="/reading" className="text-teal-400 hover:underline">
							/reading →
						</Link>
						<Link href="/about" className="text-teal-400 hover:underline">
							/about →
						</Link>
						<Link href="/faq" className="text-teal-400 hover:underline">
							/faq →
						</Link>
					</div>
				</aside>
			</article>
		</div>
	);
}
