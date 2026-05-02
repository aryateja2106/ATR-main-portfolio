// Single source of truth for projects.
// Consumed by:
//   - apps/web/app/(portfolio)/projects/page.tsx (index)
//   - apps/web/app/(portfolio)/projects/[slug]/page.tsx (deep-dives)
//   - apps/web/app/(portfolio)/_components/projects.tsx (home page section)
//
// phase2Hooks: when a project graduates from "early" to "shipping", flip status
// to "Active" and surface it on the home page. Software Factory and Karna are
// the next candidates.

export type ProjectStatus =
	| "Active"
	| "Beta"
	| "Early"
	| "Passive"
	| "Forked"
	| "Showcase";

export type ProjectStatusVariant = "active" | "passive" | "forked" | "showcase";

export type ProjectLink = {
	label: string;
	href: string;
};

export type Project = {
	id: string;
	slug: string;
	title: string;
	tagline: string;
	status: ProjectStatus;
	statusVariant: ProjectStatusVariant;
	shortDescription: string;
	longDescription: string;
	problem: string;
	approach: string;
	outcomes: string[];
	techStack: string[];
	applicationCategory: string;
	startedAt?: string;
	githubLink?: string;
	liveLink?: string;
	links?: ProjectLink[];
	relatedBlogSlug?: string;
};

