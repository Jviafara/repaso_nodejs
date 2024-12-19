const fs = require('node:fs') // A partir de node 16 user siempre el prefijo node:

const stats = fs.statSync('./file.txt')
console.log(
  stats.isFile(),
  stats.isDirectory(),
  stats.isSymbolicLink(),
  stats.size // tamaño en bytes
)
