import { Agents } from "./_components/field-notes/Agents";
import { Footer } from "./_components/field-notes/Footer";
import { Hero } from "./_components/field-notes/Hero";
import { Journey } from "./_components/field-notes/Journey";
import { SiteNav } from "./_components/field-notes/SiteNav";
import { Writing } from "./_components/field-notes/Writing";

export default function Page() {
	return (
		<div className="min-h-screen bg-[#fbfaf7] text-[#171717] [color-scheme:light]">
			<a
				href="#main-content"
				className="sr-only z-[60] bg-[#2563eb] px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
			>
				Skip to content
			</a>
			<SiteNav />
			<main id="main-content">
				<Hero />
				<Agents />
				<Journey />
				<Writing />
			</main>
			<Footer />
		</div>
	);
}
