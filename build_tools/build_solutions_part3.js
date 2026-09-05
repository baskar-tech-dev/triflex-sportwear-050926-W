const fs = require('fs');
const { getHeaderHTML, getModalsAndDrawersHTML, getFooterHTML } = require('./html_templates.js');

// =========================================================================
// 05. ABOUT PAGE (about.html)
// =========================================================================
const aboutHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About TRIFLEX | Sportswear Built for Business</title>
  <meta name="description" content="TRIFLEX is a premier sportswear wholesaler and manufacturing partner for retailers, brands, and teams. Built for business.">
  <link rel="icon" type="image/svg+xml" href="images/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png">
  <link rel="icon" type="image/png" href="images/favicon.png">
  <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
  <link rel="stylesheet" href="css/style.css">
</head>
<body id="about-page">
  ${getHeaderHTML('about')}
  <main>
    <section style="padding: 80px 0 40px; background: var(--bg-surface); border-bottom: 1px solid var(--border-color);">
      <div class="container">
        <span class="mono-tag" style="color: var(--accent-lime);">THE TRIFLEX MANIFESTO</span>
        <h1 class="display-hero" style="margin: 10px 0 20px;">
          SPORTSWEAR<br>
          <span class="highlight-lime">BUILT FOR BUSINESS.</span>
        </h1>
        <p class="text-muted-p" style="max-width: 680px; margin-bottom: 30px;">
          TRIFLEX was created to bridge the gap between high-performance athletic apparel engineering and commercial wholesale supply. We believe retailers and brands deserve factory-direct reliability without compromising on modern performance aesthetics.
        </p>
      </div>
    </section>

    <!-- Core Tenets -->
    <section style="padding: 80px 0; background: var(--bg-primary); border-bottom: 1px solid var(--border-color);">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 36px;">
            <span class="mono-tag" style="color: var(--accent-lime);">01 / MANUFACTURING DIRECT</span>
            <h3 class="heading-md" style="margin: 10px 0 14px;">NO MIDDLEMEN MARKUPS</h3>
            <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">
              By operating directly from our manufacturing and knitting infrastructure in Tirupur, India, we eliminate intermediary trading costs. This ensures maximum margin capture for our retail and brand partners.
            </p>
          </div>
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 36px;">
            <span class="mono-tag" style="color: var(--accent-lime);">02 / TECHNICAL INTEGRITY</span>
            <h3 class="heading-md" style="margin: 10px 0 14px;">PERFORMANCE WITHOUT GIMMICKS</h3>
            <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">
              Every fabric blend—from our 140 GSM AeroVent mesh to our 260 GSM high-sculpt interlock—undergoes strict lab testing for moisture wicking, tensile recovery, and colorfastness.
            </p>
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

fs.writeFileSync('about.html', aboutHTML, 'utf8');

