# Arya's lockshell setup checklist

A copy-paste workflow for migrating Arya's CLI authentication onto lockshell. Run these commands in **Arya's regular terminal** (not in the agent's sandbox) so Touch ID and the agent-password session work correctly.

**Time estimate:** 20–30 minutes total. Each provider takes ~2 minutes.

**Order:** Linear (already done) → Vercel → Supabase (×3) → GitHub → OpenAI → Anthropic → OpenRouter → **Cloudflare last** (with care).

---

## Pre-flight (one time)

```bash
# 1. Make sure lockshell + agent-password are installed and on PATH.
lockshell version             # should print 0.1.4 or later
agent-password --version      # should print something

# 2. Make sure a session is open and the daemon is running.
agent-password session status # should say exists: true, unlocked: true

# 3. Make sure config is healthy.
lockshell doctor              # exit 0 = good

# If any of those fail, run:
#   agent-password session create
#   lockshell setup
```

---

## Vercel

### Where to get the token

1. Go to <https://vercel.com/account/tokens>
2. Click "Create Token"
3. Name: `lockshell-aryateja-2026-05`
4. Scope: Full Account or specific team — pick what you need
5. Expiration: 1 year (recommended; rotate annually)
6. Copy the token (it shows once, never again)

### Add to vault and register

```bash
# Token must be on your clipboard. Then:
pbpaste | agent-password login add vercel \
  --username arya --url https://vercel.com \
  --password-stdin --tag agent

lockshell register VERCEL_TOKEN vercel password

agent-password secrets request vercel --requester arya --reason "vercel cli access"
agent-password requests list                # note the id
agent-password requests approve <id> all    # Touch ID
```

### Smoke test

```bash
lockshell run --reason "list my vercel projects" -- \
  'VERCEL_TOKEN={{VERCEL_TOKEN}} vercel project ls'
```

If you see your project list, Vercel is wired up.

---

## Supabase (multi-account: 3 projects)

### Where to get tokens

For each Supabase project you have:

1. Go to <https://supabase.com/dashboard/account/tokens>
2. Click "Generate New Token"
3. Name: `lockshell-<project>-2026-05`
4. Copy the token

You need to do this **3 times**, once per project. Suggested context names: `personal`, `cloudagi`, `aryateja`. Adjust based on actual project names.

### Add and register (do this 3 times, once per project)

```bash
# === Project 1: personal ===
# Have the personal token on clipboard.
pbpaste | agent-password login add supabase-personal \
  --username arya --url https://supabase.com \
  --password-stdin --tag agent
lockshell register SUPABASE_TOKEN_PERSONAL supabase-personal password

# === Project 2: cloudagi ===
# Switch clipboard to the CloudAGI token.
pbpaste | agent-password login add supabase-cloudagi \
  --username arya --url https://supabase.com \
  --password-stdin --tag agent
lockshell register SUPABASE_TOKEN_CLOUDAGI supabase-cloudagi password

# === Project 3: aryateja ===
# Switch clipboard to the aryateja.com token.
pbpaste | agent-password login add supabase-aryateja \
  --username arya --url https://supabase.com \
  --password-stdin --tag agent
lockshell register SUPABASE_TOKEN_ARYATEJA supabase-aryateja password
```

### Approve all three for this session

```bash
agent-password secrets request supabase-personal --requester arya --reason "supabase personal"
agent-password secrets request supabase-cloudagi --requester arya --reason "supabase cloudagi"
agent-password secrets request supabase-aryateja --requester arya --reason "supabase aryateja"
agent-password requests list
# Approve each one (Touch ID per approval, or `approve all all` if you want to do it in one shot)
agent-password requests approve <id1> all
agent-password requests approve <id2> all
agent-password requests approve <id3> all
```

### Verify

```bash
lockshell list --grep supabase
# should show 3 entries

# Smoke test against each project:
lockshell run --reason "list personal projects" -- \
  'SUPABASE_ACCESS_TOKEN={{SUPABASE_TOKEN_PERSONAL}} supabase projects list'
```

---

## GitHub

### Token

1. Go to <https://github.com/settings/personal-access-tokens/new>
2. Use a **fine-grained** token (not classic).
3. Name: `lockshell-aryateja-2026-05`
4. Expiration: 90 days (rotate)
5. Repository access: pick what you need — recommend "Selected repositories" only.
6. Permissions: read-only Contents + Issues + Pull requests for the typical agent workflow. Add Write only when you actually need it.

### Add and register

```bash
pbpaste | agent-password login add github-pat \
  --username arya --url https://github.com \
  --password-stdin --tag agent
lockshell register GITHUB_TOKEN github-pat password
agent-password secrets request github-pat --requester arya --reason "github access"
agent-password requests approve <id> all
```

### Smoke test

```bash
lockshell run --reason "list my private repos" -- \
  'curl -s -H "Authorization: Bearer {{GITHUB_TOKEN}}" \
    "https://api.github.com/user/repos?visibility=private&per_page=5" \
    | python3 -c "import sys,json; [print(r[\"full_name\"]) for r in json.load(sys.stdin)]"'
```

---

## OpenAI

```bash
# Token from https://platform.openai.com/api-keys (project-scoped recommended)
pbpaste | agent-password login add openai \
  --username arya --url https://platform.openai.com \
  --password-stdin --tag agent
lockshell register OPENAI_API_KEY openai password
agent-password secrets request openai --requester arya --reason "openai api"
agent-password requests approve <id> all

# Smoke test
lockshell run --reason "list openai models" -- \
  'curl -s https://api.openai.com/v1/models -H "Authorization: Bearer {{OPENAI_API_KEY}}" \
    | python3 -c "import sys,json; [print(m[\"id\"]) for m in json.load(sys.stdin)[\"data\"][:5]]"'
```

---

## Anthropic

```bash
# Token from https://console.anthropic.com/settings/keys
pbpaste | agent-password login add anthropic \
  --username arya --url https://console.anthropic.com \
  --password-stdin --tag agent
lockshell register ANTHROPIC_API_KEY anthropic password
agent-password secrets request anthropic --requester arya --reason "anthropic api"
agent-password requests approve <id> all

# Smoke test
lockshell run --reason "anthropic ping" -- \
  'curl -s https://api.anthropic.com/v1/messages \
    -H "x-api-key: {{ANTHROPIC_API_KEY}}" \
    -H "anthropic-version: 2023-06-01" \
    -H "content-type: application/json" \
    -d "{\"model\":\"claude-3-haiku-20240307\",\"max_tokens\":8,\"messages\":[{\"role\":\"user\",\"content\":\"hi\"}]}"'
```

---

## OpenRouter

```bash
# Token from https://openrouter.ai/keys
pbpaste | agent-password login add openrouter \
  --username arya --url https://openrouter.ai \
  --password-stdin --tag agent
lockshell register OPENROUTER_API_KEY openrouter password
agent-password secrets request openrouter --requester arya --reason "openrouter api"
agent-password requests approve <id> all
```

---

## Cloudflare — go slow here

**Cloudflare tokens have wide blast radius.** A token with "Edit zone DNS" can redirect any of your 4 domains to anywhere. We do this last and with the smallest scope possible.

### Step 1 — read-only token first

1. Go to <https://dash.cloudflare.com/profile/api-tokens>
2. Click "Create Token" → "Custom token"
3. Name: `lockshell-readonly-2026-05`
4. Permissions: **Zone → Read** only. **Account → Read** only. Nothing else.
5. Zone Resources: **Include all zones** (so you can list them)
6. Account Resources: **Include specific account** (your account)
7. Client IP: optional, but consider locking to your machine's IP if you have a static one
8. TTL: 90 days
9. Generate, copy, paste below.

```bash
pbpaste | agent-password login add cloudflare-readonly \
  --username arya --url https://dash.cloudflare.com \
  --password-stdin --tag agent
lockshell register CLOUDFLARE_RO_TOKEN cloudflare-readonly password
agent-password secrets request cloudflare-readonly --requester arya --reason "cloudflare zone inventory"
agent-password requests approve <id> all
```

### Step 2 — sanity check the read-only path before doing anything else

```bash
lockshell run --reason "inventory cloudflare zones" -- \
  'curl -s -H "Authorization: Bearer {{CLOUDFLARE_RO_TOKEN}}" \
    https://api.cloudflare.com/client/v4/zones \
    | python3 -c "import sys,json;[print(z[\"name\"], z[\"id\"]) for z in json.load(sys.stdin)[\"result\"]]"'
```

This should print a list of your domains. If it does, **stop here for this session** and inspect the audit log:

```bash
lockshell audit -n 5
```

Confirm the only Cloudflare entry is the read-only inventory.

### Step 3 — write tokens, ONLY when you have a specific change in mind

When you actually need to make a DNS change, create a **second token** scoped to that single zone:

1. New token at <https://dash.cloudflare.com/profile/api-tokens>
2. Name: `lockshell-write-<zone>-<purpose>-<date>`, e.g. `lockshell-write-aryateja-com-vercel-record-20260502`
3. Permissions: **Zone → DNS → Edit** only.
4. Zone Resources: **Include specific zone → aryateja.com** (just the one)
5. TTL: 24 hours.

```bash
pbpaste | agent-password login add cloudflare-write-aryateja \
  --username arya --url https://dash.cloudflare.com \
  --password-stdin --tag agent
lockshell register CLOUDFLARE_WRITE_ARYATEJA cloudflare-write-aryateja password
agent-password secrets request cloudflare-write-aryateja --requester arya --reason "single DNS edit"
agent-password requests approve <id> all
```

After the change, **delete the token from the Cloudflare dashboard immediately**. The vault entry can stay for reference; the dead token cannot do anything.

### Step 4 — close the session aggressively

Every time you finish a Cloudflare write, close the session:

```bash
agent-password session close
```

This drops every approval. The next agent-driven Cloudflare call will require a fresh Touch ID, which is exactly the friction you want.

---

## Final check

```bash
lockshell list                  # should show ~10 placeholders
lockshell list --grep supabase  # should show 3
lockshell dashboard             # opens HTML view in browser
lockshell audit -n 20           # review last 20 brokered calls
```

If everything looks good, you're done.

---

## What to do when something goes wrong

| Error | Fix |
|---|---|
| `not approved` | `agent-password secrets request <id> --requester arya --reason "..."`, then `requests approve <id> all` |
| `no shared session` | `agent-password session create` |
| `placeholder not registered` | `lockshell list` to check; `lockshell register ENV vault-id field` to fix |
| Touch ID does not appear | Known caveat for unsigned cargo build; approval still goes through. Will be fixed in v0.3. |
| Smoke test 401/403 | Token does not have the scope you assumed. Recreate at provider with correct permissions. |
| Smoke test 5xx | Provider issue, not lockshell. Check provider's status page. |

---

## What we did NOT set up

- **AWS** (you don't currently use the AWS CLI heavily; add when you do)
- **Stripe** (test/live keys deserve their own per-mode workflow when you start charging)
- **Resend / Sendgrid** (when you wire up email for personal-website)
- **Posthog / Plausible** (analytics — read-only ingestion-key handling is a separate pattern)

When you need these, the playbook is identical to Vercel's.
