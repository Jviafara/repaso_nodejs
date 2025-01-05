const express = require('express')
const ditto = require('./pokemon/ditto.json')
const port = process.env.PORT ?? 3000

const app = express()
app.disable('x-powered-by')

// Midleware BY EXPRESS
app.use(express.json())

// Middleware BY CODE
// app.use((req, res, next) => {
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()

//   let body = ''
//   req.on('data', (chunk) => {
//     body += chunk.toString()
//   })
//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = Date.now()
//     req.body = data
//     next()
//   })
// })

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})
app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body)
})

// Ultima en ejecutarse
app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(port, () => {
  console.log(`Server running on port:  http://localhost:${port}`)
})
