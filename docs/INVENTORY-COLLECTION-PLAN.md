# Inventory collection — implemented preview

## Current implementation

The hero's **Available Pieces** button opens `tempo-raro-site/collection.html`. Six clearly labeled sample listings reuse the local illustrative images. The responsive gallery supports search and alphabetical sorting, with shareable `?piece=slug` detail views. No sample is represented as confirmed stock.

The separate collection-interest form retains the listing identity and offers copy/download. It does not send inquiries or take payments. The existing sourcing form remains separate.

## Integration handoff

`inventory.js` is the local catalog. Keep each listing's `id` stable and `slug` unique. Records contain maker/model/reference, known year/condition/box/papers, image metadata, status, `isSample`, `priceMinor` (integer minor currency units, or null for price on request), currency, and optional Square catalog/variation IDs. Draft records are excluded. Reserved/sold records offer an inquiry for a similar watch. Replace example images and facts with verified sale records before changing `isSample` to false.

`collection.js` prepares a versioned `tempo-raro.collection-interest` envelope: inquiry ID and timestamp, intent, listing identity, contact details, topic and message. Unchanged retries retain the same ID and timestamp. Set `TEMPO_COLLECTION_CONFIG.interestEndpoint` and `interestEnabled` only after a secure delivery service exists. Delivery uses HTTPS JSON POST with an `Idempotency-Key` header; a successful response must include `{ "accepted": true }`. Sample inquiries always remain local. The server must validate fields, look up the listing itself, deduplicate requests, limit abuse, and deliver to the approved business destination. Configure CORS if the endpoint uses another origin. Add the business's privacy wording before collecting live inquiries.

`checkoutEnabled` is a reserved setting, not a working checkout. For a later Square integration, create a [Square-hosted payment link](https://developer.squareup.com/reference/square/checkout/create-payment-link) on the server. Keep credentials server-side; resolve the price and availability from trusted inventory rather than the browser payload. Reserve one-off stock atomically, use idempotency, reconcile expired reservations, and verify payment webhooks before marking a watch sold. The site currently contains no cart, payment SDK, credentials or payment endpoint.

## Verification

Browser checked: gallery and listing details; selected Cartier listing `preview-002` carried into the prepared inquiry; required name/email; edit preserving entered values; responsive gallery/form at 320px. Further responsive checks are recorded in `RESPONSIVE-CHECKS.md`.

## Confirmed direction

Tempo Raro will hold a collection of watches for sale as well as source watches for clients. Build a sale catalog and inquiry flow first. A shopping cart, online payments and checkout are outside this phase.

The Watchmakers explorer is editorial discovery. The Collection will represent individual watches actually offered for sale. Give each a distinct navigation item and appearance.

## Visitor flow

1. **Collection:** photography-led listings, with simple brand and availability filters when inventory warrants them. Each card identifies the maker, model/reference, price and status.
2. **Watch details:** an image gallery, a concise description, specifications, condition notes, supplied box/papers and price or an explicit price-on-request label. Separate known facts from unknown details.
3. **Ask about this watch:** open the inquiry with the listing ID, maker and model/reference already included, and distinguish a purchase inquiry from a sourcing request. Preserve those identifiers in the submitted/copied inquiry.
4. **Reserved or sold:** make the status clear and offer a sourcing inquiry for a similar watch. Do not silently turn a sold listing into an available product.

## Listing data

- Stable listing ID and URL slug.
- Maker, model and reference.
- Verified year, or year not confirmed.
- Case size/material, dial and movement where verified.
- Condition description and known defects; available service information.
- Box and papers, each recorded separately; note when unknown.
- Actual photographs, descriptive alt text and display order.
- Asking price and currency, or explicit price-on-request setting.
- Status: draft, available, reserved or sold.
- Last verification/update date.

No sample watch is to be presented as inventory. Editorial manufacturer images already in the explorer must not be reused as evidence that a particular sale watch is held or available.

## Implementation scope

- Add Collection navigation and a dedicated catalog view without disturbing the home page's editorial direction.
- Start with a maintainable local inventory data file; choose an editing backend only if the publishing workflow needs it.
- Build listing and detail layouts, empty state and status handling.
- Extend inquiry type and payload for purchase inquiries, including stable listing identity.
- Preserve the current copy-only notice until actual message delivery is connected.
- Check keyboard/mobile gallery behavior, filtering, sold/reserved handling and the purchase-to-sourcing handoff.

## Inputs before real listings go live

Actual watch records and photos, confirmed prices/currencies and status, business contact/delivery channel, and approved sale terms. Shipping, returns, warranties, authentication procedures, tax treatment and payment arrangements must come from the business rather than invented website copy.

## Related work

About Us is now on the home page with **Jared Martignoni — Founder and Principal Acquisition Agent** and an explicit portrait placeholder. Await an approved portrait and biography; do not use the unrelated fashion-model photography as his image.
