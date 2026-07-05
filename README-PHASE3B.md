# LT Publishing redesign — Phase 3B

Use this package instead of Phase 3.

It includes everything from Phase 3 plus:

- `data/authors.json`
- an Author Catalogue in Decap CMS
- automatic public author listings
- a generic individual author page
- automatic linking of books to authors
- preserved redirects from the existing author-page URLs

## Author fields

- Author ID
- name
- tagline
- short biography
- full biography
- photograph
- genres
- imprints
- website/social links
- featured status
- active/hidden status
- display order

## Linking a book to an author

For new books, enter the author's ID in the optional `Author ID` field. Existing books continue to match by author name when no ID is present.

Upload this package to the root of `site-redesign`, preserving folders.
