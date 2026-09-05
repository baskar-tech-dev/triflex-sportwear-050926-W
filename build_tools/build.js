const fs = require('fs');
const { getHeaderHTML, getModalsAndDrawersHTML, getFooterHTML } = require('./html_templates.js');

// 01. BUNDLE CSS
const tokens = fs.readFileSync('css/tokens.css', 'utf8');
const components = fs.readFileSync('css/components.css', 'utf8');
const sections = fs.readFileSync('css/sections.css', 'utf8');
const polish = fs.readFileSync('css/extra_polish.css', 'utf8');
const responsive = fs.readFileSync('css/responsive.css', 'utf8');
const masterCSS = `${tokens}\n\n${components}\n\n${sections}\n\n${polish}\n\n${responsive}\n`;
fs.writeFileSync('css/style.css', masterCSS, 'utf8');
console.log('✓ css/style.css bundled (' + masterCSS.length + ' bytes)');

// 02. BUNDLE JS
const cart = fs.readFileSync('js/cart_manager.js', 'utf8');
const search = fs.readFileSync('js/search_modal.js', 'utf8');
const quickOrder = fs.readFileSync('js/quick_order.js', 'utf8');
const quickView = fs.readFileSync('js/quick_view.js', 'utf8');
const quote = fs.readFileSync('js/quote_modal.js', 'utf8');
const renderers = fs.readFileSync('js/page_renderers.js', 'utf8');
const masterJS = `/**\n * TRIFLEX MASTER SCRIPT\n */\n\n${cart}\n\n${search}\n\n${quickOrder}\n\n${quickView}\n\n${quote}\n\n${renderers}\n`;
fs.writeFileSync('js/script.js', masterJS, 'utf8');
console.log('✓ js/script.js bundled (' + masterJS.length + ' bytes)');

// 03. INDEX.HTML
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
console.log('✓ index.html built');

