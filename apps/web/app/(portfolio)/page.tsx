"use client";

import dynamic from "next/dynamic";
import { Hero } from "./_components/hero";

const About = dynamic(() =>
	import("./_components/about").then((m) => ({ default: m.About })),
);
const Experience = dynamic(() =>
	import("./_components/experience").then((m) => ({ default: m.Experience })),
);
const TechStack = dynamic(() =>
	import("./_components/skills").then((m) => ({ default: m.TechStack })),
);
const Qualities = dynamic(() =>
	import("./_components/qualities").then((m) => ({ default: m.Qualities })),
);
const Projects = dynamic(() =>
	import("./_components/projects").then((m) => ({ default: m.Projects })),
);
const Blogs = dynamic(() =>
	import("./_components/blogs").then((m) => ({ default: m.Blogs })),
);

export default function Page() {
	return (
		<div className="relative w-full">
			<Hero />
			{/* Main content container */}
			<div className="w-full px-4 md:max-w-4xl lg:px-0 pb-28 pt-20 m-auto space-y-28 overflow-hidden">
				<About />
				<Experience />
				<TechStack />
				<Qualities />
				<Projects />
				<Blogs />
			</div>
		</div>
	);
}
