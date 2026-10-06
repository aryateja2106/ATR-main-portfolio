export type ArticleHeading = {
	level: 2 | 3;
	title: string;
	id: string;
};

export function headingSlug(title: string) {
	return (
		title
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, "")
			.trim()
			.replace(/\s+/g, "-") || "section"
	);
}

export function createHeadingIdGenerator() {
	const seen = new Map<string, number>();

	return (title: string) => {
		const base = headingSlug(title);
		const count = seen.get(base) ?? 0;
		seen.set(base, count + 1);
		return count === 0 ? base : `${base}-${count}`;
	};
}

function plainHeading(markdown: string) {
	return markdown
		.replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
		.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
		.replace(/[`*_~]/g, "")
		.replace(/<[^>]+>/g, "")
		.trim();
}

export function extractArticleHeadings(content: string): ArticleHeading[] {
	const nextId = createHeadingIdGenerator();

	return Array.from(content.matchAll(/^(#{2,3})\s+(.+)$/gm), (match) => {
		const title = plainHeading(match[2]);
		return {
			level: match[1].length as 2 | 3,
			title,
			id: nextId(title),
		};
	});
}
