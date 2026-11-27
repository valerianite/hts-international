# HTS International: launch checklist (new static site on Cloudflare)

Target: launch in a few days from 2026-11-27. The old Wix site stays untouched until the new one is verified live.

## What we know (from public DNS lookups, 2026-11-27)

| Item | Value |
|---|---|
| Domain DNS hosted at | GoDaddy (`ns15.domaincontrol.com`, `ns16.domaincontrol.com`) |
| Website records today | `hts.international` A `185.230.63.107` (Wix); `www` CNAME to `hts.international` |
| Email | Microsoft 365: MX `0 hts-international.mail.protection.outlook.com` |
| SPF (TXT) | `v=spf1 include:spf.protection.outlook.com -all` |
| Other TXT | `MS=ms29276195` (Microsoft verification), `D7067737` (purpose unknown, keep it) |
| Email autodiscover | `autodiscover` CNAME `autodiscover.outlook.com` |
| DKIM / DMARC | none found (optional improvement, separate from launch) |

Email does NOT run through Wix, so the switch only changes the website records. **Every email record above must be carried across exactly.** Public lookups cannot list a zone, so the real GoDaddy zone must be checked in full before the switch (step 1).

## Why DNS moves to Cloudflare

The site is a Cloudflare Worker (static assets). A Worker can only serve a custom domain (including the bare `hts.international`) if the domain's DNS is on Cloudflare. So the plan is: copy the DNS zone to Cloudflare, then change the nameservers at GoDaddy. The domain stays registered at GoDaddy.

## Before launch day

1. **Get the full GoDaddy DNS zone** (screenshot or export of every record, including subdomains). Compare it with the table above. Anything extra (other subdomains, verification TXT records, a mail or ftp record) must be copied too.
2. **Lower TTLs** at GoDaddy to 600 seconds (10 minutes) about 24 hours before, so a rollback is quick.
3. **Access:** confirm who holds the GoDaddy login and the Cloudflare account (the Worker lives in the account that owns the `hts-international` project).
4. **Content sign-off:** read through the longer sub-pages (Dosing & Mixing, Chillers, MACO). Confirm the catalogue links and the contact form once more.
5. **Baselines from the old site** for the case study: Google Analytics and Search Console numbers (top pages, traffic, enquiries per month) and Core Web Vitals. This needs access from the client.
6. **Open client items:** smaller CRG catalogue (until then the CRG full-catalogue link points to the OneDrive file); Privacy Policy wording (mentions payment details and a Cookie Policy that do not exist, and should mention the third-party form service).

## Launch day

1. **Cloudflare:** Add the site `hts.international` (free plan). Let Cloudflare scan the existing DNS, then check the imported records against the GoDaddy list. Create anything missing. **Set all email records (MX, TXT, autodiscover CNAME) to DNS only (grey cloud), never proxied.** Delete the old Wix A record and `www` CNAME (the Worker domains replace them).
2. **GoDaddy:** change the two nameservers to the two Cloudflare ones. Do not delete the GoDaddy records (they are the rollback). Propagation is usually under an hour, up to 24 hours.
3. **Worker custom domains:** in the `hts-international` Worker, add `www.hts.international` and `hts.international`. Add a redirect so the bare domain goes to `www` (the site's canonical address is `https://www.hts.international`).
4. **Go live to search engines:** delete the `X-Robots-Tag: noindex, nofollow` lines from `web/public/_headers` (marked "REMOVE before launch"), commit and push. The sitemap (`/sitemap-index.xml`) and `robots.txt` are already in place.
5. **Test straight after** (use a phone on mobile data too):
   - Send and receive email at contact@hts.international and one other mailbox (this is the most important test).
   - Open every main page and a few sub-pages over HTTPS; check old URLs redirect (e.g. the removed range and the terms page).
   - Submit the contact form once and confirm the email arrives.
   - Open a few catalogues.
6. **Search Console:** add the property (verify by DNS TXT in Cloudflare), submit `https://www.hts.international/sitemap-index.xml`.

## Rollback (if email or the site misbehaves)

Change the nameservers at GoDaddy back to `ns15.domaincontrol.com` and `ns16.domaincontrol.com`. The old records are still there, so the Wix site and email return as soon as DNS refreshes (minutes with the lowered TTL). Do not cancel anything on Wix until the new site has been stable for about two weeks.

## After launch

- Re-capture screenshots for the "after" deck: `node scripts/capture-screenshots.mjs https://www.hts.international ../portfolio/after` (run from `web/`; reads the live sitemap, takes desktop and mobile full-page shots of every page).
- Record Core Web Vitals and, after a few weeks, traffic and enquiries for the before/after case study.
- After two stable weeks: the client can decide about the Wix Premium plan. Optional later: set up DKIM and DMARC for email (separate task in the Microsoft 365 admin).
- Keep the Monday catalogue check running (it emails the client contact when catalogues are updated; pushing stays manual).

## Decisions already made

Hidden used-machines page stays unpublished (it will return a 404 after launch). Supplier permission to use their images is confirmed. Prices on the Linear Potentiometer page are published (KTC1-0225 follows the catalogue, $146.60). Pallet lines, "coming soon" catalogues, standalone price lists, the removed supplier range and the holding entity's name are never shown.
