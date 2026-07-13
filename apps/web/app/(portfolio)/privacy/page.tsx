import { Footer } from "../_components/field-notes/Footer";
import { SiteNav } from "../_components/field-notes/SiteNav";

const linkClassName =
	"text-[#f7f2e8] underline decoration-[#b9b0a2]/50 underline-offset-4 hover:decoration-[#f7f2e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9a441]";

export default function PrivacyPage() {
	return (
		<div className="min-h-screen bg-[#12110f] text-[#f7f2e8]">
			<SiteNav />
			<main className="mx-auto max-w-4xl px-5 pb-24 pt-36 md:px-8 md:pt-44">
				<p className="font-mono text-xs uppercase tracking-[0.24em] text-[#b9b0a2]">
					Privacy notice
				</p>
				<h1 className="mt-5 font-serif text-[clamp(48px,8vw,88px)] leading-none">
					What happens to your information
				</h1>
				<p className="mt-8 max-w-3xl text-xl leading-9 text-[#d8d0c3]">
					This site collects only what is needed to answer an inquiry, run the
					site, and understand basic site use. It does not add inquiry senders
					to a marketing list by default.
				</p>

				<div className="mt-16 space-y-12 border-t border-[#f7f2e8]/15 pt-12 text-base leading-8 text-[#d8d0c3]">
					<section>
						<h2 className="font-serif text-3xl text-[#f7f2e8]">Inquiries</h2>
						<p className="mt-4">
							When you send the inquiry form, the site processes your name,
							email address, optional company, and message so Arya can read and
							reply to it. Do not send passwords, credentials, customer data,
							health information, financial information, or other sensitive
							material. Inquiry submissions are not stored in a site database.
						</p>
					</section>

					<section>
						<h2 className="font-serif text-3xl text-[#f7f2e8]">
							Service providers
						</h2>
						<p className="mt-4">
							Resend delivers the full inquiry by email. Telegram receives a
							minimal alert that a new inquiry arrived; the alert does not
							include your name, email, company, or message. Vercel hosts and
							delivers this website and may process standard request data such
							as IP addresses and device information for security and
							operations.
						</p>
						<p className="mt-4">
							If you choose the booking link, Calendly handles the booking on
							its own service under its privacy terms. The site does not book a
							meeting for you.
						</p>
					</section>

					<section>
						<h2 className="font-serif text-3xl text-[#f7f2e8]">Analytics</h2>
						<p className="mt-4">
							The site uses Google Analytics, Vercel Analytics, and Vercel Speed
							Insights to understand page use and performance. Those services
							may use cookies or similar technical identifiers and receive
							device, browser, and request information.
						</p>
					</section>

					<section>
						<h2 className="font-serif text-3xl text-[#f7f2e8]">
							How long information is kept
						</h2>
						<p className="mt-4">
							Inquiry emails and operational records are kept only as long as
							they remain useful for correspondence, security, legal, or
							business record needs. Service providers may keep data under their
							own policies. No fixed deletion date is promised here.
						</p>
					</section>

					<section>
						<h2 className="font-serif text-3xl text-[#f7f2e8]">
							Deletion requests
						</h2>
						<p className="mt-4">
							To ask about or request deletion of an inquiry,{" "}
							<a href="/#contact" className={linkClassName}>
								use the inquiry form
							</a>{" "}
							and write "deletion request" in the message. Enough information
							may be needed to identify the relevant correspondence and verify
							the request.
						</p>
					</section>

					<section>
						<h2 className="font-serif text-3xl text-[#f7f2e8]">
							Agents and human confirmation
						</h2>
						<p className="mt-4">
							AI agents may draft an inquiry or navigate this site, but may not
							submit it, book a call, accept terms, or act for a visitor without
							explicit human confirmation.
						</p>
					</section>
				</div>

				<div className="mt-16 flex flex-wrap gap-3">
					<a
						href="/#contact"
						className="inline-flex rounded-sm bg-[#f7f2e8] px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[#12110f] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9a441] focus-visible:ring-offset-2 focus-visible:ring-offset-[#12110f]"
					>
						Send an inquiry
					</a>
					<a
						href="https://calendly.com/aryateja/30min"
						target="_blank"
						rel="noreferrer"
						className="inline-flex rounded-sm border border-[#f7f2e8]/25 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[#f7f2e8] transition-colors hover:border-[#f7f2e8]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9a441] focus-visible:ring-offset-2 focus-visible:ring-offset-[#12110f]"
					>
						Book a 30-minute call
					</a>
				</div>
			</main>
			<Footer />
		</div>
	);
}
