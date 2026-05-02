// Single source of truth for canonical brand strings.
// Every page, OG image, llms.txt regenerator, and copy lint must read from here.
// Voice rules: builder who ships in public. Direct, technical, no corporate speak.
// No em-dashes (signals AI-written). No "aspiring" language. No "AI PM" framing.

export const BRAND = {
	name: "Arya Teja Rudraraju",
	givenName: "Arya Teja",
	familyName: "Rudraraju",

	identity: "Agentic Engineer",
	fullTitle:
		"Agentic Engineer · Founder, LeSearch AI + CloudAGI · Building LeCoder MConnect · San Francisco",
	shortTitle: "Agentic Engineer · Founder, LeSearch AI + CloudAGI",

	tagline:
		"Builder shipping mobile-first AI tools from San Francisco. Founder of LeSearch AI and CloudAGI. Building LeCoder MConnect, terminal in your pocket for AI coding agents.",
	oneLiner:
		"Agentic Engineer in SF. Founder of LeSearch AI and CloudAGI. Building LeCoder MConnect.",
	heroPitch:
		"Founder, LeSearch AI + CloudAGI. Building LeCoder MConnect, an open-source mobile control layer for Claude Code, Cursor, and OpenCode. Currently in San Francisco, shipping in public.",

	voice: {
		rules: [
			"Builder who ships in public. Direct, technical, no corporate speak.",
			"No em-dashes anywhere in copy (signals AI-written).",
			"No 'aspiring' language. No 'AI PM' framing.",
		] as const,
		bannedSubstrings: [
			"em-dash",
			"aspiring",
			"hoping to break in",
			"looking to break in",
			"AI Product Manager",
		] as const,
	},

	location: {
		city: "San Francisco",
		region: "CA",
		country: "US",
		shortCode: "SF",
	},

	contact: {
		email: "aryateja2106@gmail.com",
		mailto: "mailto:aryateja2106@gmail.com",
	},

	links: {
		site: "https://www.aryateja.com",
		linkedin: "https://linkedin.com/in/arya-teja-rudraraju",
		github: "https://github.com/aryateja2106",
		githubOrg: "https://github.com/LeSearch-AI",
		twitter: "https://x.com/r_aryateja",
		npm: "https://www.npmjs.com/package/lecoder-mconnect",
		lecoder: "https://lecoder.lesearch.ai",
		cloudagi: "https://cloudagi.vercel.app",
		lesearch: "https://lesearch-app.vercel.app",
		nl2shell: "https://nl2shell.com",
	},

	resumePath: "/resume/Arya_Teja_Rudraraju_Resume.pdf",

	openTo: [
		"AI Engineer",
		"Forward Deployed Engineer",
		"Product Engineer",
	] as const,

	worksFor: [
		{ name: "LeSearch AI", url: "https://lesearch-app.vercel.app" },
		{ name: "CloudAGI", url: "https://cloudagi.vercel.app" },
	] as const,

	currentlyBuilding: [
		"LeCoder MConnect",
		"LeSearch AI",
		"CloudAGI",
		"Software Factory",
		"NL2Shell",
	] as const,
} as const;

export type Brand = typeof BRAND;
