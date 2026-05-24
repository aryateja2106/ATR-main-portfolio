# Community & Audience Engine Playbook

This document defines the strategy, operational rhythm, and channel mechanics for growing Arya Teja Rudraraju's personal brand and open source community. 

Our target audience is composed of terminal-first, local-first, self-hosted, and security-minded software engineers, founders, and AI system architects.

---

## 1. Audience Segmentation & Channels

Our audience exists in high-density, technical hubs where hype is rejected and verifiable proof is rewarded.

```
┌────────────────────────────────────────────────────────┐
│                   PRIMARY AUDIENCES                    │
├────────────────────┬──────────────────┬────────────────┤
│    Self-Hosters    │  Security Engs   │ AI Toolmakers  │
│  (local-first,     │ (secrets, RLS,   │ (MCP, PTY, VM  │
│   tunnels, VMs)    │  exfil risk)     │  orchestration)│
└─────────┬──────────┴────────┬─────────┴───────┬────────┘
          ▼                   ▼                 ▼
┌────────────────────────────────────────────────────────┐
│                   ENGAGEMENT HUBS                      │
├─────────────────┬───────────────────┬──────────────────┤
│   Hacker News   │    Lobsters /     │    Developer     │
│   & Lobsters    │    r/selfhosted   │    Newsletters   │
└─────────────────┴───────────────────┴──────────────────┘
```

### A. Hacker News & Lobsters (High Density)
* **Goal**: Launch deep-dives, architectural post-mortems, and security disclosures.
* **Tone**: Zero marketing fluff. Highly technical, self-critical, source-grounded. Lead with lessons learned and real failures.
* **Format**: Long-form blog posts (8 to 12 minute reads) cross-linked to public GitHub repositories.

### B. r/selfhosted & r/LocalLLM (Local-First/Privacy)
* **Goal**: Target self-hosters and local inference builders who want to run LLMs on their own hardware.
* **Tone**: Pragmatic, instructions-first. Emphasize offline capability, low footprint, and local Keychain integrations.
* **Format**: Markdown setups, CLI snippets, and lightweight Docker/Bun run scripts.

### C. LinkedIn & X (Daily Loops)
* **Goal**: Capture daily insights, video demos, and micro-summaries of in-progress builds.
* **Tone**: Rapid shipping, high-energy building in public.
* **Format**: 200-word takeaways paired with high-resolution terminal logs or 45-second walkthrough recordings.

---

## 2. Blog Post Pipeline (Next 4 Flagship Pieces)

To maintain momentum after the "Cloud Brains, Local Hands" post, we will publish the following developer-focused pieces:

### Post 1: "The Mobile Terminal in Your Pocket: Building a Zero-Latency PTY Bridge"
* **Target Audience**: AI toolmakers, self-hosters, mobile devs.
* **Focus**: The architecture of LeCoder MConnect. How to handle terminal escapes (ANSI/VT100), manage pseudo-terminals (`node-pty`) in Node, stream updates over WebSockets under high latency, and handle secure local handshakes via QR codes.
* **Call to Action**: Try the new home terminal demo, check out `lecoder-mconnect` on GitHub.

### Post 2: "RAG is Over-Confident: Implementing Hard Citation Grounding for Research Workspaces"
* **Target Audience**: RAG engineers, AI researchers, LLM practitioners.
* **Focus**: Inside the LeSearch AI synthesis engine. Why typical vector search chats hallucinate and make up citations, and how to build a strict bounding-box validation chain that cross-references source PDF coordinates before returning an answer.
* **Call to Action**: Join the LeSearch AI beta waitlist.

### Post 3: "Deploying Personal PWAs to Your Closet Mac Mini: The Software Factory Architecture"
* **Target Audience**: Self-hosters, home lab enthusiasts, r/selfhosted.
* **Focus**: How to use AI coding agents to build a private app suite, deploy it to cheap local hardware, and securely expose it to your iPhone as a home-screen PWA via Cloudflare Tunnels without opening firewall ports.
* **Call to Action**: Join the newsletter to get the early install script.

### Post 4: "Context Engineering: How I Structure My Codebase So AI Agents Finish Tasks in One Shot"
* **Target Audience**: Cursor, Claude Code, and Gemini CLI developers.
* **Focus**: How to write `AGENTS.md` and `.omc/` schemas so any AI coding agent starting in your workspace instantly understands the brand strings, tech stack, and execution rules, reducing token consumption and command errors.
* **Call to Action**: Star the repo, copy the templates.

---

## 3. Newsletter Launch Funnel (Supabase + Resend)

The footer now hosts our active `NewsletterForm` connected to the `/api/subscribe` endpoint. Here is the operational cadence:

