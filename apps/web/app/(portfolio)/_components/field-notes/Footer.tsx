import { footer } from "./content";

const tileColors = [
	"bg-[#2563eb] text-white",
	"bg-[#b8ef36]",
	"bg-[#f8e36e]",
	"bg-[#ff654f]",
	"bg-[#cdb6ff]",
	"bg-white",
] as const;

const brandTiles = [
	{ id: "arya-a", letter: "a" },
	{ id: "arya-r", letter: "r" },
	{ id: "arya-y", letter: "y" },
	{ id: "arya-a-end", letter: "a" },
	{ id: "teja-t", letter: "t" },
	{ id: "teja-e", letter: "e" },
	{ id: "teja-j", letter: "j" },
	{ id: "teja-a", letter: "a" },
	{ id: "period", letter: "." },
] as const;

export function Footer() {
	return (
		<footer
			id="contact"
			className="scroll-mt-20 bg-[#fbfaf7] py-12 text-[#171717]"
		>
			<div className="mx-auto max-w-6xl px-5 md:px-8">
				<div className="flex flex-col gap-8 border-b border-[#171717]/15 pb-10 md:flex-row md:items-end md:justify-between">
					<div>
						<div className="flex flex-wrap gap-1">
							<span className="sr-only">Arya Teja</span>
							{brandTiles.map((tile, index) => (
								<span
									key={tile.id}
									aria-hidden="true"
									className={`grid size-9 place-items-center rounded-full border-2 border-[#171717] text-sm font-semibold ${tileColors[index % tileColors.length]}`}
								>
									{tile.letter}
								</span>
							))}
						</div>
						<p className="mt-4 max-w-md text-sm leading-6 text-[#56544f]">
							Applied AI systems, built close to the problem and handed over
							with evidence.
						</p>
					</div>

					<nav aria-label="Social links" className="flex flex-wrap gap-5">
						{footer.socials.map((social) => (
							<a
								key={social.label}
								href={social.href}
								target="_blank"
								rel="noreferrer"
								className="text-sm font-semibold underline decoration-2 underline-offset-8 transition-colors hover:text-[#2563eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb]"
							>
								{social.label}
							</a>
						))}
						<a
							href="mailto:aryateja2106@gmail.com"
							className="text-sm font-semibold underline decoration-2 underline-offset-8 transition-colors hover:text-[#2563eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb]"
						>
							Email
						</a>
					</nav>
				</div>

				<div className="mt-6 flex flex-col gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[#908d87] sm:flex-row sm:items-center sm:justify-between">
					<p>{footer.copyright}</p>
					<p>Content and agents. One accountable loop.</p>
				</div>
			</div>
		</footer>
	);
}
