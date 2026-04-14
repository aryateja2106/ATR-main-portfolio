"use client";

import { motion } from "framer-motion";
import { Cpu, Github, Box } from "lucide-react";
import Link from "next/link";

// Project Data
const SHIPPED_PROJECTS = [
	{
		id: "lecoder",
		title: "LeCoder-cgpu-CLI",
		tagline: "Control Google Colab runtimes from your local terminal.",
		description:
			"A production-ready CLI tool that bridges local development with free cloud GPUs. It reverse-engineers the Colab WebSocket protocol to essentially give you a free V100/T4 GPU for local VS Code workflows.",
		metrics: [
			{ label: "Downloads", value: "2k+" },
			{ label: "Zero Config", value: "OAuth2" },
			{ label: "Runtime", value: "TypeScript" },
		],
		stack: ["Node.js", "TypeScript", "WebSockets", "Google OAuth"],
		links: {
			github: "https://github.com/aryateja2106/LeCoder-cgpu-CLI",
			npm: "https://www.npmjs.com/package/lecoder-cgpu",
		},
		preview: (
			<div className="w-full h-full bg-[#1e1e1e] p-4 font-mono text-xs text-neutral-300 overflow-hidden relative">
				<div className="flex gap-1.5 mb-3">
					<div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
					<div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
					<div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
				</div>
				<div className="space-y-1">
					<p>
						<span className="text-green-400">➜</span>{" "}
						<span className="text-blue-400">~</span> lecoder-cgpu connect
					</p>
					<p className="text-neutral-500">Authenticating with Google...</p>
					<p className="text-green-400">✓ Authenticated as arya@example.com</p>
					<p>
						<span className="text-green-400">✓</span> Connected to{" "}
						<span className="text-yellow-400">Tesla T4</span> runtime
					</p>
					<p className="mt-2">
						<span className="text-green-400">➜</span>{" "}
						<span className="text-blue-400">colab</span> python train.py
					</p>
					<p className="text-neutral-400">
						Epoch 1/10: 100%|██████████| 2.1s/step - loss: 0.234
					</p>
					<p className="text-neutral-400">
						Epoch 2/10: 100%|██████████| 1.9s/step - loss: 0.198
					</p>
				</div>
				<div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] via-transparent to-transparent pointer-events-none" />
			</div>
		),
	},
	{
		id: "neural-memory",
		title: "Neural Memory Reproduction",
		tagline: "Implementations of TITANS, MIRAS, and Nested Learning.",
		description:
			"Complete PyTorch reproduction of three Google Research papers on neural memory. Enabling test-time memorization and continual learning without retraining.",
		metrics: [
			{ label: "Coverage", value: "87%" },
			{ label: "Tests", value: "52+" },
			{ label: "Paper", value: "TITANS" },
		],
		stack: ["Python", "PyTorch", "Docker", "Pytest"],
		links: {
			github: "https://github.com/aryateja2106/neural-memory-reproduction",
		},
		preview: (
			<div className="w-full h-full bg-[#0d1117] p-4 font-mono text-xs text-neutral-300 relative overflow-hidden">
				<div className="flex items-center justify-between mb-3 border-b border-neutral-800 pb-2">
					<span className="text-neutral-500">model.py</span>
					<span className="text-green-500 text-[10px] bg-green-500/10 px-1.5 py-0.5 rounded">
						Passing
					</span>
				</div>
				<div className="space-y-0.5 opacity-90">
					<p>
						<span className="text-purple-400">class</span>{" "}
						<span className="text-yellow-400">NeuralMemory</span>(nn.Module):
					</p>
					<p className="pl-4">
						<span className="text-purple-400">def</span>{" "}
						<span className="text-blue-400">__init__</span>(self, dim):
					</p>
					<p className="pl-8">
						<span className="text-purple-400">super</span>().__init__()
					</p>
					<p className="pl-8">
						self.store = <span className="text-yellow-400">TITANS_Store</span>
						(dim)
					</p>
					<p className="pl-4 mt-2">
						<span className="text-purple-400">def</span>{" "}
						<span className="text-blue-400">forward</span>(self, x):
					</p>
					<p className="pl-8 text-neutral-500"># Updates memory state</p>
					<p className="pl-8">
						<span className="text-purple-400">return</span> self.store.update(x)
					</p>
				</div>
				<div className="absolute bottom-4 right-4 text-neutral-600">
					<Cpu className="w-12 h-12 opacity-10" />
				</div>
			</div>
		),
	},
];

