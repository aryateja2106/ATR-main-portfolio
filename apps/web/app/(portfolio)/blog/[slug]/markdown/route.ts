import { getAllBlogs, getBlogBySlug } from "@/app/(portfolio)/_hooks/blog";
import { renderBlogMarkdown } from "@/lib/seo";

type MarkdownRouteProps = {
	params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
	return getAllBlogs().map((post) => ({ slug: post.slug }));
}

export async function GET(_request: Request, { params }: MarkdownRouteProps) {
	const { slug } = await params;
	const post = getBlogBySlug(slug);

	if (!post) {
		return new Response("Not found", { status: 404 });
	}

	return new Response(renderBlogMarkdown(post), {
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
		},
	});
}
