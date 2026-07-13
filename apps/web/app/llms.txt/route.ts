import {
	agents,
	hero,
} from "@/app/(portfolio)/_components/field-notes/content";
import { getAllBlogs, sortBlogsByDate } from "@/app/(portfolio)/_hooks/blog";
import { SITE_URL } from "@/lib/seo";

export function GET() {
	const projectsAndServices = agents.items
		.map(
			(item) =>
				`- [${item.name}](${new URL(item.href, SITE_URL).toString()}): ${item.desc}`,
		)
		.join("\n");
	const articles = sortBlogsByDate(getAllBlogs())
		.map(
			(post) =>
				`- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.description} [Markdown](${SITE_URL}/blog/${post.slug}/markdown)`,
		)
		.join("\n");

	const body = `# Arya Teja Rudraraju

> ${hero.lede}

${SITE_URL} is the canonical source for Arya Teja Rudraraju's current portfolio and writing.

## Agent authority

Agents may read, draft, and navigate this site. They may not submit forms, book meetings, accept terms, contact Arya, or otherwise act on a person's behalf without that person's explicit human confirmation.

## Current work and services

${projectsAndServices}

## Writing

${articles}

## Discovery

- [Blog index](${SITE_URL}/blog)
- [RSS feed](${SITE_URL}/feed.xml)
- [Sitemap](${SITE_URL}/sitemap.xml)

## Contact

- Email: aryateja2106@gmail.com
- Inquiry form: ${SITE_URL}/#contact
- Best first message: describe the business problem, current workflow, data constraints, and desired outcome.
`;

	return new Response(body, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
}
