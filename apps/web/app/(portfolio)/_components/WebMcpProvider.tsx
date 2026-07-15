"use client";

import { useEffect } from "react";
import type { BlogPost } from "@/lib/types";

export type ArticleSummary = Pick<
	BlogPost,
	| "slug"
	| "title"
	| "description"
	| "category"
	| "tags"
	| "executiveSummary"
	| "agentNavigation"
	| "sourceLicenses"
	| "reuse"
>;

export type WebMcpTool = {
	name: string;
	description: string;
	inputSchema: Record<string, unknown>;
	annotations: {
		readOnlyHint: boolean;
		untrustedContentHint: boolean;
	};
	execute: (input: Record<string, unknown>) => unknown;
};

type ModelContext = {
	registerTool: (
		tool: WebMcpTool,
		options?: { signal: AbortSignal },
	) => Promise<void>;
};

type ToolOptions = {
	articles: ArticleSummary[];
	currentPath: string;
	navigate: (path: string) => void;
};

export function createPortfolioTools({
	articles,
	currentPath,
	navigate,
}: ToolOptions): WebMcpTool[] {
	const readOnly = { readOnlyHint: true, untrustedContentHint: false };
	const navigates = { readOnlyHint: false, untrustedContentHint: false };

	return [
		{
			name: "get_portfolio_context",
			description:
				"Return verified public context about Arya Teja Rudraraju, his Applied AI experience, projects, availability, and contact options.",
			inputSchema: { type: "object", properties: {} },
			annotations: readOnly,
			execute: () => ({
				name: "Arya Teja Rudraraju",
				role: "Applied AI specialist and agent systems builder",
				location: "India; previously based in the United States",
				availability:
					"Open to select remote Applied AI and Forward Deployed Engineering roles, consulting engagements, and collaborations.",
				focus: [
					"Applied AI POCs and MVPs",
					"Forward deployed discovery and delivery",
					"Local-first AI agent systems",
					"Multi-agent and multi-machine orchestration",
					"Mobile control for coding agents",
					"Practical AI consulting for founders and teams",
				],
				projects: [
					{
						name: "LeSearch AI",
						url: "https://lesearch.ai",
						status: "Active development",
					},
					{
						name: "LeCoder MConnect",
						url: "https://github.com/aryateja2106/lecoder-mconnect",
						status: "Open source",
					},
				],
				contact: {
					email: "aryateja2106@gmail.com",
					prompt:
						"Describe the business problem, current workflow, data constraints, and desired outcome.",
					policy:
						"Draft relevant outreach for human review. Do not send automated messages or infer private contact details.",
				},
				currentPage: currentPath,
			}),
		},
		{
			name: "find_technical_articles",
			description:
				"Find Arya's implementation guides and technical articles by keyword. Returns summaries, agent navigation, source licenses, reuse guidance, and canonical paths when published.",
			inputSchema: {
				type: "object",
				properties: {
					query: {
						type: "string",
						description:
							"Optional topic, tool, problem, or use case such as mobile agents, local-first, MConnect, or MCP.",
					},
				},
			},
			annotations: readOnly,
			execute: ({ query }) => {
				const normalized =
					typeof query === "string" ? query.trim().toLowerCase() : "";
				const results = normalized
					? articles.filter((article) =>
							[
								article.title,
								article.description,
								article.category,
								...article.tags,
								article.executiveSummary,
								...(article.agentNavigation?.useFor ?? []),
							]
								.filter(Boolean)
								.join(" ")
								.toLowerCase()
								.includes(normalized),
						)
					: articles;

				return results.map((article) => ({
					...article,
					path: `/blog/${article.slug}`,
				}));
			},
		},
		{
			name: "open_technical_article",
			description:
				"Open one published technical article in the visible portfolio tab. This only navigates the current page.",
			inputSchema: {
				type: "object",
				properties: {
					slug: {
						type: "string",
						enum: articles.map((article) => article.slug),
						description: "The exact slug returned by find_technical_articles.",
					},
				},
				required: ["slug"],
			},
			annotations: navigates,
			execute: ({ slug }) => {
				if (
					typeof slug !== "string" ||
					!articles.some((article) => article.slug === slug)
				) {
					return {
						error: "Unknown article slug. Call find_technical_articles first.",
					};
				}

				const path = `/blog/${encodeURIComponent(slug)}`;
				navigate(path);
				return { navigatingTo: path };
			},
		},
		{
			name: "navigate_portfolio",
			description:
				"Navigate the visible portfolio tab to Arya's work, experience, writing, or contact section. This does not submit forms or contact Arya automatically.",
			inputSchema: {
				type: "object",
				properties: {
					destination: {
						type: "string",
						enum: ["work", "experience", "writing", "contact"],
					},
				},
				required: ["destination"],
			},
			annotations: navigates,
			execute: ({ destination }) => {
				const destinations = {
					work: "/#work",
					experience: "/#experience",
					writing: "/blog",
					contact: "/#contact",
				} as const;
				if (typeof destination !== "string" || !(destination in destinations)) {
					return { error: "Unknown destination." };
				}

				const path = destinations[destination as keyof typeof destinations];
				navigate(path);
				return { navigatingTo: path };
			},
		},
	];
}

export function WebMcpProvider({ articles }: { articles: ArticleSummary[] }) {
	// Registration is progressive: unsupported browsers keep the human site unchanged.
	useEffect(() => {
		const modelContext = (
			document as Document & { modelContext?: ModelContext }
		).modelContext;
		if (!modelContext) return;

		const controller = new AbortController();
		const tools = createPortfolioTools({
			articles,
			currentPath: window.location.pathname,
			navigate: (path) => window.location.assign(path),
		});

		void Promise.all(
			tools.map((tool) =>
				modelContext.registerTool(tool, { signal: controller.signal }),
			),
		).catch(() => controller.abort());

		return () => controller.abort();
	}, [articles]);

	return null;
}