export const projects: Project[] = [
	{
		id: "lecoder-mconnect",
		slug: "lecoder-mconnect",
		title: "LeCoder MConnect",
		tagline:
			"Terminal in your pocket. Drive Claude Code, Cursor, and OpenCode from a phone.",
		status: "Active",
		statusVariant: "active",
		shortDescription:
			"Open-source mobile bridge for AI coding agents. Run a real PTY on your machine, expose it through a Cloudflare Tunnel with a QR-code handshake, and drive any TUI agent from a phone over LTE/5G with full key fidelity.",
		longDescription:
			"LeCoder MConnect (mconnect) takes the laptop out of the loop for AI coding agents. Spawn a `node-pty` process on your dev machine, front it with a Cloudflare Tunnel, and pair from a phone with a QR scan. The result: drive Claude Code, Cursor, or any TUI agent from anywhere with full TUI fidelity (Ink, Bubble Tea, modal editors, all of it).",
		problem:
			"AI coding agents like Claude Code and Cursor are tethered to a laptop. Step away to grab coffee or go for a walk and the agent stalls at the next confirmation prompt. Existing approaches (VNC, SSH, web shells) drop key bindings or render TUI redraws as garbled text.",
		approach:
			"Run a real PTY through `node-pty`. Pump xterm.js frames over a specialized WebSocket protocol tuned for TUI redraws. Front the connection with a Cloudflare Tunnel for a zero-config public URL. A QR-code pairing flow keeps onboarding to a single command on the host machine.",
		outcomes: [
			"Drive Claude Code and Cursor end-to-end from a phone with full TUI fidelity.",
			"Single-command bootstrap: `npx lecoder-mconnect` then scan the QR.",
			"Zero router or firewall config thanks to Cloudflare Tunnel.",
			"Works over LTE/5G. Review and approve agent prompts away from the desk.",
		],
		techStack: [
			"Node.js",
			"node-pty",
			"WebSockets",
			"Cloudflare Tunnel",
			"React",
			"xterm.js",
		],
		applicationCategory: "DeveloperApplication",
		startedAt: "2025-12",
		githubLink: "https://github.com/LeSearch-AI/lecoder-mconnect",
		liveLink: "https://lecoder.lesearch.ai",
		links: [
			{
				label: "npm: lecoder-mconnect",
				href: "https://www.npmjs.com/package/lecoder-mconnect",
			},
			{
				label: "Origin story (blog)",
				href: "/blog/connecting-terminals-to-web-mconnect",
			},
		],
		relatedBlogSlug: "connecting-terminals-to-web-mconnect",
	},
	{
		id: "lesearch-ai",
		slug: "lesearch-ai",
		title: "LeSearch AI",
		tagline:
			"AI-native research workspace. From saved PDF to actionable insight.",
		status: "Active",
		statusVariant: "active",
		shortDescription:
			"AI research agent validated by 30+ user interviews. RAG with hard citation grounding (the model cannot claim a fact it cannot highlight in the source). 50+ beta users. Pivoted from 'Chat with PDF' to a true synthesis engine.",
		longDescription:
			"LeSearch AI is the research workspace I co-built and now lead product on. The bet is simple: researchers do not want a faster reader, they want an assistant that synthesizes, surfaces tensions between papers, and turns a saved PDF into an actionable insight.",
		problem:
			"Researchers spend hours skimming abstracts, downloading PDFs, and manually extracting data. 'Chat with PDF' tools are table stakes and stop short of what analysts actually need: cross-paper synthesis grounded in citations.",
		approach:
			"Started with a weekend MVP on Next.js + Supabase. Layered in RAG with strict citation grounding (the AI cannot say a thing it cannot highlight in the PDF). Validated with 50+ beta users including grad students and policy analysts. Now rebuilding with a synthesis engine at the core.",
		outcomes: [
			"50+ active beta users. 30+ structured user interviews drove the product roadmap.",
			"Knowledge-graph visualization of cross-paper relationships shipped as the lead feature.",
			"Pivoted from 'Chat with PDF' to a synthesis engine after discovering users care about 'papers that disagree with my hypothesis'.",
			"Hard citation grounding eliminated hallucinated claims in early evaluations.",
		],
		techStack: [
			"Next.js",
			"Supabase",
			"FastAPI",
			"RAG",
			"Vector DB",
			"OpenAI",
			"Anthropic",
		],
		applicationCategory: "WebApplication",
		startedAt: "2024-12",
		githubLink: "https://github.com/aryateja2106/lesearch-app",
		liveLink: "https://lesearch-app.vercel.app/",
		links: [
			{
				label: "Building LeSearch (blog)",
				href: "/blog/building-lesearch-from-papers-to-action",
			},
		],
		relatedBlogSlug: "building-lesearch-from-papers-to-action",
	},
	{
		id: "cloudagi",
		slug: "cloudagi",
		title: "CloudAGI",
		tagline:
			"Custom agentic workflows for small businesses. Plugin architecture on a credit economy.",
		status: "Active",
		statusVariant: "active",
		shortDescription:
			"Agent credit economy marketplace. Small businesses describe an outcome (lead enrichment, invoice triage, market scan) and CloudAGI assembles a plugin chain, runs it, and meters credits. Built on TypeScript + Bun.",
		longDescription:
			"CloudAGI is the consulting-vehicle-turned-product. After running a string of bespoke automation engagements I noticed the same patterns kept showing up: lead enrichment, doc triage, market scans, weekly digests. CloudAGI packages them as composable plugins on a credit-metered runtime so a small business can self-serve.",
		problem:
			"Small businesses want the productivity gains of AI agents but cannot afford a custom build for every workflow. Existing 'no-code agent' platforms force them to think like engineers.",
		approach:
			"Plugin-first architecture. Each workflow is a chain of typed plugins (fetch, transform, enrich, decide, act). The runtime meters compute and LLM credits per run. Small businesses pay for outcomes, not seats.",
		outcomes: [
			"Plugin-based runtime in TypeScript + Bun.",
			"First customers running lead-enrichment and document-triage workflows.",
			"Credit metering surfaces actual cost per workflow run, not a flat seat price.",
		],
		techStack: ["TypeScript", "Bun", "Hono", "Postgres", "Plugin Architecture"],
		applicationCategory: "BusinessApplication",
		startedAt: "2025-10",
		githubLink: "https://github.com/aryateja2106/cloudagi",
		liveLink: "https://cloudagi.vercel.app",
	},
	{
		id: "software-factory",
		slug: "software-factory",
		title: "Software Factory",
		tagline:
			"Personal agent-built apps deployed to your own always-on hardware.",
		status: "Early",
		statusVariant: "active",
		shortDescription:
			"A system where users describe an app, an agent builds it, and it deploys to the user's own Mac mini or Raspberry Pi. Exposed securely via Cloudflare Tunnel. Web apps install as PWAs on the homescreen.",
		longDescription:
			"Software Factory is the long-term bet behind LeCoder. If a user has any always-on machine (a Mac mini, a Raspberry Pi, a NAS), an agent should be able to take a natural-language spec, build the app, deploy it locally, and expose it on a personal subdomain via a Cloudflare Tunnel. PWAs install on the homescreen and the user has a private app of their own.",
		problem:
			"Custom apps for an individual's exact workflow are usually too small to justify hiring a developer and too quirky for an off-the-shelf SaaS. AI agents can write the code, but deployment and exposure remain hostile to non-developers.",
		approach:
			"Agent does the build. The factory handles deployment to the user's own hardware, secure exposure through a Cloudflare Tunnel, PWA install hints, and lifecycle (update, rollback, kill). The user's machine stays the source of truth.",
		outcomes: [
			"Vision document and architecture sketch live in the LeCoder ecosystem.",
			"First proof of concept deploys a personal note-taking PWA from an agent spec.",
		],
		techStack: [
			"Cloudflare Tunnel",
			"Node.js",
			"PWA",
			"Mac mini",
			"Raspberry Pi",
		],
		applicationCategory: "DeveloperApplication",
		startedAt: "2026-03",
	},
	{
		id: "nl2shell",
		slug: "nl2shell",
		title: "NL2Shell (LeShell)",
		tagline:
			"Natural language to shell commands. Local-first, fine-tuned model.",
		status: "Active",
		statusVariant: "active",
		shortDescription:
			"Natural language to shell commands web app. Hosted at nl2shell.com on Vercel. Backed by a fine-tuned model (AryaYT/nl2shell-0.8b) tuned on common Unix usage patterns.",
		longDescription:
			"NL2Shell answers a daily annoyance: you know what you want to do (find files larger than 1GB modified this week, kill all processes matching a pattern, batch rename a directory) but cannot remember the exact shell incantation. NL2Shell turns plain English into the right command, and explains it.",
		problem:
			"Shell commands are powerful and dangerous. The cost of getting the syntax wrong ranges from a typo to wiping a disk. Most developers ask Stack Overflow or ChatGPT, which is slow and inconsistent.",
		approach:
			"Fine-tune a small language model on a curated NL-to-shell dataset. Ship a tight web interface that previews the command and explains each flag before the user copies it.",
		outcomes: [
			"Web app live at https://nl2shell.com",
			"Hosted model: AryaYT/nl2shell-0.8b",
			"Each generated command ships with a flag-by-flag explanation.",
		],
		techStack: ["Next.js", "Vercel", "Fine-tuned LLM", "Hugging Face"],
		applicationCategory: "DeveloperApplication",
		startedAt: "2025-08",
		liveLink: "https://nl2shell.com",
	},
	{
		id: "karna",
		slug: "karna",
		title: "Karna",
		tagline: "Personal AI coding agent built in Rust.",
		status: "Early",
		statusVariant: "active",
		shortDescription:
			"Karna is a from-scratch coding agent in Rust. The exercise: understand the agent loop end to end without leaning on a framework. Tool use, context management, and provider abstraction are all hand-rolled.",
		longDescription:
			"Karna started as a self-education project. Most coding agents wrap a framework, which makes it hard to internalize where the actual loops, retries, and tool routing happen. Karna is the bare-metal version: written in Rust, no agent framework, every decision visible in the source.",
		problem:
			"Agent frameworks hide the loop. Engineers using them rarely understand where a hang, a retry storm, or a context overflow actually originates.",
		approach:
			"Write the agent loop in Rust from scratch. Hand-roll tool calling, context windowing, and retry logic. Document each architectural decision in the repo.",
		outcomes: [
			"From-scratch agent loop in Rust with no framework dependencies.",
			"Reference implementation for understanding agent internals.",
		],
		techStack: ["Rust", "Tokio", "Anthropic API", "OpenAI API"],
		applicationCategory: "DeveloperApplication",
		startedAt: "2026-01",
		githubLink: "https://github.com/aryateja2106/karna",
	},
	{
		id: "claude-agent-monitor",
		slug: "claude-agent-monitor",
		title: "Claude Agent Monitor",
		tagline: "Production observability for Claude Code agents.",
		status: "Active",
		statusVariant: "active",
		shortDescription:
			"Monitoring tool for Claude Code agents in production. Surfaces token usage, tool-call success rates, retry storms, and per-task latency. Built for teams running Claude agents on real workloads.",
		longDescription:
			"Once you run Claude agents on real customer workloads, you immediately need observability. Where did the tokens go? Which tool calls retried? Which task hit the context wall? Claude Agent Monitor instruments those answers without forcing you onto a heavyweight APM stack.",
		problem:
			"Agents are non-deterministic. Without per-step observability, debugging a production issue means guessing. Generic APMs (Datadog, New Relic) are too generic; agent-specific tools are scarce.",
		approach:
			"Wrap the Claude SDK with a lightweight tap that emits structured events for each step. A small dashboard surfaces token spend, tool success, retries, and latency by task.",
		outcomes: [
			"Per-step event stream for Claude Code agent runs.",
			"Dashboard surfaces token spend and retry storms in real time.",
		],
		techStack: ["TypeScript", "Anthropic SDK", "Postgres", "OpenTelemetry"],
		applicationCategory: "DeveloperApplication",
		startedAt: "2025-09",
		githubLink: "https://github.com/aryateja2106/claude-agent-monitor",
	},
	{
		id: "local-sql-agent",
		slug: "local-sql-agent",
		title: "Local SQL Agent",
		tagline: "Privacy-first natural-language SQL with read-only guardrails.",
		status: "Passive",
		statusVariant: "passive",
		shortDescription:
			"Privacy-first SQL agent with two-layer safety guardrails (read-only enforcement). Introspects Postgres schemas to let anyone query DBs using natural language. Runs against a local Ollama or self-hosted LLM.",
		longDescription:
			"Local SQL Agent is a self-hostable analytics agent. It introspects a Postgres schema, lets non-technical operators ask questions in natural language, and refuses any query that is not strictly read-only, even if the LLM hallucinates a destructive plan.",
		problem:
			"Ops and growth teams need to answer ad-hoc data questions without waiting on engineering, but giving them a generic LLM with database access is dangerous. Hosted services also mean exporting data to a third party.",
		approach:
			"Two-layer guardrail: a SQL parser that whitelists `SELECT`-only AST nodes, plus role-based DB credentials with no write grants. Schema introspection runs locally so the LLM has structure without ever seeing data.",
		outcomes: [
			"Run entirely against a local Ollama or self-hosted LLM. No data leaves the network.",
			"Read-only enforcement at both the SQL parser and the database role layer.",
			"Schema-aware prompts dramatically reduce hallucinated table names.",
		],
		techStack: ["Python", "LangChain", "Postgres", "Ollama", "Local LLMs"],
		applicationCategory: "DeveloperApplication",
		startedAt: "2025-04",
		githubLink: "https://github.com/aryateja2106/local-sql-agent",
	},
];

export function getAllProjects(): Project[] {
	return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
	return projects.find((project) => project.slug === slug);
}

export function getProjectsByStatus(status: ProjectStatus): Project[] {
	return projects.filter((project) => project.status === status);
}
