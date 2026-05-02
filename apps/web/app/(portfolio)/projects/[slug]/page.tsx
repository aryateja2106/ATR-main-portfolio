import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/portfolio/projects";
import { SITE_AUTHOR, SITE_NAME, SITE_URL } from "@/lib/portfolio/site";

type RouteParams = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): RouteParams[] {
	return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<RouteParams>;
}): Promise<Metadata> {
	const { slug } = await params;
	const project = getProjectBySlug(slug);

	if (!project) {
		return {
			title: "Project not found",
			description: "The project you are looking for does not exist.",
			robots: { index: false, follow: false },
		};
	}

	return {
		title: project.title,
		description: project.tagline,
		alternates: { canonical: `/projects/${project.slug}` },
		openGraph: {
			title: `${project.title} • ${SITE_NAME}`,
			description: project.tagline,
			url: `${SITE_URL}/projects/${project.slug}`,
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: `${project.title} • ${SITE_NAME}`,
			description: project.tagline,
			creator: SITE_AUTHOR.twitter,
		},
	};
}

export default async function ProjectDeepDive({
	params,
}: {
	params: Promise<RouteParams>;
}) {
	const { slug } = await params;
	const project = getProjectBySlug(slug);

	if (!project) {
		notFound();
	}

	const projectUrl = `${SITE_URL}/projects/${project.slug}`;

	const softwareJsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: project.title,
		description: project.tagline,
		applicationCategory: project.applicationCategory,
		operatingSystem: "Cross-platform",
		url: projectUrl,
		author: {
			"@type": "Person",
			name: SITE_AUTHOR.name,
			url: SITE_URL,
		},
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
		},
		...(project.githubLink ? { codeRepository: project.githubLink } : {}),
	};

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
			{
				"@type": "ListItem",
				position: 3,
				name: project.title,
				item: projectUrl,
			},
		],
	};

	return (
		<>
			{/* Inline JSON-LD — `next/script` + beforeInteractive is root-layout-only; nesting it breaks Turbopack SSR chunks. */}
			<script
				id={`software-jsonld-${project.slug}`}
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be inline server-rendered for crawlers/AEO.
				dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
			/>
			<script
				id={`breadcrumb-jsonld-${project.slug}`}
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be inline server-rendered for crawlers/AEO.
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<div className="flex min-h-screen flex-col items-center justify-between">
				<article className="w-full px-4 max-w-3xl mx-auto pt-32 pb-20">
					<Link
						href="/projects"
						className="inline-flex items-center text-neutral-600 dark:text-neutral-400 hover:text-teal-500 mb-8 text-sm"
					>
						<svg
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							className="size-4 mr-2"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
						All projects
					</Link>

					<header className="mb-10">
						<div className="flex items-center gap-3 mb-3">
							<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-teal-400/10 text-teal-400 border border-teal-400/20">
								{project.status}
							</span>
							{project.startedAt && (
								<span className="text-xs uppercase tracking-wider text-neutral-500">
									Since {project.startedAt}
								</span>
							)}
						</div>
						<h1 className="text-4xl md:text-5xl font-bold mb-3">
							{project.title}
						</h1>
						<p className="text-lg text-neutral-500 dark:text-neutral-400">
							{project.tagline}
						</p>
					</header>

					<section className="mb-10 prose dark:prose-invert max-w-none">
						<p className="text-base text-neutral-300 leading-relaxed">
							{project.longDescription}
						</p>
					</section>

					<section className="mb-10">
						<h2 className="text-xl font-semibold mb-3">Problem</h2>
						<p className="text-neutral-400 leading-relaxed">
							{project.problem}
						</p>
					</section>

					<section className="mb-10">
						<h2 className="text-xl font-semibold mb-3">Approach</h2>
						<p className="text-neutral-400 leading-relaxed">
							{project.approach}
						</p>
					</section>

					<section className="mb-10">
						<h2 className="text-xl font-semibold mb-3">Outcomes</h2>
						<ul className="list-disc pl-5 text-neutral-400 leading-relaxed space-y-2">
							{project.outcomes.map((outcome) => (
								<li key={outcome}>{outcome}</li>
							))}
						</ul>
					</section>

					<section className="mb-10">
						<h2 className="text-xl font-semibold mb-3">Tech stack</h2>
						<div className="flex flex-wrap gap-2">
							{project.techStack.map((tech) => (
								<span
									key={tech}
									className="text-xs px-2.5 py-1 rounded border border-neutral-700 text-neutral-400"
								>
									{tech}
								</span>
							))}
						</div>
					</section>

					<section className="mb-10">
						<h2 className="text-xl font-semibold mb-3">Links</h2>
						<ul className="flex flex-col gap-2 text-sm">
							{project.githubLink && (
								<li>
									<a
										href={project.githubLink}
										target="_blank"
										rel="noopener noreferrer"
										className="text-teal-400 hover:underline"
									>
										Source code (GitHub) →
									</a>
								</li>
							)}
							{project.liveLink && (
								<li>
									<a
										href={project.liveLink}
										target="_blank"
										rel="noopener noreferrer"
										className="text-teal-400 hover:underline"
									>
										Live demo →
									</a>
								</li>
							)}
							{project.links?.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-teal-400 hover:underline"
									>
										{link.label} →
									</Link>
								</li>
							))}
						</ul>
					</section>

					<aside className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 mt-16">
						<div className="text-sm font-semibold mb-1">About the builder</div>
						<p className="text-sm text-neutral-400 mb-3">
							{SITE_AUTHOR.name} is an Agentic Engineer in San Francisco.
							Founder of LeSearch AI and CloudAGI. Building LeCoder MConnect, an
							open-source mobile control layer for Claude Code, Cursor, and
							OpenCode.
						</p>
						<div className="flex flex-wrap gap-3 text-sm">
							<Link href="/about" className="text-teal-400 hover:underline">
								/about →
							</Link>
							<Link href="/faq" className="text-teal-400 hover:underline">
								/faq →
							</Link>
							<Link href="/projects" className="text-teal-400 hover:underline">
								All projects →
							</Link>
						</div>
					</aside>
				</article>
			</div>
		</>
	);
}
