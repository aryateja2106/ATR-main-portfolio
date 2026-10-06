import Image from "next/image";

import { journey } from "./content";

function PhotoCard({
	src,
	alt,
	caption,
	className,
	aspectClass,
	shadowClass,
	objectPosition = "object-center",
	sizes = "(max-width: 768px) 100vw, 33vw",
}: {
	src: string;
	alt: string;
	caption: string;
	className?: string;
	aspectClass: string;
	shadowClass: string;
	objectPosition?: string;
	sizes?: string;
}) {
	return (
		<div className={className}>
			<div
				className={`group relative ${aspectClass} ${shadowClass} overflow-hidden rounded-xl border-2 border-white bg-[#2b2925] transition-transform duration-300 hover:-translate-y-1`}
			>
				<Image
					src={src}
					alt={alt}
					fill
					sizes={sizes}
					className={`object-cover ${objectPosition} saturate-[0.7] transition duration-500 group-hover:scale-[1.025] group-hover:saturate-100`}
				/>
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-transparent to-black/10" />
				<span className="absolute bottom-4 left-4 right-4 w-fit rounded-full border-2 border-[#171717] bg-white px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[#171717]">
					{caption}
				</span>
			</div>
		</div>
	);
}

export function Journey() {
	return (
		<section
			id="about"
			className="scroll-mt-20 border-y-2 border-[#171717] bg-[#171717] py-20 text-white md:py-28"
		>
			<div className="mx-auto max-w-6xl px-5 md:px-8">
				<div className="grid gap-8 md:grid-cols-[1fr_0.7fr] md:items-end">
					<div>
						<span className="inline-flex rounded-full border border-white/70 bg-[#cfdcff] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#171717]">
							{journey.tag}
						</span>
						<h2 className="mt-5 font-sans text-[clamp(48px,8vw,100px)] font-semibold leading-[0.88] tracking-[-0.065em]">
							{journey.title}
						</h2>
					</div>
					<div className="relative pb-2 md:pb-4">
						<svg
							aria-hidden="true"
							viewBox="0 0 420 100"
							className="mb-2 h-auto w-full text-[#93adff]"
						>
							<path
								d="M8 32C96 2 141 83 226 48c61-25 105-24 170 18"
								fill="none"
								stroke="currentColor"
								strokeDasharray="7 10"
								strokeLinecap="round"
								strokeWidth="3"
							/>
							<path
								d="m382 52 17 15-22 4"
								fill="none"
								stroke="currentColor"
								strokeWidth="3"
							/>
						</svg>
						<p className="max-w-xl text-sm leading-6 text-white/65">
							{journey.note}
						</p>
					</div>
				</div>

				<div className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-3">
					<PhotoCard
						src={journey.feature.src}
						alt={journey.feature.alt}
						caption={journey.feature.caption}
						aspectClass="aspect-[3/4]"
						shadowClass="shadow-[7px_7px_0_#4968bd]"
						className="md:col-start-1 md:row-span-2"
					/>
					<PhotoCard
						src={journey.photos[0].src}
						alt={journey.photos[0].alt}
						caption={journey.photos[0].caption}
						aspectClass="aspect-[3/2]"
						shadowClass="shadow-[7px_7px_0_#7c5b49]"
						className="md:col-start-2 md:row-start-1"
					/>
					<PhotoCard
						src={journey.photos[1].src}
						alt={journey.photos[1].alt}
						caption={journey.photos[1].caption}
						aspectClass="aspect-[3/2]"
						shadowClass="shadow-[7px_7px_0_#4968bd]"
						className="md:col-start-3 md:row-start-1 md:translate-y-8"
					/>
					<PhotoCard
						src={journey.photos[2].src}
						alt={journey.photos[2].alt}
						caption={journey.photos[2].caption}
						aspectClass="aspect-[4/5] md:aspect-[3/2]"
						shadowClass="shadow-[7px_7px_0_#7c5b49]"
						objectPosition={journey.photos[2].objectPosition}
						className="md:col-start-2 md:row-start-2"
					/>
					<PhotoCard
						src={journey.photos[3].src}
						alt={journey.photos[3].alt}
						caption={journey.photos[3].caption}
						aspectClass="aspect-[3/2]"
						shadowClass="shadow-[7px_7px_0_#4968bd]"
						className="md:col-start-3 md:row-start-2 md:translate-y-8"
					/>
					<PhotoCard
						src={journey.photos[4].src}
						alt={journey.photos[4].alt}
						caption={journey.photos[4].caption}
						aspectClass="aspect-[3/2]"
						shadowClass="shadow-[7px_7px_0_#7c5b49]"
						sizes="(max-width: 768px) 100vw, 100vw"
						className="mt-1 md:col-span-3 md:col-start-1 md:row-start-3 md:mt-10"
					/>
				</div>
			</div>
		</section>
	);
}
