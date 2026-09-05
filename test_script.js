const fs = require('fs');
fs.writeFileSync('test_herestring.txt', 'Here-strings work perfectly: "hello" and single quotes', 'utf8');
console.log('Tested single-quote here-string!');
