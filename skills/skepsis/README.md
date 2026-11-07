# Skepsis skill

A small agent skill for human code review with [Skepsis](https://github.com/oxidecomputer/skepsis). Your agent opens the diff, waits while you leave inline comments, then reads the feedback when you reply **done**.

## Install

Install for your agent with [the skills CLI](https://github.com/vercel-labs/skills):

```sh
# Codex
npx skills add wlach/skepsis-skill --skill skepsis -g -a codex

# Pi
npx skills add wlach/skepsis-skill --skill skepsis -g -a pi

# Claude Code
npx skills add wlach/skepsis-skill --skill skepsis -g -a claude-code
```

Requires Node.js 22.20+ for the installer. Skepsis must be on PATH, or the agent can run it with `npx`.

## Use

Ask your agent:

> Open this diff in Skepsis for review.

Leave comments in the browser, then reply **done** in the agent conversation.

Choose how the agent handles your feedback:

- **Address:** “Open Skepsis and address my feedback when I'm done.” The agent makes changes and checks them.
- **Respond** (default): “Open Skepsis and respond to my feedback when I'm done.” The agent considers the comments and discusses proposed changes before editing.

When finished, reply **address** to apply the feedback or **respond** to discuss it. **Done** uses your previously requested mode, defaulting to **respond**.

This repository contains instructions only; Skepsis is a separate project.

This work is dedicated to the public domain. Use it however you like; no attribution required.
