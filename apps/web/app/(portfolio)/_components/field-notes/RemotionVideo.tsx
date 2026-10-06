/**
 * RemotionVideo.tsx
 *
 * Export-ready Remotion configuration and video component.
 * Maps the portfolio's storyboard 1:1 to Remotion Sequences and matching
 * the cubic-bezier animations using standard Remotion frame interpolation.
 *
 * To render this video:
 * 1. Install remotion: `bun add remotion @remotion/cli @remotion/transitions`
 * 2. Create a `remotion.config.ts` or run: `npx remotion render apps/web/app/(portfolio)/_components/field-notes/RemotionVideo.tsx MyVideo out.mp4`
 */

import {
	AbsoluteFill,
	Composition,
	easing,
	interpolate,
	Sequence,
	useCurrentFrame,
} from "remotion";
import { agents, hero, journey, writing } from "./content";
import {
	EASE,
	STORYBOARD_FPS,
	storyboard,
	storyboardTotalFrames,
} from "./motion";
import { fn, fonts } from "./tokens";

// Define the cubic-bezier ease function matching the web's motion.ts
const EASE_FN = easing.bezier(EASE[0], EASE[1], EASE[2], EASE[3]);

// Helper to interpolate anim values
function useAnimationValues(duration: number) {
	const frame = useCurrentFrame();

	// Global progress 0 -> 1 for the scene duration
	const progress = interpolate(frame, [0, duration - 15], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
		easing: EASE_FN,
	});

	// Exit fade out during the last 10 frames
	const opacity = interpolate(
		frame,
		[0, 10, duration - 10, duration - 1],
		[0, 1, 1, 0],
		{
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
		},
	);

	return { progress, opacity };
}

// Scene 1: Hero
function HeroScene({ durationInFrames }: { durationInFrames: number }) {
	const { progress, opacity } = useAnimationValues(durationInFrames);

	// Interpolate y offset for fadeUp
	const yOffset = interpolate(progress, [0, 1], [30, 0]);

	return (
		<AbsoluteFill
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				padding: "80px",
				background: "#12110f", // Dark theme matching Hero
				color: "#f7f2e8",
				fontFamily: fonts.sans,
				opacity,
			}}
		>
			<div style={{ transform: `translateY(${yOffset}px)` }}>
				<p
					style={{
						fontFamily: fonts.mono,
						fontSize: "18px",
						textTransform: "uppercase",
						letterSpacing: "0.26em",
						color: "#b9b0a2",
					}}
				>
					{hero.kicker}
				</p>
				<h1
					style={{
						fontFamily: fonts.serif,
						fontSize: "72px",
						lineHeight: "1.05",
						margin: "32px 0",
						fontWeight: 500,
					}}
				>
					{hero.headline.map((line) => (
						<span key={line} style={{ display: "block" }}>
							{line}
						</span>
					))}
				</h1>
				<p
					style={{
						fontSize: "24px",
						lineHeight: "1.5",
						color: "#d8d0c3",
						maxWidth: "800px",
					}}
				>
					{hero.lede}
				</p>
			</div>
		</AbsoluteFill>
	);
}

