"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";
import MarkdownRenderer from "../../_components/markdowmRender";

type BlogPostClientProps = {
	post: BlogPost;
	relatedPosts: BlogPost[];
};

// Treat cover image paths as missing if they point at known-not-yet-shipped
// /assets/* placeholders. We render a graceful fallback instead of broken <Image>.
function isRenderableCover(
	coverImage: string | undefined,
): coverImage is string {
	if (!coverImage) return false;
	if (coverImage.startsWith("/assets/")) return false;
	return true;
}

export function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
	const renderableCover = isRenderableCover(post.coverImage)
		? post.coverImage
		: null;

	return (
		<div className="flex min-h-screen flex-col items-center justify-between">
			<article className="w-full px-4 max-w-4xl mx-auto pt-32 pb-20">
				<Link
					href="/blog"
					className="inline-flex items-center text-neutral-600 dark:text-neutral-400 hover:text-teal-500 dark:hover:text-teal-500 mb-8"
				>
					<svg
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						className="size-4 mr-2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
					Back to all blogs
				</Link>

				<div className="mb-8">
					<div className="inline-block bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full px-3 py-1 text-sm mb-4">
						{post.category}
					</div>

					<h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

					<div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 mb-6">
						<span>{post.formattedDate}</span>
						<span className="mx-2">•</span>
						<span>{post.readTime}</span>
					</div>

					<div className="flex flex-wrap gap-2 mb-6">
						{post.tags.map((tag) => (
							<Link
								href={`/blog/tag/${encodeURIComponent(tag)}`}
								key={tag}
								className="text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2 py-1 rounded-md hover:bg-teal-100 dark:hover:bg-teal-900 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
							>
								#{tag}
							</Link>
						))}
					</div>

					<div className="flex items-center py-6 border-y border-neutral-200 dark:border-neutral-800">
						<div className="size-12 relative mr-4 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
							<div className="size-full flex items-center justify-center text-xs text-neutral-500">
								ATR
							</div>
						</div>
						<div>
							<div className="font-medium">{post.author.name}</div>
							<div className="text-sm text-neutral-500 dark:text-neutral-400">
								{post.author.bio}
							</div>
						</div>
					</div>
				</div>

				{renderableCover ? (
					<div className="relative w-full h-64 md:h-96 bg-neutral-800 overflow-hidden rounded-lg mb-8">
						<Image
							src={renderableCover}
							alt={post.title}
							fill
							sizes="(max-width: 768px) 100vw, 896px"
							className="object-cover opacity-70"
						/>
					</div>
				) : (
					<div className="w-full h-64 md:h-96 bg-gradient-to-br from-teal-500/20 via-neutral-100 to-neutral-200 dark:from-teal-500/10 dark:via-neutral-900 dark:to-neutral-800 rounded-lg mb-8 overflow-hidden">
						<div className="size-full flex items-center justify-center text-neutral-400 text-6xl font-bold">
							{post.category.charAt(0).toUpperCase()}
						</div>
					</div>
				)}

				<MarkdownRenderer content={post.content} />

				<aside className="mt-12 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 p-6">
					<div className="flex flex-col md:flex-row gap-4 md:items-start">
						<div className="flex-shrink-0">
							<div className="size-14 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-500 font-bold">
								ATR
							</div>
						</div>
						<div className="flex-1">
							<div className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
								About the author
							</div>
							<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
								{post.author.name} is an Agentic Engineer in San Francisco.
								Founder of LeSearch AI and CloudAGI. Building LeCoder MConnect,
								an open-source mobile control layer for AI coding agents.
							</p>
							<div className="flex flex-wrap gap-3 text-sm">
								<Link href="/about" className="text-teal-500 hover:underline">
									More about Arya →
								</Link>
								<Link href="/now" className="text-teal-500 hover:underline">
									What Arya is building now →
								</Link>
								<Link href="/faq" className="text-teal-500 hover:underline">
									FAQ →
								</Link>
							</div>
						</div>
					</div>
				</aside>
			</article>

			{relatedPosts.length > 0 && (
				<section
					aria-label="Related articles"
					className="w-full bg-neutral-50 dark:bg-neutral-900 py-16"
				>
					<div className="w-full px-4 max-w-4xl mx-auto">
						<h2 className="text-2xl font-bold mb-8">Related Articles</h2>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{relatedPosts.slice(0, 3).map((relatedPost) => {
								const relatedCover = isRenderableCover(relatedPost.coverImage)
									? relatedPost.coverImage
									: null;
								return (
									<Link
										key={relatedPost.id}
										href={`/blog/${relatedPost.slug}`}
										className="group"
									>
										<div className="relative h-40 bg-neutral-200 dark:bg-neutral-800 rounded-lg mb-4 overflow-hidden">
											{relatedCover ? (
												<Image
													className="size-full object-cover"
													src={relatedCover}
													alt={relatedPost.title}
													fill
													sizes="(max-width: 768px) 100vw, 33vw"
												/>
											) : (
												<div className="size-full flex items-center justify-center text-neutral-400 text-3xl font-bold bg-gradient-to-br from-teal-500/20 to-neutral-300 dark:to-neutral-900">
													{relatedPost.category.charAt(0).toUpperCase()}
												</div>
											)}
										</div>
										<h3 className="font-medium group-hover:text-teal-500 transition-colors mb-1">
											{relatedPost.title}
										</h3>
										<div className="text-sm text-neutral-500 dark:text-neutral-400">
											{relatedPost.formattedDate}
										</div>
									</Link>
								);
							})}
						</div>
					</div>
				</section>
			)}
		</div>
	);
}
