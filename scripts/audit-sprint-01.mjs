#!/usr/bin/env node
/**
 * Sprint 01: static source audit. Read-only and safe; no DOM mutation.
 * Run after the application's complete source is restored: node scripts/audit-sprint-01.mjs
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, relative, extname } from 'node:path';

const sourceRoot = join(process.cwd(), 'src', 'app');
const inspected = [];
const patterns = [
  ['legacy brand', /\bJEDAI\b/gi],
  ['legacy route', /(?:\/)jedai\b/gi],
  ['legacy DOM cleaner', /\b(?:BrandNameCleaner|NumberCleaner)\b/g],
  ['decorative index', /(?:hc-shot-index|hc-project-meta\s*>\s*span:first-child|n:\s*["']0[1-4]["'])/g],
  ['DOM text mutation', /(?:createTreeWalker|\.textContent\s*=|\.nodeValue\s*=)/g],
];

async function walk(dir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, item.name);
    if (item.isDirectory()) await walk(path);
    else if (/\.(jsx?|tsx?|css)$/.test(extname(path))) inspected.push(path);
  }
}
try { await walk(sourceRoot); }
catch (error) {
  console.error('App source missing. Restore complete application before auditing:', error.message);
  process.exit(2);
}
const report = [];
for (const path of inspected) {
  const data = await readFile(path, 'utf8');
  const lines = data.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    for (const [label, rx] of patterns) {
      rx.lastIndex = 0;
      if (rx.test(lines[i])) report.push({ file: relative(process.cwd(), path), line: i + 1, issue: label, preview: lines[i].trim().slice(0, 125) });
    }
  }
}
console.log(JSON.stringify({ inspectedFiles: inspected.length, findings: report.length, report }, null, 2));
process.exitCode = report.length ? 1 : 0;
