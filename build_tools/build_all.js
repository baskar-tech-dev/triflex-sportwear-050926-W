const fs = require('fs');
const { getHeaderHTML, getModalsAndDrawersHTML, getFooterHTML } = require('./html_templates.js');

// 01. Bundle CSS
const tokens = fs.readFileSync('css/tokens.css', 'utf8');
const components = fs.readFileSync('css/components.css', 'utf8');
const sections = fs.readFileSync('css/sections.css', 'utf8');
const polish = fs.readFileSync('css/extra_polish.css', 'utf8');
const responsive = fs.readFileSync('css/responsive.css', 'utf8');
const combinedCSS = `${tokens}\n\n${components}\n\n${sections}\n\n${polish}\n\n${responsive}\n`;
fs.writeFileSync('css/style.css', combinedCSS, 'utf8');
console.log('01. css/style.css bundled (' + combinedCSS.length + ' bytes)');

// 02. Bundle JS
const cart = fs.readFileSync('js/cart_manager.js', 'utf8');
const search = fs.readFileSync('js/search_modal.js', 'utf8');
const quickOrder = fs.readFileSync('js/quick_order.js', 'utf8');
const quickView = fs.readFileSync('js/quick_view.js', 'utf8');
const quote = fs.readFileSync('js/quote_modal.js', 'utf8');
const renderers = fs.readFileSync('js/page_renderers.js', 'utf8');
const combinedJS = `/**\n * TRIFLEX SPORTSWEAR — MASTER CLIENT CONTROLLER\n */\n\n${cart}\n\n${search}\n\n${quickOrder}\n\n${quickView}\n\n${quote}\n\n${renderers}\n`;
fs.writeFileSync('js/script.js', combinedJS, 'utf8');
console.log('02. js/script.js bundled (' + combinedJS.length + ' bytes)');

// 03. Build index.html
const sec1 = fs.readFileSync('sections/sec01_hero.html', 'utf8');
const sec2 = fs.readFileSync('sections/sec02_discovery.html', 'utf8');
const sec3 = fs.readFileSync('sections/sec03_business.html', 'utf8');
const sec4_5 = fs.readFileSync('sections/sec04_05_showrooms.html', 'utf8');
const sec6_8 = fs.readFileSync('sections/sec06_08_capability_mfg.html', 'utf8');
const sec9_14 = fs.readFileSync('sections/sec09_14_closing.html', 'utf8');

const indexHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TRIFLEX | Premium Sportswear Wholesaler &amp; Manufacturer</title>
  <meta name="description" content="TRIFLEX is a serious sportswear sourcing, wholesale and manufacturing partner for retailers, brands, distributors and teams. Sportswear built for business.">
  <link rel="icon" type="image/svg+xml" href="images/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png">
  <link rel="icon" type="image/png" href="images/favicon.png">
  <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
  <link rel="stylesheet" href="css/style.css">
</head>
<body id="home-page">
  ${getHeaderHTML('home')}
  <main>
    ${sec1}
    ${sec2}
    ${sec3}
    ${sec4_5}
    ${sec6_8}
    ${sec9_14}
  </main>
  ${getFooterHTML()}
  ${getModalsAndDrawersHTML()}
  <script src="js/products.js"></script>
  <script src="js/script.js"></script>
</body>
</html>`;
fs.writeFileSync('index.html', indexHTML, 'utf8');
console.log('03. index.html built (' + indexHTML.length + ' bytes)');

// 04. Build Showrooms (collection, men, women, kids)
function buildCol(category, title, subtitle, activeNav) {
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
        <div style="display: flex; gap: 10px; margin-top: 30px; border-top: 1px solid var(--border-color); padding-top: 20px; overflow-x: auto;">
          <a href="collection.html" class="btn-secondary btn-sm ${category === 'all' ? 'active' : ''}" style="${category === 'all' ? 'border-color: var(--accent-lime); color: #FFF; background: rgba(200,240,0,0.08);' : ''}">ALL COLLECTIONS</a>
          <a href="men.html" class="btn-secondary btn-sm ${category === 'men' ? 'active' : ''}" style="${category === 'men' ? 'border-color: var(--accent-lime); color: #FFF; background: rgba(200,240,0,0.08);' : ''}">MEN'S PERFORMANCE</a>
          <a href="women.html" class="btn-secondary btn-sm ${category === 'women' ? 'active' : ''}" style="${category === 'women' ? 'border-color: var(--accent-lime); color: #FFF; background: rgba(200,240,0,0.08);' : ''}">WOMEN'S SCULPT</a>
          <a href="kids.html" class="btn-secondary btn-sm ${category === 'kids' ? 'active' : ''}" style="${category === 'kids' ? 'border-color: var(--accent-lime); color: #FFF; background: rgba(200,240,0,0.08);' : ''}">JUNIOR ACADEMY</a>
          <a href="teamwear.html" class="btn-secondary btn-sm ${category === 'teamwear' ? 'active' : ''}" style="${category === 'teamwear' ? 'border-color: var(--accent-lime); color: #FFF; background: rgba(200,240,0,0.08);' : ''}">CUSTOM TEAMWEAR</a>
        </div>
      </div>
    </section>
    <section style="padding: 40px 0 100px; background: var(--bg-primary);">
      <div class="container">
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
        <div class="products-showcase-grid" id="collection-products-grid"></div>
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

fs.writeFileSync('collection.html', buildCol('all', 'COMPLETE WHOLESALE COLLECTION', 'Engineered sportswear articles for multi-brand retail chains, distributors, and team programs.', 'collection'), 'utf8');
fs.writeFileSync('men.html', buildCol('men', "MEN'S PERFORMANCE WHOLESALE LINE", '140–240 GSM technical textiles engineered for training, running, and high retail sell-through.', 'collection'), 'utf8');
fs.writeFileSync('women.html', buildCol('women', "WOMEN'S SCULPT & ACTIVE LINE", 'Squat-proof high-compression leggings, sports bras, and studio apparel with bonded waistbands.', 'collection'), 'utf8');
fs.writeFileSync('kids.html', buildCol('kids', "JUNIOR ACADEMY SPORTS LINE", 'Durable micro-poly training kits built to withstand school PE sessions, academy drills, and frequent laundry.', 'collection'), 'utf8');
console.log('04. collection, men, women, kids built');

console.log('ALL BUILDS COMPLETED SUCCESSFULLY!');
