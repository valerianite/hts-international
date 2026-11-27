// Full-page desktop and mobile screenshots of every page in a site's sitemap (for the before/after case study).
// Usage: node scripts/capture-screenshots.mjs <baseUrl> <outDir>
//   e.g. node scripts/capture-screenshots.mjs https://www.hts.international ../portfolio/after
// Page list comes from <baseUrl>/sitemap-0.xml (paths only, so it also works on a preview domain).
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const [base, out] = process.argv.slice(2);
if (!base || !out) { console.error('usage: node scripts/capture-screenshots.mjs <baseUrl> <outDir>'); process.exit(2); }
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
fs.mkdirSync(out, { recursive: true });

const xml = await (await fetch(new URL('/sitemap-0.xml', base))).text();
const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.replace(/\/$/, '') || '/');
console.log(`${paths.length} pages from the sitemap`);

const viewports = { desktop: { width: 1440, height: 900, deviceScaleFactor: 1 }, mobile: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true } };
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const meta = [];
for (const [vp, v] of Object.entries(viewports)) {
  for (const p of paths) {
    const page = await browser.newPage();
    await page.setViewport(v);
    const name = (p === '/' ? 'home' : p.slice(1).replace(/\//g, '-'));
    try {
      await page.goto(new URL(p, base).toString(), { waitUntil: 'networkidle2', timeout: 60000 });
      await page.evaluate(() => { document.querySelectorAll('img[loading=lazy]').forEach((i) => { i.loading = 'eager'; }); });
      await page.evaluate(() => Promise.all([...document.images].map((i) => (i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 8000); })))));
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      const file = path.join(out, `${vp}-${name}.png`);
      await page.screenshot({ path: file, fullPage: true });
      meta.push({ vp, path: p, height, file });
      console.log('ok', vp, p);
    } catch (e) { console.log('FAIL', vp, p, String(e.message).slice(0, 80)); }
    await page.close();
  }
}
fs.writeFileSync(path.join(out, 'meta.json'), JSON.stringify({ base, capturedAt: new Date().toISOString(), pages: meta }, null, 2));
await browser.close();
