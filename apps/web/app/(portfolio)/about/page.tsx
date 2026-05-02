import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/portfolio/brand";
import {
	personJsonLd,
	SITE_LINKS,
	SITE_NAME,
	SITE_URL,
} from "@/lib/portfolio/site";
import {
	DEFAULT_OG_IMAGES,
	DEFAULT_TWITTER_IMAGES,
} from "@/lib/portfolio/social-image";

const PAGE_TITLE = "About Arya Teja Rudraraju";
const PAGE_DESCRIPTION =
	"Agentic Engineer in San Francisco. Founder of LeSearch AI and CloudAGI. Building LeCoder MConnect, an open-source mobile control layer for AI coding agents.";

export const metadata: Metadata = {
	title: PAGE_TITLE,
	description: PAGE_DESCRIPTION,
	alternates: { canonical: "/about" },
	openGraph: {
		title: `${PAGE_TITLE} • ${SITE_NAME}`,
		description: PAGE_DESCRIPTION,
		url: `${SITE_URL}/about`,
		type: "profile",
		images: DEFAULT_OG_IMAGES,
	},
	twitter: {
		card: "summary_large_image",
		title: `${PAGE_TITLE} • ${SITE_NAME}`,
		description: PAGE_DESCRIPTION,
		images: DEFAULT_TWITTER_IMAGES,
	},
};

const sections = [
	{ id: "tldr", label: "TL;DR" },
	{ id: "current-work", label: "Current work" },
	{ id: "career-arc", label: "Career arc" },
	{ id: "what-i-believe", label: "What I believe" },
	{ id: "open-to", label: "What I'm open to" },
	{ id: "elsewhere", label: "Find me elsewhere" },
];

const profilePageJsonLd = {
	"@context": "https://schema.org",
	"@type": "ProfilePage",
	"@id": `${SITE_URL}/about`,
	url: `${SITE_URL}/about`,
	name: PAGE_TITLE,
	description: PAGE_DESCRIPTION,
	dateModified: new Date().toISOString(),
	mainEntity: personJsonLd,
};

