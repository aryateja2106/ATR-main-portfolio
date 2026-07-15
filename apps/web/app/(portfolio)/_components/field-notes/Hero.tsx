import Image from "next/image";

import { hero } from "./content";

const process = ["Discover", "Build", "Prove"] as const;

export function Hero() {
	return (
		<section
			id="top"
			className="relative isolate flex min-h-[92svh] w-full overflow-hidden bg-[#12110f] text-[#f7f2e8]"
		>
			<Image
				src={hero.portrait}
				alt={hero.portraitAlt}
				fill
				preload
				sizes="100vw"
				className="absolute inset-0 -z-20 object-cover object-[62%_35%] opacity-45 saturate-[0.35]"
			/>
			<div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(18,17,15,0.99)_0%,rgba(18,17,15,0.82)_48%,rgba(18,17,15,0.42)_100%)]" />
			<div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[linear-gradient(0deg,#12110f_0%,rgba(18,17,15,0)_100%)]" />

			<div className="mx-auto flex min-h-[92svh] w-full max-w-6xl flex-col justify-end px-5 pb-10 pt-28 md:px-8 md:pb-12">
				<div className="max-w-4xl">
					<p className="font-mono text-xs uppercase tracking-[0.24em] text-[#c6bdb0]">
						{hero.kicker}
					</p>

					<h1
						className="mt-6 font-serif font-medium leading-[0.9] tracking-[-0.045em] text-[#f7f2e8]"
						style={{ fontSize: "clamp(48px, 11vw, 108px)" }}
					>
						{hero.headline.map((line, index) => (
							<span
								key={line}
								className={
									index === hero.headline.length - 1
										? "block text-[#cfdcff]"
										: "block"
								}
							>
								{line}
								{index < hero.headline.length - 1 ? " " : null}
							</span>
						))}
					</h1>

					<p className="mt-7 max-w-2xl text-lg leading-8 text-[#ddd5c9]">
						{hero.lede}
					</p>
					<p className="mt-4 max-w-3xl font-mono text-[10px] uppercase leading-6 tracking-[0.16em] text-[#bcb2a4]">
						{hero.availability}
					</p>

					<div className="mt-8 flex flex-wrap gap-3">
						<a
							href={hero.cta.href}
							className="inline-flex min-h-12 items-center rounded-sm bg-[#f7f2e8] px-5 text-sm font-semibold text-[#12110f] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cfdcff]"
						>
							{hero.cta.label}{" "}
							<span aria-hidden="true" className="ml-2">
								↗
							</span>
						</a>
						<a
							href={hero.secondaryCta.href}
							className="inline-flex min-h-12 items-center rounded-sm border border-[#f7f2e8]/35 bg-[#12110f]/35 px-5 text-sm font-semibold text-[#f7f2e8] transition-colors hover:border-[#cfdcff] hover:bg-[#cfdcff] hover:text-[#12110f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cfdcff]"
						>
							{hero.secondaryCta.label}
						</a>
					</div>
				</div>

				<ol
					aria-label="How I deliver"
					className="mt-12 flex max-w-xl flex-wrap gap-x-8 gap-y-3 border-t border-[#f7f2e8]/20 pt-5"
				>
					{process.map((step, index) => (
						<li
							key={step}
							className="flex items-center gap-2 text-sm text-[#ddd5c9]"
						>
							<span className="font-mono text-[9px] text-[#93adff]">
								0{index + 1}
							</span>
							{step}
						</li>
					))}
				</ol>

				<div className="mt-10 grid border-y border-[#f7f2e8]/15 md:grid-cols-3">
					{hero.records.map((record) => (
						<div
							key={record.label}
							className="border-[#f7f2e8]/15 py-5 md:border-r md:px-5 md:last:border-r-0"
						>
							<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#bcb2a4]">
								{record.label}
							</p>
							<p className="mt-2 font-serif text-2xl text-[#f7f2e8]">
								{record.value}
							</p>
							<p className="mt-2 max-w-sm text-sm leading-6 text-[#ddd5c9]/80">
								{record.detail}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
