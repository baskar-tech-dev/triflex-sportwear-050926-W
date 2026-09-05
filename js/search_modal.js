/**
 * TRIFLEX INSTANT LIVE SEARCH MODAL
 * Keyboard shortcut "/" or Cmd+K / search button
 */
class SearchModalManager {
  constructor() {
    this.modal = document.getElementById('search-modal-overlay');
    this.input = document.getElementById('search-modal-input');
    this.resultsContainer = document.getElementById('search-results-list');
    this.init();
  }

  init() {
    if (!this.modal) return;

    document.addEventListener('keydown', e => {
      if ((e.key === '/' || (e.metaKey && e.key === 'k') || (e.ctrlKey && e.key === 'k')) && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        this.open();
      } else if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.close();
      }
    });

    document.addEventListener('click', e => {
      if (e.target.closest('[data-open-search], .search-trigger-btn')) {
        e.preventDefault();
        this.open();
      }
      if (e.target.closest('[data-close-search], .search-modal-close') || e.target === this.modal) {
        e.preventDefault();
        this.close();
      }
    });

    if (this.input) {
      this.input.addEventListener('input', () => {
        this.performSearch(this.input.value);
      });
    }
  }

  open() {
    if (!this.modal) return;
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (this.input) {
      this.input.value = '';
      this.performSearch('');
      setTimeout(() => this.input.focus(), 50);
    }
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  performSearch(query) {
    if (!this.resultsContainer) return;
    const products = typeof searchProducts === 'function' ? (query ? searchProducts(query) : typeof TRIFLEX_PRODUCTS !== 'undefined' ? TRIFLEX_PRODUCTS.slice(0, 6) : []) : [];

    if (products.length === 0) {
      this.resultsContainer.innerHTML = `
        <div style="text-align: center; padding: 40px 10px; color: var(--text-secondary);">
          <p>No products found matching "${query}". Try searching by code (e.g. <strong>TR-101</strong>) or category (e.g. <strong>shorts</strong>, <strong>teamwear</strong>).</p>
        </div>
      `;
      return;
    }

    let html = '';
    products.forEach(p => {
      html += `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; background: var(--bg-surface-card); border: 1px solid var(--border-color); border-radius: var(--radius-sm); margin-bottom: 8px; transition: all var(--transition-fast);" onmouseover="this.style.borderColor='var(--accent-lime)'" onmouseout="this.style.borderColor='var(--border-color)'">
          <div style="display: flex; align-items: center; gap: 14px;">
            <img src="${(p.images && p.images[0]) ? p.images[0] : 'images/cat-tshirt.png'}" alt="${p.name}" style="width: 48px; height: 48px; object-fit: cover; border-radius: 4px; background: #000;">
            <div>
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-lime); font-weight: 700;">${p.productCode || p.wholesaleCode}</span>
              <h5 style="font-family: var(--font-heading); font-size: 0.92rem; text-transform: uppercase; margin: 2px 0;">${p.name}</h5>
              <span style="font-size: 0.75rem; color: var(--text-secondary);">${p.gsm} &bull; ${p.category.toUpperCase()} &bull; MOQ: ${p.moq}</span>
            </div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn-secondary btn-sm" onclick="window.quickViewManager.open('${p.id}'); window.searchManager.close();">QUICK VIEW</button>
            <button class="btn-primary btn-sm" onclick="window.bagManager.addItem('${p.id}', 50); window.searchManager.close();">+ ENQUIRY</button>
          </div>
        </div>
      `;
    });
    this.resultsContainer.innerHTML = html;
  }
}

window.searchManager = new SearchModalManager();
