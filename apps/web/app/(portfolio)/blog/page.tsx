import type { Metadata } from "next";
import { BlogList } from "@/components/blog-list";
import { SITE_URL, TWITTER_HANDLE } from "@/lib/seo";
import { SiteNav } from "../_components/field-notes";
import { getAllCategories, getBlogSummaries } from "../_hooks/blog";

export const metadata: Metadata = {
	title: "Writing",
	description:
		"Field notes on secure AI agents, local-first systems, open-source tools, and business-first implementation.",
	alternates: {
		canonical: `${SITE_URL}/blog`,
		types: {
			"application/rss+xml": `${SITE_URL}/feed.xml`,
		},
	},
	openGraph: {
		title: "Writing | Arya Teja Rudraraju",
		description:
			"Field notes on secure AI agents, local-first systems, open-source tools, and business-first implementation.",
		type: "website",
		url: `${SITE_URL}/blog`,
		siteName: "Arya Teja Rudraraju",
		images: [
			{
				url: "/real-images/yc-robo-hk-solo.jpeg",
				alt: "Arya Teja Rudraraju at YC Robo in Hong Kong",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Writing | Arya Teja Rudraraju",
		description:
			"Field notes on secure AI agents, local-first systems, open-source tools, and business-first implementation.",
		site: TWITTER_HANDLE,
		creator: TWITTER_HANDLE,
		images: ["/real-images/yc-robo-hk-solo.jpeg"],
	},
};

export default function BlogsPage() {
	const allBlogs = getBlogSummaries();
	const allCategories = getAllCategories();

	return (
		<main className="min-h-screen bg-[#12110f] text-[#f7f2e8]">
			<SiteNav />

			<div className="w-full px-5 max-w-5xl mx-auto pt-36 pb-24 md:px-8">
				<div className="mb-10">
					<p className="font-mono text-xs uppercase tracking-[0.24em] text-[#b9b0a2]">
						Practical implementation guides
					</p>
					<h1 className="mt-3 font-serif text-[clamp(44px,8vw,92px)] leading-none">
						Writing
					</h1>
					<p className="mt-6 max-w-2xl text-lg leading-8 text-[#d8d0c3]/80">
						Detailed guides for engineers and founders. Each article explains
						the problem, who it is for, the architecture, exact commands,
						security boundaries, and how to verify the result.
					</p>
				</div>

				<BlogList initialBlogs={allBlogs} allCategories={allCategories} />
			</div>
		</main>
	);
}
