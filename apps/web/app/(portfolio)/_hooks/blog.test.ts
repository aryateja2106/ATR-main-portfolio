import assert from "node:assert/strict";
import test from "node:test";
import {
	getAllBlogs,
	getAllCategories,
	getBlogBySlug,
	getRelatedBlogs,
	sortBlogsByDate,
} from "./blog";

test("published blog data stays unique, sortable, and internally linked", () => {
	const posts = getAllBlogs();
	const slugs = posts.map((post) => post.slug);

	assert.ok(posts.length > 0);
	assert.equal(new Set(slugs).size, slugs.length);
	assert.ok(posts.every((post) => getBlogBySlug(post.slug)?.id === post.id));
	assert.deepEqual(
		sortBlogsByDate(posts).map((post) => post.id),
		[...posts]
			.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
			.map((post) => post.id),
	);
	assert.ok(getAllCategories().every(Boolean));
	assert.ok(
		posts.every((post) =>
			getRelatedBlogs(post.id).every((related) => related.id !== post.id),
		),
	);
});
