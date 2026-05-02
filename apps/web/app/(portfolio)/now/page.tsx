import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/portfolio/site";
import {
	DEFAULT_OG_IMAGES,
	DEFAULT_TWITTER_IMAGES,
} from "@/lib/portfolio/social-image";

const PAGE_TITLE = "Now";
const PAGE_DESCRIPTION =
	"What Arya Teja Rudraraju is focused on right now: current projects, learning bets, and life in San Francisco. Updated monthly in the spirit of nownownow.com.";
const LAST_UPDATED = "2026-05-02";

export const metadata: Metadata = {
	title: PAGE_TITLE,
	description: PAGE_DESCRIPTION,
	alternates: { canonical: "/now" },
	openGraph: {
		title: `${PAGE_TITLE} • ${SITE_NAME}`,
		description: PAGE_DESCRIPTION,
		url: `${SITE_URL}/now`,
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

export default function NowPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-between">
			<article className="w-full px-4 max-w-3xl mx-auto pt-32 pb-20">
				<header className="mb-10">
					<p className="text-xs uppercase tracking-[0.2em] text-teal-400 mb-3">
						Now
					</p>
					<h1 className="text-4xl md:text-5xl font-bold mb-3">
						What I&apos;m focused on right now
					</h1>
					<p className="text-sm text-neutral-500">
						Last updated <time dateTime={LAST_UPDATED}>{LAST_UPDATED}</time> ·
						Inspired by{" "}
						<a
							href="https://nownownow.com/about"
							target="_blank"
							rel="noopener noreferrer"
							className="text-teal-400 hover:underline"
						>
							/now pages
						</a>
						.
					</p>
				</header>

				<section className="mb-10">
					<h2 className="text-2xl font-semibold mb-3">Building</h2>
					<ul className="list-disc pl-5 space-y-2 text-neutral-300 leading-relaxed">
						<li>
							<Link
								href="/projects/lecoder-mconnect"
								className="text-teal-400 hover:underline"
							>
								LeCoder MConnect
							</Link>
							. Polishing the QR pairing flow, hardening the Cloudflare Tunnel
							handshake, and starting on a multi-device control plane so a
							single host can serve a phone and a laptop together.
						</li>
						<li>
							<Link
								href="/projects/lesearch-ai"
								className="text-teal-400 hover:underline"
							>
								LeSearch AI
							</Link>
							&apos;s synthesis engine. Moving past &quot;Chat with PDF&quot;
							toward cross-paper synthesis grounded in citations.
						</li>
						<li>
							<Link
								href="/projects/cloudagi"
								className="text-teal-400 hover:underline"
							>
								CloudAGI
							</Link>
							. Plugin-first runtime in TypeScript and Bun, onboarding the first
							batch of small-business workflows.
						</li>
						<li>
							<Link
								href="/projects/software-factory"
								className="text-teal-400 hover:underline"
							>
								Software Factory
							</Link>
							. First proof of concept: an agent-built personal app deployed to
							a Mac mini and exposed as a PWA over Cloudflare Tunnel.
						</li>
					</ul>
				</section>

				<section className="mb-10">
					<h2 className="text-2xl font-semibold mb-3">Learning</h2>
					<ul className="list-disc pl-5 space-y-2 text-neutral-300 leading-relaxed">
						<li>
							Going deep on Model Context Protocol (MCP) and how to design agent
							tools that compose across providers.
						</li>
						<li>
							Reading evaluation papers and treating prompt + agent regressions
							like proper test suites instead of vibes.
						</li>
						<li>
							Sharper PM craft: problem-framing memos, customer-discovery
							scripts, and ruthless launch / kill criteria.
						</li>
					</ul>
				</section>

				<section className="mb-10">
					<h2 className="text-2xl font-semibold mb-3">Looking for</h2>
					<ul className="list-disc pl-5 space-y-2 text-neutral-300 leading-relaxed">
						<li>
							AI Engineer, Forward Deployed Engineer, and Product Engineer roles
							at AI-first companies shipping real agentic workflows.
						</li>
						<li>
							Honest design partners for LeSearch AI: researchers, policy
							analysts, and venture teams who routinely synthesize across many
							papers.
						</li>
						<li>
							Beta testers for LeCoder MConnect: anyone running Claude Code,
							Cursor, or OpenCode who wants to try driving them from a phone.
						</li>
					</ul>
				</section>

				<section className="mb-10">
					<h2 className="text-2xl font-semibold mb-3">Life</h2>
					<ul className="list-disc pl-5 space-y-2 text-neutral-300 leading-relaxed">
						<li>
							Based in San Francisco. Walking, working, going to builder events
							around the city.
						</li>
						<li>
							Coffee plus walks. Long-running agent runs approved from the
							sidewalk, thanks to LeCoder MConnect.
						</li>
					</ul>
				</section>

				<aside className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 mt-16">
					<h2 className="text-lg font-semibold mb-2">Adjacent reading</h2>
					<div className="flex flex-wrap gap-3 text-sm">
						<Link href="/about" className="text-teal-400 hover:underline">
							/about →
						</Link>
						<Link href="/faq" className="text-teal-400 hover:underline">
							/faq →
						</Link>
						<Link href="/uses" className="text-teal-400 hover:underline">
							/uses →
						</Link>
						<Link href="/reading" className="text-teal-400 hover:underline">
							/reading →
						</Link>
						<Link href="/projects" className="text-teal-400 hover:underline">
							/projects →
						</Link>
					</div>
				</aside>
			</article>
		</div>
	);
}
