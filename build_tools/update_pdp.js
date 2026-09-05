const fs = require('fs');
const { getHeaderHTML, getModalsAndDrawersHTML, getFooterHTML } = require('./html_templates.js');

const productHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wholesale Article Specification | TRIFLEX B2B</title>
  <meta name="description" content="Technical sportswear article specifications, fabric blend, GSM weight, MOQ, size ratios, and custom branding options.">
  <link rel="icon" type="image/svg+xml" href="images/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png">
  <link rel="icon" type="image/png" href="images/favicon.png">
  <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
  <link rel="stylesheet" href="css/style.css">
</head>
<body id="pdp-page">
  ${getHeaderHTML('collection')}
  <main id="pdp-main-content">
    <section style="padding: 40px 0 60px; background: var(--bg-surface); border-bottom: 1px solid var(--border-color);">
      <div class="container">
        <!-- Breadcrumb -->
        <nav class="b2b-breadcrumb" aria-label="Breadcrumb">
          <a href="index.html">HOME</a>
          <span>/</span>
          <a href="collection.html">WHOLESALE SHOWROOM</a>
          <span>/</span>
          <span id="pdp-breadcrumb-category" style="color: var(--accent-lime);">ARTICLE SPECIFICATION</span>
        </nav>

        <div style="display: grid; grid-template-columns: 1fr 1.15fr; gap: 48px; align-items: start;">
          <!-- Left: Multi-Angle Gallery -->
          <div>
            <div style="background: #000; border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden; height: 480px; display: flex; align-items: center; justify-content: center; position: relative;">
              <img id="pdp-main-image" src="images/feat-training.png" alt="Product Main" style="width: 100%; height: 100%; object-fit: cover;">
              <span id="pdp-badge-tag" class="product-badge-tag" style="top: 16px; left: 16px; font-size: 0.72rem;">CORE WHOLESALE ARTICLE</span>
              <button type="button" class="product-img-wa-btn" id="pdp-img-wa-btn" title="Enquire about this style on WhatsApp" style="top: 16px; right: 16px; font-size: 0.72rem; padding: 7px 14px;" onclick="const urlParams = new URLSearchParams(window.location.search); const id = urlParams.get('id') || 'men-01'; window.sendWhatsAppEnquiry(id);">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                <span>ENQUIRE ON WHATSAPP</span>
              </button>
            </div>
            <div id="pdp-thumbs-container" style="display: flex; gap: 10px; margin-top: 14px; overflow-x: auto;">
              <!-- Thumbnails populated dynamically -->
            </div>
          </div>

          <!-- Right: Technical Specification -->
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span id="pdp-code" class="mono-tag" style="color: var(--accent-lime); font-size: 0.88rem; font-weight: 800;">TR-101 / TF-M-101</span>
              <span id="pdp-category" class="eyebrow-badge" style="margin: 0;">MEN'S PERFORMANCE</span>
            </div>

            <h1 id="pdp-name" class="heading-xl" style="margin-bottom: 12px; line-height: 1.1;">AEROVENT PRO TRAINING TEE</h1>
            <p id="pdp-story" class="text-muted-p" style="margin-bottom: 24px; font-size: 0.95rem;">
              Engineered with micro-perforated active poly-spandex mesh. Rapid moisture dispersion and zero-chafing flatlock seams.
            </p>

            <!-- Technical Spec Table Matrix -->
            <div style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 22px; margin-bottom: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 0.85rem;">
              <div>
                <span style="color: var(--text-muted); font-size: 0.72rem; font-family: var(--font-mono); display: block; margin-bottom: 2px;">FABRIC COMPOSITION</span>
                <strong id="pdp-fabric" style="color: #FFF;">88% Micro-Poly / 12% Spandex</strong>
              </div>
              <div>
                <span style="color: var(--text-muted); font-size: 0.72rem; font-family: var(--font-mono); display: block; margin-bottom: 2px;">FABRIC WEIGHT (GSM)</span>
                <strong id="pdp-gsm" style="color: var(--accent-lime); font-family: var(--font-mono); font-size: 1rem;">180 GSM</strong>
              </div>
              <div>
                <span style="color: var(--text-muted); font-size: 0.72rem; font-family: var(--font-mono); display: block; margin-bottom: 2px;">MINIMUM ORDER (MOQ)</span>
                <strong id="pdp-moq" style="color: #FFF;">50 Pcs (Assorted S-3XL)</strong>
              </div>
              <div>
                <span style="color: var(--text-muted); font-size: 0.72rem; font-family: var(--font-mono); display: block; margin-bottom: 2px;">PACKAGING SPEC</span>
                <strong id="pdp-pack" style="color: #FFF;">25 Pcs / Master Carton</strong>
              </div>
              <div style="grid-column: 1/-1; border-top: 1px solid var(--border-color); padding-top: 12px;">
                <span style="color: var(--text-muted); font-size: 0.72rem; font-family: var(--font-mono); display: block; margin-bottom: 2px;">CUSTOMIZATION &amp; BRANDING</span>
                <strong id="pdp-custom" style="color: #FFF;">Custom Pantone dyeing, Silicone chest branding, 3M reflective trims, OEM Woven Neck Labels</strong>
              </div>
            </div>

            <!-- Available Colours -->
            <div style="margin-bottom: 24px;">
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-secondary); display: block; margin-bottom: 8px;">AVAILABLE WHOLESALE COLOURWAYS</span>
              <div id="pdp-colours-list" style="display: flex; gap: 8px; flex-wrap: wrap;">
                <!-- Colors injected dynamically -->
              </div>
            </div>

            <!-- Standard Carton Size-Ratio Breakdown -->
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px dashed var(--border-color); border-radius: var(--radius-sm); padding: 14px; margin-bottom: 24px;">
              <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-lime); font-weight: 700; margin-bottom: 6px;">STANDARD 25-PC MASTER CARTON RATIO:</div>
              <div style="display: flex; gap: 14px; font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-secondary); flex-wrap: wrap;">
                <span>S: <strong>4</strong></span>
                <span>M: <strong>7</strong></span>
                <span>L: <strong>8</strong></span>
                <span>XL: <strong>4</strong></span>
                <span>2XL: <strong>2</strong></span>
              </div>
            </div>

            <!-- Action Row -->
            <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
              <div style="display: flex; align-items: center; border: 1px solid var(--border-color); border-radius: var(--radius-sm); background: var(--bg-primary);">
                <button type="button" style="padding: 12px 16px; background: none; border: none; color: #FFF; cursor: pointer;" onclick="const el = document.getElementById('pdp-qty-field'); el.value = Math.max(10, (parseInt(el.value)||50) - 10);">-</button>
                <input type="number" id="pdp-qty-field" value="50" min="10" step="10" style="width: 70px; text-align: center; background: none; border: none; font-family: var(--font-mono); font-weight: 700; color: #FFF;">
                <button type="button" style="padding: 12px 16px; background: none; border: none; color: #FFF; cursor: pointer;" onclick="const el = document.getElementById('pdp-qty-field'); el.value = (parseInt(el.value)||50) + 10;">+</button>
              </div>

              <button type="button" class="btn-wa-direct" onclick="const urlParams = new URLSearchParams(window.location.search); const id = urlParams.get('id') || 'men-01'; window.sendWhatsAppEnquiry(id);" title="Direct WhatsApp Enquiry with pre-filled specs">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                <span>WHATSAPP RFQ</span>
              </button>

              <button type="button" class="btn-primary" style="flex: 1;" onclick="const urlParams = new URLSearchParams(window.location.search); const id = urlParams.get('id') || 'men-01'; const q = parseInt(document.getElementById('pdp-qty-field').value)||50; window.bagManager.addItem(id, q); window.bagManager.openDrawer();">
                <span>ADD TO ENQUIRY BAG</span>
                <span>&rarr;</span>
              </button>

              <button type="button" class="btn-secondary" onclick="const urlParams = new URLSearchParams(window.location.search); const id = urlParams.get('id') || 'men-01'; window.bagManager.addItem(id, 1, true); window.bagManager.openDrawer();">
                SAMPLE SWATCH
              </button>
            </div>

            <div style="margin-top: 14px; font-size: 0.75rem; color: var(--text-muted); display: flex; gap: 16px;">
              <span>✓ 24–48h Dispatch</span>
              <span>✓ Barcoded Retail Packaging</span>
              <span>✓ GST Invoice</span>
            </div>
          </div>
        </div>

        <!-- SPECIFICATION TABS -->
        <div style="margin-top: 50px;">
          <div class="pdp-tabs-nav">
            <button type="button" class="pdp-tab-btn active" onclick="switchPdpTab('specs', this)">01 Technical Specs</button>
            <button type="button" class="pdp-tab-btn" onclick="switchPdpTab('oem', this)">02 OEM &amp; Branding</button>
            <button type="button" class="pdp-tab-btn" onclick="switchPdpTab('packing', this)">03 Master Packaging</button>
            <button type="button" class="pdp-tab-btn" onclick="switchPdpTab('care', this)">04 Lab Testing &amp; Care</button>
          </div>

          <div id="tab-specs" class="pdp-tab-pane active">
            <div style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 24px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
              <div>
                <strong style="color: #FFF; display: block; margin-bottom: 4px;">Knit Construction</strong>
                <p style="font-size: 0.85rem; color: var(--text-secondary);">High-filament micro-denier interlock with engineered hydro-wicking capillary channels.</p>
              </div>
              <div>
                <strong style="color: #FFF; display: block; margin-bottom: 4px;">Seam Integrity</strong>
                <p style="font-size: 0.85rem; color: var(--text-secondary);">6-thread flatlock assembly eliminating friction hotspots on skin during high perspiration.</p>
              </div>
              <div>
                <strong style="color: #FFF; display: block; margin-bottom: 4px;">Ergonomic Cut</strong>
                <p style="font-size: 0.85rem; color: var(--text-secondary);">Raglan shoulder &amp; gusseted underarms engineered for 360-degree overhead freedom.</p>
              </div>
            </div>
          </div>

          <div id="tab-oem" class="pdp-tab-pane">
            <div style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 24px;">
              <p style="margin-bottom: 12px;">This article supports full OEM private relabeling for qualifying orders (150+ Pcs):</p>
              <ul style="line-height: 2; font-size: 0.85rem; color: var(--text-secondary);">
                <li>&bull; <strong>Neck Branding:</strong> Heat-sealed tagless neck print or custom damask woven label</li>
                <li>&bull; <strong>Exterior Branding:</strong> High-density silicone chest/sleeve logo, 3M Scotchlite reflective transfer</li>
                <li>&bull; <strong>Trims:</strong> Custom branded drawcord tips, side hem tags, and care/wash instructions with your brand entity</li>
              </ul>
            </div>
          </div>

          <div id="tab-packing" class="pdp-tab-pane">
            <div style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 24px;">
              <p style="margin-bottom: 12px;">Retail-ready carton logistics:</p>
              <ul style="line-height: 2; font-size: 0.85rem; color: var(--text-secondary);">
                <li>&bull; <strong>Inner Polybag:</strong> Individual 40-micron recyclable frosted zipper bag with humidity vent</li>
                <li>&bull; <strong>Hangtag:</strong> 350 GSM matte laminated card with retail barcode and MSRP area</li>
                <li>&bull; <strong>Master Carton:</strong> 7-ply heavy corrugated export carton (Dimensions: 60cm &times; 40cm &times; 35cm, Gross Weight: ~9.5 kg)</li>
              </ul>
            </div>
          </div>

          <div id="tab-care" class="pdp-tab-pane">
            <div style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 24px;">
              <ul style="line-height: 2; font-size: 0.85rem; color: var(--text-secondary);">
                <li>&bull; <strong>Colorfastness:</strong> AATCC Grade 4.5+ (Resistant to color migration under repeated wash cycles)</li>
                <li>&bull; <strong>Shrinkage:</strong> Pre-shrunk finish ensuring less than 2.0% dimensional change at 30&deg;C</li>
                <li>&bull; <strong>Wash Care:</strong> Machine wash cold with like colors. Do not iron directly on prints. Line dry recommended.</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Related Articles -->
    <section style="padding: 60px 0; background: var(--bg-primary);">
      <div class="container">
        <h3 class="heading-lg" style="margin-bottom: 24px;">SIMILAR WHOLESALE ARTICLES</h3>
        <div class="products-showcase-grid" id="pdp-related-grid">
          <!-- Populated dynamically -->
        </div>
      </div>
    </section>
  </main>
  ${getFooterHTML()}
  ${getModalsAndDrawersHTML()}

  <script>
    function switchPdpTab(tabId, btn) {
      document.querySelectorAll('.pdp-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.pdp-tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById('tab-' + tabId);
      if (target) target.classList.add('active');
    }
  </script>
  <script src="js/products.js"></script>
  <script src="js/script.js"></script>
</body>
</html>`;

fs.writeFileSync('product.html', productHTML, 'utf8');
console.log('SUCCESS: product.html updated with enhanced specs, breadcrumbs, carton ratios, and tab switcher!');
