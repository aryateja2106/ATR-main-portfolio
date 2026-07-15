import { BrandMark } from "./BrandMark";
import { nav } from "./content";

export function SiteNav() {
	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b border-[#f7f2e8]/15 bg-[#12110f]/90 backdrop-blur-md">
			<nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
				<a
					href="/#top"
					className="flex min-h-11 items-center gap-3 font-mono text-sm uppercase tracking-wide text-[#f7f2e8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f7f2e8]"
				>
					<BrandMark />
					<span className="hidden min-[390px]:inline">Arya Teja</span>
				</a>

				<ul className="hidden items-center gap-8 md:flex">
					{nav.map((item) => (
						<li key={item.href}>
							<a
								href={item.href}
								className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-wide text-[#f7f2e8]/70 transition-colors hover:text-[#f7f2e8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f7f2e8]"
							>
								{item.label}
							</a>
						</li>
					))}
				</ul>

				<details className="group md:hidden">
					<summary
						aria-label="Toggle navigation menu"
						className="flex size-11 cursor-pointer list-none items-center justify-center border border-[#f7f2e8]/20 text-[#f7f2e8] transition-colors hover:border-[#f7f2e8]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f7f2e8] [&::-webkit-details-marker]:hidden"
					>
						<svg
							aria-hidden="true"
							className="size-5 group-open:hidden"
							fill="none"
							viewBox="0 0 20 20"
						>
							<path
								d="M2 5.5h16M2 10h16M2 14.5h16"
								stroke="currentColor"
								strokeWidth="1.25"
							/>
						</svg>
						<svg
							aria-hidden="true"
							className="hidden size-5 group-open:block"
							fill="none"
							viewBox="0 0 20 20"
						>
							<path
								d="m4 4 12 12M16 4 4 16"
								stroke="currentColor"
								strokeWidth="1.25"
							/>
						</svg>
					</summary>

					<div className="absolute right-6 top-full z-10 mt-px w-[min(18rem,calc(100vw-3rem))] border border-[#f7f2e8]/15 bg-[#12110f] shadow-2xl shadow-black/40">
						<ul className="divide-y divide-[#f7f2e8]/10">
							{nav.map((item, index) => (
								<li key={item.href}>
									<a
										href={item.href}
										className="flex min-h-14 items-center justify-between px-5 font-mono text-xs uppercase tracking-[0.18em] text-[#f7f2e8]/80 transition-colors hover:bg-[#f7f2e8] hover:text-[#12110f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#f7f2e8]"
									>
										{item.label}
										<span aria-hidden="true" className="text-[9px] opacity-50">
											0{index + 1}
										</span>
									</a>
								</li>
							))}
						</ul>
					</div>
				</details>
			</nav>
		</header>
	);
}
