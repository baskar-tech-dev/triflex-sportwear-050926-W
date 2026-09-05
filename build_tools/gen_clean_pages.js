const fs = require('fs');
const { getHeaderHTML, getModalsAndDrawersHTML, getFooterHTML } = require('./html_templates.js');

function makePage(id, title, desc, eyebrow, heroH1, heroSub, activeNav, content) {
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

// 01. WHOLESALE
const wsContent = `
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
`;
fs.writeFileSync('wholesale.html', makePage('wholesale', 'Wholesale Sportswear Supply Partner', 'Direct manufacturer wholesale supply for retailers and distributors.', 'B2B WHOLESALE PROGRAM', 'YOUR SPORTSWEAR<br><span class="highlight-lime">SUPPLY PARTNER.</span>', 'Engineered exclusively for sports retail stores, regional distributors, and bulk institutional buyers. 140–260 GSM technical textiles with high margin spread.', 'solutions', wsContent), 'utf8');

// 02. PRIVATE LABEL
const plContent = `
<section style="padding: 80px 0; background: var(--bg-primary);">
  <div class="container">
    <div style="margin-bottom: 40px;">
      <span class="mono-tag" style="color: var(--accent-lime);">END-TO-END OEM WORKFLOW</span>
      <h2 class="heading-xl">THE 9-STAGE MANUFACTURING JOURNEY</h2>
    </div>
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
fs.writeFileSync('private-label.html', makePage('private-label', 'Private Label Sportswear Manufacturer (OEM)', 'Custom private label sportswear manufacturing for athletic brands.', 'OEM BRAND MANUFACTURING', 'YOUR BRAND.<br><span class="highlight-lime">OUR FACTORY.</span>', 'We engineer, brand, and manufacture proprietary sportswear collections for athletic brands, fitness creators, and gym chains.', 'solutions', plContent), 'utf8');

// 03. TEAMWEAR
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
fs.writeFileSync('teamwear.html', makePage('teamwear', 'Custom Teamwear & Sports Uniforms', 'Sublimated match kits for Football, Cricket, Basketball, Running and corporate leagues.', 'CUSTOM MATCHDAY UNIFORMS', 'BUILT FOR THE TEAM.<br><span class="highlight-lime">BUILT FOR THE GAME.</span>', 'Matchday kits engineered with micro-hex sublimation textiles and zero-fade Italian dyes. Custom numbers, names, and club crests with 7–10 day turnaround.', 'solutions', twContent), 'utf8');

// 04. MANUFACTURING
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
fs.writeFileSync('manufacturing.html', makePage('manufacturing', 'Manufacturing Scale & Capabilities', 'Direct factory infrastructure in Tirupur, India.', 'FACTORY CAPABILITY & CREDIBILITY', 'MADE WITH<br><span class="highlight-lime">PURPOSE.</span>', 'Direct manufacturing infrastructure delivering technical athletic apparel with unmatched precision. Operating modern circular knitting, CNC laser cutting, and AQL 2.5 QC.', 'manufacturing', mfgContent), 'utf8');

// 05. ABOUT
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
fs.writeFileSync('about.html', makePage('about', 'About TRIFLEX', 'Sportswear built for business.', 'THE TRIFLEX MANIFESTO', 'SPORTSWEAR<br><span class="highlight-lime">BUILT FOR BUSINESS.</span>', 'TRIFLEX was created to bridge the gap between high-performance athletic apparel engineering and commercial wholesale supply.', 'about', abContent), 'utf8');

// 06. CART
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
fs.writeFileSync('cart.html', makePage('cart', 'Review Wholesale Enquiry Bag', 'Review your wholesale enquiry bag and submit RFQ.', 'B2B WHOLESALE RFQ SPECIFICATION', 'ENQUIRY BAG<br><span class="highlight-lime">REVIEW.</span>', 'Review selected articles, adjust master carton quantities, or request fabric swatches before submitting your quote request.', 'cart', cartContent), 'utf8');

// 07. CONTACT
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
fs.writeFileSync('contact.html', makePage('contact', 'Contact Trade Sales Desk', 'Direct factory hubs and wholesale sales desk.', 'DIRECT FACTORY & SALES DESK', 'CONTACT OUR<br><span class="highlight-lime">TRADE DESK.</span>', 'Speak directly with our technical textile specialists, production coordinators, and wholesale account managers.', 'contact', ctContent), 'utf8');

console.log('SUCCESS: All 7 pages cleanly generated with unified templates!');
