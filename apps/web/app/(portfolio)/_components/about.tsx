"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView, useAnimation, type Variants } from "framer-motion";

// Define card data structure
interface CardData {
	title: string;
	emoji: string;
	content: string;
	specialBorder?: boolean;
}

// Card data array
const cardData: CardData[] = [
	{
		title: "Builder First",
		emoji: "🔨",
		content:
			"I ship products end-to-end. From a 13-crate Rust coding agent with AES-256 encryption to an iOS app on the App Store — I go deep on implementation, not just strategy decks.",
	},
	{
		title: "Agent Infrastructure",
		emoji: "🤖",
		content:
			"I build the plumbing that makes AI agents work in production. Docker MCP servers exposing 77+ tools, Agent Bridge connecting 4 coding agents, multi-model orchestration across Claude, Gemini, and GPT.",
	},
	{
		title: "Founder & Operator",
		emoji: "⚡",
		content:
			"Founded CloudAGI (agent credit economy marketplace) and LeSearch AI (research platform). 150+ user interviews, 6 shipped products, and the judgment to know what to build next.",
	},
	{
		title: "Full-Stack Engineer",
		emoji: "🎯",
		content:
			"Rust, TypeScript, Swift, Python — I pick the right tool for the job. From low-level systems programming to mobile apps to web platforms, I build across the entire stack.",
		specialBorder: true,
	},
];

// Animation variants
const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.3,
		},
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: "spring",
			damping: 15,
			stiffness: 100,
		},
	},
};

const ConnectingLine = ({
	startRef,
	endRef,
}: {
	startRef: React.RefObject<HTMLDivElement | null>;
	endRef: React.RefObject<HTMLDivElement | null>;
}) => {
	const pathRef = useRef<SVGPathElement>(null);
	const circleRef = useRef<SVGCircleElement>(null);

	useEffect(() => {
		const updatePath = () => {
			if (
				!startRef.current ||
				!endRef.current ||
				!pathRef.current ||
				!circleRef.current
			)
				return;

			const startRect = startRef.current.getBoundingClientRect();
			const endRect = endRef.current.getBoundingClientRect();

			const startX = startRect.left + startRect.width / 2;
			const startY = startRect.bottom;
			const endX = endRect.left + endRect.width / 2;
			const endY = endRect.top;

			// Adjust for parent SVG positioning
			if (!pathRef.current.ownerSVGElement) return;
			const parentRect =
				pathRef.current.ownerSVGElement.getBoundingClientRect();
			const adjustedStartX = startX - parentRect.left;
			const adjustedStartY = startY - parentRect.top;
			const adjustedEndX = endX - parentRect.left;
			const adjustedEndY = endY - parentRect.top;

			// Create curved path
			const curveControl = (adjustedStartY + adjustedEndY) / 2;
			const pathData = `M ${adjustedStartX},${adjustedStartY} C ${adjustedStartX},${curveControl} ${adjustedEndX},${curveControl} ${adjustedEndX},${adjustedEndY}`;

			pathRef.current.setAttribute("d", pathData);

			// Update animation path
			const animateMotion = circleRef.current.querySelector("animateMotion");
			if (animateMotion) {
				animateMotion.setAttribute("path", pathData);
			}
		};

		updatePath();
		window.addEventListener("resize", updatePath);
		window.addEventListener("scroll", updatePath);

		// Set an interval to periodically update the path
		// This helps with dynamic content and scrolling
		const interval = setInterval(updatePath, 500);

		return () => {
			window.removeEventListener("resize", updatePath);
			window.removeEventListener("scroll", updatePath);
			clearInterval(interval);
		};
	}, [startRef, endRef]);

	return (
		<>
			<path
				ref={pathRef}
				stroke="#2dd4bf"
				strokeWidth="2"
				fill="none"
				strokeDasharray="5,5"
				strokeLinecap="round"
			>
				<animate
					attributeName="stroke-dashoffset"
					from="100"
					to="0"
					dur="15s"
					repeatCount="indefinite"
				/>
			</path>
			<circle
				ref={circleRef}
				r="4"
				fill="#2dd4bf"
				filter="drop-shadow(0 0 3px rgba(45, 212, 191, 0.8))"
			>
				<animateMotion dur="3s" repeatCount="indefinite" />
			</circle>
		</>
	);
};