// Scene 2: Journey / Field Evidence
function JourneyScene({ durationInFrames }: { durationInFrames: number }) {
	const { progress, opacity } = useAnimationValues(durationInFrames);

	// Animate title and cards staggered
	const titleY = interpolate(progress, [0, 0.4], [25, 0], {
		easing: EASE_FN,
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	return (
		<AbsoluteFill
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: "80px",
				background: fn.bg,
				color: fn.ink,
				fontFamily: fonts.sans,
				opacity,
			}}
		>
			<div style={{ transform: `translateY(${titleY}px)` }}>
				<span
					style={{
						fontFamily: fonts.mono,
						fontSize: "14px",
						color: fn.accent,
						textTransform: "uppercase",
						letterSpacing: "0.15em",
					}}
				>
					{journey.tag}
				</span>
				<h2
					style={{
						fontFamily: fonts.serif,
						fontSize: "56px",
						fontWeight: 500,
						margin: "12px 0 24px 0",
					}}
				>
					{journey.title}
				</h2>
				<p style={{ color: fn.muted, fontSize: "20px", maxWidth: "600px" }}>
					{journey.note}
				</p>
			</div>

			{/* Highlight Grid representing the journey photos */}
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(3, 1fr)",
					gap: "24px",
					width: "100%",
				}}
			>
				{journey.photos.slice(0, 3).map((photo, index) => {
					// Stagger entrance of photos
					const photoProgress = interpolate(
						progress,
						[0.2 + index * 0.15, 0.6 + index * 0.15],
						[0, 1],
						{
							easing: EASE_FN,
							extrapolateLeft: "clamp",
							extrapolateRight: "clamp",
						},
					);
					const photoY = interpolate(photoProgress, [0, 1], [30, 0]);
					const photoOpacity = interpolate(photoProgress, [0, 1], [0, 1]);

					return (
						<div
							key={photo.caption}
							style={{
								background: fn.paper,
								border: `1px solid ${fn.line}`,
								borderRadius: "8px",
								padding: "16px",
								transform: `translateY(${photoY}px)`,
								opacity: photoOpacity,
							}}
						>
							<div
								style={{
									aspectRatio: "3/2",
									background: "rgba(19,24,21,0.05)",
									borderRadius: "4px",
									marginBottom: "12px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontFamily: fonts.mono,
									fontSize: "12px",
									color: fn.muted,
								}}
							>
								[PHOTO: {photo.caption}]
							</div>
							<p style={{ fontFamily: fonts.mono, fontSize: "12px" }}>
								{photo.caption}
							</p>
						</div>
					);
				})}
			</div>
		</AbsoluteFill>
	);
}

// Scene 3: Writing
function WritingScene({ durationInFrames }: { durationInFrames: number }) {
	const { progress, opacity } = useAnimationValues(durationInFrames);

	return (
		<AbsoluteFill
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: "80px",
				background: fn.bg,
				color: fn.ink,
				fontFamily: fonts.sans,
				opacity,
			}}
		>
			<div>
				<span
					style={{
						fontFamily: fonts.mono,
						fontSize: "14px",
						color: fn.accent,
						textTransform: "uppercase",
						letterSpacing: "0.15em",
					}}
				>
					{writing.tag}
				</span>
				<h2
					style={{
						fontFamily: fonts.serif,
						fontSize: "56px",
						fontWeight: 500,
						margin: "12px 0 0 0",
					}}
				>
					{writing.title}
				</h2>
			</div>

			<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
				{writing.items.map((item, index) => {
					const itemProgress = interpolate(
						progress,
						[0.15 + index * 0.15, 0.55 + index * 0.15],
						[0, 1],
						{
							easing: EASE_FN,
							extrapolateLeft: "clamp",
							extrapolateRight: "clamp",
						},
					);
					const itemY = interpolate(itemProgress, [0, 1], [20, 0]);
					const itemOpacity = interpolate(itemProgress, [0, 1], [0, 1]);

					return (
						<div
							key={item.title}
							style={{
								display: "flex",
								alignItems: "baseline",
								justifyContent: "space-between",
								borderBottom: `1px solid ${fn.line}`,
								paddingBottom: "16px",
								transform: `translateY(${itemY}px)`,
								opacity: itemOpacity,
							}}
						>
							<div
								style={{ display: "flex", alignItems: "baseline", gap: "24px" }}
							>
								<span
									style={{
										fontFamily: fonts.mono,
										fontSize: "12px",
										color: fn.accent,
										width: "100px",
									}}
								>
									{item.kind}
								</span>
								<h3
									style={{
										fontFamily: fonts.serif,
										fontSize: "28px",
										margin: 0,
									}}
								>
									{item.title}
								</h3>
							</div>
							<span
								style={{
									fontFamily: fonts.mono,
									fontSize: "14px",
									color: fn.muted,
								}}
							>
								&rarr;
							</span>
						</div>
					);
				})}
			</div>
		</AbsoluteFill>
	);
}

