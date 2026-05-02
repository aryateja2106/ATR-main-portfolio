#!/usr/bin/env node
/**
 * Pings Bing / Yandex / Naver IndexNow API with explicit URLs after deploy or content changes.
 *
 * Prerequisites:
 * 1. Create a random key string (recommended: 128-bit hex).
 * 2. Host the key verification file at: https://www.aryateja.com/<key>.txt containing only the raw key text.
 * 3. Set INDEXNOW_HOST (defaults to https://www.aryateja.com) and INDEXNOW_KEY in the environment,
 *    or pass --key YOURKEY on the CLI.
 *
 * Usage:
 *   INDEXNOW_KEY=yourkey bun run indexnow https://www.aryateja.com/about https://www.aryateja.com/faq
 *   bun run indexnow -- --urls-file ./urls.txt
 *
 * Docs: https://www.indexnow.org/
 */

const DEFAULT_HOST = "https://www.aryateja.com";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

async function readUrlsFile(path) {
	const fs = await import("node:fs/promises");
	const raw = await fs.readFile(path, "utf8");
	return raw
		.split(/\r?\n/)
		.map((l) => l.trim())
		.filter(Boolean)
		.filter((l) => !l.startsWith("#"));
}

function parseArgs(argv) {
	let key =
		process.env.INDEXNOW_KEY ??
		process.env.INDEX_NOW_KEY ??
		process.env.INDEXNOW_API_KEY ??
		null;
	let hostUrl = process.env.INDEXNOW_HOST ?? DEFAULT_HOST;
	const urls = [];
	let urlsFile = null;

	for (let i = 2; i < argv.length; i++) {
		const arg = argv[i];
		if (arg === "--urls-file" || arg === "--file") {
			urlsFile = argv[++i];
			continue;
		}
		if (arg.startsWith("--host=")) {
			hostUrl = arg.slice("--host=".length).trim();
			continue;
		}
		if (arg === "--key") {
			key = argv[++i] ?? "";
			continue;
		}
		if (arg === "--help" || arg === "-h") {
			console.log(`
IndexNow ping

Environment:
  INDEXNOW_KEY   Verification key string (preferred)
  INDEXNOW_HOST  Canonical site origin (default: ${DEFAULT_HOST})

Arguments:
  URL ...              Absolute URLs on your host to submit
  --urls-file PATH     Optional file with one URL per line
  --key KEY           Key (overrides env)
  --host=https://…    Host prefix (defaults to INDEXNOW_HOST)
`);
			process.exit(0);
		}
		urls.push(arg);
	}

	return { hostUrl: hostUrl.replace(/\/$/, ""), key: key?.trim() || "", urlsFile, urls };
}

async function main() {
	let { hostUrl, key, urlsFile, urls } = parseArgs(process.argv);

	if (urlsFile) {
		const fromFile = await readUrlsFile(urlsFile);
		urls = [...urls, ...fromFile];
	}

	if (!key) {
		console.error(
			"[indexnow] Missing key. Set INDEXNOW_KEY or pass it as first argument after --key.",
		);
		process.exit(1);
	}

	const normalized = urls
		.map((u) => u.trim())
		.filter(Boolean)
		.map((u) => {
			if (!u.startsWith("http")) {
				return `${hostUrl}${u.startsWith("/") ? "" : "/"}${u}`;
			}
			return u;
		});

	if (normalized.length === 0) {
		console.error(
			"[indexnow] Pass at least one absolute URL as an argument or use --urls-file.",
		);
		process.exit(1);
	}

	const hostname = new URL(hostUrl).host;

	const payload = {
		host: hostname,
		key,
		urlList: normalized,
	};

	const res = await fetch(INDEXNOW_ENDPOINT, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (!(res.ok || res.status === 202 || res.status === 200)) {
		const txt = await res.text().catch(() => "");
		console.error(`[indexnow] HTTP ${res.status}`, txt.slice(0, 500));
		process.exit(1);
	}

	console.log(`[indexnow] OK — submitted ${normalized.length} URL(s) for ${hostname}.`);
	for (const u of normalized) console.log(`  → ${u}`);
}

main().catch((e) => {
	console.error("[indexnow] Failed:", e?.message ?? e);
	process.exit(1);
});
