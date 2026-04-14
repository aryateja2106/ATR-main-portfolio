"use client";
import { Hexagon } from "lucide-react";
import { useState } from "react";

// Experience data extracted for maintainability
const experiences = {
	cloudagi: {
		company: "CloudAGI",
		role: "Founder & Engineer",
		period: "Mar 2026 - Present",
		location: "San Francisco, CA",
		description: [
			"Building agent credit economy marketplace enabling users to monetize unused AI subscription credits across Claude, Cursor, Amp, and Codex.",
			"Built branch-and-leaf AI agent marketplace at Nevermined hackathon; 7 services, 21+ agent-to-agent purchases from 5 teams using x402 payment protocol.",
			"Reverse-engineered 14 provider auth flows (OAuth, JWT, SQLite, Keychain); built sell-window algorithm calculating credit waste across billing cycles.",
		],
	},
	lesearch: {
		company: "LeSearch AI",
		role: "Founder & Product Lead",
		period: "Nov 2024 - Present",
		location: "San Francisco, CA",
		description: [
			"Shipped LeCoder MConnect to the App Store — multi-agent coding assistant connecting Claude, Gemini, and local models from mobile.",
			"Built 0-to-1 enterprise research platform serving 100+ researchers at 4 universities; 87% retention via JTBD framework.",
			"Architected multi-agent infrastructure: Docker MCP (77+ tools), Agent Bridge MCP (Gemini/OpenCode/Codex), Claude Code as orchestrator hub.",
		],
	},
	pilvi: {
		company: "Pilvi Systems",
		role: "AI Product Manager",
		period: "Aug 2025 - Feb 2026",
		location: "Dallas, TX (Remote)",
		description: [
			"Shipped 3 AI automation MVPs in 8 weeks; established Amplitude analytics infrastructure with event taxonomy and KPI dashboards.",
			"Improved activation rate from 22% to 41% through refined onboarding loops for technical users.",
			"Led sprint planning and backlog grooming; architected multi-agent workflows (MCP/ACP, FastAPI, N8n) reducing client overhead 35%.",
		],
	},
	ispeak: {
		company: "iSpeak AI",
		role: "AI Product Manager",
		period: "Aug 2023 - Aug 2024",
		location: "Pittsburgh, PA",
		description: [
			"Led cross-functional product development for 10+ clients; translated AI capabilities into PRDs and user stories with 90% client satisfaction.",
			"Built monitoring stack (GA, Sentry, Datadog); developed Neo4j knowledge graphs improving targeting 25%.",
		],
	},
	education: {
		company: "Duquesne University",
		role: "MBA & MS in Analytics",
		period: "Aug 2022 - May 2025",
		location: "Pittsburgh, PA",
		description: [
			"Palumbo-Donahue School of Business — GPA: 3.65/4.0",
			"Cahouet Scholar (Merit) — Individual Honor in Analytics Challenge.",
			"Coursework: Machine Learning, Predictive Analytics, Cloud Computing.",
		],
	},
};

type ExperienceKey = keyof typeof experiences;

export const Experience = () => {
	const [activeTab, setActiveTab] = useState<ExperienceKey>("cloudagi");

	const currentExperience = experiences[activeTab];

	return (
		<section id="experience" className="w-full mt-32">
			<h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
				<span className="text-foreground">Where I&apos;ve</span>
				<span className="text-teal-400">Worked</span>
				<div className="h-px bg-border grow opacity-50" />
			</h2>

			<div className="flex flex-col md:flex-row gap-8">
				{/* Company tabs */}
				<div className="md:w-56 flex md:flex-col overflow-x-auto md:overflow-visible noscroll-bar border-l border-border/30 pl-2 md:pl-0 md:border-l-0">
					{(Object.keys(experiences) as ExperienceKey[]).map((key) => (
						<button
							type="button"
							key={key}
							onClick={() => setActiveTab(key)}
							className={`py-3 px-6 text-left whitespace-nowrap transition-all duration-300 rounded-r-full text-sm font-medium ${
								activeTab === key
									? "text-teal-400 bg-teal-500/10 border-l-2 border-teal-500"
									: "text-muted-foreground hover:text-foreground hover:bg-white/5 border-l-2 border-transparent"
							}`}
						>
							{experiences[key].company}
						</button>
					))}
				</div>

				{/* Experience details */}
				<div className="flex-1 min-h-[300px]">
					<div className="glass-panel p-8 rounded-2xl">
						<div className="mb-6">
							<h3 className="text-2xl font-bold text-foreground">
								{currentExperience.role}{" "}
								<span className="text-teal-400">
									@ {currentExperience.company}
								</span>
							</h3>
							<p className="text-sm font-mono text-muted-foreground mt-2">
								{currentExperience.period} • {currentExperience.location}
							</p>
						</div>

						<ul className="space-y-4">
							{currentExperience.description.map((item, index) => (
								<li
									key={`${index}-${item.substring(0, 10)}`}
									className="flex group"
								>
									<Hexagon className="text-teal-500/50 mr-4 mt-1.5 size-3 fill-teal-500/20 shrink-0 group-hover:text-teal-400 transition-colors" />
									<span className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
										{item}
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Experience;
