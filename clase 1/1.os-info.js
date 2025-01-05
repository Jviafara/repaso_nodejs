const os = require('node:os')

console.log('Informacion del sistema opperativo')
console.log('__________________________________')

console.log('Nombre de sistema operativo:', os.platform())
console.log('Versio del sistema operativo:', os.release())
console.log('Arquitectura:', os.arch())
console.log('CPUs:', os.cpus())
console.log('Memoria Libre:', os.freemem() / 1024 / 1024)
console.log('Memoria total:', os.totalmem() / 1024 / 1024)
console.log('uptime', os.uptime() / 60 / 60)
