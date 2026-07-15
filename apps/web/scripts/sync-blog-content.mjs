import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const appRoot = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"..",
);
const contentDir = path.join(appRoot, "content", "blogs");
const outputFile = path.join(appRoot, "lib", "portfolio", "blogs.json");

const author = {
	id: "1",
	name: "Arya Teja Rudraraju",
	avatar: "/images/avatar-arya.jpg",
	bio: "Agentic Systems Founder",
	twitter: "@r_aryateja",
};

function requireField(meta, field, fileName) {
	if (!meta[field]) {
		throw new Error(`${fileName}: missing frontmatter field "${field}"`);
	}
}

export function parseBlogSource(source, fileName = "article.md") {
	if (!source.startsWith("---\n")) {
		throw new Error(`${fileName}: expected JSON frontmatter after opening ---`);
	}

	const frontmatterEnd = source.indexOf("\n---\n", 4);
	if (frontmatterEnd === -1) {
		throw new Error(`${fileName}: missing closing --- for frontmatter`);
	}

	const meta = JSON.parse(source.slice(4, frontmatterEnd));
	const content = source.slice(frontmatterEnd + 5).trim();

	for (const field of [
		"title",
		"slug",
		"date",
		"excerpt",
		"category",
		"tags",
		"status",
	]) {
		requireField(meta, field, fileName);
	}

	if (!Array.isArray(meta.tags)) {
		throw new Error(`${fileName}: "tags" must be an array`);
	}

	return { meta, content };
}

export function toBlogPost({ meta, content }, id) {
	const wordCount = content.split(/\s+/).filter(Boolean).length;
	const formattedDate = new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: "UTC",
	}).format(new Date(`${meta.date}T00:00:00Z`));

	return {
		id: String(id),
		slug: meta.slug,
		title: meta.title,
		description: meta.description ?? meta.excerpt,
		excerpt: meta.excerpt,
		date: meta.date,
		formattedDate,
		readTime: `${Math.max(1, Math.ceil(wordCount / 220))} min read`,
		category: meta.category,
		tags: meta.tags,
		coverImage: meta.coverImage ?? `/api/blog-cover/${meta.slug}`,
		author,
		relatedArticles: meta.relatedArticles ?? [],
		...(meta.guide ? { guide: meta.guide } : {}),
		...(meta.executiveSummary
			? { executiveSummary: meta.executiveSummary }
			: {}),
		...(meta.agentNavigation ? { agentNavigation: meta.agentNavigation } : {}),
		...(meta.sourceLicenses ? { sourceLicenses: meta.sourceLicenses } : {}),
		...(meta.reuse ? { reuse: meta.reuse } : {}),
		content,
	};
}

export async function syncBlogs() {
	const fileNames = (await readdir(contentDir))
		.filter((fileName) => fileName.endsWith(".md"))
		.sort();
	const parsed = await Promise.all(
		fileNames.map(async (fileName) =>
			parseBlogSource(
				await readFile(path.join(contentDir, fileName), "utf8"),
				fileName,
			),
		),
	);
	const published = parsed.filter(({ meta }) => meta.status === "published");
	const slugs = new Set();

	for (const { meta } of published) {
		if (slugs.has(meta.slug)) {
			throw new Error(`Duplicate blog slug: ${meta.slug}`);
		}
		slugs.add(meta.slug);
	}

	const output = `${JSON.stringify(
		{ blogPosts: published.map((post, index) => toBlogPost(post, index + 1)) },
		null,
		"\t",
	)}\n`;
	const current = await readFile(outputFile, "utf8").catch(() => "");

	if (current !== output) {
		await writeFile(outputFile, output);
	}

	return published.length;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
	const count = await syncBlogs();
	console.log(`Synced ${count} published articles.`);
}
