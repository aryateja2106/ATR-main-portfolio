import { defineConfig, devices } from "@playwright/test";

const PORT = process.env.PORT ?? "3000";
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	reporter: "list",
	use: {
		baseURL: BASE_URL,
		trace: "on-first-retry",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
	// To run against a fresh server, uncomment the webServer block.
	// In CI we usually run against an already-running `bun run dev`.
	webServer: process.env.PLAYWRIGHT_NO_WEB_SERVER
		? undefined
		: {
				command: "bun run dev",
				url: BASE_URL,
				reuseExistingServer: true,
				timeout: 120_000,
			},
});
