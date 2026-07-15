import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ArticleHeading } from "@/lib/portfolio/headings";
import { extractArticleHeadings } from "@/lib/portfolio/headings";
import { BrandMark } from "../../_components/field-notes/BrandMark";
import { SiteNav } from "../../_components/field-notes/SiteNav";
import MarkdownRenderer from "../../_components/markdowmRender";
import { getAllBlogs, getBlogBySlug, getRelatedBlogs } from "../../_hooks/blog";

const siteUrl = "https://aryateja.com";

type BlogPostPageProps = {
	params: Promise<{ slug: string }>;
};

function HeadingLinks({ headings }: { headings: ArticleHeading[] }) {
	return (
		<ol className="space-y-3 border-l border-[#c7baa5] pl-4">
			{headings.map((heading) => (
				<li key={heading.id}>
					<a
						href={`#${heading.id}`}
						className="block text-sm leading-5 text-[#6f665b] transition-colors hover:text-[#171512] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb]"
					>
						{heading.title}
					</a>
				</li>
			))}
		</ol>
	);
}

export function generateStaticParams() {
	return getAllBlogs().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
	params,
}: BlogPostPageProps): Promise<Metadata> {
	const { slug } = await params;
	const post = getBlogBySlug(slug);

	if (!post) {
		return { title: "Writing" };
	}

	const canonicalUrl = `${siteUrl}/blog/${post.slug}`;
	const imageUrl = new URL(post.coverImage, siteUrl).toString();

	return {
		title: post.title,
		description: post.description,
		keywords: post.tags,
		alternates: { canonical: canonicalUrl },
		openGraph: {
			type: "article",
			url: canonicalUrl,
			title: post.title,
			description: post.description,
			publishedTime: post.date,
			authors: ["Arya Teja Rudraraju"],
			tags: post.tags,
			images: [{ url: imageUrl, alt: post.title }],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.description,
			images: [imageUrl],
		},
	};
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params;
	const post = getBlogBySlug(slug);

	if (!post) {
		notFound();
	}

	const relatedPosts = getRelatedBlogs(post.id);
	const headings = extractArticleHeadings(post.content).filter(
		(heading) => heading.level === 2,
	);
	const canonicalUrl = `${siteUrl}/blog/${post.slug}`;
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.description,
		image: new URL(post.coverImage, siteUrl).toString(),
		datePublished: post.date,
		dateModified: post.date,
		articleSection: post.category,
		keywords: post.tags.join(", "),
		mainEntityOfPage: canonicalUrl,
		author: {
			"@type": "Person",
			"@id": `${siteUrl}/#person`,
			name: "Arya Teja Rudraraju",
			url: siteUrl,
			sameAs: [
				"https://linkedin.com/in/arya-teja-rudraraju",
				"https://github.com/aryateja2106",
				"https://x.com/r_aryateja",
			],
		},
	};

	return (
		<>
			<a
				href="#main-content"
				className="sr-only z-[60] bg-[#2563eb] px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
			>
				Skip to article
			</a>
			<SiteNav />
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: Static JSON-LD generated from local blog data.
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<main
				id="main-content"
				className="min-h-screen bg-[#12110f] text-[#f7f2e8]"
			>
				<article>
					<header className="mx-auto w-full max-w-6xl px-5 pt-36 pb-16 md:px-8 md:pt-44 md:pb-20">
						<Link
							href="/blog"
							className="mb-12 inline-flex min-h-11 items-center font-mono text-[10px] uppercase tracking-[0.2em] text-[#b9b0a2] underline decoration-[#f7f2e8]/25 underline-offset-8 transition-colors hover:text-[#f7f2e8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b8ef36]"
						>
							Back to all writing
						</Link>

						<div className="grid gap-10 lg:grid-cols-[1fr_17rem] lg:items-end">
							<div>
								<div className="mb-5 inline-block border border-[#f7f2e8]/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#d8d0c3]">
									{post.category}
								</div>
								<h1 className="max-w-4xl font-serif text-[clamp(46px,8vw,88px)] leading-[0.94] tracking-[-0.045em]">
									{post.title}
								</h1>
							</div>

							<div className="border-t border-[#f7f2e8]/15 pt-5 lg:border-t-0 lg:border-l lg:pl-6">
								<div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#b9b0a2]">
									<time dateTime={post.date}>{post.formattedDate}</time>
									<span aria-hidden="true">/</span>
									<span>{post.readTime}</span>
								</div>
								<div className="mt-5 flex items-center border-t border-[#f7f2e8]/15 pt-5">
									<div className="mr-3 size-10 overflow-hidden border border-[#f7f2e8]/15 bg-black">
										<BrandMark className="size-full" />
									</div>
									<div>
										<p className="text-sm font-medium">{post.author.name}</p>
										<p className="text-xs text-[#b9b0a2]">{post.author.bio}</p>
									</div>
								</div>
							</div>
						</div>

						<div className="mt-10 flex flex-wrap gap-2">
							{post.tags.map((tag) => (
								<span
									key={tag}
									className="border border-[#f7f2e8]/15 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#b9b0a2]"
								>
									#{tag}
								</span>
							))}
						</div>

						<div className="relative mt-10 h-64 w-full overflow-hidden border-2 border-[#f2ecdf] bg-[#1c1a17] shadow-[8px_8px_0_#2563eb] md:h-[34rem]">
							<Image
								src={post.coverImage}
								alt={post.title}
								fill
								sizes="(max-width: 768px) 100vw, 1152px"
								preload
								className="object-cover"
							/>
						</div>
					</header>

					<div className="bg-[#f2ecdf] text-[#37322c]">
						<div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[13rem_minmax(0,48rem)] lg:justify-center lg:gap-16 lg:py-24">
							{headings.length > 0 ? (
								<aside
									className="hidden lg:block"
									aria-label="Article contents"
								>
									<div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
										<p className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6f665b]">
											On this page
										</p>
										<HeadingLinks headings={headings} />
									</div>
								</aside>
							) : null}

							<div className="min-w-0">
								{headings.length > 0 ? (
									<details className="mb-10 border-y border-[#c7baa5] py-4 lg:hidden">
										<summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.18em] text-[#51493f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb]">
											On this page
										</summary>
										<nav className="mt-5" aria-label="Article contents">
											<HeadingLinks headings={headings} />
										</nav>
									</details>
								) : null}

								{post.executiveSummary || post.agentNavigation ? (
									<section
										className="mb-14 border-2 border-[#171512] bg-[#ded4c3] p-5 shadow-[5px_5px_0_#171512] sm:p-6"
										aria-labelledby="article-brief"
									>
										<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6f665b]">
											Reader and agent brief
										</p>
										<h2
											id="article-brief"
											className="mt-3 font-serif text-2xl leading-tight text-[#171512]"
										>
											{post.executiveSummary ?? "Use this note for:"}
										</h2>
										{post.agentNavigation ? (
											<>
												<ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-6">
													{post.agentNavigation.useFor.map((item) => (
														<li key={item}>{item}</li>
													))}
												</ul>
												<a
													href={post.agentNavigation.startAt}
													className="mt-6 inline-flex min-h-11 items-center font-mono text-[10px] uppercase tracking-[0.18em] text-[#171512] underline decoration-2 underline-offset-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb]"
												>
													Jump to the recommended section
												</a>
											</>
										) : null}
									</section>
								) : null}

								{post.guide ? (
									<section
										className="mb-16 border-y border-[#c7baa5] py-8"
										aria-labelledby="guide-brief"
									>
										<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6f665b]">
											Implementation brief
										</p>
										<h2
											id="guide-brief"
											className="mt-3 scroll-mt-28 font-serif text-3xl leading-tight text-[#171512]"
										>
											{post.guide.purpose}
										</h2>

										<div className="mt-8 grid gap-8 md:grid-cols-2">
											<div>
												<h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6f665b]">
													Who this is for
												</h3>
												<ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
													{post.guide.audience.map((item) => (
														<li key={item}>{item}</li>
													))}
												</ul>
											</div>
											<div>
												<h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6f665b]">
													What you will finish with
												</h3>
												<ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
													{post.guide.outcomes.map((item) => (
														<li key={item}>{item}</li>
													))}
												</ul>
											</div>
										</div>

										<p className="mt-8 border-t border-[#c7baa5] pt-5 font-mono text-[10px] uppercase leading-5 tracking-[0.14em] text-[#6f665b]">
											Prerequisites: {post.guide.prerequisites.join(" · ")}
											<br />
											Commands and claims verified: {post.guide.verifiedAt}
										</p>
									</section>
								) : null}

								<MarkdownRenderer
									content={post.content}
									className="prose-headings:font-serif prose-headings:text-[#171512] prose-p:text-[#37322c] prose-strong:text-[#171512] prose-li:text-[#37322c]"
								/>
							</div>
						</div>
					</div>
				</article>

				{relatedPosts.length > 0 ? (
					<section
						className="border-t border-[#f7f2e8]/15 bg-[#1c1a17] py-16 md:py-20"
						aria-labelledby="related-notes"
					>
						<div className="mx-auto w-full max-w-5xl px-5 md:px-8">
							<div className="mb-8 flex items-center gap-4">
								<h2
									id="related-notes"
									className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b9b0a2]"
								>
									Continue reading
								</h2>
								<span
									className="h-px grow bg-[#f7f2e8]/15"
									aria-hidden="true"
								/>
							</div>

							<div className="grid gap-5 sm:grid-cols-2">
								{relatedPosts.slice(0, 2).map((relatedPost) => (
									<Link
										key={relatedPost.id}
										href={`/blog/${relatedPost.slug}`}
										className="group border border-[#f7f2e8]/15 p-5 transition-colors hover:border-[#f7f2e8]/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b8ef36]"
									>
										<p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#b9b0a2]">
											{relatedPost.category}
										</p>
										<h3 className="mt-5 font-serif text-2xl leading-tight text-[#f7f2e8] group-hover:text-white md:text-3xl">
											{relatedPost.title}
										</h3>
										<time
											dateTime={relatedPost.date}
											className="mt-6 block font-mono text-[10px] uppercase tracking-[0.16em] text-[#b9b0a2]"
										>
											{relatedPost.formattedDate}
										</time>
									</Link>
								))}
							</div>
						</div>
					</section>
				) : null}
			</main>
		</>
	);
}
