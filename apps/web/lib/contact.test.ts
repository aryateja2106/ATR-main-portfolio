import assert from "node:assert/strict";
import test from "node:test";
import { inquirySchema } from "./contact";

const validInquiry = {
	name: "Ada Lovelace",
	email: "ada@example.com",
	company: "Analytical Engines",
	message: "I need help designing a secure agent approval workflow.",
	website: "",
	turnstileToken: "verified-token",
};

test("inquiry schema accepts a minimal valid inquiry", () => {
	const parsed = inquirySchema.parse({
		...validInquiry,
		company: undefined,
	});

	assert.equal(parsed.company, "");
	assert.equal(parsed.email, "ada@example.com");
});

test("inquiry schema rejects invalid and oversized fields", () => {
	assert.equal(
		inquirySchema.safeParse({ ...validInquiry, email: "not-an-email" }).success,
		false,
	);
	assert.equal(
		inquirySchema.safeParse({ ...validInquiry, message: "Too short" }).success,
		false,
	);
	assert.equal(
		inquirySchema.safeParse({ ...validInquiry, name: "x".repeat(101) }).success,
		false,
	);
	assert.equal(
		inquirySchema.safeParse({ ...validInquiry, unexpected: "field" }).success,
		false,
	);
});

test("inquiry schema rejects control characters in name and company", () => {
	for (const value of ["Ada\rLovelace", "Ada\nLovelace", "Ada\u0000Lovelace"]) {
		assert.equal(
			inquirySchema.safeParse({ ...validInquiry, name: value }).success,
			false,
		);
		assert.equal(
			inquirySchema.safeParse({ ...validInquiry, company: value }).success,
			false,
		);
	}
});
