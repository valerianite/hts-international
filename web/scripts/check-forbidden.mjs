// Post-build guard: fails the build if forbidden terms appear anywhere in the generated site (HTML, JSON, XML, text).
// Client rules:
//  - The BC Control Trust (the holding company) must NEVER be mentioned on the website.
//  - Topstar must not appear on the website.
//  - Pallet lines / pallet moulding must never be shown as a product or catalogue.
//  - "Coming soon" catalogues must be left off.
// (PDF contents are checked separately when catalogues are approved; see README.)
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve(import.meta.dirname, '..', 'dist');
const FORBIDDEN = [
  { re: /bc\s*control/i, why: 'BC Control Trust must never be mentioned on the website' },
  { re: /control\s+trust/i, why: 'BC Control Trust must never be mentioned on the website' },
  { re: /topstar/i, why: 'Topstar must not appear on the website' },
  { re: /pallet\s*(lines?|moulding|molding|mould|mold)/i, why: 'pallet lines / pallet moulding must never be shown as a product or catalogue (machines are fine)' },
  { re: /coming\s+soon/i, why: '"coming soon" catalogues must be left off the site' },
];
const EXT = /\.(html|json|xml|txt|webmanifest|css|js|mjs|svg)$/i;

function walk(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(d, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}
if (!fs.existsSync(dist)) { console.error('check-forbidden: dist/ not found'); process.exit(1); }

const problems = [];
let scanned = 0;
for (const f of walk(dist)) {
  if (!EXT.test(f)) continue;
  scanned++;
  const text = fs.readFileSync(f, 'utf8');
  for (const { re, why } of FORBIDDEN) {
    const m = text.match(re);
    if (m) problems.push(`${path.relative(dist, f)}: "${text.slice(Math.max(0, m.index - 30), m.index + 40).replace(/\s+/g, ' ')}" (${why})`);
  }
}
if (problems.length) {
  console.error('\nForbidden-terms check FAILED:\n' + problems.map((p) => '  - ' + p).join('\n') + '\n');
  process.exit(1);
}
console.log(`Forbidden-terms check OK: ${scanned} text files scanned, none found.`);
