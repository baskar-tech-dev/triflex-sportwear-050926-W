/**
 * TRIFLEX SPORTSWEAR — MASTER CLIENT CONTROLLER
 */

/**
 * TRIFLEX B2B ENQUIRY BAG MANAGER
 * LocalStorage persistence, MOQ validation, and master carton calculations.
 */
const BAG_STORAGE_KEY = 'triflex_wholesale_enquiry_bag';

class EnquiryBagManager {
  constructor() {
    this.items = this.loadBag();
    this.initListeners();
    this.updateBadges();
  }

  loadBag() {
    try {
      const data = localStorage.getItem(BAG_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveBag() {
    localStorage.setItem(BAG_STORAGE_KEY, JSON.stringify(this.items));
    this.updateBadges();
    this.renderDrawer();
    this.renderBagPage();
  }

  addItem(productId, qty = 50, isSample = false, notes = '') {
    const product = typeof getProductById === 'function' ? getProductById(productId) : null;
    if (!product) return;

    const existingIndex = this.items.findIndex(i => i.id === productId && i.isSample === isSample);
    if (existingIndex > -1) {
      this.items[existingIndex].quantity += qty;
    } else {
      this.items.push({
        id: product.id,
        productCode: product.productCode || product.wholesaleCode || product.id,
        name: product.name,
        category: product.category,
        gsm: product.gsm || 'Technical Knit',
        fabric: product.fabric || 'Micro-Poly Interlock',
        packSize: product.packSize || '25 Pcs / Master Carton',
        moq: product.moq || '50 Pcs',
        quantity: isSample ? 1 : qty,
        isSample: isSample,
        notes: notes,
        image: (product.images && product.images[0]) ? product.images[0] : 'images/cat-tshirt.png'
      });
    }

    this.saveBag();
    this.showToast(`Added ${product.name} (${product.productCode || product.wholesaleCode}) to Enquiry Bag`);
  }

  removeItem(index) {
    if (this.items[index]) {
      const name = this.items[index].name;
      this.items.splice(index, 1);
      this.saveBag();
      this.showToast(`Removed ${name} from Enquiry Bag`);
    }
  }

  updateQuantity(index, newQty) {
    if (newQty <= 0) {
      this.removeItem(index);
    } else if (this.items[index]) {
      this.items[index].quantity = newQty;
      this.saveBag();
    }
  }

  toggleSample(index) {
    if (this.items[index]) {
      this.items[index].isSample = !this.items[index].isSample;
      if (this.items[index].isSample) {
        this.items[index].quantity = 1;
      }
      this.saveBag();
    }
  }

  getCount() {
    return this.items.length;
  }

  getTotalPieces() {
    return this.items.reduce((sum, item) => sum + (item.isSample ? 1 : item.quantity), 0);
  }

  updateBadges() {
    const count = this.getCount();
    document.querySelectorAll('.bag-badge-count, .rfq-badge-count, .cart-badge-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'inline-flex' : 'none';
    });

    const mobileCountEl = document.getElementById('mobile-bag-count-num');
    if (mobileCountEl) {
      mobileCountEl.textContent = count;
    }
  }

  showToast(message) {
    let toast = document.getElementById('triflex-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'triflex-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 3200);
  }

  openDrawer() {
    const drawer = document.getElementById('enquiry-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    if (drawer && backdrop) {
      this.renderDrawer();
      drawer.classList.add('active');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeDrawer() {
    const drawer = document.getElementById('enquiry-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('active');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  renderDrawer() {
    const container = document.getElementById('drawer-items-container');
    const totalEl = document.getElementById('drawer-total-pieces');
    const countEl = document.getElementById('drawer-items-count');
    if (!container) return;

    if (countEl) countEl.textContent = `(${this.getCount()})`;
    if (totalEl) totalEl.textContent = `${this.getTotalPieces()} Pcs`;

    if (this.items.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 10px; color: var(--text-secondary);">
          <div style="font-size: 2.2rem; margin-bottom: 12px;">📋</div>
          <h4 style="font-family: var(--font-heading); font-size: 1.1rem; color: var(--text-primary); text-transform: uppercase; margin-bottom: 6px;">Enquiry Bag is Empty</h4>
          <p style="font-size: 0.85rem; margin-bottom: 20px;">Browse the collection to add articles and sample requests for wholesale quotation.</p>
          <a href="collection.html" class="btn-primary btn-sm" onclick="window.bagManager.closeDrawer()">EXPLORE COLLECTION &rarr;</a>
        </div>
      `;
      const submitBtn = document.getElementById('drawer-quote-btn');
      if (submitBtn) submitBtn.disabled = true;
      return;
    }

    const submitBtn = document.getElementById('drawer-quote-btn');
    if (submitBtn) submitBtn.disabled = false;

    let html = '';
    this.items.forEach((item, index) => {
      html += `
        <div class="drawer-item-card">
          <img src="${item.image}" alt="${item.name}" class="drawer-item-img">
          <div class="drawer-item-info">
            <span class="drawer-item-code">${item.productCode} ${item.isSample ? '<span style="color:var(--accent-lime); font-size:0.65rem;">[SAMPLE SWATCH]</span>' : ''}</span>
            <div class="drawer-item-name">${item.name}</div>
            <div class="drawer-item-meta">${item.gsm} &bull; MOQ: ${item.moq}</div>
            <div class="drawer-qty-control">
              <button class="drawer-qty-btn" onclick="window.bagManager.updateQuantity(${index}, ${item.quantity - 10})" ${item.isSample ? 'disabled' : ''}>-</button>
              <span class="drawer-qty-val">${item.quantity} ${item.isSample ? 'Pc' : 'Pcs'}</span>
              <button class="drawer-qty-btn" onclick="window.bagManager.updateQuantity(${index}, ${item.quantity + 10})" ${item.isSample ? 'disabled' : ''}>+</button>
            </div>
          </div>
          <button class="drawer-item-remove" onclick="window.bagManager.removeItem(${index})" title="Remove item">&times;</button>
        </div>
      `;
    });
    container.innerHTML = html;
  }

  renderBagPage() {
    const pageContainer = document.getElementById('bag-page-items-list');
    if (!pageContainer) return;

    if (this.items.length === 0) {
      pageContainer.innerHTML = `
        <div style="text-align: center; padding: 60px 20px; background: var(--bg-surface); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <div style="font-size: 3rem; margin-bottom: 16px;">📋</div>
          <h3 style="font-family: var(--font-display); font-size: 1.8rem; text-transform: uppercase; margin-bottom: 8px;">Your Enquiry Bag is Empty</h3>
          <p style="color: var(--text-secondary); margin-bottom: 24px;">Add wholesale articles, master cartons, or sample swatches to submit your official quote request.</p>
          <a href="collection.html" class="btn-primary">EXPLORE SHOWROOM &rarr;</a>
        </div>
      `;
      const submitBtn = document.getElementById('bag-page-submit-btn');
      if (submitBtn) submitBtn.disabled = true;
      return;
    }

    const submitBtn = document.getElementById('bag-page-submit-btn');
    if (submitBtn) submitBtn.disabled = false;

    let html = '';
    this.items.forEach((item, index) => {
      html += `
        <div style="display: grid; grid-template-columns: 80px 1fr auto auto; gap: 20px; padding: 20px; background: var(--bg-surface-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); align-items: center; margin-bottom: 14px;">
          <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: var(--radius-sm);">
          <div>
            <div style="font-family: var(--font-mono); font-size: 0.68rem; color: #0A0A0A; background: #C8F000; font-weight: 800; padding: 2px 6px; border-radius: 3px; width: fit-content;">${item.productCode}</div>
            <h4 style="font-family: var(--font-heading); font-size: 1.1rem; text-transform: uppercase; margin: 4px 0;">${item.name}</h4>
            <div style="font-size: 0.82rem; color: var(--text-secondary);">${item.gsm} &bull; ${item.packSize}</div>
            <label style="display: inline-flex; align-items: center; gap: 6px; margin-top: 8px; font-size: 0.75rem; color: var(--text-secondary); cursor: pointer;">
              <input type="checkbox" ${item.isSample ? 'checked' : ''} onchange="window.bagManager.toggleSample(${index})"> Request as Physical Fabric Sample
            </label>
          </div>
          <div>
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-secondary); margin-bottom: 4px;">REQUIRED QUANTITY</div>
            <div class="drawer-qty-control" style="background: var(--bg-surface);">
              <button class="drawer-qty-btn" onclick="window.bagManager.updateQuantity(${index}, ${item.quantity - 10})" ${item.isSample ? 'disabled' : ''}>-</button>
              <input type="number" value="${item.quantity}" min="1" style="width: 60px; text-align: center; background: none; border: none; font-family: var(--font-mono); font-weight: 700; color: var(--text-primary);" onchange="window.bagManager.updateQuantity(${index}, parseInt(this.value) || 1)">
              <button class="drawer-qty-btn" onclick="window.bagManager.updateQuantity(${index}, ${item.quantity + 10})" ${item.isSample ? 'disabled' : ''}>+</button>
            </div>
          </div>
          <button class="drawer-item-remove" style="font-size: 1.4rem;" onclick="window.bagManager.removeItem(${index})" title="Remove">&times;</button>
        </div>
      `;
    });

    pageContainer.innerHTML = html;

    const summaryTotalEl = document.getElementById('bag-page-total-qty');
    if (summaryTotalEl) {
      summaryTotalEl.textContent = `${this.getTotalPieces()} Pieces`;
    }
  }

  initListeners() {
    document.addEventListener('click', e => {
      const openTrigger = e.target.closest('[data-open-enquiry-drawer], .enquiry-bag-btn');
      if (openTrigger) {
        e.preventDefault();
        this.openDrawer();
      }

      const closeTrigger = e.target.closest('[data-close-enquiry-drawer], .drawer-close-btn, #drawer-backdrop');
      if (closeTrigger) {
        e.preventDefault();
        this.closeDrawer();
      }

      const addTrigger = e.target.closest('[data-add-to-enquiry]');
      if (addTrigger) {
        e.preventDefault();
        const id = addTrigger.getAttribute('data-add-to-enquiry');
        const qty = parseInt(addTrigger.getAttribute('data-qty')) || 50;
        this.addItem(id, qty);
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.closeDrawer();
      }
    });
  }
}

window.bagManager = new EnquiryBagManager();


﻿/**
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


/**
 * TRIFLEX QUICK ORDER BY PRODUCT CODE
 * Bulk matrix entry tool for repeat wholesale buyers.
 */
class QuickOrderManager {
  constructor() {
    this.modal = document.getElementById('quick-order-modal-overlay');
    this.tbody = document.getElementById('quick-order-tbody');
    this.init();
  }

  init() {
    document.addEventListener('click', e => {
      if (e.target.closest('[data-open-quick-order]')) {
        e.preventDefault();
        this.open();
      }
      if (e.target.closest('[data-close-quick-order], .quick-order-modal-close') || e.target === this.modal) {
        e.preventDefault();
        this.close();
      }
    });

    const addRowBtn = document.getElementById('quick-order-add-row-btn');
    if (addRowBtn) {
      addRowBtn.addEventListener('click', () => this.addRow());
    }

    const addAllBtn = document.getElementById('quick-order-add-all-btn');
    if (addAllBtn) {
      addAllBtn.addEventListener('click', () => this.addAllToBag());
    }
  }

  open() {
    if (!this.modal) return;
    this.renderInitialRows();
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  renderInitialRows() {
    if (!this.tbody) return;
    this.tbody.innerHTML = '';
    this.addRow('TR-101', 50);
    this.addRow('TR-201', 50);
    this.addRow('TR-401', 20);
  }

  addRow(defaultCode = '', defaultQty = 50) {
    if (!this.tbody) return;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <input type="text" class="quick-order-input qo-code-input" list="triflex-product-codes" placeholder="e.g. TR-101" value="${defaultCode}" style="text-transform: uppercase;" oninput="window.quickOrderManager.handleCodeInput(this)">
      </td>
      <td>
        <input type="number" class="quick-order-input qo-qty-input" value="${defaultQty}" min="10" step="10">
      </td>
      <td class="qo-status-cell" style="font-size: 0.78rem; color: var(--text-secondary);">
        Validating...
      </td>
      <td style="text-align: right;">
        <button type="button" style="background: none; border: none; color: var(--text-muted); font-size: 1.2rem; cursor: pointer;" onclick="this.closest('tr').remove()">&times;</button>
      </td>
    `;
    this.tbody.appendChild(tr);
    const codeInput = tr.querySelector('.qo-code-input');
    if (codeInput) {
      this.handleCodeInput(codeInput);
    }
  }

  handleCodeInput(inputEl) {
    const row = inputEl.closest('tr');
    const statusCell = row ? row.querySelector('.qo-status-cell') : null;
    if (!statusCell) return;

    const code = inputEl.value.trim();
    if (!code) {
      statusCell.innerHTML = '<span style="color:var(--text-muted)">Enter code</span>';
      return;
    }

    const product = typeof getProductByCode === 'function' ? getProductByCode(code) : null;
    if (product) {
      statusCell.innerHTML = `
        <span style="color: var(--accent-lime); font-weight: 700;">✓ ${product.name}</span>
        <div style="font-size: 0.7rem; color: var(--text-muted);">MOQ: ${product.moq}</div>
      `;
      row.setAttribute('data-product-id', product.id);
    } else {
      statusCell.innerHTML = '<span style="color: #FF6666;">Invalid Code</span>';
      row.removeAttribute('data-product-id');
    }
  }

  addAllToBag() {
    if (!this.tbody) return;
    const rows = this.tbody.querySelectorAll('tr');
    let addedCount = 0;

    rows.forEach(row => {
      const productId = row.getAttribute('data-product-id');
      const qtyInput = row.querySelector('.qo-qty-input');
      const qty = qtyInput ? (parseInt(qtyInput.value) || 50) : 50;

      if (productId && typeof window.bagManager !== 'undefined') {
        window.bagManager.addItem(productId, qty);
        addedCount++;
      }
    });

    if (addedCount > 0) {
      this.close();
      if (typeof window.bagManager !== 'undefined') {
        window.bagManager.openDrawer();
      }
    } else {
      alert('Please enter at least one valid Product Code (e.g. TR-101, TR-201).');
    }
  }
}

window.quickOrderManager = new QuickOrderManager();


/**
 * TRIFLEX PRODUCT QUICK VIEW MODAL
 */
class QuickViewManager {
  constructor() {
    this.modal = document.getElementById('quick-view-modal-overlay');
    this.container = document.getElementById('quick-view-content');
    this.init();
  }

  init() {
    document.addEventListener('click', e => {
      const trigger = e.target.closest('[data-open-quick-view]');
      if (trigger) {
        e.preventDefault();
        const id = trigger.getAttribute('data-open-quick-view');
        this.open(id);
      }
      if (e.target.closest('[data-close-quick-view], .quick-view-modal-close') || e.target === this.modal) {
        e.preventDefault();
        this.close();
      }
    });
  }

  open(productId) {
    if (!this.modal || !this.container) return;
    const product = typeof getProductById === 'function' ? getProductById(productId) : null;
    if (!product) return;

    const mainImg = (product.images && product.images[0]) ? product.images[0] : 'images/cat-tshirt.png';

    this.container.innerHTML = `
      <div class="quick-view-grid">
        <!-- Gallery Left -->
        <div>
          <div style="position: relative; overflow: hidden; border-radius: var(--radius-sm);">
            <img id="qv-main-img" src="${mainImg}" alt="${product.name}" class="quick-view-gallery-img">
            <button type="button" class="product-img-wa-btn" data-wa-enquire="${product.id}" title="Enquire about ${product.name} on WhatsApp" style="top: 10px; right: 10px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span>ENQUIRE</span>
            </button>
          </div>
          <div style="display: flex; gap: 10px; margin-top: 12px; overflow-x: auto; padding-bottom: 4px;">
            ${(product.images || [mainImg]).map(img => `
              <img src="${img}" alt="Thumb" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px; cursor: pointer; border: 1px solid var(--border-color);" onclick="document.getElementById('qv-main-img').src='${img}'">
            `).join('')}
          </div>
        </div>

        <!-- Details Right -->
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span class="mono-tag" style="color: var(--accent-lime); font-size: 0.82rem;">${product.productCode} &bull; ${product.wholesaleCode}</span>
              <span class="eyebrow-badge" style="margin: 0;">${product.category.toUpperCase()}</span>
            </div>

            <h2 style="font-family: var(--font-heading); font-size: 1.45rem; font-weight: 800; margin-bottom: 8px; color: var(--text-primary); text-transform: uppercase;">
              ${product.name}
            </h2>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; background: #F8F9FA; padding: 14px; border-radius: var(--radius-sm); margin-bottom: 16px; font-size: 0.8rem;">
              <div>
                <span style="color: var(--text-muted); display: block;">FABRIC WEIGHT</span>
                <strong style="color: var(--brand-navy); font-family: var(--font-mono);">${product.gsm}</strong>
              </div>
              <div>
                <span style="color: var(--text-muted); display: block;">MIN ORDER (MOQ)</span>
                <strong style="color: var(--text-primary);">${product.moq}</strong>
              </div>
              <div>
                <span style="color: var(--text-muted); display: block;">COMPOSITION</span>
                <strong style="color: var(--text-primary);">${product.fabric}</strong>
              </div>
              <div>
                <span style="color: var(--text-muted); display: block;">PACKAGING SPEC</span>
                <strong style="color: var(--text-primary);">${product.packSize}</strong>
              </div>
            </div>

            <div style="margin-bottom: 20px;">
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-secondary); display: block; margin-bottom: 8px;">AVAILABLE COLOURS</span>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${(product.colours || []).map(c => `
                  <span style="padding: 4px 10px; background: #F3F4F6; border: 1px solid var(--border-color); border-radius: 3px; font-size: 0.75rem; color: var(--text-primary);">${c}</span>
                `).join('')}
              </div>
            </div>
          </div>

          <div>
            <div style="display: flex; gap: 10px; margin-bottom: 12px; flex-wrap: wrap;">
              <div style="display: flex; align-items: center; border: 1px solid var(--border-color); border-radius: var(--radius-sm); background: #FFFFFF;">
                <button type="button" style="padding: 8px 14px; background: none; border: none; color: var(--text-primary); cursor: pointer;" onclick="const el = document.getElementById('qv-qty-input'); el.value = Math.max(10, (parseInt(el.value)||50) - 10);">-</button>
                <input type="number" id="qv-qty-input" value="50" min="10" step="10" style="width: 60px; text-align: center; background: none; border: none; font-family: var(--font-mono); font-weight: 700; color: var(--text-primary);">
                <button type="button" style="padding: 8px 14px; background: none; border: none; color: var(--text-primary); cursor: pointer;" onclick="const el = document.getElementById('qv-qty-input'); el.value = (parseInt(el.value)||50) + 10;">+</button>
              </div>
              <button type="button" class="btn-wa-card" style="flex: 1;" onclick="window.sendWhatsAppEnquiry('${product.id}');" title="Enquire about ${product.name} on WhatsApp">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                <span>WHATSAPP ENQUIRY</span>
              </button>
              <button type="button" class="btn-primary" style="padding: 8px 16px;" onclick="const q = parseInt(document.getElementById('qv-qty-input').value)||50; window.bagManager.addItem('${product.id}', q); window.quickViewManager.close(); window.bagManager.openDrawer();">
                + BAG
              </button>
            </div>
            <a href="product.html?id=${product.id}" class="btn-ghost" style="font-size: 0.78rem; text-align: center; justify-content: center; width: 100%;">
              VIEW FULL TECHNICAL ARTICLE SPECIFICATION &rarr;
            </a>
          </div>
        </div>
      </div>
    `;

    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

window.quickViewManager = new QuickViewManager();


﻿/**
 * TRIFLEX B2B WHOLESALE ENQUIRY & QUOTE SUBMISSION
 * Generates official trade reference ID and connects directly with Trade Sales Desk.
 */
class WholesaleQuoteModalManager {
  constructor() {
    this.modal = document.getElementById('rfq-quote-modal-overlay');
    this.form = document.getElementById('b2b-rfq-form');
    this.confirmationView = document.getElementById('rfq-confirmation-view');
    this.init();
  }

  init() {
    document.addEventListener('click', e => {
      const openTrigger = e.target.closest('[data-open-rfq-modal], #drawer-quote-btn, #bag-page-submit-btn');
      if (openTrigger) {
        e.preventDefault();
        const prefilledId = openTrigger.getAttribute('data-prefilled-id');
        this.open(prefilledId);
      }
      if (e.target.closest('[data-close-rfq-modal], .rfq-modal-close') || e.target === this.modal) {
        e.preventDefault();
        this.close();
      }
    });

    if (this.form) {
      this.form.addEventListener('submit', e => {
        e.preventDefault();
        this.handleSubmit();
      });
    }
  }

  open(prefilledId = null) {
    if (!this.modal) return;
    if (typeof window.bagManager !== 'undefined') {
      window.bagManager.closeDrawer();
    }

    if (prefilledId && typeof window.bagManager !== 'undefined') {
      window.bagManager.addItem(prefilledId, 50);
    }

    // Reset view
    if (this.form) this.form.style.display = 'block';
    if (this.confirmationView) this.confirmationView.style.display = 'none';

    // Populate bag summary
    const summaryContainer = document.getElementById('rfq-modal-items-summary');
    if (summaryContainer && typeof window.bagManager !== 'undefined') {
      const items = window.bagManager.items;
      if (items.length === 0) {
        summaryContainer.innerHTML = '<span style="color:var(--text-muted);">No specific articles selected. General catalog quote.</span>';
      } else {
        summaryContainer.innerHTML = items.map(i => `
          <div style="display: flex; justify-content: space-between; font-size: 0.8rem; padding: 4px 0; border-bottom: 1px dashed var(--border-color);">
            <span><strong>${i.productCode}</strong> - ${i.name} ${i.isSample ? '[SAMPLE]' : ''}</span>
            <span style="font-family: var(--font-mono); color: var(--accent-lime);">${i.quantity} Pcs</span>
          </div>
        `).join('');
      }
    }

    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  handleSubmit() {
    const company = document.getElementById('rfq-company')?.value || 'Retail Buyer';
    const contactPerson = document.getElementById('rfq-contact')?.value || 'Trade Partner';
    const email = document.getElementById('rfq-email')?.value || '';
    const phone = document.getElementById('rfq-phone')?.value || '';
    const country = document.getElementById('rfq-country')?.value || 'India';
    const customReq = document.getElementById('rfq-customization')?.value || 'Standard Stock';
    const notes = document.getElementById('rfq-message')?.value || 'Please provide lowest FOB/Wholesale quote.';

    const refId = 'TRF-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    const items = typeof window.bagManager !== 'undefined' ? window.bagManager.items : [];
    const totalPieces = typeof window.bagManager !== 'undefined' ? window.bagManager.getTotalPieces() : 0;

    let itemsText = items.map(i => `- ${i.productCode}: ${i.name} (Qty: ${i.quantity} ${i.isSample ? 'Sample' : 'Pcs'})`).join('\n');
    if (!itemsText) itemsText = 'General Wholesale Inquiry';

    // Switch to Confirmation View
    if (this.form) this.form.style.display = 'none';
    if (this.confirmationView) {
      this.confirmationView.style.display = 'block';
      this.confirmationView.innerHTML = `
        <div style="text-align: center; padding: 30px 10px;">
          <div style="width: 60px; height: 60px; border-radius: 50%; background: var(--accent-lime); color: #080808; font-size: 1.8rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-weight: 900;">✓</div>
          <span class="eyebrow-badge">OFFICIAL TRADE RFQ GENERATED</span>
          <h2 style="font-family: var(--font-display); font-size: 2rem; text-transform: uppercase; margin-bottom: 8px;">ENQUIRY RECEIVED</h2>
          <p style="color: var(--text-secondary); font-size: 0.92rem; max-width: 480px; margin: 0 auto 20px;">
            Thank you, <strong>${contactPerson}</strong> (${company}). Your wholesale quotation request has been assigned Reference ID: <strong style="color: var(--accent-lime); font-family: var(--font-mono);">${refId}</strong>.
          </p>

          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 18px; text-align: left; margin-bottom: 24px; font-size: 0.82rem; font-family: var(--font-mono);">
            <div style="color: var(--accent-lime); font-weight: 700; margin-bottom: 8px;">TRADE SUMMARY &bull; REF: ${refId}</div>
            <div><strong>Company:</strong> ${company} (${country})</div>
            <div><strong>Contact:</strong> ${contactPerson} | ${phone} | ${email}</div>
            <div><strong>Customization:</strong> ${customReq}</div>
            <div><strong>Total Units:</strong> ${totalPieces} Pcs</div>
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px dashed var(--border-color); max-height: 100px; overflow-y: auto;">
              ${items.map(i => `<div>&bull; ${i.productCode} - ${i.name} (${i.quantity} Pcs)</div>`).join('')}
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            <a href="https://wa.me/919876543210?text=${encodeURIComponent(`Hello TRIFLEX Trade Sales Desk, I have submitted wholesale inquiry ${refId} for ${company}. Required: ${totalPieces} Pcs. Please provide pricing.`)}" target="_blank" class="btn-primary" style="width: 100%; text-align: center;">
              <span>FAST-TRACK VIA WHATSAPP TRADE DESK</span>
              <span>&rarr;</span>
            </a>
            <button type="button" class="btn-secondary" onclick="window.quoteModalManager.close();" style="width: 100%;">
              CLOSE &amp; CONTINUE BROWSING
            </button>
          </div>
        </div>
      `;
    }
  }
}

window.quoteModalManager = new WholesaleQuoteModalManager();


document.addEventListener('DOMContentLoaded', () => {
  // 01. Homepage Category Tab Filter in Section 03 (2026 Collection)
  const showroomTabs = document.querySelectorAll('.showroom-tab-btn');
  const showroomGrid = document.getElementById('featured-products-container') || document.getElementById('digital-showroom-grid');

  if (showroomGrid) {
    renderShowroomGrid('all');

    showroomTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        showroomTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const cat = tab.getAttribute('data-category-tab') || tab.getAttribute('data-category') || 'all';
        renderShowroomGrid(cat);
      });
    });
  }

  function renderShowroomGrid(category) {
    if (!showroomGrid) return;
    const products = typeof getProductsByCategory === 'function' ? getProductsByCategory(category) : (typeof TRIFLEX_PRODUCTS !== 'undefined' ? TRIFLEX_PRODUCTS : []);
    
    let html = '';
    const displayItems = category === 'all' ? products.slice(0, 8) : products;
    displayItems.forEach(p => {
      html += renderProductCardHTML(p);
    });
    showroomGrid.innerHTML = html;
  }

  // 03. Collection Showroom Page (collection.html / men.html / women.html / kids.html)
  const collectionGrid = document.getElementById('collection-products-grid') || document.getElementById('category-products-grid');
  if (collectionGrid) {
    const pageCategory = document.body.getAttribute('data-category') || 'all';
    renderCollectionPage(pageCategory);

    // Filter controls
    const filterCategory = document.getElementById('filter-category');
    const filterGsm = document.getElementById('filter-gsm');
    const filterSearch = document.getElementById('filter-search');

    const triggerFilter = () => {
      const cat = filterCategory ? filterCategory.value : pageCategory;
      const gsm = filterGsm ? filterGsm.value : 'all';
      const search = filterSearch ? filterSearch.value.toLowerCase().trim() : '';

      let items = typeof getProductsByCategory === 'function' ? getProductsByCategory(cat) : (typeof TRIFLEX_PRODUCTS !== 'undefined' ? TRIFLEX_PRODUCTS : []);

      if (gsm !== 'all') {
        items = items.filter(p => p.gsm && p.gsm.includes(gsm));
      }
      if (search) {
        items = items.filter(p => 
          (p.productCode && p.productCode.toLowerCase().includes(search)) ||
          (p.wholesaleCode && p.wholesaleCode.toLowerCase().includes(search)) ||
          (p.name && p.name.toLowerCase().includes(search)) ||
          (p.fabric && p.fabric.toLowerCase().includes(search))
        );
      }

      let html = '';
      items.forEach(p => {
        html += renderProductCardHTML(p);
      });
      collectionGrid.innerHTML = html || '<div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-secondary);">No articles match the selected filters.</div>';

      const countEl = document.getElementById('item-count-label');
      if (countEl) {
        countEl.textContent = `SHOWING ${items.length} WHOLESALE ARTICLES`;
      }
    };

    if (filterCategory) filterCategory.addEventListener('change', triggerFilter);
    if (filterGsm) filterGsm.addEventListener('change', triggerFilter);
    if (filterSearch) filterSearch.addEventListener('input', triggerFilter);
  }

  function renderCollectionPage(category) {
    if (!collectionGrid) return;
    const items = typeof getProductsByCategory === 'function' ? getProductsByCategory(category) : (typeof TRIFLEX_PRODUCTS !== 'undefined' ? TRIFLEX_PRODUCTS : []);
    let html = '';
    items.forEach(p => {
      html += renderProductCardHTML(p);
    });
    collectionGrid.innerHTML = html;

    const countEl = document.getElementById('item-count-label');
    if (countEl) {
      countEl.textContent = `SHOWING ${items.length} WHOLESALE ARTICLES`;
    }
  }

  // 04. Single Product Detail Page (product.html?id=men-01)
  if (document.body.id === 'pdp-page' || document.getElementById('pdp-main-content')) {
    renderSingleProductPage();
  }

  function renderSingleProductPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 'men-01';
    const product = typeof getProductById === 'function' ? getProductById(productId) : null;
    if (!product) return;

    // Update Meta & Title
    document.title = `${product.name} (${product.productCode}) | TRIFLEX Wholesale Showroom`;

    // Populate Fields
    const codeEl = document.getElementById('pdp-code');
    const nameEl = document.getElementById('pdp-name');
    const categoryEl = document.getElementById('pdp-category');
    const storyEl = document.getElementById('pdp-story');
    const fabricEl = document.getElementById('pdp-fabric');
    const gsmEl = document.getElementById('pdp-gsm');
    const fitEl = document.getElementById('pdp-fit');
    const moqEl = document.getElementById('pdp-moq');
    const packEl = document.getElementById('pdp-pack');
    const customEl = document.getElementById('pdp-custom');
    const printEl = document.getElementById('pdp-print');
    const mainImgEl = document.getElementById('pdp-main-image');
    const thumbsContainer = document.getElementById('pdp-thumbs-container');
    const coloursContainer = document.getElementById('pdp-colours-list');

    const breadcrumbCategory = document.getElementById('pdp-breadcrumb-category');
    const badgeEl = document.getElementById('pdp-badge-tag');

    if (breadcrumbCategory) breadcrumbCategory.textContent = product.category.toUpperCase() + ' / ' + product.productCode;
    if (badgeEl && product.badge) badgeEl.textContent = product.badge;

    if (codeEl) codeEl.textContent = `${product.productCode} / ${product.wholesaleCode}`;
    if (nameEl) nameEl.textContent = product.name;
    if (categoryEl) categoryEl.textContent = product.category.toUpperCase();
    if (storyEl) storyEl.textContent = product.shortStory || '';
    if (fabricEl) fabricEl.textContent = product.fabric;
    if (gsmEl) gsmEl.textContent = product.gsm;
    if (fitEl) fitEl.textContent = product.fit;
    if (moqEl) moqEl.textContent = product.moq;
    if (packEl) packEl.textContent = product.packSize;
    if (customEl) customEl.textContent = product.customization;
    if (printEl) printEl.textContent = product.printing;

    const mainImg = (product.images && product.images[0]) ? product.images[0] : 'images/cat-tshirt.png';
    if (mainImgEl) mainImgEl.src = mainImg;

    if (thumbsContainer && product.images) {
      thumbsContainer.innerHTML = product.images.map((img, idx) => `
        <img src="${img}" alt="Thumb" class="pdp-thumb-img ${idx === 0 ? 'active' : ''}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 4px; cursor: pointer; border: 1px solid var(--border-color); margin-bottom: 8px;" onclick="document.getElementById('pdp-main-image').src='${img}'; document.querySelectorAll('.pdp-thumb-img').forEach(t=>t.style.borderColor='var(--border-color)'); this.style.borderColor='var(--accent-lime)';">
      `).join('');
    }

    if (coloursContainer && product.colours) {
      coloursContainer.innerHTML = product.colours.map(c => `
        <span style="padding: 6px 12px; background: #F3F4F6; border: 1px solid var(--border-color); border-radius: 4px; font-size: 0.8rem; color: var(--text-primary);">${c}</span>
      `).join('');
    }

    // Related Products
    const relatedGrid = document.getElementById('pdp-related-grid');
    if (relatedGrid) {
      const related = (typeof getProductsByCategory === 'function' ? getProductsByCategory(product.category) : []).filter(p => p.id !== product.id).slice(0, 4);
      relatedGrid.innerHTML = related.map(p => renderProductCardHTML(p)).join('');
    }
  }

  // 05. Mobile Navigation Drawer
  const mobileToggle = document.getElementById('drawer-open-btn') || document.querySelector('.mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileClose = document.getElementById('drawer-close-btn');

  if (mobileToggle && mobileDrawer && mobileOverlay) {
    const openMobileNav = () => {
      mobileDrawer.classList.add('active');
      mobileOverlay.classList.add('active');
      mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      const drawerBody = mobileDrawer.querySelector('.drawer-body');
      if (drawerBody) {
        drawerBody.scrollTop = 0;
      }
    };

    const closeMobileNav = () => {
      mobileDrawer.classList.remove('active');
      mobileOverlay.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mobileDrawer.classList.contains('active')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
    mobileOverlay.addEventListener('click', closeMobileNav);

    // Auto-close when clicking any link inside the mobile drawer
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });

    // Auto-close when launching RFQ modal or Quick Order from inside the drawer
    mobileDrawer.querySelectorAll('[data-open-rfq-modal], [data-open-quick-order]').forEach(btn => {
      btn.addEventListener('click', () => {
        closeMobileNav();
      });
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
        closeMobileNav();
      }
    });

    // Auto-close if screen is resized to desktop width (>= 992px)
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 992 && mobileDrawer.classList.contains('active')) {
        closeMobileNav();
      }
    });

    // Highlight active link based on current path if not already marked
    try {
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      const navLinks = mobileDrawer.querySelectorAll('.mobile-nav-link');
      let foundExact = false;
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
          link.classList.add('active');
          foundExact = true;
        }
      });
      if (!foundExact && (currentPath === 'men.html' || currentPath === 'women.html' || currentPath === 'kids.html')) {
        const colLink = mobileDrawer.querySelector('a[href="collection.html"]');
        if (colLink) colLink.classList.add('active');
      }
    } catch (err) {
      // safe fallback
    }
  }

  // 06. Interactive & Continuous Scrollable Announcement Bar (Marquee Ticker + Native Touch Swipe)
  initAnnouncementScrollTicker();
});

