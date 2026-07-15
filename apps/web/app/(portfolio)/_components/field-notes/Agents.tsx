import { agents, experience } from "./content";

export function Agents() {
	return (
		<>
			<section
				id="work"
				className="scroll-mt-20 bg-[#12110f] py-16 text-[#f7f2e8] md:py-24"
			>
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

					<div className="grid border-b border-[#f7f2e8]/15 md:grid-cols-2">
						{agents.items.map((item) => (
							<article
								key={item.name}
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
							</article>
						))}
					</div>
				</div>
			</section>

			<section
				id="experience"
				className="scroll-mt-20 bg-[#1c1a17] py-16 text-[#f7f2e8] md:py-24"
			>
				<div className="mx-auto max-w-6xl px-5 md:px-8">
					<p className="font-mono text-xs uppercase tracking-[0.24em] text-[#b9b0a2]">
						{experience.tag}
					</p>
					<div className="mt-3 grid gap-6 border-b border-[#f7f2e8]/15 pb-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
						<h2 className="max-w-3xl font-serif text-[clamp(38px,6vw,72px)] leading-[0.98]">
							{experience.title}
						</h2>
						<p className="max-w-xl text-base leading-7 text-[#d8d0c3]/80">
							{experience.note}
						</p>
					</div>

					<div className="divide-y divide-[#f7f2e8]/15">
						{experience.items.map((item) => (
							<article
								key={item.name}
								className="grid gap-3 py-7 md:grid-cols-[0.8fr_1fr_1.7fr] md:gap-8"
							>
								<h3 className="font-serif text-2xl">{item.name}</h3>
								<p className="font-mono text-[11px] uppercase leading-5 tracking-[0.16em] text-[#b9b0a2]">
									{item.role}
								</p>
								<p className="text-sm leading-6 text-[#d8d0c3]/80">
									{item.detail}
								</p>
							</article>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
