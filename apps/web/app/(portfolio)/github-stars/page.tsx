import type { Metadata } from "next";
import Link from "next/link";
import { SITE_LINKS, SITE_NAME, SITE_URL } from "@/lib/portfolio/site";
import {
	DEFAULT_OG_IMAGES,
	DEFAULT_TWITTER_IMAGES,
} from "@/lib/portfolio/social-image";

export const metadata: Metadata = {
	title: "/github-stars — bookmarked OSS",
	description:
		"A searchable compilation of repositories Arya Teja Rudraraju has starred on GitHub — tools, frameworks, and reference implementations worth bookmarking.",
	alternates: { canonical: "/github-stars" },
	openGraph: {
		title: `GitHub Stars • ${SITE_NAME}`,
		description:
			"Repos I've starred — interesting tooling and open source worth following.",
		url: `${SITE_URL}/github-stars`,
		type: "website",
		images: DEFAULT_OG_IMAGES,
	},
	twitter: {
		card: "summary_large_image",
		title: `GitHub Stars • ${SITE_NAME}`,
		description:
			"Repos I've starred — interesting tooling and open source worth following.",
		images: DEFAULT_TWITTER_IMAGES,
	},
};

export default function GitHubStarsPage() {
	return (
		<div className="min-h-[100dvh]">
			<div className="mx-auto max-w-4xl px-4 pt-28 pb-4 md:px-0 lg:max-w-5xl">
				<h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 md:text-3xl">
					GitHub stars
				</h1>
				<p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-base">
					A living compilation of repositories I&apos;ve starred — useful OSS,
					developer tools, and projects I bookmark for product and engineering
					work. Everything below is searchable, filterable, and exportable.
				</p>
				<p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500 dark:text-neutral-500 md:text-sm">
					<Link
						href="/github-stars-dashboard.html"
						target="_blank"
						rel="noopener noreferrer"
						className="text-teal-600 underline-offset-4 hover:underline dark:text-teal-400"
					>
						Open dashboard fullscreen
					</Link>
					<span className="hidden sm:inline">·</span>
					<Link
						href={`${SITE_LINKS.github}?tab=stars`}
						target="_blank"
						rel="noopener noreferrer"
						className="text-teal-600 underline-offset-4 hover:underline dark:text-teal-400"
					>
						Stars tab on GitHub
					</Link>
				</p>
				<p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500 dark:text-neutral-500 md:text-sm">
					<Link
						href="/about"
						className="text-teal-600 underline-offset-4 hover:underline dark:text-teal-400"
					>
						/about — long-form bio
					</Link>
					<span className="hidden sm:inline">·</span>
					<Link
						href="/faq"
						className="text-teal-600 underline-offset-4 hover:underline dark:text-teal-400"
					>
						/faq — pre-answered Q&amp;A
					</Link>
				</p>
			</div>
			<div className="mx-auto w-full max-w-[1600px] px-3 pb-20 md:px-6">
				<iframe
					title="GitHub stars dashboard"
					src="/github-stars-dashboard.html"
					className="h-[calc(100dvh-13rem)] w-full rounded-xl border border-neutral-200 bg-neutral-950 dark:border-neutral-800 md:h-[calc(100dvh-14.5rem)]"
				/>
			</div>
		</div>
	);
}
