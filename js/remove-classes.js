#!/usr/bin/env node
/**
 * remove-classes.js
 * Strips class attributes, <link> tags, <style> blocks, <header>, and <footer> from HTML.
 *
 * Usage:
 *   node remove-classes.js <input.html> [output.html] [flags]
 *
 * Flags (all stripping is ON by default; use these to skip individual steps):
 *   --no-classes   Keep class="..." attributes
 *   --no-links     Keep <link> tags
 *   --no-styles    Keep <style>...</style> blocks
 *   --no-scripts   Keep <script>...</script> blocks
 *   --no-header    Keep <header>...</header>
 *   --no-footer    Keep <footer>...</footer>
 *
 * If no output file is given, the input file is overwritten.
 */

const fs   = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if (!args.length || args[0].startsWith('--')) {
  console.error('Usage: node remove-classes.js <input.html> [output.html] [--no-classes] [--no-links] [--no-styles] [--no-header] [--no-footer]');
  process.exit(1);
}

const inputFile  = args[0];
const flags      = new Set(args.filter(a => a.startsWith('--')));

// Second positional arg is optional output file (not a flag)
const secondArg  = args[1] && !args[1].startsWith('--') ? args[1] : null;
const outputFile = secondArg;

const stripClasses = !flags.has('--no-classes');
const stripLinks   = !flags.has('--no-links');
const stripStyles  = !flags.has('--no-styles');
const stripScripts = !flags.has('--no-scripts');
const stripHeader  = !flags.has('--no-header');
const stripFooter  = !flags.has('--no-footer');

const inputPath = path.resolve(inputFile);

if (!fs.existsSync(inputPath)) {
  console.error(`File not found: ${inputPath}`);
  process.exit(1);
}

let html = fs.readFileSync(inputPath, 'utf8');
const report = [];

// ── 1. Remove class attributes ─────────────────────────────────────────────
if (stripClasses) {
  const before = html.length;
  html = html.replace(/\s+class="[^"]*"/gi, '');
  html = html.replace(/\s+class='[^']*'/gi, '');
  report.push(`classes removed`);
}

// ── 2. Remove <link … > tags (self-closing or not) ─────────────────────────
if (stripLinks) {
  html = html.replace(/<link\b[^>]*\/?>/gi, '');
  report.push(`<link> tags removed`);
}

// ── 3. Remove <style>…</style> blocks (including inline <style> in <head>) ─
if (stripStyles) {
  html = html.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
  report.push(`<style> blocks removed`);
}

// ── 4. Remove <script>…</script> blocks ────────────────────────────────────
if (stripScripts) {
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  report.push(`<script> blocks removed`);
}

// ── 5. Remove <header>…</header> ───────────────────────────────────────────
if (stripHeader) {
  html = html.replace(/<header\b[^>]*>[\s\S]*?<\/header>/gi, '');
  report.push(`<header> removed`);
}

// ── 6. Remove <footer>…</footer> ───────────────────────────────────────────
if (stripFooter) {
  html = html.replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/gi, '');
  report.push(`<footer> removed`);
}

// ── Collapse excessive blank lines left behind ──────────────────────────────
html = html.replace(/(\r?\n\s*){3,}/g, '\n\n');

const outputPath = outputFile ? path.resolve(outputFile) : inputPath;
fs.writeFileSync(outputPath, html, 'utf8');

console.log(`Done - ${report.join(', ')}. Written to: ${outputPath}`);
