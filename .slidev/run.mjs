import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Every repository script uses the same theme, regardless of the deck's location.
const cli = fileURLToPath(new URL('../node_modules/@slidev/cli/bin/slidev.mjs', import.meta.url));
const theme = fileURLToPath(new URL('./', import.meta.url)).replaceAll('\\', '/');
const child = spawn(process.execPath, [cli, ...process.argv.slice(2), '--theme', theme], {
  stdio: 'inherit',
});
child.on('error', (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
child.on('exit', (code) => { process.exitCode = code ?? 1; });