/**
 * Interactive & Continuous Scrollable Announcement Bar (Marquee Ticker + Native Touch Swipe)
 */
function initAnnouncementScrollTicker() {
  const scrollViews = document.querySelectorAll('.announcement-scroll-view');
  if (!scrollViews.length) return;

  scrollViews.forEach(scrollView => {
    const track = scrollView.querySelector('.announcement-track');
    const firstGroup = scrollView.querySelector('.announcement-group');
    if (!track || !firstGroup) return;

    // Remove fallback CSS marquee so JavaScript takes smooth subpixel scroll & touch control
    track.classList.remove('css-marquee');
    track.classList.add('js-controlled');

    let isInteracting = false;
    let resumeTimer = null;
    let currentScroll = scrollView.scrollLeft || 0;
    const speed = 0.65; // ~39px per second at 60fps — readable & smooth

    function getGroupWidth() {
      return firstGroup.offsetWidth || 0;
    }

    function step() {
      if (!isInteracting && !document.hidden) {
        const groupWidth = getGroupWidth();
        if (groupWidth > 0) {
          currentScroll += speed;
          if (currentScroll >= groupWidth) {
            currentScroll -= groupWidth;
          }
          scrollView.scrollLeft = currentScroll;
        }
      } else if (isInteracting) {
        currentScroll = scrollView.scrollLeft;
      }
      requestAnimationFrame(step);
    }

    // Start auto-scrolling loop
    requestAnimationFrame(step);

    // Pause on Mouse Hover (Desktop)
    scrollView.addEventListener('mouseenter', () => {
      isInteracting = true;
      if (resumeTimer) clearTimeout(resumeTimer);
    });

    scrollView.addEventListener('mouseleave', () => {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        isInteracting = false;
      }, 600);
    });

    // Native Touch / Swipe Handling (Mobile)
    scrollView.addEventListener('touchstart', () => {
      isInteracting = true;
      if (resumeTimer) clearTimeout(resumeTimer);
    }, { passive: true });

    scrollView.addEventListener('scroll', () => {
      if (isInteracting) {
        currentScroll = scrollView.scrollLeft;
        const groupWidth = getGroupWidth();
        if (groupWidth > 0) {
          if (scrollView.scrollLeft >= 2 * groupWidth) {
            scrollView.scrollLeft -= groupWidth;
            currentScroll = scrollView.scrollLeft;
          } else if (scrollView.scrollLeft <= 0) {
            scrollView.scrollLeft += groupWidth;
            currentScroll = scrollView.scrollLeft;
          }
        }
      }
    }, { passive: true });

    scrollView.addEventListener('touchend', () => {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        const groupWidth = getGroupWidth();
        if (groupWidth > 0) {
          currentScroll = scrollView.scrollLeft % groupWidth;
          scrollView.scrollLeft = currentScroll;
        }
        isInteracting = false;
      }, 1200);
    }, { passive: true });

    scrollView.addEventListener('touchcancel', () => {
      isInteracting = false;
    }, { passive: true });

    // Desktop Mouse Drag to Scroll
    let isMouseDown = false;
    let startX = 0;
    let startScrollLeft = 0;

    scrollView.addEventListener('mousedown', (e) => {
      isMouseDown = true;
      isInteracting = true;
      startX = e.pageX - scrollView.offsetLeft;
      startScrollLeft = scrollView.scrollLeft;
      if (resumeTimer) clearTimeout(resumeTimer);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;
      e.preventDefault();
      const x = e.pageX - scrollView.offsetLeft;
      const walk = (x - startX) * 1.2;
      scrollView.scrollLeft = startScrollLeft - walk;
      currentScroll = scrollView.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      if (!isMouseDown) return;
      isMouseDown = false;
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        const groupWidth = getGroupWidth();
        if (groupWidth > 0) {
          currentScroll = scrollView.scrollLeft % groupWidth;
          scrollView.scrollLeft = currentScroll;
        }
        isInteracting = false;
      }, 800);
    });

    // Pause on Keyboard Focus for Accessibility
    scrollView.addEventListener('focusin', () => {
      isInteracting = true;
    });
    scrollView.addEventListener('focusout', () => {
      isInteracting = false;
    });
  });
}

