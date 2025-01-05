import {
  arch,
  cpus,
  freemem,
  platform,
  release,
  totalmem,
  uptime
} from 'node:os'

console.log('Informacion del sistema opperativo')
console.log('__________________________________')

console.log('Nombre de sistema operativo:', platform())
console.log('Versio del sistema operativo:', release())
console.log('Arquitectura:', arch())
console.log('CPUs:', cpus())
console.log('Memoria Libre:', freemem() / 1024 / 1024)
console.log('Memoria total:', totalmem() / 1024 / 1024)
console.log('uptime', uptime() / 60 / 60)
