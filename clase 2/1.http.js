const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/plain; charset=utf8')
    res.end('<h2>Welcome to my landing page!!!</h2>')
  } else if (req.url === '/about') {
    res.setHeader('Content-Type', 'text/plain; charset=utf8')
    res.end('<h2>Welcome to the about page!!!</h2>')
  } else if (req.url === '/banner.jpg') {
    fs.readFile('./banner.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>Internal Server Error</h1>?')
      } else {
        res.setHeader('Content-Type', 'image/jpeg')
        res.end(data)
      }
    })
  } else {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html; charset=utf8')
    res.end('<h1>404 Not Found</h1>')
  }
})

server.listen(desiredPort, () => {
  console.log(`Server is running on port http://localhost:${desiredPort}`)
})
