"use client";

import { motion } from "framer-motion";

import { agents } from "./content";
import { fadeUp, reveal, stagger } from "./motion";

export function Agents() {
	return (
		<section id="work" className="bg-[#12110f] py-24 text-[#f7f2e8]">
			<div className="mx-auto max-w-6xl px-5 md:px-8">
				<div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#f7f2e8]/15 pb-8">
					<div>
						<p className="font-mono text-xs uppercase tracking-[0.24em] text-[#b9b0a2]">
							{agents.tag}
						</p>
						<h2 className="mt-3 font-serif text-[clamp(38px,6vw,72px)] leading-none">
							{agents.title}
						</h2>
					</div>
					<a
						href="mailto:aryateja2106@gmail.com"
						className="rounded-sm border border-[#f7f2e8]/25 px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[#f7f2e8] transition-colors hover:border-[#f7f2e8]/60"
					>
						Start a conversation
					</a>
				</div>

				<motion.div
					className="grid border-b border-[#f7f2e8]/15 md:grid-cols-2"
					variants={stagger(0.08)}
					{...reveal}
				>
					{agents.items.map((item) => (
						<motion.article
							key={item.name}
							variants={fadeUp}
							className="group border-t border-[#f7f2e8]/15 py-8 md:min-h-72 md:border-r md:px-8 md:odd:pl-0 md:even:border-r-0"
						>
							<p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#b9b0a2]">
								{item.mark}
							</p>
							<h3 className="mt-6 font-serif text-4xl leading-tight text-[#f7f2e8]">
								{item.name}
							</h3>
							<p className="mt-5 max-w-xl text-base leading-7 text-[#d8d0c3]/80">
								{item.desc}
							</p>
							<a
								href={item.href}
								target={item.href.startsWith("http") ? "_blank" : undefined}
								rel={item.href.startsWith("http") ? "noreferrer" : undefined}
								className="mt-8 inline-flex font-mono text-xs uppercase tracking-[0.22em] text-[#f7f2e8] underline decoration-[#b9b0a2]/40 underline-offset-8 transition-colors group-hover:text-white"
							>
								{item.cta}
							</a>
						</motion.article>
					))}
				</motion.div>
			</div>
		</section>
	);
}
