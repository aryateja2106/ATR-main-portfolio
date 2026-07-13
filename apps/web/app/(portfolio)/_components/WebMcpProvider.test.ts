import assert from "node:assert/strict";
import test from "node:test";
import { createPortfolioTools } from "./WebMcpProvider";

test("portfolio tools expose context, search articles, and validate navigation", async () => {
	const navigations: string[] = [];
	const tools = createPortfolioTools({
		articles: [
			{
				slug: "mconnect-guide",
				title: "MConnect Guide",
				description: "Control coding agents from a phone",
				category: "Implementation Guide",
				tags: ["Mobile", "Agents"],
			},
		],
		currentPath: "/blog",
		navigate: (path) => navigations.push(path),
	});

	assert.deepEqual(
		tools.map((tool) => tool.name),
		[
			"get_portfolio_context",
			"find_technical_articles",
			"open_technical_article",
			"navigate_portfolio",
		],
	);

	const find = tools.find((tool) => tool.name === "find_technical_articles");
	const open = tools.find((tool) => tool.name === "open_technical_article");
	const navigate = tools.find((tool) => tool.name === "navigate_portfolio");
	assert.ok(find && open && navigate);
	assert.deepEqual(await find.execute({ query: "mobile" }), [
		{
			slug: "mconnect-guide",
			title: "MConnect Guide",
			description: "Control coding agents from a phone",
			category: "Implementation Guide",
			tags: ["Mobile", "Agents"],
			path: "/blog/mconnect-guide",
		},
	]);
	assert.deepEqual(await open.execute({ slug: "unknown" }), {
		error: "Unknown article slug. Call find_technical_articles first.",
	});
	assert.deepEqual(await open.execute({ slug: "mconnect-guide" }), {
		navigatingTo: "/blog/mconnect-guide",
	});
	assert.deepEqual(await navigate.execute({ destination: "resume" }), {
		error: "Unknown destination.",
	});
	assert.deepEqual(navigations, ["/blog/mconnect-guide"]);
});