// =========================================================================
// 06. PRODUCT DETAIL PAGE (product.html)
// =========================================================================
const productHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wholesale Article Specification | TRIFLEX B2B</title>
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
    <section style="padding: 60px 0 40px; background: var(--bg-surface); border-bottom: 1px solid var(--border-color);">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1fr 1.1fr; gap: 48px; align-items: start;">
          <!-- Left: Gallery -->
          <div>
            <div style="background: #000; border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden; height: 500px; display: flex; align-items: center; justify-content: center;">
              <img id="pdp-main-image" src="images/feat-training.png" alt="Product Main" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div id="pdp-thumbs-container" style="display: flex; gap: 10px; margin-top: 14px; overflow-x: auto;">
              <!-- Thumbnails populated dynamically -->
            </div>
          </div>

          <!-- Right: Technical Specification -->
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span id="pdp-code" class="mono-tag" style="color: var(--accent-lime); font-size: 0.85rem;">TR-101 / TF-M-101</span>
              <span id="pdp-category" class="eyebrow-badge" style="margin: 0;">MEN'S PERFORMANCE</span>
            </div>

            <h1 id="pdp-name" class="heading-xl" style="margin-bottom: 14px;">AEROVENT PRO TRAINING TEE</h1>
            <p id="pdp-story" class="text-muted-p" style="margin-bottom: 24px; font-size: 0.95rem;">
              Engineered with micro-perforated active poly-spandex mesh. Rapid moisture dispersion and zero-chafing flatlock seams.
            </p>

            <!-- Technical Spec Table -->
            <div style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 20px; margin-bottom: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; font-size: 0.85rem;">
              <div>
                <span style="color: var(--text-muted); font-size: 0.72rem; font-family: var(--font-mono); display: block;">FABRIC COMPOSITION</span>
                <strong id="pdp-fabric" style="color: #FFF;">88% Micro-Poly / 12% Spandex</strong>
              </div>
              <div>
                <span style="color: var(--text-muted); font-size: 0.72rem; font-family: var(--font-mono); display: block;">FABRIC WEIGHT (GSM)</span>
                <strong id="pdp-gsm" style="color: var(--accent-lime); font-family: var(--font-mono);">180 GSM</strong>
              </div>
              <div>
                <span style="color: var(--text-muted); font-size: 0.72rem; font-family: var(--font-mono); display: block;">MINIMUM ORDER (MOQ)</span>
                <strong id="pdp-moq" style="color: #FFF;">50 Pcs (Assorted S-3XL)</strong>
              </div>
              <div>
                <span style="color: var(--text-muted); font-size: 0.72rem; font-family: var(--font-mono); display: block;">PACKAGING SPEC</span>
                <strong id="pdp-pack" style="color: #FFF;">25 Pcs / Master Carton</strong>
              </div>
              <div style="grid-column: 1/-1;">
                <span style="color: var(--text-muted); font-size: 0.72rem; font-family: var(--font-mono); display: block;">CUSTOMIZATION &amp; BRANDING</span>
                <strong id="pdp-custom" style="color: #FFF;">Custom Pantone dyeing, Silicone chest branding, 3M reflective trims</strong>
              </div>
            </div>

            <!-- Available Colours -->
            <div style="margin-bottom: 24px;">
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-secondary); display: block; margin-bottom: 8px;">AVAILABLE COLOURS</span>
              <div id="pdp-colours-list" style="display: flex; gap: 8px; flex-wrap: wrap;">
                <!-- Colors injected dynamically -->
              </div>
            </div>

            <!-- Action Row -->
            <div style="display: flex; gap: 14px; flex-wrap: wrap;">
              <div style="display: flex; align-items: center; border: 1px solid var(--border-color); border-radius: var(--radius-sm); background: var(--bg-primary);">
                <button type="button" style="padding: 10px 16px; background: none; border: none; color: #FFF; cursor: pointer;" onclick="const el = document.getElementById('pdp-qty-field'); el.value = Math.max(10, (parseInt(el.value)||50) - 10);">-</button>
                <input type="number" id="pdp-qty-field" value="50" min="10" step="10" style="width: 70px; text-align: center; background: none; border: none; font-family: var(--font-mono); font-weight: 700; color: #FFF;">
                <button type="button" style="padding: 10px 16px; background: none; border: none; color: #FFF; cursor: pointer;" onclick="const el = document.getElementById('pdp-qty-field'); el.value = (parseInt(el.value)||50) + 10;">+</button>
              </div>

              <button type="button" class="btn-primary" style="flex: 1;" onclick="const urlParams = new URLSearchParams(window.location.search); const id = urlParams.get('id') || 'men-01'; const q = parseInt(document.getElementById('pdp-qty-field').value)||50; window.bagManager.addItem(id, q); window.bagManager.openDrawer();">
                <span>ADD TO ENQUIRY BAG</span>
                <span>&rarr;</span>
              </button>

              <button type="button" class="btn-secondary" onclick="const urlParams = new URLSearchParams(window.location.search); const id = urlParams.get('id') || 'men-01'; window.bagManager.addItem(id, 1, true); window.bagManager.openDrawer();">
                REQUEST SAMPLE SWATCH
              </button>
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
  <script src="js/products.js"></script>
  <script src="js/script.js"></script>
