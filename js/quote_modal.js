/**
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
