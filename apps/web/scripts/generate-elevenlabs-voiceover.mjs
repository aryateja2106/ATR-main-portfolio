import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const appRoot = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"..",
);

function safeId(value, label) {
	if (typeof value !== "string" || !/^[a-z0-9][a-z0-9-]*$/.test(value)) {
		throw new Error(
			`${label} must use lowercase letters, numbers, and hyphens`,
		);
	}
	return value;
}

export function validateVoiceoverPackage(input) {
	if (!input || typeof input !== "object") {
		throw new Error("Voiceover package must be a JSON object");
	}

	const id = safeId(input.id, "Package id");
	if (!Array.isArray(input.scenes) || input.scenes.length === 0) {
		throw new Error("Voiceover package needs at least one scene");
	}

	const sceneIds = new Set();
	const scenes = input.scenes.map((scene, index) => {
		const sceneId = safeId(scene?.id, `Scene ${index + 1} id`);
		if (sceneIds.has(sceneId))
			throw new Error(`Duplicate scene id: ${sceneId}`);
		sceneIds.add(sceneId);

		if (typeof scene.text !== "string" || scene.text.trim().length === 0) {
			throw new Error(`Scene ${sceneId} needs narration text`);
		}

		return { id: sceneId, text: scene.text.trim() };
	});

	return {
		id,
		modelId: input.modelId || "eleven_multilingual_v2",
		scenes,
	};
}

export async function generateVoiceover({
	packageData,
	apiKey,
	voiceId,
	outputRoot,
	fetchImpl = fetch,
}) {
	if (!apiKey) throw new Error("ELEVENLABS_API_KEY is required");
	if (!voiceId) throw new Error("ELEVENLABS_VOICE_ID is required");

	const targetDir = path.join(outputRoot, packageData.id);
	await mkdir(targetDir, { recursive: true });

	for (const scene of packageData.scenes) {
		const response = await fetchImpl(
			`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}`,
			{
				method: "POST",
				headers: {
					"xi-api-key": apiKey,
					"Content-Type": "application/json",
					Accept: "audio/mpeg",
				},
				body: JSON.stringify({
					text: scene.text,
					model_id: packageData.modelId,
				}),
			},
		);

		if (!response.ok) {
			throw new Error(
				`ElevenLabs request failed for ${scene.id}: ${response.status}`,
			);
		}

		await writeFile(
			path.join(targetDir, `${scene.id}.mp3`),
			Buffer.from(await response.arrayBuffer()),
		);
	}

	return targetDir;
}

async function main() {
	const inputPath = process.argv[2];
	if (!inputPath) {
		throw new Error(
			"Usage: node scripts/generate-elevenlabs-voiceover.mjs <package.json> [--dry-run]",
		);
	}

	const packageData = validateVoiceoverPackage(
		JSON.parse(await readFile(path.resolve(inputPath), "utf8")),
	);
	const outputRoot = path.join(appRoot, ".content-output", "voiceover");

	if (process.argv.includes("--dry-run")) {
		console.log(
			`Validated ${packageData.scenes.length} scenes for ${packageData.id}.`,
		);
		return;
	}

	const targetDir = await generateVoiceover({
		packageData,
		apiKey: process.env.ELEVENLABS_API_KEY,
		voiceId: process.env.ELEVENLABS_VOICE_ID,
		outputRoot,
	});
	console.log(`Generated voiceover in ${path.relative(appRoot, targetDir)}.`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
	main().catch((error) => {
		console.error(error.message);
		process.exitCode = 1;
	});
}
