# Logo assets

Original SVG downloads are preserved unchanged. `sources.json` records candidate source pages; `commons-metadata.json` records the returned Wikimedia file and licensing metadata; `download-report.json` records completed and deferred downloads.

Five original files were downloaded and visually reviewed. Wikimedia returned HTTP 429 with Retry-After: 600 for subsequent downloads, so the rest are deferred. Run `node download-logos.mjs` after the cooldown to retry. The downloader validates SVG contents, batches metadata, paces file requests, and stops on a prolonged rate limit.

`audemars-piguet-display.svg` is a display copy with the original white background polygon removed and the surrounding canvas trimmed. The lettering, symbol and tagline paths are unchanged. The website applies grayscale presentation through CSS. Wikimedia source links and licensing tags do not imply authorization or a retail relationship.
