import { inquirySchema, MIN_SUBMISSION_TIME_MS } from "@/lib/contact";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const TELEGRAM_API = "https://api.telegram.org";

type ContactEnvironment = {
	resendApiKey: string;
	contactToEmail: string;
	resendFromEmail: string;
	telegramBotToken: string;
	telegramChatId: string;
};

function getContactEnvironment(): ContactEnvironment | null {
	const resendApiKey = process.env.RESEND_API_KEY;
	const contactToEmail = process.env.CONTACT_TO_EMAIL;
	const resendFromEmail = process.env.RESEND_FROM_EMAIL;
	const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
	const telegramChatId = process.env.TELEGRAM_CHAT_ID;

	if (
		!resendApiKey ||
		!contactToEmail ||
		!resendFromEmail ||
		!telegramBotToken ||
		!telegramChatId
	) {
		return null;
	}

	return {
		resendApiKey,
		contactToEmail,
		resendFromEmail,
		telegramBotToken,
		telegramChatId,
	};
}

export async function POST(request: Request) {
	let body: unknown;

	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "Invalid request." }, { status: 400 });
	}

	const parsed = inquirySchema.safeParse(body);
	if (!parsed.success) {
		return Response.json(
			{ error: "Please check the form and try again." },
			{ status: 400 },
		);
	}

	const now = Date.now();
	if (
		parsed.data.website !== "" ||
		parsed.data.startedAt > now ||
		now - parsed.data.startedAt < MIN_SUBMISSION_TIME_MS
	) {
		return Response.json({ error: "Unable to send inquiry." }, { status: 400 });
	}

	const environment = getContactEnvironment();
	if (!environment) {
		return Response.json(
			{ error: "The contact form is temporarily unavailable." },
			{ status: 503 },
		);
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

	let emailResponse: Response;
	try {
		emailResponse = await fetch(RESEND_ENDPOINT, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${environment.resendApiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from: environment.resendFromEmail,
				to: [environment.contactToEmail],
				reply_to: parsed.data.email,
				subject: `Portfolio inquiry from ${parsed.data.name}`,
				text: emailText,
			}),
		});
	} catch {
		return Response.json(
			{ error: "The inquiry could not be delivered. Please try again." },
			{ status: 502 },
		);
	}

	if (!emailResponse.ok) {
		return Response.json(
			{ error: "The inquiry could not be delivered. Please try again." },
			{ status: 502 },
		);
	}

	try {
		await fetch(
			`${TELEGRAM_API}/bot${environment.telegramBotToken}/sendMessage`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					chat_id: environment.telegramChatId,
					text: "New portfolio inquiry received. Check email for details.",
				}),
			},
		);
	} catch {
		// Email delivery is the source of truth; alerts are best-effort only.
	}

	return Response.json({ ok: true });
}
