// Phase 1 schema. Chat / auth / artifact tables removed in the rebuild.
// Phase 1 surface: newsletter signups + contact form messages.
// Migration target: Supabase (live) + Drizzle. Currently this file declares
// the intended shape; real migrations are generated via `bun run db:generate`
// after pointing drizzle.config.ts at the Supabase connection string.

import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
	id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
	email: varchar("email", { length: 320 }).notNull().unique(),
	signupSource: varchar("signup_source", { length: 64 }).default("footer"),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
});

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type NewNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;

export const contactMessages = pgTable("contact_messages", {
	id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
	name: varchar("name", { length: 200 }).notNull(),
	email: varchar("email", { length: 320 }).notNull(),
	message: text("message").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type NewContactMessage = typeof contactMessages.$inferInsert;
