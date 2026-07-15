import Image from "next/image";

import { hero } from "./content";

export function Hero() {
	return (
		<section
			id="top"
			className="relative isolate overflow-hidden bg-[#fbfaf7] pb-20 pt-32 text-[#171717] md:pb-28 md:pt-40"
		>
			<div className="pointer-events-none absolute -left-20 top-72 -z-10 size-64 rounded-full bg-[#b8ef36]/35 blur-3xl" />
			<div className="pointer-events-none absolute -right-20 top-40 -z-10 size-72 rounded-full bg-[#cdb6ff]/35 blur-3xl" />

			<div className="mx-auto w-full max-w-6xl px-5 md:px-8">
				<div className="mx-auto max-w-5xl text-center">
					<div
						aria-hidden="true"
						className="mx-auto mb-10 flex max-w-2xl items-center justify-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#56544f]"
					>
						<span className="rotate-[-3deg] rounded-full border-2 border-[#171717] bg-white px-3 py-2">
							Discover
						</span>
						<span className="h-px min-w-8 flex-1 border-t-2 border-dashed border-[#171717]/40" />
						<span className="rotate-[2deg] rounded-full border-2 border-[#171717] bg-[#b8ef36] px-3 py-2">
							Build
						</span>
						<span className="h-px min-w-8 flex-1 border-t-2 border-dashed border-[#171717]/40" />
						<span className="rotate-[-2deg] rounded-full border-2 border-[#171717] bg-[#cdb6ff] px-3 py-2">
							Prove
						</span>
					</div>

					<p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#56544f]">
						{hero.kicker}
					</p>

					<h1 className="mt-7 font-sans text-[clamp(54px,9.5vw,124px)] font-semibold leading-[0.84] tracking-[-0.075em]">
						<span className="block">{hero.headline[0]}</span>
						<span className="mt-3 inline-block rounded-[0.18em] bg-[#2563eb] px-[0.12em] pb-[0.1em] text-white shadow-[0.08em_0.08em_0_#171717]">
							{hero.headline[1]}
						</span>
					</h1>

					<p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[#56544f]">
						{hero.lede}
					</p>
					<p className="mx-auto mt-4 max-w-3xl font-mono text-[10px] uppercase leading-6 tracking-[0.16em] text-[#908d87]">
						{hero.availability}
					</p>

					<div className="mt-8 flex flex-wrap justify-center gap-3">
						<a
							href={hero.cta.href}
							className="inline-flex min-h-12 items-center rounded-lg bg-[#171717] px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb]"
						>
							{hero.cta.label}{" "}
							<span aria-hidden="true" className="ml-2">
								→
							</span>
						</a>
						<a
							href={hero.secondaryCta.href}
							className="inline-flex min-h-12 items-center rounded-lg border-2 border-[#171717] bg-white px-5 text-sm font-semibold text-[#171717] transition-colors hover:bg-[#b8ef36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb]"
						>
							{hero.secondaryCta.label}
						</a>
					</div>
				</div>

				<div className="mt-20 grid overflow-hidden rounded-[18px] border-2 border-[#171717] bg-white shadow-[0_16px_0_#171717] md:grid-cols-[0.38fr_0.62fr]">
					<div className="border-b-2 border-[#171717] bg-[#f4f2ec] p-5 md:border-b-0 md:border-r-2 md:p-7">
						<div className="flex items-center justify-between border-b-2 border-[#171717]/15 pb-4">
							<div>
								<p className="text-sm font-semibold">Field operating system</p>
								<p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[#908d87]">
									Live practice · 2026
								</p>
							</div>
							<span className="size-3 rounded-full bg-[#b8ef36] ring-2 ring-[#171717]" />
						</div>
						<div className="mt-5 space-y-3">
							{hero.records.map((record, index) => (
								<div
									key={record.label}
									className="rounded-lg border-2 border-[#171717]/15 bg-white p-4 first:border-[#171717] first:shadow-[4px_4px_0_#2563eb]"
								>
									<p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#908d87]">
										0{index + 1} · {record.label}
									</p>
									<p className="mt-1 text-base font-semibold tracking-[-0.02em]">
										{record.value}
									</p>
									<p className="mt-2 text-xs leading-5 text-[#56544f]">
										{record.detail}
									</p>
								</div>
							))}
						</div>
					</div>

					<figure className="relative min-h-[420px] overflow-hidden bg-[#d9d6cf] md:min-h-[620px]">
						<Image
							src={hero.portrait}
							alt={hero.portraitAlt}
							fill
							preload
							sizes="(max-width: 768px) 100vw, 62vw"
							className="object-cover object-[62%_35%] saturate-[0.75]"
						/>
						<div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(23,23,23,0.9),transparent)] p-6 pt-24 text-white">
							<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
								Field evidence · Hong Kong
							</p>
							<p className="mt-2 max-w-lg font-serif text-3xl leading-tight">
								Build close to the problem. Leave evidence behind.
							</p>
						</div>
					</figure>
				</div>
			</div>
		</section>
	);
}
