const fs = require('fs');
const vm = require('vm');

const existingCode = fs.readFileSync('js/products.js', 'utf8');
const context = {};
vm.createContext(context);
vm.runInContext(existingCode + '; this.list = TRIFLEX_PRODUCTS;', context);
const list = context.list;

const codeMap = {
  'men-01': 'TR-101', 'men-02': 'TR-102', 'men-03': 'TR-103', 'men-04': 'TR-104', 'men-05': 'TR-105', 'men-06': 'TR-106',
  'women-01': 'TR-201', 'women-02': 'TR-202', 'women-03': 'TR-203', 'women-04': 'TR-204',
  'kids-01': 'TR-301', 'kids-02': 'TR-302'
};

list.forEach(p => {
  p.productCode = codeMap[p.id] || ('TR-' + p.id.toUpperCase());
  if (!p.gender) p.gender = p.category === 'men' ? 'Men' : (p.category === 'women' ? 'Women' : (p.category === 'kids' ? 'Kids' : 'Unisex'));
  if (!p.fabric) p.fabric = p.fabricBlend || (p.specs && p.specs.fabric) || '88% Micro-Polyester / 12% Spandex';
  if (!p.colours && p.colors) p.colours = p.colors;
  else if (!p.colours) p.colours = ['Stealth Black', 'Volt Lime', 'Pure White', 'Graphite Grey'];
  if (!p.customization) p.customization = 'Custom Pantone dyeing, Silicone chest branding, 3M reflective trims, Hem tag labels';
  if (!p.privateLabel) p.privateLabel = 'Available (OEM custom neck tape, branded woven labels, custom polybags with barcode)';
  if (!p.printing) p.printing = 'Sublimation, High-Density Silicone, Reflective 3M Heat Transfer';
  if (!p.embroidery) p.embroidery = 'Micro-flatlock embroidery, 3D silicone patch';
  if (!p.productionInfo) p.productionInfo = 'Tirupur Facility. In-Stock Dispatch: 24-48h. Custom Batch: 12-15 Days.';
});

