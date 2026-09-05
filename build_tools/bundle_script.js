const fs = require('fs');

const cart = fs.readFileSync('js/cart_manager.js', 'utf8');
const search = fs.readFileSync('js/search_modal.js', 'utf8');
const quickOrder = fs.readFileSync('js/quick_order.js', 'utf8');
const quickView = fs.readFileSync('js/quick_view.js', 'utf8');
const quote = fs.readFileSync('js/quote_modal.js', 'utf8');
const renderers = fs.readFileSync('js/page_renderers.js', 'utf8');

const combined = `/**
 * TRIFLEX SPORTSWEAR — MASTER CLIENT CONTROLLER
 * Digital Wholesale Showroom, Enquiry Bag, Quick Order, Search & Quotation Systems.
 */

${cart}

${search}

${quickOrder}

${quickView}

${quote}

${renderers}
`;

fs.writeFileSync('js/script.js', combined, 'utf8');
console.log('SUCCESS: js/script.js bundled (' + combined.length + ' bytes)');
