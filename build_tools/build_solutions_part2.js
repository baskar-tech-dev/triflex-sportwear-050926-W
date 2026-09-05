const fs = require('fs');
const { getHeaderHTML, getModalsAndDrawersHTML, getFooterHTML } = require('./html_templates.js');

// =========================================================================
// 02. PRIVATE LABEL (private-label.html)
// =========================================================================
const privateLabelHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Private Label Sportswear Manufacturer (OEM) | TRIFLEX</title>
  <meta name="description" content="Your Brand. Our Factory. Comprehensive OEM sportswear manufacturing for athletic apparel brands, fitness influencers, and gym chains.">
  <link rel="icon" type="image/svg+xml" href="images/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png">
  <link rel="icon" type="image/png" href="images/favicon.png">
  <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
  <link rel="stylesheet" href="css/style.css">
</head>
<body id="private-label-page">
  ${getHeaderHTML('solutions')}
  <main>
    <!-- HERO -->
    <section style="padding: 80px 0 40px; background: var(--bg-surface); border-bottom: 1px solid var(--border-color);">
      <div class="container">
        <span class="mono-tag" style="color: var(--accent-lime);">OEM BRAND MANUFACTURING</span>
        <h1 class="display-hero" style="margin: 10px 0 20px;">
          YOUR BRAND.<br>
          <span class="highlight-lime">OUR FACTORY.</span>
        </h1>
        <p class="text-muted-p" style="max-width: 680px; margin-bottom: 30px;">
          We engineer, brand, and manufacture proprietary sportswear collections for athletic brands, fitness creators, and multi-location gym chains. From custom Pantone dyeing to woven neck labels and barcoded polybags.
        </p>
        <button type="button" class="btn-primary" data-open-rfq-modal>
          <span>START A PRIVATE LABEL PROJECT</span>
          <span>&rarr;</span>
        </button>
      </div>
    </section>

    <!-- 9 STAGES OF PRIVATE LABEL PRODUCTION -->
    <section style="padding: 80px 0; background: var(--bg-primary); border-bottom: 1px solid var(--border-color);">
      <div class="container">
        <div style="margin-bottom: 40px;">
          <span class="mono-tag" style="color: var(--accent-lime);">END-TO-END OEM WORKFLOW</span>
          <h2 class="heading-xl">THE 9-STAGE MANUFACTURING JOURNEY</h2>
        </div>

        <div class="process-steps-grid" style="grid-template-columns: repeat(3, 1fr);">
          <div class="step-card">
            <span class="step-num">01</span>
            <h3 class="step-name">Why Private Label</h3>
            <p class="step-desc">Establish higher brand equity, customer loyalty, and full pricing autonomy by launching your custom branded athletic line.</p>
          </div>
          <div class="step-card">
            <span class="step-num">02</span>
            <h3 class="step-name">Fabric Selection</h3>
            <p class="step-desc">Select from 140 to 260 GSM technical knits, micro-ribstop nylon, and recycled poly-spandex blends.</p>
          </div>
          <div class="step-card">
            <span class="step-num">03</span>
            <h3 class="step-name">Design &amp; Tech-Packs</h3>
            <p class="step-desc">Our patterning team translates your sketches, reference samples, and colorways into industrial production specs.</p>
          </div>
          <div class="step-card">
            <span class="step-num">04</span>
            <h3 class="step-name">Sampling &amp; Prototypes</h3>
            <p class="step-desc">We produce pre-production physical samples for hands-on fit testing, drape evaluation, and wash tests.</p>
          </div>
          <div class="step-card">
            <span class="step-num">05</span>
            <h3 class="step-name">Custom Branding</h3>
            <p class="step-desc">Custom woven neck labels, soft-touch heat-seal tags, engraved drawcord aglets, and custom rubber side tabs.</p>
          </div>
          <div class="step-card">
            <span class="step-num">06</span>
            <h3 class="step-name">Bulk Manufacturing</h3>
            <p class="step-desc">High-precision CNC laser cutting and automated flatlock stitching across our dedicated manufacturing lines.</p>
          </div>
          <div class="step-card">
            <span class="step-num">07</span>
            <h3 class="step-name">Quality Inspection</h3>
            <p class="step-desc">AQL 2.5 four-point quality inspection checking seam strength, stretch recovery, and color uniformity.</p>
          </div>
          <div class="step-card">
            <span class="step-num">08</span>
            <h3 class="step-name">Bespoke Packaging</h3>
            <p class="step-desc">Custom printed frosted zipper polybags, premium hangtags, and barcoded master carton labeling.</p>
          </div>
          <div class="step-card">
            <span class="step-num">09</span>
            <h3 class="step-name">Dispatch &amp; Delivery</h3>
            <p class="step-desc">Consolidated freight forwarding to your central fulfillment center or multiple regional distribution warehouses.</p>
          </div>
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

