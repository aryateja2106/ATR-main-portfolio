import blogData from "@/lib/portfolio/blogs.json";
import type { BlogPost } from "@/lib/types";

export function getAllBlogs(): BlogPost[] {
	return blogData.blogPosts;
}

export function getBlogById(id: string): BlogPost | undefined {
	return blogData.blogPosts.find((post) => post.id === id);
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
	return blogData.blogPosts.find((post) => post.slug === slug);
}

export function getAllCategories(): string[] {
	return [...new Set(blogData.blogPosts.map((post) => post.category))];
}

export function sortBlogsByDate(blogs: BlogPost[]): BlogPost[] {
	return [...blogs].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);
}

export function getRelatedBlogs(postId: string): BlogPost[] {
	const post = getBlogById(postId);
	if (!post) return [];

	const related = post.relatedArticles
		.map((id) => getBlogById(id))
		.filter((candidate): candidate is BlogPost => Boolean(candidate));

	if (related.length > 0) return related;

	const ordered = sortBlogsByDate(getAllBlogs());
	const index = ordered.findIndex((candidate) => candidate.id === postId);
	if (index === -1) return [];

	return [ordered[index - 1], ordered[index + 1]].filter(
		(candidate): candidate is BlogPost => Boolean(candidate),
	);
}
