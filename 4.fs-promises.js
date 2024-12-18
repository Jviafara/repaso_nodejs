// With this one:
const fs = require('node:fs/promises');

fs.readFile('./file.txt', 'utf-8').then((text) => console.log(text));
console.log('Leyendo Primer archivo');

// The output is the same. The difference is that the first one uses a callback and the second one uses promises. The second one is easier to read and understand.