fs.writeFileSync('private-label.html', privateLabelHTML, 'utf8');

// =========================================================================
// 03. TEAMWEAR PAGE (teamwear.html)
// =========================================================================
const teamwearHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Custom Teamwear &amp; Sports Uniforms | TRIFLEX B2B</title>
  <meta name="description" content="Built for the team. Built for the game. Pro-tier sublimated kits for Football, Cricket, Basketball, Running, and Corporate leagues.">
  <link rel="icon" type="image/svg+xml" href="images/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png">
  <link rel="icon" type="image/png" href="images/favicon.png">
  <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
  <link rel="stylesheet" href="css/style.css">
</head>
<body id="teamwear-page" data-category="teamwear">
  ${getHeaderHTML('solutions')}
  <main>
    <!-- HERO -->
    <section style="padding: 80px 0 40px; background: var(--bg-surface); border-bottom: 1px solid var(--border-color);">
      <div class="container">
        <span class="mono-tag" style="color: var(--accent-lime);">CUSTOM MATCHDAY UNIFORMS</span>
        <h1 class="display-hero" style="margin: 10px 0 20px;">
          BUILT FOR THE TEAM.<br>
          <span class="highlight-lime">BUILT FOR THE GAME.</span>
        </h1>
        <p class="text-muted-p" style="max-width: 680px; margin-bottom: 30px;">
          Matchday kits engineered with micro-hex sublimation textiles and permanent zero-fade Italian dyes. Custom roster numbers, player names, and club crests with 7–10 day turnaround.
        </p>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <button type="button" class="btn-primary" data-open-rfq-modal>CREATE YOUR TEAM KIT &rarr;</button>
          <button type="button" class="btn-secondary" data-open-quick-order>⚡ QUICK ORDER KITS</button>
        </div>
      </div>
    </section>

    <!-- 8 SPORT DISCIPLINES -->
    <section style="padding: 70px 0; background: var(--bg-primary); border-bottom: 1px solid var(--border-color);">
      <div class="container">
        <div style="margin-bottom: 30px;">
          <span class="mono-tag" style="color: var(--accent-lime);">SPORT DISCIPLINES</span>
          <h2 class="heading-xl">ALL-SPORT TEAMWEAR CATALOG</h2>
        </div>

        <div class="teamwear-sports-grid">
          <div class="sport-discipline-card">
            <span class="sport-meta">01 / PRO MATCH</span>
            <h3 class="sport-name">FOOTBALL</h3>
            <p style="font-size: 0.82rem; color: var(--text-secondary);">Full sublimated kits, aero-mesh side panels, keeper jerseys &amp; shorts.</p>
            <button type="button" class="btn-ghost" data-add-to-enquiry="team-01" style="font-size: 0.72rem;">+ ADD FOOTBALL KIT</button>
          </div>
          <div class="sport-discipline-card">
            <span class="sport-meta">02 / MATCH &amp; T20</span>
            <h3 class="sport-name">CRICKET</h3>
            <p style="font-size: 0.82rem; color: var(--text-secondary);">UPF 50+ test match whites, polo collars, and reinforced sliding trousers.</p>
            <button type="button" class="btn-ghost" data-add-to-enquiry="team-02" style="font-size: 0.72rem;">+ ADD CRICKET KIT</button>
          </div>
          <div class="sport-discipline-card">
            <span class="sport-meta">03 / COURTSIDE</span>
            <h3 class="sport-name">BASKETBALL</h3>
            <p style="font-size: 0.82rem; color: var(--text-secondary);">Double-layer pro mesh singlets, wide-shoulder cut, and 9" motion shorts.</p>
            <button type="button" class="btn-ghost" data-add-to-enquiry="team-03" style="font-size: 0.72rem;">+ ADD HOOPS KIT</button>
          </div>
          <div class="sport-discipline-card">
            <span class="sport-meta">04 / RACE DAY</span>
            <h3 class="sport-name">RUNNING</h3>
            <p style="font-size: 0.82rem; color: var(--text-secondary);">Sub-90g featherlight race singlets, bonded hems, and split motion shorts.</p>
            <button type="button" class="btn-ghost" data-add-to-enquiry="team-04" style="font-size: 0.72rem;">+ ADD RUNNING KIT</button>
          </div>
          <div class="sport-discipline-card">
            <span class="sport-meta">05 / INDOOR SPORT</span>
            <h3 class="sport-name">VOLLEYBALL</h3>
            <p style="font-size: 0.82rem; color: var(--text-secondary);">High-elasticity 4-way stretch competition jerseys and motion shorts.</p>
            <button type="button" class="btn-ghost" data-open-rfq-modal style="font-size: 0.72rem;">CUSTOM QUOTE &rarr;</button>
          </div>
          <div class="sport-discipline-card">
            <span class="sport-meta">06 / TRAINING &amp; HIIT</span>
            <h3 class="sport-name">GYM &amp; FITNESS</h3>
            <p style="font-size: 0.82rem; color: var(--text-secondary);">Custom gym staff uniforms, personal trainer tees, and member apparel.</p>
            <button type="button" class="btn-ghost" data-open-rfq-modal style="font-size: 0.72rem;">CUSTOM QUOTE &rarr;</button>
          </div>
          <div class="sport-discipline-card">
            <span class="sport-meta">07 / INSTITUTIONAL</span>
            <h3 class="sport-name">SCHOOL SPORTS</h3>
            <p style="font-size: 0.82rem; color: var(--text-secondary);">Durable junior PE kits with custom school house colors and crest embroidery.</p>
            <button type="button" class="btn-ghost" data-open-rfq-modal style="font-size: 0.72rem;">CUSTOM QUOTE &rarr;</button>
          </div>
          <div class="sport-discipline-card">
            <span class="sport-meta">08 / CORPORATE</span>
            <h3 class="sport-name">CORPORATE SPORTS</h3>
            <p style="font-size: 0.82rem; color: var(--text-secondary);">Corporate marathon tees, company sports day kits, and technical polos.</p>
            <button type="button" class="btn-ghost" data-open-rfq-modal style="font-size: 0.72rem;">CUSTOM QUOTE &rarr;</button>
          </div>
        </div>
      </div>
    </section>

    <!-- LIVE TEAMWEAR ARTICLES GRID -->
    <section style="padding: 70px 0; background: var(--bg-surface); border-bottom: 1px solid var(--border-color);">
      <div class="container">
        <div class="section-header-editorial">
          <div>
            <span class="mono-tag" style="color: var(--accent-lime);">CORE TEAMWEAR ARTICLES</span>
            <h2 class="heading-xl">TEAMWEAR SHOWROOM</h2>
          </div>
        </div>
        <div class="products-showcase-grid" id="collection-products-grid">
          <!-- Rendered dynamically -->
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

