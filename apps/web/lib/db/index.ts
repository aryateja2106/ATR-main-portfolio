import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
	throw new Error("POSTGRES_URL environment variable is not defined");
}

// For serverless environments like Vercel, we can create a single client instance.
// Set prepare: false to be compatible with pg-bouncer / Supabase transaction pools.
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });
