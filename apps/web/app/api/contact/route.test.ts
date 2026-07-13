import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { POST } from "./route";

const originalFetch = globalThis.fetch;
const originalEnvironment = {
	RESEND_API_KEY: process.env.RESEND_API_KEY,
	CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
	RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
	TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
	TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
};

const validInquiry = {
	name: "Ada Lovelace",
	email: "ada@example.com",
	company: "Analytical Engines",
	message: "I need help designing a secure agent approval workflow.",
	website: "",
	startedAt: Date.now() - 10_000,
};

function setTestEnvironment() {
	process.env.RESEND_API_KEY = "test-resend-key";
	process.env.CONTACT_TO_EMAIL = "owner@example.com";
	process.env.RESEND_FROM_EMAIL = "Portfolio <contact@example.com>";
	process.env.TELEGRAM_BOT_TOKEN = "test-telegram-token";
	process.env.TELEGRAM_CHAT_ID = "test-chat-id";
}

function makeRequest(body: unknown) {
	return new Request("http://localhost/api/contact", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});
}

afterEach(() => {
	globalThis.fetch = originalFetch;
	for (const [name, value] of Object.entries(originalEnvironment)) {
		if (value === undefined) {
			delete process.env[name];
		} else {
			process.env[name] = value;
		}
	}
});

test("route sends the complete inquiry and a minimal Telegram alert", async () => {
	setTestEnvironment();
	const requests: Array<{ url: string; body: Record<string, unknown> }> = [];
	globalThis.fetch = async (input, init) => {
		requests.push({
			url: input.toString(),
			body: JSON.parse(String(init?.body)),
		});
		return new Response(null, { status: 200 });
	};

	const response = await POST(makeRequest(validInquiry));

	assert.equal(response.status, 200);
	assert.equal(requests.length, 2);
	assert.equal(requests[0].url, "https://api.resend.com/emails");
	assert.match(String(requests[0].body.text), /Ada Lovelace/);
	assert.match(String(requests[0].body.text), /ada@example.com/);
	assert.match(String(requests[0].body.text), /Analytical Engines/);
	assert.match(String(requests[0].body.text), /secure agent approval workflow/);
	assert.equal(
		requests[1].body.text,
		"New portfolio inquiry received. Check email for details.",
	);
	assert.doesNotMatch(String(requests[1].body.text), /Ada|example|workflow/);
});

test("route rejects bot-like submissions before network calls", async () => {
	setTestEnvironment();
	let fetchCalls = 0;
	globalThis.fetch = async () => {
		fetchCalls += 1;
		return new Response(null, { status: 200 });
	};

	const honeypotResponse = await POST(
		makeRequest({ ...validInquiry, website: "https://spam.example" }),
	);
	const tooFastResponse = await POST(
		makeRequest({ ...validInquiry, startedAt: Date.now() }),
	);

	assert.equal(honeypotResponse.status, 400);
	assert.equal(tooFastResponse.status, 400);
	assert.equal(fetchCalls, 0);
});

test("Telegram failure does not fail a delivered email", async () => {
	setTestEnvironment();
	let fetchCalls = 0;
	globalThis.fetch = async () => {
		fetchCalls += 1;
		if (fetchCalls === 2) {
			throw new Error("Telegram unavailable");
		}
		return new Response(null, { status: 200 });
	};

	const response = await POST(makeRequest(validInquiry));

	assert.equal(response.status, 200);
	assert.equal(fetchCalls, 2);
});

test("Resend failure returns an error and skips Telegram", async () => {
	setTestEnvironment();
	let fetchCalls = 0;
	globalThis.fetch = async () => {
		fetchCalls += 1;
		return new Response(null, { status: 500 });
	};

	const response = await POST(makeRequest(validInquiry));

	assert.equal(response.status, 502);
	assert.equal(fetchCalls, 1);
});
