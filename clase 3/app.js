import cors from 'cors'
import express, { json } from 'express'
import { randomUUID } from 'node:crypto'
import { validateMovie, validatepartialMovie } from './schemas/movies.js'

// import movies from './movies.json' assert { type: 'json' } //Esta sintaxis ya esta deprecada
// import movies from './movies.json' with { type: 'json' } //Esta es la nueva sintaxis pero aun no esta soportada por nodejs
//Leer JSON en ESModules
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

//Recomended way to read JSON files in nodejs at the moment
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const movies = require('./movies.json')

const app = express()
app.disable('x-powered-by')
app.use(json())

app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = ['http://localhost:3485', 'https://my-app.com']

      if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        return callback(null, true)
      }
    }
  })
)

// Fetch all movies
app.get('/movies', (req, res) => {
  const { genre } = req.query

  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLocaleLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

// Fetch a movie by id
app.get('/movies/:id', (req, res) => {
  //path to regexp
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (!movie) return res.status(404).json({ message: 'Movie not found' })
  res.status(200).json(movie)
})

// Create a new movie
app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error)
    return res.status(400).json({ message: result.error.message })

  const newMovie = {
    id: randomUUID(),
    ...result.data
  }

  movies.push(newMovie)

  res.status(201).json(newMovie)
})

// Update a movie using PATCH
app.patch('/movies/:id', (req, res) => {
  const result = validatepartialMovie(req.body)

  if (!result.success)
    return res.status(400).json({ message: result.error.message })

  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)
  if (movieIndex === -1)
    return res.status(404).json({ message: 'Movie not found' })

  const updateMovie = { ...movies[movieIndex], ...result.data }
  movies[movieIndex] = updateMovie

  return res.json(updateMovie)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)

  if (movieIndex === -1)
    return res.status(404).json({ message: 'Movie not found' })

  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})

const port = process.env.PORT ?? 8080
app.listen(port, () => {
  console.log(`Server listening on port:  http://localhost:${port}`)
})
