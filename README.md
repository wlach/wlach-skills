# wlach-skills

Personal agent skills: small tools grown for my own use.

I am trying to find a way to take advantage of working with large language models (LLMs) while still maintaining a very
hands-on approach-- both understanding and interacting with the result. Not blindly accepting whatever output they produce.

In keeping with this philosophy, I build on top of existing vetted standards and tools, rather than vibecoding. Less is more.

If you like this repo, you may also enjoy https://github.com/wlach/idr-tools

This is [Houseplant software](https://hannahilea.com/blog/houseplant-programming/). 🪴 Use the ideas or code if you
find them helpful, no attribution required.

## Skills

- [skepsis](skills/skepsis/SKILL.md): Open a diff for human review with [Skepsis], then discuss or address the feedback.
- [open-editor](skills/open-editor/SKILL.md): Open a file or directory in your preferred editor using [open-editor], optionally at a line and column. Requires Node.js and pnpm.

[Skepsis]: https://github.com/oxidecomputer/skepsis
[open-editor]: https://github.com/OpenEditor/openeditor

## Install

Clone this repository, then symlink individual skills into `~/.agents/skills`:

```sh
mkdir -p ~/.agents/skills
ln -s ~/src/wlach-skills/skills/skepsis ~/.agents/skills/skepsis
```

Adjust the source path if you cloned elsewhere. Repeat for each skill you want to use. Edits in this repository are reflected through the symlinks.

To uninstall a linked skill:

```sh
unlink ~/.agents/skills/skepsis
```

The source stays in this repository.
