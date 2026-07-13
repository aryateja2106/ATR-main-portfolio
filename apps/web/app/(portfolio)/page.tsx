import {
	Agents,
	Contact,
	Footer,
	Hero,
	Journey,
	SiteNav,
	Writing,
} from "./_components/field-notes";
import { FieldNotesMotion } from "./_components/field-notes/FieldNotesMotion";

export default function Page() {
	return (
		<FieldNotesMotion>
			<div className="min-h-screen bg-[#12110f] text-[#f7f2e8]">
				<SiteNav />
				<Hero />
				<Agents />
				<Journey />
				<Writing />
				<Contact />
				<Footer />
			</div>
		</FieldNotesMotion>
	);
}
