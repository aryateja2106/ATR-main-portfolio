"use client";

import { useEffect } from "react";

export type ArticleSummary = {
	slug: string;
	title: string;
	description: string;
	category: string;
	tags: string[];
};

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
				"Return verified public context about Arya Teja Rudraraju, his current focus, services, projects, and contact options.",
			inputSchema: { type: "object", properties: {} },
			annotations: readOnly,
			execute: () => ({
				name: "Arya Teja Rudraraju",
				role: "Founder and agentic systems builder",
				location: "India; previously based in the United States",
				focus: [
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
				},
				agentAuthority: {
					allowed: [
						"Read public content",
						"Draft content",
						"Navigate this site",
					],
					restriction:
						"Agents may not submit forms, book meetings, accept terms, contact Arya, or act on a person's behalf without that person's explicit human confirmation.",
				},
				currentPage: currentPath,
			}),
		},
		{
			name: "find_technical_articles",
			description:
				"Find Arya's implementation guides and technical articles by keyword. Returns titles, summaries, categories, tags, and canonical paths.",
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
							]
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
				"Navigate the visible portfolio tab to Arya's work, writing, or contact section. Agents may navigate, but may not submit, book, accept terms, or contact Arya without explicit human confirmation.",
			inputSchema: {
				type: "object",
				properties: {
					destination: {
						type: "string",
						enum: ["work", "writing", "contact"],
					},
				},
				required: ["destination"],
			},
			annotations: navigates,
			execute: ({ destination }) => {
				const destinations = {
					work: "/#work",
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
