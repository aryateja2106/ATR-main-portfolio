import { OG_CONTENT_TYPE, OG_SIZE, renderBlogOgImage } from "@/lib/og/render";
import { getBlogBySlug } from "../../_hooks/blog";

export const runtime = "edge";
export const alt = "Blog post by Arya Teja Rudraraju";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

type RouteParams = { slug: string };

export default async function Image({
	params,
}: {
	params: Promise<RouteParams>;
}) {
	const { slug } = await params;
	const post = getBlogBySlug(slug);
	return renderBlogOgImage(post);
}
