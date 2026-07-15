---
{
  "slug": "connecting-terminals-to-web-mconnect",
  "title": "Control AI Coding Agents From Your Phone With MConnect",
  "description": "A complete, copyable guide to running LeCoder MConnect, pairing your phone, choosing guardrails, verifying the connection, and troubleshooting common setup problems.",
  "excerpt": "Set up a local MConnect session, connect from your phone, and supervise Claude Code, Gemini CLI, Cursor Agent, Codex, or any terminal workflow without exposing a router port.",
  "date": "2026-07-11",
  "category": "Implementation Guide",
  "tags": [
    "MConnect",
    "AI Agents",
    "Mobile",
    "Local-first",
    "Cloudflare"
  ],
  "coverImage": "/blog-images/mconnect-demo.webp",
  "relatedArticles": [
    "2",
    "3"
  ],
  "guide": {
    "purpose": "Run a coding-agent terminal on your computer and supervise it from your phone.",
    "audience": [
      "Engineers already using terminal-based coding agents",
      "Founders who need visibility into long-running technical work",
      "Teams evaluating local-first remote agent control"
    ],
    "outcomes": [
      "A working MConnect session on your computer",
      "A paired phone with live terminal input and output",
      "A guardrail level chosen for your risk tolerance",
      "A repeatable diagnostic and troubleshooting path"
    ],
    "prerequisites": [
      "macOS or Linux",
      "Node.js 20+",
      "Python 3",
      "C++ build tools",
      "cloudflared"
    ],
    "verifiedAt": "July 11, 2026 against the public MConnect repository"
  },
  "status": "published"
}
---

AI coding agents are useful because they can keep working through a plan, run tests, and wait for decisions. The problem is that the decision often arrives when you are no longer at the laptop. A package install needs approval. A destructive command is blocked. A test fails and the agent needs a new instruction.

MConnect keeps the agent on your computer and turns your phone into a control surface for that terminal. This guide explains why that model matters, when to use it, how the parts fit together, and how to get a working session without guessing.

> **Short version:** run `npx lecoder-mconnect`, choose a preset and guardrail level, scan the QR code, and test a shell session before trusting it with a real project.

## Why this exists

Terminal agents such as Claude Code, Gemini CLI, Cursor Agent, and Codex can run for much longer than a normal command. They also use interactive terminal interfaces, so a basic webpage that only sends and receives plain text is not enough. The remote side must preserve terminal behavior, stream output in real time, and send your keystrokes back to the same process.

MConnect solves that specific problem. It runs beside the coding agent on your computer, manages the terminal process, and gives your phone a live interface to it. It is not a cloud development environment and it does not move your repository into a hosted workspace.

## Who this guide is for

Use this guide if one of these situations sounds familiar:

- You start a long Claude Code or Codex task and want to leave your desk without losing visibility.
- You need to approve or reject sensitive commands from another room or while travelling.
- You want to monitor several terminal-based agents without opening a full remote desktop session.
- You are a founder supervising technical work and need a clear view of what an agent is doing before approving the next step.
- You are testing whether mobile agent control belongs in your own internal workflow.

This guide assumes you are comfortable opening a terminal and copying commands. You do not need to understand WebSockets, pseudo-terminals, or Cloudflare Tunnel before starting. Those pieces are explained below.

## Practical use cases

### 1. Supervise a long-running coding task

Start a migration, refactor, or test run on your computer. Keep the session visible on your phone so you can respond when the agent reaches a decision point.

### 2. Keep dangerous actions human-approved

MConnect includes guardrail levels. A risky command can be blocked or held for approval instead of running immediately. This is useful when the agent can install packages, publish artifacts, push Git history, or delete files.

### 3. Check multiple terminal agents

The project supports terminal-based tools including Claude Code, Gemini CLI, Cursor Agent, Codex, Aider, OpenCode, and ordinary shell sessions. The exact interface differs by tool, but the transport is the same: if it runs in a terminal, MConnect can wrap the session.

### 4. Demo a local agent without handing over your laptop

A phone view makes it easier to demonstrate an agent workflow while the actual code and process remain on the development machine.

## How MConnect works

The architecture is easier to understand as four layers:

```text
Phone browser or native iOS app
              |
              | QR pairing + WebSocket connection
              v
      Cloudflare Tunnel
              |
              v
 MConnect server on your computer
              |
              | pseudo-terminal sessions
              v
Claude Code / Gemini CLI / Cursor / Codex / shell
```

