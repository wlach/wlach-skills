import { readFileSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import launch from 'launch-editor';
import { spawn } from 'node:child_process';
import { parse } from 'shell-quote';

const configPath = join(process.env.XDG_CONFIG_HOME || join(homedir(), '.config'), 'open-editor', 'editor');

function main() {
  const [target, ...extra] = process.argv.slice(2);
  if (!target || extra.length) {
    throw new Error('Usage: node open-editor.mjs <file[:line[:column]]|directory>');
  }

  let editor = process.env.LAUNCH_EDITOR?.trim();
  if (!editor) {
    try {
      editor = readFileSync(configPath, 'utf8').trim();
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
  if (!editor) {
    throw new Error(`No editor selected. Set LAUNCH_EDITOR for this invocation, or save your preferred editor command in ${configPath}.`);
  }

  // Remote paths are opaque to the local filesystem and to launch-editor.
  const remote = /^ssh:\/\//.test(target) || /^\/[^/]+:[^/]*:\//.test(target);
  if (remote) {
    const command = parse(editor);
    if (!command.length || command.some(part => typeof part !== 'string')) {
      throw new Error('Editor must be an executable with arguments, without shell operators.');
    }
    console.log(`Launching ${editor}: ${target}`);
    const child = spawn(command[0], [...command.slice(1), target], { stdio: 'inherit' });
    child.on('error', error => {
      console.error(error.message);
      process.exitCode = 1;
    });
    child.on('exit', (code, signal) => {
      if (code || signal) {
        console.error(`Editor exited with ${signal || `code ${code}`}.`);
        process.exitCode = 1;
      }
    });
    return;
  }

  // Preserve literal filenames containing colons when they exist.
  const match = existsSync(target) ? null : target.match(/^(.*?)(:\d+(?::\d+)?)$/);
  const file = resolve(match ? match[1] : target);
  const location = match ? match[2] : '';
  if (!existsSync(file)) throw new Error(`Path does not exist: ${file}`);

  console.log(`Launching ${editor}: ${file}${location}`);
  // Enable launch-editor's filename/line/column convention for custom launchers.
  process.env.LAUNCH_EDITOR = editor;
  launch(`${file}${location}`, editor, () => {
    process.exitCode = 1;
  });
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
