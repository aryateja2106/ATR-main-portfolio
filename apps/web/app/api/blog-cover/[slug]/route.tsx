import { ImageResponse } from "next/og";
import { getBlogBySlug } from "@/app/(portfolio)/_hooks/blog";

export const size = { width: 1200, height: 630 };

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ slug: string }> },
) {
	const { slug } = await params;
	const post = getBlogBySlug(slug);

	if (!post) {
		return new Response("Not found", { status: 404 });
	}

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				background: "#12110f",
				color: "#f7f2e8",
				padding: "70px 76px",
				border: "12px solid #24211d",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<img
					src={new URL("/brand/a-mark.png", request.url).toString()}
					width="64"
					height="64"
					alt=""
				/>
				<div
					style={{
						fontSize: 22,
						textTransform: "uppercase",
						letterSpacing: 3,
						color: "#b9b0a2",
					}}
				>
					{post.category}
				</div>
			</div>

			<div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
				<div style={{ width: 96, height: 5, background: "#b94436" }} />
				<div
					style={{
						maxWidth: 1040,
						fontSize: 62,
						lineHeight: 1.06,
						fontWeight: 650,
					}}
				>
					{post.title}
				</div>
				<div style={{ fontSize: 24, color: "#b9b0a2" }}>
					aryateja.com/writing
				</div>
			</div>
		</div>,
		size,
	);
}
