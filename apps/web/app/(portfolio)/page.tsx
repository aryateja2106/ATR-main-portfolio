import { Agents } from "./_components/field-notes/Agents";
import { Footer } from "./_components/field-notes/Footer";
import { Hero } from "./_components/field-notes/Hero";
import { Journey } from "./_components/field-notes/Journey";
import { SiteNav } from "./_components/field-notes/SiteNav";
import { TechStack } from "./_components/field-notes/TechStack";
import { Writing } from "./_components/field-notes/Writing";

export default function Page() {
	return (
		<div className="min-h-screen bg-[#12110f] text-[#f7f2e8] [color-scheme:dark]">
			<a
				href="#main-content"
				className="sr-only z-[60] bg-[#f7f2e8] px-4 py-3 text-[#12110f] focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
			>
				Skip to content
			</a>
			<SiteNav />
			<main id="main-content">
				<Hero />
				<Agents />
				<TechStack />
				<Journey />
				<Writing />
			</main>
			<Footer />
		</div>
	);
}