- **Pseudo-terminal (PTY):** `node-pty` creates a real terminal process, preserving colors, cursor movement, prompts, and interactive controls.
- **WebSocket:** carries terminal input and output between the phone and computer in real time.
- **Cloudflare Tunnel:** creates the route to your computer without requiring router port forwarding.
- **Guardrails:** evaluate commands and decide whether to allow, block, or request approval.
- **Optional Opik tracing:** records session events when you explicitly configure it. MConnect still runs without Opik.

![LeCoder MConnect running coding-agent sessions on a Mac and iPhone](/blog-images/mconnect-demo.webp "The project demo shows MConnect on a Mac with Claude Code, Gemini CLI, and Cursor Agent available from a phone.")

## Before you start

The public repository lists these prerequisites:

- Node.js 20 or newer
- Python 3
- A C++ compiler for `node-pty`
- Xcode Command Line Tools on macOS, or `build-essential` on Linux
- `cloudflared` for remote access
- Docker only if you want container isolation

Check what is already installed:

```bash
node --version
python3 --version
cloudflared --version
```

On macOS, install the build tools and Cloudflare Tunnel client with:

```bash
xcode-select --install
brew install cloudflared
```

On Debian or Ubuntu, install the native build requirements with:

```bash
sudo apt update
sudo apt install -y build-essential python3
```

Use Cloudflare's official installation instructions for `cloudflared` on Linux because the package source differs by distribution.

## Step 1: Run diagnostics first

Before opening a real project, ask MConnect to check the local requirements:

```bash
npx lecoder-mconnect doctor
```

The diagnostic command checks the Node.js environment, `node-pty`, Docker availability, `cloudflared`, and tmux. Docker and tmux are optional for the basic path, so read each result instead of assuming every optional component must be green.

Fix missing prerequisites now. It is much easier than debugging a half-open mobile session later.

## Step 2: Start the interactive setup

Move into a low-risk test directory, then start MConnect:

```bash
mkdir -p ~/mconnect-test
cd ~/mconnect-test
npx lecoder-mconnect
```

The first run opens an interactive wizard. For the safest first test:

1. Choose **Shell Session** instead of a coding agent.
2. Choose the **default** guardrail level.
3. Wait for the local server and tunnel checks to finish.
4. Keep the terminal open. Closing it stops the session.

Starting with a plain shell proves the connection before a coding agent receives access to a real repository.

## Step 3: Pair your phone

When startup completes, MConnect displays a QR code and pairing information.

1. Open the phone camera.
2. Scan the QR code shown in the terminal.
3. Open the resulting address.
4. Wait for the terminal view to connect.

The current tunnel URL is temporary. When the MConnect process stops, that session URL should no longer be treated as valid. Do not post the pairing URL or QR code publicly while a session is active.

## Step 4: Verify input and output

Do not jump directly to a production repository. Run a harmless command from the phone first:

```bash
printf 'mconnect is connected\n'
pwd
```

A successful first test has four observable results:

- The command typed on the phone appears in the computer terminal.
- The output appears on both screens.
- The working directory is the test directory you selected.
- Disconnecting and reconnecting the phone does not create an unexpected second shell.

If any of these fail, stop and use the troubleshooting section before launching an agent.

## Step 5: Start a repeatable shell session

Once the interactive flow works, you can skip the wizard for a shell-only session:

```bash
npx lecoder-mconnect start --preset shell-only --guardrails default
```

You can also install the command globally:

```bash
npm install -g lecoder-mconnect
mconnect doctor
mconnect presets
mconnect start --preset shell-only --guardrails default
```

The global install is optional. Use `npx` if you prefer not to keep another global package installed.

## Step 6: Move to a coding agent

After the shell test passes, stop the session, move into the repository you actually want to work on, and run MConnect again:

```bash
cd /path/to/your/project
npx lecoder-mconnect
```

Choose the agent preset you want in the wizard. The project documentation lists tested TUI support for Claude Code, Gemini CLI, and Cursor Agent, with Codex and Aider supported through shell mode.

![Claude Code running in the MConnect mobile terminal](/blog-images/mconnect-claude-mobile.webp "Claude Code in the MConnect phone interface. Screenshot from the public MConnect repository.")

![Gemini CLI running in the MConnect mobile terminal](/blog-images/mconnect-gemini-mobile.webp "Gemini CLI in the MConnect phone interface. Screenshot from the public MConnect repository.")

![Cursor Agent running in the MConnect mobile terminal](/blog-images/mconnect-cursor-mobile.webp "Cursor Agent in the MConnect phone interface. Screenshot from the public MConnect repository.")

## Choose the right guardrail level

Guardrails are not a replacement for backups, Git review, or least-privilege credentials. They are an additional decision layer between an agent and the shell.

