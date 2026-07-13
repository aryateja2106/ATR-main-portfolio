import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { POST, sendTelegramAlert } from "./route";

const originalFetch = globalThis.fetch;
const originalEnvironment = {
	RESEND_API_KEY: process.env.RESEND_API_KEY,
	CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
	RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
	TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
	TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
	TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
};

const validInquiry = {
	name: "Ada Lovelace",
	email: "ada@example.com",
	company: "Analytical Engines",
	message: "I need help designing a secure agent approval workflow.",
	website: "",
	turnstileToken: "verified-token",
};

function setTestEnvironment({ telegram = false } = {}) {
	process.env.RESEND_API_KEY = "test-resend-key";
	process.env.CONTACT_TO_EMAIL = "owner@example.com";
	process.env.RESEND_FROM_EMAIL = "Portfolio <contact@example.com>";
	process.env.TURNSTILE_SECRET_KEY = "test-turnstile-secret";
	if (telegram) {
		process.env.TELEGRAM_BOT_TOKEN = "test-telegram-token";
		process.env.TELEGRAM_CHAT_ID = "test-chat-id";
	} else {
		Reflect.deleteProperty(process.env, "TELEGRAM_BOT_TOKEN");
		Reflect.deleteProperty(process.env, "TELEGRAM_CHAT_ID");
	}
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

test("route verifies Turnstile and sends the complete inquiry without Telegram", async () => {
	setTestEnvironment();
	const requests: Array<{
		url: string;
		body: string;
		headers: Headers;
		signal: AbortSignal | null;
	}> = [];
	globalThis.fetch = async (input, init) => {
		requests.push({
			url: input.toString(),
			body: String(init?.body),
			headers: new Headers(init?.headers),
			signal: init?.signal ?? null,
		});
		if (input.toString().includes("siteverify")) {
			return Response.json({ success: true });
		}
		return new Response(null, { status: 200 });
	};

	const response = await POST(makeRequest(validInquiry));

	assert.equal(response.status, 200);
	assert.equal(requests.length, 2);
	assert.equal(response.headers.get("Cache-Control"), "no-store");
	assert.equal(
		requests[0].url,
		"https://challenges.cloudflare.com/turnstile/v0/siteverify",
	);
	assert.match(requests[0].body, /response=verified-token/);
	assert.match(requests[0].body, /secret=test-turnstile-secret/);
	assert.ok(requests[0].signal);
	assert.equal(requests[1].url, "https://api.resend.com/emails");
	const resendBody = JSON.parse(requests[1].body);
	assert.match(String(resendBody.text), /Ada Lovelace/);
	assert.match(String(resendBody.text), /ada@example.com/);
	assert.match(String(resendBody.text), /Analytical Engines/);
	assert.match(String(resendBody.text), /secure agent approval workflow/);
	assert.match(
		requests[1].headers.get("Idempotency-Key") ?? "",
		/^[a-f0-9]{64}$/,
	);
	assert.ok(requests[1].signal);
});

test("route rejects honeypot submissions before network calls", async () => {
	setTestEnvironment();
	let fetchCalls = 0;
	globalThis.fetch = async () => {
		fetchCalls += 1;
		return new Response(null, { status: 200 });
	};

	const honeypotResponse = await POST(
		makeRequest({ ...validInquiry, website: "https://spam.example" }),
	);

	assert.equal(honeypotResponse.status, 400);
	assert.equal(honeypotResponse.headers.get("Cache-Control"), "no-store");
	assert.equal(fetchCalls, 0);
});

test("route fails safely when required delivery keys are unavailable", async () => {
	setTestEnvironment();
	Reflect.deleteProperty(process.env, "TURNSTILE_SECRET_KEY");
	let fetchCalls = 0;
	globalThis.fetch = async () => {
		fetchCalls += 1;
		return new Response(null, { status: 200 });
	};

	const response = await POST(makeRequest(validInquiry));

	assert.equal(response.status, 503);
	assert.equal(response.headers.get("Cache-Control"), "no-store");
	assert.equal(fetchCalls, 0);
});

test("route rejects failed Turnstile verification before sending email", async () => {
	setTestEnvironment();
	let fetchCalls = 0;
	globalThis.fetch = async () => {
		fetchCalls += 1;
		return Response.json({ success: false });
	};

	const response = await POST(makeRequest(validInquiry));

	assert.equal(response.status, 400);
	assert.equal(response.headers.get("Cache-Control"), "no-store");
	assert.equal(fetchCalls, 1);
});

test("route fails safely when Turnstile is unavailable", async () => {
	setTestEnvironment();
	globalThis.fetch = async () => {
		throw new DOMException("Timed out", "TimeoutError");
	};

	const response = await POST(makeRequest(validInquiry));

	assert.equal(response.status, 503);
	assert.equal(response.headers.get("Cache-Control"), "no-store");
});

test("Resend failure returns an error and skips Telegram", async () => {
	setTestEnvironment();
	let fetchCalls = 0;
	globalThis.fetch = async (input) => {
		fetchCalls += 1;
		if (input.toString().includes("siteverify")) {
			return Response.json({ success: true });
		}
		return new Response(null, { status: 500 });
	};

	const response = await POST(makeRequest(validInquiry));

	assert.equal(response.status, 502);
	assert.equal(response.headers.get("Cache-Control"), "no-store");
	assert.equal(fetchCalls, 2);
});

test("Resend timeout returns an error", async () => {
	setTestEnvironment();
	globalThis.fetch = async (input) => {
		if (input.toString().includes("siteverify")) {
			return Response.json({ success: true });
		}
		throw new DOMException("Timed out", "TimeoutError");
	};

	const response = await POST(makeRequest(validInquiry));

	assert.equal(response.status, 502);
});

test("Telegram alert is minimal, bounded, and failure-safe", async () => {
	let requestBody = "";
	let requestSignal: AbortSignal | null = null;
	globalThis.fetch = async (_input, init) => {
		requestBody = String(init?.body);
		requestSignal = init?.signal ?? null;
		throw new Error("Telegram unavailable");
	};

	await assert.doesNotReject(() =>
		sendTelegramAlert("test-telegram-token", "test-chat-id"),
	);

	const body = JSON.parse(requestBody);
	assert.equal(body.chat_id, "test-chat-id");
	assert.equal(
		body.text,
		"New portfolio inquiry received. Check email for details.",
	);
	assert.doesNotMatch(requestBody, /Ada|example|workflow/);
	assert.ok(requestSignal);
});