// Scene 4: Agents / Current Work
function AgentsScene({ durationInFrames }: { durationInFrames: number }) {
	const { progress, opacity } = useAnimationValues(durationInFrames);

	return (
		<AbsoluteFill
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: "80px",
				background: fn.bg,
				color: fn.ink,
				fontFamily: fonts.sans,
				opacity,
			}}
		>
			<div>
				<span
					style={{
						fontFamily: fonts.mono,
						fontSize: "14px",
						color: fn.accent,
						textTransform: "uppercase",
						letterSpacing: "0.15em",
					}}
				>
					{agents.tag}
				</span>
				<h2
					style={{
						fontFamily: fonts.serif,
						fontSize: "56px",
						fontWeight: 500,
						margin: "12px 0 0 0",
					}}
				>
					{agents.title}
				</h2>
			</div>

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(2, 1fr)",
					gap: "24px",
					width: "100%",
				}}
			>
				{agents.items.map((item, index) => {
					const itemProgress = interpolate(
						progress,
						[0.2 + index * 0.12, 0.6 + index * 0.12],
						[0, 1],
						{
							easing: EASE_FN,
							extrapolateLeft: "clamp",
							extrapolateRight: "clamp",
						},
					);
					const itemScale = interpolate(itemProgress, [0, 1], [0.96, 1]);
					const itemOpacity = interpolate(itemProgress, [0, 1], [0, 1]);

					return (
						<div
							key={item.name}
							style={{
								background: fn.paper,
								border: `1px solid ${fn.line}`,
								padding: "32px",
								borderRadius: "10px",
								transform: `scale(${itemScale})`,
								opacity: itemOpacity,
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
								height: "220px",
							}}
						>
							<div>
								<span
									style={{
										fontFamily: fonts.mono,
										fontSize: "10px",
										color: fn.accent,
										letterSpacing: "0.1em",
									}}
								>
									{item.mark}
								</span>
								<h3
									style={{
										fontFamily: fonts.serif,
										fontSize: "24px",
										margin: "8px 0",
									}}
								>
									{item.name}
								</h3>
								<p
									style={{
										color: fn.muted,
										fontSize: "14px",
										lineHeight: "1.4",
									}}
								>
									{item.desc}
								</p>
							</div>
							<span
								style={{
									fontFamily: fonts.mono,
									fontSize: "11px",
									textTransform: "uppercase",
									letterSpacing: "0.1em",
								}}
							>
								{item.cta} &rarr;
							</span>
						</div>
					);
				})}
			</div>
		</AbsoluteFill>
	);
}

// Scene Router
function SceneSelector({
	scene,
	duration,
}: {
	scene: string;
	duration: number;
}) {
	switch (scene) {
		case "hero":
			return <HeroScene durationInFrames={duration} />;
		case "journey":
			return <JourneyScene durationInFrames={duration} />;
		case "writing":
			return <WritingScene durationInFrames={duration} />;
		case "agents":
			return <AgentsScene durationInFrames={duration} />;
		default:
			return null;
	}
}

// Main Video Component
export const PortfolioVideo = () => {
	return (
		<AbsoluteFill style={{ background: fn.bg }}>
			{(() => {
				let currentFrameOffset = 0;
				return storyboard.map((scene) => {
					const from = currentFrameOffset;
					currentFrameOffset += scene.durationInFrames;

					return (
						<Sequence
							key={scene.id}
							from={from}
							durationInFrames={scene.durationInFrames}
						>
							<SceneSelector
								scene={scene.id}
								duration={scene.durationInFrames}
							/>
						</Sequence>
					);
				});
			})()}
		</AbsoluteFill>
	);
};

// Remotion Compositions register entry point
export default function registercompositions() {
	return (
		<Composition
			id="PortfolioPromo"
			component={PortfolioVideo}
			durationInFrames={storyboardTotalFrames}
			fps={STORYBOARD_FPS}
			width={1920}
			height={1080}
		/>
	);
}
