# Inner Warden (`InnerWarden/innerwarden`) — study notes

Repo snapshot: `~/Projects/innerwarden-study` (clone/pull only; no install, build, or remote install script executed). No `docs/` tree at repo root; long-form docs are pointed to the GitHub wiki and site.

## What it is (5 lines)

Inner Warden markets itself as an open-source, Rust-built Linux-first security agent (macOS supported with reduced kernel telemetry) that collects host and network signals, scores incidents, and can execute bounded response actions (block, kill, isolate, notify) with conservative defaults.

It combines log and native collectors with extensive eBPF programs (Linux), persists state primarily in SQLite WAL, and exposes a local dashboard plus CLI (`innerwarden`).

Correlation (47 rules in README), detectors (README: 49), Sigma/YARA integrations, MITRE ATT&CK mapping, and optional LLM triage position it closer to autonomous defense tooling than plain log alerting.

The project emphasizes observe-only and dry-run first, systemd deployment on Linux, and no required cloud control plane.

The README explicitly rejects the label “EDR,” preferring “self-contained defence agent” with audit trails.

## Architecture in plain terms (sensor plus agent plus dashboard, eBPF plus LSM plus XDP)

**Sensor:** Deterministic ingestion. Collectors pull auth logs, journald, Docker, nginx, filesystem and network-derived signals (DNS/HTTP/JA3/JA4 paths per README), optional CloudTrail-style sources, plus eBPF-fed events via a ring buffer. Output lands in SQLite (or optionally Redis Streams to the agent). No AI inside the sensor path per `CONTRIBUTING.md`.

**Linux kernel instrumentation:** Roughly forty eBPF-facing hooks described in README: tracepoints for syscalls and lifecycle events, kprobes (e.g. `commit_creds`, MSR/ACPI-facing hooks), four kprobe pairs for timing-oriented rootkit checks, three LSM hooks for exec/file/bpf mediation, and an XDP program for high-volume IP deny. Source is centralized in `crates/sensor-ebpf` (called out as a single-file program layout).

**Agent:** Reads stored incidents/events, maintains an in-memory knowledge graph (node/relation counts per README), runs cross-layer correlation and kill-chain style tracking, gates noise, optionally enriches (AbuseIPDB, GeoIP, CrowdSec, VirusTotal path) and runs optional AI triage, then invokes “skills” (firewall/XDP/sudo suspension/container pause/honeypot/playbooks) under policy. Notifications batch through a notification gate policy.

**Dashboard:** Ships with the agent as a local web UI (vanilla JS/CSS per contributing guide): HUD, investigations, MITRE map, reports, integrations, SSE, trust and compliance-oriented views referenced in README.

**Shield:** Separate workspace crate (`crates/shield`) for adaptive network/DDoS-related logic tied to README’s multi-layer shield story.

## What makes it unique (vs Wazuh, OSSEC, Falco, fail2ban)

**Vs fail2ban:** Regex-plus-jail IP banning on logs only. Inner Warden bundles many behavioral detectors, kernel visibility, correlation across layers, graph-backed reasoning hooks, optional AI triage, and multiple enforcement surfaces (LSM/XDP/playbooks mesh), not just ban-after-N-matches.

**Vs Falco:** Falco excels at syscall/runtime rules via kernel module/eBPF drivers and integrations; Inner Warden’s pitch is tighter packaging of telemetry, local SQLite state, scripted autonomous responses (skills/playbooks), trust scoring workflows, honeypots, mesh signaling, and a built-in dashboard/operator loops without mandating an external SIEM.

**Vs OSSEC / Wazuh:** Classic HIDS/agent-manager or ELK-adjacent stacks emphasize central correlation and alerting. Inner Warden’s README stresses a single-node, no-external-database story, bounded automated response in-process, regression-gated scenarios (`make scenario-qa`), and deliberate “observe then enforce” ergonomics versus SIEM-heavy operations.

Overlap exists in purpose (telemetry, alerts, MITRE framing); differentiation is autonomy depth, unified local store plus response graph, mesh, and breadth of Rust-native integration in one codebase.

## Why Arya should care (community alignment: personal software + OSS + security audience)

Audience match: README targets self-hosters, SREs, and small teams avoiding enterprise MDR pricing, which aligns with “personal software” and builder-owned infrastructure narratives.

