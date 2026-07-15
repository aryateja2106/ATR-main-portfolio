"use client";

import { useRef } from "react";
import { BrandMark } from "./BrandMark";
import { nav } from "./content";

const contactHref =
	"mailto:aryateja2106@gmail.com?subject=Applied%20AI%20role%20or%20project";

export function SiteNav() {
	const menuRef = useRef<HTMLDetailsElement>(null);
	const closeMenu = () => menuRef.current?.removeAttribute("open");

	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b border-[#f7f2e8]/15 bg-[#12110f]/92 text-[#f7f2e8] backdrop-blur-md">
			<nav className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
				<a
					href="/#top"
					className="flex min-h-11 items-center gap-3 text-sm font-semibold tracking-[-0.02em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cfdcff]"
				>
					<BrandMark />
					<span className="hidden min-[390px]:inline">arya teja.</span>
				</a>

				<ul className="hidden items-center gap-5 lg:flex">
					{nav.map((item) => (
						<li key={item.href}>
							<a
								href={item.href}
								className="inline-flex min-h-11 items-center text-sm text-[#c6bdb0] transition-colors hover:text-[#f7f2e8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cfdcff]"
							>
								{item.label}
							</a>
						</li>
					))}
					<li>
						<a
							href={contactHref}
							className="inline-flex min-h-11 items-center rounded-sm bg-[#f7f2e8] px-4 text-sm font-semibold text-[#12110f] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cfdcff]"
						>
							Start a conversation
						</a>
					</li>
				</ul>

				<details ref={menuRef} className="group lg:hidden">
					<summary
						aria-label="Toggle navigation menu"
						className="flex size-11 cursor-pointer list-none items-center justify-center rounded-sm border border-[#f7f2e8]/30 text-[#f7f2e8] transition-colors hover:border-[#cfdcff] hover:bg-[#cfdcff] hover:text-[#12110f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cfdcff] [&::-webkit-details-marker]:hidden"
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
								strokeWidth="1.5"
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
								strokeWidth="1.5"
							/>
						</svg>
					</summary>

					<div className="absolute inset-x-5 top-full z-10 mt-2 overflow-hidden rounded-sm border border-[#f7f2e8]/20 bg-[#171512] shadow-2xl shadow-black/50 md:left-auto md:right-8 md:w-80">
						<ul className="divide-y divide-[#f7f2e8]/10">
							{nav.map((item, index) => (
								<li key={item.href}>
									<a
										href={item.href}
										onClick={closeMenu}
										className="flex min-h-14 items-center justify-between px-5 font-mono text-xs uppercase tracking-[0.16em] text-[#ddd5c9] transition-colors hover:bg-[#cfdcff] hover:text-[#12110f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#cfdcff]"
									>
										{item.label}
										<span aria-hidden="true" className="text-[9px] opacity-60">
											0{index + 1}
										</span>
									</a>
								</li>
							))}
							<li className="p-3">
								<a
									href={contactHref}
									onClick={closeMenu}
									className="flex min-h-12 items-center justify-center rounded-sm bg-[#f7f2e8] px-4 text-sm font-semibold text-[#12110f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cfdcff]"
								>
									Start a conversation
								</a>
							</li>
						</ul>
					</div>
				</details>
			</nav>
		</header>
	);
}
