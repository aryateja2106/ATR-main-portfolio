import { motion } from "framer-motion";
import Link from "next/link";

import { ExploreButton } from "./explore-button";
import { Typewriter } from "./typewriter";

export function Hero() {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 30, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.8,
				ease: [0.2, 0.65, 0.3, 0.9],
			},
		},
	};

	return (
		<section className="w-full min-h-[90vh] flex items-center justify-center relative overflow-hidden pt-28 pb-20">
			{/* Background gradient */}
			<div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/10 via-background to-background" />

			<div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<motion.div
					className="flex flex-col items-center text-center gap-8"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					{/* Name */}
					<motion.div className="relative" variants={itemVariants}>
						<h1 className="text-6xl md:text-7xl lg:text-8xl tracking-tighter font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-foreground/50 pb-2">
							Arya Teja Rudraraju
						</h1>
					</motion.div>

					{/* Title + Tagline */}
					<motion.div variants={itemVariants} className="space-y-3">
						<p className="text-2xl md:text-3xl font-semibold text-foreground">
							AI Agent Engineer & Founder
						</p>
						<p className="text-lg md:text-xl text-teal-400 font-medium">
							Building the agent economy from San Francisco
						</p>
					</motion.div>

					{/* Typewriter */}
					<motion.div variants={itemVariants} className="relative w-full max-w-xl">
						<span className="flex w-full items-center justify-center text-xl md:text-2xl text-muted-foreground font-mono">
							<span className="text-teal-500 mr-4">/</span>
							<Typewriter
								words={[
									"Founder of CloudAGI & LeSearch AI",
									"Shipping agents to production",
									"Rust, TypeScript, Swift, Python",
									"6 shipped products, 150+ user interviews",
								]}
								loop
								cursor
								cursorStyle="_"
								typeSpeed={60}
								deleteSpeed={40}
								delaySpeed={2000}
							/>
						</span>
					</motion.div>

					{/* Value Proposition */}
					<motion.p
						className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl"
						variants={itemVariants}
					>
						I build{" "}
						<span className="text-foreground font-medium">AI agents</span> that
						ship to production. From a{" "}
						<span className="text-teal-400">13-crate Rust coding agent</span> to
						an{" "}
						<span className="text-teal-400">
							iOS app on the App Store
						</span>{" "}
						to{" "}
						<span className="text-teal-400">
							reproducing cutting-edge ML research
						</span>
						— I turn ideas into working software.
					</motion.p>

					{/* CTAs */}
					<motion.div
						className="flex flex-col sm:flex-row gap-4 pt-4"
						variants={itemVariants}
					>
						{/* Primary: View Projects */}
						<Link
							href="#projects"
							className="group relative px-8 py-4 bg-teal-500 text-neutral-950 font-bold rounded-full hover:bg-teal-400 transition-all duration-300 text-center inline-flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-1"
						>
							<span className="relative z-10">View Projects</span>
							<svg
								className="w-4 h-4 transition-transform group-hover:translate-y-0.5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<title>Arrow down</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 14l-7 7m0 0l-7-7m7 7V3"
								/>
							</svg>
						</Link>

						{/* Secondary: Download Resume */}
						<a
							href="/resume.pdf"
							download="Arya_Teja_Resume_2026.pdf"
							className="group relative px-8 py-4 border border-border text-foreground font-medium rounded-full hover:bg-secondary transition-all duration-300 text-center inline-flex items-center justify-center gap-2"
						>
							<span className="relative z-10">Download Resume</span>
							<svg
								className="w-4 h-4 transition-transform group-hover:translate-x-1"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<title>Download icon</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M14 5l7 7m0 0l-7 7m7-7H3"
								/>
							</svg>
						</a>

						{/* Tertiary: Launch AryaOS */}
						<a
							href="https://os.aryateja.com"
							target="_blank"
							rel="noopener noreferrer"
							className="group relative px-8 py-4 border border-teal-500/30 text-teal-400 font-medium rounded-full hover:bg-teal-500/10 hover:border-teal-500/50 transition-all duration-300 text-center inline-flex items-center justify-center gap-2"
						>
							<span className="relative z-10">Launch AryaOS</span>
							<svg
								className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<title>External link</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
								/>
							</svg>
						</a>
					</motion.div>

					{/* Explore button */}
					<motion.div
						className="mt-8 opacity-50 hover:opacity-100 transition-opacity"
						variants={itemVariants}
					>
						<ExploreButton />
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
