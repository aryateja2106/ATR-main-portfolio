"use client";

import { Loader2, Mail } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "@/components/toast";

interface NewsletterFormProps {
	signupSource?: string;
}

export function NewsletterForm({
	signupSource = "footer",
}: NewsletterFormProps) {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!email?.includes("@")) {
			toast({
				type: "error",
				description: "Please enter a valid email address.",
			});
			return;
		}

		setIsLoading(true);

		try {
			const response = await fetch("/api/subscribe", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, signupSource }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to subscribe.");
			}

			toast({
				type: "success",
				description: "Successfully subscribed to the newsletter!",
			});
			setEmail("");
			// biome-ignore lint/suspicious/noExplicitAny: catch error is any
		} catch (error: any) {
			toast({
				type: "error",
				description: error.message || "Something went wrong. Please try again.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="w-full">
			<div className="flex flex-col gap-2">
				<label
					htmlFor="newsletter-email"
					className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500 mb-1 block"
				>
					Newsletter
				</label>
				<div className="relative flex rounded-md border border-neutral-800 bg-neutral-950 px-3 py-1 items-center transition focus-within:border-teal-500/50">
					<Mail className="size-4 text-neutral-500 shrink-0 mr-2" />
					<input
						id="newsletter-email"
						type="email"
						placeholder="email@example.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						disabled={isLoading}
						className="min-h-10 w-full bg-transparent font-mono text-sm text-neutral-100 outline-none placeholder:text-neutral-600 disabled:opacity-50"
						required
					/>
					<button
						type="submit"
						disabled={isLoading}
						className="inline-flex min-h-8 items-center justify-center rounded bg-teal-300 px-3 text-xs font-bold text-neutral-950 transition hover:bg-teal-200 disabled:opacity-50"
					>
						{isLoading ? (
							<Loader2 className="size-3 animate-spin" />
						) : (
							"Subscribe"
						)}
					</button>
				</div>
				<p className="text-[10px] text-neutral-500">
					Zero spam. Unsubscribe anytime.
				</p>
			</div>
		</form>
	);
}
