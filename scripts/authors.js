(() => {
  const esc = (v = "") =>
    String(v)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  async function getJSON(path) {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) throw new Error(`${path}: ${response.status}`);
    return response.json();
  }

  function authorCard(author) {
    const photo = author.photo
      ? `<img src="${esc(author.photo)}" alt="${esc(author.name)}" loading="lazy">`
      : `<div class="author-placeholder">${esc(author.name.charAt(0))}</div>`;

    return `
      <a class="profile-card profile-card--dynamic" href="author.html?id=${encodeURIComponent(author.id)}">
        <div class="profile-card__photo">${photo}</div>
        <div>
          <p class="eyebrow">${esc(author.tagline || "")}</p>
          <h2>${esc(author.name)}</h2>
          <p>${esc(author.short_bio || "")}</p>
          <span class="text-link">View author page →</span>
        </div>
      </a>`;
  }

  async function renderAuthorList() {
    const target = document.querySelector("[data-authors]");
    if (!target) return;

    try {
      const data = await getJSON("/data/authors.json");
      const authors = (data.authors || [])
        .filter(a => a.active !== false)
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

      target.innerHTML = authors.length
        ? authors.map(authorCard).join("")
        : `<p class="catalogue-empty">No authors are currently listed.</p>`;
    } catch (error) {
      console.error(error);
      target.innerHTML = `<p class="catalogue-error">The author list could not be loaded.</p>`;
    }
  }

  async function renderAuthorPage() {
    const target = document.querySelector("[data-author-page]");
    if (!target) return;

    const id = new URLSearchParams(location.search).get("id");
    if (!id) {
      target.innerHTML = `<section class="page-intro"><h1>Author not found.</h1></section>`;
      return;
    }

    try {
      const [authorsData, booksData] = await Promise.all([
        getJSON("/data/authors.json"),
        getJSON("/data/books.json")
      ]);

      const author = (authorsData.authors || []).find(a => a.id === id && a.active !== false);
      if (!author) throw new Error("Author not found");

      document.title = `${author.name} — LT Publishing`;

      const photo = author.photo
        ? `<img src="${esc(author.photo)}" alt="${esc(author.name)}">`
        : `<div class="author-placeholder author-placeholder--large">${esc(author.name.charAt(0))}</div>`;

      const links = [
        author.website ? `<a href="${esc(author.website)}" target="_blank" rel="noopener">Website ↗</a>` : "",
        author.instagram ? `<a href="${esc(author.instagram)}" target="_blank" rel="noopener">Instagram ↗</a>` : "",
        author.facebook ? `<a href="${esc(author.facebook)}" target="_blank" rel="noopener">Facebook ↗</a>` : ""
      ].filter(Boolean).join("");

      const books = (booksData.books || [])
        .filter(book =>
          book.status !== "hidden" &&
          ((book.author_id && book.author_id === author.id) || (!book.author_id && book.author === author.name))
        )
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

      target.innerHTML = `
        <section class="author-hero author-hero--dynamic">
          <div>
            <p class="eyebrow">${esc(author.tagline || "Author")}</p>
            <h1>${esc(author.name)}</h1>
            <p class="author-deck">${esc(author.short_bio || "")}</p>
          </div>
          <aside class="author-portrait">${photo}</aside>
        </section>
        <section class="split-section">
          <div><p class="eyebrow">Biography</p><h2>About the author</h2></div>
          <div>
            <p>${esc(author.bio || author.short_bio || "")}</p>
            ${author.genres?.length ? `<p class="author-genres">${author.genres.map(esc).join(" · ")}</p>` : ""}
            ${links ? `<div class="author-links">${links}</div>` : ""}
          </div>
        </section>
        <section class="section">
          <div class="section-heading">
            <div><p class="eyebrow">Books</p><h2>Current titles</h2></div>
            <p>Titles are drawn directly from the catalogue manager.</p>
          </div>
          <div class="catalogue catalogue--compact" id="author-books"></div>
        </section>`;

      const booksTarget = document.getElementById("author-books");
      if (!books.length) {
        booksTarget.innerHTML = `<p class="catalogue-empty">No titles are currently listed.</p>`;
      } else {
        // Reuse the catalogue renderer by creating temporary filtered markup.
        booksTarget.dataset.catalogue = "";
        booksTarget.dataset.author = author.name;
        booksTarget.dataset.layout = "compact";
        const script = document.createElement("script");
        script.src = "/scripts/catalog.js";
        document.body.appendChild(script);
      }
    } catch (error) {
      console.error(error);
      target.innerHTML = `<section class="page-intro"><p class="eyebrow">Authors</p><h1>Author not found.</h1><p><a href="authors.html">Return to the authors page.</a></p></section>`;
    }
  }

  renderAuthorList();
  renderAuthorPage();
})();
