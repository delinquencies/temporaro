# Tempo Raro — polish, mechanics and SEO audit

**November 5, 2026 · Local preview on port 5184**

Assessment: the visual direction and current SEO source are in good shape. Three small mechanics/performance fixes are recommended before the preview push. A labeled preview can be committed without real stock or payments; it should not be described as an operational sales site.

This pass changed no production website code and made no GitHub writes. It added this report and a local content-check script. Browser form tests used only `Audit Tester` / `audit@example.com`; no inquiry was sent.

## Fix before pushing the preview

| Priority | Finding | Evidence and action |
| --- | --- | --- |
| Resolved | Longines image was 7.56 MB | Both consumers now use `assets/houses/longines-preview.webp` (116,052 bytes); the unused PNG is archived outside the public site. No throttled speed score was measured; the excessive file size is directly confirmed. |
| Medium | Back to watchmakers obscures the focused search | At 390px the search spans y≈−0.44..41.56px, behind a header ending at y=72px. Add a scroll offset to `.house-directory-tools`. Source: [house-explorer.js](../house-explorer.js:120). Evidence: `final-audit-return-scroll.png`. |
| Medium | A whitespace-only name becomes a blank inquiry | Native required-field validation accepts three spaces; the collection form trims them afterward and generates `Name:` with no value. Validate after normalization and give a field-level error. Apply the same nonblank-name rule to sourcing. Source: [collection.js](../collection.js:56). Evidence: `final-audit-blank-name.png`. |

The sourcing clipboard fallback also deserves a small repair in that pass: it ignores the boolean returned by `document.execCommand('copy')` and announces success unconditionally. The normal clipboard path passed; this fallback defect is from source review, not a simulated browser-permission failure. Show selectable prepared text and a truthful failure state if copying fails. Source: [index.html](../index.html:129).

## Polish audit

### Watchmaker coverage gap — added after the full-directory check

Resolved in the November 5 content pass: all 69 houses now have individual profiles and official-site targets, with 43 illustrated profiles. The other 26 use intentional typographic panels. Direct fetches succeeded for many manufacturers; restricted sites use indexed official-source evidence, recorded separately from HTTP success. Existing eight featured targets were retained without re-requesting. See `WATCHMAKER-IMPORT-REPORT.md`, `WATCHMAKER-RESEARCH-SOURCES.json` and the regenerated coverage CSV. The Longines image now uses a 116 KB WebP in both explorer and inventory; its original is archived outside the public folder.

**Passed in the sampled layouts:**

- Home geometry checked at 320, 390, 768, 1023, 1024 and 1440px. The wordmark remained centered at each size, with the intended menu/desktop transition at 1024px. No unintended edge overflow was found in the sampled headings, hero copy, explorer panel, directory and footer containers.
- Gallery checked at 320, 768, 1024 and 1440px: one, two, three and three columns respectively, with no measured card/header/footer overflow. An additional scan of visible tablet content found no unintended horizontal spill; the hero's temporary reveal-scale extends beyond its bounds intentionally and is clipped by the hero.
- Desktop hero uses the cleaned photograph and right-hand composition. The photograph's SCROLL/chevron is gone; the live scroll link remains. The earlier header crowding and inconsistent home/gallery navigation rules are resolved.
- Founder portrait and social icons remain recognizable, explicitly unfinished placeholders. Stock labels are clearly examples, with no invented price or verified-condition claims.

**Optional polish:** raise the watchmaker search from 14px to match the 16px phone form controls; review the smallest 9–11px metadata labels on an actual phone. Add a skip-to-content link. A dedicated screen-reader/contrast conformance test remains outstanding; this pass does not certify accessibility.

## Mechanics audit

**Freshly exercised and passed:**

1. Mobile menu opening, Shift+Tab wrapping from the close control to the last link, and navigation to the watchmaker section.
2. Selecting Grand Seiko without scrolling: document y=2930 before and after the native click.
3. Watchmaker search (`omega` yields one result) and expanding the complete 69-name directory.
4. Choosing Omega → Speedmaster prepopulates the separate sourcing form with both values. Copying includes both; Escape restores focus to `house-inquire` and releases scroll locking.
5. Gallery empty search, clear action and maker sorting. Alphabetical order was Cartier, Grand Seiko, Longines, Omega, Patek Philippe, Rolex.
6. Cartier detail opens at `?piece=cartier-preview`; its sample status and price placeholder remain explicit. Opening purchase interest retains the piece identity.
7. A genuinely empty required name is blocked; invalid email is blocked and focuses `buyer-email`. The whitespace-name exception is documented above.
8. Valid purchase-interest preview carries listing `preview-002`, preserves the preview notice, and explicitly says it has not been sent. Edit/reprepare with unchanged fields retains the same inquiry ID and output. Copy matches the displayed note.
9. Download produced `tempo-raro-interest-preview-002.txt`; its actual file contents include the selected listing, preview notice and test name. No captured console errors appeared in this checked gallery flow.

