import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import { Fira_Code, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import BinaryCursor from "./_components/cursor-animation-wrapper";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";

export const metadata: Metadata = {
	title: {
		default:
			"Arya Teja Rudraraju | AI Agent Engineer & Founder | Building the Agent Economy",
		template: "%s • Arya Teja Rudraraju",
	},
	description:
		"AI Agent Engineer and Founder building the agent economy from San Francisco. Shipped 6 products across Rust, TypeScript, Swift, and Python. Founder of CloudAGI and LeSearch AI.",
	metadataBase: new URL("https://www.aryateja.com"),
	applicationName: "Arya Teja Rudraraju's Portfolio",
	authors: [
		{
			name: "Arya Teja Rudraraju",
			url: "https://linkedin.com/in/arya-teja-rudraraju",
		},
	],
	category: "Portfolio Website",
	keywords: [
		"AI Agent Engineer",
		"Founder",
		"CloudAGI",
		"LeSearch AI",
		"Rust",
		"TypeScript",
		"Swift",
		"MCP",
		"Multi-Agent Systems",
		"San Francisco",
	],
	robots: {
		follow: true,
		index: true,
	},

	alternates: {
		canonical: "./",
	},
	openGraph: {
		title: "Arya Teja Rudraraju | AI Agent Engineer & Founder",
		description:
			"AI Agent Engineer and Founder building the agent economy from San Francisco. Shipped 6 products across Rust, TypeScript, Swift, and Python.",
		siteName: "Arya Teja Rudraraju",
		type: "website",
		url: "https://aryateja.com",
		emails: ["aryateja2106@gmail.com"],
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "Arya Teja Rudraraju - AI Agent Engineer & Founder",
			},
		],
		locale: "en_US",
	},
	twitter: {
		title: "Arya Teja Rudraraju | AI Agent Engineer & Founder",
		description:
			"Building the agent economy from San Francisco. Founder of CloudAGI and LeSearch AI. Rust, TypeScript, Swift, Python.",
		card: "summary_large_image",
		images: ["/og-image.png"],
		creator: "@r_aryateja",
	},
};

export const viewport: Viewport = {
	themeColor: "#060606", // Only using dark theme
	colorScheme: "dark", // Only using dark theme
	width: "device-width",
	initialScale: 1,
};

const inter = Inter({
	subsets: ["latin"],
	weight: ["200", "300", "400", "500", "600", "700", "900"],
	variable: "--font-inter",
	display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-mono",
	display: "swap",
});

const firaCode = Fira_Code({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-fira-code",
	display: "block",
});

// JSON-LD Structured Data for SEO
const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Arya Teja Rudraraju",
	url: "https://aryateja.com",
	image: "https://aryateja.com/og-image.png",
	jobTitle: "AI Agent Engineer & Founder",
	worksFor: [
		{
			"@type": "Organization",
			name: "CloudAGI",
			url: "https://github.com/aryateja2106/cloudagi",
		},
		{
			"@type": "Organization",
			name: "LeSearch AI",
			url: "https://github.com/aryateja2106/lesearch-app",
		},
	],
	alumniOf: {
		"@type": "CollegeOrUniversity",
		name: "Duquesne University",
	},
	address: {
		"@type": "PostalAddress",
		addressLocality: "San Francisco",
		addressRegion: "CA",
		addressCountry: "US",
	},
	sameAs: [
		"https://linkedin.com/in/arya-teja-rudraraju",
		"https://github.com/aryateja2106",
		"https://x.com/r_aryateja",
		"https://os.aryateja.com",
	],
	knowsAbout: [
		"AI Agent Engineering",
		"Multi-Agent Systems",
		"Rust",
		"TypeScript",
		"Swift",
		"Python",
		"MCP Protocol",
		"Machine Learning",
		"LLMs",
	],
};

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-8ELMHNMBW2";

	return (
		<>
			{/* JSON-LD Structured Data */}
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe here
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			{/* Google Analytics - Moved to top for better loading */}
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

			<div lang="en" className="dark scroll-smooth">
				<div
					className={`scroll-smooth bg-neutral-50 dark:bg-neutral-950 font-sans text-neutral-900 dark:text-neutral-300 selection:bg-emerald-400 selection:text-neutral-950 dark:selection:bg-emerald-500 dark:selection:text-neutral-950 ${inter.variable} ${jetbrainsMono.variable} ${firaCode.variable}`}
				>
					<div className="relative grain">
						<BinaryCursor />
						<Header />
						<main>{children}</main>
						<Footer />
					</div>
				</div>

				{/* Vercel Analytics */}
				<Analytics />
			</div>
		</>
	);
}
