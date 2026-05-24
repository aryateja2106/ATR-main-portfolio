# Secrets

How agents working in this repo handle API keys, database passwords, and other sensitive credentials.

## Core principle

**Cloud LLMs never see secret values.** Reasoning happens in the cloud. Secret resolution and command execution happen on the local machine. Output is redacted before it returns to the cloud LLM.

If you (the agent reading this) ever find yourself about to:

- Paste a real key into chat,
- Echo a real key in command output,
- Write a real key into a tracked file,

**stop.** That is a leak path. There is a tool for this.

## The tool

`lockshell` lives at `~/.config/scripts/lockshell.sh`. It is a 200-line bash secret broker:

1. The cloud LLM (you) writes a command template with placeholders: `{{LINEAR_API_KEY}}`.
2. `lockshell run --reason "<why>" -- <template>` resolves placeholders from `agent-password` (Touch ID approval), executes the resolved command in a subprocess with secrets passed via env (not argv), and pipes output through a redactor.
3. The cloud LLM gets the redacted output. The actual secret value never leaves the local boundary.

See the full design rationale in `Plans/blog-drafts/lockshell-secret-broker.md`.

## How to register a secret (one-time, Arya does this)

```bash
# Initialise vault (Touch ID, first time only)
agent-password vault init
agent-password session create

# Add the secret to agent-password
printf '%s' 'lin_api_NEW_VALUE_HERE' \
  | agent-password secret put linear-api \
      --type api_key --field token=- --tag agent

# Tell lockshell which env var name maps to which vault entry
~/.config/scripts/lockshell.sh register LINEAR_API_KEY linear-api token
```

Now `{{LINEAR_API_KEY}}` resolves correctly anywhere.

## How an agent uses a secret

Cloud LLM produces:

```bash
~/.config/scripts/lockshell.sh run \
  --reason "list open linear issues" -- \
  'linear list --token "{{LINEAR_API_KEY}}" --status open'
```

`lockshell` resolves the placeholder, runs the command, prints redacted output. The cloud LLM sees the *template* + the *output*. Never the value.

## What lockshell does NOT do

- Protect against full local compromise. If an attacker has shell as your user, they can run `agent-password secrets get` themselves. Local vaults are a "cloud-side leak prevention" tool, not a "ransomware-proof" tool.
- Protect against you typing the secret directly. Habits beat tooling. Use the broker.
- Replace good token scoping at the source. Linear and GitHub support read-only and scoped tokens. Use them.
- Replace `.env.local` for application runtime config. The broker is for *agent-driven* command execution. Apps still read `process.env`.

## Hard rules for any agent working in this repo

1. No secret values in chat messages. If you need to know that a key exists, ask for the *name*, not the value.
2. No secret values in any tracked file. Period. `.env.example` is fine; `.env.local` is gitignored; tracked code uses `process.env.NAME`.
3. No secret values in shell history. Use `lockshell` or pull into a temp env file that you delete after use.
4. No `cat ~/.config/secrets.env.REVIEW`. The legacy file exists but is being phased out in favour of `agent-password`.
5. If a secret is suspected leaked, **rotate first, debrief second.** Most providers (Linear, GitHub, Vercel, Supabase, Cloudflare) let you revoke a key in one click.

## Source-of-truth for which secrets exist

```bash
~/.config/scripts/lockshell.sh list      # registered placeholders → vault entries
agent-password secrets list              # all vault entries (metadata only, no values)
```

## Audit trail

Every `lockshell run` invocation appends to `~/.config/lockshell/audit.log` (chmod 0600). Format:

```
ISO-timestamp \t reason \t command-template \t comma-separated-secret-names
```

The log captures *templates* and *reasons*, not values. Review periodically:

```bash
~/.config/scripts/lockshell.sh audit 50    # last 50 entries
```

## Migration from `~/.config/secrets.env.REVIEW`

The legacy approach was a `chmod 600` file sourced from `.zshrc`. It still works for shell-level convenience. New agent-driven workflows should prefer `agent-password` + `lockshell`. Migrate one secret at a time:

```bash
# Read the legacy value (manually, you on terminal — not via an agent)
grep '^LINEAR_TOKEN=' ~/.config/secrets.env.REVIEW

# Add to agent-password
printf '%s' 'value-from-grep' | agent-password secret put linear-api ...

# Register lockshell mapping
lockshell.sh register LINEAR_API_KEY linear-api token

# Remove from legacy file
sed -i '' '/^LINEAR_TOKEN=/d' ~/.config/secrets.env.REVIEW
```

When the legacy file is empty, delete it and remove the source line from `.zshrc`.

## Reference

- `~/.config/scripts/lockshell.sh` — the broker
- `~/.config/scripts/skill-eval.sh` — pre-install gate for new agent skills
- `~/Projects/agent-password/README.md` — vault details
- `Plans/blog-drafts/lockshell-secret-broker.md` — full architecture writeup
