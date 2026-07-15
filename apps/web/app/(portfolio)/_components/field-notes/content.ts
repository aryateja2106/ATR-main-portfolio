// Structured content for the portfolio homepage.
// Edit here to change copy. Components read from this single source.

export const nav = [
	{ label: "Work", href: "/#work" },
	{ label: "Experience", href: "/#experience" },
	{ label: "About", href: "/#about" },
	{ label: "Writing", href: "/blog" },
	{ label: "Contact", href: "/#contact" },
];

export const hero = {
	kicker: "Applied AI · agent systems · forward-deployed delivery",
	headline: ["Arya Teja Rudraraju", "Agent systems", "that earn trust."],
	lede: "I turn ambiguous workflows into agentic POCs, MVPs, and reliable tools by combining stakeholder discovery, hands-on implementation, and practical deployment.",
	availability:
		"Based in India · previously in the United States · open to remote Applied AI and Forward Deployed Engineering roles",
	cta: {
		label: "Discuss a role or project",
		href: "mailto:aryateja2106@gmail.com?subject=Applied%20AI%20role%20or%20project",
	},
	secondaryCta: { label: "Review selected work", href: "#work" },
	portrait: "/real-images/yc-robo-hk-solo.webp",
	portraitAlt: "Arya at YC Robo, Hong Kong",
	records: [
		{
			label: "What I build",
			value: "Applied AI systems",
			detail:
				"Agent workflows, POCs, MVPs, evaluation loops, and automation grounded in a real operating problem.",
		},
		{
			label: "How I work",
			value: "Forward deployed",
			detail:
				"Clarify the workflow with stakeholders, build the smallest useful system, test it, and hand over evidence.",
		},
		{
			label: "Where I work",
			value: "Remote from India",
			detail:
				"Previously based in the United States and comfortable working across technical, product, and business contexts.",
		},
	],
};

export const journey = {
	title: "Field evidence",
	tag: "Builder log 2024-2026",
	note: "Real rooms, real teams, real conversations. Trust should be sourced, not staged.",
	feature: {
		src: "/real-images/nevermined-hk-team.webp",
		alt: "Arya with the Nevermined team in Hong Kong",
		caption: "Nevermined · HK team",
	},
	photos: [
		{
			src: "/real-images/world-model-hk-team.webp",
			alt: "World Model team, Hong Kong",
			caption: "World Model · HK team",
		},
		{
			src: "/real-images/raycast-builder-event.webp",
			alt: "Raycast builder event",
			caption: "Raycast builder event",
		},
		{
			src: "/real-images/factory-builder-event.webp",
			alt: "Factory builder event",
			caption: "Factory builder event",
			objectPosition: "object-[50%_24%]",
		},
		{
			src: "/real-images/agent-sec-hk.webp",
			alt: "Agent security builders in Hong Kong",
			caption: "Agent security · HK",
		},
		{
			src: "/real-images/yc-robo-hk-team.webp",
			alt: "YC Robo team, Hong Kong",
			caption: "YC Robo · HK team",
		},
	],
};

export const writing = {
	title: "Writing",
	tag: "Essays, case studies, build logs",
	items: [
		{
			kind: "Build log",
			title: "Connecting terminals to the web",
			excerpt:
				"How LeCoder MConnect turns a laptop-bound coding agent into a remote workflow with QR access, WebSockets, and a real PTY.",
			href: "/blog/connecting-terminals-to-web-mconnect",
		},
		{
			kind: "Case study",
			title: "Building LeSearch from papers to action",
			excerpt:
				"A practical record of moving from chat-with-PDF toward synthesis, citations, and research assistance that users can trust.",
			href: "/blog/building-lesearch-from-papers-to-action",
		},
		{
			kind: "Position",
			title: "Why I bet on open source agents",
			excerpt:
				"A note on composable tools, open protocols, and why agent systems need inspection before they deserve trust.",
			href: "/blog/why-i-bet-on-open-source-agents",
		},
	],
};

export const agents = {
	title: "Current work",
	tag: "Products, services, open source",
	items: [
		{
			mark: "01 / PRODUCT",
			name: "LeSearch AI",
			desc: "Exploring multi-agent, multi-machine orchestration for long-running AI work, evolving from an AI research and paper-to-code foundation.",
			cta: "Follow the build",
			href: "https://lesearch.ai",
		},
		{
			mark: "02 / SERVICES",
			name: "AI agent consulting",
			desc: "Direct help with secure agent setup, local-first workflows, automation, and practical implementation.",
			cta: "Share a problem",
			href: "mailto:aryateja2106@gmail.com",
		},
		{
			mark: "03 / TOOL",
			name: "LeCoder MConnect",
			desc: "Open-source mobile control for coding agents, terminals, and long-running dev workflows.",
			cta: "View code",
			href: "https://github.com/aryateja2106/lecoder-mconnect",
		},
		{
			mark: "04 / EXPERIENCE",
			name: "AI delivery at Pilvi",
			desc: "Built stakeholder-facing AI POCs and MVPs, including testing automation using Claude Code and Playwright.",
			cta: "Review experience",
			href: "#experience",
		},
	],
};

export const experience = {
	tag: "Experience and fit",
	title: "Applied AI, from ambiguity to deployment.",
	note: "I work across problem framing, prototypes, system design, evaluation, and practical handoff.",
	items: [
		{
			name: "Pilvi Systems",
			role: "AI Product Manager",
			detail:
				"Built stakeholder-facing POCs and MVPs, plus testing automation with Claude Code and Playwright.",
		},
		{
			name: "LeSearch AI",
			role: "Founder",
			detail:
				"Started with AI-assisted research and paper-to-code workflows; now exploring multi-agent, multi-machine orchestration. Invited to interview for YC in 2025.",
		},
		{
			name: "Duquesne University",
			role: "MBA · MS Analytics & Information Management",
			detail:
				"Worked as a graduate assistant across faculty research, published work, and international admissions programs.",
		},
		{
			name: "UPES · YuppTV",
			role: "BBA Digital Marketing · social media internship",
			detail:
				"Business and marketing foundations that still shape how I discover needs, communicate value, and ship useful systems.",
		},
	],
};

export const footer = {
	brand: "ARYA TEJA RUDRARAJU",
	copyright: "© 2026 Arya Teja Rudraraju",
	socials: [
		{ label: "LinkedIn", href: "https://linkedin.com/in/arya-teja-rudraraju" },
		{ label: "X", href: "https://x.com/r_aryateja" },
	],
};
