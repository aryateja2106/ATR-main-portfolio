import { writing } from "./content";

const writingCardColors = ["bg-white", "bg-[#b8ef36]", "bg-[#cdb6ff]"] as const;

export function Writing() {
	return (
		<section
			id="writing"
			className="scroll-mt-20 border-b-2 border-[#171717] bg-[#2563eb] py-20 text-[#171717] md:py-28"
		>
			<div className="mx-auto max-w-6xl px-5 md:px-8">
				<div className="mx-auto max-w-4xl text-center">
					<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/75">
						{writing.tag}
					</p>
					<h2 className="mt-4 font-sans text-[clamp(54px,9vw,108px)] font-semibold leading-[0.88] tracking-[-0.07em]">
						Ideas that compound.
					</h2>
					<p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/75">
						Build notes, case studies, and practical field guides from the
						systems I am testing in public.
					</p>
				</div>

				<div className="mt-14 grid gap-6 md:grid-cols-3">
					{writing.items.map((item, index) => (
						<article
							key={item.title}
							className={`group rounded-xl border-2 border-[#171717] shadow-[8px_8px_0_#171717] transition-transform hover:-translate-y-1 ${writingCardColors[index]}`}
						>
							<a
								href={item.href}
								className="flex min-h-[360px] flex-col p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:p-7"
							>
								<div className="flex items-start justify-between gap-4">
									<p className="font-mono text-[10px] uppercase tracking-[0.18em]">
										0{index + 1} · {item.kind}
									</p>
									<span
										aria-hidden="true"
										className="text-2xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
									>
										↗
									</span>
								</div>
								<h3 className="mt-12 font-sans text-3xl font-semibold leading-[1.02] tracking-[-0.045em]">
									{item.title}
								</h3>
								<p className="mt-5 text-sm leading-6 text-[#171717]/70">
									{item.excerpt}
								</p>
								<span className="mt-auto pt-8 font-mono text-[10px] uppercase tracking-[0.18em] underline decoration-2 underline-offset-8">
									Read the field note
								</span>
							</a>
						</article>
					))}
				</div>

				<div className="mt-14 flex justify-center">
					<a
						href="/blog"
						className="inline-flex min-h-12 items-center rounded-lg border-2 border-[#171717] bg-white px-5 text-sm font-semibold shadow-[5px_5px_0_#171717] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
					>
						Explore all writing{" "}
						<span aria-hidden="true" className="ml-2">
							→
						</span>
					</a>
				</div>
			</div>
		</section>
	);
}
