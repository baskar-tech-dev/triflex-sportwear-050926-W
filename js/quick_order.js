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
