# HTS International: static website (Astro)

Replacement for the Wix site at www.hts.international. Plain static HTML output, same 14 URLs as the live site, built to deploy on Cloudflare Pages from this GitHub repo.

Brand source of truth: `../brand/HTS_Brand_Guidelines_DRAFT_v0.2.pdf` and `../brand/design-tokens.json` (mirrored in `src/styles/global.css`).

## Commands

```powershell
cd web
npm install
npm run dev       # local dev server, http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve the built site locally
```

Requires Node 22+.

## Cloudflare deployment

Deployed 2026-11-23 as a Cloudflare Workers project (static assets) built from this repo on every push to `main`. Settings used:

| Setting | Value |
|---|---|
| Root directory (Path) | `/web` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Preview command | `npx wrangler preview` |
| Node | `web/.node-version` (24) |

`wrangler.jsonc` serves `./dist` with `html_handling: drop-trailing-slash` and a `404.html`. Build uses `build.format: 'file'` and `trailingSlash: 'never'`, so `/products` is served from `products.html` exactly like the live site's URLs (and `/products/` redirects to `/products`).

**Preview phase:** `public/_headers` sends `X-Robots-Tag: noindex, nofollow`. **Remove that line before pointing `www.hts.international` at this site.** The site is also public on its `workers.dev` address; enable Cloudflare Access if it should be private to invited reviewers.

**Go-live checklist:** remove noindex, add custom domain in Cloudflare, add sitemap and robots.txt, connect the form, add analytics, confirm email/DNS (see below), then switch DNS.

## Structure

- `src/styles/global.css`: brand tokens, type scale, buttons, layout
- `src/layouts/Base.astro`: page shell, meta tags, canonical URL
- `src/components/`: Header, Footer, ContactForm
- `src/data/site.ts`: address, phone, email, social, nav
- `src/data/products.ts`: all 8 supplier pages (content ported from the live site)
- `src/pages/`: home, products, services, catalogues, contact-us, privacy-policy, `[slug].astro` (product template)

Fonts are self-hosted (Fontsource Barlow and Barlow Condensed), so there are no external font requests. Images in `src/assets` are converted to WebP at build time.

## Images from the old Wix site

All 74 unique images on the live site were downloaded at original resolution (19.1 MB) and converted to WebP (1.4 MB in the repo, quality 82 for photos, 90 with alpha for logos and diagrams, capped at 2x the largest size shown on the old site). Files are in `src/assets/wix/`, and `src/data/images.json` records, for each one: original Wix ID and size, where it was used, alt text, role and notes. The full-size originals are kept **locally only** in `assets-source/` (gitignored). Use them with Astro's `<Image>` component so responsive sizes are generated at build time.

**Wired into the pages (23 Nov 2026):** product covers on the home and Products tiles and in each product sidebar; galleries and figures inline on Borche (5 series), Wensui (8 categories), Safety Mats (custom shapes, controllers, install photo), HALS (4 pumps), CRG (15 components), MACO, Mould Cleaner (before/after) and Linear Potentiometer. Image choices and captions live in `src/data/products.ts` (`cover`, `figure`, `gallery` blocks); the `Pic` component only requests sizes the source can supply. Not used: supplier logos, social icons, the soft hero composite, the two spec-table screenshots and the garbled Mould Cleaner photo.

Roles in the manifest: `product-photo` (45), `diagram` (11), `supplier-logo` (9), `social-icon` (4), `spec-table-image` (2), `hero-composite` (1). Two stale low-resolution copies of the HTS logo were set aside and are not in the repo.

Known problems with the source images:
- `mouldcleaner-hf-2lz`: the machine's brand text reads "IEFGNEH" (HENGFEI with the letters in reverse order) in the supplier's own photo, and on the old site too. Not used on the new pages. Ask the supplier for a clean photo.
- `home-03` (hero composite) is only 820 px wide and looks soft when stretched. Needs a better hero image.
- The CRG tooling thumbnails are 300 x 200: thumbnail use only.
- `linearpotentiometer-01` and `-screenshot-…` are screenshots of spec tables. Rebuild them as HTML tables.
- Supplier logos and photos belong to the suppliers. Confirm usage permission before launch.

Catalogue PDFs: only the Safety Mats catalogue (5.6 MB) is hosted on Wix. The other 15 are on the client's OneDrive/SharePoint behind `utm.guru` short links and need to be supplied by the client. Cloudflare's per-file limit is 25 MiB.

## Machine and component sub-pages (ported 2026-11-23)

The old Wix site had 64 pages: each machine and component has its own page. 28 of them are rebuilt here with the **same URLs** (e.g. `/needle-grippers`, `/borche-bu-series-imm`, `/wensui/chillers`): 5 Borche series, 15 CRG components, 4 Wensui categories, 2 HALS pumps, 2 MACO. Content lives in `src/data/subpages.json` (heading, description, text blocks, photos) and is rendered by the single route `src/pages/[...slug].astro` (products and sub-pages share it, via `src/components/Blocks.astro`). Parent product pages list their sub-pages in a thumbnail grid (`type: 'children'` blocks in `products.ts`). Sub-pages show their parent's catalogues.