fs.writeFileSync('teamwear.html', teamwearHTML, 'utf8');

// =========================================================================
// 04. MANUFACTURING (manufacturing.html)
// =========================================================================
const manufacturingHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Manufacturing Scale &amp; Capabilities | TRIFLEX</title>
  <meta name="description" content="Made with purpose. High-capacity knitting, CNC laser cutting, automated flatlock stitching, and 5-stage quality inspection in Tirupur, India.">
  <link rel="icon" type="image/svg+xml" href="images/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png">
  <link rel="icon" type="image/png" href="images/favicon.png">
  <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
  <link rel="stylesheet" href="css/style.css">
</head>
<body id="manufacturing-page">
  ${getHeaderHTML('manufacturing')}
  <main>
    <section style="padding: 80px 0 40px; background: var(--bg-surface); border-bottom: 1px solid var(--border-color);">
      <div class="container">
        <span class="mono-tag" style="color: var(--accent-lime);">FACTORY CAPABILITY &amp; CREDIBILITY</span>
        <h1 class="display-hero" style="margin: 10px 0 20px;">
          MADE WITH<br>
          <span class="highlight-lime">PURPOSE.</span>
        </h1>
        <p class="text-muted-p" style="max-width: 680px; margin-bottom: 30px;">
          Direct manufacturing infrastructure delivering technical athletic apparel with unmatched precision. Operating modern circular knitting, CNC laser cutting, Italian sublimation, and rigorous AQL 2.5 quality control.
        </p>
        <button type="button" class="btn-primary" data-open-rfq-modal>SCHEDULE FACTORY CONSULTATION &rarr;</button>
      </div>
    </section>

    <!-- 7 STEPS DETAILED -->
    <section style="padding: 80px 0; background: var(--bg-primary); border-bottom: 1px solid var(--border-color);">
      <div class="container">
        <div style="margin-bottom: 40px;">
          <span class="mono-tag" style="color: var(--accent-lime);">FACTORY PROCESS CHAIN</span>
          <h2 class="heading-xl">FROM YARN TO DISPATCH</h2>
        </div>
        <div class="process-steps-grid">
          <div class="step-card">
            <span class="step-num">01</span>
            <h3 class="step-name">Knitting &amp; Milling</h3>
            <p class="step-desc">High-speed circular knitting lines producing 140 to 260 GSM technical knits with micro-air channels.</p>
          </div>
          <div class="step-card">
            <span class="step-num">02</span>
            <h3 class="step-name">CNC Laser Cutting</h3>
            <p class="step-desc">Computer-controlled laser cutting ensuring 0.5mm precision across complex ergonomic athlete patterns.</p>
          </div>
          <div class="step-card">
            <span class="step-num">03</span>
            <h3 class="step-name">Flatlock Stitching</h3>
            <p class="step-desc">Yamato and Juki 6-thread flatlock assembly lines producing zero-friction, skin-flush seams.</p>
          </div>
          <div class="step-card">
            <span class="step-num">04</span>
            <h3 class="step-name">Dye Sublimation</h3>
            <p class="step-desc">Italian zero-fade dye sublimation units providing vibrant full-bleed color transfer with zero handfeel drag.</p>
          </div>
          <div class="step-card">
            <span class="step-num">05</span>
            <h3 class="step-name">Inline Inspection</h3>
            <p class="step-desc">Every piece undergoes 5-stage QC testing for seam elasticity, tensile pull strength, and stitch integrity.</p>
          </div>
          <div class="step-card">
            <span class="step-num">06</span>
            <h3 class="step-name">Barcoded Packaging</h3>
            <p class="step-desc">Retail-ready individual polybagging with automated EAN/UPC barcoding and carton size-ratio sorting.</p>
          </div>
          <div class="step-card">
            <span class="step-num">07</span>
            <h3 class="step-name">Global Forwarding</h3>
            <p class="step-desc">Daily dispatch via express air freight and full container sea logistics across major global ports.</p>
          </div>
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

fs.writeFileSync('manufacturing.html', manufacturingHTML, 'utf8');
console.log('SUCCESS: private-label.html, teamwear.html, and manufacturing.html generated!');