// 04. SHOWROOM PAGES (collection, men, women, kids)
function makeCol(category, title, subtitle, activeNav) {
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

fs.writeFileSync('collection.html', makeCol('all', 'COMPLETE WHOLESALE COLLECTION', 'Engineered sportswear articles for multi-brand retail chains, distributors, and team programs.', 'collection'), 'utf8');
fs.writeFileSync('men.html', makeCol('men', "MEN'S PERFORMANCE WHOLESALE LINE", '140–240 GSM technical textiles engineered for training, running, and high retail sell-through.', 'collection'), 'utf8');
fs.writeFileSync('women.html', makeCol('women', "WOMEN'S SCULPT & ACTIVE LINE", 'Squat-proof high-compression leggings, sports bras, and studio apparel with bonded waistbands.', 'collection'), 'utf8');
fs.writeFileSync('kids.html', makeCol('kids', "JUNIOR ACADEMY SPORTS LINE", 'Durable micro-poly training kits built to withstand school PE sessions, academy drills, and frequent laundry.', 'collection'), 'utf8');
console.log('✓ collection showroom pages built');

// 05. SOLUTION & PRODUCT PAGES
function makeSolPage(id, title, desc, eyebrow, heroH1, heroSub, activeNav, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | TRIFLEX B2B</title>
  <meta name="description" content="${desc}">
  <link rel="icon" type="image/svg+xml" href="images/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png">
  <link rel="icon" type="image/png" href="images/favicon.png">
  <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
  <link rel="stylesheet" href="css/style.css">
</head>
<body id="${id}-page" ${id === 'teamwear' ? 'data-category="teamwear"' : ''}>
  ${getHeaderHTML(activeNav)}
  <main>
    <section style="padding: 80px 0 40px; background: var(--bg-surface); border-bottom: 1px solid var(--border-color);">
      <div class="container">
        <span class="mono-tag" style="color: var(--accent-lime);">${eyebrow}</span>
        <h1 class="display-hero" style="margin: 10px 0 20px;">${heroH1}</h1>
        <p class="text-muted-p" style="max-width: 680px; margin-bottom: 30px;">${heroSub}</p>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <button type="button" class="btn-primary" data-open-rfq-modal>REQUEST QUOTE &rarr;</button>
          <a href="collection.html" class="btn-secondary">BROWSE SHOWROOM</a>
        </div>
      </div>
    </section>
    ${content}
  </main>
  ${getFooterHTML()}
  ${getModalsAndDrawersHTML()}
  <script src="js/products.js"></script>
  <script src="js/script.js"></script>
</body>
</html>`;
}

// wholesale.html
const wsContent = `
<section style="padding: 70px 0; background: var(--bg-primary); border-bottom: 1px solid var(--border-color);">
  <div class="container">
    <div class="capability-grid">
      <div class="capability-item-card"><span class="path-number">01</span><h3 class="capability-title">Low MOQ Thresholds</h3><p class="capability-desc">Start from just 40–50 pieces per article with pre-assorted standardized size ratios (S to 3XL).</p></div>
      <div class="capability-item-card"><span class="path-number">02</span><h3 class="capability-title">High Margin Spread</h3><p class="capability-desc">Direct-from-factory pricing architecture enabling 45%–60% gross retail margin at store level.</p></div>
      <div class="capability-item-card"><span class="path-number">03</span><h3 class="capability-title">24–48h Dispatch</h3><p class="capability-desc">Core bestsellers maintained in-stock for rapid turnaround and seamless store replenishment.</p></div>
      <div class="capability-item-card"><span class="path-number">04</span><h3 class="capability-title">Barcoded Poly Packaging</h3><p class="capability-desc">Every garment arrives individually packed with EAN/UPC barcodes ready for immediate retail display.</p></div>
    </div>
  </div>
</section>
`;
fs.writeFileSync('wholesale.html', makeSolPage('wholesale', 'Wholesale Sportswear Supply Partner', 'Direct manufacturer wholesale supply for retailers and distributors.', 'B2B WHOLESALE PROGRAM', 'YOUR SPORTSWEAR<br><span class="highlight-lime">SUPPLY PARTNER.</span>', 'Engineered exclusively for sports retail stores, regional distributors, and bulk institutional buyers. 140–260 GSM technical textiles with high margin spread.', 'solutions', wsContent), 'utf8');

// private-label.html
const plContent = `
<section style="padding: 80px 0; background: var(--bg-primary);">
  <div class="container">
    <div style="margin-bottom: 40px;"><span class="mono-tag" style="color: var(--accent-lime);">END-TO-END OEM WORKFLOW</span><h2 class="heading-xl">THE 9-STAGE MANUFACTURING JOURNEY</h2></div>
    <div class="process-steps-grid" style="grid-template-columns: repeat(3, 1fr);">
      <div class="step-card"><span class="step-num">01</span><h3 class="step-name">Why Private Label</h3><p class="step-desc">Establish higher brand equity and full pricing autonomy by launching your custom branded athletic line.</p></div>
      <div class="step-card"><span class="step-num">02</span><h3 class="step-name">Fabric Selection</h3><p class="step-desc">Select from 140 to 260 GSM technical knits, micro-ribstop nylon, and recycled poly-spandex blends.</p></div>
      <div class="step-card"><span class="step-num">03</span><h3 class="step-name">Design &amp; Tech-Packs</h3><p class="step-desc">Our patterning team translates your sketches, reference samples, and colorways into industrial production specs.</p></div>
      <div class="step-card"><span class="step-num">04</span><h3 class="step-name">Sampling &amp; Prototypes</h3><p class="step-desc">We produce pre-production physical samples for hands-on fit testing, drape evaluation, and wash tests.</p></div>
      <div class="step-card"><span class="step-num">05</span><h3 class="step-name">Custom Branding</h3><p class="step-desc">Custom woven neck labels, soft-touch heat-seal tags, engraved drawcord aglets, and custom rubber side tabs.</p></div>
      <div class="step-card"><span class="step-num">06</span><h3 class="step-name">Bulk Manufacturing</h3><p class="step-desc">High-precision CNC laser cutting and automated flatlock stitching across our dedicated manufacturing lines.</p></div>
      <div class="step-card"><span class="step-num">07</span><h3 class="step-name">Quality Inspection</h3><p class="step-desc">AQL 2.5 four-point quality inspection checking seam strength, stretch recovery, and color uniformity.</p></div>
      <div class="step-card"><span class="step-num">08</span><h3 class="step-name">Bespoke Packaging</h3><p class="step-desc">Custom printed frosted zipper polybags, premium hangtags, and barcoded master carton labeling.</p></div>
      <div class="step-card"><span class="step-num">09</span><h3 class="step-name">Dispatch &amp; Delivery</h3><p class="step-desc">Consolidated freight forwarding to your central fulfillment center or multiple regional distribution warehouses.</p></div>
    </div>
  </div>
</section>
`;
fs.writeFileSync('private-label.html', makeSolPage('private-label', 'Private Label Sportswear Manufacturer (OEM)', 'Custom private label sportswear manufacturing for athletic brands.', 'OEM BRAND MANUFACTURING', 'YOUR BRAND.<br><span class="highlight-lime">OUR FACTORY.</span>', 'We engineer, brand, and manufacture proprietary sportswear collections for athletic brands, fitness creators, and gym chains.', 'solutions', plContent), 'utf8');

// teamwear.html
const twContent = `
<section style="padding: 70px 0; background: var(--bg-primary); border-bottom: 1px solid var(--border-color);">
  <div class="container">
    <div style="margin-bottom: 30px;"><span class="mono-tag" style="color: var(--accent-lime);">SPORT DISCIPLINES</span><h2 class="heading-xl">ALL-SPORT TEAMWEAR CATALOG</h2></div>
    <div class="teamwear-sports-grid">
      <div class="sport-discipline-card"><span class="sport-meta">01 / PRO MATCH</span><h3 class="sport-name">FOOTBALL</h3><p style="font-size: 0.82rem; color: var(--text-secondary);">Full sublimated kits, aero-mesh side panels, keeper jerseys &amp; shorts.</p><button type="button" class="btn-ghost" data-add-to-enquiry="team-01">+ ADD FOOTBALL KIT</button></div>
      <div class="sport-discipline-card"><span class="sport-meta">02 / MATCH &amp; T20</span><h3 class="sport-name">CRICKET</h3><p style="font-size: 0.82rem; color: var(--text-secondary);">UPF 50+ test match whites, polo collars, and reinforced sliding trousers.</p><button type="button" class="btn-ghost" data-add-to-enquiry="team-02">+ ADD CRICKET KIT</button></div>
      <div class="sport-discipline-card"><span class="sport-meta">03 / COURTSIDE</span><h3 class="sport-name">BASKETBALL</h3><p style="font-size: 0.82rem; color: var(--text-secondary);">Double-layer pro mesh singlets, wide-shoulder cut, and 9" motion shorts.</p><button type="button" class="btn-ghost" data-add-to-enquiry="team-03">+ ADD HOOPS KIT</button></div>
      <div class="sport-discipline-card"><span class="sport-meta">04 / RACE DAY</span><h3 class="sport-name">RUNNING</h3><p style="font-size: 0.82rem; color: var(--text-secondary);">Sub-90g featherlight race singlets, bonded hems, and split motion shorts.</p><button type="button" class="btn-ghost" data-add-to-enquiry="team-04">+ ADD RUNNING KIT</button></div>
      <div class="sport-discipline-card"><span class="sport-meta">05 / INDOOR</span><h3 class="sport-name">VOLLEYBALL</h3><p style="font-size: 0.82rem; color: var(--text-secondary);">4-way stretch competition jerseys &amp; shorts.</p><button type="button" class="btn-ghost" data-open-rfq-modal>CUSTOM QUOTE &rarr;</button></div>
      <div class="sport-discipline-card"><span class="sport-meta">06 / HIIT</span><h3 class="sport-name">GYM &amp; FITNESS</h3><p style="font-size: 0.82rem; color: var(--text-secondary);">Gym staff uniforms &amp; personal trainer tees.</p><button type="button" class="btn-ghost" data-open-rfq-modal>CUSTOM QUOTE &rarr;</button></div>
      <div class="sport-discipline-card"><span class="sport-meta">07 / ACADEMY</span><h3 class="sport-name">SCHOOL SPORTS</h3><p style="font-size: 0.82rem; color: var(--text-secondary);">Durable junior PE kits with custom house crests.</p><button type="button" class="btn-ghost" data-open-rfq-modal>CUSTOM QUOTE &rarr;</button></div>
      <div class="sport-discipline-card"><span class="sport-meta">08 / CORPORATE</span><h3 class="sport-name">CORPORATE LEAGUE</h3><p style="font-size: 0.82rem; color: var(--text-secondary);">Marathon tees, sports day kits &amp; technical polos.</p><button type="button" class="btn-ghost" data-open-rfq-modal>CUSTOM QUOTE &rarr;</button></div>
    </div>
  </div>
</section>
<section style="padding: 70px 0; background: var(--bg-surface);">
  <div class="container">
    <div class="section-header-editorial"><div><span class="mono-tag" style="color: var(--accent-lime);">CORE TEAMWEAR ARTICLES</span><h2 class="heading-xl">TEAMWEAR SHOWROOM</h2></div></div>
    <div class="products-showcase-grid" id="collection-products-grid"></div>
  </div>
</section>
`;
fs.writeFileSync('teamwear.html', makeSolPage('teamwear', 'Custom Teamwear & Sports Uniforms', 'Sublimated match kits for Football, Cricket, Basketball, Running and corporate leagues.', 'CUSTOM MATCHDAY UNIFORMS', 'BUILT FOR THE TEAM.<br><span class="highlight-lime">BUILT FOR THE GAME.</span>', 'Matchday kits engineered with micro-hex sublimation textiles and zero-fade Italian dyes. Custom numbers, names, and club crests with 7–10 day turnaround.', 'solutions', twContent), 'utf8');

// manufacturing.html
const mfgContent = `
<section style="padding: 80px 0; background: var(--bg-primary);">
  <div class="container">
    <div style="margin-bottom: 40px;"><span class="mono-tag" style="color: var(--accent-lime);">FACTORY PROCESS CHAIN</span><h2 class="heading-xl">FROM YARN TO DISPATCH</h2></div>
    <div class="process-steps-grid">
      <div class="step-card"><span class="step-num">01</span><h3 class="step-name">Knitting &amp; Milling</h3><p class="step-desc">High-speed circular knitting lines producing 140 to 260 GSM technical knits with micro-air channels.</p></div>
      <div class="step-card"><span class="step-num">02</span><h3 class="step-name">CNC Laser Cutting</h3><p class="step-desc">Computer-controlled laser cutting ensuring 0.5mm precision across complex ergonomic athlete patterns.</p></div>
      <div class="step-card"><span class="step-num">03</span><h3 class="step-name">Flatlock Stitching</h3><p class="step-desc">Yamato and Juki 6-thread flatlock assembly lines producing zero-friction, skin-flush seams.</p></div>
      <div class="step-card"><span class="step-num">04</span><h3 class="step-name">Dye Sublimation</h3><p class="step-desc">Italian zero-fade dye sublimation units providing vibrant full-bleed color transfer with zero handfeel drag.</p></div>
      <div class="step-card"><span class="step-num">05</span><h3 class="step-name">Inline Inspection</h3><p class="step-desc">Every piece undergoes 5-stage QC testing for seam elasticity, tensile pull strength, and stitch integrity.</p></div>
      <div class="step-card"><span class="step-num">06</span><h3 class="step-name">Barcoded Packaging</h3><p class="step-desc">Retail-ready individual polybagging with automated EAN/UPC barcoding and carton size-ratio sorting.</p></div>
      <div class="step-card"><span class="step-num">07</span><h3 class="step-name">Global Forwarding</h3><p class="step-desc">Daily dispatch via express air freight and full container sea logistics across major global ports.</p></div>
    </div>
  </div>
</section>
`;
fs.writeFileSync('manufacturing.html', makeSolPage('manufacturing', 'Manufacturing Scale & Capabilities', 'Direct factory infrastructure in Tirupur, India.', 'FACTORY CAPABILITY & CREDIBILITY', 'MADE WITH<br><span class="highlight-lime">PURPOSE.</span>', 'Direct manufacturing infrastructure delivering technical athletic apparel with unmatched precision. Operating modern circular knitting, CNC laser cutting, and AQL 2.5 QC.', 'manufacturing', mfgContent), 'utf8');

// about.html
const abContent = `
<section style="padding: 80px 0; background: var(--bg-primary);">
  <div class="container">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 36px;">
        <span class="mono-tag" style="color: var(--accent-lime);">01 / MANUFACTURING DIRECT</span>
        <h3 class="heading-md" style="margin: 10px 0 14px;">NO MIDDLEMEN MARKUPS</h3>
        <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">By operating directly from our manufacturing and knitting infrastructure in Tirupur, India, we eliminate intermediary trading costs. This ensures maximum margin capture for our retail and brand partners.</p>
      </div>
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 36px;">
        <span class="mono-tag" style="color: var(--accent-lime);">02 / TECHNICAL INTEGRITY</span>
        <h3 class="heading-md" style="margin: 10px 0 14px;">PERFORMANCE WITHOUT GIMMICKS</h3>
        <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">Every fabric blend—from our 140 GSM AeroVent mesh to our 260 GSM high-sculpt interlock—undergoes strict lab testing for moisture wicking, tensile recovery, and colorfastness.</p>
      </div>
    </div>
  </div>
</section>
`;
fs.writeFileSync('about.html', makeSolPage('about', 'About TRIFLEX', 'Sportswear built for business.', 'THE TRIFLEX MANIFESTO', 'SPORTSWEAR<br><span class="highlight-lime">BUILT FOR BUSINESS.</span>', 'TRIFLEX was created to bridge the gap between high-performance athletic apparel engineering and commercial wholesale supply.', 'about', abContent), 'utf8');

// cart.html
const cartContent = `
<section style="padding: 50px 0 100px; background: var(--bg-primary);">
  <div class="container">
    <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 40px; align-items: start;">
      <div>
        <div id="bag-page-items-list"></div>
        <div style="display: flex; gap: 14px; margin-top: 20px;">
          <a href="collection.html" class="btn-secondary btn-sm">+ ADD MORE ARTICLES</a>
          <button type="button" class="btn-secondary btn-sm" data-open-quick-order>⚡ QUICK ORDER MATRIX</button>
        </div>
      </div>
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 30px; position: sticky; top: 100px;">
        <span class="mono-tag" style="color: var(--accent-lime);">WHOLESALE QUOTE SUMMARY</span>
        <h3 style="font-family: var(--font-heading); font-size: 1.2rem; text-transform: uppercase; margin: 8px 0 20px;">READY FOR TRADE DESK</h3>
        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid var(--border-color);">
          <span>Total Volume:</span>
          <strong id="bag-page-total-qty" style="color: #FFF; font-family: var(--font-mono);">0 Pieces</strong>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 20px;">
          <span>Pricing Structure:</span>
          <span style="color: var(--accent-lime); font-family: var(--font-mono);">Direct Factory FOB</span>
        </div>
        <button type="button" id="bag-page-submit-btn" class="btn-primary" style="width: 100%; padding: 16px; margin-bottom: 12px;" data-open-rfq-modal>
          <span>SUBMIT FOR QUOTATION</span>
          <span>&rarr;</span>
        </button>
        <p style="font-size: 0.75rem; color: var(--text-muted); text-align: center;">No payment is processed online. Our trade desk will review volume breaks and respond within 2-4 business hours.</p>
      </div>
    </div>
  </div>
</section>
`;
fs.writeFileSync('cart.html', makeSolPage('cart', 'Review Wholesale Enquiry Bag', 'Review your wholesale enquiry bag and submit RFQ.', 'B2B WHOLESALE RFQ SPECIFICATION', 'ENQUIRY BAG<br><span class="highlight-lime">REVIEW.</span>', 'Review selected articles, adjust master carton quantities, or request fabric swatches before submitting your quote request.', 'cart', cartContent), 'utf8');

// contact.html
const ctContent = `
<section style="padding: 70px 0 100px; background: var(--bg-primary);">
  <div class="container">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px;">
      <div>
        <h3 class="heading-md" style="margin-bottom: 24px;">COMMERCIAL HUBS</h3>
        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 24px; margin-bottom: 20px;">
          <span class="mono-tag" style="color: var(--accent-lime);">MANUFACTURING HUB</span>
          <h4 style="font-family: var(--font-heading); font-size: 1.1rem; text-transform: uppercase; margin: 4px 0 8px;">Tirupur Facility</h4>
          <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">TRIFLEX Apparel Mills, SIDCO Industrial Estate, Tirupur, Tamil Nadu – 641603, India.</p>
        </div>
        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 24px; margin-bottom: 20px;">
          <span class="mono-tag" style="color: var(--accent-lime);">FAST-TRACK WHATSAPP TRADE DESK</span>
          <h4 style="font-family: var(--font-heading); font-size: 1.1rem; text-transform: uppercase; margin: 4px 0 8px;">Instant Quotation Support</h4>
          <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px;">Direct line for quick stock inquiries, urgent teamwear match kits, and catalog downloads.</p>
          <a href="https://wa.me/919876543210" target="_blank" class="btn-primary btn-sm">CHAT ON WHATSAPP &rarr;</a>
        </div>
      </div>
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 32px;">
        <h3 class="heading-md" style="margin-bottom: 16px;">SEND DIRECT ENQUIRY</h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 20px;">Launch our B2B quotation form to select product lines, volume tiering, and custom OEM branding requirements.</p>
        <button type="button" class="btn-primary" style="width: 100%; padding: 18px;" data-open-rfq-modal>
          <span>LAUNCH OFFICIAL RFQ FORM</span>
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  </div>
</section>
`;
fs.writeFileSync('contact.html', makeSolPage('contact', 'Contact Trade Sales Desk', 'Direct factory hubs and wholesale sales desk.', 'DIRECT FACTORY & SALES DESK', 'CONTACT OUR<br><span class="highlight-lime">TRADE DESK.</span>', 'Speak directly with our technical textile specialists, production coordinators, and wholesale account managers.', 'contact', ctContent), 'utf8');

console.log('✓ All pages built successfully!');
