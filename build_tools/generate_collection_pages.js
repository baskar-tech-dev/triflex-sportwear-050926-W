const fs = require('fs');
const { getHeaderHTML, getModalsAndDrawersHTML, getFooterHTML } = require('./html_templates.js');

function buildCollectionPage(category, title, subtitle, filename, activeNav) {
  const isMaster = category === 'all';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | TRIFLEX Wholesale Showroom</title>
  <meta name="description" content="${subtitle}">
  
  <link rel="icon" type="image/svg+xml" href="images/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png">
  <link rel="icon" type="image/png" href="images/favicon.png">
  <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
  <link rel="stylesheet" href="css/style.css">
</head>
<body id="collection-page" data-category="${category}">

  ${getHeaderHTML(activeNav)}

  <main>
    <!-- PAGE HERO -->
    <section style="padding: 60px 0 30px; background: var(--bg-surface); border-bottom: 1px solid var(--border-color);">
      <div class="container">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 20px;">
          <div>
            <span class="mono-tag" style="color: var(--accent-lime);">DIGITAL WHOLESALE SHOWROOM / 2026</span>
            <h1 class="heading-xl" style="margin: 6px 0 10px;">${title}</h1>
            <p class="text-muted-p" style="max-width: 680px;">${subtitle}</p>
          </div>
          <div style="display: flex; gap: 12px; align-items: center;">
            <button type="button" class="btn-secondary btn-sm" data-open-quick-order>
              ⚡ QUICK ORDER MATRIX
            </button>
            <button type="button" class="btn-primary btn-sm" data-open-rfq-modal>
              REQUEST FULL CATALOG RFQ &rarr;
            </button>
          </div>
        </div>

        <!-- CATEGORY TABS -->
        <div style="display: flex; gap: 10px; margin-top: 30px; border-top: 1px solid var(--border-color); padding-top: 20px; overflow-x: auto;">
          <a href="collection.html" class="btn-secondary btn-sm ${category === 'all' ? 'active' : ''}" style="${category === 'all' ? 'border-color: var(--accent-lime); color: #FFF; background: rgba(200,240,0,0.08);' : ''}">ALL COLLECTIONS</a>
          <a href="men.html" class="btn-secondary btn-sm ${category === 'men' ? 'active' : ''}" style="${category === 'men' ? 'border-color: var(--accent-lime); color: #FFF; background: rgba(200,240,0,0.08);' : ''}">MEN'S PERFORMANCE</a>
          <a href="women.html" class="btn-secondary btn-sm ${category === 'women' ? 'active' : ''}" style="${category === 'women' ? 'border-color: var(--accent-lime); color: #FFF; background: rgba(200,240,0,0.08);' : ''}">WOMEN'S SCULPT</a>
          <a href="kids.html" class="btn-secondary btn-sm ${category === 'kids' ? 'active' : ''}" style="${category === 'kids' ? 'border-color: var(--accent-lime); color: #FFF; background: rgba(200,240,0,0.08);' : ''}">JUNIOR ACADEMY</a>
          <a href="teamwear.html" class="btn-secondary btn-sm ${category === 'teamwear' ? 'active' : ''}" style="${category === 'teamwear' ? 'border-color: var(--accent-lime); color: #FFF; background: rgba(200,240,0,0.08);' : ''}">CUSTOM TEAMWEAR</a>
        </div>
      </div>
    </section>

    <!-- FILTER & SHOWROOM GRID -->
    <section style="padding: 40px 0 100px; background: var(--bg-primary);">
      <div class="container">
        <!-- Live Filter Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); padding: 14px 20px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin-bottom: 30px; flex-wrap: wrap; gap: 14px;">
          <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
            <span id="item-count-label" style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; color: var(--accent-lime);">
              SHOWING WHOLESALE ARTICLES
            </span>

            <div style="display: flex; align-items: center; gap: 8px;">
              <label for="filter-gsm" style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-secondary);">FABRIC WEIGHT:</label>
              <select id="filter-gsm" style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 6px 10px; font-size: 0.78rem; color: #FFF;">
                <option value="all">All GSM Weights</option>
                <option value="110">110 GSM (Ultra-Lite)</option>
                <option value="140">140 GSM (Featherweight)</option>
                <option value="180">180 GSM (Core Active)</option>
                <option value="210">210 GSM (Pique / Mid)</option>
                <option value="240">240 GSM (Dual Knit)</option>
                <option value="260">260 GSM (High Sculpt)</option>
              </select>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 12px;">
            <input type="text" id="filter-search" placeholder="Filter articles..." style="padding: 6px 12px; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.8rem; color: #FFF;">
          </div>
        </div>

        <!-- Master Products Grid -->
        <div class="products-showcase-grid" id="collection-products-grid">
          <!-- Populated dynamically via js/page_renderers.js -->
        </div>
      </div>
    </section>
  </main>

  ${getFooterHTML()}
  ${getModalsAndDrawersHTML()}

  <script src="js/products.js"></script>
  <script src="js/script.js"></script>
</body>
</html>`;
}

// 01. Collection Master
fs.writeFileSync('collection.html', buildCollectionPage('all', 'COMPLETE WHOLESALE COLLECTION', 'Engineered sportswear articles for multi-brand retail chains, distributors, and team programs.', 'collection.html', 'collection'), 'utf8');

// 02. Men's Showroom
fs.writeFileSync('men.html', buildCollectionPage('men', "MEN'S PERFORMANCE WHOLESALE LINE", '140–240 GSM technical textiles engineered for training, running, and high retail sell-through.', 'men.html', 'collection'), 'utf8');

// 03. Women's Showroom
fs.writeFileSync('women.html', buildCollectionPage('women', "WOMEN'S SCULPT & ACTIVE LINE", 'Squat-proof high-compression leggings, sports bras, and studio apparel with bonded waistbands.', 'women.html', 'collection'), 'utf8');

// 04. Kids' Showroom
fs.writeFileSync('kids.html', buildCollectionPage('kids', "JUNIOR ACADEMY SPORTS LINE", 'Durable micro-poly training kits built to withstand school PE sessions, academy drills, and frequent laundry.', 'kids.html', 'collection'), 'utf8');

console.log('SUCCESS: Collection & Category Showroom pages generated!');
