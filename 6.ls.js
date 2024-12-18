const fs = require('node:fs');

fs.readdir('.', 'utf8', (err, files) => {
    if (err) {
        console.error('Error al leer el directorio: ', err);
        return;
    }

    files.forEach(file => {
        console.log(file);
    });
});
