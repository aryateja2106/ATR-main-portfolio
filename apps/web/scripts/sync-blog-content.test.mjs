import assert from "node:assert/strict";
import test from "node:test";
import { parseBlogSource, toBlogPost } from "./sync-blog-content.mjs";

test("parses JSON frontmatter and builds a blog post", () => {
	const parsed = parseBlogSource(`---
{"title":"Test","slug":"test","date":"2026-07-12","excerpt":"Useful note.","category":"Build Note","tags":["Agents"],"executiveSummary":"Start here.","agentNavigation":{"useFor":["Choosing a tool"],"startAt":"#decision"},"sourceLicenses":[{"source":"https://github.com/example/repo","license":"MIT"}],"reuse":{"code":"Preserve the license."},"status":"published"}
---
# Hello

Useful body.
`);
	const post = toBlogPost(parsed, 4);

	assert.equal(post.id, "4");
	assert.equal(post.formattedDate, "July 12, 2026");
	assert.equal(post.coverImage, "/api/blog-cover/test");
	assert.equal(post.executiveSummary, "Start here.");
	assert.deepEqual(post.agentNavigation, {
		useFor: ["Choosing a tool"],
		startAt: "#decision",
	});
	assert.deepEqual(post.sourceLicenses, [
		{ source: "https://github.com/example/repo", license: "MIT" },
	]);
	assert.deepEqual(post.reuse, { code: "Preserve the license." });
	assert.match(post.content, /Useful body/);
});
