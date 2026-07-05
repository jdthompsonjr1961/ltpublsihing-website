# Admin preview fix

Replace only:

admin/index.html

This corrects the Decap preview registration from the file name `books` to the collection name `catalogue`, and embeds the compact preview CSS directly.

After Netlify redeploys, hard-refresh `/admin/index.html`.
