// Build guard for hosted catalogue PDFs. Runs before every build (npm run build -> prebuild).
// The build FAILS if anything in public/catalogues is not an approved catalogue, so a price list
// (or any unreviewed file) cannot reach the live site by accident.
//
// Rules:
//  - every PDF in public/catalogues must be listed in src/data/catalogues.json ("hosted")
//  - its SHA-256 must match the approved entry (content changes go through the approval/update routine)
//  - its filename and its source path must not look like a price list, Hi-Rez duplicate, Topstar, archive, terms of sale or pallet lines (client rule: never show pallet lines)
//  - no "coming soon" catalogue entries (client rule: leave them off until the file exists)
//  - it must be under 25 MiB (Cloudflare Workers static assets per-file limit)
//  - every hosted entry must have its file present
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = path.resolve(import.meta.dirname, '..');
const dir = path.join(root, 'public', 'catalogues');
const data = JSON.parse(fs.readFileSync(path.join(root, 'src/data/catalogues.json'), 'utf8'));
const LIMIT = 25 * 1024 * 1024;
const BLOCKED = /price|pricing|rrp|quote|hi-?rez|topstar|archive|terms[- ]of[- ]sale|pallet/i;

const errors = [];
for (const e of [...data.hosted, ...data.external]) if (e.comingSoon) errors.push(`${e.slug || e.label}: "coming soon" catalogues must be left off the site (client rule).`);
const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
const byFile = new Map(data.hosted.map((e) => [path.basename(e.file), e]));

for (const f of files) {
  const full = path.join(dir, f);
  if (fs.statSync(full).isDirectory()) { errors.push(`${f}: subfolders are not allowed in public/catalogues`); continue; }
  const e = byFile.get(f);
  if (!/^[a-z0-9-]+\.pdf$/.test(f)) errors.push(`${f}: file name must be lowercase letters, digits and hyphens, ending in .pdf`);
  if (BLOCKED.test(f)) errors.push(`${f}: name looks like a price list or unapproved document. Lone price lists must NEVER be published.`);
  if (!e) { errors.push(`${f}: not on the approved list (src/data/catalogues.json). Remove it or get it approved.`); continue; }
  if (BLOCKED.test(e.source || '')) errors.push(`${f}: source "${e.source}" looks like a price list or unapproved document.`);
  const buf = fs.readFileSync(full);
  if (buf.length >= LIMIT) errors.push(`${f}: ${(buf.length / 1048576).toFixed(1)} MiB is over the 25 MiB limit.`);
  const sha = crypto.createHash('sha256').update(buf).digest('hex');
  if (sha !== e.sha256) errors.push(`${f}: content does not match the approved fingerprint. Re-approve it (update catalogues.json) after checking it is a catalogue and not a price list.`);
}
for (const [f, e] of byFile) if (!files.includes(f)) errors.push(`${f}: listed in catalogues.json but missing from public/catalogues.`);

if (errors.length) {
  console.error('\nCatalogue check FAILED:\n' + errors.map((x) => '  - ' + x).join('\n') + '\n');
  process.exit(1);
}
console.log(`Catalogue check OK: ${files.length} approved PDFs, none blocked.`);