const teamwear = [
  {
    id: 'team-01',
    productCode: 'TR-401',
    wholesaleCode: 'TF-T-401',
    name: 'ProSub Elite Sublimated Football Match Kit',
    category: 'teamwear',
    subCategory: 'football',
    gender: 'Unisex',
    movement: 'train',
    collection: '2026 Pro Match Series',
    badge: 'CUSTOM TEAMWEAR PRO',
    msrp: 1999,
    moq: '20 Sets (Jersey + Shorts, Custom Roster)',
    packSize: '20 Sets / Carton',
    ratio: 'Custom Roster Sizes S to 3XL + Junior Available',
    gsm: '170 GSM',
    fabric: '100% AeroWick Pro Sublimation-Ready Micro-Hex Poly',
    fabricBlend: '100% AeroWick Polyester',
    fit: 'Athletic Matchday Ergonomic Fit',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    colours: ['Full Custom Pantone Sublimation', 'Club Gradient', 'Hoops', 'Sash'],
    color: 'Custom Sublimation',
    images: ['images/feat-training.png', 'images/cat-tshirt.png', 'images/banner-1.png'],
    customization: '100% Full-Bleed CMYK Sublimation, Player Names, Custom Numbers, Club Badges, Sponsor Logos',
    privateLabel: 'Available (Custom collar branding, branded authenticity hologram, bespoke club packaging)',
    printing: 'High-Definition Italian Sublimation Ink (Zero Fade)',
    embroidery: '3D Silicone Club Crest or High-Stitch Embroidery Badge',
    productionInfo: 'Custom Match Kit Turnaround: 7-10 Days. Digital Proofs: 24 Hours.',
    rating: 5.0,
    reviewsCount: 310,
    shortStory: 'Pro-tier football kit engineered with micro-hex sublimation fabric. High-definition color depth, permanent zero-fade Italian inks, and ventilated side mesh.',
    pillars: {
      quality: 'High-definition Italian sublimation dye sublimation guarantees zero cracking, peeling, or fading over hundreds of matches.',
      movement: 'Raglan shoulder cut and side-rib vents maximize arm sweep for keepers and field players alike.',
      confidence: 'Professional club aesthetic that elevates academy players and tournament teams.'
    },
    features: [
      'Complete Jersey + Shorts Matched Set with Custom Numbering',
      'Zero-Weight High-Definition Italian Sublimation Inks',
      'Ventilated Aero-Mesh Side Panels for Rapid Heat Dissipation',
      'Includes Custom Club Crest & Sponsor Branding at No Extra Plate Cost'
    ],
    specs: {
      fabric: '100% AeroWick Micro-Hex Polyester',
      weight: '170 GSM Jersey, 190 GSM Shorts',
      fit: 'Pro Matchday Ergonomic Cut',
      cartonPackaging: '20 Sets per Team Master Box'
    }
  },
  {
    id: 'team-02',
    productCode: 'TR-402',
    wholesaleCode: 'TF-T-402',
    name: 'Tournament Pro Cricket Jersey & Trouser Kit',
    category: 'teamwear',
    subCategory: 'cricket',
    gender: 'Unisex',
    movement: 'train',
    collection: '2026 Pro Match Series',
    badge: 'CRICKET PRO',
    msrp: 2499,
    moq: '15 Sets (Jersey + Cricket Trousers)',
    packSize: '15 Sets / Carton',
    ratio: 'Custom Roster Sizes S to 3XL',
    gsm: '200 GSM',
    fabric: 'Heavyweight Poly-Spandex Interlock with Anti-UV 50+',
    fabricBlend: '95% Micro-Poly / 5% Spandex',
    fit: 'Pro Cricket Tailored Fit with Reinforced Knees',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colours: ['Pure White Match Test', 'Cream Off-White', 'Custom Color T20 Sublimated'],
    color: 'Pure White Match Test',
    images: ['images/cat-polo.png', 'images/cat-trackpant.png', 'images/banner-dealer.png'],
    customization: 'Custom polo collar tipping, Full color sublimation, Club crest, Sponsor prints, Player names & numbers',
    privateLabel: 'Available (Custom club woven tags, custom packaging)',
    printing: 'Sublimation, Heat Transfer Silicon',
    embroidery: 'High-density 3D chest embroidery & cap matching',
    productionInfo: 'Turnaround: 8-12 Days. Direct Dispatch Pan-India.',
    rating: 4.9,
    reviewsCount: 145,
    shortStory: 'Engineered for rigorous multi-day test cricket and high-octane T20 leagues. Features UPF 50+ sun protection, reinforced slide zones, and breathable collar.',
    pillars: {
      quality: 'Heavyweight 240 GSM cricket trousers with double-layered knee slide reinforcement for diving fielders.',
      movement: 'Gusseted crotch and 5% spandex blend enable deep batting stances and unrestricted bowling actions.',
      confidence: 'Crisp traditional white or vibrant T20 sublimated aesthetics with pro collar construction.'
    },
    features: [
      'UPF 50+ Sun Defense Treatment for Long Hours in Sun',
      'Double-Reinforced Slide Panels on Outer Knees',
      'Breathable Mesh Gusset & Laser-Perforated Underarms',
      'Custom Sublimated Collar and Raglan Sleeve Options'
    ],
    specs: {
      fabric: '95% Poly, 5% Spandex Interlock',
      weight: '200 GSM Polo / 240 GSM Pant',
      fit: 'Pro Cricket Athletic Cut',
      cartonPackaging: '15 Sets per Master Box'
    }
  },
  {
    id: 'team-03',
    productCode: 'TR-403',
    wholesaleCode: 'TF-T-403',
    name: 'Courtside Elite Basketball Sleeveless Uniform',
    category: 'teamwear',
    subCategory: 'basketball',
    gender: 'Unisex',
    movement: 'train',
    collection: '2026 Pro Match Series',
    badge: 'PRO HOOPS',
    msrp: 1899,
    moq: '15 Sets (Jersey + Shorts)',
    packSize: '15 Sets / Carton',
    ratio: 'Custom Roster Sizes S to 3XL',
    gsm: '180 GSM',
    fabric: '100% Pro-Mesh Poly with Sublimation Transfer',
    fabricBlend: '100% Polyester Double-Knit Mesh',
    fit: 'Authentic Wide-Shoulder Basketball Cut',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colours: ['Custom Sublimated Team Colors', 'Stealth Black/Volt', 'Crimson/White'],
    color: 'Stealth Black/Volt',
    images: ['images/cat-tshirt.png', 'images/cat-shorts.png', 'images/banner-move.png'],
    customization: 'Custom sublimated twill numbers, Embroidered team lettering, Custom striped rib collar and armholes',
    privateLabel: 'Available (Bespoke league tagging, custom player packaging)',
    printing: 'Full Sublimation, Tackle Twill Appliqué',
    embroidery: '3D team crest and league badge embroidery',
    productionInfo: 'Turnaround: 7-10 Days. Fast Air Dispatch Available.',
    rating: 4.9,
    reviewsCount: 92,
    shortStory: 'Pro-spec basketball uniform with heavy double-knit open mesh, yarn-dyed rib collar, and deep 9-inch motion shorts.',
    pillars: {
      quality: 'Heavyweight open-hole mesh shell bonded with soft inner lining for professional court drape.',
      movement: 'Deep armhole radius and side-split hem facilitate full overhead shooting and rebounding extension.',
      confidence: 'Bold court presence with vibrant sublimated graphics and crisp striped trims.'
    },
    features: [
      'Engineered Striped Yarn-Dyed Rib Collar and Armbands',
      'Double-Layer High-Grade Open Mesh Construction',
      '9-Inch Inseam Basketball Shorts with Deep Waistband',
      'Zero-Weight Sublimated Player Names & Double-Digit Numbers'
    ],
    specs: {
      fabric: '100% Double-Knit Polyester Pro Mesh',
      weight: '180 GSM Outer Mesh',
      fit: 'Pro Court Baggy/Athletic Hoops Cut',
      cartonPackaging: '15 Sets per Master Box'
    }
  },
  {
    id: 'team-04',
    productCode: 'TR-404',
    wholesaleCode: 'TF-T-404',
    name: 'Marathon FeatherLite Singlet & Split Short',
    category: 'teamwear',
    subCategory: 'running',
    gender: 'Unisex',
    movement: 'run',
    collection: '2026 Pro Match Series',
    badge: 'ULTRA LIGHT',
    msrp: 1699,
    moq: '25 Sets (Singlet + Split Shorts)',
    packSize: '25 Sets / Carton',
    ratio: 'Custom Sizing S-XXL',
    gsm: '110 GSM',
    fabric: '100% Micro-Grid Hydrophobic Polyester',
    fabricBlend: '100% Micro-Grid Poly',
    fit: 'Race-Day Ergonomic Aerodynamic Cut',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    colours: ['Custom Sublimated Club Graphics', 'Volt/Black', 'Pure White/Sky'],
    color: 'Volt/Black',
    images: ['images/feat-running.png', 'images/cat-shorts.png', 'images/banner-1.png'],
    customization: 'Full sublimation club branding, Marathon bib clips, 3M reflective trims',
    privateLabel: 'Available (Custom race-day branding, custom runner bags)',
    printing: 'Sublimation, 3M Scotchlite Reflective',
    embroidery: 'Laser-sealed badges',
    productionInfo: 'Turnaround: 7-10 Days. Pan-India Dispatch.',
    rating: 5.0,
    reviewsCount: 118,
    shortStory: 'Under 90 grams race-day running kit. Featherweight micro-grid fabric with laser-cut bonded hems for zero nipple-chafe and zero sweat retention.',
    pillars: {
      quality: 'Hydrophobic micro-filament yarn sheds water instantly, remaining featherlight even in monsoon marathons.',
      movement: 'Deep racerback cut and side-split short hems provide 100% stride clearance for sub-elite pacing.',
      confidence: 'Ultra-clean bonded aesthetic trusted by corporate running teams and athletic clubs.'
    },
    features: [
      'Ultralight Sub-90g Total Race Weight',
      'Bonded Laser-Cut Collar & Armholes (No Stitching Friction)',
      '3-Inch Deep Overlapping Side Split Running Shorts',
      '360-Degree Reflective Heat Transfers for Night Racing'
    ],
    specs: {
      fabric: '100% Micro-Grid Hydrophobic Polyester',
      weight: '110 GSM Top / 120 GSM Short',
      fit: 'Streamlined Race Fit',
      cartonPackaging: '25 Sets per Master Box'
    }
  }
];

