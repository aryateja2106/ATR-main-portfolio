import { footer } from './content';

export function Footer() {
	return (
		<footer
			id="contact"
			className="border-t border-[#f7f2e8]/15 bg-[#12110f] py-12 text-[#f7f2e8]"
		>
			<div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
				<div className="font-mono text-[#f7f2e8] flex items-center gap-2 text-xs uppercase tracking-[0.2em]">
					<span className="inline-block size-2 bg-[#b9b0a2]" />
					{footer.brand}
				</div>
				<nav className="flex flex-wrap items-center justify-center gap-4">
					{footer.socials.map((social) => (
						<a
							key={social.label}
							href={social.href}
							target="_blank"
							rel="noreferrer"
							className="font-mono uppercase text-[11px] tracking-[0.2em] text-[#b9b0a2] transition-colors hover:text-[#f7f2e8]"
						>
							{social.label}
						</a>
					))}
				</nav>
			</div>
			<div className="max-w-6xl mx-auto px-4 mt-4">
				<p className="font-mono text-[11px] text-[#b9b0a2]">
					{footer.copyright}
				</p>
			</div>
		</footer>
	);
}
