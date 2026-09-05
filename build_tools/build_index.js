const fs = require('fs');
const { getHeaderHTML, getModalsAndDrawersHTML, getFooterHTML } = require('./html_templates.js');

const sec1 = fs.readFileSync('sections/sec01_hero.html', 'utf8');
const sec2 = fs.readFileSync('sections/sec02_discovery.html', 'utf8');
const sec3 = fs.readFileSync('sections/sec03_business.html', 'utf8');
const sec4_5 = fs.readFileSync('sections/sec04_05_showrooms.html', 'utf8');
const sec6_8 = fs.readFileSync('sections/sec06_08_capability_mfg.html', 'utf8');
const sec9_14 = fs.readFileSync('sections/sec09_14_closing.html', 'utf8');

const fullIndexHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TRIFLEX | Premium Sportswear Wholesaler &amp; Manufacturer</title>
  <meta name="description" content="TRIFLEX is a serious sportswear sourcing, wholesale and manufacturing partner for retailers, brands, distributors and teams. Sportswear built for business.">
  
  <!-- OpenGraph / B2B Metadata -->
  <meta property="og:title" content="TRIFLEX | Premium Sportswear Wholesaler &amp; Manufacturer">
  <meta property="og:description" content="Digital wholesale showroom &amp; direct manufacturing partner. 140–260 GSM technical textiles, low MOQ, private label and custom teamwear.">
  <meta property="og:image" content="images/banner-1.png">
  <meta property="og:type" content="website">

  <link rel="icon" type="image/svg+xml" href="images/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png">
  <link rel="icon" type="image/png" href="images/favicon.png">
  <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
  <link rel="stylesheet" href="css/style.css">

  <!-- Schema.org JSON-LD Structured Data for B2B Manufacturer -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "name": "TRIFLEX Sportswear Manufacturer & Wholesale",
    "description": "Sportswear manufacturer and digital wholesale showroom supplying performance athletic apparel for retailers, brands, and teams.",
    "url": "https://triflex.in",
    "logo": "https://triflex.in/images/logomain.png",
    "currenciesAccepted": "INR, USD, EUR",
    "paymentAccepted": "Bank Transfer, Commercial LC, Wire",
    "priceRange": "$$"
  }
  </script>
</head>
<body id="home-page">

  ${getHeaderHTML('home')}

  <!-- MAIN CONTENT (14 EDITORIAL SECTIONS) -->
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

  <!-- SCRIPTS -->
  <script src="js/products.js"></script>
  <script src="js/script.js"></script>
</body>
</html>
`;

fs.writeFileSync('index.html', fullIndexHTML, 'utf8');
console.log('SUCCESS: index.html written successfully! Total size:', fullIndexHTML.length, 'bytes');
