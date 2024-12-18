const fs = require('node:fs');
const path = require('node:path');

const folder = process.argv[2] ?? '.';

fs.readdir(folder, 'utf8', (err, files) => {
    if (err) {
        console.error('Error al leer el directorio: ', err);
        return;
    }

    files.forEach((file) => {
        const filePath = path.join(folder, file);
    });
});
