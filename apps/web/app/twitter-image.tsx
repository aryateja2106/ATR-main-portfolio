import { OG_CONTENT_TYPE, OG_SIZE, renderHomeOgImage } from "@/lib/og/render";

export const runtime = "edge";
export const alt =
	"Arya Teja Rudraraju · Agentic Engineer · Founder, LeSearch AI + CloudAGI · Building LeCoder MConnect · San Francisco";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
	return renderHomeOgImage();
}
