# Tempo Raro SEO baseline

Primary URL: **https://www.tempo-raro.com/**. The user confirmed both www.tempo-raro.com and tempo-raro.com. This implementation chooses www as canonical; the redirect still needs to be configured on the eventual host.

## Implemented

- Unique home and collection-preview titles/descriptions, canonical URLs, Open Graph and Twitter sharing metadata.
- Existing 1052×568 hero JPEG as the social preview image, with an absolute production URL and descriptive alt text.
- Organization, founder Person, WebSite and WebPage JSON-LD on the home page. CollectionPage JSON-LD on the gallery. These describe the visible business and founder; no invented address, phone, reviews, product offers, credentials or social profiles.
- Small TR SVG favicon.
- `robots.txt` allows crawling and points to the production sitemap. `sitemap.xml` currently lists only the canonical home page.
- The sample gallery has `noindex, follow` and is excluded from the sitemap. All `?piece=` variants inherit this directive. It must not be indexed as confirmed sale inventory.
- Natural service language in the hero and introduction: luxury watch sales, personal watch sourcing, maker/model/reference. Editorial headings and visual style are preserved.
- A no-JavaScript home fallback exposes the hero and editorial text; the gallery supplies an explanatory fallback and link to sourcing information.

## Keyword direction

These are relevance targets based on the actual offering, not measured search volumes or ranking promises.

| Page / section | Topic / phrases | Approach |
| --- | --- | --- |
| Home | Tempo Raro; luxury watch sales; personal watch sourcing | Main title, description and natural introductory copy |
| Sourcing section | watch sourcing service; find a specific watch; watch model / reference | Explain the existing process, budget and inquiry |
| Watchmakers explorer | Rolex, Cartier, Omega, Patek Philippe, Grand Seiko, Tudor, Seiko, Longines; model families already named | Keep factual editorial profiles; no unsupported stock or authorized-dealer claims |
| About | Jared Martignoni; Founder and Principal Acquisition Agent | Match the visible name/title and structured data |
| Future real inventory | maker + model + exact reference; verified condition and year | Build a durable URL and unique description for each actual piece |

Do not target a city, “near me,” certified/pre-owned, guaranteed authenticity, authorized dealer, cheapest/best, or delivery promises without confirmed business facts. No `meta keywords` tag was added: [Google does not use it](https://developers.google.com/search/docs/fundamentals/seo-starter-guide). Avoid repetitive brand lists and keyword stuffing.

## Hosting and launch checklist

1. Serve the site at the root of https://www.tempo-raro.com/ with HTTPS. Configure permanent redirects from tempo-raro.com and HTTP variants to the matching HTTPS www path; preserve query strings. Normalize `/index.html` to `/` as well. Do this at the selected host, not with a client-side redirect. DNS/hosting has not been changed.
2. Serve `robots.txt`, `sitemap.xml`, `favicon.svg` and the social image at their declared paths. Keep public canonicals in production; apply `noindex` to any separate staging/GitHub Pages preview host through its deployment configuration.
3. Verify ownership in Google Search Console, submit the sitemap and inspect the deployed home URL. No account verification or submission was performed locally.
4. Verify social previews against the deployed HTTPS URLs. Metadata is ready locally; remote services cannot fetch localhost assets.
5. Before indexing real stock, replace sample content, remove the gallery's `noindex`, add its canonical URL to the sitemap, and implement unique stable detail pages and metadata for individual real watches. The current query-driven dialogs are a preview, not a complete product SEO system.
6. Add Product/Offer markup only when it matches actual visible pieces, prices, currency and availability. Add verified business address/contact/social data when supplied. Do not put placeholder social links into `sameAs`.
7. Complete the performance and responsive fixes in `PRE-PUSH-AUDIT.md`, with the oversized Longines image now resolved by a 116 KB WebP. No speed or ranking improvement is claimed without measurement after those changes.

## References

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Canonical URLs and redirects](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Noindex rules](https://developers.google.com/search/docs/crawling-indexing/block-indexing)

Local checks validate metadata uniqueness, URLs, JSON-LD syntax, sitemap XML and referenced local files. Google rich-result eligibility and indexing require verification after deployment; neither is guaranteed by adding markup.

Validation completed locally: both page descriptions and sharing tags match; canonical URLs are correct; each page has one H1; JSON-LD, sitemap XML and favicon SVG parse; local file references resolve. The updated hero was checked at 320px with both CTAs clear of the scroll cue. `validate_seo.py` records the repeatable static checks. No hosting changes, publication or search-engine submission occurred.
