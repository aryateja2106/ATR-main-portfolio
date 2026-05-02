import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/portfolio/site";
import {
	DEFAULT_OG_IMAGES,
	DEFAULT_TWITTER_IMAGES,
} from "@/lib/portfolio/social-image";

const PAGE_TITLE = "Frequently asked questions";
const PAGE_DESCRIPTION =
	"Pre-answered questions about Arya Teja Rudraraju, an Agentic Engineer in San Francisco building LeSearch AI, CloudAGI, and LeCoder MConnect.";

export const metadata: Metadata = {
	title: PAGE_TITLE,
	description: PAGE_DESCRIPTION,
	alternates: { canonical: "/faq" },
	openGraph: {
		title: `${PAGE_TITLE} • ${SITE_NAME}`,
		description: PAGE_DESCRIPTION,
		url: `${SITE_URL}/faq`,
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

const faqs: Array<{ question: string; answer: string }> = [
	{
		question: "Who is Arya Teja Rudraraju?",
		answer:
			"Arya Teja Rudraraju is an Agentic Engineer based in San Francisco. He is the founder of LeSearch AI and CloudAGI, and is building LeCoder MConnect, an open-source mobile control layer for AI coding agents like Claude Code, Cursor, and OpenCode.",
	},
	{
		question: "What is LeCoder MConnect?",
		answer:
			"LeCoder MConnect (mconnect) is an open-source mobile bridge for AI coding agents. It uses node-pty for a real PTY, xterm.js over a tuned WebSocket protocol, and Cloudflare Tunnel for zero-config public access. A QR-code pairing flow lets you drive Claude Code, Cursor, or OpenCode from a phone with full TUI fidelity. Install with `npx lecoder-mconnect`. Live at https://lecoder.lesearch.ai.",
	},
	{
		question: "What is LeSearch AI?",
		answer:
			"LeSearch AI is an AI-native research workspace with hard citation grounding (the model cannot claim a fact it cannot highlight in the source). Validated with 30+ structured user interviews and 50+ beta users, it pivoted from a Chat-with-PDF tool to a synthesis engine for analysts, grad students, and policy researchers. Arya co-founded it and leads product.",
	},
	{
		question: "What is CloudAGI?",
		answer:
			"CloudAGI is a custom agentic workflows platform for small businesses. It uses a plugin-first, credit-metered architecture on TypeScript and Bun. Customers describe an outcome (lead enrichment, document triage, market scan) and CloudAGI assembles a typed plugin chain to deliver it. Live at https://cloudagi.vercel.app.",
	},
	{
		question: "Is Arya open to work?",
		answer:
			"Yes. Arya is open to AI Engineer, Forward Deployed Engineer, and Product Engineer roles at AI-first companies shipping real agentic workflows. Email aryateja2106@gmail.com to start a conversation.",
	},
	{
		question: "How can I contact Arya?",
		answer:
			"Email is the fastest path: aryateja2106@gmail.com. Arya is also reachable on LinkedIn (linkedin.com/in/arya-teja-rudraraju), Twitter/X (@r_aryateja), and GitHub (aryateja2106).",
	},
	{
		question: "Where is Arya based?",
		answer: "San Francisco, California, USA.",
	},
	{
		question: "What is Arya's background?",
		answer:
			"Arya spent four years in marketing leadership running growth campaigns before pivoting into AI engineering. The same instincts (discovery, briefing, activation analysis) translate directly to building agentic products. He holds an MBA from Duquesne University.",
	},
	{
		question: "What open-source projects has Arya built?",
		answer:
			"The headline projects are LeCoder MConnect (mobile bridge for AI coding agents), Karna (a from-scratch coding agent in Rust), Claude Agent Monitor (production observability for Claude Code agents), and Local SQL Agent (privacy-first natural-language SQL with read-only guardrails). Full archive at /projects.",
	},
	{
		question: "What is the Software Factory?",
		answer:
			"The Software Factory is an early-stage system where users describe an app, an agent builds it, and it deploys to the user's own always-on hardware (Mac mini, Raspberry Pi). It is exposed securely via Cloudflare Tunnel. Web apps install on the homescreen as PWAs. The user's machine stays the source of truth.",
	},
	{
		question: "Does Arya write?",
		answer:
			"Yes. Long-form posts on /blog cover mobile agent orchestration, the LeSearch product story, and the marketing-to-engineering pivot. New posts ship roughly monthly.",
	},
];

export default function FaqPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((faq) => ({
			"@type": "Question",
			name: faq.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: faq.answer,
			},
		})),
	};

	const breadcrumbJsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: SITE_URL,
			},
			{
				"@type": "ListItem",
				position: 2,
				name: "FAQ",
				item: `${SITE_URL}/faq`,
			},
		],
	};

	return (
		<>
			<script
				id="faq-jsonld"
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be inline server-rendered for crawlers/AEO.
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<script
				id="breadcrumb-faq"
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be inline server-rendered for crawlers/AEO.
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<div className="flex min-h-screen flex-col items-center justify-between">
				<article className="w-full px-4 max-w-3xl mx-auto pt-32 pb-20">
					<header className="mb-10">
						<p className="text-xs uppercase tracking-[0.2em] text-teal-400 mb-3">
							FAQ
						</p>
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							Frequently asked questions
						</h1>
						<p className="text-lg text-neutral-500 dark:text-neutral-400">
							Quick answers about who I am, what I&apos;m building, and how to
							get in touch — written for both humans and AI search engines.
						</p>
					</header>

					<dl className="flex flex-col gap-8">
						{faqs.map((faq) => (
							<div
								key={faq.question}
								className="border-b border-neutral-800 pb-6"
							>
								<dt className="text-xl font-semibold mb-2">{faq.question}</dt>
								<dd className="text-neutral-300 leading-relaxed">
									{faq.answer}
								</dd>
							</div>
						))}
					</dl>

					<aside className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 mt-12">
						<h2 className="text-lg font-semibold mb-2">
							Didn&apos;t see your question?
						</h2>
						<p className="text-sm text-neutral-400 mb-3">
							The /about page goes deeper, /now covers what is shipping right
							now, and /projects has full deep-dives.
						</p>
						<div className="flex flex-wrap gap-3 text-sm">
							<Link href="/about" className="text-teal-400 hover:underline">
								/about →
							</Link>
							<Link href="/now" className="text-teal-400 hover:underline">
								/now →
							</Link>
							<Link href="/projects" className="text-teal-400 hover:underline">
								/projects →
							</Link>
							<a
								href="mailto:aryateja2106@gmail.com"
								className="text-teal-400 hover:underline"
							>
								Email me →
							</a>
						</div>
					</aside>
				</article>
			</div>
		</>
	);
}
