# agent-password exploration (tartavull/agent-password)

## What it is (3 lines)

`agent-password` is a Rust CLI password manager aimed at macOS agent workflows: secrets live in a local encrypted SQLite vault, while a background daemon holds the vault key in memory after you approve access. Humans and automation share one numbered request/approval flow (Touch ID at approval time); agents can list metadata but not plaintext until you explicitly approve.

## How install works (cargo build vs cargo install path, vault init, session model)

- **Development / local binary:** `cargo build` produces `./target/debug/agent-password` (release would be `cargo build --release` → `target/release/`). You can run that path directly without installing globally.
- **User PATH install:** `cargo install --path .` copies the binary into Cargo’s bin directory so `agent-password` works from any shell (not run during this exploration).
- **`vault init`:** Creates `~/.agent-password/vault.db` and generates a vault key stored via `security-framework` as a generic password in the login keychain (service/account overridable with env vars). This step touches keychain storage.
- **Session model:** A detached subprocess daemon listens on `~/.agent-password/daemon.sock`. CLI commands talk JSON-over-Unix-socket (`protocol.rs`). One shared session per macOS user: after `session create`, the daemon can unlock the vault key (after biometric flow where required). `secrets list` is metadata-only; `secrets request` → human reviews `requests show` → `requests approve` (Touch ID) grants field reads until `session clear` or `session close`.

## Why this fits Arya's needs (vs 1Password CLI)

- **Explicit agent gate:** 1Password CLI often assumes service accounts or `op` integration patterns tuned to their cloud vault; this tool is built around “agent asks → you pick indices → Touch ID → then read,” which maps cleanly to “never paste secrets; still stay in control.”
- **Local-first, small surface:** No vendor cloud dependency for the vault file; stack is SQLite + keychain + local socket—easier to reason about for a single-machine AI workflow than a full enterprise CLI.
- **Metadata vs secrets split:** Agents discover IDs and fields exist via `secrets list` without seeing ciphertext payloads, aligning with least exposure during planning.

## Concerns / unknowns

- **Keychain vs biometry:** README states the vault key uses a normal login keychain item; Touch ID gates *use* (approval/unlock) rather than a biometric ACL on the keychain item itself—understand that tradeoff vs “key never leaves keychain without biometry.”
- **Daemon trust boundary:** Unlocked key and approvals live in the daemon process memory; anyone who can use the socket as the same Unix user while the session is active could be in scope—worth confirming file permissions on `daemon.sock` and threat model for shared accounts (typically N/A for a single user).
- **Maturity / audit:** Single-maintainer OSS, no formal security audit called out in what we read; dependency tree includes bundled SQLite, objc2 LocalAuthentication, chacha20poly1305—reasonable choices but “production trust” is a judgment call.
- **macOS-only:** Heavy use of LocalAuthentication, keychain, and Unix sockets—no Linux path for the same workflow.

## Recommended setup steps (in order, with explicit ask-points where Arya needs to approve)

1. **Build locally** (already done in exploration): `cd ~/Projects/agent-password && cargo build` — no approval needed.

2. **Optional — install to PATH:** Run `cargo install --path .` when ready — **ask-point:** Arya confirms she wants a global binary on her machine.

3. **Initialize vault:** `agent-password vault init` — **ask-point:** Writes keychain item and creates `~/.agent-password/`; requires comfort with keychain side effects.

4. **Create session:** `agent-password session create` — may interact with daemon unlock flow depending on state; **ask-point:** first real “live” session.

5. **Operational habit:** Add secrets (`login add` / `secret put`), then teach agents to `secrets list` → `secrets request` → Arya runs `requests show` / `requests approve` with Touch ID → agents `secrets get` with minimal fields.

6. **Close when done:** `agent-password session close` to drop memory-held key and approvals.

## What I did NOT do (and why)

Per scope: did not run `cargo install --path .` (global install is Arya’s choice). Did not invoke any command that reads or writes the macOS keychain or initialize a vault. Did not run `agent-password vault init`, `session create`, or any subcommand that would prompt Touch ID—those require Arya’s device presence and explicit consent. No edits were made inside the cloned repo beyond what `cargo build` writes under `target/`.
