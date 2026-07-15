import { stack } from "./content";

const categoryLayouts = [
	"md:col-span-7",
	"md:col-span-5",
	"md:col-span-5",
	"md:col-span-7",
] as const;

export function TechStack() {
	return (
		<section
			id="stack"
			className="scroll-mt-20 border-y border-[#171512]/15 bg-[#eee8dc] py-20 text-[#171512] md:py-28"
		>
			<div className="mx-auto max-w-6xl px-5 md:px-8">
				<div className="grid gap-8 md:grid-cols-[1fr_0.72fr] md:items-end">
					<div>
						<p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#615a51]">
							{stack.tag}
						</p>
						<h2 className="mt-4 max-w-4xl font-serif text-[clamp(44px,7vw,82px)] leading-[0.94] tracking-[-0.04em]">
							{stack.title}
						</h2>
					</div>
					<p className="max-w-xl text-base leading-7 text-[#514a42]">
						{stack.note}
					</p>
				</div>

				<div className="mt-14 grid gap-5 md:grid-cols-12">
					{stack.categories.map((category, index) => (
						<details
							key={category.name}
							open={index === 0}
							className={`group rounded-sm border border-[#171512] bg-[#f8f4eb] shadow-[5px_5px_0_#171512] ${categoryLayouts[index]}`}
						>
							<summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#245af5] [&::-webkit-details-marker]:hidden">
								<span>
									<span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-[#746b60]">
										0{index + 1} · {category.detail}
									</span>
									<span className="mt-1 block text-xl font-semibold tracking-[-0.03em]">
										{category.name}
									</span>
								</span>
								<span
									aria-hidden="true"
									className="grid size-9 shrink-0 place-items-center rounded-full border border-[#171512] bg-[#d7e3ff] text-lg transition-transform duration-300 group-open:rotate-45"
								>
									+
								</span>
							</summary>
							<ul className="flex flex-wrap gap-2 border-t border-[#171512]/20 px-5 py-5">
								{category.items.map((item) => (
									<li
										key={item}
										className="rounded-full border border-[#171512]/30 bg-[#eee8dc] px-3 py-2 text-sm transition-colors hover:border-[#171512] hover:bg-[#d7e3ff]"
									>
										{item}
									</li>
								))}
							</ul>
						</details>
					))}
				</div>

				<div className="mt-12 grid gap-4 border-t border-[#171512]/20 pt-7 md:grid-cols-3">
					{stack.principles.map((principle, index) => (
						<p
							key={principle}
							className="flex gap-3 text-sm leading-6 text-[#514a42]"
						>
							<span className="font-mono text-[10px] text-[#245af5]">
								0{index + 1}
							</span>
							{principle}
						</p>
					))}
				</div>
			</div>
		</section>
	);
}
