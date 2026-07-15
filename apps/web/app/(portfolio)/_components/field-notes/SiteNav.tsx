import { BrandMark } from "./BrandMark";
import { nav } from "./content";

export function SiteNav() {
	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b border-[#f7f2e8]/15 bg-[#12110f]/90 backdrop-blur-md">
			<nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
				<a
					href="/#top"
					className="flex min-h-11 items-center gap-3 font-mono text-sm uppercase tracking-wide text-[#f7f2e8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f7f2e8]"
				>
					<BrandMark />
					<span className="hidden min-[390px]:inline">Arya Teja</span>
				</a>

				<ul className="flex items-center gap-4 md:gap-8">
					{nav.map((item) => (
						<li
							key={item.href}
							className={
								item.label === "Writing" || item.label === "Contact"
									? ""
									: "hidden md:block"
							}
						>
							<a
								href={item.href}
								className="inline-flex min-h-11 items-center font-mono text-[10px] uppercase tracking-wide text-[#f7f2e8]/70 transition-colors hover:text-[#f7f2e8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f7f2e8] md:text-xs"
							>
								{item.label}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
