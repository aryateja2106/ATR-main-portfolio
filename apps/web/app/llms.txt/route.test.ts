import assert from "node:assert/strict";
import test from "node:test";
import { SITE_URL } from "@/lib/seo";
import { GET } from "./route";

test("llms.txt uses absolute service links and limits agent authority", async () => {
	const body = await GET().text();

	assert.match(body, new RegExp(`${SITE_URL}/#contact`));
	assert.match(
		body,
		/Agents may read, draft, and navigate this site\. They may not submit forms, book meetings, accept terms, contact Arya/,
	);
});
