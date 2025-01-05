const http = require('node:http')
const { findAvailablePort } = require('./10.free-port')

const desiredPort = process.env.PORT || 3000
console.log(process.env.PORT)

const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hello World')
})

findAvailablePort(desiredPort).then((port) => {
  server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
  })
})
