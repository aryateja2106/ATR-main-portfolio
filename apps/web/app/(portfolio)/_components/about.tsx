"use client";

import { motion, type Variants } from "framer-motion";
import { Activity, Boxes, Cable, LineChart, Radar } from "lucide-react";
import Link from "next/link";

const principles = [
	{
		title: "Start with demand signals",
		label: "01",
		icon: LineChart,
		body: "My marketing background trained me to read user language, conversion gaps, and revenue pressure before writing a product spec.",
	},
	{
		title: "Prototype where the work happens",
		label: "02",
		icon: Cable,
		body: "I build quick loops in the surfaces operators already trust: terminals, databases, browsers, docs, and research workspaces.",
	},
	{
		title: "Orchestrate instead of hand-waving",
		label: "03",
		icon: Boxes,
		body: "The next layer is multi-agent execution with clear roles, visible state, and enough structure for humans to intervene.",
	},
	{
		title: "Ship with receipts",
		label: "04",
		icon: Radar,
		body: "I care about evals, telemetry, run logs, and demos that prove the system did useful work instead of only sounding clever.",
	},
];

const cardVariants: Variants = {
	hidden: { opacity: 0, y: 18 },
	visible: (index: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: index * 0.08,
			duration: 0.35,
			ease: "easeOut",
		},
	}),
};

export const About = () => {
	return (
		<section id="about" className="w-full scroll-mt-28 py-16">
			<div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
				<div>
					<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
						<Activity className="size-3.5" />
						Operating thesis
					</div>
					<h2 className="text-4xl font-bold tracking-tight text-neutral-50 md:text-5xl">
						From signals to systems.
					</h2>
				</div>
				<p className="max-w-md text-base leading-7 text-neutral-400">
					I am building toward AI products that feel less like chat windows and
					more like reliable operating surfaces: inspectable, scriptable, and
					close to the real work.
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				{principles.map((principle, index) => {
					const Icon = principle.icon;
					return (
						<motion.article
							key={principle.title}
							custom={index}
							variants={cardVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-60px" }}
							className="group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950/80 p-5 transition hover:border-teal-400/40"
						>
							<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-300/70 to-transparent opacity-0 transition group-hover:opacity-100" />
							<div className="mb-8 flex items-center justify-between">
								<span className="font-mono text-sm text-neutral-500">
									{principle.label}
								</span>
								<div className="grid size-10 place-items-center rounded-md border border-white/10 bg-white/[0.03] text-teal-300">
									<Icon className="size-5" />
								</div>
							</div>
							<h3 className="text-xl font-semibold text-neutral-100">
								{principle.title}
							</h3>
							<p className="mt-3 text-sm leading-6 text-neutral-400">
								{principle.body}
							</p>
						</motion.article>
					);
				})}
			</div>

			<div className="mt-8 rounded-lg border border-teal-400/20 bg-teal-400/[0.06] p-5">
				<div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
					<p className="max-w-2xl text-sm leading-6 text-neutral-300">
						That is why this site now leads with terminal-native orchestration:
						remote VM setup, browser PTY, agent panes, guardrails, and receipts
						in one visible workflow.
					</p>
					<div className="flex flex-col gap-3 sm:flex-row">
						<Link
							href="#terminal"
							className="inline-flex min-h-10 items-center justify-center rounded-md bg-teal-300 px-4 text-sm font-bold text-neutral-950 transition hover:bg-teal-200"
						>
							View terminal demo
						</Link>
						<Link
							href="/resume/Arya_Teja_PM_Resume.pdf"
							className="inline-flex min-h-10 items-center justify-center rounded-md border border-teal-300/40 px-4 text-sm font-semibold text-teal-200 transition hover:bg-teal-300/10"
						>
							Open resume
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
