import type { Metadata } from "next";
import { BlogList } from "@/components/blog-list";
import { SiteNav } from "../_components/field-notes/SiteNav";
import { getAllBlogs, sortBlogsByDate } from "../_hooks/blog";

export const metadata: Metadata = {
	title: "Writing",
	description:
		"Field notes on secure AI agents, local-first systems, open-source tools, and business-first implementation.",
	alternates: {
		canonical: "/blog",
	},
	openGraph: {
		title: "Writing | Arya Teja Rudraraju",
		description:
			"Field notes on secure AI agents, local-first systems, open-source tools, and business-first implementation.",
		type: "website",
		url: "https://aryateja.com/blog",
		images: [
			{
				url: "/aryateja-og.webp",
				alt: "Arya Teja Rudraraju's field notes on applied AI systems",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Writing | Arya Teja Rudraraju",
		description:
			"Field notes on secure AI agents, local-first systems, open-source tools, and business-first implementation.",
		images: ["/aryateja-og.webp"],
	},
};

export default function BlogsPage() {
	const allBlogs = sortBlogsByDate(getAllBlogs());

	return (
		<>
			<a
				href="#main-content"
				className="sr-only z-[60] bg-[#2563eb] px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
			>
				Skip to writing
			</a>
			<SiteNav />

			<main
				id="main-content"
				className="min-h-screen bg-[#12110f] text-[#f7f2e8]"
			>
				<div className="mx-auto w-full max-w-6xl px-5 pt-36 pb-24 md:px-8 md:pt-44">
					<header className="mb-16 grid gap-8 border-b border-[#f7f2e8]/15 pb-12 md:grid-cols-[1fr_18rem] md:items-end md:pb-16">
						<div>
							<p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#b9b0a2]">
								Field journal · Applied AI in practice
							</p>
							<h1 className="mt-5 max-w-4xl font-serif text-[clamp(54px,10vw,112px)] leading-[0.88] tracking-[-0.055em]">
								Notes from the work.
							</h1>
						</div>
						<p className="max-w-xl text-base leading-7 text-[#d8d0c3]/75 md:text-sm md:leading-6">
							Practical notes for founders and builders. Each article starts
							with a workflow problem, keeps evidence visible, and states the
							tradeoffs plainly.
						</p>
					</header>

					<BlogList initialBlogs={allBlogs} />
				</div>
			</main>
		</>
	);
}
