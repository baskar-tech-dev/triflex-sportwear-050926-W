const fs = require('fs');
let products = [
  {
    id: 'men-01',
    productCode: 'TR-101',
    wholesaleCode: 'TF-M-101',
    name: 'AeroVent Pro Engineered Motion Tee',
    category: 'men',
    subCategory: 't-shirts',
    gender: 'Men',
    movement: 'train',
    collection: '2026 Core Performance',
    badge: 'WHOLESALE BESTSELLER',
    msrp: 1499,
    moq: '50 Pcs (Assorted Sizes S–3XL)',
    packSize: '25 Pcs / Master Carton',
    ratio: 'S:2 | M:6 | L:9 | XL:6 | 2XL:2',
    gsm: '180 GSM',
    fabric: '88% Micro-Polyester / 12% Spandex AeroVentK��W6���Br��f'&�4&�V�C�s��R֖7&���ǖW7FW"�"R7�FW�r��f�C�tF��WF�2F���&VB&VwV�"f�Br��6��W3��u2r�t�r�t�r�u��r�s%��r�s5��u���6���W'3��u7FV�F�&�6�r�uf��BƖ�Rr�uW&Rv��FRr�tw&��FRw&W�r�t�g�&�VRu���6���#�u7FV�F�&�6�r��6���$�W�W3��r3���r�r43�cr�r4dddddbr�r3333332r�r3#C4u�����vW3���v��vW2�6B�G6��'B��rr��v��vW2�&�B�R��rr��v��vW2�fVB�G&���r��rr��v��vW2�&��W"���rp����7W7F�֗�F���t7W7F���F��RG�V��r�6�Ɩ6��R6�W7B'&�F��r�4�&Vf�V7F�fRG&��2��V�Fr�&V�2r��&�fFT�&Vâtf��&�R��T�7W7F���V6�FR�'&�FVBv�fV��&V�2�7W7F���ǖ&w2v�F�&&6�FR�r��&��F��s�u7V&Ɩ�F������v��FV�6�G�6�Ɩ6��R�&Vf�V7F�fR4��VBG&�6fW"r��V�'&��FW'��t֖7&��f�F��6�V�'&��FW'��4B6�Ɩ6��RF6�r��&�GV7F����f�uF�'WW"f6�ƗG�����7F�6�F�7F6��#N(	3C���7W7F��&F6��.(	3RF�2�r��&F��s�B���&Wf�Ww46�V�C�C"��6��'E7F�'��tV�v��VW&VB�u4�֖7&���"�ǒ��Bv�F��6W"�&��FVBf�F��6�6V�2f�"�W&��g&�7F���7F�fRW&f�&��6R���v�&WF��6V���F�&�Vv�7&�72�V�F��'&�B7�'G2�WF�WG2�r�����'3���VƗG��u7V�g&���u4�֖7&���"�ǒ�V�7F�R�&�v�F��6W"�&��FVBf�F��6�6V�2F�VƖ֖�FRg&�7F����BV�GW&R���GW7G&��v6�W2�r����fV�V�C�tV�v��VW&VBB�v�&F��7G&WF6�&�f�FW2V�&W7G&�7FVB6��V�FW"�BF�'6�&�FF���F�&�Vv���v�֖�FV�6�G�7&��G2�ƖgG2��Bv�&��WG2�r��6��f�FV�6S�uF���&VBF��WF�2G&Rv�F�6��F�W&VB6�W7B�B6�V�G&��V�F�B���F��26�RVff�'F�W76ǒ��&WF��7F�&RF�7��2�p����fVGW&W3���tW&�fV�N(J� Micro-Pore Active Airflow Technology',
      'Anti-Static Anti-Odor Silver-Ion Antimicrobial Treatment',
      'Laser-Bonded Flatlock Zero-Chafe Seams',
      'Individual Retail-Ready Barcoded Polybag Packaging'
    ],
    specs: {
      fabric: '88% Technical Micro-Polyester, 12% Spandex',
      weight: '180 GSM Micro-Mesh Knit',
      fit: 'Athletic Ergonomic Fit',
      cartonPackaging: '25 Pcs / Master Box (Individual Barcode Polybag)',
      shrinkage: 'Under 2.5% after commercial wash tests',
      colorFastness: 'Grade 4.5+ (AATCC Standard)'
    }
  },
  {
    id: 'men-02',
    productCode: 'TR-102',
    wholesaleCode: 'TF-M-102',
    name: 'Apex Flex 7-Inch Linerless Motion Shorts',
    category: 'men',
    subCategory: 'shorts',
    gender: 'Men',
    movement: 'run',
    collection: '2026 Core Performance',
    badge: 'CORE ESSENTIAL',
    msrp: 1899,
    moq: '40 Pcs (Assorted S-R2XL)',
    packSize: '20 Pcs / Master Carton',
    ratio: 'S:3 | M:7 | L:7 | XL:3',
    gsm: '140 GSM',
    fabric: '86% Recycled Micro-Nylon / 14% Spandex Hydro-Repel',
    fabricBlend: '86% Recycled Micro-Nylon / 14% Spandex',
    fit: '7-Inch Inseam Athletic Standard Fit',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colours: ['Obsidian Black', 'Graphite Grey', 'Deep Olive', 'Navy Blue'],
    color: 'Obsidian Black',
    colorHexes: ['#080808', '#333333', '#2C3529', '#0B1D3A'],
    images: [
      'images/cat-shorts.png',
      'images/prod-3.png',
      'images/feat-running.png'
    ],
    customization: 'Laser-cut perforated side panels, Custom drawcords, Branded zipper pullers',
    privateLabel: 'Available (Custom waistband branding, branded aglets, custom hangtags)',
    printing: 'Reflective 3M transfers, Matte PU heat seal',
    embroidery: 'Subtle micro-stitch side emblem',
    productionInfo: 'In-Stock Dispatch: 24�M48h. Custom Brand Runs: 14 Days.',
    rating: 4.8,
    reviewsCount: 98,
    shortStory: 'Featherlight running and gym shorts featuring laser-perforated airflow zones, DWR water-resistant shell, and concealed zip storage.',
    pillars: {
      quality: 'Hydro-repellent micro-weave fabric with reinforced bartack stress points designed to resist abrasion during intensive use.',
      movement: '7-inch inseam with deep side-split hems for natural knee extension and unrestricted stride clearance.',
      confidence: 'Streamlined aesthetic with internal flat drawcord waistband that stays secure without bunching or twisting.'
    },
    features: [
      'Concealed YKK Zippered Media Pocket with Audio Port',
      'Laser-Perforated Ventilation Gusset',
      'DWR Durable Water-Resistant Finish',
      'Reflective TRIFLEX Night-Vision 3M Trim'
    ],
    specs: {
      fabric: '86% Recycled Nylon, 14% Spandex',
      weight: '140 GSM Lightweight Stretch Shell',
      fit: 'Regular Athletic Inseam (7-inch)',
      cartonPackaging: '20 Pcs per Master Box'
    }
  },
  {
    id: 'men-03',
    productCode: 'TR-103',
    wholesaleCode: 'TF-M-103',
    name: 'VaporShield Packable Technical Windbreaker',
    category: 'men',
    subCategory: 'jackets',
    gender: 'Men',
    movement: 'run',
    collection: '2026 Weather Defense',
    badge: 'HIGH MARGIN LINE',
    msrp: 3499,
    moq: '30 Pcs (Assorted S-R2XL)',
    packSize: '15 Pcs / Master Carton',
    ratio: 'S:2 | M:5 | L:5 | XL:2 | 2XL:1',
    gsm: '110 GSM',
    fabric: '100% ripstop Ultra-Lite Nylon with HydroShield Membrane',
    fabricBlend: '100% Micro-Ripstop Nylon',
    fit: 'Ergonomic Athletic Outerwear Fit',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colours: ['Stealth Black', 'Hyper Volt', 'Storm Slate'],
    color: 'Stealth Black',
    colorHexes: ['#080808', '#C8F000', '#4A5568'],
    images: [
      'images/banner-move.png',
      'images/feat-cycling.png',
      'images/banner-2.png'
    ],
    customization: 'Reflective full-back branding, Custom waterproof seam tape, Molded logo pullers',
    privateLabel: 'Available (Full custom packaging, custom inner label, hangtags)',
    printing: '3M Scotchlite Reflective, Silicone Transfer',
    embroidery: 'Laser-cut heat sealed patches',
    productionInfo: 'In-Stock Dispatch: 48h. Custom Production: 18 Days.',
    rating: 4.9,
    reviewsCount: 64,
    shortStory: 'Ultra-packable 110 GSM weather shield jacket that compresses into its own interior pocket. Wind-proof, shower-resistant, and high visual appeal.',
    pillars: {
      quality: 'Japanese-spec micro-ripstop with taped shoulder seams to ensure water-resistant performance in sudden rain showers.',
      movement: 'Articulated raglan sleeves and ergonomic back vents offer full shoulder range without hem rise.',
      confidence: 'Matte stealth finish with sleek architectural lines suitable for both athlete warmup and urban outerwear.'
    },
    features: [
      'Packs completely into interior self-contained zip pouch',
      'Back airflow cape with breathable micro-mesh lining',
      'Waterproof reverse-coil front zipper with chin guard',
      'Elasticated micro-binding at cuffs and drop-tail hem'
    ],
    specs: {
      fabric: '100% Micro-Ripstop Nylon with DWR Coating',
      weight: '110 GSM Featherlight Shell',
      fit: 'Modern Athletic Outerwear Fit',
      cartonPackaging: '15 Pcs per Master Box'
    }
  }
];
products.push(
  {
    id: 'men-04',
    productCode: 'TR-104',
    wholesaleCode: 'TF-M-104',
    name: 'Kinetics Tapered Engineered Track Pant',
    category: 'men',
    subCategory: 'pants',
    gender: 'Men',
    movement: 'train',
    collection: '2026 Core Performance',
    badge: 'WHOLESALE BESTSELLER',
    msrp: 2499,
    moq: '40 Pcs (Assorted S–3XL)',
    packSize: '20 Pcs / Master Carton',
    ratio: 'S:2 | M:6 | L:7 | XL:4 | 2XL:1',
    gsm: '240 GSM',
    fabric: '78% Polyester / 16% Rayon / 6% Spandex Dual-Knit Space-Flex',
    fabricBlend: '78% Polyester / 16% Rayon / 6% Spandex',
    fit: 'Precision Tapered Leg with Ribbed Ankle Cuffs',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colours: ['Stealth Black', 'Charcoal Melange', 'Dark Olive', 'Navy'],
    color: 'Stealth Black',
    colorHexes: ['#080808', '#2B2B2B', '#2C3529', '#0B1D3A'],
    images: [
      'images/cat-trackpant.png',
      'images/prod-4.png',
      'images/feat-gym.png'
    ],
    customization: 'Custom jacquard waistband, Metal eyelets & rubberized drawcord aglets, High-density side branding',
    privateLabel: 'Available (Custom main label, pocket bag print, polybags)',
    printing: 'High-Density Screen Print, Reflective 3M',
    embroidery: 'Precision flatlock stitch & woven patch',
    productionInfo: 'In-Stock Dispatch: 24h. Bulk Manufacturing: 14 Days.',
    rating: 5.0,
    reviewsCount: 184,
    shortStory: 'Heavyweight 240 GSM space-flex technical knit with an aerodynamic taper. Provides thermal regulation, structured drape, and zero knee-bagging.',
    pillars: {
      quality: 'Dual-knit space yarn creates a luxurious, heavyweight feel while remaining breathable and resistant to surface pilling.',
      movement: 'Ergonomic knee articulation darting allows fluid squatting, sprinting, and travel comfort.',
      confidence: 'Premium structured silhouette bridges gym warmup and modern sportswear retail aesthetic.'
    },
    features: [
      'Dual Deep Concealed YKK Zipper Pockets',
      'Custom High-Tension Ribbed Ankle Cuffs for Clean Sneaker Display',
      'Anti-Pill & Wrinkle-Recovery Fabric Blend',
      'Reinforced Gusset Crotch Construction'
    ],
    specs: {
      fabric: '78% Poly, 16% Rayon, 6% Spandex Space-Flex',
      weight: '240 GSM Premium Dual Knit',
      fit: 'Tapered Athletic Ankle Fit',
      cartonPackaging: '20 Pcs per Master Box'
    }
  },
  {
    id: 'men-05',
    productCode: 'TR-105',
    wholesaleCode: 'TF-M-105',
    name: 'TechPique Performance Polo',
    category: 'men',
    subCategory: 'polos',
    gender: 'Men',
    movement: 'everyday',
    collection: '2026 Clubhouse & Training',
    badge: 'CORPORATE FAVORITE',
    msrp: 1799,
    moq: '50 Pcs (Assorted S–3XL)',
    packSize: '25 Pcs / Master Carton',
    ratio: 'S:2 | M:7 | L:8 | XL:6 | 2XL:2',
    gsm: '210 GSM',
    fabric: '92% Micro-Poly / 8% Spandex Moisture-Wicking Jacquard Pique',
    fabricBlend: '92% Micro-Poly / 8% Spandex',
    fit: 'Tailored Smart-Athletic Fit',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colours: ['Pure White', 'Stealth Black', 'Navy Blue', 'Slate Grey', 'Forest Green'],
    color: 'Pure White',
    colorHexes: ['#FFFFFF', '#080808', '#0B1D2A', '#4A5568', '#1E3F20'],
    images: [
      'images/cat-polo.png',
      'images/feat-everyday.png',
      'images/prod-5.png'
    ],
    customization: 'Custom collar tipping, Branded engraved buttons, Corporate logo embroidery, Custom placket',
    privateLabel: 'Available (Custom collar woven label, hangtags, custom packaging)',
    printing: 'Silicone chest logo, Sublimation collar accents',
    embroidery: 'High-density chest and sleeve embroidery',
    productionInfo: 'In-Stock Dispatch: 24h. Corporate Runs: 10�12 Days.',
    rating: 4.8,
    reviewsCount: 112,
    shortStory: '210 GSM technical pique knit with no-curl collar and laser-cut 3-button placket. Engineered for golf clubs, gym staff, corporate teamwear, and retail.',
    pillars: {
      quality: 'Engineered knit collar retains crisp shape through repeated commercial laundry cycles without curling.',
      movement: 'Spandex-infused jacquard pique provides 360-degree stretch with rapid sweat dispersal.',
      confidence: 'Sophisticated matte texture that looks sharp from the boardroom to the clubhouse.'
    },
    features: [
      'Engineered Structured No-Curl Rib Collar',
      'Laser-Welded 3-Button Placket with Matte Buttons',
      'Side Vents with Reinforced Herringbone Tape',
      'UPF 40+ Sun Protection Coating'
    ],
    specs: {
      fabric: '92% Micro-Polyester, 8% Spandex',
      weight: '210 GSM Technical Pique',
      fit: 'Tailored Modern Athletic Fit',
      cartonPackaging: '25 Pcs per Master Box'
    }
  },
  {
    id: 'men-06',
    productCode: 'TR-106',
    wholesaleCode: 'TF-M-106',
    name: 'Tactical Cargo Transit Pant',
    category: 'men',
    subCategory: 'pants',
    gender: 'Men',
    movement: 'everyday',
    collection: '2026 Utility Sport',
    badge: 'TRENDING ARTICLE',
    msrp: 2999,
    moq: '30 Pcs (Assorted S’2XL)',
    packSize: '15 Pcs / Master Carton',
    ratio: 'S:2 | M:5 | L:5 | XL:2 | 2XL:1',
    gsm: '220 GSM',
    fabric: '90% High-Tenacity Nylon / 10% Spandex 4-Way Stretch Twill',
    fabricBlend: '90% Nylon / 10% Spandex',
    fit: 'Relaxed Tapered Utility Fit with Bungee Cuffs',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colours: ['Stealth Black', 'Combat Olive', 'Desert Khaki'],
    color: 'Stealth Black',
    colorHexes: ['"080808', '#3E4B37', '#9E8B6E'],
    images: [
      'images/cat-cargopant.png',
      'images/prod-4.png',
      'images/mens.png'
    ],
    customization: 'Custom rubber badge pocket patches, Custom webbing pullers, Taped cargo flap accents',
    privateLabel: 'Available (Custom hardware, branded rivets, retail hangtags)',
    printing: 'Reflective cargo branding, Matte PU accents',
    embroidery: 'Direct pocket flap embroidery',
    productionInfo: 'In-Stock Dispatch: 48h. Custom Brand Runs: 16 Days.',
    rating: 4.9,
    reviewsCount: 79,
    shortStory: 'Technical 4-way stretch utility cargo pant with 6 ergonomic pockets, magnetic pocket closures, and adjustable cinch cuffs.',
    pillars: {
      quality: 'Abrasion-resistant nylon twill with DWR water-resistant finish and reinforced seat construction.',
      movement: 'Full 4-way stretch weave with diamond crotch gusset for maximum mobility on and off the field.',
      confidence: 'Architectural tactical aesthetic aligned with contemporary athletic streetwear culture.'
    },
    features: [
      '6 Low-Profile Utility Pockets with Magnetic Quick-Snaps',
      'Adjustable Ankle Bungee Cinch System for Custom Silhouette',
      'Integrated Webbing Belt with Quick-Release Buckle',
      'DWR Water-Repellent Outer Layer'
    ],
    specs: {
      fabric: '90% High-Tenacity Nylon, 10% Spandex Stretch Twill',
      weight: '220 GSM Technical Stretch Twill',
      fit: 'Relaxed Utility Taper',
      cartonPackaging: '15 Pcs per Master Box'
    }
  },
  {
    id: 'women-01',
    productCode: 'TR-201',
    wholesaleCode: 'TF-W-201',
    name: 'SculptForm High-Waist Compressive Legging',
    category: 'women',
    subCategory: 'leggings',
    gender: 'Women',
    movement: 'train',
    collection: '2026 Women\'s High-Motion',
    badge: 'WHOLESALE BESTSELLER',
    msrp: 2299,
    moq: '50 Pcs (Assorted XS–XXL)',
    packSize: '25 Pcs / Master Carton',
    ratio: 'XS:2 | S:7 | M:8 | L:6 | XL:2',
    gsm: '260 GSM',
    fabric: '75% Micro-Polyamide / 25% Lycra® Sculpt Knit',
    fabricBlend: '75% Micro-Polyamide / 25% Lycra®',
    fit: 'High-Rise Seamless Contoured Compression Fit',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colours: ['Obsidian Black', 'Graphite Grey', 'Mulberry Wine', 'Deep Teal'],
    color: 'Obsidian Black',
    colorHexes: ['#080808', '#333333', '#4A1E2E', '#153E3E'],
    images: [
      'images/women.png',
      'images/banner-3.png',
      'images/prod-2.png'
    ],
    customization: 'Custom high-density waistband logo, Hidden waistband pocket, Custom color swatches',
    privateLabel: 'Available (Custom branded silicone grip waistband, private woven tags, polybags)',
    printing: 'Reflective silicone, Heat transfer metallic',
    embroidery: 'Micro-stitch back-yoke branding',
    productionInfo: 'Tirupur Facility. In-Stock Dispatch: 24h. Custom Dye Lots: 14 Days.',
    rating: 5.0,
    reviewsCount: 215,
    shortStory: 'Heavyweight 260 GSM buttery-soft poly-lycra with 100% squat-proof opacity, 4.5-inch non-slip bonded waistband, and flatlock compression seams.',
    pillars: {
      quality: 'Interlock knit provides total squat-proof opacity with zero sheer even under high tension studio lighting.',
      movement: 'High Lycra percentage offers 360-degree anatomical compression that moves like a second skin.',
      confidence: 'Seamless front construction eliminates camel-toe and smooths waistline effortlessly.'
    },
    features: [
      '100% Guaranteed Squat-Proof High-Density Knit',
      '4.5-Inch Bonded Non-Slip Waistband that Stays Up',
      'Concealed Internal Card & Key Pocket',
      'Anti-Chafe 6-Thread Flatlock Stitching'
    ],
    specs: {
      fabric: '75% Polyamide, 25% Lycra¾',
      weight: '260 GSM High-Compression Knit',
      fit: 'High-Rise Ankle Length (26-inch inseam)',
      cartonPackaging: '25 Pcs per Master Box'
    }
  },
  {
    id: 'women-02',
    productCode: 'TR-202',
    wholesaleCode: 'TF-W-202',
    name: 'AeroCore Strappy High-Support Sports Bra',
    category: 'women',
    subCategory: 'bras',
    gender: 'Women',
    movement: 'train',
    collection: '2026 Women\'s High-Motion',
    badge: 'MATCHING SET COMPONENT',
    msrp: 1499,
    moq: '40 Pcs (Assorted XS�MXL)',
    packSize: '20 Pcs / Master Carton',
    ratio: 'XS:2 | S:6 | M:7 | L:4 | XL:1',
    gsm: '240 GSM',
    fabric: '78% Micro-Nylon / 22% Spandex Interlock',
    fabricBlend: '78% Micro-Nylon / 22% Spandex',
    fit: 'Medium-to-High Impact Athletic Bra',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colours: ['Obsidian Black', 'Graphite Grey', 'Mulberry Wine', 'Volt Lime'],
    color: 'Obsidian Black',
    colorHexes: ['#080808', '#333333', '#4A1E2E', '#C8F000'],
    images: [
      'images/prod-2.png',
      'images/women.png',
      'images/banner-3.png'
    ],
    customization: 'Custom molded removable cups, Branded elastic chest band, Custom strap configurations',
    privateLabel: 'Available (Custom heat-seal labels, retail hanger packaging)',
    printing: 'Silicone heat transfer, High-density matte print',
    embroidery: 'Clean micro-patch',
    productionInfo: 'In-Stock Dispatch: 24h. Custom Runs: 12 Days.',
    rating: 4.9,
    reviewsCount: 167,
    shortStory: 'High-support workout bra with geometric back-strap architecture, moisture-wicking underband, and removable breathable padding.',
    pillars: {
      quality: 'Reinforced cup lining with bonded internal elastic prevents bounce during high-impact training.',
      movement: 'Ergonomic multi-strap back distribution relieves neck tension and maximizes shoulder mobility.',
      confidence: 'Clean sculpting neckline offers modest coverage and clean styling under open-back tees.'
    },
    features: [
      'Reinforced Wide Encased Elastic Underbust Band',
      'Removable High-Density Perforated Airflow Cups',
      'Quick-Dry Sweat-Dispersing Lining',
      'Pairs seamlessly with TR-201 SculptForm Legging'
    ],
    specs: {
      fabric: '78% Micro-Nylon, 22% Spandex',
      weight: '240 GSM Sculpt Fabric',
      fit: 'Compressive Support Fit',
      cartonPackaging: '20 Pcs per Master Box'
    }
  }
);
products.push(
  {
    id: 'women-03',
    productCode: 'TR-203',
    wholesaleCode: 'TF-W-203',
    name: 'FlowMotion Relaxed Cropped Training Tee',
    category: 'women',
    subCategory: 't-shirts',
    gender: 'Women',
    movement: 'train',
    collection: '2026 Studio Active',
    badge: 'RETAIL ESSENTIAL,
    msrp: 1299,
    moq: '50 Pcs (Assorted XS�MXL)',
    packSize: '25 Pcs / Master Carton',
    ratio: 'XS:3 | S:8 | M:8 | L:4 | XL:2',
    gsm: '160 GSM',
    fabric: '85% Micro-Modal / 15% Spandex Feather-Soft Knit',
    fabricBlend: '85% Micro-Modal / 15% Spandex',
    fit: 'Boxy Relaxed Cropped Fit with Drop Shoulder',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colours: ['Pure White', 'Stealth Black', 'Dusty Lavender', 'Sage Green'],
    color: 'Pure White',
    colorHexes: ['"#FFFFFF', '#080808', '#9D8FA3', '#8A9A86'],
    images: [
      'images/cat-tshirt.png',
      'images/women.png',
      'images/feat-gym.png'
    ],
    customization: 'Custom garment wash / enzyme dip, Branded chest print, Custom woven side-seam tab',
    privateLabel: 'Available (Custom neck label, swing tags, barcoded bag)',
    printing: 'Soft-hand Water-Base Screen Print, Puff Print',
    embroidery: 'Tonal center-chest embroidery',
    productionInfo: 'In-Stock Dispatch: 24h. Custom Runs: 12 Days.',
    rating: 4.8,
    reviewsCount: 89,
    shortStory: '160 GSM cloud-soft modal-spandex cropped training tee with relaxed drop shoulder and raw-edge hem for studio, gym, and street.',
    pillars: {
      quality: 'Silky micro-modal yarns deliver an ultra-luxe handfeel with high drape and color permanence.',
      movement: 'Loose boxy silhouette allows massive airflow during intense workout and yoga sessions.',
      confidence: 'Flattering crop length pairs seamlessly with high-waist leggings.'
    },
    features: [
      'Feather-Soft Micro-Modal Ultra-Breathable Fabric',
      'Reinforced Ribbed Crew Neckline with Interior Neck Tape',
      'Raw-Edge Bonded Bottom Hemline',
      'Pre-Shrunk Enzyme Washed Finish'
    ],
    specs: {
      fabric: '85% Micro-Modal, 15% Spandex',
      weight: '160 GSM Feather-Knit',
      fit: 'Relaxed Boxy Cropped Cut',
      cartonPackaging: '25 Pcs per Master Box'
    }
  },
  {
    id: 'women-04',
    productCode: 'TR-204',
    wholesaleCode: 'TF-W-204',
    name: 'AeroSwift 2-in-1 Running Shorts',
    category: 'women',
    subCategory: 'shorts',
    gender: 'Women',
    movement: 'run',
    collection: '2026 Women\'s High-Motion',
    badge: 'HIGG CONVERSION ARTICLE',
    msrp: 1699,
    moq: '40 Pcs (Assorted XS–XL)',
    packSize: '20 Pcs / Master Carton',
    ratio: 'XS:2 | S:1 | M:1 | L:3 | XL:1',
    gsm: '130 GSM Shell / 200 GSM Liner',
    fabric: 'Outer: 88% Recycled Poly / 12% Spandex | Liner: 80% Poly / 20% Spandex',
    fabricBlend: 'Recycled Poly-Spandex Blend',
    fit: 'Mid-Rise 3.5-Inch Shell with Compression Liner',
    sizes: ['XS', 'S\', 'M', 'L', 'XL'],
    colours: ['Obsidian Black', 'Mulberry Wine', 'Volt Trim Black'],
    color: 'Obsidian Black',
    colorHexes: ['#080808', '#4A1E2E', '#111111'],
    images: [
      'images/cat-shorts.png',
      'images/women.png',
      'images/feat-running.png'
    ],
    customization: 'Custom liner waistband printing, 3M reflective side prints, Custom zipper pullers',
    privateLabel: 'Available (Custom branding throughout)',
    printing: 'Reflective 3M, Silicone print',
    embroidery: 'Micro logo embroidery',
    productionInfo: 'In-Stock Dispatch: 24h. Custom Runs: 14 Days.',
    rating: 4.9,
    reviewsCount: 134,
    shortStory: '2-in-1 athletic running shorts featuring a lightweight woven shell and built-in compressive liner with dual drop-in phone pockets.',
    pillars: {
      quality: 'Durable woven outer shell with anti-static finish prevents cling during heavy sweating.',
      movement: 'Integrated liner prevents inner-thigh chafing during marathon runs and high-volume lunges.',
      confidence: 'Secure knit waistband with external drawcord stays firmly anchored without digging in.'
    },
    features: [
      'Built-In Anti-Chafe Compression Inner Liner',
      'Dual Side Drop-In Liner Pockets for 6.7\" Smartphones',
      'Zippered Back Waistband Key/Gel Pocket',
      'Reflective 3M Side Accents for Night Visibility'
    ],
    specs: {
      fabric: 'Woven Poly Shell + Spandex Knit Liner',
      weight: '130 GSM Shell / 200 GSM Liner',
      fit: '3.5-Inch Outer Inseam / 5-inch Liner',
      cartonPackaging: '20 Pcs per Master Box'
    }
  },
  {
    id: 'kids-01',
    productCode: 'TR-301',
    wholesaleCode: 'TF-K-301',
    name: 'Junior Sprint Technical Motion Tee',
    category: 'kids',
    subCategory: 't-shirts',
    gender: 'Kids',
    movement: 'train',
    collection: '2026 Junior Academy Line',
    badge: 'SCHOOL & ACADEMY STAPLQ',
    msrp: 999,
    moq: '60 Pcs (Assorted Ages 6–16 Yrs)',
    packSize: '30 Pcs / Master Carton',
    ratio: '6Y:4 | 8Y:v | 10Y:8 | 12Y:6 | 14Y:4 | 16Y:2',
    gsm: '160 GSM',
    fabric: '100% poly interlock',
    fabricBlend: '100% Technical Micro-Polyester',
    fit: 'Regular Junior Athletic Cut',
    sizes: ['6Y', '8Y', '10Y', '12Y', '14Y', '16Y'],
    colours: ['Stealth Black', 'Electric Blue', 'Volt Yellow', 'Fire Red', 'Pure White'],
    color: 'Stealth Black',
    colorHexes: ['#080808', '#0066FF', '#FFE600', '#D32F2F', '#FFFFFF'],
    images: [
      'images/kids.png',
      'images/cat-tshirt.png',
      'images/banner-move.png'
    ],
    customization: 'Custom school / academy crest printing, Sublimation player names, Custom chest numbers',
    privateLabel: 'Available (Custom academy labels, school uniform packaging)',
    printing: 'Full Sublimation, Screen Print, High-Density Rubber Print',
    embroidery: 'School / Club Crest Embroidery',
    productionInfo: 'In-Stock Dispatch: 24h. Academy Bulk Batches: 10 Days.',
    rating: 4.9,
    reviewsCount: 88,
    shortStory: 'High-durability 160 GSM micro-poly junior athletic tee. Engineered to withstand rigorous sports academy training, school PE sessions, and daily washing.',
    pillars: {
      quality: 'High-tenacity micro-filament yarns resist snagging, tears, and color fade across 80+ wash cycles.',
      movement: 'Generous armhole clearance and 2-way stretch knit allow natural kid motion and sports agility.',
      confidence: 'Vibrant colorfast dyes maintain factory freshness throughout entire school athletic seasons.'
    },
    features: [
      'Ultra-Durable Tear-Resistant Micro-Interlock Knit',
      'Non-Allergenic Tagless Neck Heat-Seal Label',
      'Rapid Moisture-Dispersal DryTech Finish',
      'Assorted Junior Age Ratios in Every Master Carton'
    ],
    specs: {
      fabric: '100% poly interlock',
      weight: '160 GSM Resilient Knit',
      fit: 'Junior Athletic Regular Fit',
      cartonPackaging: '30 Pcs per Master Box'
    }
  },
  {
    id: 'kids-02',
    productCode: 'TR-302',
    wholesaleCode: 'TF-K-302',
    name: 'Junior Academy All-Sport Training Shorts',
    category: 'kids',
    subCategory: 'shorts',
    gender: 'Kids',
    movement: 'train',
    collection: '2026 Junior Academy Line',
    badge: 'BULK VOLUME STAPLE',
    msrp: 899,
    moq: '60 Pcs (Assorted Ages 6–16 Yzs)',
    packSize: '30 Pcs / Master Carton',
    ratio: '6Y:4 | 8Y:6 | 10Y:8 | 12Y:6 | 14Y:4 | 16Y:2',
    gsm: '150 GSM',
    fabric: '100% Poly Diamond-Mesh with Quick-Dry Coating',
    fabricBlend: '100% Polyester',
    fit: 'Standard Junior Sports Fit with Drawcord Waist',
    sizes: ['6Y', '8Y', '10Y', '12Y', '14Y', '16Y'],
    colours: ['Stealth Black', 'Navy Blue', 'Royal Blue', 'Forest Green'],
    color: 'Stealth Black',
    colorHexes: ['#080808', '#0B1D3A, '#1565C0', '#1E3F20'],
    images: [
      'images/cat-shorts.png',
      'images/kids.png',
      'images/prod-3.png'
    ],
    customization: 'Custom club crest on left thigh, Academy branding, Numbering',
    privateLabel: 'Available (Custom waistband tags, polybags)',
    printing: 'Screen Print, Sublimation, Heat Transfer',
    embroidery: 'Woven school badge',
    productionInfo: 'In-Stock Dispatch: 24h. Custom Orders: 10 Days.',
    rating: 4.8,
    reviewsCount: 76,
    shortStory: 'Essential junior all-sports short with encased elastic waistband, internal drawcord, and deep mesh pockets for football, cricket, running, and PE.',
    pillars: {
      quality: 'Reinforced flatlock side seams designed for high-abrasion playground and turf usage.',
      movement: 'Lightweight diamond weave ensures zero weight drag for young athletes.',
      confidence: 'Standard uniform fit compliant with regional school and academy sports dress codes.'
    },
    features: [
      'Encased Heavy-Duty Elastic Waistband with Child-Safe Internal Drawcord',
      'Dual Deep Side Mesh Hand Pockets',
      'Breathable Side-Mesh Vent Panels',
      'Quick-Drying Machine Washable Construction'
    ],
    specs: {
      fabric: '100% Polyester Diamond Coating',
      weight: '150 GSM Light Mesh',
      fit: 'Junior Sports Inseam',
      cartonPackaging: '30 Pcs per Master Box'
    }
  },
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
    badge: 'CUSTOM TEAMWEAR PTO',
    msrp: 1999,
    moq: '20 Sets (Jersey + Shorts, Custom Roster)',
    packSize: '20 Sets / Carton',
    ratio: 'Custom Roster Sizes S to 3XL + Junior Available',
    gsm: '170 GSM Jersey / 190 GSM Shorts',
    fabric: '100% AeroWick Pro Sublimation-Ready Micro-Hex Poly',
    fabricBlend: '100% AeroWick Polyester',
    fit: 'Athletic Matchday Ergonomic Fit',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    colours: ['Full Custom Pantone Sublimation', 'Club Gradient', 'Hoops', 'Sash'],
    color: 'Custom Sublimation',
    colorHexes: ['#C8F000', '#080808', '#0066FF', '#D32F2F'],
    images: [
      'images/feat-training.png',
      'images/cat-tshirt.png',
      'images/banner-1.png'
    ],
    customization: '100% Full-Bleed CMYK Sublimation, Player Names, Custom Numbers, Club Badges, Sponsor Logos',
    privateLabel: 'Available (Custom collar branding, branded authenticity hologram, bespoke club packaging)',
    printing: 'High-Definition Italian Sublimation Ink (Zero Fade)',
    embroidery: '3D Silicone Club Crest or High-Stitch Embroidery Badge',
    productionInfo: 'Custom Match Kit Turnaround: 7�LL^\ˈY�][��ٜΈ��\�ˉ���][�ΈK���]�Y]����[���L��ܝ�ܞN�	���]Y\�����[�][��[�Y\�Y�]ZXܛ�Z^�X�[X][ۈ�X��XˈY�YY�[�][ۈ��܈\\�X[�[��\��Y�YH][X[�[���[��[�[]Y�YHY\����[\�Έ]X[]N�	�Y�YY�[�][ۈ][X[��X�[X][ۈYH�X�[X][ۈ�X\�[�Y\��\��ܘX��[��Y[[��܈�Y[��ݙ\�[��Y�وX]�\ˉ��[ݙ[Y[��	ԘY�[���[\��][��YK\�X��[��X^[Z^�H\�H��Y\�܈�Y\\��[��Y[^Y\��[Z�K����ۙ�Y[��N�	��ٙ\��[ۘ[�X�Y\�]X�][]�]\�X�Y[^H^Y\��[��\��[Y[�X[\ˉK��X]\�\Έ	���\]H�\��^H
��ܝ�X]�Y�]�]�\��H�[X�\�[����	֙\��U�ZY�Y�QY�[�][ۈ][X[��X�[X][ۈ[�����	ՙ[�[]YY\��SY\��YH[�[��܈�\YX]\��\][ۉ��	�[��Y\��\��H�X�ܙ\�	��ۜ�܈��[�[��]��^�H]H���	K��X�Έ�X��XΈ	�L	HY\���X��ZXܛ�R^�Y\�\����ZY��	�M���H�\��^KNL��H�ܝ����]�	���X]�^H\��ۛ�ZX��]	���\�۔X��Y�[�Έ	̌�]�\�X[HX\�\���	B�K�Y�	�X[KL�����X���N�	��M�����\�[P��N�	��UM����[YN�	��\��[Y[���ܚX��]�\��^H	���\�\��]	���]Y�ܞN�	�X[]�X\����X��]Y�ܞN�	�ܚX��]	���[�\��	�[�\�^	��[ݙ[Y[��	��Z[�����X�[ێ�	̌����X]��\�Y\����Y�N�	�ԒP��U����\ܜ��NK�[�N�	�MH�]�
�\��^H
�ܚX��]��\�\��I��X���^�N�	�MH�]���\�ۉ���][Έ	��\��H���\��^�\����	����N�	̌��H�\��^H����H��\�\����X��XΈ	�X]�]�ZY��KT�[�^[�\�����][�KUU�L
����X��XЛ[��	�MIHZXܛ�T�H�IH�[�^	���]�	���ܚX��]Z[ܙY�]�]�Z[��ܘ�YۙY\����^�\Έ����	�I�	�	�	�	�	̖	�	��	�K����\�Έ��\�H�]HX]�\�	�	�ܙX[Hٙ�U�]I�	��\��H��܈��X�[X]Y	�K���܎�	�\�H�]HX]�\�	����ܒ^\Έ��ё������	�эQ�Q��	�������	��	�K�[XY�\Έ	�[XY�\���]\�˜����	�[XY�\���]]�X��[������	�[XY�\�ؘ[��\�YX[\����K��\��Z^�][ێ�	��\��H����\�\[���[��܈�X�[X][ۋ�X�ܙ\��ۜ�܈�[��^Y\��[Y\�	��[X�\�����]�]SX�[�	�]�Z[X�H
�\��H�X��ݙ[�Y���\��HX��Y�[��I���[�[�Έ	��X�[X][ۋX]�[�ٙ\��[X�ۉ��[X���Y\�N�	�Y�Y[��]H��\�[X���Y\�H	��\X]�[������X�[ے[��Έ	�\��\��[��8��LL�^\ˈ\�X�\�]�[�R[�XK����][�Έ�K��]�Y]����[��MK��ܝ�ܞN�	�[��[�Y\�Y�܈�Y�ܛ�\�][KY^H\�ܚX��][�Y�[��[�H�XY�Y\ˈ�X]\�\�T�J��[���X�[ۋ�Z[��ܘ�Y�YH�ۙ\�[���X]X�H��\����[\�Έ]X[]N�	�X]�]�ZY����HܚX��]��\�\���]�X�K[^Y\�YۙYH�YH�Z[��ܘ�[Y[��܈]�[���Y[\�ˉ��[ݙ[Y[��	��\��]Yܛ��[�IH�[�^�[�[�X�HY\�][���[��\�[�[��\��X�Y���[��X�[ۜˉ���ۙ�Y[��N�	�ܚ\��Y][ۘ[�]H܈�X��[���X�[X]YY\�]X���]����\��ۜ��X�[ۋ�K��X]\�\Έ	�T�L
��[�Y�[��H�X]Y[��܈ۙ��\��[��[���	��X�KT�Z[��ܘ�Y�YH[�[�ۈ�]\�ۙY\���	М�X]X�HY\��\��]	�\�\�T\��ܘ]Y[�\�\�\���	��\��H�X�[X]Y��\�[��Y�[��Y]�H�[ۜ�K��X�Έ�X��XΈ	�MIH�KIH�[�^[�\�������ZY��	̌��H������H[�	���]�	���ܚX��]]]X��]	���\�۔X��Y�[�Έ	�MH�]�\�X\�\���	B�K�Y�	�X[KL�����X���N�	��M�����\�[P��N�	��UM����[YN�	���\��YH[]H�\��]�[�Y]�[\��[�Y�ܛI���]Y�ܞN�	�X[]�X\����X��]Y�ܞN�	ؘ\��]�[	���[�\��	�[�\�^	��[ݙ[Y[��	��Z[�����X�[ێ�	̌����X]��\�Y\����Y�N�	��������\ܜ�NNK�[�N�	�MH�]�
�\��^H
��ܝ�I��X���^�N�	�MH�]���\�ۉ���][Έ	��\��H���\��^�\����	����N�	�N��HY\��]\��ML��H[�[�����X��XΈ	�L	H��SY\��H�]�X�[X][ۈ�[�ٙ\����X��XЛ[��	�L	H�Y\�\��X�KRۚ]Y\�	���]�	�]][�X��YKT��[\��\��]�[�]	���^�\Έ����	�I�	�	�	�	�	̖	�	��	�K����\�Έ���\��H�X�[X]YX[H��ܜ��	��X[�X��՛�	�	�ܚ[\�ۋ��]I�K���܎�	��X[�X��՛�	����ܒ^\Έ�Ȍ	�	����	�	��̑����	�ё������K�[XY�\Έ	�[XY�\���]]�\������	�[XY�\���]\�ܝ˜����	�[XY�\�ؘ[��\�[[ݙK���K��\��Z^�][ێ�	��\��H�X�[X]Y�[�[X�\��[X���Y\�YX[H]\�[���\��H��\Y�X���\�[�\�Z�\����]�]SX�[�	�]�Z[X�H
�\���HXY�YHY��[���\��H^Y\�X��Y�[��I���[�[�Έ	ѝ[�X�[X][ۋX��H�[\\]p�I��[X���Y\�N�	��X[Hܙ\�[�XY�YH�Y�H[X���Y\�I����X�[ے[��Έ	�\��\��[�����F�2�f7B�"F�7F6�f��&�R�r��&F��s�B���&Wf�Ww46�V�C��"��6��'E7F�'��u&��7V2&6�WF&��V�f�&�v�F��Vg�F�V&�Rֶ�B�V��W6���&��G�VB&�"6���"��BFVW�֖�6���F���6��'G2�r�����'3���VƗG��t�Vg�vV�v�B�V�ֆ��R�W6�6�V��&��FVBv�F�6�gB���W"Ɩ��rf�"&�fW76����6�W'BG&R�r����fV�V�C�tFVW&ֆ��R&F�W2�B6�FR�7ƗB�V�f6�ƗFFRgV���fW&�VB6���F��r�B&V&�V�F��rW�FV�6����r��6��f�FV�6S�t&��B6�W'B&W6V�6Rv�F�f�'&�B7V&Ɩ�FVBw&��72�B7&�77G&�VBG&��2�p����fVGW&W3���tV�v��VW&VB7G&�VB�&��G�VB&�"6���"�B&�&�G2r��tF�V&�R���W"��v��w&FR�V��W6�6��7G'V7F���r��s�֖�6���6V�&6�WF&��6��'G2v�F�FVWv�7F&�Br��u�W&��vV�v�B7V&Ɩ�FVB��W"��W2bF�V&�R�F�v�B�V�&W'2p����7V73���f'&�3�sR�ǒ�W6�r��vV�v�C�s�u4��WFW"�W6�r��f�C�u&�6�W'B&vw��F��WF�2���27WBr��6'F��6�v��s�sR6WG2W"�7FW"&��p�Т������C�wFV��Br��&�GV7D6�FS�uE"�CBr��v���W6�T6�FS�uDb�B�CBr����S�t�&F���fVF�W$ƗFR6��v�WBb7ƗB6��'Br��6FVv�'��wFV�vV"r��7V$6FVv�'��w'V���rr��vV�FW#�uV�6W�r����fV�V�C�w'V�r��6���V7F���s##b&��F6�6W&�W2r��&FvS�uT�E$Ĕt�Br���7'�c�������s#R6WG2�6��v�WB�7ƗB6��'G2�r��6�6��S�s#R6WG2�6'F��r��&F��t7W7F��6����r>($Մ��r��w6Ӣsu4�6��v�WB�#u4�6��'Br��f'&�3�sR֖7&��w&�B��G&���&�2�ǖW7FW"r��f'&�4&�V�C�sR֖7&��w&�B�ǒr��f�C�u&6R�F�W&v���֖2W&�G��֖27WBr��6��W3��u�2r�u5�r�t�r�t�r�u��r�s%��u���6���W'3��t7W7F��7V&Ɩ�FVB6�V"w&��72r�uf��B�&�6�r�uW&Rv��FR�6��u���6���#�uf��B�&�6�r��6���$�W�W3��r43�cr�r3���r�r4dddddbr�r3$4CBu�����vW3���v��vW2�fVB�'V���r��rr��v��vW2�6B�6��'G2��rr��v��vW2�&��W"���rp����7W7F�֗�F���tgV��7V&Ɩ�F���6�V"'&�F��r��&F���&�"6Ɨ2�4�&Vf�V7F�fRG&��2r��&�fFT�&Vâtf��&�R�7W7F��&6R�F�'&�F��r�7W7F��'V��W"&w2�r��&��F��s�u7V&Ɩ�F����4�66�F6�ƗFR&Vf�V7F�fRr��V�'&��FW'��t�6W"�6V�VB&FvW2r��&�GV7F����f�uGW&�&�V�C�~(�F�2��Ԗ�F�F�7F6��r��&F��s�R���&Wf�Ww46�V�C����6��'E7F�'��uV�FW"�w&�2&6R�F�'V���r��B�fVF�W'vV�v�B֖7&��w&�Bf'&�2v�F��6W"�7WB&��FVB�V�2f�"�W&���R�6�fR�B�W&�7vVB&WFV�F����r�����'3���VƗG��t��G&���&�2֖7&��f���V�B�&�6�VG2vFW"��7F�Fǒ�&V����rfVF�W&Ɩv�BWfV������6����&F���2�r����fV�V�C�tFVW&6W&&6�7WB�B6�FR�7ƗB6��'B�V�2&�f�FRR7G&�FR6�V&�6Rf�"7V"�VƗFR6��r�r��6��f�FV�6S�uV�G&�6�V�&��FVBW7F�WF�2G'W7FVB'�6�'�&FR'V���rFV�2�BF��WF�26�V'2�p����fVGW&W3���uV�G&Ɩv�B7V"ӓrF�F�&6RvV�v�Br��t&��FVB�6W"�7WB6���"b&ֆ��W2���7F�F6���rg&�7F���r��s2Ԗ�6�FVW�fW&���r6�FR7ƗB'V���r6��'G2r��s3c�FVw&VR&Vf�V7F�fR�VBG&�6fW'2f�"�v�B&6��rp����7V73���f'&�3�sR֖7&��w&�B��G&���&�2�ǖW7FW"r��vV�v�C�su4�F��#u4�6��'Br��f�C�u7G&V�Ɩ�VB&6Rf�Br��6'F��6�v��s�s#R6WG2W"�7FW"&��p�ТТ����6��7Bf��T6��FV�B�����E$�d�U�5�%E5tT"(	B�5DU"t���U4�R4D��rb��$TE�5T4�d�4D���DD$4U���R#$"&6��FV7GW&Rf�"&WF��W'2�'&�G2�F�7G&�'WF�'2bFV�2���������6��7BE$�d�U��$�ET5E2�G��4���7G&��v�g��&�GV7G2��V���"�ӵ����gV�7F���vWE&�GV7D'��B��B����&WGW&�E$�d�U��$�ET5E2�f��B����B����B����V�õ�������gV�7F���vWE&�GV7D'�6�FR�6�FR�����b�6�FR�&WGW&��V�õ��6��7B6�V��6�FR�G&�҂��F�WW$66R�����&WGW&�E$�d�U��$�ET5E2�f��B�������&�GV7D6�FRbb�&�GV7D6�FR�F�WW$66R�����6�V�������v���W6�T6�FRbb�v���W6�T6�FR�F�WW$66R�����6�V�������Bbb�B�F�WW$66R�����6�V�������V�õ�������gV�7F���vWDfVGW&VE&�GV7G2�Ɩ֗B�b����&WGW&�E$�d�U��$�ET5E2�6Ɩ6R��Ɩ֗B���������gV�7F���vWE&�GV7G4'�6FVv�'��6FVv�'������b�6FVv�'���6FVv�'����v��r�&WGW&�E$�d�U��$�ET5E3���&WGW&�E$�d�U��$�ET5E2�f��FW"����6FVv�'��F���vW$66R�����6FVv�'��F���vW$66R�����������gV�7F���6V&6�&�GV7G2�VW'������b�VW'��&WGW&��ӵ��6��7B�VW'��F���vW$66R���G&�҂����&WGW&�E$�d�U��$�ET5E2�f��FW"������&WGW&������&�GV7D6�FRbb�&�GV7D6�FR�F���vW$66R����6�VFW2���������v���W6�T6�FRbb�v���W6�T6�FR�F���vW$66R����6�VFW2�����������Rbb���R�F���vW$66R����6�VFW2���������6FVv�'�bb�6FVv�'��F���vW$66R����6�VFW2���������7V$6FVv�'�bb�7V$6FVv�'��F���vW$66R����6�VFW2���������f'&�2bb�f'&�2�F���vW$66R����6�VFW2���������w6�bb�w6��F���vW$66R����6�VFW2���������7W7F�֗�F���bb�7W7F�֗�F����F���vW$66R����6�VFW2���������ғ��������gV�7F���vWD��6FVv�&�W2�����&WGW&������W��v��r��&Vât��v���W6�RƖ�W2r�6�V�C�E$�d�U��$�ET5E2��V�wF�������W��v�V�r��&Vât�V���w2W&f�&��6Rr�6�V�C�E$�d�U��$�ET5E2�f��FW"����6FVv�'����v�V�r���V�wF�������W��wv��V�r��&Vâuv��V���w267V�BƖ�Rr�6�V�C�E$�d�U��$�ET5E2�f��FW"����6FVv�'����wv��V�r���V�wF�������W��v��G2r��&Vât�V��"6FVגƖ�Rr�6�V�C�E$�d�U��$�ET5E2�f��FW"����6FVv�'����v��G2r���V�wF�������W��wFV�vV"r��&Vât7W7F��FV�vV"b��G2r�6�V�C�E$�d�U��$�ET5E2�f��FW"����6FVv�'����wFV�vV"r���V�wF����ӵ�������b�G�V�b��GV�R��wV�FVf��VBrbb��GV�R�W��'G2������GV�R�W��'G2��E$�d�U��$�ET5E2�vWE&�GV7D'��B�vWE&�GV7D'�6�FR�vWDfVGW&VE&�GV7G2�vWE&�GV7G4'�6FVv�'��6V&6�&�GV7G2�vWD��6FVv�&�W2ӵ��������g2�w&�FTf��U7��2�v�2�&�GV7G2�2r�f��T6��FV�B�wWFc�r�����r�w&�GV7G2�2vV�W&FVB7V66W76gV�ǒv�F�r�&�GV7G2��V�wF��r&�GV7G2r��