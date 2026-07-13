import { z } from "zod";

export const MIN_SUBMISSION_TIME_MS = 3_000;

export const inquirySchema = z
	.object({
		name: z.string().trim().min(2).max(100),
		email: z.string().trim().email().max(254),
		company: z.string().trim().max(120).optional().default(""),
		message: z.string().trim().min(20).max(4_000),
		website: z.string().max(0),
		startedAt: z.coerce.number().int().positive(),
	})
	.strict();

export type Inquiry = z.infer<typeof inquirySchema>;
