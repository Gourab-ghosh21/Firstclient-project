#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

console.log('\x1b[33m%s\x1b[0m', '==============================================================');
console.log('\x1b[36m%s\x1b[0m', '  🚀 JYOTI ENTERPRISE — B2B WHOLESALE GARMENTS PLATFORM');
console.log('\x1b[33m%s\x1b[0m', '==============================================================');
console.log('  🌐 Frontend:  \x1b[32mhttp://localhost:3000\x1b[0m');
console.log('  ⚙️  Backend:   \x1b[34mhttp://localhost:5001\x1b[0m');
console.log('  🩺  Health:    \x1b[34mhttp://localhost:5001/api/health\x1b[0m');
console.log('\x1b[33m%s\x1b[0m', '==============================================================\n');

function runService(name, cwd) {
  const child = spawn(npmCmd, ['run', 'dev'], {
    cwd,
    stdio: 'inherit',
    env: { ...process.env, FORCE_COLOR: 'true' },
    shell: isWindows,
  });

  child.on('error', (err) => {
    console.error(`[${name}] Failed to start:`, err.message);
  });

  return child;
}

const backendProcess = runService('BACKEND', path.join(rootDir, 'backend'));
const frontendProcess = runService('FRONTEND', path.join(rootDir, 'frontend'));

function cleanup() {
  console.log('\nShutting down development servers...');
  try {
    if (backendProcess && !backendProcess.killed) backendProcess.kill('SIGINT');
  } catch (e) {}
  try {
    if (frontendProcess && !frontendProcess.killed) frontendProcess.kill('SIGINT');
  } catch (e) {}
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