| Level | Automatically blocks | Requires approval | Best fit |
| --- | --- | --- | --- |
| Default | Catastrophic commands such as `rm -rf /` and fork bombs | Force push and `npm publish` | Normal development |
| Strict | Destructive operations | Any `rm` and all `git push` commands | Sensitive repositories or supervised demos |
| Permissive | Catastrophic commands | Force push | Experienced users in disposable environments |
| None | Nothing | Nothing | Isolated experiments only |

Start with **Default**. Move to **Strict** when the repository, credentials, or deployment access makes a mistake expensive. Avoid **None** unless the session runs inside a disposable container with no valuable credentials.

## Useful command reference

```bash
mconnect                 # Start the interactive wizard
mconnect start           # Same as the default command
mconnect doctor          # Check local dependencies
mconnect presets         # List available agent presets
mconnect start --preset shell-only --guardrails default
```

Common options from the public CLI documentation:

| Option | Purpose |
| --- | --- |
| `--dir <path>` | Set the working directory |
| `--preset <name>` | Skip preset selection |
| `--guardrails <level>` | Skip guardrail selection |
| `--port <number>` | Change the local server port from 8765 |
| `--no-tmux` | Disable tmux visualization |
| `--code` | Show the pairing code for desktop use |

## Optional: add container isolation

MConnect can run agents inside Docker when you want another boundary between the agent and the host machine. First confirm Docker is running:

```bash
docker ps
```

Then start MConnect and choose the **Container Dev** preset. The repository documents support for standard `.devcontainer/devcontainer.json` files, so an existing development-container configuration can be reused.

Container isolation is useful, but it does not make a dangerous workflow automatically safe. Review mounted directories, environment variables, Docker socket access, and network permissions before giving the agent broad control.

## Troubleshooting

### `node-pty` fails to build

On macOS, confirm Xcode Command Line Tools are installed:

```bash
xcode-select --install
```

On Debian or Ubuntu:

```bash
sudo apt install -y build-essential python3
```

If you cloned the repository for development, reinstall dependencies and rebuild `node-pty` from the repository root:

```bash
npm install
npm rebuild node-pty
```

### The tunnel does not connect

Check that `cloudflared` is available:

```bash
cloudflared --version
```

On macOS, reinstall it with:

```bash
brew install cloudflared
```

Then run diagnostics again:

```bash
npx lecoder-mconnect doctor
```

### The phone opens a page but the terminal stays blank

Return to the computer and check whether the MConnect process is still running. Then verify that the selected session started successfully and retry with the `shell-only` preset. A blank agent TUI is harder to diagnose than a plain shell, which is why the guide starts there.

### The wrong project directory is open

Stop the session and restart from the intended repository, or pass the directory explicitly after a global install:

```bash
mconnect --dir /path/to/your/project
```

Never rely on memory when the agent has write access. Confirm the path with `pwd` before approving changes.

## Security and privacy boundaries

The public project documentation describes MConnect as local-first: the terminal and repository remain on your computer, while the tunnel carries the active session to the phone. It also states that accounts and cloud storage are not required for the basic flow.

That does **not** mean there are no external services or risks:

- Cloudflare Tunnel carries network traffic for the remote connection.
- The optional Opik integration sends trace events when configured.
- The coding agent itself may use a hosted model and transmit context according to that provider's policy.
- Anyone with an active pairing URL may be able to reach the session, depending on the current authentication design. Treat the QR code and URL as credentials.
- Shell access inherits the permissions and credentials available to the MConnect process. Run it with the least privilege needed.

For sensitive work, use a dedicated development account or container, keep credentials scoped, choose strict guardrails, and stop the session when you are finished.

## What this solves for a nontechnical founder

MConnect does not replace an engineer or make an autonomous agent safe by default. It solves a narrower operational problem: **you can see the work, respond to a blocked decision, and keep the execution on a machine you control.**

That makes it useful for supervised prototypes, internal tooling, demos, and long-running development tasks. It is less suitable for unattended production operations, customer-data workflows without a security review, or any process where a mistaken shell command can cause irreversible damage.

## What to do next

1. Complete the shell-only test in a disposable directory.
2. Repeat it in a small Git repository with no production credentials.
3. Try one coding agent with Default guardrails.
4. Move to Strict guardrails before testing sensitive actions.
5. Document which commands always need human approval in your own workflow.

The source, issue tracker, and latest setup details are in the [LeCoder MConnect repository](https://github.com/aryateja2106/lecoder-mconnect). The package is published as [`lecoder-mconnect`](https://www.npmjs.com/package/lecoder-mconnect).
