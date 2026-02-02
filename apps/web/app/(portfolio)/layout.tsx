import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Fira_Code } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import BinaryCursor from './_components/cursor-animation-wrapper';
import { Header } from './_components/header';
import { Footer } from './_components/footer';

export const metadata: Metadata = {
  title: {
    default: 'Arya Teja Rudraraju | AI Product Manager | Building LeSearch AI',
    template: '%s • Arya Teja Rudraraju',
  },
  description:
    'AI Product Manager at Pilvi Systems, actively seeking Associate PM/APM roles. Built LeSearch AI (50+ users), shipped 6 products. Dallas, TX. OPT visa.',
  metadataBase: new URL('https://www.aryateja.com'),
  applicationName: "Arya Teja Rudraraju's Portfolio",
  authors: [
    {
      name: 'Arya Teja Rudraraju',
      url: 'https://linkedin.com/in/arya-teja-rudraraju',
    },
  ],
  category: 'Portfolio Website',
  keywords: [
    'AI Product Manager',
    'Product Manager',
    'APM',
    'Associate Product Manager',
    'LeSearch AI',
    'Pilvi Systems',
    'LLMs',
    'RAG Systems',
    'Machine Learning',
    'Dallas TX',
    'Open to Work',
    'MBA',
  ],
  robots: {
    follow: true,
    index: true,
  },

  alternates: {
    canonical: 'https://aryateja.com',
  },
  openGraph: {
    title: 'Arya Teja Rudraraju | AI Product Manager',
    description:
      'AI Product Manager at Pilvi Systems, actively seeking Associate PM/APM roles. Built LeSearch AI (50+ users), shipped 6 products.',
    siteName: 'Arya Teja Rudraraju',
    type: 'website',
    url: 'https://aryateja.com',
    emails: ['aryateja2106@gmail.com'],
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Arya Teja Rudraraju - AI Product Manager',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    title: 'Arya Teja Rudraraju | AI Product Manager',
    description:
      'AI Product Manager at Pilvi Systems, actively seeking Associate PM/APM roles. Built LeSearch AI (50+ users), shipped 6 products.',
    card: 'summary_large_image',
    images: ['/og-image.png'],
    creator: '@r_aryateja',
  },
};

export const viewport: Viewport = {
  themeColor: '#060606', // Only using dark theme
  colorScheme: 'dark', // Only using dark theme
  width: 'device-width',
  initialScale: 1,
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '900'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fira-code',
  display: 'block',
});

// JSON-LD Structured Data for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Arya Teja Rudraraju',
  url: 'https://aryateja.com',
  image: 'https://aryateja.com/og-image.png',
  jobTitle: 'AI Product Manager',
  worksFor: {
    '@type': 'Organization',
    name: 'Pilvi Systems',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Duquesne University',
  },
  sameAs: [
    'https://linkedin.com/in/arya-teja-rudraraju',
    'https://github.com/aryateja2106',
    'https://x.com/r_aryateja',
  ],
  knowsAbout: [
    'Product Management',
    'Artificial Intelligence',
    'Machine Learning',
    'LLMs',
    'RAG Systems',
    'User Research',
    'Agile/Scrum',
  ],
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-8ELMHNMBW2';

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
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
