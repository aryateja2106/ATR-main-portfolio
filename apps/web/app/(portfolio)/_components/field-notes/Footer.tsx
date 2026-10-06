import { BrandMark } from "./BrandMark";
import { footer } from "./content";

export function Footer() {
	return (
		<footer
			id="contact"
			className="scroll-mt-20 border-t border-[#f7f2e8]/15 bg-[#12110f] py-12 text-[#f7f2e8]"
		>
			<div className="mx-auto max-w-6xl px-5 md:px-8">
				<div className="flex flex-col gap-8 border-b border-[#f7f2e8]/15 pb-10 md:flex-row md:items-end md:justify-between">
					<div>
						<div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em]">
							<BrandMark />
							{footer.brand}
						</div>
						<p className="mt-4 max-w-md text-sm leading-6 text-[#c6bdb0]">
							Applied AI systems built close to the problem, tested in context,
							and handed over with evidence.
						</p>
					</div>

					<nav aria-label="Social links" className="flex flex-wrap gap-5">
						{footer.socials.map((social) => (
							<a
								key={social.label}
								href={social.href}
								target="_blank"
								rel="noreferrer"
								className="text-sm font-semibold underline decoration-[#93adff]/50 underline-offset-8 transition-colors hover:text-[#cfdcff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cfdcff]"
							>
								{social.label}
							</a>
						))}
						<a
							href="mailto:aryateja2106@gmail.com"
							className="text-sm font-semibold underline decoration-[#93adff]/50 underline-offset-8 transition-colors hover:text-[#cfdcff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cfdcff]"
						>
							Email
						</a>
					</nav>
				</div>

				<div className="mt-6 flex flex-col gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#9f9588] sm:flex-row sm:items-center sm:justify-between">
					<p>{footer.copyright}</p>
					<p>Content, agents, and accountable delivery.</p>
				</div>
			</div>
		</footer>
	);
}
