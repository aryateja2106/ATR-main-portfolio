import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import {
	personJsonLd,
	SITE_DESCRIPTION,
	SITE_TITLE_DEFAULT,
	SITE_URL,
} from "@/lib/portfolio/site";

import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: SITE_TITLE_DEFAULT,
	description: SITE_DESCRIPTION,
};

export const viewport = {
	// Disable auto-zoom on mobile Safari while still allowing user pinch-zoom for accessibility.
	maximumScale: 1,
};

const geist = Geist({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-geist",
});

const geistMono = Geist_Mono({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-geist-mono",
});

const LIGHT_THEME_COLOR = "hsl(0 0% 100%)";
const DARK_THEME_COLOR = "hsl(240deg 10% 3.92%)";
const THEME_COLOR_SCRIPT = `\
(function() {
  var html = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
  }
  function updateThemeColor() {
    var isDark = html.classList.contains('dark');
    meta.setAttribute('content', isDark ? '${DARK_THEME_COLOR}' : '${LIGHT_THEME_COLOR}');
  }
  var observer = new MutationObserver(updateThemeColor);
  observer.observe(html, { attributes: true, attributeFilter: ['class'] });
  updateThemeColor();
})();`;

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			// `next-themes` injects an extra classname to the body element to avoid
			// visual flicker before hydration. Hence the `suppressHydrationWarning`
			// prop is necessary to avoid the React hydration mismatch warning.
			// https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
			suppressHydrationWarning
			className={`${geist.variable} ${geistMono.variable}`}
		>
			<head>
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: theme color sync runs before hydration
					dangerouslySetInnerHTML={{
						__html: THEME_COLOR_SCRIPT,
					}}
				/>
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(personJsonLd),
					}}
				/>
			</head>
			<body className="antialiased dark scroll-smooth">
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<Toaster position="top-center" />
					{children}
					<Analytics />
					<SpeedInsights />
				</ThemeProvider>
			</body>
		</html>
	);
}
