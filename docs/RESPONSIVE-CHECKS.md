# Responsive pass

- Watchmaker selection updates the profile without scrolling or moving focus away from the chosen name. A polite status announcement confirms the update. The explicit Back to watchmakers action still navigates on request.
- Verified native click at 390px: scroll position remained 2876px before and after selecting Longines, with focus retained on Longines.
- Checked content bounds at 320, 375, 390, 768 and 1024px; no horizontal overflow in measured headings, text, directory controls or navigation.
- Phone hero typography and header fit at 320px. Sections stack on phones; watch imagery uses a square frame rather than a large fixed minimum height.
- Touch controls are at least 44px high; inquiry fields are 16px with 48px minimum height on phones and tablets.
- Full-height, scrollable touch navigation is used through 900px. Checked menu opening, focus placement, link navigation, closure and the menu-to-inquiry handoff. Background content is inert while an overlay is open; keyboard focus is contained and restored.
- Existing reduced-motion support is preserved. Temporary viewport overrides were used for browser QA, not physical iOS/Android device testing.

Keep phone layouts and these interaction checks as acceptance criteria for the queued inventory catalog and watch detail pages.
# Available Pieces preview — November 5, 2026

- Checked the new hero CTA at 320px: clear separation from Get in Touch and the scroll hint; minimum 44px target.
- Collection checked at 320px (single column), 768px (two columns), and default desktop (three columns). No horizontal content overflow at the measured mobile/tablet sizes.
- Purchase-interest dialog checked at 320px: vertical scrolling, no internal horizontal overflow, 16px fields, 48px input targets.
- Browser verified detail-to-interest flow, listing `preview-002` in prepared output, edit preserving contact fields, empty search/clear, alphabetical sort, and no captured console errors.
- JavaScript syntax checks passed for `collection.js` and `inventory.js`. Physical device testing and live delivery/payment testing remain outstanding.

# Shared responsive navigation — November 5, 2026

The navigation now lives in `tempo-raro-site/navigation.css`, loaded by both pages. Legacy header/menu selectors were removed from `site.css` and `collection.css`. Equal side columns keep the wordmark centered; link distribution, outer padding and clearance around the wordmark scale with viewport width. The full header switches to the menu below 1024px, with the resize handlers using the same breakpoint.

Browser measurements on the home page: 320, 390, 768, 1000, 1023, 1024, 1100, 1280, 1440 and 1920px. Wordmark center deviation was under 0.01px, with no measured wordmark or left-link-group overflow. Desktop clearance on each side of the wordmark was 25.59px at 1024, 32px at 1280, 36px at 1440 and 48px at 1920. The gallery matched at 1024/1440 and fit at 320px. The fixed home header was also visually checked.

Opening the home menu at 1023px and resizing to 1024px closes it, clears the scroll lock, and restores the page controls. The gallery menu was visually checked at 320px, including its separate collection-interest button. No physical-device test is claimed.

# Hero composition — November 5, 2026

At 1024px and wider, the hero photograph has a separate right-hand stage with its own focal position and a continuous dark blend beneath the left-side copy. The face and watch were visually checked clear of the headline at 1024px, 1440px and the default desktop viewport. The original compact crop remains below 1024px and was checked at 390px. No photo file was altered. Both pages now version the shared stylesheet reference so cached copies refresh.

