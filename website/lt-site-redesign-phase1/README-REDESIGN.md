# LT Publishing redesign — Phase 1

This package replaces the homepage and repairs the catalogue-management architecture.

## What changes

- `/admin/` now edits one structured file: `data/books.json`.
- The admin is configured to commit to the `site-redesign` branch while this work is being reviewed.
- The homepage reads the same `data/books.json` file, so adding a book or changing its status affects the public catalogue after Netlify deploys the commit.
- The old root-level `admin.html` and `dashboard.html` are not required by the new system. Leave them in place during testing, then remove them once `/admin/` is confirmed working.
- The existing `/assets/` catalogue is intentionally untouched in Phase 1 because it currently works and contains substantial edited metadata.

## Files to add or replace

- `index.html`
- `styles.css`
- `admin/index.html`
- `admin/config.yml`
- `data/books.json` (new)
- `scripts/catalog.js` (new)

## Netlify checks

1. In Netlify, confirm Identity is enabled.
2. Confirm Git Gateway is enabled under Identity > Services.
3. Confirm the invited admin user can log in at `/admin/`.
4. Make a harmless status-label edit and publish it.
5. Confirm the commit lands on `site-redesign` and triggers a deploy.
6. Confirm the homepage reflects the change.

## Before merging to main

Change this line in `admin/config.yml`:

`branch: site-redesign`

to:

`branch: main`

Then merge the redesign branch.
