const path = require('node:path')

// Barra separadora de carpetas según el sistema operativo
console.log(path.sep)

// unir rutas con path.join
const filePath = path.join('/content', 'subfolder', 'test.txt')
console.log(filePath)

const base = path.basename(filePath)
console.log(base)

const fileName = path.basename(filePath, '.txt')
console.log(fileName)

const extencion = path.extname(base)
console.log(extencion)
