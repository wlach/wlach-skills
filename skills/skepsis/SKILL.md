---
name: skepsis
description: Run Skepsis for human review, then address or respond to inline feedback when the user finishes. Use when the user requests a Skepsis review.
---

# Skepsis review

- In the current worktree, run `skepsis` (or `npx --yes @oxide/skepsis`, requiring Node.js 22+). Use the requested diff scope; otherwise use the default. For working-copy-only review, use `--git -r HEAD` (Git) or `-r @` (jj). Inline comments require a diff ending at the working copy.
- Note existing `<review>...</review>` comments. Keep Skepsis running across turns and retain its process handle and worktree path.
- Verify startup, share the printed localhost URL, and say: **“Leave comments inline, then reply ‘address’ to apply the feedback or ‘respond’ to discuss it. Reply ‘done’ to use your previously requested mode (default: ‘respond’).”** End the turn. Leave reviewed files untouched while waiting.

The user's reply is the completion signal. **address** or **respond** selects the mode; **done** uses the previously requested mode, defaulting to **respond**:

- **respond:** Consider each comment and explain your assessment and proposed changes in the conversation. Leave code and review blocks unchanged.
- **address:** Make the requested changes, remove resolved review blocks, run appropriate checks, and summarize the result.

- Skepsis writes `<review>...</review>` comments directly into source files. Read the current files and diff, including untracked files in scope, and handle new feedback in the selected mode. Include file locations in your response.
- Stop the Skepsis process you started.