Text was copied from the old pages with Australian spelling and the old "contact us / download" boilerplate removed; image labels were turned into captions. Photos were downloaded from the old site, converted to WebP, and recorded in `src/data/images.json`. Review the pages for wording the structuring script may have got wrong (run-in headings, bullet lists). Not ported: the supplier range the client removed (15 pages), the legal terms page, 4 duplicate/under-construction pages, and the hidden used-machines page (decision pending). `public/_redirects` sends the removed old URLs to the nearest live page (301). That file is server configuration and is not shown to visitors; it is the one place old URL names appear.

Two thin Borche pages (BE all-electric, BH high-speed) exist on the old site but are not linked from anywhere and have no catalogue in the client's repo; not ported.

## Catalogue PDFs

Catalogues come from the client's private repo (`blakehlive/HTS-Catalogues`, never linked to publicly because it also holds price lists and legal documents). Approved files are copied into `public/catalogues/` under stable, URL-safe names (e.g. `/catalogues/borche-bu-series.pdf`) and described in `src/data/catalogues.json` (label, supplier, product page, source path in the client's repo, size, page count and SHA-256). The Catalogues page and each product page read that file.

**LONE STANDING PRICE LISTS MUST NEVER BE PUBLISHED.** Price lists inside an existing catalogue are fine (the Linear Potentiometers catalogue has list-price pages). This is enforced by `scripts/check-catalogues.mjs`, which runs before every build (`npm run build`, so also on Cloudflare) and **fails the build** if any file in `public/catalogues` is not on the approved list, has a changed fingerprint, has a name like price/pricing/rrp/quote/hi-rez/topstar/archive/terms of sale, or is 25 MiB or larger (Cloudflare per-file limit).

**Content rules enforced after every build** (`scripts/check-forbidden.mjs`, run as `postbuild`): the generated site must contain no mention of the client's holding entity (its name must NEVER appear on the website; the blocklist is in the script) and no Topstar content. Hosted PDFs are checked for those terms when they are approved (`assets-source/scan-tools/scan_terms.mjs`); image-only PDF pages cannot be text-scanned, so catalogue footers there should be eyeballed. The legal/trading names are settled: the public brand is HTS International; do not add entity or trust names to the site.

Decisions: Topstar catalogues stay off the site; Borche Hi-Rez duplicates are not hosted; the CRG 5.3 full catalogue (35 MB) is over the limit, so the CRG page links to the client's OneDrive file until a version under 25 MiB is supplied (`external` entry in `catalogues.json`, marked TEMPORARY).

**Updating a hosted catalogue:** replace the file in `public/catalogues/` with the new version from the client's repo (keep the same file name so the URL doesn't change), update that entry's `sha256`, `bytes`, `pages` and `approvedOn` in `catalogues.json`, then `npm run build`. **Adding a new catalogue:** add an entry (and the file) only after confirming it is a catalogue and not a price list. Pushing is a separate step that needs an explicit instruction.

## Open items before launch

**Content and decisions (client)**
1. **Product and hero photos.** Pages currently show placeholders. Photos must come from the client's Wix media library or suppliers (not scraped). No photos of client installs or customer sites (client decision).
2. **Linear potentiometer prices.** The live page publishes a KTF part number and price table (about $88.70 to $189.10, more rows). It is **omitted** here until the client says whether prices stay public. See `../site/content/live-site-copy.md`.
3. **Supplier logos.** Tiles use text names, not logos, until supplier permission is confirmed.
4. **Spare-parts brands.** The live Services/Contact meta text lists several brands for spare parts. Not shown on this site until the client confirms it is accurate (client has said not to mention Topstar anywhere).
5. **Privacy Policy** is ported unchanged but mentions payment information, orders and a Cookie Policy that do not exist. The new hosting and form provider also change who handles data. Needs client or legal review.
6. **Wording.** Spelling is Australian English; hype words ("elevate", "unlock", "cutting-edge") removed; run-together words on Safety Mats fixed; no new claims added. Review the product pages against the client's intent.

**Technical**
7. **Contact form: connected, needs one real test.** It posts to Web3Forms, which emails each enquiry to contact@hts.international (spam honeypot included, inline success/error messages, no-JS fallback). The access key (public by design) is set in `form.accessKey` in `src/data/site.ts` (added 2026-11-23). **Submit one real test enquiry** from the live preview and confirm it arrives at contact@hts.international. If `accessKey` is ever emptied, the button disables and the page shows the email and phone instead. Notes: the free plan has monthly limits; there is deliberately no newsletter opt-in (the client has no newsletter); the Privacy Policy should mention the third-party form service (client/legal review); once the domain is on Cloudflare, consider replacing Web3Forms with a Cloudflare Worker and Email Routing, and add Cloudflare Turnstile if spam gets through.
8. **Catalogue links** go through third-party `utm.guru` short links (as on the live site). Host the PDFs on this site (repo or R2) so downloads don't depend on them.
9. **SVG logo.** Export an SVG from `../HTS-Final/HTS_logo-Final.ai` and replace the PNGs in `src/assets`.
10. **Sitemap and robots.** Add `@astrojs/sitemap` and a `robots.txt` before launch. Keep the site `noindex` on any preview deployment.
11. **Domain, DNS and email.** Find where `hts.international` is registered and whether email runs through Wix before touching DNS. Keep Wix live until the switch.
12. **Analytics and Search Console.** Record baseline numbers from the live site first.
