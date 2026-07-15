import { writing } from "./content";

export function Writing() {
	return (
		<section
			id="writing"
			className="scroll-mt-20 bg-[#1c1a17] py-16 text-[#f7f2e8] md:py-24"
		>
			<div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[0.8fr_1.2fr] md:px-8">
				<div>
					<p className="font-mono text-xs uppercase tracking-[0.24em] text-[#b9b0a2]">
						{writing.tag}
					</p>
					<h2 className="mt-3 font-serif text-[clamp(38px,6vw,72px)] leading-none">
						{writing.title}
					</h2>
				</div>

				<div className="border-t border-[#f7f2e8]/15">
					{writing.items.map((item) => (
						<article
							key={item.title}
							className="group border-b border-[#f7f2e8]/15 py-8"
						>
							<a href={item.href} className="block">
								<div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
									<p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#b9b0a2]">
										{item.kind}
									</p>
									<div className="max-w-2xl">
										<h3 className="font-serif text-3xl leading-tight transition-colors group-hover:text-white">
											{item.title}
										</h3>
										<p className="mt-4 text-base leading-7 text-[#d8d0c3]/80">
											{item.excerpt}
										</p>
									</div>
								</div>
							</a>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
