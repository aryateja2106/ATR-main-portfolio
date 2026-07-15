import { agents, experience } from "./content";

const workCardColors = [
	"bg-white",
	"bg-[#b8ef36]",
	"bg-[#cdb6ff]",
	"bg-[#f8e36e]",
] as const;

export function Agents() {
	return (
		<>
			<section
				id="work"
				className="scroll-mt-20 border-y-2 border-[#171717] bg-[#ff654f] py-20 text-[#171717] md:py-28"
			>
				<div className="mx-auto max-w-6xl px-5 md:px-8">
					<div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
						<div className="max-w-4xl">
							<p className="font-mono text-[11px] uppercase tracking-[0.2em]">
								{agents.tag}
							</p>
							<h2 className="mt-4 max-w-4xl font-sans text-[clamp(48px,7vw,92px)] font-semibold leading-[0.88] tracking-[-0.065em]">
								{agents.title}
							</h2>
						</div>
						<a
							href="mailto:aryateja2106@gmail.com"
							className="inline-flex min-h-12 items-center justify-center rounded-lg border-2 border-[#171717] bg-[#171717] px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
						>
							Start a conversation{" "}
							<span aria-hidden="true" className="ml-2">
								↗
							</span>
						</a>
					</div>

					<div className="mt-14 grid gap-6 md:grid-cols-2">
						{agents.items.map((item, index) => (
							<article
								key={item.name}
								className={`group flex min-h-80 flex-col rounded-xl border-2 border-[#171717] p-6 shadow-[8px_8px_0_#171717] transition-transform hover:-translate-y-1 md:p-8 ${workCardColors[index]}`}
							>
								<div className="flex items-start justify-between gap-5">
									<p className="font-mono text-[10px] uppercase tracking-[0.2em]">
										{item.mark}
									</p>
									<span
										aria-hidden="true"
										className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-[#171717] bg-white text-lg transition-transform group-hover:rotate-12"
									>
										↗
									</span>
								</div>
								<h3 className="mt-10 font-sans text-[clamp(34px,4vw,54px)] font-semibold leading-[0.95] tracking-[-0.05em]">
									{item.name}
								</h3>
								<p className="mt-5 max-w-xl text-base leading-7 text-[#171717]/75">
									{item.desc}
								</p>
								<a
									href={item.href}
									target={item.href.startsWith("http") ? "_blank" : undefined}
									rel={item.href.startsWith("http") ? "noreferrer" : undefined}
									className="mt-auto pt-8 font-mono text-[11px] uppercase tracking-[0.18em] underline decoration-2 underline-offset-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb]"
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
				className="scroll-mt-20 bg-[#fbfaf7] py-20 text-[#171717] md:py-28"
			>
				<div className="mx-auto max-w-6xl px-5 md:px-8">
					<div className="grid gap-8 md:grid-cols-[1fr_0.72fr] md:items-end">
						<div>
							<p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#56544f]">
								{experience.tag}
							</p>
							<h2 className="mt-4 font-sans text-[clamp(48px,7vw,92px)] font-semibold leading-[0.88] tracking-[-0.065em]">
								{experience.title}
							</h2>
						</div>
						<div className="rounded-xl border-2 border-[#171717] bg-[#2563eb] p-6 text-white shadow-[8px_8px_0_#171717]">
							<p className="font-serif text-2xl leading-snug">
								{experience.note}
							</p>
							<p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
								Problem → prototype → proof → handoff
							</p>
						</div>
					</div>

					<div className="relative mt-16">
						<div
							aria-hidden="true"
							className="absolute bottom-8 left-6 top-8 hidden border-l-2 border-dashed border-[#171717]/30 md:block"
						/>
						<div className="space-y-6">
							{experience.items.map((item, index) => (
								<article
									key={item.name}
									className="relative grid gap-4 rounded-xl border-2 border-[#171717] bg-white p-6 shadow-[6px_6px_0_#d9d6cf] md:grid-cols-[64px_0.8fr_1fr_1.6fr] md:items-center md:gap-7"
								>
									<span className="relative z-10 grid size-12 place-items-center rounded-full border-2 border-[#171717] bg-[#b8ef36] font-mono text-xs font-semibold">
										0{index + 1}
									</span>
									<h3 className="font-sans text-2xl font-semibold tracking-[-0.04em]">
										{item.name}
									</h3>
									<p className="font-mono text-[10px] uppercase leading-5 tracking-[0.14em] text-[#56544f]">
										{item.role}
									</p>
									<p className="text-sm leading-6 text-[#56544f]">
										{item.detail}
									</p>
								</article>
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
