const fs = require('fs');
const { getHeaderHTML, getModalsAndDrawersHTML, getFooterHTML } = require('./html_templates.js');

// =========================================================================
// 01. WHOLESALE PAGE (wholesale.html)
// =========================================================================
const wholesaleHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wholesale Sportswear Supply Partner | TRIFLEX B2B Showroom</title>
  <meta name="description" content="TRIFLEX is your sportswear supply partner. Low MOQ, high retail margin structures, 24-48h dispatch, and barcoded retail packaging.">
  <link rel="icon" type="image/svg+xml" href="images/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png">
  <link rel="icon" type="image/png" href="images/favicon.png">
  <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
  <link rel="stylesheet" href="css/style.css">
</head>
<body id="wholesale-page">
  ${getHeaderHTML('solutions')}
  <main>
    <section style="padding: 80px 0 40px; background: var(--bg-surface); border-bottom: 1px solid var(--border-color);">
      <div class="container">
        <span class="mono-tag" style="color: var(--accent-lime);">B2B WHOLESALE PROGRAM</span>
        <h1 class="display-hero" style="margin: 10px 0 20px;">
          YOUR SPORTSWEAR<br>
          <span class="highlight-lime">SUPPLY PARTNER.</span>
        </h1>
        <p class="text-muted-p" style="max-width: 650px; margin-bottom: 30px;">
          Engineered exclusively for sports retail stores, regional distributors, and bulk institutional buyers. 140–260 GSM technical textiles with high retail margin structures and ready-to-dispatch warehouse inventory.
        </p>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <button type="button" class="btn-primary" data-open-rfq-modal>REQUEST WHOLESALE QUOTE &rarr;</button>
          <a href="collection.html" class="btn-secondary">BROWSE WHOLESALE SHOWROOM</a>
        </div>
      </div>
    </section>

    <!-- Wholesale Value Pillars -->
    <section style="padding: 70px 0; background: var(--bg-primary); border-bottom: 1px solid var(--border-color);">
      <div class="container">
        <div class="capability-grid">
          <div class="capability-item-card">
            <span class="path-number">01</span>
            <h3 class="capability-title">Low MOQ Thresholds</h3>
            <p class="capability-desc">Start from just 40–50 pieces per article with pre-assorted standardized size ratios (S to 3XL).</p>
          </div>
          <div class="capability-item-card">
            <span class="path-number">02</span>
            <h3 class="capability-title">High Margin Spread</h3>
            <p class="capability-desc">Direct-from-factory pricing architecture enabling 45%–60% gross retail margin at store level.</p>
          </div>
          <div class="capability-item-card">
            <span class="path-number">03</span>
            <h3 class="capability-title">24–48h Dispatch</h3>
            <p class="capability-desc">Core bestsellers maintained in-stock for rapid turnaround and seamless store replenishment.</p>
          </div>
          <div class="capability-item-card">
            <span class="path-number">04</span>
            <h3 class="capability-title">Barcoded Poly Packaging</h3>
            <p class="capability-desc">Every garment arrives individually packed with EAN/UPC barcodes ready for immediate retail display.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Wholesale Pricing & Tier Inquiry -->
    <section style="padding: 80px 0; background: var(--bg-surface); border-bottom: 1px solid var(--border-color);">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 40px; align-items: center;">
          <div>
            <span class="mono-tag" style="color: var(--accent-lime);">VOLUME TIERING</span>
            <h2 class="heading-xl" style="margin: 10px 0 20px;">SCALED VOLUME PRICING</h2>
            <p class="text-muted-p" style="margin-bottom: 24px;">
              Wholesale pricing is structured strictly on volume tiers. We protect our authorized retail partners by not publishing wholesale rates publicly.
            </p>
            <div style="background: var(--bg-surface-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 20px; font-family: var(--font-mono); font-size: 0.82rem; line-height: 2;">
              <div>&bull; <strong>Tier 1 (Starter Store Lot):</strong> 50–150 Pcs &bull; Standard Wholesale FOB</div>
              <div>&bull; <strong>Tier 2 (Multi-Store / Regional):</strong> 150–500 Pcs &bull; Volume Discount + Priority Dispatch</div>
              <div>&bull; <strong>Tier 3 (Master Distributor):</strong> 500+ Pcs &bull; Maximum Margin + Free Regional Delivery</div>
            </div>
          </div>
          <div style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 32px;">
            <h3 style="font-family: var(--font-heading); font-size: 1.3rem; text-transform: uppercase; margin-bottom: 12px;">REQUEST PRICE SHEET</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 20px;">Submit your business details to receive the official wholesale price breakdown and lookbook.</p>
            <button type="button" class="btn-primary" style="width: 100%; text-align: center;" data-open-rfq-modal>OPEN WHOLESALE QUOTE FORM &rarr;</button>
          </div>
        </div>
      </div>
    </section>
  </main>
  ${getFooterHTML()}
  ${getModalsAndDrawersHTML('solutions')}
  <script src="js/products.js"></script>
  <script src="js/script.js"></script>
</body>
</html>`;

fs.writeFileSync('wholesale.html', wholesaleHTML, 'utf8');
console.log('wholesale.html generated');