const Card = ({
	card,
	index,
	refCallback,
}: {
	card: CardData;
	index: number;
	refCallback: (element: HTMLDivElement | null) => void;
}) => {
	const controls = useAnimation();
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	useEffect(() => {
		if (isInView) {
			controls.start("visible");
		}
	}, [controls, isInView]);

	return (
		<motion.div
			ref={ref}
			className="relative z-10 w-full"
			variants={itemVariants}
			initial="hidden"
			animate={controls}
			custom={index}
		>
			<div
				ref={refCallback}
				className={`glass-panel rounded-2xl p-8 h-full flex flex-col items-start transition-all duration-500 hover:bg-white/10 group ${
					card.specialBorder ? "ring-1 ring-teal-500/20" : ""
				}`}
			>
				<div className="flex items-center gap-4 mb-6">
					<div className="text-4xl p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-300">
						{card.emoji}
					</div>
					<h3 className="text-xl font-semibold text-foreground group-hover:text-teal-400 transition-colors">
						{card.title}
					</h3>
				</div>
				<p className="text-lg leading-relaxed text-muted-foreground font-light text-left group-hover:text-foreground/90 transition-colors">
					{card.content}
				</p>
			</div>
		</motion.div>
	);
};

export const About = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const introRef = useRef<HTMLDivElement>(null);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]); // Keeping ref structure for compatibility but simplified
	const controls = useAnimation();
	const isInView = useInView(containerRef, { once: true, amount: 0.1 });

	useEffect(() => {
		if (isInView) {
			controls.start("visible");
		}
	}, [controls, isInView]);

	const setCardRef = (index: number) => (element: HTMLDivElement | null) => {
		cardRefs.current[index] = element;
	};

	return (
		<section id="about" className="w-full py-32">
			<div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					className="text-center mb-24"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					<h2 className="text-4xl sm:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
						About Me
					</h2>
					<p className="text-xl text-teal-400/80 font-light tracking-wide">
						Engineer, Founder, Builder
					</p>
				</motion.div>

				<div ref={containerRef} className="relative">
					{/* Intro Card */}
					<motion.div
						ref={introRef}
						className="glass-panel rounded-2xl p-10 mb-20 relative z-10"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<p className="text-xl leading-relaxed text-muted-foreground font-light">
							I build AI agents that ship to production. Not demos, not
							prototypes — real software that people use. With an MBA, MS in
							Analytics, and hands-on engineering across four languages, I
							bridge the gap between what AI can do and what businesses actually
							need. Currently building the agent economy from San Francisco.
						</p>
					</motion.div>

					{/* Cards Grid - cleaner layout without SVG lines */}
					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 gap-8 relative"
						variants={containerVariants}
						initial="hidden"
						animate={controls}
					>
						{/* Map through card data */}
						{cardData.map((card, index) => (
							<Card
								key={card.title}
								card={card}
								index={index}
								refCallback={setCardRef(index)}
							/>
						))}
					</motion.div>

					<motion.div
						className="mt-24 text-center relative z-10"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.8 }}
					>
						<div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6">
							<Link
								href="/resume.pdf"
								target="_blank"
								className="inline-block px-8 py-4 bg-teal-500/10 text-teal-400 font-semibold rounded-full border border-teal-500/20 hover:bg-teal-500 hover:text-white transition-all duration-300"
							>
								<motion.span
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3, delay: 0.2 }}
								>
									View My Résumé
								</motion.span>
							</Link>
							<Link
								href="https://linkedin.com/in/arya-teja-rudraraju"
								target="_blank"
								rel="noreferrer"
								className="inline-block px-8 py-4 bg-white/5 text-muted-foreground font-semibold rounded-full border border-white/10 hover:bg-white/10 hover:text-foreground transition-all duration-300"
							>
								<motion.span
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3, delay: 0.3 }}
								>
									Connect on LinkedIn
								</motion.span>
							</Link>
							<Link
								href="https://github.com/aryateja2106"
								target="_blank"
								rel="noreferrer"
								className="inline-block px-8 py-4 bg-white/5 text-muted-foreground font-semibold rounded-full border border-white/10 hover:bg-white/10 hover:text-foreground transition-all duration-300"
							>
								<motion.span
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3, delay: 0.4 }}
								>
									Explore My GitHub
								</motion.span>
							</Link>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

// Support both named and default exports
export default About;
