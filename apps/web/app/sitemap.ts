import type { MetadataRoute } from "next";
import blogsData from "@/lib/portfolio/blogs.json";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
	const siteUpdatedAt = new Date("2026-07-11");

	const blogRoutes = blogsData.blogPosts.map((post) => ({
		url: `${SITE_URL}/blog/${post.slug}`,
		lastModified: new Date(post.date),
		changeFrequency: "monthly" as const,
		priority: 0.8,
	}));

	const staticRoutes = [
		{
			url: SITE_URL,
			lastModified: siteUpdatedAt,
			changeFrequency: "weekly" as const,
			priority: 1,
		},
		{
			url: `${SITE_URL}/blog`,
			lastModified: siteUpdatedAt,
			changeFrequency: "weekly" as const,
			priority: 0.9,
		},
	];

	return [...staticRoutes, ...blogRoutes];
}
