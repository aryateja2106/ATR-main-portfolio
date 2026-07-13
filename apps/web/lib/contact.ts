import { z } from "zod";

const singleLineText = z
	.string()
	.trim()
	.refine((value) =>
		Array.from(value).every((character) => {
			const codePoint = character.codePointAt(0) ?? 0;
			return codePoint > 31 && (codePoint < 127 || codePoint > 159);
		}),
	);

export const inquirySchema = z
	.object({
		name: singleLineText.min(2).max(100),
		email: z.string().trim().email().max(254),
		company: singleLineText.max(120).optional().default(""),
		message: z.string().trim().min(20).max(4_000),
		website: z.string().max(0),
		turnstileToken: z.string().trim().min(1).max(2_048),
	})
	.strict();

export type Inquiry = z.infer<typeof inquirySchema>;