</body>
</html>`;

fs.writeFileSync('product.html', productHTML, 'utf8');

// =========================================================================
// 07. CART / ENQUIRY REVIEW PAGE (cart.html)
// =========================================================================
const cartHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Review Wholesale Enquiry Bag | TRIFLEX B2B</title>
  <link rel="icon" type="image/svg+xml" href="images/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png">
  <link rel="icon" type="image/png" href="images/favicon.png">
  <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
  <link rel="stylesheet" href="css/style.css">
</head>
<body id="cart-page">
  ${getHeaderHTML('cart')}
  <main>
    <section style="padding: 60px 0 30px; background: var(--bg-surface); border-bottom: 1px solid var(--border-color);">
      <div class="container">
        <span class="mono-tag" style="color: var(--accent-lime);">B2B WHOLESALE RFQ SPECIFICATION</span>
        <h1 class="heading-xl" style="margin: 6px 0 10px;">ENQUIRY BAG REVIEW</h1>
        <p class="text-muted-p">Review your selected articles, adjust master carton quantities, or request fabric swatches before submitting your quote request.</p>
      </div>
    </section>

    <section style="padding: 50px 0 100px; background: var(--bg-primary);">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 40px; align-items: start;">
          <!-- Left: Items List -->
          <div>
            <div id="bag-page-items-list">
              <!-- Dynamically populated via js/cart_manager.js -->
            </div>
            <div style="display: flex; gap: 14px; margin-top: 20px;">
              <a href="collection.html" class="btn-secondary btn-sm">+ ADD MORE ARTICLES</a>
              <button type="button" class="btn-secondary btn-sm" data-open-quick-order>⚡ QUICK ORDER MATRIX</button>
            </div>
          </div>

          <!-- Right: RFQ Summary Box -->
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

            <p style="font-size: 0.75rem; color: var(--text-muted); text-align: center;">
              No payment is processed online. Our trade desk will review volume breaks and respond within 2-4 business hours.
            </p>
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

fs.writeFileSync('cart.html', cartHTML, 'utf8');

// =========================================================================
// 08. CONTACT PAGE (contact.html)
// =========================================================================
const contactHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Trade Sales Desk | TRIFLEX Sportswear</title>
  <link rel="icon" type="image/svg+xml" href="images/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png">
  <link rel="icon" type="image/png" href="images/favicon.png">
  <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
  <link rel="stylesheet" href="css/style.css">
</head>
<body id="contact-page">
  ${getHeaderHTML('contact')}
  <main>
    <section style="padding: 80px 0 40px; background: var(--bg-surface); border-bottom: 1px solid var(--border-color);">
      <div class="container">
        <span class="mono-tag" style="color: var(--accent-lime);">DIRECT FACTORY &amp; SALES DESK</span>
        <h1 class="display-hero" style="margin: 10px 0 20px;">
          CONTACT OUR<br>
          <span class="highlight-lime">TRADE DESK.</span>
        </h1>
        <p class="text-muted-p" style="max-width: 650px;">
          Speak directly with our technical textile specialists, production coordinators, and wholesale account managers.
        </p>
      </div>
    </section>

    <section style="padding: 70px 0 100px; background: var(--bg-primary);">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px;">
          <!-- Contact Direct Info -->
          <div>
            <h3 class="heading-md" style="margin-bottom: 24px;">COMMERCIAL HUBS</h3>

            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 24px; margin-bottom: 20px;">
              <span class="mono-tag" style="color: var(--accent-lime);">MANUFACTURING HUB</span>
              <h4 style="font-family: var(--font-heading); font-size: 1.1rem; text-transform: uppercase; margin: 4px 0 8px;">Tirupur Facility</h4>
              <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
                TRIFLEX Apparel Mills, SIDCO Industrial Estate, Tirupur, Tamil Nadu – 641603, India.
              </p>
            </div>

            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 24px; margin-bottom: 20px;">
              <span class="mono-tag" style="color: var(--accent-lime);">FAST-TRACK WHATSAPP TRADE DESK</span>
              <h4 style="font-family: var(--font-heading); font-size: 1.1rem; text-transform: uppercase; margin: 4px 0 8px;">Instant Quotation Support</h4>
              <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px;">
                Direct line for quick stock inquiries, urgent teamwear match kits, and catalog downloads.
              </p>
              <a href="https://wa.me/919876543210" target="_blank" class="btn-primary btn-sm">
                CHAT ON WHATSAPP &rarr;
              </a>
            </div>
          </div>

          <!-- Direct Form -->
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 32px;">
            <h3 class="heading-md" style="margin-bottom: 16px;">SEND DIRECT ENQUIRY</h3>
            <button type="button" class="btn-primary" style="width: 100%; padding: 18px; margin-top: 10px;" data-open-rfq-modal>
              <span>LAUNCH OFFICIAL RFQ FORM</span>
              <span>&rarr;</span>
            </button>
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

fs.writeFileSync('contact.html', contactHTML, 'utf8');
console.log('SUCCESS: about.html, product.html, cart.html, and contact.html generated!');
