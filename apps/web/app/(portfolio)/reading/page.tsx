import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/portfolio/site";
import {
	DEFAULT_OG_IMAGES,
	DEFAULT_TWITTER_IMAGES,
} from "@/lib/portfolio/social-image";

const LAST_UPDATED = "2026-05-01";
const LAST_UPDATED_LABEL = "May 1, 2026";

export const metadata: Metadata = {
	title: "/reading — what's on my desk",
	description:
		"Books, papers, and essays Arya Teja Rudraraju is reading right now and notable past reads on AI product management, agentic systems, and engineering.",
	alternates: { canonical: "/reading" },
	openGraph: {
		title: `/reading • ${SITE_NAME}`,
		description: "Currently reading + notable past reads.",
		url: `${SITE_URL}/reading`,
		type: "article",
		images: DEFAULT_OG_IMAGES,
	},
	twitter: {
		card: "summary_large_image",
		title: `/reading • ${SITE_NAME}`,
		description: "Currently reading + notable past reads.",
		images: DEFAULT_TWITTER_IMAGES,
	},
};

interface ReadingItem {
	title: string;
	author: string;
	note?: string;
	url?: string;
}

const CURRENT: ReadingItem[] = [
	{
		title: "AI Engineering",
		author: "Chip Huyen",
		note: "Re-reading the eval and observability chapters as I instrument LeSearch's synthesis engine.",
	},
	{
		title: "Inspired",
		author: "Marty Cagan",
		note: "Foundational PM reading. I keep returning to the chapters on discovery culture.",
	},
	{
		title: "The Model Context Protocol spec",
		author: "Anthropic",
		note: "Deep diving into MCP server design for the agents I run daily.",
		url: "https://modelcontextprotocol.io",
	},
];

const RECENT: ReadingItem[] = [
	{
		title: "The Lean Startup",
		author: "Eric Ries",
		note: "Build-measure-learn translates surprisingly cleanly to AI product loops.",
	},
	{
		title: "Designing Machine Learning Systems",
		author: "Chip Huyen",
		note: "The end-to-end systems lens that I bring into PM conversations with eng.",
	},
	{
		title: "The Coming Wave",
		author: "Mustafa Suleyman",
		note: "A useful frame for the policy / safety conversations on agentic systems.",
	},
];

export default function ReadingPage() {
	return (
		<div className="w-full px-4 max-w-4xl mx-auto pt-32 pb-20">
			<nav aria-label="Breadcrumb" className="text-sm text-neutral-500 mb-6">
				<ol className="flex items-center gap-2">
					<li>
						<Link href="/" className="hover:text-teal-400">
							Home
						</Link>
					</li>
					<li aria-hidden="true">/</li>
					<li className="text-neutral-300">/reading</li>
				</ol>
			</nav>

			<header className="mb-10">
				<h1 className="text-4xl font-bold mb-3 text-neutral-100">
					Reading list
				</h1>
				<p className="text-sm text-neutral-500">
					Last updated:{" "}
					<time dateTime={LAST_UPDATED}>{LAST_UPDATED_LABEL}</time>
				</p>
				<p className="text-neutral-400 max-w-3xl mt-4">
					Books and papers actively on my desk, plus the most useful past reads
					I keep recommending.
				</p>
			</header>

			<section className="mb-12">
				<h2 className="text-2xl font-semibold text-neutral-100 mb-4">
					Currently reading
				</h2>
				<ul className="space-y-4">
					{CURRENT.map((item) => (
						<li
							key={`${item.title}-${item.author}`}
							className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4"
						>
							<div className="font-medium text-neutral-100">
								{item.url ? (
									<a
										href={item.url}
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-teal-400"
									>
										{item.title}
									</a>
								) : (
									item.title
								)}{" "}
								<span className="text-neutral-500 font-normal">
									— {item.author}
								</span>
							</div>
							{item.note ? (
								<p className="text-sm text-neutral-400 mt-2">{item.note}</p>
							) : null}
						</li>
					))}
				</ul>
			</section>

			<section className="mb-4">
				<h2 className="text-2xl font-semibold text-neutral-100 mb-4">
					Recent + recommended
				</h2>
				<ul className="space-y-4">
					{RECENT.map((item) => (
						<li
							key={`${item.title}-${item.author}`}
							className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4"
						>
							<div className="font-medium text-neutral-100">
								{item.url ? (
									<a
										href={item.url}
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-teal-400"
									>
										{item.title}
									</a>
								) : (
									item.title
								)}{" "}
								<span className="text-neutral-500 font-normal">
									— {item.author}
								</span>
							</div>
							{item.note ? (
								<p className="text-sm text-neutral-400 mt-2">{item.note}</p>
							) : null}
						</li>
					))}
				</ul>
			</section>

			<aside className="mt-12 flex flex-wrap gap-3">
				<Link
					href="/about"
					className="rounded-md border border-neutral-700 bg-neutral-900/60 px-4 py-2 text-sm text-neutral-200 hover:border-teal-400/50 hover:text-teal-300"
				>
					/about
				</Link>
				<Link
					href="/faq"
					className="rounded-md border border-neutral-700 bg-neutral-900/60 px-4 py-2 text-sm text-neutral-200 hover:border-teal-400/50 hover:text-teal-300"
				>
					/faq
				</Link>
				<Link
					href="/now"
					className="rounded-md border border-neutral-700 bg-neutral-900/60 px-4 py-2 text-sm text-neutral-200 hover:border-teal-400/50 hover:text-teal-300"
				>
					/now
				</Link>
				<Link
					href="/uses"
					className="rounded-md border border-neutral-700 bg-neutral-900/60 px-4 py-2 text-sm text-neutral-200 hover:border-teal-400/50 hover:text-teal-300"
				>
					/uses
				</Link>
				<Link
					href="/blog"
					className="rounded-md border border-neutral-700 bg-neutral-900/60 px-4 py-2 text-sm text-neutral-200 hover:border-teal-400/50 hover:text-teal-300"
				>
					Blog
				</Link>
			</aside>
		</div>
	);
}
