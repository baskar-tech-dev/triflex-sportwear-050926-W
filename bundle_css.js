const fs = require('fs');

const tokens = fs.readFileSync('css/tokens.css', 'utf8');
const components = fs.readFileSync('css/components.css', 'utf8');
const sections = fs.readFileSync('css/sections.css', 'utf8');
const polish = fs.readFileSync('css/extra_polish.css', 'utf8');
const responsive = fs.readFileSync('css/responsive.css', 'utf8');

const combined = `${tokens}\n\n${components}\n\n${sections}\n\n${polish}\n\n${responsive}\n`;
fs.writeFileSync('css/style.css', combined, 'utf8');
console.log('SUCCESS: css/style.css bundled with polish (' + combined.length + ' bytes)');
