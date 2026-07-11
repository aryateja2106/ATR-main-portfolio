export function BrandMark({ className = "size-8" }: { className?: string }) {
	return (
		<img src="/favicon.ico" alt="" aria-hidden="true" className={className} />
	);
}
