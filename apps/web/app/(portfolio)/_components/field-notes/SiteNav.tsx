"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

import { nav } from "./content";

export function SiteNav() {
	const { scrollY } = useScroll();
	const [scrolled, setScrolled] = useState(false);

	useMotionValueEvent(scrollY, "change", (latest) => {
		setScrolled(latest > 40);
	});

	return (
		<motion.header
			initial={false}
			animate={{
				backgroundColor: scrolled
					? "rgba(18, 17, 15, 0.86)"
					: "rgba(18, 17, 15, 0)",
				borderColor: scrolled
					? "rgba(247, 242, 232, 0.16)"
					: "rgba(247, 242, 232, 0)",
			}}
			transition={{ duration: 0.3, ease: [0.2, 0.65, 0.3, 0.9] }}
			className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
		>
			<nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
				<a
					href="/#top"
					className="flex items-center gap-2 font-mono text-sm uppercase tracking-wide text-[#f7f2e8]"
				>
					<span className="inline-block size-2 bg-[#b9b0a2]" aria-hidden />
					<span>Arya Teja</span>
				</a>

				<ul className="hidden items-center gap-8 md:flex">
					{nav.map((item) => (
						<li key={item.href}>
							<a
								href={item.href}
								className="font-mono text-xs uppercase tracking-wide text-[#f7f2e8]/55 transition-colors hover:text-[#f7f2e8]"
							>
								{item.label}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</motion.header>
	);
}
