import Image from "next/image";

import { hero } from "./content";

export function Hero() {
	return (
		<section
			id="top"
			className="relative isolate flex min-h-[88svh] w-full overflow-hidden bg-[#12110f] text-[#f7f2e8]"
		>
			<Image
				src={hero.portrait}
				alt={hero.portraitAlt}
				fill
				preload
				sizes="100vw"
				className="absolute inset-0 -z-20 object-cover object-[62%_35%] opacity-45 saturate-0"
			/>
			<div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(18,17,15,0.98)_0%,rgba(18,17,15,0.76)_48%,rgba(18,17,15,0.45)_100%)]" />
			<div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-[linear-gradient(0deg,#12110f_0%,rgba(18,17,15,0)_100%)]" />

			<div className="mx-auto flex min-h-[88svh] w-full max-w-6xl flex-col justify-end px-5 pb-10 pt-28 md:px-8">
				<div className="max-w-4xl">
					<p className="font-mono text-xs uppercase tracking-[0.26em] text-[#b9b0a2]">
						{hero.kicker}
					</p>

					<h1
						className="mt-6 font-serif font-medium leading-[0.92] text-[#f7f2e8]"
						style={{ fontSize: "clamp(42px, 12vw, 112px)" }}
					>
						{hero.headline.map((line) => (
							<span key={line} className="block">
								{line}
							</span>
						))}
					</h1>

					<p className="mt-6 max-w-2xl text-lg leading-8 text-[#d8d0c3]">
						{hero.lede}
					</p>
					<p className="mt-4 max-w-2xl font-mono text-[11px] uppercase leading-6 tracking-[0.18em] text-[#b9b0a2]">
						{hero.availability}
					</p>

					<div className="mt-8 flex flex-wrap gap-3">
						<a
							href={hero.cta.href}
							className="inline-flex rounded-sm bg-[#f7f2e8] px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[#12110f] transition-colors hover:bg-white"
						>
							{hero.cta.label}
						</a>
						<a
							href={hero.secondaryCta.href}
							className="inline-flex rounded-sm border border-[#f7f2e8]/25 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[#f7f2e8] transition-colors hover:border-[#f7f2e8]/60"
						>
							{hero.secondaryCta.label}
						</a>
					</div>
				</div>

				<div className="mt-14 grid border-y border-[#f7f2e8]/15 md:grid-cols-3">
					{hero.records.map((record) => (
						<div
							key={record.label}
							className="border-[#f7f2e8]/15 py-5 md:border-r md:px-5 md:last:border-r-0"
						>
							<p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#b9b0a2]">
								{record.label}
							</p>
							<p className="mt-2 font-serif text-2xl text-[#f7f2e8]">
								{record.value}
							</p>
							<p className="mt-2 max-w-sm text-sm leading-6 text-[#d8d0c3]/80">
								{record.detail}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
