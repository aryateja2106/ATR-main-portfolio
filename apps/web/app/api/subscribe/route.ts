import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { newsletterSubscribers } from "@/lib/db/schema";

const subscribeSchema = z.object({
	email: z.string().email("Invalid email address"),
	signupSource: z.string().optional().default("footer"),
});

// A simple in-memory rate limit map for server processes.
const rateLimitMap = new Map<string, number>();

export async function POST(request: Request) {
	try {
		// Basic IP-based rate limiting (1 request per minute per IP)
		const ip =
			request.headers.get("x-forwarded-for") ||
			request.headers.get("x-real-ip") ||
			"anonymous";
		const now = Date.now();
		const lastRequestTime = rateLimitMap.get(ip);

		if (lastRequestTime && now - lastRequestTime < 60000) {
			return NextResponse.json(
				{ error: "Too many requests. Please wait a minute before retrying." },
				{ status: 429 },
			);
		}
		rateLimitMap.set(ip, now);

		const body = await request.json();
		const parsed = subscribeSchema.safeParse(body);

		if (!parsed.success) {
			return NextResponse.json(
				{ error: parsed.error.issues[0].message },
				{ status: 400 },
			);
		}

		const { email, signupSource } = parsed.data;

		// Insert subscriber into database
		await db
			.insert(newsletterSubscribers)
			.values({
				email: email.toLowerCase().trim(),
				signupSource,
			})
			.onConflictDoNothing({ target: newsletterSubscribers.email });

		return NextResponse.json({ success: true }, { status: 200 });
		// biome-ignore lint/suspicious/noExplicitAny: catch error is any
	} catch (error: any) {
		console.error("Newsletter subscription error:", error);
		return NextResponse.json(
			{ error: "An unexpected error occurred. Please try again." },
			{ status: 500 },
		);
	}
}
