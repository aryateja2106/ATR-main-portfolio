import type { MetadataRoute } from "next";
import blogsData from "@/lib/portfolio/blogs.json";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://aryateja.com";
	const siteUpdatedAt = new Date("2026-07-15");

	const blogRoutes = blogsData.blogPosts.map((post) => ({
		url: `${baseUrl}/blog/${post.slug}`,
		lastModified: new Date(post.date),
		changeFrequency: "monthly" as const,
		priority: 0.8,
	}));

	const staticRoutes = [
		{
			url: baseUrl,
			lastModified: siteUpdatedAt,
			changeFrequency: "weekly" as const,
			priority: 1,
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: siteUpdatedAt,
			changeFrequency: "weekly" as const,
			priority: 0.9,
		},
	];

	return [...staticRoutes, ...blogRoutes];
}
