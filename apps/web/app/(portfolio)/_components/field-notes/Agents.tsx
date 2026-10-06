import { agents, experience } from "./content";

export function Agents() {
	return (
		<>
			<section
				id="work"
				className="scroll-mt-20 bg-[#171512] py-20 text-[#f7f2e8] md:py-28"
			>
				<div className="mx-auto max-w-6xl px-5 md:px-8">
					<div className="grid gap-7 md:grid-cols-[1fr_auto] md:items-end">
						<div>
							<p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#bcb2a4]">
								{agents.tag}
							</p>
							<h2 className="mt-4 font-serif text-[clamp(46px,7vw,82px)] leading-[0.94] tracking-[-0.04em]">
								{agents.title}
							</h2>
						</div>
						<a
							href="mailto:aryateja2106@gmail.com"
							className="inline-flex min-h-12 items-center justify-center rounded-sm border border-[#f7f2e8]/30 px-5 text-sm font-semibold transition-colors hover:border-[#cfdcff] hover:bg-[#cfdcff] hover:text-[#12110f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cfdcff]"
						>
							Share a problem{" "}
							<span aria-hidden="true" className="ml-2">
								↗
							</span>
						</a>
					</div>

					<div className="mt-12 overflow-hidden border-y border-[#f7f2e8]/20 md:grid md:grid-cols-2">
						{agents.items.map((item, index) => (
							<article
								key={item.name}
								className={`group flex min-h-72 flex-col border-[#f7f2e8]/20 py-8 transition-colors md:px-8 ${
									index % 2 === 0 ? "md:border-r" : ""
								} ${index < 2 ? "border-b" : ""} ${index % 2 === 0 ? "md:pl-0" : "md:pr-0"}`}
							>
								<div className="flex items-start justify-between gap-4">
									<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#bcb2a4]">
										{item.mark}
									</p>
									<span
										aria-hidden="true"
										className="text-[#93adff] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
									>
										↗
									</span>
								</div>
								<h3 className="mt-8 font-serif text-[clamp(32px,4vw,48px)] leading-none">
									{item.name}
								</h3>
								<p className="mt-5 max-w-xl text-base leading-7 text-[#ddd5c9]/80">
									{item.desc}
								</p>
								<a
									href={item.href}
									target={item.href.startsWith("http") ? "_blank" : undefined}
									rel={item.href.startsWith("http") ? "noreferrer" : undefined}
									className="mt-auto pt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-[#cfdcff] underline decoration-[#93adff]/50 underline-offset-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cfdcff]"
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
				className="scroll-mt-20 bg-[#eee8dc] py-20 text-[#171512] md:py-28"
			>
				<div className="mx-auto max-w-6xl px-5 md:px-8">
					<div className="grid gap-8 md:grid-cols-[1fr_0.7fr] md:items-end">
						<div>
							<p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#615a51]">
								{experience.tag}
							</p>
							<h2 className="mt-4 max-w-4xl font-serif text-[clamp(44px,7vw,82px)] leading-[0.94] tracking-[-0.04em]">
								{experience.title}
							</h2>
						</div>
						<div className="rounded-sm border border-[#171512] bg-[#cfdcff] p-6 shadow-[5px_5px_0_#171512]">
							<p className="font-serif text-2xl leading-snug">
								{experience.note}
							</p>
							<p className="mt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-[#4e5875]">
								Problem · prototype · proof · handoff
							</p>
						</div>
					</div>

					<div className="mt-14 border-t border-[#171512]/20">
						{experience.items.map((item, index) => (
							<article
								key={item.name}
								className="grid gap-3 border-b border-[#171512]/20 py-7 md:grid-cols-[56px_0.8fr_1fr_1.7fr] md:items-start md:gap-7"
							>
								<span className="grid size-10 place-items-center rounded-full border border-[#171512] bg-[#f8f4eb] font-mono text-[10px]">
									0{index + 1}
								</span>
								<h3 className="font-serif text-2xl">{item.name}</h3>
								<p className="font-mono text-[10px] uppercase leading-5 tracking-[0.14em] text-[#615a51]">
									{item.role}
								</p>
								<p className="text-sm leading-6 text-[#514a42]">
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
