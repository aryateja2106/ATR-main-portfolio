"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
	content: string;
	className?: string;
}

interface CodeComponentProps {
	className?: string;
	children: React.ReactNode;
	inline?: boolean;
	[key: string]: unknown;
}

function CopyCodeButton({ code }: { code: string }) {
	const [copied, setCopied] = useState(false);

	const copyWithFallback = () => {
		const textarea = document.createElement("textarea");
		textarea.value = code;
		textarea.style.position = "fixed";
		textarea.style.opacity = "0";
		document.body.appendChild(textarea);
		textarea.select();
		const success = document.execCommand("copy");
		textarea.remove();
		return success;
	};

	return (
		<button
			type="button"
			onClick={async () => {
				let success = false;
				try {
					if (navigator.clipboard) {
						await navigator.clipboard.writeText(code);
						success = true;
					}
				} catch {
					success = false;
				}

				if (!success) success = copyWithFallback();
				if (!success) return;

				setCopied(true);
				window.setTimeout(() => setCopied(false), 4000);
			}}
			className="inline-flex size-8 items-center justify-center text-[#b9b0a2] transition-colors hover:text-[#f7f2e8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f7f2e8]"
			aria-label={copied ? "Code copied" : "Copy code"}
			title={copied ? "Copied" : "Copy code"}
		>
			{copied ? <Check className="size-4" /> : <Copy className="size-4" />}
		</button>
	);
}

export default function MarkdownRenderer({
	content,
	className = "",
}: MarkdownRendererProps) {
	return (
		<div className={`prose prose-lg max-w-none ${className}`}>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				components={{
					code(props) {
						const { className, children, ...rest } =
							props as CodeComponentProps;
						const match = /language-([\w-]+)/.exec(className || "");
						const inline = (props as CodeComponentProps).inline;
						const code = String(children).replace(/\n$/, "");

						return !inline && match ? (
							<div className="not-prose my-8 overflow-hidden rounded-sm border border-[#2d2a25] bg-[#12110f]">
								<div className="flex h-11 items-center justify-between border-b border-[#f7f2e8]/10 px-4">
									<span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#b9b0a2]">
										{match[1]}
									</span>
									<CopyCodeButton code={code} />
								</div>
								<SyntaxHighlighter
									style={vscDarkPlus}
									language={match[1]}
									PreTag="div"
									customStyle={{
										margin: 0,
										padding: "1.25rem",
										background: "#12110f",
									}}
									{...rest}
								>
									{code}
								</SyntaxHighlighter>
							</div>
						) : (
							<code
								className={`${className} rounded-sm bg-[#ded4c3] px-1.5 py-0.5 font-mono text-[0.9em] text-[#2d2924]`}
								{...rest}
							>
								{children}
							</code>
						);
					},
					pre({ children }) {
						return <>{children}</>;
					},
					h1({ children }) {
						return (
							<h1 className="mt-12 mb-5 font-serif text-4xl">{children}</h1>
						);
					},
					h2({ children }) {
						return (
							<h2 className="mt-16 mb-5 font-serif text-[clamp(32px,5vw,48px)] leading-tight text-[#171512]">
								{children}
							</h2>
						);
					},
					h3({ children }) {
						return (
							<h3 className="mt-10 mb-4 font-serif text-2xl text-[#171512]">
								{children}
							</h3>
						);
					},
					p({ children }) {
						return <p className="my-6 text-lg leading-8">{children}</p>;
					},
					ul({ children }) {
						return (
							<ul className="my-6 list-disc space-y-2 pl-6">{children}</ul>
						);
					},
					ol({ children }) {
						return (
							<ol className="my-6 list-decimal space-y-3 pl-6">{children}</ol>
						);
					},
					blockquote({ children }) {
						return (
							<blockquote className="my-8 rounded-sm border border-[#c7baa5] bg-[#e8dece] px-6 py-1 text-[#3c3730]">
								{children}
							</blockquote>
						);
					},
					a({ children, href }) {
						const external = href?.startsWith("http");

						return (
							<a
								href={href}
								target={external ? "_blank" : undefined}
								rel={external ? "noreferrer" : undefined}
								className="font-medium text-[#8d451e] underline decoration-[#8d451e]/35 underline-offset-4 transition-colors hover:text-[#5f2c14]"
							>
								{children}
							</a>
						);
					},
					img({ src, alt, title }) {
						if (typeof src !== "string") return null;

						return (
							<span className="not-prose my-10 block">
								<img
									src={src}
									alt={alt ?? ""}
									loading="lazy"
									className="h-auto w-full rounded-sm border border-[#c7baa5] bg-[#ded4c3]"
								/>
								{(title || alt) && (
									<span className="mt-3 block font-mono text-[10px] uppercase leading-5 tracking-[0.16em] text-[#6f665b]">
										{title || alt}
									</span>
								)}
							</span>
						);
					},
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
}
