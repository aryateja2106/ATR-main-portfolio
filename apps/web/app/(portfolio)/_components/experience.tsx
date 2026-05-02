"use client";
import { Hexagon } from "lucide-react";
import { useState } from "react";

// Experience data extracted for maintainability.
// Order: most recent / most prominent first.
const experiences = {
	lesearch: {
		company: "LeSearch AI",
		role: "Founder & Agentic Engineer",
		period: "Nov 2024 - Present",
		location: "San Francisco, CA",
		description: [
			"AI-native research workspace with hard citation grounding (the model cannot claim a fact it cannot highlight in the source).",
			"Validated the product with 30+ structured user interviews and 50+ beta users.",
			'Pivoted from "Chat with PDF" to a synthesis engine after discovering users care most about papers that disagree with their hypothesis.',
			"Own the full stack: Next.js, Supabase, FastAPI, RAG, knowledge-graph visualization.",
		],
	},
	lecoder: {
		company: "LeCoder MConnect",
		role: "Creator & Maintainer",
		period: "Dec 2025 - Present",
		location: "San Francisco, CA",
		description: [
			"Open-source mobile control layer for AI coding agents. Drive Claude Code, Cursor, and OpenCode from a phone.",
			"Architecture: node-pty for real PTY, xterm.js frames over a tuned WebSocket protocol, Cloudflare Tunnel for zero-config public URL, QR-code pairing for onboarding.",
			"Single-command bootstrap: `npx lecoder-mconnect`. Full TUI fidelity with Ink, Bubble Tea, modal editors over LTE/5G.",
			"Live at https://lecoder.lesearch.ai. Published on npm as `lecoder-mconnect`.",
		],
	},
	cloudagi: {
		company: "CloudAGI",
		role: "Founder",
		period: "Oct 2025 - Present",
		location: "San Francisco, CA",
		description: [
			"Custom agentic workflows for small businesses. Plugin-first architecture on a credit-metered runtime.",
			"TypeScript + Bun stack. Each workflow is a chain of typed plugins (fetch, transform, enrich, decide, act).",
			"Customers pay for outcomes, not seats. Surfaces real per-run cost instead of a flat subscription.",
		],
	},
	pilvi: {
		company: "Pilvi Systems",
		role: "Forward Deployed Engineer",
		period: "Aug 2025 - Present",
		location: "Remote",
		description: [
			"Lead 0->1 B2B AI automation work. Shipped 3 MVPs in 8 weeks against real customer workflows.",
			"Designed and deployed an Amplitude analytics framework purpose-built for tracking agentic workflows.",
			"Drove a 19% lift in week-1 retention by refining activation loops for technical users.",
		],
	},
	ispeak: {
		company: "iSpeak AI",
		role: "Co-founder",
		period: "Aug 2023 - Aug 2024",
		location: "Pittsburgh, PA",
		description: [
			"Co-founded an AI automation agency. Delivered custom generative AI pipelines (text, image, video) for SMBs.",
			"Achieved #1 Google ranking for niche queries via programmatic SEO and content strategy.",
			"Managed cross-functional freelance teams to deliver client projects on tight deadlines.",
		],
	},
	duquesne: {
		company: "Duquesne University",
		role: "Graduate Research Assistant",
		period: "Aug 2022 - May 2025",
		location: "Pittsburgh, PA",
		description: [
			'Built "University Buddy", an AI chatbot prototype to help new students resolve administrative FAQs.',
			"Research focus: AI adoption frameworks in higher education and administrative automation.",
		],
	},
	sage: {
		company: "Sage Wealth Advisory",
		role: "Financial Analyst Intern",
		period: "May 2023 - May 2024",
		location: "Pittsburgh, PA",
		description: [
			"Automated portfolio reporting using Excel macros and visualization tooling. Cut reporting time 60%.",
		],
	},
};

type ExperienceKey = keyof typeof experiences;

export const Experience = () => {
	const [activeTab, setActiveTab] = useState<ExperienceKey>("lesearch");

	const currentExperience = experiences[activeTab];

	return (
		<section id="experience" className="w-full mt-28">
			<h2 className="flex items-center text-3xl font-bold mb-16">
				<span className="mr-4">Where I&apos;ve </span>
				<span className="text-teal-400 mr-3">Worked</span>
				<div className="h-px bg-gray-600 grow" />
			</h2>

			<div className="flex flex-col md:flex-row gap-8">
				{/* Company tabs */}
				<div className="md:w-64 flex md:flex-col overflow-x-auto md:overflow-visible">
					{(Object.keys(experiences) as ExperienceKey[]).map((key) => (
						<button
							type="button"
							key={key}
							onClick={() => setActiveTab(key)}
							className={`py-3 px-4 text-left border-l-2 whitespace-nowrap transition-all duration-300 ${
								activeTab === key
									? "bg-slate-800/50 text-teal-400 border-l-teal-400"
									: "hover:bg-slate-800/30 border-l-gray-700 text-gray-400 hover:text-white"
							}`}
						>
							{experiences[key].company}
						</button>
					))}
				</div>

				{/* Experience details */}
				<div className="flex-1">
					<div className="mb-2">
						<h3 className="text-2xl font-semibold">
							{currentExperience.role}{" "}
							<span className="text-teal-400">
								@ {currentExperience.company}
							</span>
						</h3>
						<p className="text-gray-400 mt-1">
							{currentExperience.period} • {currentExperience.location}
						</p>
					</div>

					<ul className="space-y-4 mt-6">
						{currentExperience.description.map((item, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: bullet list is static per tab; index+content prefix is stable enough
							<li key={`${index}-${item.substring(0, 10)}`} className="flex">
								<Hexagon className="text-teal-400 mr-2 mt-1 size-3 fill-current shrink-0" />
								<span>{item}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default Experience;