Transparency hooks: Apache-2.0 for the aggregate project, CI/security badges (OpenSSF Scorecard path, Best Practices, security workflow), deterministic sensor philosophy, and public live feed endpoints signal an open, inspectable stance useful for readers who mistrust opaque endpoint agents.

Artifact-rich story for content: Rust, eBPF, SQLite, ATT&CK, Sigma, autonomous response ethics (defaults, reversibility). That stacks cleanly into technical writing for people who ship their own infra.

Caveat for brand purity: mixed licensing inside the workspace (below) partially dilutes “fully FOSS everywhere” messaging if those code paths ship in default builds.

## How Arya could engage (study, contribute, blog about, deploy on a Linux VPS he runs)

**Study:** Trace one detector (`crates/sensor/src/detectors/`), one correlation path in the agent, and the eBPF map in `crates/sensor-ebpf`.

**Contribute:** `CONTRIBUTING.md` favors test coverage uplift (≥80% targets), detectors, integrations under `integrations/*.toml`, dashboard anchor tests pattern, conventional commits.

**Blog:** Essays on autonomous response economics, baseline learning vs brittle rules, or “observe-only as a permanent mode” resonate with README’s safety framing; live feed plus architecture diagram make good illustrations.

**Deploy:** Provision a disposable Ubuntu 22.04+ VPS, install only when intentional, remain in responder-off/dry-run until allowlists stabilize, mirror README’s phased enablement checklist.

## Phase-1 install path (if and when he wants to deploy on a real server, NOT macOS)

1. Fresh Ubuntu 22.04+ or another systemd distro; confirm kernel has BTF/eBPF prerequisites as README implies (Linux 5.8+ CO-RE story).

2. Use the documented installer (`curl … innerwarden.com/install | sudo bash`) only from a posture of trust after reviewing the script and release artifacts; README promises SHA-checked binaries per arch and creates `innerwarden` service user plus `/etc/innerwarden/`.

3. Leave defaults: responder disabled (`responder.enabled = false` per README table), `dry_run = true`, run long enough for false-positive tuning (`innerwarden trust add`, dashboards, `system doctor/test` flows per README).

4. Enable narrowly scoped modules (e.g. `ssh-protection`) before widening; only then toggle responder plus `dry-run false`.

5. Add Telegram/Slack/webhook alerting and optional AI keys through `agent.toml` / `.env`; restart `innerwarden-agent` via systemd.

macOS lacks the Linux eBPF program surface; VPS path is where the marketed kernel story materializes.

## Concerns: license, maintenance, solo-dev risk, real-world adoption signals

**License split:** Workspace `Cargo.toml` sets `Apache-2.0`, and root `LICENSE` is Apache 2.0, but `smm`, `hypervisor`, `killchain`, and `dna` crates declare `license = "BUSL-1.1"` in their manifests. Agent depends on all four paths. Contributors are told proprietary/BUSL satellite code “are not in this repo,” yet they are present here: reconcile when advising audiences about freedoms to fork and redistribute unchanged binaries versus hacking on internals.

**Maintenance / bus factor:** README and `CONTRIBUTING.md` identify a solo narrative and single lead GitHub handle; security policy promises 48h acknowledgment for reports. That is nimble but concentrates roadmap and review load.

**Experimental surface:** Disclaimer warns automated blocking, killing, firewall edits, sudo suspension, and honeypots can disrupt production if mis-tuned despite defaults.

**Adoption signals:** Strong automated hygiene (pinned Actions, deny/lint tooling mentioned in SECURITY.md), badges, versioning around `0.12.x`. Broader empirical adoption is not established from README alone beyond marketing proof points (live site, Sigma rule counts). Watch issue velocity and release cadence for sustainability.

**Operational complexity:** Combining mesh, Shield, CrowdSea/fail2ban integrations, AI router, Cloudflare AbuseIP feeds increases integration debt; README itself flags module conflicts (`fail2ban` vs `abuseipdb-enrichment`) in scan advisor example.

## Quotable lines from README that fit Arya brand voice (no em-dashes, no "aspiring")

- “The open-source security agent that detects, scores, and fights back.”
- “Solo developer. Apache-2.0.”
- “No cloud. No dependencies. Just two Rust daemons and a CLI.”
- “Everything is local, audited, and reversible.”
- “Start in observe mode. Always.”
- “There is no rush. The system is designed to be useful in observe-only mode indefinitely.”
- “Inner Warden ships with the safest possible posture. On first run, nothing is blocked, killed, or modified.”

DONE
