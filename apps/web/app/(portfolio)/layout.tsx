import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import blogData from "@/lib/portfolio/blogs.json";
import {
	PERSON_ID,
	SERVICE_ID,
	SITE_URL,
	TWITTER_HANDLE,
	WEBSITE_ID,
} from "@/lib/seo";
import { WebMcpProvider } from "./_components/WebMcpProvider";

export const metadata: Metadata = {
	title: {
		default: "Arya Teja Rudraraju | AI Agent Systems & Consulting",
		template: "%s • Arya Teja Rudraraju",
	},
	description:
		"I help founders and teams design, secure, and ship practical AI agent systems, local-first workflows, and useful automation.",
	metadataBase: new URL(SITE_URL),
	applicationName: "Arya Teja Rudraraju",
	authors: [
		{
			name: "Arya Teja Rudraraju",
			url: "https://linkedin.com/in/arya-teja-rudraraju",
		},
	],
	category: "AI Consulting",
	keywords: [
		"Agentic Engineer",
		"AI Agents",
		"LeSearch AI",
		"CloudAGI",
		"LeCoder MConnect",
		"LLMs",
		"RAG Systems",
		"Open Source Agents",
		"Context Engineering",
		"AI Agent Consulting",
		"Local-first AI",
		"Secure AI Agent Setup",
	],
	robots: {
		follow: true,
		index: true,
	},
	alternates: {
		canonical: SITE_URL,
		types: {
			"application/rss+xml": `${SITE_URL}/feed.xml`,
		},
	},
	openGraph: {
		title: "Arya Teja Rudraraju | AI Agent Systems & Consulting",
		description:
			"Practical AI agent systems, secure local-first workflows, open-source tools, and field-tested notes.",
		siteName: "Arya Teja Rudraraju",
		type: "website",
		url: SITE_URL,
		emails: ["aryateja2106@gmail.com"],
		images: [
			{
				url: "/og/aryateja-og.jpg",
				width: 1200,
				height: 630,
				alt: "Arya Teja Rudraraju at YC Robo in Hong Kong",
			},
		],
		locale: "en_US",
	},
	twitter: {
		title: "Arya Teja Rudraraju | AI Agent Systems & Consulting",
		description:
			"Practical AI agent systems, secure local-first workflows, open-source tools, and field-tested notes.",
		card: "summary_large_image",
		images: ["/og/aryateja-og.jpg"],
		site: TWITTER_HANDLE,
		creator: TWITTER_HANDLE,
	},
};

export const viewport: Viewport = {
	themeColor: "#12110f",
	colorScheme: "dark",
	width: "device-width",
	initialScale: 1,
};

const jsonLd = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "WebSite",
			"@id": WEBSITE_ID,
			name: "Arya Teja Rudraraju",
			url: SITE_URL,
			publisher: { "@id": PERSON_ID },
		},
		{
			"@type": "ProfilePage",
			"@id": `${SITE_URL}/#profile`,
			name: "Arya Teja Rudraraju",
			url: SITE_URL,
			dateModified: "2026-07-11",
			isPartOf: { "@id": WEBSITE_ID },
			mainEntity: { "@id": PERSON_ID },
		},
		{
			"@type": "Person",
			"@id": PERSON_ID,
			name: "Arya Teja Rudraraju",
			url: SITE_URL,
			image: `${SITE_URL}/real-images/yc-robo-hk-solo.jpeg`,
			jobTitle: "Founder and Agentic Systems Builder",
			description:
				"Founder helping teams design, secure, and ship practical AI agent systems and local-first workflows.",
			alumniOf: {
				"@type": "CollegeOrUniversity",
				name: "Duquesne University",
			},
			sameAs: [
				"https://linkedin.com/in/arya-teja-rudraraju",
				"https://github.com/aryateja2106",
				"https://x.com/r_aryateja",
			],
			knowsAbout: [
				"AI Agents",
				"Agentic Engineering",
				"Secure AI Agent Setup",
				"Local-first AI",
				"RAG Systems",
				"Context Engineering",
				"Open Source",
				"Product Strategy",
			],
			publishingPrinciples: `${SITE_URL}/blog`,
		},
		{
			"@type": "Service",
			"@id": SERVICE_ID,
			name: "AI agent consulting",
			description:
				"Direct help with secure agent setup, local-first workflows, automation, and practical implementation.",
			url: `${SITE_URL}/#work`,
			provider: { "@id": PERSON_ID },
		},
	],
};

export default function Layout({ children }: { children: ReactNode }) {
	const articles = blogData.blogPosts.map(
		({ slug, title, description, category, tags }) => ({
			slug,
			title,
			description,
			category,
			tags,
		}),
	);

	return (
		<>
			<WebMcpProvider articles={articles} />
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe here
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			{children}
		</>
	);
}