**Source-review follow-up:** gallery cards intercept every click. Allow native Ctrl/Cmd/Shift-click behavior by intercepting only unmodified primary clicks. The home loader now has a no-JavaScript fallback, but an early error in its inline enhancement script can still leave the loader visible; make basic visibility independent of successful enhancement. Neither failure case was simulated in this pass.

Reserved/sold inventory, real delivery, payment, offline/network-failure handling and physical-device browser behavior were not exercised. Reserved/sold handling exists in source, but the six current records are all preview examples.

## SEO audit

**Local source checks passed:**

- Unique page titles, descriptions and one H1 on each page. Description lengths are 145 and 153 characters.
- Canonicals consistently use `https://www.tempo-raro.com/` and `/collection.html`. Open Graph URLs agree with them. Sharing titles/descriptions match the respective page, and both pages reference the existing cleaned hero image at an absolute production URL.
- Organization, founder Person, WebSite/WebPage and CollectionPage JSON-LD parse as JSON. The visible founder name/title match. No fake LocalBusiness address, reviews, Product prices or Offer availability are present.
- Home is indexable. The sample collection has `noindex, follow`; the sitemap lists only the canonical home page. `robots.txt` allows crawling so the collection directive can be read, and points to the correct sitemap URL.
- Sitemap XML and favicon SVG parse. Local HTML asset/page references resolve. HTML IDs are unique; label targets exist and image elements have alt attributes.
- Inventory IDs and slugs are unique; all six records explicitly remain samples with null prices. All referenced local inventory/profile image files exist.
- Home and gallery include explanatory no-JavaScript handling. This is not equivalent to independently indexable, fully rendered watch detail pages; those belong to real-inventory implementation.

**Still required at deployment:** HTTPS and non-www → www redirects; `/index.html` → `/` normalization; staging-host indexing controls; checking the deployed robots/sitemap/social image URLs; Search Console ownership/sitemap submission and URL inspection. Google Rich Results validation on the deployed URL has not been run. Correct source markup is not a ranking or rich-result guarantee. The latest [SEO plan](SEO-AND-KEYWORDS.md) contains the accepted keyword direction and Google documentation links.

Keep the collection out of the sitemap and index until it contains verified sale inventory. At that point, build stable detail pages with unique metadata and only then add matching Product/Offer data.

## GitHub and deployment handoff

Read-only connector checks confirmed that [delinquencies/temporaro](https://github.com/delinquencies/temporaro) is public, uses `main`, and currently contains only `README.md` and the older `index.html`. GitHub's repository API reports `has_pages: false`. This does not establish whether any unrelated third-party deployment exists.

The active local `temporaro-v3/tempo-raro-site` directory remains outside a Git checkout. Prepare a clean checkout/branch of that exact repository and copy the complete runtime, including `navigation.css`, `collection.*`, `inventory.js`, cleaned hero, favicon, robots/sitemap, profile assets and logos. Review the final file list and deployment configuration before pushing. Do not upload the surrounding workspace, prior versions, ZIPs, preview logs, audit screenshots or image-generation outputs. Real deployment configuration, including the custom domain, is still separate from the source changes.

## Launch limitations, not preview defects

Confirmed stock/photos/prices, approved founder portrait/social URLs, business contact details, delivery destination, privacy wording and sale terms remain outstanding. Forms intentionally copy/download only, and payments remain disabled. These should remain clear in a review preview.

## Validation scope

Static checks: `validate_seo.py`, `final_content_checks.py`, and Node syntax checks for all three runtime JS files plus the home inline script. Browser checks used the desktop app's browser at the viewport sizes recorded above. No Lighthouse/Core Web Vitals benchmark, iOS/Android hardware test, Safari/Firefox run, OS reduced-motion test or external-link crawl was performed. The audit and GitHub inspection made no remote changes.
