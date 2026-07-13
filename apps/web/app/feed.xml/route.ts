import { getAllBlogs, sortBlogsByDate } from "@/app/(portfolio)/_hooks/blog";
import { renderFeed } from "@/lib/seo";

export function GET() {
	return new Response(renderFeed(sortBlogsByDate(getAllBlogs())), {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
		},
	});
}
