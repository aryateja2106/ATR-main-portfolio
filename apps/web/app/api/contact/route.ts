import { after } from "next/server";
import { inquirySchema } from "@/lib/contact";

const TURNSTILE_ENDPOINT =
	"https://challenges.cloudflare.com/turnstile/v0/siteverify";
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const TELEGRAM_API = "https://api.telegram.org";
const TURNSTILE_TIMEOUT_MS = 5_000;
const RESEND_TIMEOUT_MS = 10_000;
const TELEGRAM_TIMEOUT_MS = 5_000;

type ContactEnvironment = {
	resendApiKey: string;
	contactToEmail: string;
	resendFromEmail: string;
	turnstileSecretKey: string;
	telegramBotToken?: string;
	telegramChatId?: string;
};

function getContactEnvironment(): ContactEnvironment | null {
	const resendApiKey = process.env.RESEND_API_KEY;
	const contactToEmail = process.env.CONTACT_TO_EMAIL;
	const resendFromEmail = process.env.RESEND_FROM_EMAIL;
	const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY;
	const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
	const telegramChatId = process.env.TELEGRAM_CHAT_ID;

	if (
		!resendApiKey ||
		!contactToEmail ||
		!resendFromEmail ||
		!turnstileSecretKey
	) {
		return null;
	}

	return {
		resendApiKey,
		contactToEmail,
		resendFromEmail,
		turnstileSecretKey,
		telegramBotToken,
		telegramChatId,
	};
}

function json(data: unknown, init?: ResponseInit) {
	const headers = new Headers(init?.headers);
	headers.set("Cache-Control", "no-store");
	return Response.json(data, { ...init, headers });
}

async function verifyTurnstile(
	token: string,
	secret: string,
	remoteIp: string | null,
): Promise<boolean> {
	const formData = new URLSearchParams({ response: token, secret });
	if (remoteIp) {
		formData.set("remoteip", remoteIp);
	}

	const response = await fetch(TURNSTILE_ENDPOINT, {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: formData,
		signal: AbortSignal.timeout(TURNSTILE_TIMEOUT_MS),
	});
	if (!response.ok) {
		return false;
	}

	const result: unknown = await response.json();
	return (
		typeof result === "object" &&
		result !== null &&
		"success" in result &&
		result.success === true
	);
}

async function createIdempotencyKey(inquiry: {
	name: string;
	email: string;
	company: string;
	message: string;
	turnstileToken: string;
}): Promise<string> {
	const input = JSON.stringify([
		inquiry.turnstileToken,
		inquiry.name,
		inquiry.email,
		inquiry.company,
		inquiry.message,
	]);
	const digest = await crypto.subtle.digest(
		"SHA-256",
		new TextEncoder().encode(input),
	);
	return Array.from(new Uint8Array(digest), (byte) =>
		byte.toString(16).padStart(2, "0"),
	).join("");
}

export async function sendTelegramAlert(botToken: string, chatId: string) {
	try {
		await fetch(`${TELEGRAM_API}/bot${botToken}/sendMessage`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				chat_id: chatId,
				text: "New portfolio inquiry received. Check email for details.",
			}),
			signal: AbortSignal.timeout(TELEGRAM_TIMEOUT_MS),
		});
	} catch {
		// Email delivery is the source of truth; alerts are best-effort only.
	}
}

export async function POST(request: Request) {
	let body: unknown;

	try {
		body = await request.json();
	} catch {
		return json({ error: "Invalid request." }, { status: 400 });
	}

	const parsed = inquirySchema.safeParse(body);
	if (!parsed.success) {
		return json(
			{ error: "Please check the form and try again." },
			{ status: 400 },
		);
	}

	if (parsed.data.website !== "") {
		return json({ error: "Unable to send inquiry." }, { status: 400 });
	}

	const environment = getContactEnvironment();
	if (!environment) {
		return json(
			{ error: "The contact form is temporarily unavailable." },
			{ status: 503 },
		);
	}

	let turnstileVerified = false;
	try {
		turnstileVerified = await verifyTurnstile(
			parsed.data.turnstileToken,
			environment.turnstileSecretKey,
			request.headers.get("CF-Connecting-IP"),
		);
	} catch {
		return json(
			{ error: "The contact form is temporarily unavailable." },
			{ status: 503 },
		);
	}
	if (!turnstileVerified) {
		return json({ error: "Unable to verify this inquiry." }, { status: 400 });
	}

	const company = parsed.data.company || "Not provided";
	const emailText = [
		"New portfolio inquiry",
		"",
		`Name: ${parsed.data.name}`,
		`Email: ${parsed.data.email}`,
		`Company: ${company}`,
		"",
		"What they need help with:",
		parsed.data.message,
	].join("\n");
	const idempotencyKey = await createIdempotencyKey(parsed.data);

	let emailResponse: Response;
	try {
		emailResponse = await fetch(RESEND_ENDPOINT, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${environment.resendApiKey}`,
				"Content-Type": "application/json",
				"Idempotency-Key": idempotencyKey,
			},
			body: JSON.stringify({
				from: environment.resendFromEmail,
				to: [environment.contactToEmail],
				reply_to: parsed.data.email,
				subject: `Portfolio inquiry from ${parsed.data.name}`,
				text: emailText,
			}),
			signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
		});
	} catch {
		return json(
			{ error: "The inquiry could not be delivered. Please try again." },
			{ status: 502 },
		);
	}

	if (!emailResponse.ok) {
		return json(
			{ error: "The inquiry could not be delivered. Please try again." },
			{ status: 502 },
		);
	}

	if (environment.telegramBotToken && environment.telegramChatId) {
		const { telegramBotToken, telegramChatId } = environment;
		after(() => sendTelegramAlert(telegramBotToken, telegramChatId));
	}

	return json({ ok: true });
}
