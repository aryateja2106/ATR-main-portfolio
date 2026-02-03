"use client";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
	return (
		<footer
			id="contact"
			className="relative mt-32 pb-6 overflow-hidden bg-neutral-950"
		>
			{/* Background with stars and cosmic element */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute inset-0 bg-neutral-950" />

				{/* Stars effect - small dots */}
				<div className="stars-small absolute inset-0" />
				<div className="stars-medium absolute inset-0" />

				{/* Cosmic glow effect */}
				<div className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-teal-500/5 blur-[100px]" />
				<div className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] rounded-full bg-teal-400/10 blur-[60px]" />
			</div>

			<div className="w-full px-4 md:max-w-4xl lg:px-0 m-auto pt-16">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
					{/* Left column */}
					<div>
						<h3 className="text-2xl font-bold mb-4">Arya Teja .</h3>
						<p className="text-gray-400 mb-6 font-light leading-relaxed">
							Building{" "}
							<span className="text-teal-400 font-medium">mconnect</span>. An
							open source initiative from{" "}
							<span className="text-teal-400 font-medium">LeSearch AI</span>{" "}
							that connects terminals to the web.
							<br />
							<span className="text-sm text-gray-500 mt-2 block">
								Dev since Dec 2025.
							</span>
						</p>
					</div>

					{/* Middle column - Quick Links */}
					<div>
						<h4 className="text-lg font-semibold mb-6">Quick Links</h4>
						<nav className="flex flex-col space-y-3">
							<Link
								href="/"
								className="text-gray-400 hover:text-teal-400 transition-colors"
							>
								Home
							</Link>
							<Link
								href="/about"
								className="text-gray-400 hover:text-teal-400 transition-colors"
							>
								About
							</Link>
							<Link
								href="/projects"
								className="text-gray-400 hover:text-teal-400 transition-colors"
							>
								Projects
							</Link>
							<Link
								href="/blog"
								className="text-gray-400 hover:text-teal-400 transition-colors"
							>
								Blog
							</Link>
							<Link
								href="/contact"
								className="text-gray-400 hover:text-teal-400 transition-colors"
							>
								Contact
							</Link>
						</nav>
					</div>

					{/* Right column - Get in Touch & Connect */}
					<div className="space-y-8">
						<div>
							<h4 className="text-lg font-semibold mb-6">Get in Touch</h4>
							<div className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 rounded-lg p-4 hover:border-neutral-700 transition-colors">
								<p className="text-sm text-neutral-300 mb-4">
									AI Engineer & Marketing Specialist with a passion for creating
									intelligent solutions that deliver measurable business impact.
								</p>

								<div className="grid grid-cols-2 gap-3">
									<Link
										href="mailto:aryateja2106@gmail.com"
										className="flex items-center justify-center gap-2 py-2 px-3 bg-neutral-800/80 hover:bg-neutral-700 border border-neutral-700 rounded-md text-sm text-neutral-300 hover:text-white transition-colors"
									>
										<svg
											aria-hidden="true"
											className="size-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
											/>
										</svg>
										Email Me
									</Link>
									<Link
										href="/contact"
										className="flex items-center justify-center gap-2 py-2 px-3 bg-neutral-800/80 hover:bg-neutral-700 border border-neutral-700 rounded-md text-sm text-neutral-300 hover:text-white transition-colors"
									>
										<svg
											aria-hidden="true"
											className="size-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
											/>
										</svg>
										Schedule Call
									</Link>
								</div>
							</div>
						</div>

						<div>
							<h4 className="text-lg font-semibold mb-4">Connect</h4>
							<div className="flex space-x-4">
								<Link
									href="https://github.com/aryateja2106"
									target="_blank"
									rel="noopener noreferrer"
									className="size-10 grid place-items-center place-content-center rounded-full bg-neutral-800/80 hover:bg-neutral-700 border border-neutral-700 text-neutral-400 hover:text-teal-400 transition-colors"
									aria-label="GitHub"
								>
									<Github className="size-5" />
								</Link>
								<Link
									href="https://linkedin.com/in/arya-teja-rudraraju"
									target="_blank"
									rel="noopener noreferrer"
									className="size-10 grid place-items-center place-content-center rounded-full bg-neutral-800/80 hover:bg-neutral-700 border border-neutral-700 text-neutral-400 hover:text-teal-400 transition-colors"
									aria-label="LinkedIn"
								>
									<Linkedin className="size-5" />
								</Link>
								<Link
									href="https://x.com/r_aryateja"
									target="_blank"
									rel="noopener noreferrer"
									className="size-10 grid place-items-center place-content-center rounded-full bg-neutral-800/80 hover:bg-neutral-700 border border-neutral-700 text-neutral-400 hover:text-teal-400 transition-colors"
									aria-label="Twitter"
								>
									<Twitter className="size-5" />
								</Link>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom bar with copyright and links */}
				<div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
					<p>© 2025 Arya Teja Rudraraju | Portfolio. All rights reserved.</p>
					<div className="flex space-x-6 mt-4 md:mt-0">
						<Link
							href="/privacy"
							className="hover:text-teal-400 transition-colors"
						>
							Privacy Policy
						</Link>
						<Link
							href="/terms"
							className="hover:text-teal-400 transition-colors"
						>
							Terms of Service
						</Link>
					</div>
				</div>
			</div>

			{/* CSS for star effect */}
			<style jsx>{`
        .stars-small {
          background-image: radial-gradient(2px 2px at 20px 30px, #ffffff, rgba(0, 0, 0, 0)),
                           radial-gradient(2px 2px at 40px 70px, #ffffff, rgba(0, 0, 0, 0)),
                           radial-gradient(1px 1px at 90px 40px, #ffffff, rgba(0, 0, 0, 0)),
                           radial-gradient(1px 1px at 160px 120px, #ffffff, rgba(0, 0, 0, 0)),
                           radial-gradient(1.5px 1.5px at 200px 50px, #ffffff, rgba(0, 0, 0, 0)),
                           radial-gradient(1px 1px at 250px 160px, #ffffff, rgba(0, 0, 0, 0)),
                           radial-gradient(1px 1px at 320px 10px, #ffffff, rgba(0, 0, 0, 0)),
                           radial-gradient(1.5px 1.5px at 400px 90px, #ffffff, rgba(0, 0, 0, 0)),
                           radial-gradient(1px 1px at 450px 160px, #ffffff, rgba(0, 0, 0, 0)),
                           radial-gradient(1px 1px at 500px 30px, #ffffff, rgba(0, 0, 0, 0));
          background-repeat: repeat;
          background-size: 600px 400px;
          opacity: 0.2;
        }

        .stars-medium {
          background-image: radial-gradient(2px 2px at 100px 300px, #4fd1c5, rgba(0, 0, 0, 0)),
                           radial-gradient(2px 2px at 200px 200px, #4fd1c5, rgba(0, 0, 0, 0)),
                           radial-gradient(2px 2px at 300px 400px, #4fd1c5, rgba(0, 0, 0, 0)),
                           radial-gradient(2px 2px at 500px 200px, #4fd1c5, rgba(0, 0, 0, 0)),
                           radial-gradient(2px 2px at 600px 300px, #4fd1c5, rgba(0, 0, 0, 0));
          background-repeat: repeat;
          background-size: 800px 600px;
          opacity: 0.1;
        }
      `}</style>
		</footer>
	);
};

export default Footer;
