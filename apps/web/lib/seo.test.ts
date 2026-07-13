import assert from "node:assert/strict";
import test from "node:test";
import type { BlogPost } from "@/lib/types";
import {
	calculateReadTime,
	renderBlogMarkdown,
	renderFeed,
	SITE_URL,
} from "./seo";

const post: BlogPost = {
	id: "1",
	slug: "example",
	title: "An example & test",
	description: "A concise description.",
	excerpt: "A concise excerpt.",
	date: "2026-07-11",
	formattedDate: "July 11, 2026",
	readTime: "1 min read",
	category: "Guide",
	tags: ["AI Agents"],
	coverImage: "/cover.png",
	author: {
		id: "1",
		name: "Arya Teja Rudraraju",
		avatar: "/avatar.png",
		bio: "Agentic Systems Founder",
	},
	relatedArticles: [],
	content: "Useful article content.",
};

test("calculateReadTime derives a minimum one-minute estimate from content", () => {
	assert.equal(calculateReadTime("short post"), "1 min read");
	assert.equal(calculateReadTime("word ".repeat(226)), "2 min read");
});

test("feed and markdown use canonical URLs and escape XML", () => {
	const feed = renderFeed([post]);
	const markdown = renderBlogMarkdown(post);

	assert.match(feed, /An example &amp; test/);
	assert.match(feed, new RegExp(`${SITE_URL}/blog/example`));
	assert.match(markdown, new RegExp(`Canonical URL: ${SITE_URL}/blog/example`));
	assert.match(markdown, /Useful article content\./);
});