const all = [...list, ...teamwear];

const fullJs = `/**
 * TRIFLEX SPORTSWEAR — MASTER WHOLESALE CATALOG & AI-READY SPECIFICATION DATABASE
 * 100% B2B Architecture for Retailers, Brands, Distributors & Teams.
 */

const TRIFLEX_PRODUCTS = ${JSON.stringify(all, null, 2)};

function getProductById(id) {
  return TRIFLEX_PRODUCTS.find(p => p.id === id) || null;
}

function getProductByCode(code) {
  if (!code) return null;
  const clean = code.trim().toUpperCase();
  return TRIFLEX_PRODUCTS.find(p => 
    (p.productCode && p.productCode.toUpperCase() === clean) || 
    (p.wholesaleCode && p.wholesaleCode.toUpperCase() === clean) ||
    (p.id && p.id.toUpperCase() === clean)
  ) || null;
}

function getFeaturedProducts(limit = 6) {
  return TRIFLEX_PRODUCTS.slice(0, limit);
}

function getProductsByCategory(category) {
  if (!category || category === 'all') return TRIFLEX_PRODUCTS;
  return TRIFLEX_PRODUCTS.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

function searchProducts(query) {
  if (!query) return [];
  const q = query.toLowerCase().trim();
  return TRIFLEX_PRODUCTS.filter(p => {
    return (
      (p.productCode && p.productCode.toLowerCase().includes(q)) ||
      (p.wholesaleCode && p.wholesaleCode.toLowerCase().includes(q)) ||
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.subCategory && p.subCategory.toLowerCase().includes(q)) ||
      (p.fabric && p.fabric.toLowerCase().includes(q)) ||
      (p.gsm && p.gsm.toLowerCase().includes(q)) ||
      (p.customization && p.customization.toLowerCase().includes(q))
    );
  });
}

function getAllCategories() {
  return [
    { key: 'all', label: 'All Wholesale Lines', count: TRIFLEX_PRODUCTS.length },
    { key: 'men', label: "Men's Performance", count: TRIFLEX_PRODUCTS.filter(p => p.category === 'men').length },
    { key: 'women', label: "Women's Sculpt Line", count: TRIFLEX_PRODUCTS.filter(p => p.category === 'women').length },
    { key: 'kids', label: "Junior Academy Line", count: TRIFLEX_PRODUCTS.filter(p => p.category === 'kids').length },
    { key: 'teamwear', label: "Custom Teamwear & Kits", count: TRIFLEX_PRODUCTS.filter(p => p.category === 'teamwear').length }
  ];
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TRIFLEX_PRODUCTS, getProductById, getProductByCode, getFeaturedProducts, getProductsByCategory, searchProducts, getAllCategories };
}
`;

fs.writeFileSync('js/products.js', fullJs, 'utf8');
console.log('SUCCESS: js/products.js written with', all.length, 'articles.');