const breadcrumbJsonLd = {
	"@context": "https://schema.org",
	"@type": "BreadcrumbList",
	itemListElement: [
		{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
		{
			"@type": "ListItem",
			position: 2,
			name: "About",
			item: `${SITE_URL}/about`,
		},
	],
};

export default function AboutPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-between">
			<script
				id="profilepage-jsonld"
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be inline server-rendered for crawlers/AEO.
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(profilePageJsonLd),
				}}
			/>
			<script
				id="breadcrumb-about"
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be inline server-rendered for crawlers/AEO.
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(breadcrumbJsonLd),
				}}
			/>
			<article className="w-full px-4 max-w-3xl mx-auto pt-32 pb-20">
				<header className="mb-10">
					<p className="text-xs uppercase tracking-[0.2em] text-teal-400 mb-3">
						About
					</p>
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						Arya Teja Rudraraju
					</h1>
					<p className="text-lg text-neutral-500 dark:text-neutral-400">
						Agentic Engineer in San Francisco. Founder of LeSearch AI and
						CloudAGI. Building LeCoder MConnect.
					</p>
				</header>

				<nav
					aria-label="On this page"
					className="mb-12 rounded-xl border border-neutral-800 bg-neutral-900/40 p-4"
				>
					<div className="text-xs uppercase tracking-wider text-neutral-500 mb-2">
						On this page
					</div>
					<ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
						{sections.map((section) => (
							<li key={section.id}>
								<a
									href={`#${section.id}`}
									className="text-teal-400 hover:underline"
								>
									{section.label}
								</a>
							</li>
						))}
					</ul>
				</nav>

				<section id="tldr" className="mb-12 scroll-mt-24">
					<h2 className="text-2xl font-semibold mb-3">TL;DR</h2>
					<p className="text-neutral-300 leading-relaxed mb-3">
						I am Arya Teja Rudraraju. I work as an Agentic Engineer in San
						Francisco. I founded{" "}
						<Link
							href="/projects/lesearch-ai"
							className="text-teal-400 hover:underline"
						>
							LeSearch AI
						</Link>{" "}
						and{" "}
						<Link
							href="/projects/cloudagi"
							className="text-teal-400 hover:underline"
						>
							CloudAGI
						</Link>
						, and I am building{" "}
						<Link
							href="/projects/lecoder-mconnect"
							className="text-teal-400 hover:underline"
						>
							LeCoder MConnect
						</Link>
						: an open-source mobile control layer for Claude Code, Cursor, and
						OpenCode.
					</p>
					<p className="text-neutral-300 leading-relaxed">
						I am open to <strong>AI Engineer</strong>,{" "}
						<strong>Forward Deployed Engineer</strong>, and{" "}
						<strong>Product Engineer</strong> roles at AI-first companies
						shipping real agentic workflows. The fastest way to reach me is{" "}
						<a
							href={BRAND.contact.mailto}
							className="text-teal-400 hover:underline"
						>
							{BRAND.contact.email}
						</a>
						.
					</p>
				</section>

				<section id="current-work" className="mb-12 scroll-mt-24">
					<h2 className="text-2xl font-semibold mb-3">Current work</h2>
					<ul className="space-y-3 text-neutral-300 leading-relaxed">
						<li>
							<strong>LeCoder MConnect.</strong> Open-source mobile bridge for
							AI coding agents. node-pty plus Cloudflare Tunnel plus a QR
							pairing flow means Claude Code, Cursor, and OpenCode run from a
							phone with full TUI fidelity. Live at{" "}
							<a
								href={BRAND.links.lecoder}
								target="_blank"
								rel="noopener noreferrer"
								className="text-teal-400 hover:underline"
							>
								lecoder.lesearch.ai
							</a>
							.
						</li>
						<li>
							<strong>LeSearch AI.</strong> Founder and product lead. RAG with
							hard citation grounding so the model cannot claim a fact it cannot
							highlight in the source. 50+ beta users, 30+ structured user
							interviews shaped the roadmap.
						</li>
						<li>
							<strong>CloudAGI.</strong> Custom agentic workflows for small
							businesses on a plugin-first credit-metered runtime. TypeScript +
							Bun.
						</li>
						<li>
							<strong>Software Factory.</strong> Early-stage system for
							deploying agent-built personal apps to a user&apos;s own always-on
							hardware (Mac mini, Raspberry Pi) over Cloudflare Tunnels. Web
							apps install as PWAs.
						</li>
						<li>
							<strong>NL2Shell.</strong> Natural language to shell commands at{" "}
							<a
								href={BRAND.links.nl2shell}
								target="_blank"
								rel="noopener noreferrer"
								className="text-teal-400 hover:underline"
							>
								nl2shell.com
							</a>
							, backed by a fine-tuned model.
						</li>
					</ul>
				</section>

				<section id="career-arc" className="mb-12 scroll-mt-24">
					<h2 className="text-2xl font-semibold mb-3">Career arc</h2>
					<p className="text-neutral-300 leading-relaxed mb-3">
						Four years in marketing leadership taught me how to mine customer
						signals, brief creative teams, and quantify lift on every campaign.
						When LLMs became real, the same instincts (discovery, copy testing,
						activation analysis) turned out to be the foundation of agentic
						engineering work.
					</p>
					<p className="text-neutral-300 leading-relaxed mb-3">
						I leaned in. I co-built LeSearch AI, owned prompt architectures, and
						shipped scrappy MVPs every week: SQL agents for non-technical ops
						teams, auto-browsing Q&A bots for scouts, due-diligence summarizers.
						Every launch was instrumented so we could cut scope or double down
						based on real user behavior, not opinions.
					</p>
					<p className="text-neutral-300 leading-relaxed">
						The next layer was code. I started writing the systems myself
						instead of briefing them, which led to LeCoder MConnect, CloudAGI,
						the Software Factory bet, and a move to San Francisco to be closer
						to the people building this category.
					</p>
				</section>

				<section id="what-i-believe" className="mb-12 scroll-mt-24">
					<h2 className="text-2xl font-semibold mb-3">What I believe</h2>
					<ul className="list-disc pl-5 space-y-2 text-neutral-300 leading-relaxed">
						<li>
							<strong>Mobile is the next agent surface.</strong> Engineers spend
							half their lives away from their laptop. The agent should not stop
							because the human stepped away.
						</li>
						<li>
							<strong>Open beats walled.</strong> Composable agents on
							standardized protocols (MCP) will outpace any single closed
							ecosystem. My open-source work bets on that.
						</li>
						<li>
							<strong>Citation grounding is non-negotiable.</strong> If a model
							cannot point to the source of a claim, it should not ship that
							claim. Hallucinations are not a research problem; they are a
							product problem.
						</li>
						<li>
							<strong>
								Marketing instincts compound in product engineering.
							</strong>{" "}
							Discovery, briefing, copy iteration, and activation analysis
							translate directly. Anyone underestimating that is leaving
							leverage on the table.
						</li>
					</ul>
				</section>

				<section id="open-to" className="mb-12 scroll-mt-24">
					<h2 className="text-2xl font-semibold mb-3">What I&apos;m open to</h2>
					<ul className="list-disc pl-5 space-y-2 text-neutral-300 leading-relaxed">
						<li>
							<strong>
								AI Engineer, Forward Deployed Engineer, or Product Engineer
								roles
							</strong>{" "}
							at AI-first companies shipping real agentic workflows.
						</li>
						<li>
							<strong>Founding-team hires</strong> for early-stage agentic
							products where evaluation, customer discovery, and shipping
							compound.
						</li>
						<li>
							<strong>Open-source collaboration</strong> on mobile agent
							orchestration, MCP tooling, and developer ergonomics.
						</li>
						<li>
							<strong>Office hours / advising</strong> for anyone making the
							jump from marketing or PM into building.
						</li>
					</ul>
				</section>

				<section id="elsewhere" className="mb-4 scroll-mt-24">
					<h2 className="text-2xl font-semibold mb-3">Find me elsewhere</h2>
					<ul className="list-disc pl-5 space-y-2 text-neutral-300 leading-relaxed">
						<li>
							Email:{" "}
							<a
								href={BRAND.contact.mailto}
								className="text-teal-400 hover:underline"
							>
								{BRAND.contact.email}
							</a>
						</li>
						<li>
							LinkedIn:{" "}
							<a
								href={BRAND.links.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="text-teal-400 hover:underline"
							>
								linkedin.com/in/arya-teja-rudraraju
							</a>
						</li>
						<li>
							GitHub:{" "}
							<a
								href={BRAND.links.github}
								target="_blank"
								rel="noopener noreferrer"
								className="text-teal-400 hover:underline"
							>
								github.com/aryateja2106
							</a>
						</li>
						<li>
							Twitter / X:{" "}
							<a
								href={BRAND.links.twitter}
								target="_blank"
								rel="noopener noreferrer"
								className="text-teal-400 hover:underline"
							>
								x.com/r_aryateja
							</a>
						</li>
						<li>
							npm:{" "}
							<a
								href={BRAND.links.npm}
								target="_blank"
								rel="noopener noreferrer"
								className="text-teal-400 hover:underline"
							>
								npmjs.com/package/lecoder-mconnect
							</a>
						</li>
						<li>
							Resume PDF:{" "}
							<a
								href={SITE_LINKS.resumePdf}
								className="text-teal-400 hover:underline"
							>
								{SITE_LINKS.resumePdf}
							</a>
						</li>
					</ul>
				</section>

				<aside className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 mt-16">
					<h2 className="text-lg font-semibold mb-2">Where to next?</h2>
					<div className="flex flex-wrap gap-3 text-sm">
						<Link href="/now" className="text-teal-400 hover:underline">
							/now &rarr; what I&apos;m working on right now
						</Link>
						<Link href="/projects" className="text-teal-400 hover:underline">
							/projects &rarr; full deep-dives
						</Link>
						<Link href="/faq" className="text-teal-400 hover:underline">
							/faq &rarr; pre-answered questions
						</Link>
						<Link href="/blog" className="text-teal-400 hover:underline">
							/blog &rarr; recent writing
						</Link>
					</div>
				</aside>
			</article>
		</div>
	);
}
