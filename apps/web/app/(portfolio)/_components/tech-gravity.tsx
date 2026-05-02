"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface TechItem {
	name: string;
	color: string | null;
	background: string | null;
	slug?: string | null;
	iconUrl?: string | null;
}

const SIMPLE_ICON_OVERRIDES: Record<string, string | null> = {
	CSS3: "css3",
	HTML5: "html5",
	"Node.js": "nodedotjs",
	C: "c",
	"C++": "cplusplus",
	"C#": "csharp",
	".NET": "dotnet",
	GitHub: "github",
	GitLab: "gitlab",
	"Tailwind CSS": "tailwindcss",
	Tailwind: "tailwindcss",
	TailwindCSS: "tailwindcss",
};

const getSimpleIconSlug = (value: string | null | undefined): string | null => {
	if (!value) return null;
	if (Object.hasOwn(SIMPLE_ICON_OVERRIDES, value)) {
		return SIMPLE_ICON_OVERRIDES[value] ?? null;
	}
	return value.toLowerCase().replace(/\s+/g, "");
};

const getIconUrl = (
	slug: string | null,
	color: string | null,
): string | null => {
	if (!slug) return null;
	if (color) {
		return `https://cdn.simpleicons.org/${slug}/${color.replace("#", "")}`;
	}
	return `https://cdn.simpleicons.org/${slug}`;
};

// Static grid replacement for the previous matter-js cursor-attractor.
// Cleaner, faster, mobile-friendly. The hover lift gives the same "alive" feel
// without the physics bundle.
export default function TechGravity({ slugs }: { slugs: TechItem[] }) {
	return (
		<div className="size-full flex flex-wrap items-center justify-center gap-3 p-6">
			{slugs.map((item, index) => {
				const iconSlug = getSimpleIconSlug(item.slug ?? item.name);
				const iconUrl = item.iconUrl ?? getIconUrl(iconSlug, item.color);

				return (
					<motion.div
						// biome-ignore lint/suspicious/noArrayIndexKey: tags are static per tab; name+index is stable enough
						key={`${item.name}-${index}`}
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.35,
							delay: index * 0.04,
							ease: [0.2, 0.65, 0.3, 0.9],
						}}
						whileHover={{ y: -4, scale: 1.05 }}
						className={`flex items-center gap-2 px-3 py-2 rounded-full border border-border shadow-md text-foreground dark:text-muted ${
							item.background ?? "bg-white"
						}`}
					>
						{iconUrl ? (
							<Image
								loader={({ src }) => src}
								src={iconUrl}
								alt={item.name}
								width={20}
								height={20}
								onError={(event) => {
									const target = event.currentTarget;
									if (
										!item.iconUrl &&
										item.color &&
										!target.dataset.fallbackTried
									) {
										target.dataset.fallbackTried = "true";
										const fallbackUrl = getIconUrl(iconSlug, null);
										if (fallbackUrl) {
											target.src = fallbackUrl;
											return;
										}
									}
									target.style.display = "none";
								}}
							/>
						) : null}
						<span className="text-xs font-semibold text-neutral-800">
							{item.name}
						</span>
					</motion.div>
				);
			})}
		</div>
	);
}
