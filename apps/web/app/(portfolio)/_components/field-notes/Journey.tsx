import Image from "next/image";

import { journey } from "./content";

function PhotoCard({
	src,
	alt,
	caption,
	className,
	aspectClass,
	objectPosition = "object-center",
	sizes = "(max-width: 768px) 100vw, 33vw",
}: {
	src: string;
	alt: string;
	caption: string;
	className?: string;
	aspectClass: string;
	objectPosition?: string;
	sizes?: string;
}) {
	return (
		<div className={className}>
			<div
				className={`group relative ${aspectClass} overflow-hidden border border-[#f7f2e8]/15`}
			>
				<Image
					src={src}
					alt={alt}
					fill
					sizes={sizes}
					className={`object-cover ${objectPosition} saturate-0 transition duration-500 group-hover:scale-[1.02] group-hover:saturate-50`}
				/>
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#12110f]/80 via-transparent to-black/30" />
				<span className="absolute bottom-3 left-3 right-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f7f2e8]">
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
			className="scroll-mt-20 bg-[#12110f] py-16 text-[#f7f2e8] md:py-24"
		>
			<div className="mx-auto max-w-6xl px-4 md:px-6">
				<div className="flex flex-wrap items-baseline justify-between gap-2">
					<h2 className="font-serif text-[clamp(34px,5vw,58px)] leading-tight">
						{journey.title}
					</h2>
					<span className="font-mono text-xs uppercase tracking-[0.24em] text-[#b9b0a2]">
						{journey.tag}
					</span>
				</div>

				<div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
					<PhotoCard
						src={journey.feature.src}
						alt={journey.feature.alt}
						caption={journey.feature.caption}
						aspectClass="aspect-[3/4]"
						className="md:col-start-1 md:row-span-2"
					/>
					<PhotoCard
						src={journey.photos[0].src}
						alt={journey.photos[0].alt}
						caption={journey.photos[0].caption}
						aspectClass="aspect-[3/2]"
						className="md:col-start-2 md:row-start-1"
					/>
					<PhotoCard
						src={journey.photos[1].src}
						alt={journey.photos[1].alt}
						caption={journey.photos[1].caption}
						aspectClass="aspect-[3/2]"
						className="md:col-start-3 md:row-start-1"
					/>
					<PhotoCard
						src={journey.photos[2].src}
						alt={journey.photos[2].alt}
						caption={journey.photos[2].caption}
						aspectClass="aspect-[4/5] md:aspect-[3/2]"
						objectPosition={journey.photos[2].objectPosition}
						className="md:col-start-2 md:row-start-2"
					/>
					<PhotoCard
						src={journey.photos[3].src}
						alt={journey.photos[3].alt}
						caption={journey.photos[3].caption}
						aspectClass="aspect-[3/2]"
						className="md:col-start-3 md:row-start-2"
					/>
					<PhotoCard
						src={journey.photos[4].src}
						alt={journey.photos[4].alt}
						caption={journey.photos[4].caption}
						aspectClass="aspect-[3/2]"
						sizes="(max-width: 768px) 100vw, 100vw"
						className="md:col-span-3 md:col-start-1 md:row-start-3"
					/>
				</div>

				<p className="mt-6 max-w-2xl font-mono text-[11px] uppercase leading-6 tracking-[0.2em] text-[#b9b0a2]">
					{journey.note}
				</p>
			</div>
		</section>
	);
}
