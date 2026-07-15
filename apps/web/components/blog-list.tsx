import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";

interface BlogListProps {
	initialBlogs: BlogPost[];
}

function PostMeta({
	post,
	light = false,
}: {
	post: BlogPost;
	light?: boolean;
}) {
	return (
		<div
			className={`flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] ${
				light ? "text-[#6f665b]" : "text-[#b9b0a2]"
			}`}
		>
			<span
				className={`border px-2 py-1 ${
					light
						? "border-[#171512]/20 text-[#171512]"
						: "border-[#f7f2e8]/20 text-[#f7f2e8]"
				}`}
			>
				{post.category}
			</span>
			<time dateTime={post.date}>{post.formattedDate}</time>
			<span aria-hidden="true">/</span>
			<span>{post.readTime}</span>
		</div>
	);
}

export function BlogList({ initialBlogs }: BlogListProps) {
	const [featuredPost, ...archivePosts] = initialBlogs;

	if (!featuredPost) {
		return (
			<p className="border-y border-[#f7f2e8]/15 py-10 text-[#b9b0a2]">
				The next field note is in progress.
			</p>
		);
	}

	return (
		<div className="w-full">
			<section aria-labelledby="featured-note">
				<div className="mb-5 flex items-center justify-between gap-4">
					<h2
						id="featured-note"
						className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b9b0a2]"
					>
						Latest field note
					</h2>
					<span className="h-px grow bg-[#f7f2e8]/15" aria-hidden="true" />
				</div>

				<article className="overflow-hidden border-2 border-[#f2ecdf] bg-[#f2ecdf] text-[#171512] shadow-[8px_8px_0_#2563eb]">
					<Link
						href={`/blog/${featuredPost.slug}`}
						className="group grid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b8ef36] md:grid-cols-[1.08fr_0.92fr]"
					>
						<div className="flex min-h-[350px] flex-col p-6 sm:p-8 md:p-10">
							<PostMeta post={featuredPost} light />
							<h3 className="mt-10 max-w-2xl font-serif text-[clamp(38px,6vw,64px)] leading-[0.98] tracking-[-0.035em]">
								{featuredPost.title}
							</h3>
							<p className="mt-6 max-w-xl text-base leading-7 text-[#51493f]">
								{featuredPost.excerpt}
							</p>
							<span className="mt-auto pt-10 font-mono text-[10px] uppercase tracking-[0.18em] underline decoration-2 underline-offset-8">
								Open the note
							</span>
						</div>

						<div className="relative min-h-64 overflow-hidden border-t-2 border-[#171512] bg-[#1c1a17] md:min-h-full md:border-t-0 md:border-l-2">
							<Image
								src={featuredPost.coverImage}
								alt=""
								fill
								preload
								className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
								sizes="(max-width: 768px) 100vw, 45vw"
							/>
						</div>
					</Link>
				</article>
			</section>

			{archivePosts.length > 0 ? (
				<section className="mt-20" aria-labelledby="archive-notes">
					<div className="mb-5 flex items-center gap-4">
						<h2
							id="archive-notes"
							className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b9b0a2]"
						>
							Archive
						</h2>
						<span className="h-px grow bg-[#f7f2e8]/15" aria-hidden="true" />
					</div>

					<ol className="border-t border-[#f7f2e8]/15">
						{archivePosts.map((post, index) => (
							<li key={post.id}>
								<article>
									<Link
										href={`/blog/${post.slug}`}
										className="group grid gap-6 border-b border-[#f7f2e8]/15 py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b8ef36] sm:grid-cols-[1fr_9rem] sm:items-center md:grid-cols-[3rem_1fr_12rem]"
									>
										<span
											aria-hidden="true"
											className="hidden font-mono text-[10px] text-[#706a61] md:block"
										>
											{String(index + 1).padStart(2, "0")}
										</span>
										<div className="min-w-0">
											<PostMeta post={post} />
											<h3 className="mt-4 max-w-2xl font-serif text-3xl leading-tight text-[#f7f2e8] transition-colors group-hover:text-white md:text-4xl">
												{post.title}
											</h3>
											<p className="mt-4 max-w-2xl text-sm leading-6 text-[#d8d0c3]/75 md:text-base md:leading-7">
												{post.excerpt}
											</p>
										</div>
										<div className="relative order-first aspect-[16/10] overflow-hidden border border-[#f7f2e8]/15 bg-[#1c1a17] sm:order-last sm:aspect-square md:aspect-[4/3]">
											<Image
												src={post.coverImage}
												alt=""
												fill
												className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
												sizes="(max-width: 640px) 100vw, 192px"
											/>
										</div>
									</Link>
								</article>
							</li>
						))}
					</ol>
				</section>
			) : null}
		</div>
	);
}
