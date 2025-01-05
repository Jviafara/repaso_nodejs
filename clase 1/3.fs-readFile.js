const fs = require('node:fs')

fs.readFile('./file.txt', 'utf8', (err, text) => {
  if (err) console.error(err)
  console.log(text)
})
console.log('Leyendo Primer archivo')
