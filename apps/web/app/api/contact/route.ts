import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";

const contactSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	message: z.string().min(10, "Message must be at least 10 characters"),
});

// A simple in-memory rate limit map for contact form submissions.
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
		const parsed = contactSchema.safeParse(body);

		if (!parsed.success) {
			return NextResponse.json(
				{ error: parsed.error.issues[0].message },
				{ status: 400 },
			);
		}

		const { name, email, message } = parsed.data;

		// 1. Insert message into the database
		await db.insert(contactMessages).values({
			name: name.trim(),
			email: email.toLowerCase().trim(),
			message: message.trim(),
		});

		// 2. Dispatch email notification to Arya via Resend REST API
		const resendApiKey = process.env.RESEND_API_KEY;
		if (resendApiKey) {
			try {
				const response = await fetch("https://api.resend.com/emails", {
					method: "POST",
					headers: {
						Authorization: `Bearer ${resendApiKey}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						from: "Contact Form <onboarding@resend.dev>",
						to: "aryateja2106@gmail.com",
						subject: `New Portfolio Message from ${name}`,
						html: `
							<h2>New Message from your Portfolio Site</h2>
							<p><strong>Name:</strong> ${name}</p>
							<p><strong>Email:</strong> ${email}</p>
							<p><strong>Message:</strong></p>
							<div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; border-left: 4px solid #14b8a6; margin-top: 10px; white-space: pre-wrap;">
								${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
							</div>
							<p style="font-size: 11px; color: #888; margin-top: 20px;">Submitted from: ${ip}</p>
						`,
					}),
				});

				if (!response.ok) {
					const errorData = await response.json();
					console.error("Resend API returned error:", errorData);
				}
			} catch (emailError) {
				console.error("Failed to send email through Resend:", emailError);
				// We don't fail the entire request if just email notification fails,
				// since the message was successfully written to the database.
			}
		} else {
			console.warn(
				"RESEND_API_KEY is not defined. Skipping email notification.",
			);
		}

		return NextResponse.json({ success: true }, { status: 200 });
		// biome-ignore lint/suspicious/noExplicitAny: catch error is any
	} catch (error: any) {
		console.error("Contact submission error:", error);
		return NextResponse.json(
			{ error: "An unexpected error occurred. Please try again." },
			{ status: 500 },
		);
	}
}
