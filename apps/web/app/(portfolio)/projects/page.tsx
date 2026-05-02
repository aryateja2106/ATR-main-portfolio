import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjects } from "@/lib/portfolio/projects";
import { SITE_AUTHOR, SITE_NAME, SITE_URL } from "@/lib/portfolio/site";
import {
	DEFAULT_OG_IMAGES,
	DEFAULT_TWITTER_IMAGES,
} from "@/lib/portfolio/social-image";

// `Header` and outer `<main>` come from (portfolio)/layout.tsx — pages here render only their own content.

const PAGE_TITLE = "Projects";
const PAGE_DESCRIPTION =
	"Open-source AI projects and product experiments by Arya Teja Rudraraju — including LeSearch AI, mconnect, Local SQL Agent, NVIDIA Dynamo experiments, and more.";

export const metadata: Metadata = {
	title: PAGE_TITLE,
	description: PAGE_DESCRIPTION,
	alternates: { canonical: "/projects" },
	openGraph: {
		title: `${PAGE_TITLE} • ${SITE_NAME}`,
		description: PAGE_DESCRIPTION,
		url: `${SITE_URL}/projects`,
		type: "website",
		images: DEFAULT_OG_IMAGES,
	},
	twitter: {
		card: "summary_large_image",
		title: `${PAGE_TITLE} • ${SITE_NAME}`,
		description: PAGE_DESCRIPTION,
		images: DEFAULT_TWITTER_IMAGES,
	},
};

export default function ProjectsIndexPage() {
	const all = getAllProjects();
	const breadcrumbJsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: SITE_URL,
			},
			{
				"@type": "ListItem",
				position: 2,
				name: "Projects",
				item: `${SITE_URL}/projects`,
			},
		],
	};

	const itemListJsonLd = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: `${SITE_AUTHOR.name} — Projects`,
		itemListElement: all.map((project, idx) => ({
			"@type": "ListItem",
			position: idx + 1,
			url: `${SITE_URL}/projects/${project.slug}`,
			name: project.title,
		})),
	};

	return (
		<>
			<script
				id="breadcrumb-projects"
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be inline server-rendered for crawlers/AEO.
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<script
				id="itemlist-projects"
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be inline server-rendered for crawlers/AEO.
				dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
			/>
			<div className="flex min-h-screen flex-col items-center justify-between">
				<div className="w-full px-4 max-w-5xl mx-auto pt-32 pb-20">
					<header className="mb-12">
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							Projects & Contributions
						</h1>
						<p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-3xl">
							A growing portfolio of AI products, open-source tools, and
							experiments — focused on agentic systems, LLM reasoning, and
							developer ergonomics. Each card links to a deep-dive with the
							problem, approach, and outcomes.
						</p>
					</header>

					<ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{all.map((project) => (
							<li
								key={project.slug}
								className="group rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-teal-500/60 transition-colors overflow-hidden"
							>
								<Link
									href={`/projects/${project.slug}`}
									className="block p-6 h-full"
								>
									<div className="flex items-start justify-between gap-3 mb-3">
										<h2 className="text-xl font-semibold group-hover:text-teal-400 transition-colors">
											{project.title}
										</h2>
										<span className="shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-teal-400/10 text-teal-400 border border-teal-400/20">
											{project.status}
										</span>
									</div>
									<p className="text-sm text-neutral-400 mb-4 line-clamp-3">
										{project.shortDescription}
									</p>
									<div className="flex flex-wrap gap-1.5">
										{project.techStack.slice(0, 5).map((tech) => (
											<span
												key={tech}
												className="text-xs px-2 py-0.5 rounded border border-neutral-700 text-neutral-400"
											>
												{tech}
											</span>
										))}
									</div>
								</Link>
							</li>
						))}
					</ul>

					<aside className="mt-16 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
						<h2 className="text-xl font-semibold mb-2">
							Want context on the person, not just the projects?
						</h2>
						<p className="text-sm text-neutral-400 mb-4">
							Read the long-form bio, browse the FAQ, or check what is currently
							shipping on the Now page.
						</p>
						<div className="flex flex-wrap gap-3 text-sm">
							<Link href="/about" className="text-teal-400 hover:underline">
								/about →
							</Link>
							<Link href="/now" className="text-teal-400 hover:underline">
								/now →
							</Link>
							<Link href="/faq" className="text-teal-400 hover:underline">
								/faq →
							</Link>
						</div>
					</aside>
				</div>
			</div>
		</>
	);
}
