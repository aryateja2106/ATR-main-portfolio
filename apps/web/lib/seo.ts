import type { BlogPost } from "@/lib/types";

export const SITE_URL = "https://www.aryateja.com";
export const TWITTER_HANDLE = "@r_aryateja";
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const SERVICE_ID = `${SITE_URL}/#ai-agent-consulting`;

export function absoluteUrl(path = "/"): string {
	return new URL(path, SITE_URL).toString();
}

export function calculateReadTime(content: string): string {
	const words = content.match(/\p{L}[\p{L}\p{N}'’-]*/gu)?.length ?? 0;
	return `${Math.max(1, Math.ceil(words / 225))} min read`;
}

function escapeXml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&apos;");
}

export function renderBlogMarkdown(post: BlogPost): string {
	return [
		`# ${post.title}`,
		"",
		post.description,
		"",
		`Published: ${post.date}`,
		`Reading time: ${post.readTime}`,
		`Tags: ${post.tags.join(", ")}`,
		`Canonical URL: ${absoluteUrl(`/blog/${post.slug}`)}`,
		"",
		post.content,
		"",
	].join("\n");
}

export function renderFeed(posts: BlogPost[]): string {
	const items = posts
		.map(
			(post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(absoluteUrl(`/blog/${post.slug}`))}</link>
      <guid isPermaLink="true">${escapeXml(absoluteUrl(`/blog/${post.slug}`))}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`,
		)
		.join("\n");

	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Arya Teja Rudraraju — Writing</title>
    <link>${SITE_URL}/blog</link>
    <description>Field notes on secure AI agents, local-first systems, open-source tools, and business-first implementation.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(posts[0]?.date ?? 0).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}
