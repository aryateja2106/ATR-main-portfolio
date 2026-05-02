// Single source of truth for site-wide metadata.
// All layouts, sitemap, robots, llms.txt, and OG image generators must read from here.
// The canonical hostname is www.aryateja.com. The apex (aryateja.com) 301s to www.

import { BRAND } from "./brand";

export const SITE_URL = BRAND.links.site;

export const SITE_NAME = BRAND.name;

export const SITE_TITLE_DEFAULT = `${BRAND.name} · ${BRAND.shortTitle}`;

export const SITE_TITLE_TEMPLATE = `%s · ${BRAND.name}`;

export const SITE_DESCRIPTION = BRAND.tagline;

export const SITE_TAGLINE = BRAND.heroPitch;

export const SITE_AUTHOR = {
	name: BRAND.name,
	givenName: BRAND.givenName,
	familyName: BRAND.familyName,
	email: BRAND.contact.email,
	jobTitle: BRAND.identity,
	location: {
		city: BRAND.location.city,
		region: BRAND.location.region,
		country: BRAND.location.country,
	},
	twitter: "@r_aryateja",
};

export const SITE_LINKS = {
	linkedin: BRAND.links.linkedin,
	github: BRAND.links.github,
	twitter: BRAND.links.twitter,
	email: BRAND.contact.mailto,
	resumePdf: BRAND.resumePath,
	lecoder: BRAND.links.lecoder,
	cloudagi: BRAND.links.cloudagi,
	lesearch: BRAND.links.lesearch,
	npm: BRAND.links.npm,
};

export const SITE_KEYWORDS = [
	"Arya Teja Rudraraju",
	"Agentic Engineer",
	"LeSearch AI",
	"CloudAGI",
	"LeCoder MConnect",
	"Mobile AI Orchestration",
	"AI Coding Agents",
	"Claude Code Mobile",
	"Cursor Mobile",
	"AI Agents",
	"Agentic Systems",
	"Software Factory",
	"NL2Shell",
	"LeShell",
	"Cloudflare Tunnel",
	"Model Context Protocol",
	"MCP",
	"Local LLMs",
	"San Francisco",
	"Founder",
];

// Canonical Person JSON-LD (schema.org). Render once in the root layout.
export const personJsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: SITE_AUTHOR.name,
	givenName: SITE_AUTHOR.givenName,
	familyName: SITE_AUTHOR.familyName,
	url: SITE_URL,
	image: `${SITE_URL}/opengraph-image`,
	jobTitle: SITE_AUTHOR.jobTitle,
	description: SITE_DESCRIPTION,
	email: `mailto:${SITE_AUTHOR.email}`,
	address: {
		"@type": "PostalAddress",
		addressLocality: SITE_AUTHOR.location.city,
		addressRegion: SITE_AUTHOR.location.region,
		addressCountry: SITE_AUTHOR.location.country,
	},
	worksFor: BRAND.worksFor.map((org) => ({
		"@type": "Organization",
		name: org.name,
		url: org.url,
	})),
	alumniOf: {
		"@type": "CollegeOrUniversity",
		name: "Duquesne University",
	},
	sameAs: [
		SITE_LINKS.linkedin,
		SITE_LINKS.github,
		SITE_LINKS.twitter,
		BRAND.links.npm,
		BRAND.links.lecoder,
		BRAND.links.cloudagi,
	],
	knowsAbout: [
		"Agentic Systems",
		"Mobile Agent Orchestration",
		"AI Coding Agents",
		"LLM Reasoning",
		"RAG Systems",
		"Model Context Protocol (MCP)",
		"Local LLM Inference",
		"Cloudflare Tunnels",
		"0 to 1 Product Development",
	],
};

export type PersonJsonLd = typeof personJsonLd;
