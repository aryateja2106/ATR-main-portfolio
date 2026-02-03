"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center bg-black text-white p-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-center space-y-8"
			>
				{/* 404 Glitch Effect */}
				<div className="relative">
					<h1 className="text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500 blur-[2px] opacity-50 absolute inset-0 animate-pulse">
						404
					</h1>
					<h1 className="text-9xl font-bold tracking-tighter relative z-10 text-white">
						404
					</h1>
				</div>

				<div className="space-y-4 max-w-md mx-auto">
					<h2 className="text-2xl md:text-3xl font-light tracking-tight text-neutral-300">
						Page not found
					</h2>
					<p className="text-neutral-500">
						The page you are looking for has been moved, deleted, or possibly
						never existed.
					</p>
				</div>

				<div className="pt-8">
					<Link
						href="/"
						className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-900 px-8 font-medium text-neutral-200 transition-all duration-300 hover:bg-neutral-800 hover:text-white border border-neutral-800 hover:border-teal-500/50"
					>
						<span className="mr-2">Return Home</span>
						<svg
							className="h-4 w-4 transition-transform group-hover:translate-x-1"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
							<title>Arrow Right</title>
						</svg>
						<div className="absolute inset-0 -z-10 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
					</Link>
				</div>
			</motion.div>

			{/* Background decoration */}
			<div className="fixed inset-0 -z-10 h-full w-full bg-black">
				<div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
			</div>
		</div>
	);
}
