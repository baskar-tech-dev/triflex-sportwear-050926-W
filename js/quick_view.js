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
