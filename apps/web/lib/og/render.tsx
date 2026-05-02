import { ImageResponse } from "next/og";
import { SITE_TAGLINE, SITE_URL } from "@/lib/portfolio/site";
import type { BlogPost } from "@/lib/types";

// next/og ImageResponse requires every <div> with multiple children to
// explicitly set `display: flex` (or `display: none`). Helpers here keep
// the OG and Twitter image variants for each route in lockstep.

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const HOST = new URL(SITE_URL).host;

const baseBackground =
	"linear-gradient(135deg, #060606 0%, #0a1f1a 60%, #052e23 100%)";

export function renderHomeOgImage() {
	return new ImageResponse(
		<div
			style={{
				background: baseBackground,
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: 80,
				fontFamily: "system-ui, sans-serif",
				color: "white",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					color: "#5eead4",
					fontSize: 32,
					letterSpacing: -0.5,
				}}
			>
				<span style={{ display: "flex", fontWeight: 700 }}>ATR</span>
				<span style={{ display: "flex", opacity: 0.8 }}>{HOST}</span>
			</div>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 24,
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						fontSize: 96,
						fontWeight: 800,
						lineHeight: 1.05,
						letterSpacing: -2,
						color: "white",
					}}
				>
					<span style={{ display: "flex" }}>Arya Teja</span>
					<span style={{ display: "flex" }}>Rudraraju</span>
				</div>
				<div
					style={{
						display: "flex",
						fontSize: 38,
						color: "#a3a3a3",
						lineHeight: 1.3,
						maxWidth: 980,
					}}
				>
					{SITE_TAGLINE}
				</div>
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					fontSize: 24,
					color: "#737373",
				}}
			>
				<span style={{ display: "flex" }}>
					LeSearch AI · CloudAGI · LeCoder MConnect
				</span>
				<span style={{ display: "flex" }}>
					San Francisco · Shipping in public
				</span>
			</div>
		</div>,
		{ ...OG_SIZE },
	);
}

export function renderBlogOgImage(post: BlogPost | undefined) {
	const title = post?.title ?? "Blog · Arya Teja Rudraraju";
	const category = post?.category ?? "Blog";
	const date = post?.formattedDate ?? "";
	const readTime = post?.readTime ?? "";
	const titleFontSize = title.length > 60 ? 60 : 78;

	return new ImageResponse(
		<div
			style={{
				background: baseBackground,
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: 80,
				fontFamily: "system-ui, sans-serif",
				color: "white",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					color: "#5eead4",
					fontSize: 28,
				}}
			>
				<span style={{ display: "flex", fontWeight: 700 }}>ATR · BLOG</span>
				<span style={{ display: "flex", opacity: 0.8 }}>{HOST}/blog</span>
			</div>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 28,
				}}
			>
				<div
					style={{
						display: "flex",
						alignSelf: "flex-start",
						padding: "8px 18px",
						border: "1px solid #14b8a6",
						borderRadius: 999,
						color: "#5eead4",
						fontSize: 22,
						textTransform: "uppercase",
						letterSpacing: 2,
					}}
				>
					{category}
				</div>
				<div
					style={{
						display: "flex",
						fontSize: titleFontSize,
						fontWeight: 800,
						lineHeight: 1.08,
						letterSpacing: -1.5,
						color: "white",
						maxWidth: 1040,
					}}
				>
					{title}
				</div>
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					fontSize: 24,
					color: "#a3a3a3",
				}}
			>
				<span style={{ display: "flex" }}>by Arya Teja Rudraraju</span>
				<span style={{ display: "flex" }}>
					{[date, readTime].filter(Boolean).join(" · ")}
				</span>
			</div>
		</div>,
		{ ...OG_SIZE },
	);
}
