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
