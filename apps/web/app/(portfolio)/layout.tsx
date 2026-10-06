import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import blogData from "@/lib/portfolio/blogs.json";
import type { BlogPost } from "@/lib/types";
import { WebMcpProvider } from "./_components/WebMcpProvider";

export const metadata: Metadata = {
	title: {
		default: "Applied AI & Forward Deployed Engineer | Arya Teja",
		template: "%s • Arya Teja Rudraraju",
	},
	description:
		"Applied AI specialist and forward deployed engineer building practical agent systems, POCs, MVPs, testing automation, and multi-machine orchestration.",
	metadataBase: new URL("https://aryateja.com"),
	applicationName: "Arya Teja Rudraraju",
	authors: [
		{
			name: "Arya Teja Rudraraju",
			url: "https://linkedin.com/in/arya-teja-rudraraju",
		},
	],
	category: "Applied AI",
	keywords: [
		"Applied AI Specialist",
		"Forward Deployed Engineer",
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
		canonical: "https://aryateja.com",
	},
	openGraph: {
		title: "Applied AI & Forward Deployed Engineer | Arya Teja",
		description:
			"Applied AI delivery, practical agent systems, POCs, MVPs, testing automation, and multi-machine orchestration.",
		siteName: "Arya Teja Rudraraju",
		type: "website",
		url: "https://aryateja.com",
		emails: ["aryateja2106@gmail.com"],
		images: [
			{
				url: "/aryateja-og.webp",
				width: 1200,
				height: 630,
				alt: "Arya Teja Rudraraju at YC Robo in Hong Kong",
			},
		],
		locale: "en_US",
	},
	twitter: {
		title: "Applied AI & Forward Deployed Engineer | Arya Teja",
		description:
			"Applied AI delivery, practical agent systems, POCs, MVPs, testing automation, and multi-machine orchestration.",
		card: "summary_large_image",
		images: ["/aryateja-og.webp"],
		creator: "@r_aryateja",
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
	"@type": "ProfilePage",
	"@id": "https://aryateja.com/#profile",
	name: "Arya Teja Rudraraju",
	url: "https://aryateja.com",
	dateModified: "2026-07-15",
	mainEntity: {
		"@type": "Person",
		"@id": "https://aryateja.com/#person",
		name: "Arya Teja Rudraraju",
		url: "https://aryateja.com",
		image: "https://aryateja.com/real-images/yc-robo-hk-solo.webp",
		jobTitle: "Applied AI Specialist and Agent Systems Builder",
		description:
			"Applied AI specialist and forward deployed engineer building practical agent systems, POCs, MVPs, testing automation, and multi-machine orchestration.",
		homeLocation: {
			"@type": "Country",
			name: "India",
		},
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
			"Applied AI",
			"Forward Deployed Engineering",
			"AI Agents",
			"Agentic Engineering",
			"Secure AI Agent Setup",
			"Local-first AI",
			"RAG Systems",
			"Context Engineering",
			"TypeScript",
			"Next.js",
			"Playwright",
			"Model Context Protocol",
			"Open Source",
			"Product Strategy",
		],
		publishingPrinciples: "https://aryateja.com/blog",
	},
};

export default function Layout({ children }: { children: ReactNode }) {
	const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-8ELMHNMBW2";
	const articles = (blogData.blogPosts as BlogPost[]).map(
		({
			slug,
			title,
			description,
			category,
			tags,
			executiveSummary,
			agentNavigation,
			sourceLicenses,
			reuse,
		}) => ({
			slug,
			title,
			description,
			category,
			tags,
			executiveSummary,
			agentNavigation,
			sourceLicenses,
			reuse,
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
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
				strategy="lazyOnload"
			/>
			<Script id="google-analytics" strategy="lazyOnload">
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
			</Script>
			{children}
		</>
	);
}
