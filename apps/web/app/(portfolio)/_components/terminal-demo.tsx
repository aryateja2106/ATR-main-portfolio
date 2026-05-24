"use client";

import { motion } from "framer-motion";
import {
	Network,
	Play,
	Server,
	ShieldCheck,
	Sparkles,
	Terminal,
	Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const DEFAULT_TASK =
	"Audit a Next.js repo, fix the broken routes, and ship a preview report";

const terminalSteps = [
	"vm profile: arya-demo-vm connected over relay",
	"provision: node, bun, git, tmux, codex-cli detected",
	"orchestrator: decomposed task into 3 isolated workspaces",
	"planner@pane-1: mapping product intent and risk surface",
	"builder@pane-2: patching UI, assets, and route contracts",
	"verifier@pane-3: running typecheck, build, and browser smoke",
	"receipt: merged summary with commands, screenshots, and next actions",
];

const agentPanes = [
	{
		name: "planner",
		accent: "text-cyan-300",
		status: "scope locked",
		lines: [
			"read README, routes, and product copy",
			"found chat surface drift",
			"split work into terminal, content, media",
		],
	},
	{
		name: "builder",
		accent: "text-teal-300",
		status: "patch ready",
		lines: [
			"mounted browser terminal prototype",
			"replaced dead chat nav",
			"fixed blog cover sources",
		],
	},
	{
		name: "verifier",
		accent: "text-amber-300",
		status: "receipts",
		lines: [
			"bun check-types passed",
			"next build passed",
			"preview screenshot captured",
		],
	},
];

const architecture = [
	{
		title: "Remote VM Profile",
		body: "A lightweight install creates a named user profile, SSH/relay credentials, and a constrained project workspace.",
		icon: Server,
	},
	{
		title: "Browser PTY Surface",
		body: "The browser renders terminal state and can later swap this prototype for wterm with WebSocket PTY transport.",
		icon: Terminal,
	},
	{
		title: "Agent Multiplexer",
		body: "An orchestrator fans work into planner, builder, and verifier panes while preserving logs and receipts.",
		icon: Network,
	},
	{
		title: "Guarded Execution",
		body: "Public demos stay sandboxed and rate-limited before any real VM, API key, or agent command is allowed.",
		icon: ShieldCheck,
	},
];

export function TerminalDemo() {
	const [task, setTask] = useState(DEFAULT_TASK);
	const [isRunning, setIsRunning] = useState(false);
	const [visibleLines, setVisibleLines] = useState(4);

	const renderedLines = useMemo(() => {
		const taskLine = `task: "${task.trim() || DEFAULT_TASK}"`;
		return [taskLine, ...terminalSteps].slice(0, visibleLines);
	}, [task, visibleLines]);

	useEffect(() => {
		if (!isRunning || visibleLines >= terminalSteps.length + 1) {
			if (visibleLines >= terminalSteps.length + 1) {
				setIsRunning(false);
			}
			return;
		}

		const timer = window.setTimeout(() => {
			setVisibleLines((current) =>
				Math.min(current + 1, terminalSteps.length + 1),
			);
		}, 520);

		return () => window.clearTimeout(timer);
	}, [isRunning, visibleLines]);

	const runDemo = () => {
		setVisibleLines(1);
		setIsRunning(true);
	};

	return (
		<section id="terminal" className="w-full scroll-mt-28">
			<motion.div
				className="relative overflow-hidden rounded-lg border border-teal-400/20 bg-[#08100f]/90 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:p-6"
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-80px" }}
				transition={{ duration: 0.5 }}
			>
				<div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(20,184,166,0.14),transparent_28%,rgba(245,158,11,0.08)_70%,transparent)]" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(45,212,191,0.2),transparent_30%),radial-gradient(circle_at_85%_12%,rgba(250,204,21,0.12),transparent_24%)]" />

				<div className="relative z-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
					<div className="flex flex-col justify-between gap-8">
						<div>
							<div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-teal-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-200">
								<Sparkles className="size-3.5" />
								Terminal-native agents
							</div>
							<h2 className="text-3xl font-bold leading-tight text-neutral-50 md:text-5xl">
								The terminal is becoming the next GUI.
							</h2>
							<p className="mt-5 text-base leading-7 text-neutral-300 md:text-lg">
								This prototype shows the product direction: connect a remote VM,
								open a browser terminal, then let an orchestrator split a task
								across multiple CLI agents with visible receipts.
							</p>
						</div>

						<div className="grid gap-3 sm:grid-cols-2">
							{architecture.map((item) => {
								const Icon = item.icon;
								return (
									<div
										key={item.title}
										className="rounded-lg border border-white/10 bg-black/25 p-4"
									>
										<Icon className="mb-3 size-5 text-teal-300" />
										<h3 className="text-sm font-semibold text-neutral-100">
											{item.title}
										</h3>
										<p className="mt-2 text-sm leading-6 text-neutral-400">
											{item.body}
										</p>
									</div>
								);
							})}
						</div>
					</div>

					<div className="rounded-lg border border-white/10 bg-black/70 shadow-2xl">
						<div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
							<div className="flex items-center gap-2">
								<span className="size-2.5 rounded-full bg-red-400" />
								<span className="size-2.5 rounded-full bg-amber-300" />
								<span className="size-2.5 rounded-full bg-emerald-400" />
							</div>
							<div className="rounded-full border border-teal-300/20 px-3 py-1 text-xs font-medium text-teal-200">
								arya-demo-vm / tmux:agents
							</div>
						</div>

						<div className="space-y-4 p-4">
							<label
								htmlFor="terminal-task"
								className="block text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500"
							>
								Orchestrator task
							</label>
							<div className="flex flex-col gap-3 sm:flex-row">
								<input
									id="terminal-task"
									value={task}
									onChange={(event) => setTask(event.target.value)}
									className="min-h-11 flex-1 rounded-md border border-white/10 bg-neutral-950 px-3 font-mono text-sm text-neutral-100 outline-none transition focus:border-teal-300/60"
								/>
								<button
									type="button"
									onClick={runDemo}
									className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-teal-300 px-4 text-sm font-bold text-neutral-950 transition hover:bg-teal-200"
								>
									<Play className="size-4" />
									Run demo
								</button>
							</div>

							<div className="min-h-[260px] rounded-md border border-teal-300/10 bg-[#020807] p-4 font-mono text-sm text-neutral-300">
								<div className="mb-3 flex items-center justify-between text-xs text-neutral-500">
									<span>multiplexer output</span>
									<span>{isRunning ? "streaming" : "idle"}</span>
								</div>
								<div className="space-y-2">
									{renderedLines.map((line, index) => (
										<motion.div
											// biome-ignore lint/suspicious/noArrayIndexKey: index is stable and lines are unique
											key={`${line}-${index}`}
											className="flex gap-2"
											initial={{ opacity: 0, x: -8 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.2 }}
										>
											<span className="text-teal-300">$</span>
											<span>{line}</span>
										</motion.div>
									))}
									<div className="flex gap-2 text-teal-300">
										<span>$</span>
										<span className="cursor-blink">
											waiting for next receipt
										</span>
									</div>
								</div>
							</div>

							<div className="grid gap-3 md:grid-cols-3">
								{agentPanes.map((agent) => (
									<div
										key={agent.name}
										className="rounded-md border border-white/10 bg-neutral-950/80 p-3"
									>
										<div className="mb-3 flex items-center justify-between gap-2">
											<span
												className={`font-mono text-sm font-semibold ${agent.accent}`}
											>
												{agent.name}
											</span>
											<span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-neutral-500">
												{agent.status}
											</span>
										</div>
										<ul className="space-y-2 text-xs leading-5 text-neutral-400">
											{agent.lines.map((line) => (
												<li key={line} className="flex gap-2">
													<Zap className="mt-0.5 size-3 shrink-0 text-teal-400" />
													<span>{line}</span>
												</li>
											))}
										</ul>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</section>
	);
}

export default TerminalDemo;
