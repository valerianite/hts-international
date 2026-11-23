# HTS International: Wix brand setup and build plan

Status: client has approved the colours, fonts, name (HTS International) and tagline (23 Nov 2026). Formal sign-off on the whole guide (brand/HTS_Brand_Guidelines_DRAFT_v0.2.pdf, last page) is still pending. Values come from `brand/design-tokens.json`.

Client decisions that affect the build:
- Palette is red, charcoal and neutrals only. **No safety yellow.**
- Tagline "Servicing the Plastics Industry" is the home page hero line, used exactly as written.
- Name beside the logo: "HTS International".
- **No photos of installs, service work or customer sites** anywhere on the site. Use supplier product photos and diagrams.
- Copy may say "40+ years of industry experience". It must not say the company is 40 years old (HTS has traded since the 1990s).
- Vehicle photos are brand reference only. Do not upload them to the site.

## Where to work

| Site | Wix ID | Rule |
|---|---|---|
| HTS TEST Redesign (copy) | `62846ac8-4c3b-41b6-8e20-f087124bbb30` | Build here. Free plan, unpublished. |
| Htshq (live, www.hts.international) | `be8a7c0b-5431-4a35-9517-3c7919fc78a7` | Do not edit. |

Check the editor title bar reads **"HTS TEST Redesign"** before every session.

## Part 1: Site-wide brand setup (do first, in the test copy)

1. **Colours.** In the editor: Site Design > Colors > edit the palette.
   - Base: White `#FFFFFF`, Off-white `#F3F3F4`, Charcoal `#3F4142`, Steel `#6B6E71`, Red `#CD2127`.
   - Add custom colours: Black `#1E1F20`, Deep red `#A81B21` (hover), Line `#D9DADB`.
   - No yellow or other accent colours (client declined).
2. **Fonts.** Site Design > Text.
   - Check whether *Barlow Condensed* and *Barlow* are in Wix's font list. If not, upload them as custom fonts (open source, SIL OFL; download from Google Fonts).
   - Headings H1 to H3 and buttons: Barlow Condensed SemiBold/Bold, uppercase.
   - Paragraphs: Barlow Regular, 17 px desktop, 16 px mobile.
   - Fallback if Barlow can't be loaded: Arial.
3. **Buttons.** Primary: red fill, white text, 2 px radius, hover deep red. Secondary: 2 px charcoal outline. Text in Barlow Condensed, uppercase.
4. **Links.** Charcoal body text; links in red, underlined on hover. Remove the default blue (`#116DFF`) still used on the live site.
5. **Header.** White, logo left (about 120 px wide, above the 80 px minimum), five nav items in Barlow Condensed uppercase, 3 px red bottom border, remove the heavy grey divider/shadow. Add a visible "Request a quote" red button.
6. **Footer.** Black `#1E1F20` or charcoal, white logo version, address, phone, email, social icons, privacy link. Update copyright from 2023.
7. **Logo.** Replace the header image with the highest-resolution version. Export an SVG from `HTS-Final/HTS_logo-Final.ai` (the largest PNG is 1200 px).
8. **Protect the copy.** Keep it unpublished, or enable site password protection before anyone is sent a link. It must not be indexed alongside the live site.

## Part 2: Page-by-page build plan

Same 14 pages as the live site, so before and after screenshots match one-to-one.

| Page | Live URL | What changes |
|---|---|---|
| Home | `/` | Hero line "Servicing the Plastics Industry" (the approved tagline), a short value statement, one red call to action, short intro (three short paragraphs at most), consistent supplier tile grid, services as three cards, single compact enquiry strip instead of the full form. |
| Products | `/products` | Eight same-size supplier tiles. Replace the HTS logo placeholders (Maco-System, Mould Cleaner, Linear Potentiometer) with product photos or neutral icons. Add a one-line description per tile. |
| Borche | `/borch-imm` | Keep the strong photography. Add a "Request a quote" button and key specs per series (clamping force range, etc.) only as supplied by the client. |
| Wensui | `/wensui` | Same template as Borche. |
| Safety Mats | `/safety-mats` | Fix run-together words, put technical data in a table, add catalogue download button. |
| HALS Pumps | `/halspumps` | Same template; four pump types as cards. |
| CRG EOAT | `/crg-eoat` | Same product template. |
| Maco Retrofit | `/macosystemretrofit` | Same product template, real product image. |
| Mould Cleaner | `/mouldcleaner` | Same product template, real product image. |
| Linear Potentiometer | `/linearpotentiometer` | Same product template; tidy long spec sections. |
| Services | `/services` | Three service cards in the same order as the home page. Break up the vacuum material delivery text with headings and a component list. |
| Catalogues | `/catalogues` | Card grid per supplier with download buttons (and file sizes if known). Keep "Coming soon" labels as badges. |
| Contact Us | `/contact-us` | One full form here only, with address, phone, email, and a map if the client wants one. |
| Privacy Policy | `/privacy-policy` | Restyle only; content unchanged unless the client's legal advisor says otherwise. |

**Forms:** keep the existing fields (name, email, subject, message, newsletter tick box), keep reCAPTCHA, and confirm submissions still reach contact@hts.international before launch.

## Part 3: Open items before building

1. Formal client sign-off on the brand guidelines (last page of the PDF).
2. Supplier-supplied product photos for Maco-System, Mould Cleaner and Linear Potentiometer (no install or customer photos).
3. Specs and any new claims, supplied and approved by the client (no invented numbers).
4. ~~Founding story~~ Resolved: "40+ years of industry experience" (Bernie Hildebrand); company trading since the 1990s.
5. Supplier permission to use their logos and catalogues.
6. SVG logo export from the `.ai` master.
7. Check contact form routing and reCAPTCHA in the copy, and which SEO issues are open (needs a Premium plan to see).

## Part 4: Launch checklist (later, with the client)

- [ ] Re-capture the same 14 pages at 1440 px and 390 px for the "after" deck
- [ ] Test the contact form end to end
- [ ] Set page titles and meta descriptions for each page
- [ ] Set up 301 redirects if any URLs change
- [ ] Check mobile layouts and accessibility contrast
- [ ] Record Core Web Vitals and baseline analytics, then switch the domain