/**
 * Direct WhatsApp Enquiry Controller
 * Sends structured WhatsApp message with product name, style code, product link, and wholesale inquiry text.
 */
window.sendWhatsAppEnquiry = function(productId, customMsg = '') {
  const p = (typeof TRIFLEX_PRODUCTS !== 'undefined' ? TRIFLEX_PRODUCTS.find(item => item.id === productId) : null)
         || (window.currentProduct && window.currentProduct.id === productId ? window.currentProduct : null);

  const waNumber = '919876543210';

  let productUrl = '';
  try {
    const loc = window.location;
    const origin = loc.origin || (loc.protocol + '//' + loc.host);
    const basePath = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    if (origin && origin !== 'null') {
      productUrl = `${origin}${basePath}product.html?id=${encodeURIComponent(productId)}`;
    } else {
      productUrl = `product.html?id=${encodeURIComponent(productId)}`;
    }
  } catch (err) {
    productUrl = `product.html?id=${encodeURIComponent(productId)}`;
  }

  let text = '';
  if (p) {
    const styleCode = p.productCode || p.wholesaleCode || p.id.toUpperCase();
    const gsm = p.gsm || '';
    const fabric = p.fabric || p.fabricBlend || '';
    const moq = p.moq || '48 Pcs';

    const lines = [
      `👋 *WHOLESALE PRODUCT ENQUIRY — TRIFLEX*`,
      ``,
      `📦 *Product Name:* ${p.name}`,
      `🏷️ *Style Code:* ${styleCode}`,
      gsm ? `⚖️ *Fabric / GSM:* ${gsm}${fabric ? ' (' + fabric + ')' : ''}` : '',
      `📊 *Minimum Order (MOQ):* ${moq}`,
      ``,
      `🔗 *Product Link:*`,
      `${productUrl}`,
      ``,
      `💬 *Inquiry Details:*`,
      customMsg || `Hello TRIFLEX Trade Sales Desk, I would like to enquire about wholesale pricing tiers, available sizes/colorways, fabric samples, and production lead times for this style.`
    ].filter(Boolean);

    text = lines.join('\n');
  } else {
    text = `Hello TRIFLEX Trade Sales Desk, I would like to enquire about wholesale sportswear article (${productId}). Product link: ${productUrl}`;
  }

  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank');
};

