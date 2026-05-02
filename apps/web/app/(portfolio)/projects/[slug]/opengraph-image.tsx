import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/portfolio/projects";
import { SITE_AUTHOR } from "@/lib/portfolio/site";

export const alt = "Project deep-dive by Arya Teja Rudraraju";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ProjectOpenGraphImage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const project = getProjectBySlug(slug);
	const title = project?.title ?? "Project";
	const tagline = project?.tagline ?? "";
	const status = project?.status ?? "";
	const tech = project?.techStack?.slice(0, 4).join(" · ") ?? "";

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: "72px",
				background:
					"linear-gradient(135deg, #050505 0%, #0a0a0a 40%, #0f1f1c 100%)",
				color: "#e5e5e5",
				fontFamily:
					"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: 16,
					color: "#2dd4bf",
					fontSize: 24,
					fontWeight: 700,
					letterSpacing: 1.5,
				}}
			>
				<div
					style={{
						width: 12,
						height: 12,
						borderRadius: 999,
						background: "#2dd4bf",
					}}
				/>
				<span>{status ? `${status.toUpperCase()} · PROJECT` : "PROJECT"}</span>
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
						fontSize: 80,
						fontWeight: 800,
						lineHeight: 1.05,
						color: "#fafafa",
						letterSpacing: -1.5,
					}}
				>
					{title}
				</div>
				<div
					style={{
						fontSize: 30,
						color: "#94a3b8",
						lineHeight: 1.3,
						maxWidth: 1050,
					}}
				>
					{tagline}
				</div>
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					fontSize: 22,
					color: "#737373",
				}}
			>
				<div style={{ display: "flex" }}>{tech}</div>
				<div style={{ display: "flex", color: "#2dd4bf" }}>
					{`aryateja.com/projects · ${SITE_AUTHOR.name}`}
				</div>
			</div>
		</div>,
		size,
	);
}
