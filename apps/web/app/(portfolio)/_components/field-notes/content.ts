// Structured content for the portfolio homepage.
// Edit here to change copy. Components read from this single source.

export const nav = [
	{ label: "Work", href: "/#work" },
	{ label: "Writing", href: "/blog" },
	{ label: "Field", href: "/#about" },
	{ label: "Contact", href: "/#contact" },
];

export const hero = {
	kicker: "Founder · multi-agent systems · local-first control",
	headline: ["Arya Teja Rudraraju", "Agent systems", "that earn trust."],
	lede: "I help founders and teams turn practical AI agent ideas into secure, useful systems. This site shows the work, the people around it, and the lessons I can stand behind.",
	cta: {
		label: "Share your problem",
		href: "#contact",
	},
	secondaryCta: { label: "See proof of work", href: "#work" },
	portrait: "/real-images/yc-robo-hk-solo.jpeg",
	portraitAlt: "Arya at YC Robo, Hong Kong",
	records: [
		{
			label: "Focus",
			value: "AI agent consulting",
			detail:
				"Secure setups, workflow audits, and systems that solve a real business problem.",
		},
		{
			label: "Product",
			value: "LeSearch AI",
			detail:
				"Native Apple mission control for remote coding agents, with iPhone and Watch approval flows in progress.",
		},
		{
			label: "Open source",
			value: "LeCoder MConnect",
			detail: "A mobile bridge for coding agents and remote terminal control.",
		},
	],
};

export const journey = {
	title: "Field evidence",
	tag: "Builder log 2024-2026",
	note: "Real rooms, real teams, real conversations. Trust should be sourced, not staged.",
	feature: {
		src: "/real-images/yc-robo-hk-solo.jpeg",
		alt: "Arya at YC Robo, Hong Kong",
		caption: "Arya · YC Robo, HK",
	},
	photos: [
		{
			src: "/real-images/world-model-hk-team.JPG",
			alt: "World Model team, Hong Kong",
			caption: "World Model · HK team",
		},
		{
			src: "/real-images/Raycast-builder-event.JPG",
			alt: "Raycast builder event",
			caption: "Raycast builder event",
		},
		{
			src: "/real-images/Factory-builder-event.JPG",
			alt: "Factory builder event",
			caption: "Factory builder event",
		},
		{
			src: "/real-images/nevermined-hk-team.JPG",
			alt: "Nevermined team, Hong Kong",
			caption: "Nevermined · HK team",
		},
		{
			src: "/real-images/YC-robo-hk-team.JPG",
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
			desc: "Building a native Apple control surface for agents running across machines, with mobile monitoring and deliberate approval boundaries.",
			cta: "Follow the build",
			href: "https://lesearch.ai",
		},
		{
			mark: "02 / SERVICES",
			name: "AI agent consulting",
			desc: "Direct help with secure agent setup, local-first workflows, automation, and practical implementation.",
			cta: "Share a problem",
			href: "#contact",
		},
		{
			mark: "03 / TOOL",
			name: "LeCoder MConnect",
			desc: "Open-source mobile control for coding agents, terminals, and long-running dev workflows.",
			cta: "View code",
			href: "https://github.com/aryateja2106/lecoder-mconnect",
		},
		{
			mark: "04 / CULTURE",
			name: "agentfirst.shop",
			desc: "Agent-native merch and artifacts for builders who want the culture to look like the work.",
			cta: "Visit shop",
			href: "https://agentfirst.shop",
		},
	],
};

export const footer = {
	brand: "ARYA TEJA RUDRARAJU",
	copyright: "© 2026 Arya Teja Rudraraju",
	socials: [
		{ label: "LinkedIn", href: "https://linkedin.com/in/arya-teja-rudraraju" },
		{ label: "X", href: "https://x.com/r_aryateja" },
		{ label: "YouTube", href: "https://youtube.com" },
	],
};
