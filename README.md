# Tempo Raro — cinematic editorial website concept

A self-contained, responsive front-end concept based on the approved Tempo Raro art direction: fashion-house editorial imagery, center-out hero curtain reveal, continuously scrolling watch-house ticker, image-led discovery panels, concierge inquiry, and a searchable brand directory.

## Run
Open `index.html` in a browser. No build tools required. For best results, serve the folder locally: `python3 -m http.server 8000` then open http://localhost:8000.

## Included
- Responsive desktop and mobile layouts
- Center-out cinematic curtain reveal, subtle hero scale and scroll-triggered reveals
- Continuous five-logo watch-house ticker (pauses on hover or keyboard focus)
- 69-name searchable watchmaker directory with individual profiles and official links for all houses; eight initially featured and 43 illustrated
- Separate Available Pieces gallery with six labeled sample listings and piece-specific interest forms
- About Us with a founder portrait placeholder and unlinked social placeholders
- Working navigation and mobile menu
- Inquiry form that copies a formatted message; **no backend and no real inquiries are transmitted**
- Reduced-motion support

## Important production notes
- Five Wikimedia-sourced logo SVGs are served locally. `logos/README.md`, `logos/commons-metadata.json` and `logos/download-report.json` document sources, the display derivative and deferred downloads. The current ticker uses the downloaded marks only. Review suitability before public launch; their use does not confer affiliation or authorized-dealer status.
- All campaign imagery comes from the creative concepts and needs review before publication. Watch depictions can be AI-generated and may not match actual models; use real vetted product photography for real inventory.
- A real production launch needs actual business contact information, privacy policy, real inventory, and a live inquiry endpoint. SEO source metadata is included; domain setup and deployed verification remain outstanding.
- A hero background video can replace `.hero-image` with an autoplay/muted/loop/playsinline `<video>` and a poster image. Compress media and serve responsive formats. Keep the existing curtain animation for the opening reveal.
- Google Fonts are requested from Google; fallback fonts work offline.

## Future video direction
Create 8–12 second horizontal, nearly motionless fashion editorial footage: wind moving linen on a Mediterranean terrace, one subtle wrist movement, sunlight drifting over textured stone, editorial human subject on frame-right, negative space on left, no dialogue, no captions, no fast camera movements. Use a 1920×1080 poster as fallback and do not burn text into the video.

## Authentic logo sourcing
- Official manufacturer sites and media centers are the preferred sources for a final commercial release.
- Commons watch logos category: https://commons.wikimedia.org/wiki/Category:Logos_of_watch_brands
- Brandfetch collection (alternative formats): https://brandfetch.com/explore/featured/watch-brand-logos
- The directory currently contains 69 watchmakers; 36 have indexed source-logo candidates. No drawn substitutes are created.
- Logo source files may be in the public domain for copyright purposes but **still protected trademarks**. Use for factual brand identification only, subject to counsel/client approval; do not imply authorized dealership or use marks for brands the business does not actually handle.

## Typography V3
Editorial Bodoni Moda headings + selective Italianno script in terracotta/plum/olive. Jost remains the restrained wordmark; DM Sans handles UI. Color accents are applied to selected expressive phrases only. This is a working concept, not an official affiliated watch-brand site.

## SEO baseline — November 2026

Both pages share `navigation.css` for fluid header spacing and the menu layout. The desktop/menu breakpoint is 1024px and must stay synchronized with the menu resize handlers in the home inline script and `collection.js`.

The canonical production address is `https://www.tempo-raro.com/`. Page metadata, Open Graph/Twitter previews, a TR favicon and Organization/Person/WebSite structured data are included. `robots.txt` references `sitemap.xml`, which currently lists only the home page. The sample `collection.html` gallery uses `noindex, follow` until real stock replaces the examples. Do not remove that directive merely to launch a design preview.

The host must redirect HTTP and non-www requests to the matching HTTPS www URL, and normalize `/index.html` to `/`. Hosting/DNS and Search Console are not configured by these source changes. The social image URLs become fetchable only after deployment at the declared domain. Keep staging previews out of the index through their deployment configuration. See `docs/SEO-AND-KEYWORDS.md` for the keyword map, validation scope and live-inventory SEO checklist.


## Preview status

Forms prepare/copy inquiries only. Inventory, portrait and social profiles remain placeholders. See `docs/FINAL-PRE-PUSH-AUDIT.md` for known mechanics issues and deployment work, and `docs/WATCHMAKER-IMPORT-REPORT.md` for image provenance. Research originals and local audit screenshots are not included.