// Global delegated event listener for all WhatsApp Enquiry triggers
document.addEventListener('click', (e) => {
  const waBtn = e.target.closest('[data-wa-enquire]');
  if (waBtn) {
    e.preventDefault();
    e.stopPropagation();
    const id = waBtn.getAttribute('data-wa-enquire');
    window.sendWhatsAppEnquiry(id);
  }
});

/**
 * Universal HTML Generator for Product B2B Cards (Compact Showroom Density)
 */
function renderProductCardHTML(p) {
  const mainImg = (p.images && p.images[0]) ? p.images[0] : 'images/cat-tshirt.png';
  return `
    <div class="product-b2b-card" data-product-id="${p.id}">
      <div class="product-img-wrapper">
        <img src="${mainImg}" alt="${p.name}" class="product-card-img" loading="lazy">
        ${p.badge ? `<span class="product-badge-tag">${p.badge}</span>` : ''}
        
        <!-- Direct WhatsApp Enquire Button on Product Image -->
        <button type="button" class="product-img-wa-btn" data-wa-enquire="${p.id}" title="Enquire about ${p.name} on WhatsApp" aria-label="Enquire about ${p.name} on WhatsApp">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          <span>ENQUIRE</span>
        </button>

        <button type="button" class="product-quick-view-btn" data-open-quick-view="${p.id}" title="Quick Spec Preview">
          QUICK VIEW
        </button>
      </div>

      <div class="product-card-body">
        <div>
          <div class="product-meta-top">
            <span class="product-code-pill">${p.productCode || p.wholesaleCode}</span>
            <span class="product-gsm-pill">${p.gsm}</span>
          </div>
          <h3 class="product-card-title">
            <a href="product.html?id=${p.id}">${p.name}</a>
          </h3>
        </div>

        <div>
          <div class="moq-info-badge">
            <span>MIN ORDER</span>
            <span class="moq-val">${p.moq}</span>
          </div>

          <div style="display: flex; gap: 8px; margin-top: 10px;">
            <button type="button" class="btn-wa-card" data-wa-enquire="${p.id}" style="flex: 1;" title="Enquire about ${p.name} on WhatsApp">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span>ENQUIRE</span>
            </button>
            <button type="button" class="btn-primary product-card-action" data-add-to-enquiry="${p.id}" data-qty="50" style="padding: 9px 14px;" title="Add to enquiry bag">
              <span>+ BAG</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

