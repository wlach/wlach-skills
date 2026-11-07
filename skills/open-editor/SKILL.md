---
name: open-editor
description: Open a file or directory in the user's preferred editor, optionally at a line and column. Use when the user asks to open a file for editing or show code in their editor.
---

# Open in an editor

Uses [launch-editor](https://github.com/vitejs/launch-editor). Requires Node.js and pnpm.

- If dependencies are missing, run `pnpm --dir <skill-directory> install --frozen-lockfile`.
- Run `node <skill-directory>/scripts/open-editor.mjs '<path>[:line[:column]]'`. Directories work too.
- Editor selection: `LAUNCH_EDITOR`, then the command in `$XDG_CONFIG_HOME/open-editor/editor` (default: `~/.config/open-editor/editor`). If neither is set, ask which editor to use and whether to remember it. Use `LAUNCH_EDITOR` for a one-time choice; save a remembered command as a single line in the config file.
- Personal wrapper scripts can handle special editor setups. Custom launchers receive `filename [line column]`. SSH URIs and Emacs TRAMP paths pass unchanged as a single argument; use the configured editor's remote path syntax, without appending local-style line/column suffixes.
- Return control while the user edits. Leave the file untouched until they finish, then reread it before continuing.
