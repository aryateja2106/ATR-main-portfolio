"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { BlogSummary } from "@/lib/types";

interface BlogListProps {
	initialBlogs: BlogSummary[];
	allCategories: string[];
}

export function BlogList({ initialBlogs, allCategories }: BlogListProps) {
	const [blogs, setBlogs] = useState<BlogSummary[]>(initialBlogs);
	const [activeCategory, setActiveCategory] = useState("all");

	const handleCategoryFilter = (category: string) => {
		setActiveCategory(category);
		if (category === "all") {
			setBlogs(initialBlogs);
		} else {
			const filtered = initialBlogs.filter(
				(blog) => blog.category === category,
			);
			setBlogs(filtered);
		}
	};

	return (
		<div className="w-full">
			<div
				className="flex flex-wrap gap-3 mb-10"
				role="tablist"
				aria-label="Blog categories"
			>
				<button
					type="button"
					role="tab"
					aria-controls="blog-posts"
					id="tab-all"
					className={`rounded-sm border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
						activeCategory === "all"
							? "border-[#f7f2e8] bg-[#f7f2e8] text-[#12110f]"
							: "border-[#f7f2e8]/15 text-[#b9b0a2] hover:border-[#f7f2e8]/50 hover:text-[#f7f2e8]"
					}`}
					onClick={() => handleCategoryFilter("all")}
				>
					All
				</button>

				{allCategories.map((category) => (
					<button
						key={category}
						type="button"
						role="tab"
						aria-controls="blog-posts"
						id={`tab-${category.toLowerCase().replace(/\s+/g, "-")}`}
						className={`rounded-sm border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
							activeCategory === category
								? "border-[#f7f2e8] bg-[#f7f2e8] text-[#12110f]"
								: "border-[#f7f2e8]/15 text-[#b9b0a2] hover:border-[#f7f2e8]/50 hover:text-[#f7f2e8]"
						}`}
						onClick={() => handleCategoryFilter(category)}
					>
						{category}
					</button>
				))}
			</div>

			{/* Empty state */}
			{blogs.length === 0 && (
				<div className="text-center py-20">
					<p className="text-[#b9b0a2] mb-4">
						No blog posts found in this category.
					</p>
					<button
						type="button"
						onClick={() => handleCategoryFilter("all")}
						className="rounded-sm bg-[#f7f2e8] px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-[#12110f] transition-colors hover:bg-white"
					>
						View All Posts
					</button>
				</div>
			)}

			{blogs.length > 0 && (
				<div
					id="blog-posts"
					role="tabpanel"
					className="border-t border-[#f7f2e8]/15"
				>
					{blogs.map((post) => (
						<Link
							href={`/blog/${post.slug}`}
							key={post.id}
							className="group grid gap-6 border-b border-[#f7f2e8]/15 py-8 transition-colors md:grid-cols-[1fr_220px] md:items-center"
						>
							<div className="min-w-0 md:pr-8">
								<div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#b9b0a2]">
									<span className="border border-[#f7f2e8]/20 px-2 py-1 text-[#f7f2e8]">
										{post.category}
									</span>
									<span>{post.formattedDate}</span>
									<span aria-hidden="true">/</span>
									<span>{post.readTime}</span>
								</div>

								<h2 className="max-w-2xl font-serif text-3xl leading-tight text-[#f7f2e8] transition-colors group-hover:text-white md:text-4xl">
									{post.title}
								</h2>

								<p className="mt-4 max-w-2xl text-base leading-7 text-[#d8d0c3]/75">
									{post.excerpt}
								</p>

								<div className="mt-5 flex items-center font-mono text-[11px] uppercase tracking-[0.18em] text-[#f7f2e8]">
									Read guide
									<svg
										className="ml-2 size-4 transition-transform group-hover:translate-x-1"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<title>Arrow right</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M14 5l7 7m0 0l-7 7m7-7H3"
										/>
									</svg>
								</div>
							</div>

							<div className="relative aspect-[16/10] w-full overflow-hidden border border-[#f7f2e8]/15 bg-[#1c1a17] md:order-last">
								{post.coverImage ? (
									<div className="relative size-full">
										<Image
											src={post.coverImage}
											alt={`Cover image for ${post.title}`}
											fill
											className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
											sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
											loading={
												Number.parseInt(post.id, 10) <= 4 ? "eager" : "lazy"
											}
										/>
									</div>
								) : (
									<div className="absolute inset-0 bg-[#12110f] flex items-center justify-center">
										<div className="font-mono text-xs uppercase tracking-[0.18em] text-[#b9b0a2]">
											Source note
										</div>
									</div>
								)}
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
