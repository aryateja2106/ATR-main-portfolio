import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
	SITE_AUTHOR,
	SITE_LINKS,
	SITE_NAME,
	SITE_URL,
} from "@/lib/portfolio/site";
import { getAllBlogs, getBlogBySlug, getRelatedBlogs } from "../../_hooks/blog";
import { BlogPostClient } from "./blog-post-client";

type RouteParams = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): RouteParams[] {
	return getAllBlogs().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<RouteParams>;
}): Promise<Metadata> {
	const { slug } = await params;
	const post = getBlogBySlug(slug);

	if (!post) {
		return {
			title: "Post not found",
			description: "The blog post you are looking for does not exist.",
			robots: { index: false, follow: false },
		};
	}

	const url = `${SITE_URL}/blog/${post.slug}`;
	const description = post.description || post.excerpt;

	return {
		title: post.title,
		description,
		authors: [{ name: SITE_AUTHOR.name, url: SITE_LINKS.linkedin }],
		keywords: post.tags,
		alternates: {
			canonical: `/blog/${post.slug}`,
		},
		openGraph: {
			type: "article",
			title: post.title,
			description,
			url,
			siteName: SITE_NAME,
			publishedTime: new Date(post.date).toISOString(),
			modifiedTime: new Date(post.date).toISOString(),
			authors: [SITE_AUTHOR.name],
			tags: post.tags,
			// Per-post OG image is supplied by ./opengraph-image.tsx automatically.
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description,
			creator: SITE_AUTHOR.twitter,
		},
	};
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<RouteParams>;
}) {
	const { slug } = await params;
	const post = getBlogBySlug(slug);

	if (!post) {
		notFound();
	}

	const relatedPosts = getRelatedBlogs(post.id);

	const url = `${SITE_URL}/blog/${post.slug}`;
	// Prefer a real remote cover URL; skip /assets/* placeholders; otherwise use route OG image for valid absolute image in structured data.
	const cover = post.coverImage;
	let structuredDataImage = `${SITE_URL}/blog/${post.slug}/opengraph-image`;
	if (cover?.startsWith("http")) {
		structuredDataImage = cover;
	} else if (cover && !cover.startsWith("/assets/") && cover.startsWith("/")) {
		structuredDataImage = `${SITE_URL}${cover}`;
	}

	const articleJsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": url,
		},
		headline: post.title,
		description: post.description || post.excerpt,
		image: [structuredDataImage],
		datePublished: new Date(post.date).toISOString(),
		dateModified: new Date(post.date).toISOString(),
		author: {
			"@type": "Person",
			name: SITE_AUTHOR.name,
			url: SITE_URL,
			sameAs: [SITE_LINKS.linkedin, SITE_LINKS.github, SITE_LINKS.twitter],
		},
		publisher: {
			"@type": "Person",
			name: SITE_AUTHOR.name,
			url: SITE_URL,
		},
		keywords: post.tags.join(", "),
		articleSection: post.category,
		url,
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
				name: "Blog",
				item: `${SITE_URL}/blog`,
			},
			{
				"@type": "ListItem",
				position: 3,
				name: post.title,
				item: url,
			},
		],
	};

	return (
		<>
			<script
				id={`article-jsonld-${post.slug}`}
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be inline server-rendered for crawlers/AEO.
				dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
			/>
			<script
				id={`breadcrumb-jsonld-${post.slug}`}
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be inline server-rendered for crawlers/AEO.
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<BlogPostClient post={post} relatedPosts={relatedPosts} />
		</>
	);
}
