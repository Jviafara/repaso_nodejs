const fs = require('node:fs');

fs.readFile('./file.txt', 'utf8', (err, text) => {
    console.log(text);
});
console.log('Leyendo Primer archivo');
