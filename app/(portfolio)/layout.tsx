import type { Metadata, Viewport } from "next";
import { Inter, Poppins, Fira_Code } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import BinaryCursor from "./_components/cursor-animation-wrapper";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";

export const metadata: Metadata = {
  title: {
    default: "Arya Teja Rudraraju | AI Engineer & Automation Specialist",
    template: "%s • Arya Teja Rudraraju",
  },
  description:
    "AI Engineer specializing in LLMs, generative AI, and automation solutions for business challenges",
  metadataBase: new URL("https://www.aryateja.com"), // Fixed to match GA configuration
  applicationName: "Arya Teja Rudraraju's Portfolio",
  authors: [
    {
      name: "Arya Teja Rudraraju",
      url: "https://linkedin.com/in/arya-teja-rudraraju",
    },
  ],
  category: "Portfolio Website",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "LLMs",
    "Generative AI",
    "NextJS",
    "Python",
    "JavaScript",
    "TypeScript",
    "AI Marketing",
    "Automation",
    "Langchain",
    "Crew AI",
  ],
  robots: {
    follow: true,
    index: true,
  },
  openGraph: {
    title: "Arya Teja Rudraraju | AI Engineer & Automation Specialist",
    description:
      "AI Engineer specializing in LLMs, generative AI, and automation solutions for business challenges",
    siteName: "Arya Teja Rudraraju",
    type: "website",
    url: "/",
    emails: ["aryateja2106@gmail.com"],
  },
  twitter: {
    title: "Arya Teja Rudraraju | AI Engineer & Automation Specialist",
    description:
      "AI Engineer specializing in LLMs, generative AI, and automation solutions for business challenges",
    card: "summary_large_image",
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

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
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
          className={`scroll-smooth bg-neutral-50 dark:bg-neutral-950 font-sans text-neutral-900 dark:text-neutral-300 selection:bg-purple-400 selection:text-white dark:selection:bg-purple-700 dark:selection:text-white ${inter.variable} ${poppins.variable} ${firaCode.variable}`}
        >
          <div className="relative">
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
