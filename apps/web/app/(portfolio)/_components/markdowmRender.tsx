import ReactMarkdown from "react-markdown";
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

function headingId(children: React.ReactNode) {
	return String(children)
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-");
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
								<div className="flex h-11 items-center border-b border-[#f7f2e8]/10 px-4">
									<span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#b9b0a2]">
										{match[1]}
									</span>
								</div>
								<pre className="overflow-x-auto p-5 text-sm leading-6 text-[#f7f2e8]">
									<code className={className} {...rest}>
										{code}
									</code>
								</pre>
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
							<h2
								id={headingId(children)}
								className="scroll-mt-28 mt-16 mb-5 font-serif text-[clamp(32px,5vw,48px)] leading-tight text-[#171512]"
							>
								{children}
							</h2>
						);
					},
					h3({ children }) {
						return (
							<h3
								id={headingId(children)}
								className="scroll-mt-28 mt-10 mb-4 font-serif text-2xl text-[#171512]"
							>
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
					table({ children }) {
						return (
							<div className="not-prose my-8 overflow-x-auto border border-[#c7baa5]">
								<table className="w-full min-w-[620px] border-collapse text-left text-sm">
									{children}
								</table>
							</div>
						);
					},
					th({ children }) {
						return (
							<th className="border-b border-[#c7baa5] bg-[#ded4c3] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[#51493f]">
								{children}
							</th>
						);
					},
					td({ children }) {
						return (
							<td className="border-b border-[#d8cdbd] px-4 py-3 align-top leading-6 last:border-b-0">
								{children}
							</td>
						);
					},
					hr() {
						return <hr className="my-14 border-[#c7baa5]" />;
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
