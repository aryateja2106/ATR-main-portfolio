import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import { Fira_Code, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import {
	SITE_AUTHOR,
	SITE_DESCRIPTION,
	SITE_KEYWORDS,
	SITE_LINKS,
	SITE_NAME,
	SITE_TAGLINE,
	SITE_TITLE_DEFAULT,
	SITE_TITLE_TEMPLATE,
	SITE_URL,
} from "@/lib/portfolio/site";
import BinaryCursor from "./_components/cursor-animation-wrapper";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: SITE_TITLE_DEFAULT,
		template: SITE_TITLE_TEMPLATE,
	},
	description: SITE_DESCRIPTION,
	applicationName: `${SITE_NAME}'s Portfolio`,
	authors: [
		{
			name: SITE_AUTHOR.name,
			url: SITE_LINKS.linkedin,
		},
	],
	category: "Portfolio Website",
	keywords: SITE_KEYWORDS,
	robots: {
		follow: true,
		index: true,
	},
	alternates: {
		canonical: "./",
	},
	openGraph: {
		title: SITE_TITLE_DEFAULT,
		description: SITE_TAGLINE,
		siteName: SITE_NAME,
		type: "website",
		url: SITE_URL,
		emails: [SITE_AUTHOR.email],
		// Default OG image is provided by app/opengraph-image.tsx (dynamic).
		// Per-route overrides live alongside their pages in (portfolio)/blog/[slug]/
		// and (portfolio)/projects/[slug]/.
		locale: "en_US",
	},
	twitter: {
		title: SITE_TITLE_DEFAULT,
		description: SITE_TAGLINE,
		card: "summary_large_image",
		// Twitter card image is provided by app/twitter-image.tsx (dynamic).
		creator: SITE_AUTHOR.twitter,
	},
};

export const viewport: Viewport = {
	themeColor: "#060606",
	colorScheme: "dark",
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

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-8ELMHNMBW2";

	return (
		<>
			{/* Google Analytics */}
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
