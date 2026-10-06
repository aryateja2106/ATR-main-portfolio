import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
	generateVoiceover,
	validateVoiceoverPackage,
} from "./generate-elevenlabs-voiceover.mjs";

test("validates packages and writes one audio file per scene", async () => {
	const packageData = validateVoiceoverPackage({
		id: "weekly-agents",
		scenes: [
			{ id: "hook", text: "A short hook." },
			{ id: "close", text: "Read the full field note." },
		],
	});
	const outputRoot = await mkdtemp(path.join(os.tmpdir(), "voiceover-test-"));

	try {
		const requests = [];
		await generateVoiceover({
			packageData,
			apiKey: "test-key",
			voiceId: "test-voice",
			outputRoot,
			fetchImpl: async (url, options) => {
				requests.push({ url, options });
				return {
					ok: true,
					status: 200,
					arrayBuffer: async () => Uint8Array.from([1, 2, 3]).buffer,
				};
			},
		});

		assert.equal(requests.length, 2);
		assert.equal(
			requests[0].url,
			"https://api.elevenlabs.io/v1/text-to-speech/test-voice",
		);
		assert.deepEqual(
			await readFile(path.join(outputRoot, "weekly-agents", "hook.mp3")),
			Buffer.from([1, 2, 3]),
		);
	} finally {
		await rm(outputRoot, { recursive: true, force: true });
	}
});

test("rejects duplicate or unsafe scene ids", () => {
	assert.throws(
		() =>
			validateVoiceoverPackage({
				id: "weekly-agents",
				scenes: [
					{ id: "hook", text: "One" },
					{ id: "hook", text: "Two" },
				],
			}),
		/Duplicate scene id/,
	);
	assert.throws(
		() =>
			validateVoiceoverPackage({
				id: "../escape",
				scenes: [{ id: "hook", text: "No" }],
			}),
		/Package id/,
	);
});
