import type { Metadata } from "next";
import Link from "next/link";
import { BlogList } from "@/components/blog-list";
import { SITE_NAME, SITE_URL } from "@/lib/portfolio/site";
import {
	DEFAULT_OG_IMAGES,
	DEFAULT_TWITTER_IMAGES,
} from "@/lib/portfolio/social-image";
import { getAllBlogs, getAllCategories, sortBlogsByDate } from "../_hooks/blog";

export const metadata: Metadata = {
	title: "Blog",
	description:
		"Essays on AI product management, agentic systems, and the engineering behind them by Arya Teja Rudraraju.",
	alternates: { canonical: "/blog" },
	openGraph: {
		title: `Blog • ${SITE_NAME}`,
		description:
			"Essays on AI product management, agentic systems, and the engineering behind them.",
		url: `${SITE_URL}/blog`,
		type: "website",
		images: DEFAULT_OG_IMAGES,
	},
	twitter: {
		card: "summary_large_image",
		title: `Blog • ${SITE_NAME}`,
		description:
			"Essays on AI product management, agentic systems, and the engineering behind them.",
		images: DEFAULT_TWITTER_IMAGES,
	},
};

export default function BlogsPage() {
	const allBlogs = sortBlogsByDate(getAllBlogs());
	const allCategories = getAllCategories();

	return (
		<div className="w-full px-4 max-w-4xl mx-auto pt-32 pb-20">
			<div className="mb-10">
				<h1 className="text-4xl font-bold mb-4">Blog</h1>
				<p className="text-neutral-500 dark:text-neutral-400">
					Essays on AI product management, agentic systems, and the engineering
					behind them.
				</p>
			</div>

			<BlogList initialBlogs={allBlogs} allCategories={allCategories} />

			<aside className="mt-16 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 p-6">
				<h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
					About the author &amp; FAQs
				</h2>
				<div className="flex flex-wrap gap-3 text-sm">
					<Link
						href="/about"
						className="text-teal-600 dark:text-teal-400 hover:underline"
					>
						Full bio (/about)
					</Link>
					<Link
						href="/faq"
						className="text-teal-600 dark:text-teal-400 hover:underline"
					>
						FAQ (/faq)
					</Link>
					<Link
						href="/now"
						className="text-teal-600 dark:text-teal-400 hover:underline"
					>
						What I&apos;m doing now (/now)
					</Link>
				</div>
			</aside>
		</div>
	);
}
