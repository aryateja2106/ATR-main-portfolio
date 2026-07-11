import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: {
		default: "Arya Teja Rudraraju | AI Agent Systems & Consulting",
		template: "%s • Arya Teja Rudraraju",
	},
	description:
		"I help founders and teams design, secure, and ship practical AI agent systems, local-first workflows, and useful automation.",
	metadataBase: new URL("https://aryateja.com"),
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
		canonical: "https://aryateja.com",
	},
	openGraph: {
		title: "Arya Teja Rudraraju | AI Agent Systems & Consulting",
		description:
			"Practical AI agent systems, secure local-first workflows, open-source tools, and field-tested notes.",
		siteName: "Arya Teja Rudraraju",
		type: "website",
		url: "https://aryateja.com",
		emails: ["aryateja2106@gmail.com"],
		images: [
			{
				url: "/real-images/yc-robo-hk-solo.jpeg",
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
		images: ["/real-images/yc-robo-hk-solo.jpeg"],
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
	dateModified: "2026-07-11",
	mainEntity: {
		"@type": "Person",
		"@id": "https://aryateja.com/#person",
		name: "Arya Teja Rudraraju",
		url: "https://aryateja.com",
		image: "https://aryateja.com/real-images/yc-robo-hk-solo.jpeg",
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
		publishingPrinciples: "https://aryateja.com/blog",
	},
};

export default function Layout({ children }: { children: ReactNode }) {
	const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-8ELMHNMBW2";

	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe here
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
				strategy="afterInteractive"
			/>
			<Script id="google-analytics" strategy="afterInteractive">
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
