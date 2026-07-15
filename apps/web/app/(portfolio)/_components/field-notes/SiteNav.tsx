import { BrandMark } from "./BrandMark";
import { nav } from "./content";

export function SiteNav() {
	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-[#fbfaf7]/90 backdrop-blur-md">
			<nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
				<a
					href="/#top"
					className="flex min-h-11 items-center gap-3 text-sm font-semibold tracking-[-0.02em] text-[#171717] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb]"
				>
					<BrandMark />
					<span className="hidden min-[390px]:inline">arya teja.</span>
				</a>

				<ul className="hidden items-center gap-7 md:flex">
					{nav.map((item) => (
						<li key={item.href}>
							<a
								href={item.href}
								className="inline-flex min-h-11 items-center text-sm text-[#56544f] transition-colors hover:text-[#171717] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb]"
							>
								{item.label}
							</a>
						</li>
					))}
					<li>
						<a
							href="mailto:aryateja2106@gmail.com?subject=Applied%20AI%20role%20or%20project"
							className="inline-flex min-h-11 items-center rounded-lg bg-[#171717] px-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb]"
						>
							Start a conversation
						</a>
					</li>
				</ul>

				<details className="group md:hidden">
					<summary
						aria-label="Toggle navigation menu"
						className="flex size-11 cursor-pointer list-none items-center justify-center rounded-lg border-2 border-[#171717] text-[#171717] transition-colors hover:bg-[#b8ef36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb] [&::-webkit-details-marker]:hidden"
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

					<div className="absolute right-6 top-full z-10 mt-2 w-[min(18rem,calc(100vw-3rem))] rounded-lg border-2 border-[#171717] bg-white shadow-[6px_6px_0_#171717]">
						<ul className="divide-y-2 divide-[#171717]">
							{nav.map((item, index) => (
								<li key={item.href}>
									<a
										href={item.href}
										className="flex min-h-14 items-center justify-between px-5 font-mono text-xs uppercase tracking-[0.18em] text-[#171717] transition-colors hover:bg-[#b8ef36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#2563eb]"
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