export const ShippedProjects = () => {
	return (
		<section className="w-full py-24 relative" id="shipped">
			<div className="w-full max-w-5xl mx-auto px-4">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-16"
				>
					<div className="flex items-center gap-3 mb-4">
						<div className="h-px flex-1 bg-gradient-to-r from-transparent via-teal-500/50 to-transparent opacity-50" />
						<span className="font-mono text-sm text-teal-400 tracking-wider uppercase">
							Engineering & &nbsp;Research
						</span>
						<div className="h-px flex-1 bg-gradient-to-r from-transparent via-teal-500/50 to-transparent opacity-50" />
					</div>
					<h2 className="text-3xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
						Shipped to Production
					</h2>
				</motion.div>

				{/* Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
					{SHIPPED_PROJECTS.map((project, index) => (
						<motion.div
							key={project.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className="group relative flex flex-col h-full bg-neutral-900/40 border border-neutral-800 hover:border-teal-500/30 rounded-2xl overflow-hidden backdrop-blur-sm transition-colors"
						>
							{/* Preview Window (Top Half) */}
							<div className="h-48 md:h-56 w-full border-b border-neutral-800 bg-black/40 relative group-hover:bg-black/20 transition-colors">
								{project.preview}
							</div>

							{/* Content (Bottom Half) */}
							<div className="flex-1 p-6 md:p-8 flex flex-col">
								<div className="flex justify-between items-start mb-4">
									<div>
										<h3 className="text-xl font-bold text-neutral-100 group-hover:text-teal-400 transition-colors flex items-center gap-2">
											{project.title}
										</h3>
										<p className="text-sm text-teal-500/80 font-mono mt-1">
											{project.tagline}
										</p>
									</div>
									<div className="flex gap-2">
										{project.links.github && (
											<Link
												href={project.links.github}
												target="_blank"
												className="p-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 hover:text-white transition-colors text-neutral-400"
											>
												<Github className="w-4 h-4" />
											</Link>
										)}
										{project.links.npm && (
											<Link
												href={project.links.npm}
												target="_blank"
												className="p-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 hover:text-white transition-colors text-neutral-400"
											>
												<Box className="w-4 h-4" />
											</Link>
										)}
									</div>
								</div>

								<p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-1">
									{project.description}
								</p>

								{/* Metrics Grid */}
								<div className="grid grid-cols-3 gap-2 mb-6 border-t border-b border-neutral-800 py-4">
									{project.metrics.map((metric) => (
										<div
											key={metric.label}
											className="text-center px-2 border-r border-neutral-800 last:border-0"
										>
											<div className="text-lg font-bold text-neutral-200">
												{metric.value}
											</div>
											<div className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">
												{metric.label}
											</div>
										</div>
									))}
								</div>

								{/* Tech Stack Tags */}
								<div className="flex flex-wrap gap-2">
									{project.stack.map((tech) => (
										<span
											key={tech}
											className="text-xs px-2.5 py-1 bg-neutral-800/50 rounded-md text-neutral-400 border border-neutral-800"
										>
											{tech}
										</span>
									))}
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* Callpoint for other projects */}
				<div className="mt-12 text-center">
					<p className="text-neutral-500 text-sm">
						Looking for older work?{" "}
						<Link href="#projects" className="text-teal-500 hover:underline">
							View the Experiment Archive
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
};