```
                  ┌──────────────────────────────┐
                  │   SUBSCRIBE (Footer Form)    │
                  └──────────────┬───────────────┘
                                 ▼
                  ┌──────────────────────────────┐
                  │     SUPABASE SUBSCRIPTION    │
                  │  Writes to db table, checks  │
                  │  for double signups          │
                  └──────────────┬───────────────┘
                                 ▼
                  ┌──────────────────────────────┐
                  │     WELCOME ONBOARDING       │
                  │  Resend fires welcome email  │
                  │  with early beta key links   │
                  └──────────────┬───────────────┘
                                 ▼
                  ┌──────────────────────────────┐
                  │   MONTHLY TECHNICAL DIGEST   │
                  │  Single markdown digest on   │
                  │  shipping updates + new OSS  │
                  └──────────────────────────────┘
```

### A. The Onboarding Welcome Email
The moment a developer subscribes, `/api/subscribe` writes them to `newsletter_subscribers` and triggers a welcome email via Resend:
* **Subject**: Cloud Brains, Local Hands. (Welcome to Arya's workbench)
* **Body Strategy**:
  - Direct message: "I build terminal-first, local-first tools like LeCoder MConnect and LeSearch AI. No fluff."
  - Value delivery: Direct links to the early access invite codes for the LeSearch AI beta and the `mconnect` npm package.
  - Interactive request: "Reply to this email with your current local stack, what you're self-hosting, or what agent workflow you want to automate. I read and reply to every message."

### B. Monthly Technical Digest
* **Format**: A plain-text or clean monochrome HTML email. No heavy styling, no promotional headers.
* **Structure**:
  1. **What shipped**: Concrete changelogs for MConnect, LeSearch, and Lockshell.
  2. **Failed experiments**: An honest summary of what was attempted but discarded (e.g. "Tried using vector databases locally on the mobile client, too slow, reverted to serverless indexes").
  3. **Starred tools**: A quick recommendation list of 3 interesting repositories from the `/github-stars` index.

---

## 4. Video Production Loop (LinkedIn & YouTube Shorts)

To capture modern video audiences, we will execute a regular production loop focused on highly visual terminal-native demonstrations.

### Video Recipe: The 45-Second Mobile Agent Hook
```
 ┌──────────────────────┬──────────────────────┬──────────────────────┐
 │     0 to 5 secs      │     5 to 30 secs     │    30 to 45 secs     │
 ├──────────────────────┼──────────────────────┼──────────────────────┤
 │  THE VISUAL HOOK     │  THE TECHNICAL DEMO  │   THE PROVENANCE     │
 │  Finger scans QR on  │  Split screen shows  │  Shows terminal      │
 │  screen; phone       │  typing on phone and │  receipt with zero   │
 │  becomes agent TUI   │  mac building a component│ leaks; CTA links   │
 └──────────────────────┴──────────────────────┴──────────────────────┘
```

1. **Visual Hook (0 to 5 seconds)**: 
   - Start with a close-up of a phone camera scanning a QR code in the terminal.
   - Screen text: "Stop sitting at your desk to wait for your AI agent."
2. **The Walkthrough (5 to 30 seconds)**:
   - Split screen showing the phone terminal TUI running `mconnect` and the laptop compiling a component in real-time.
   - Voiceover or clean text overlay explaining: "We are running Claude Code over an encrypted Cloudflare Tunnel. When I step away, I still get the full tmux multiplexer panes on LTE. I can approve build actions, read stack traces, and run migrations from my pocket."
3. **The Proof (30 to 45 seconds)**:
   - Show the final Touch ID prompt on macOS requesting approval for a command, proving keys never left the machine.
   - Call to Action: "Get the CLI tool at `npx lecoder-mconnect` or read the full architecture at `aryateja.com`."

---

## 5. Community-Led Growth Mechanics

### A. Developer Fellowships & Beta Slots
* Offer dedicated slots for advanced agents builders in the SF area. Use the `/about` and `/faq` routes to direct local developers to physical meetups.
* Establish a direct "contributions channel" on GitHub, labeling open issues in MConnect and Lockshell as `good-first-issue` specifically suited for self-hosters and security-focused builders.

### B. Gauging and Measurement (Telemetry without Tracking)
* In line with privacy-first values, we reject invasive session recorders and cookie banners.
* Gauge audience engagement via:
  - **Newsletter signups**: Active volume per week.
  - **GitHub telemetry**: Stars, forks, clone counts, and issues filed on LeCoder MConnect and Lockshell.
  - **Resend metrics**: Click-through rates and replies to the welcome onboarding email.
