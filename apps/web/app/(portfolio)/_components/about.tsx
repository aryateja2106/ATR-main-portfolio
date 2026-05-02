"use client";

import { motion, useAnimation, useInView, type Variants } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

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
		title: "From marketing to engineering",
		emoji: "🛠️",
		content:
			"Four years running growth taught me to mine signals, brief teams, and quantify lift. That instinct now drives the engineering work: the same obsession with users, pain points, and revenue moments, but the build is mine.",
	},
	{
		title: "Founding LeSearch AI",
		emoji: "🔍",
		content:
			"LeSearch AI started as a weekend MVP and grew into an AI-native research workspace. I own the synthesis engine, the citation-grounded RAG, and the product roadmap shaped by 30+ user interviews and 50+ beta users.",
	},
	{
		title: "Mobile agents with LeCoder",
		emoji: "📱",
		content:
			"LeCoder MConnect is the laptop-free way to drive AI coding agents. node-pty plus Cloudflare Tunnel plus a QR pairing flow means Claude Code, Cursor, and OpenCode run from a phone. Zero router config. Full TUI fidelity.",
	},
	{
		title: "Building in San Francisco",
		emoji: "🌉",
		content:
			"Now in SF, shipping in public, and stacking the next layer: CloudAGI for small-business agentic workflows and the Software Factory for personal apps that deploy to your own always-on hardware.",
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
			className="relative z-10"
			variants={itemVariants}
			initial="hidden"
			animate={controls}
			custom={index}
		>
			<h3 className="text-xl font-semibold text-teal-400 mb-6 text-center">
				{card.title}
			</h3>
			<div
				ref={refCallback}
				className={`card-content bg-neutral-800/50 backdrop-blur-md rounded-xl p-6 ${
					card.specialBorder
						? "border-x-4 border-x-teal-400 border-b-4 border-b-teal-400"
						: "border-t-4 border-teal-400"
				} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
			>
				<div className="text-3xl text-teal-400 mb-4 text-center">
					{card.emoji}
				</div>
				<p className="text-justify text-neutral-300">{card.content}</p>
			</div>
		</motion.div>
	);
};

export const About = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const introRef = useRef<HTMLDivElement>(null);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
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
		<section id="about" className="w-full py-16">
			<div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					<h2 className="text-4xl sm:text-5xl font-bold mb-3 relative inline-block">
						Marketing to Agentic Engineer
						<motion.span
							className="absolute bottom-0 inset-x-1/4 h-1 bg-teal-400"
							initial={{ scaleX: 0 }}
							whileInView={{ scaleX: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.3 }}
						/>
					</h2>
					<p className="text-xl text-teal-400 mt-4">
						From growth marketing to founding LeSearch AI and CloudAGI
					</p>
					<p className="mt-5 text-sm text-neutral-500 max-w-xl mx-auto">
						<Link href="/about" className="text-teal-400 hover:underline">
							Full bio (/about)
						</Link>
						<span aria-hidden className="mx-2 text-neutral-600">
							·
						</span>
						<Link href="/faq" className="text-teal-400 hover:underline">
							FAQ (/faq)
						</Link>
					</p>
				</motion.div>

				<div ref={containerRef} className="relative">
					{/* Intro Card */}
					<motion.div
						ref={introRef}
						className="bg-neutral-800/50 backdrop-blur-md rounded-xl p-8 border-x-4 border-x-teal-400 shadow-lg mb-16 relative z-10"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<p className="text-lg text-justify text-neutral-300">
							Marketing was the school. The day-to-day was customer interviews,
							creative briefs, and quantifying lift. The pivot was realizing the
							same instincts apply to product and engineering work, with one
							important difference: now I write the code. The cards below trace
							that arc, from running growth to founding LeSearch AI and
							CloudAGI, to shipping LeCoder MConnect from San Francisco.
						</p>
					</motion.div>

					{/* SVG for connecting lines */}
					<svg
						aria-hidden="true"
						className="absolute top-0 left-0 size-full z-0 pointer-events-none"
					>
						{/* Line from intro to first card */}
						{cardRefs.current[0] && (
							<ConnectingLine
								startRef={introRef}
								endRef={{ current: cardRefs.current[0] }}
							/>
						)}

						{/* Lines between cards */}
						{cardRefs.current.map((_, index) => {
							if (
								index < cardRefs.current.length - 1 &&
								cardRefs.current[index] &&
								cardRefs.current[index + 1]
							) {
								return (
									<ConnectingLine
										// biome-ignore lint/suspicious/noArrayIndexKey: connector lines are positional and have no stable identity
										key={`connecting-line-${index}-to-${index + 1}`}
										startRef={{ current: cardRefs.current[index] }}
										endRef={{ current: cardRefs.current[index + 1] }}
									/>
								);
							}
							return null;
						})}
					</svg>

					<motion.div
						className="space-y-24 relative"
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
						className="mt-16 text-center relative z-10"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.8 }}
					>
						<div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
							<Link
								href="/resume"
								className="inline-block px-6 py-3 border-2 border-teal-400 text-teal-400 font-semibold rounded transition-all duration-300 hover:bg-teal-400 hover:text-neutral-900"
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
								className="inline-block px-6 py-3 border-2 border-teal-400 text-teal-400 font-semibold rounded transition-all duration-300 hover:bg-teal-400 hover:text-neutral-900"
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
								className="inline-block px-6 py-3 border-2 border-teal-400 text-teal-400 font-semibold rounded transition-all duration-300 hover:bg-teal-400 hover:text-neutral-900"
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
