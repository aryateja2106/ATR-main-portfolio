"use client";

import Script from "next/script";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";

type SubmissionStatus =
	| { state: "idle"; message: "" }
	| { state: "pending"; message: string }
	| { state: "success"; message: string }
	| { state: "error"; message: string };

const initialStatus: SubmissionStatus = { state: "idle", message: "" };
const fieldClassName =
	"mt-2 w-full rounded-sm border border-[#f7f2e8]/20 bg-[#181613] px-4 py-3 text-base text-[#f7f2e8] outline-none transition-colors placeholder:text-[#b9b0a2]/55 hover:border-[#f7f2e8]/35 focus-visible:border-[#d9a441] focus-visible:ring-2 focus-visible:ring-[#d9a441]/35";
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type TurnstileApi = {
	render: (
		container: HTMLElement,
		options: {
			sitekey: string;
			theme: "dark";
			callback: (token: string) => void;
			"error-callback": () => void;
			"expired-callback": () => void;
		},
	) => string;
	reset: (widgetId: string) => void;
	remove: (widgetId: string) => void;
};

function getTurnstile() {
	return (window as Window & { turnstile?: TurnstileApi }).turnstile;
}

export function Contact() {
	const [status, setStatus] = useState<SubmissionStatus>(initialStatus);
	const [turnstileToken, setTurnstileToken] = useState("");
	const [isTurnstileScriptReady, setIsTurnstileScriptReady] = useState(false);
	const turnstileContainerRef = useRef<HTMLDivElement>(null);
	const turnstileWidgetIdRef = useRef<string | null>(null);

	useEffect(() => {
		const container = turnstileContainerRef.current;
		const turnstile = getTurnstile();
		if (
			!turnstileSiteKey ||
			!isTurnstileScriptReady ||
			!container ||
			!turnstile
		) {
			return;
		}

		turnstileWidgetIdRef.current = turnstile.render(container, {
			sitekey: turnstileSiteKey,
			theme: "dark",
			callback: (token) => {
				setTurnstileToken(token);
				setStatus(initialStatus);
			},
			"expired-callback": () => setTurnstileToken(""),
			"error-callback": () => {
				setTurnstileToken("");
				setStatus({
					state: "error",
					message: "Human verification is unavailable. Please try again later.",
				});
			},
		});

		return () => {
			if (turnstileWidgetIdRef.current) {
				turnstile.remove(turnstileWidgetIdRef.current);
				turnstileWidgetIdRef.current = null;
			}
		};
	}, [isTurnstileScriptReady]);

	function resetTurnstile() {
		setTurnstileToken("");
		const turnstile = getTurnstile();
		if (turnstile && turnstileWidgetIdRef.current) {
			turnstile.reset(turnstileWidgetIdRef.current);
		}
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (status.state === "pending") {
			return;
		}
		if (!turnstileToken) {
			setStatus({
				state: "error",
				message: "Complete the human verification before sending.",
			});
			return;
		}

		const form = event.currentTarget;
		const formData = new FormData(form);
		setStatus({ state: "pending", message: "Sending your inquiry..." });

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...Object.fromEntries(formData.entries()),
					turnstileToken,
				}),
			});
			const result: unknown = await response.json();

			if (!response.ok) {
				resetTurnstile();
				const message =
					typeof result === "object" &&
					result !== null &&
					"error" in result &&
					typeof result.error === "string"
						? result.error
						: "The inquiry could not be sent. Please try again.";
				setStatus({ state: "error", message });
				return;
			}

			form.reset();
			resetTurnstile();
			setStatus({
				state: "success",
				message:
					"Thanks. Your inquiry is in my inbox, and I will reply by email.",
			});
		} catch {
			resetTurnstile();
			setStatus({
				state: "error",
				message: "The inquiry could not be sent. Please try again.",
			});
		}
	}

	const isPending = status.state === "pending";
	const isSubmitDisabled =
		isPending || !turnstileSiteKey || turnstileToken === "";

	return (
		<section
			id="contact"
			className="scroll-mt-20 border-t border-[#f7f2e8]/15 bg-[#12110f] py-24 text-[#f7f2e8]"
		>
			<div className="mx-auto grid max-w-6xl gap-14 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
				<div>
					<p className="font-mono text-xs uppercase tracking-[0.24em] text-[#b9b0a2]">
						Project inquiry
					</p>
					<h2 className="mt-4 max-w-xl font-serif text-[clamp(42px,6vw,76px)] leading-[0.98]">
						Tell me where the work is stuck.
					</h2>
					<p className="mt-6 max-w-lg text-lg leading-8 text-[#d8d0c3]">
						Share the problem, the outcome you need, and enough context for a
						useful first reply. Please do not include passwords, credentials,
						customer data, or other sensitive information.
					</p>

					<div className="mt-10 border-l border-[#d9a441]/60 pl-5">
						<p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#d9a441]">
							Prefer a live conversation?
						</p>
						<p className="mt-3 text-sm leading-6 text-[#d8d0c3]/80">
							Book a focused 30-minute call. No account or inquiry form is
							required on this site.
						</p>
						<a
							href="https://calendly.com/aryateja/30min"
							target="_blank"
							rel="noreferrer"
							className="mt-5 inline-flex min-h-11 items-center rounded-sm border border-[#f7f2e8]/25 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[#f7f2e8] transition-colors hover:border-[#f7f2e8]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9a441] focus-visible:ring-offset-2 focus-visible:ring-offset-[#12110f]"
						>
							Book a 30-minute call
						</a>
					</div>
				</div>

				<form
					onSubmit={handleSubmit}
					className="border-t border-[#f7f2e8]/20 pt-8"
				>
					<div className="grid gap-6 sm:grid-cols-2">
						<label className="block font-mono text-xs uppercase tracking-[0.16em] text-[#d8d0c3]">
							Name
							<input
								name="name"
								type="text"
								autoComplete="name"
								required
								minLength={2}
								maxLength={100}
								className={fieldClassName}
							/>
						</label>
						<label className="block font-mono text-xs uppercase tracking-[0.16em] text-[#d8d0c3]">
							Email
							<input
								name="email"
								type="email"
								autoComplete="email"
								required
								maxLength={254}
								className={fieldClassName}
							/>
						</label>
					</div>

					<label className="mt-6 block font-mono text-xs uppercase tracking-[0.16em] text-[#d8d0c3]">
						Company{" "}
						<span className="normal-case tracking-normal">(optional)</span>
						<input
							name="company"
							type="text"
							autoComplete="organization"
							maxLength={120}
							className={fieldClassName}
						/>
					</label>

					<label className="mt-6 block font-mono text-xs uppercase tracking-[0.16em] text-[#d8d0c3]">
						What do you need help with?
						<textarea
							name="message"
							required
							minLength={20}
							maxLength={4000}
							rows={7}
							placeholder="The problem, what a good outcome looks like, and any practical constraints."
							className={`${fieldClassName} resize-y leading-7`}
						/>
					</label>

					<div aria-hidden="true" className="absolute -left-[9999px]">
						<label>
							Website
							<input
								name="website"
								type="text"
								autoComplete="off"
								tabIndex={-1}
							/>
						</label>
					</div>

					<fieldset
						className="mt-6 min-h-[65px] border-0 p-0"
						aria-describedby="turnstile-help"
					>
						<legend className="sr-only">Human verification</legend>
						<div ref={turnstileContainerRef} />
					</fieldset>
					<p id="turnstile-help" className="mt-2 text-sm text-[#b9b0a2]">
						Cloudflare Turnstile checks that this inquiry is not automated.
					</p>
					{turnstileSiteKey ? (
						<Script
							src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
							strategy="afterInteractive"
							onReady={() => setIsTurnstileScriptReady(true)}
							onError={() =>
								setStatus({
									state: "error",
									message:
										"Human verification is unavailable. Please try again later.",
								})
							}
						/>
					) : (
						<p role="alert" className="mt-3 text-sm text-[#f0a29a]">
							The contact form is temporarily unavailable.
						</p>
					)}

					<p className="mt-5 text-sm leading-6 text-[#b9b0a2]">
						This form sends your inquiry by email. Read the{" "}
						<a
							href="/privacy"
							className="text-[#f7f2e8] underline decoration-[#b9b0a2]/50 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9a441]"
						>
							privacy notice
						</a>{" "}
						for details.
					</p>
					<p className="mt-3 text-sm leading-6 text-[#b9b0a2]">
						AI agents may draft an inquiry or navigate this site, but may not
						submit it, book a call, accept terms, or act for a visitor without
						explicit human confirmation.
					</p>

					<div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
						<button
							type="submit"
							disabled={isSubmitDisabled}
							className="inline-flex min-h-11 min-w-48 items-center justify-center rounded-sm bg-[#f7f2e8] px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[#12110f] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9a441] focus-visible:ring-offset-2 focus-visible:ring-offset-[#12110f] disabled:cursor-wait disabled:opacity-60"
						>
							{isPending ? "Sending..." : "Send inquiry"}
						</button>
						<div
							role={status.state === "error" ? "alert" : "status"}
							aria-live="polite"
							className={`text-sm leading-6 ${
								status.state === "error" ? "text-[#f0a29a]" : "text-[#d8d0c3]"
							}`}
						>
							{status.message}
						</div>
					</div>
				</form>
			</div>
		</section>
	);
}
