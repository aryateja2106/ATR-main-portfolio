"use client";

import {
	EnvelopeSimple,
	PaperPlaneTilt,
	User,
} from "@phosphor-icons/react/dist/ssr";
import { Loader2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "@/components/toast";

export function ContactForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!name || name.trim().length < 2) {
			toast({
				type: "error",
				description: "Please enter your name (minimum 2 characters).",
			});
			return;
		}

		if (!email?.includes("@")) {
			toast({
				type: "error",
				description: "Please enter a valid email address.",
			});
			return;
		}

		if (!message || message.trim().length < 10) {
			toast({
				type: "error",
				description: "Please write a longer message (minimum 10 characters).",
			});
			return;
		}

		setIsLoading(true);

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, message }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to send message.");
			}

			toast({
				type: "success",
				description:
					"Message sent successfully! Arya will get back to you soon.",
			});
			setName("");
			setEmail("");
			setMessage("");
			// biome-ignore lint/suspicious/noExplicitAny: catch error is any
		} catch (error: any) {
			toast({
				type: "error",
				description:
					error.message || "Failed to submit message. Please try again.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="w-full space-y-4">
			<div className="flex flex-col gap-1.5">
				<label
					htmlFor="contact-name"
					className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500"
				>
					Name
				</label>
				<div className="relative flex rounded-md border border-neutral-800 bg-neutral-950 px-3 py-1 items-center transition focus-within:border-teal-500/50">
					<User className="size-4 text-neutral-500 shrink-0 mr-2" />
					<input
						id="contact-name"
						type="text"
						placeholder="Your name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						disabled={isLoading}
						className="min-h-10 w-full bg-transparent font-mono text-sm text-neutral-100 outline-none placeholder:text-neutral-600 disabled:opacity-50"
						required
					/>
				</div>
			</div>

			<div className="flex flex-col gap-1.5">
				<label
					htmlFor="contact-email"
					className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500"
				>
					Email
				</label>
				<div className="relative flex rounded-md border border-neutral-800 bg-neutral-950 px-3 py-1 items-center transition focus-within:border-teal-500/50">
					<EnvelopeSimple className="size-4 text-neutral-500 shrink-0 mr-2" />
					<input
						id="contact-email"
						type="email"
						placeholder="email@example.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						disabled={isLoading}
						className="min-h-10 w-full bg-transparent font-mono text-sm text-neutral-100 outline-none placeholder:text-neutral-600 disabled:opacity-50"
						required
					/>
				</div>
			</div>

			<div className="flex flex-col gap-1.5">
				<label
					htmlFor="contact-message"
					className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500"
				>
					Message
				</label>
				<div className="relative flex rounded-md border border-neutral-800 bg-neutral-950 px-3 py-3 items-start transition focus-within:border-teal-500/50">
					<textarea
						id="contact-message"
						placeholder="How can Arya help you with terminal orchestration or AI agents?"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						disabled={isLoading}
						className="min-h-[100px] w-full bg-transparent font-mono text-sm text-neutral-100 outline-none placeholder:text-neutral-600 resize-y disabled:opacity-50"
						required
					/>
				</div>
			</div>

			<button
				type="submit"
				disabled={isLoading}
				className="flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-teal-300 px-4 text-sm font-bold text-neutral-950 transition hover:bg-teal-200 disabled:opacity-50"
			>
				{isLoading ? (
					<Loader2 className="size-4 animate-spin" />
				) : (
					<>
						<PaperPlaneTilt className="size-4 shrink-0" />
						<span>Send Message</span>
					</>
				)}
			</button>
		</form>
	);
}
