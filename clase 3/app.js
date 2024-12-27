const express = require('express')

const app = express()
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

const port = process.env.PORT ?? 8080
app.listen(port, () => {
  console.log(`Server listening on port:  http://localhost:${port}`)
})
