import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_NAME, SITE_URL } from "@/lib/portfolio/site";
import {
	DEFAULT_OG_IMAGES,
	DEFAULT_TWITTER_IMAGES,
} from "@/lib/portfolio/social-image";
import {
	getAllBlogs,
	getBlogsByTag,
	sortBlogsByDate,
} from "../../../_hooks/blog";

type RouteParams = { tag: string };

export const dynamicParams = false;

export function generateStaticParams(): RouteParams[] {
	const tags = new Set<string>();
	for (const post of getAllBlogs()) {
		for (const tag of post.tags) {
			tags.add(tag);
		}
	}
	// Next.js automatically URL-encodes params; we pass the raw tag string.
	return [...tags].map((tag) => ({ tag }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<RouteParams>;
}): Promise<Metadata> {
	const { tag } = await params;
	const decoded = decodeURIComponent(tag);
	const matches = getBlogsByTag(decoded);

	if (matches.length === 0) {
		return {
			title: "Tag not found",
			description: `No blog posts tagged with #${decoded}.`,
			robots: { index: false, follow: false },
		};
	}

	return {
		title: `#${decoded} posts`,
		description: `Blog posts by Arya Teja Rudraraju tagged with #${decoded}. ${matches.length} post${matches.length === 1 ? "" : "s"}.`,
		alternates: {
			canonical: `/blog/tag/${encodeURIComponent(decoded)}`,
		},
		openGraph: {
			title: `#${decoded} posts • ${SITE_NAME}`,
			description: `Blog posts tagged with #${decoded}.`,
			url: `${SITE_URL}/blog/tag/${encodeURIComponent(decoded)}`,
			type: "website",
			images: DEFAULT_OG_IMAGES,
		},
		twitter: {
			card: "summary_large_image",
			title: `#${decoded} posts • ${SITE_NAME}`,
			description: `Blog posts tagged with #${decoded}.`,
			images: DEFAULT_TWITTER_IMAGES,
		},
	};
}

export default async function TagPage({
	params,
}: {
	params: Promise<RouteParams>;
}) {
	const { tag } = await params;
	const decoded = decodeURIComponent(tag);
	const matches = sortBlogsByDate(getBlogsByTag(decoded));

	if (matches.length === 0) {
		notFound();
	}

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
				name: "Blog",
				item: `${SITE_URL}/blog`,
			},
			{
				"@type": "ListItem",
				position: 3,
				name: `#${decoded}`,
				item: `${SITE_URL}/blog/tag/${encodeURIComponent(decoded)}`,
			},
		],
	};

	return (
		<>
			<script
				id={`breadcrumb-tag-${decoded}`}
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be inline server-rendered for crawlers/AEO.
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<div className="flex min-h-screen flex-col items-center justify-between">
				<div className="w-full px-4 max-w-4xl mx-auto pt-32 pb-20">
					<Link
						href="/blog"
						className="inline-flex items-center text-neutral-600 dark:text-neutral-400 hover:text-teal-500 mb-6"
					>
						<svg
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							className="size-4 mr-2"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
						All posts
					</Link>

					<h1 className="text-4xl font-bold mb-2">#{decoded}</h1>
					<p className="text-neutral-500 dark:text-neutral-400 mb-10">
						{matches.length} post{matches.length === 1 ? "" : "s"} tagged with #
						{decoded}.
					</p>

					<ul className="flex flex-col gap-6">
						{matches.map((post) => (
							<li
								key={post.id}
								className="rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-teal-500 transition-colors p-5"
							>
								<Link href={`/blog/${post.slug}`} className="block group">
									<div className="text-xs uppercase tracking-wider text-teal-500 mb-1">
										{post.category} · {post.formattedDate} · {post.readTime}
									</div>
									<h2 className="text-xl font-semibold mb-1 group-hover:text-teal-500 transition-colors">
										{post.title}
									</h2>
									<p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
										{post.excerpt}
									</p>
								</Link>
							</li>
						))}
					</ul>
					<p className="mt-14 text-sm text-neutral-500 dark:text-neutral-400">
						Context for citations:{" "}
						<Link href="/faq" className="text-teal-500 hover:underline">
							FAQ
						</Link>
						{" · "}
						<Link href="/about" className="text-teal-500 hover:underline">
							/about
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}
