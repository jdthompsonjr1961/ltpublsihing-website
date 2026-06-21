# LT Publishing site — recolor + stylesheet refactor

Review everything here before pushing anything to GitHub. Nothing in this zip
has been committed. To apply it: drop these files into your repo (overwriting
the ones with matching names), commit, push.

## What's in this zip

- **styles.css** — NEW. One shared stylesheet for the whole site: design
  tokens (colors), nav, mobile menu, dividers, section headers, forms,
  footer, the modal framework, and animations all live here now.
- **index.html, ltpublishing.html, select.html, services.html, authors.html,
  august-rowan.html, eleanor-harte.html, j-lemethompson.html, billy-arc.html,
  admin.html, dashboard.html** — UPDATED. Each now links to styles.css and
  keeps only its own page-specific layout CSS (book grids, packages, etc.)
  in a small local `<style>` block. Visible content/markup is unchanged —
  only colors and the CSS structure changed.
- **belle-epoque.html** — NEW. The Belle Époque Editions imprint page,
  which didn't exist yet (the existing `belle.html` is your Cotton Boll
  Queen reader-funnel page — different "Belle," left untouched). Built
  around the Golden Age poster art volume, credited to Henric Andelson.
  Linked into the nav on index.html and services.html.

## How the color system works now

One stylesheet, three themes, switched by a class on `<body>`:

- **`theme-core`** — LT Publishing + LT Select + author pages + admin.
  Lightened parchment background, moss green + richer gold (LT Publishing),
  slate blue (LT Select).
- **`theme-media`** — LT Media (services.html). Light background, charcoal +
  neutral grey accent instead of the old gold/tan.
- **`theme-belle`** — Belle Époque Editions. Cream/umber background, copper
  accent, deep wine as the secondary accent.

To retheme anything later, you only need to edit the three token blocks at
the top of styles.css — not hunt through individual pages.

## Things I changed beyond the literal color swap

- The escrow/protection modals and KDP-fix modal keep their original warm
  cream-and-gold-brown look on **every** page, regardless of theme. This
  was already the case on the original dark pages; I kept it intentional
  and consistent rather than re-theming modals per page.
- Fixed a pre-existing low-contrast bug on services.html: `.protect-intro`,
  `.protect-item-body`, and `.launch-banner` text were hardcoded to a pale
  mint (`#d4e8db`) that only worked on a dark background. Now uses
  `var(--text-muted)` / `var(--text)`.
- `authors.html`'s LT Select author-card hover used a hardcoded dark navy
  fill left over from the dark theme; now uses the new light slate token.
- `select.html`'s modal had its own blue-tinted override for a couple of
  accent details; updated those specific hex values to match the new
  lighter slate blue rather than leaving the old dark navy shade.

## Explicitly out of scope (untouched, not included in this zip)

- **belle.html, thanks-belle.html, thanks-billy.html** — these are the
  Cotton Boll Queen / Billy reader-funnel pages, on their own small
  unrelated palette. Not part of the imprint branding system, left alone.
- **index(4).html** — appears to be a stray duplicate of index.html from an
  earlier save, not linked from anywhere in the site. Worth deleting from
  the repo; not recreated here.
- Admin/dashboard's dark topbar was kept intentionally dark (now a neutral
  charcoal instead of the old near-black green) as a control-panel design
  convention, not an oversight.

## Honest caveat

I built and reviewed this carefully (cross-checked every CSS variable used
against the ones defined, ran an HTML parser sanity check), but I wasn't
able to render the pages in a browser in this environment to eyeball them
visually. Open each file locally before pushing — that's exactly why you
asked for a zip instead of a direct commit.
