"use client";

// ===========================================================================
// VideoStoryboard — a live, interactive demo of the VIDEO-PORTABLE motion system.
//
// HOW TO PORT TO REMOTION / HYPERFRAMES
// -------------------------------------
// The `storyboard` array (from ./motion) is the single source of truth. Each
// scene becomes a Remotion <Sequence> whose length is its `durationInFrames`:
//
//   import { Sequence, interpolate, useCurrentFrame } from "remotion";
//   import { storyboard, STORYBOARD_FPS, EASE } from "./motion";
//
//   export const MyVideo = () => (
//     <AbsoluteFill style={{ background: "#e9dfc7" }}>
//       {storyboard.map((scene) => (
//         <Sequence key={scene.id} durationInFrames={scene.durationInFrames}>
//           <Scene variant={scene.variant} />
//         </Sequence>
//       ))}
//     </AbsoluteFill>
//   );
//
// Inside each <Scene>, animate using the SAME EASE and the current frame:
//
//   const frame = useCurrentFrame();
//   const progress = interpolate(
//     frame,
//     [0, scene.durationInFrames],
//     [0, 1],
//     { easing: EASE },
//   );
//
// Hyperframes can consume the identical `storyboard` JSON — no re-authoring.
// ===========================================================================

import { useState } from "react";
import { animate, useMotionValue } from "framer-motion";

import {
	EASE,
	STORYBOARD_FPS,
	storyboard,
	storyboardTotalFrames,
} from "./motion";

function activeSceneId(progress: number): string {
	let acc = 0;
	for (const scene of storyboard) {
		acc += scene.durationInFrames;
		if (progress < acc) return scene.id;
	}
	return storyboard[storyboard.length - 1].id;
}

export function VideoStoryboard() {
	const progress = useMotionValue(0);
	const [playing, setPlaying] = useState(false);

	const totalSeconds = storyboardTotalFrames / STORYBOARD_FPS;

	const play = () => {
		if (playing) return;
		setPlaying(true);
		progress.set(0);
		const controls = animate(progress, storyboardTotalFrames, {
			duration: totalSeconds,
			ease: EASE,
			onComplete: () => setPlaying(false),
		});
		return controls.stop;
	};

	const currentId = activeSceneId(progress.get());
	const pct = (progress.get() / storyboardTotalFrames) * 100;

	return (
		<section className="bg-paper border border-ink/20 rounded-xl p-6">
			<div className="flex flex-col gap-1">
				<h3 className="font-serif text-2xl text-ink">Motion → Video</h3>
				<p className="font-mono text-[11px] uppercase tracking-wide text-ink/60">
					Remotion / Hyperframes ready
				</p>
			</div>

			<ol className="mt-6 flex flex-col gap-2">
				{storyboard.map((scene) => {
					const isActive = scene.id === currentId && playing;
					const durationSec = (scene.durationInFrames / STORYBOARD_FPS).toFixed(1);
					return (
						<li
							key={scene.id}
							className={[
								"flex items-center justify-between rounded-lg px-3 py-2 font-mono text-sm transition-colors",
								isActive
									? "text-terracotta bg-terracotta/10"
									: "text-ink/60",
							].join(" ")}
						>
							<span className="flex items-center gap-2">
								<span className="text-ink/40">{scene.variant}</span>
								{scene.label}
							</span>
							<span>{durationSec}s</span>
						</li>
					);
				})}
			</ol>

			<div className="mt-6">
				<button
					type="button"
					onClick={play}
					disabled={playing}
					className="bg-ink text-cream font-mono uppercase text-[11px] tracking-wide rounded px-4 py-2 disabled:opacity-50"
				>
					{playing ? "Playing…" : "Play sequence"}
				</button>
			</div>

			<div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-ink/10">
				<div
					className="h-full bg-terracotta"
					style={{ width: `${pct}%` }}
				/>
			</div>
		</section>
	);
}
