import assert from "node:assert/strict";
import test from "node:test";
import { createHeadingIdGenerator, extractArticleHeadings } from "./headings";

test("keeps duplicate heading links unique", () => {
	const nextId = createHeadingIdGenerator();

	assert.equal(nextId("Limit"), "limit");
	assert.equal(nextId("Limit"), "limit-1");
	assert.equal(nextId("Limit"), "limit-2");
});

test("extracts linked and formatted headings in document order", () => {
	assert.deepEqual(
		extractArticleHeadings(`## Choose by workflow
### \`node-pty\` fails to build
### Limit
### Limit`),
		[
			{ level: 2, title: "Choose by workflow", id: "choose-by-workflow" },
			{
				level: 3,
				title: "node-pty fails to build",
				id: "node-pty-fails-to-build",
			},
			{ level: 3, title: "Limit", id: "limit" },
			{ level: 3, title: "Limit", id: "limit-1" },
		],
	);
});
