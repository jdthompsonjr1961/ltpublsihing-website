(() => {
  const imprintNames = {
    publishing: 'LT Publishing',
    select: 'LT Select',
    belle: 'Belle Époque Editions'
  };

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  function bookCard(book) {
    const cover = book.cover
      ? `<img src="${escapeHtml(book.cover)}" alt="Cover of ${escapeHtml(book.title)}" loading="lazy">`
      : `<div class="cover-placeholder"><span>${escapeHtml(book.title)}</span></div>`;

    const author = book.author_url
      ? `<a href="${escapeHtml(book.author_url)}">${escapeHtml(book.author)}</a>`
      : escapeHtml(book.author);

    const action = book.purchase_url
      ? `<a class="text-link" href="${escapeHtml(book.purchase_url)}" target="_blank" rel="noopener">Buy the book <span aria-hidden="true">↗</span></a>`
      : `<span class="text-link text-link--muted">Details forthcoming</span>`;

    return `
      <article class="book-card" data-imprint="${escapeHtml(book.imprint)}">
        <div class="book-card__cover">${cover}</div>
        <div class="book-card__content">
          <div class="eyebrow">${escapeHtml(imprintNames[book.imprint] || book.imprint)}</div>
          <h3>${escapeHtml(book.title)}</h3>
          <p class="book-card__author">${author}</p>
          <div class="book-meta">
            <span class="status status--${escapeHtml(book.status)}">${escapeHtml(book.status_label)}</span>
            <span>${escapeHtml(book.genre)}</span>
          </div>
          <p>${escapeHtml(book.description)}</p>
          ${action}
        </div>
      </article>`;
  }

  async function renderCatalogue() {
    const target = document.querySelector('[data-catalogue]');
    if (!target) return;

    try {
      const response = await fetch('/data/books.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`Catalogue request failed: ${response.status}`);
      const payload = await response.json();
      const books = (payload.books || [])
        .filter(book => book.status !== 'hidden')
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

      target.innerHTML = books.map(bookCard).join('');
      document.dispatchEvent(new CustomEvent('lt:catalogue-rendered', { detail: { books } }));
    } catch (error) {
      console.error(error);
      target.innerHTML = '<p class="catalogue-error">The catalogue could not be loaded. Please refresh the page.</p>';
    }
  }

  renderCatalogue();
})();
