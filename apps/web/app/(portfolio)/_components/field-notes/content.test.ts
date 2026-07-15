import assert from "node:assert/strict";
import test from "node:test";
import { agents, hero, journey, nav, writing } from "./content";

test("public portfolio content keeps stable navigation and evidence", () => {
	assert.deepEqual(
		nav.map((item) => item.href),
		["/#work", "/#experience", "/#about", "/blog", "/#contact"],
	);
	assert.equal(new Set(nav.map((item) => item.href)).size, nav.length);
	assert.equal(hero.records.length, 3);
	assert.ok(hero.portrait.startsWith("/real-images/"));
	assert.ok(agents.items.every((item) => item.href && item.desc));
	assert.ok(journey.photos.every((photo) => photo.src && photo.alt));
	assert.ok(writing.items.every((item) => item.href.startsWith("/blog/")));
});
