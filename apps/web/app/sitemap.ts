import type { MetadataRoute } from "next";
import blogsData from "@/lib/portfolio/blogs.json";
import { getAllProjects } from "@/lib/portfolio/projects";
import { SITE_URL } from "@/lib/portfolio/site";

// Sitemap is the canonical list of public, indexable URLs.
// Auth-gated routes (/chat/*, /api/*, /login, /register) intentionally absent.

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();

	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: SITE_URL,
			lastModified: now,
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${SITE_URL}/about`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: `${SITE_URL}/faq`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: `${SITE_URL}/projects`,
			lastModified: now,
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${SITE_URL}/github-stars`,
			lastModified: now,
			changeFrequency: "weekly",
			priority: 0.75,
		},
		{
			url: `${SITE_URL}/blog`,
			lastModified: now,
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${SITE_URL}/now`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${SITE_URL}/uses`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: `${SITE_URL}/reading`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.6,
		},
	];

	const projectRoutes: MetadataRoute.Sitemap = getAllProjects().map(
		(project) => ({
			url: `${SITE_URL}/projects/${project.slug}`,
			lastModified: now,
			changeFrequency: "monthly" as const,
			priority: 0.8,
		}),
	);

	const blogRoutes: MetadataRoute.Sitemap = blogsData.blogPosts.map((post) => ({
		url: `${SITE_URL}/blog/${post.slug}`,
		lastModified: new Date(post.date),
		changeFrequency: "monthly" as const,
		priority: 0.8,
	}));

	const tagSet = new Set<string>();
	for (const post of blogsData.blogPosts) {
		for (const tag of post.tags ?? []) tagSet.add(tag);
	}
	const tagRoutes: MetadataRoute.Sitemap = Array.from(tagSet).map((tag) => ({
		url: `${SITE_URL}/blog/tag/${encodeURIComponent(tag)}`,
		lastModified: now,
		changeFrequency: "monthly" as const,
		priority: 0.5,
	}));

	return [...staticRoutes, ...projectRoutes, ...blogRoutes, ...tagRoutes];
}
